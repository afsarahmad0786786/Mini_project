<template>
<nav class="breadcrumb has-arrow-separator mt-2" aria-label="breadcrumbs">
  <ul>
    <li> <RouterLink to="/task">Add Task</RouterLink></li>
    <slot name="link"></slot>
  </ul>
</nav>
  </template>
  
  <script setup>
  /*
  import
  */
  import {ref} from 'vue'
  
  const showMobileNav = ref(false)
  </script>
  
  <style>
  @media(max-width:1023px) {
      .navbar-menu {
          position: absolute;
          left: 0;
          width: 100%;
      }
  
  }
  </style>
  