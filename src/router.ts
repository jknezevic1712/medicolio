import { createRouter, createWebHistory } from 'vue-router'

// components
import HomeView from './pages/HomeView.vue'
// utils
// import store from './store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    }
    // {
    //   path: '/auth',
    //   component: AuthView
    // },
    // {
    //   path: '/doctor/:id',
    //   component: ProfileView,
    //   props: true,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/doctor/:id/patient/register',
    //   component: PatientRegisterView,
    //   props: true,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/doctor/:id/patient/:id',
    //   component: PatientView,
    //   props: true,
    //   meta: {
    //     requiresAuth: true
    //   },
    //   children: [
    //     {
    //       path: 'prescribtions',
    //       component: PatientPrescribtions,
    //     },
    //   ],
    // },
    // {
    //   path: '/:notFound(.*)',
    //   component: NotFoundView
    // }
  ]
})

router.beforeEach((to, _from, next) => {
  // const isLoggedIn = store.getters["auth/isLoggedIn"];

  // if (to.meta.requiresAuth && !isLoggedIn) next('/auth')
  next()
})

export default router
