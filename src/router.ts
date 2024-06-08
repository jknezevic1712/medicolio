import { createRouter, createWebHistory } from 'vue-router'

// components
import HomeView from '@/views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import AuthView from './views/AuthView.vue'
// utils
import useAuthStore from './stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      component: AuthView
    },
    {
      path: '/doctor/:id',
      component: ProfileView,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
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
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    return next('/auth')
  } else if (to.path === '/auth' && authStore.user) {
    return
  }
  next()
})

export default router
