// utils
import API_ENDPOINTS from '@/assets/API'
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import useAuthStore from '@/stores/useAuthStore'
// types
import type { DrugAPIResponse, DrugData, UserAuthResData } from '@/assets/types/API'
import type { Doctor } from '@/assets/types/General'

let timer: undefined | NodeJS.Timeout
export default function useAPI() {
  const authStore = useAuthStore()

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  async function fetchMedications() {
    const res: DrugAPIResponse = await (await fetch(API_ENDPOINTS.drugs)).json()
    const drugList: DrugData[] = []

    res.results.forEach((drugManufacturer) => {
      drugManufacturer.products.forEach((drugItem, manufacturerIdx) => {
        drugList[manufacturerIdx] = {
          ...drugList[manufacturerIdx],
          id: manufacturerIdx,
          route: drugItem.route,
          dosage_form: drugItem.dosage_form
        }

        drugItem.active_ingredients.forEach((drug, drugIdx) => {
          drugList[manufacturerIdx] = {
            ...drugList[manufacturerIdx],
            drugs: [
              {
                id: drug.name + '-' + drugIdx,
                ...drug
              }
            ]
          }
        })
      })
    })

    return drugList
  }

  type AuthUserProps = {
    email: string
    password: string
    name?: string
    title?: string
    pin?: string
  }
  async function authUser(payload: AuthUserProps, isLogin: boolean) {
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + firebaseConfig.apiKey
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        firebaseConfig.apiKey
    }

    const authRes = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })
    const authResData: UserAuthResData = await authRes.json()
    if (!authRes.ok) {
      const err = new Error('Failed to authenticate.')
      throw err
    }
    const userData = await manageUserData(payload, isLogin, authResData.localId)
    if (!userData) {
      const err = new Error('Failed to fetch user data.')
      throw err
    }

    const expiresIn = +authResData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    timer = setTimeout(() => {
      logoutUser()
    }, expiresIn)

    localStorage.setItem('medicolio-tokenExpiration', expirationDate.toString())
    localStorage.setItem('medicolio-token', authResData.idToken)
    authStore.setUser(userData)
  }

  async function manageUserData(
    payload: Partial<AuthUserProps>,
    onlyFetchUserData: boolean,
    userId: string
  ): Promise<Doctor> {
    if (!onlyFetchUserData) {
      await setDoc(doc(db, 'users', userId), {
        id: payload.pin,
        pin: payload.pin,
        name: payload.name,
        title: payload.title,
        patients: [],
        role: 'doctor'
      })
    }

    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) {
      console.log("Couldn't find the user with that id! ", userId)
      return {} as Doctor
    }

    const userData = userSnap.data()
    localStorage.setItem('medicolio-userId', userId)
    return userData as Doctor
  }

  function logoutUser() {
    authStore.logoutUser()
    clearTimeout(timer)
    localStorage.removeItem('medicolio-tokenExpiration')
    localStorage.removeItem('medicolio-token')
    localStorage.removeItem('medicolio-userId')
  }

  async function autoLoginUser() {
    const userId = localStorage.getItem('medicolio-userId')
    const tokenExpiration = localStorage.getItem('medicolio-tokenExpiration')
    if (!userId || !tokenExpiration) return

    const expiresIn = +tokenExpiration - new Date().getTime()
    if (expiresIn < 10000) {
      return
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      logoutUser()
    }, expiresIn)

    const userRef = doc(db, 'users', userId)
    const userData = (await getDoc(userRef)).data() as Doctor

    authStore.setUser(userData)
  }

  async function updateUser(payload: Partial<Doctor>) {
    const userId = localStorage.getItem('medicolio-userId')
    if (!userId) return

    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...payload
    })
    authStore.setUser(payload)
  }

  return {
    fetchMedications,
    authUser,
    manageUserData,
    logoutUser,
    autoLoginUser,
    updateUser
  }
}
