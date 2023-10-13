<template>
   <div class="notification">
  <button class="delete"></button>
  Lorem ipsum dolor sit amet, consectetur
  adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
</div>
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
      