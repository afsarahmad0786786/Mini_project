<template>
    <nav class="navbar is-dark py-0" role="navigation" aria-label="main navigation">
      <div class="container is-max-desktop px-2" >
        <div class="navbar-brand">
          <div class="navbar-item is-size-4 is-family-monospace">{{storeNotes.navTitle}}
          </div>
          <a
          @click.prevent="showMobileNav=!showMobileNav"
            role="button"
            class="navbar-burger"
            :class="{'is-active': showMobileNav}"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            ref="navBarBurgerref"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample " class="navbar-menu"
        :class="{'is-active': showMobileNav}"
        ref="navBarMenuRef">
        <div class="navbar-start">
          <button 
          v-if="notesAuth.user.id"
          @click="logout" class="button is-small is-info mt-2 ml-3">Log Out {{notesAuth.user.email}}</button>
        </div>
          <div class="navbar-end">
            <RouterLink
            v-if="$route.path != '/'" @click="showMobileNav=false" to="/" class="navbar-item is-active"><font-awesome-icon icon="home" />&nbsp;Home</RouterLink>
            <!-- <RouterLink @click="showMobileNav=false" to="/stats" class="navbar-item">Stats</RouterLink> -->
            <!-- <RouterLink @click="showMobileNav=false" to="/breadCrumbs" class="navbar-item">PDF</RouterLink> -->
           
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  /*
  import
  */
  import {ref} from 'vue'
  import {useStoreAuth} from '../../stores/storeNotesAuth.js'
  import {useStoreNotes} from '../../stores/storeNotes.js'
  //import { onClickOutside } from '@vueuse/core'
  const showMobileNav = ref(false)
  const navBarMenuRef = ref(null)
  const navBarBurgerref = ref(null)
  const notesAuth = useStoreAuth();
  const storeNotes = useStoreNotes();
  
//   onClickOutside(navBarMenuRef, () => {
//     showMobileNav.value= false
//   }, {
//     ignore: [navBarBurgerref]
//   })

const logout = () => {
  showMobileNav.value = false
  notesAuth.logout()
}
  
      
  </script>
  
  <style>
  @media(max-width:1023px) {
      .navbar-menu {
          position: absolute;
          left: 0;
          width: 80%;
      }
  }
  </style>
  