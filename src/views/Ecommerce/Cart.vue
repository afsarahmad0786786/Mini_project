<script setup lang="ts">
import { computed } from 'vue'
import CartCard from '../../components/Ecommerce/CartCard.vue'
import CartCardSkeleton from '../../components/Ecommerce/CartCardSkeleton.vue'
import { toCurrency } from '../../shared/util'
import { useCartStore } from '../../stores/cart'
import { useProductStore } from '../../stores/product'

const cartStore = useCartStore()
const productStore = useProductStore()

const formattedCart = computed(() => cartStore.formattedCart)
</script>

<template>
  <div class="bg-body-tertiary shadow mt-2 p-2 rounded">
    Product's List
  </div>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 15" :key="n" />
    </div>
    <div v-else-if="!formattedCart.length">
      <h1 class="text-xl">
        Cart is empty.
      </h1>
    </div>
    <div v-else class="space-y-4">
      <CartCard
        v-for="(cartProduct, index) in formattedCart"
        :key="index"
        :cart-product="cartProduct"
      />
      <div style="border-radius: 2px; width: 20%; padding: 2px;" class="text-right text-2xl md:text-4xl mt-4">
        Total: {{ toCurrency(cartStore.total) }}
      </div>
    </div>
  </div>
</template>