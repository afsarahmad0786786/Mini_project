<template>
  <navbar/>
 <div class="container is-max-desktop px-2 main-body">
  <RouterView />
 </div>
  
  
</template>


<script setup>
/*
imports
*/
import navbar from './components/Layouts/NavBar.vue'
import {onMounted} from 'vue'
import { useStoreNotes} from './stores/storeNotes'
import {useStoreAuth} from './stores/storeNotesAuth.js'
import { useProductStore } from './stores/product.ts'
import { usePersistCart } from './composables/usePersistCart.ts'

const storeNortes = useStoreNotes();
const storeAuth = useStoreAuth();
const productStore = useProductStore()

productStore.fetchAll()
usePersistCart()

// onMounted(() => {
//   storeAuth.init()
// })
onMounted(() => {
  storeNortes.getNotes()
})
</script>



<style>
@import '../node_modules//bulma/css//bulma.min.css';
 
</style>