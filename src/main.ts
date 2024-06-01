import { createApp } from 'vue'
import { createPinia } from 'pinia'
// utils
import router from './router'
// components
import App from './App.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import BaseCard from '@/components/shared/BaseCard.vue'
import BaseSpinner from '@/components/shared/BaseSpinner.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-spinner', BaseSpinner)

app.mount('#app')
