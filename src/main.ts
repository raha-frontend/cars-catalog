import { createApp } from 'vue'

import Notifications from '@kyvg/vue3-notification'

import router from './router'

import { store } from './store'

import AppComponent from './App.vue'

const app = createApp(AppComponent)

app.use(router)

app.use(store)

app.use(Notifications)

app.mount('#app')
