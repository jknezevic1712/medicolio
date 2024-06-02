import { createApp } from 'vue'
import { createPinia } from 'pinia'
// utils
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// components
import App from './App.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import BaseCard from '@/components/shared/BaseCard.vue'
import BaseSpinner from '@/components/shared/BaseSpinner.vue'
import BaseForm from '@/components/shared/BaseForm.vue'
import BaseFormControl from '@/components/shared/BaseFormControl.vue'

const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersistedstate)

app.use(store)
app.use(router)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-spinner', BaseSpinner)
app.component('base-form', BaseForm)
app.component('base-form-control', BaseFormControl)

app.mount('#app')
