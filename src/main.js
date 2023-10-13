import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { FontAwesomeIcon } from "../node_modules/@fortawesome/vue-fontawesome"
import { faPen, faEdit , faTrash, faCheck, faHome, faX, faCartShopping} from "../node_modules/@fortawesome/free-solid-svg-icons"
//import { faHome, faUserSecret } from "@fortawesome/free-solid-svg-icons"
import { library } from "../node_modules/@fortawesome/fontawesome-svg-core"
import { markRaw } from 'vue'
// adapt this based on where your router is

/*
Bootstrap
*/
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
//import './assets/styles/tailwind.css'

import "bootstrap"

library.add(faPen, faEdit, faTrash, faCheck, faHome, faX, faCartShopping);

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

createApp(App)
.use(router)
.use(pinia)
.use(VueSweetalert2)
.component("font-awesome-icon",FontAwesomeIcon)
.mount('#app')
