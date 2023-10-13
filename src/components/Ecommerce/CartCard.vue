<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import type { CartPreview } from '../../stores/cart'
import { toCurrency } from '../../shared/util'

defineProps<{
  cartProduct: CartPreview
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="card">
   
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="row">

            <div class="col-2"> <img :src="cartProduct.image" style="height: 3em; width: 3em;" alt=""
                class="card-img-top"></div>
            <div class="col-2">
              <button class="btn btn-primary btn-sm" @click="cartStore.remove(cartProduct.id)">-</button>
              {{ cartProduct.quantity }}
              <button class="btn btn-primary btn-sm" @click="cartStore.add(cartProduct.id)">+</button>
            </div>
            <div class="col">{{ cartProduct.title }}</div>
            <div class="col">${{ cartProduct.cost.toFixed(2) }}</div>
            <!-- <div class="col"><button class="btn btn-danger btn-sm" @click="deleteProduct(cart.id)">x</button> -->
          
    </div>
    </li>
    </ul>
  </div>
  </div>

</template>

<style>
.img-height {
  height: 250px
}
</style>