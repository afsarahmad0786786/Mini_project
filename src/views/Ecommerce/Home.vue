<script setup>
import { computed, ref } from 'vue'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'
import { useStoreNotes } from '../../stores/storeNotes'


const productStore = useProductStore()
const cartStore = useCartStore()
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'Ecommerce Website'

const electronic = ref(false);
const clothes = ref(false);
const jewellery = ref(false);
const electronicData = ref('');
const clothesData = ref('');
const jewelleryData = ref('');
const searchByProduct = ref('')

const products = computed(() => {
    let filterArrays = []
    let electronicFilter = [], clothesFilter = [], jeweleryFilter = [], searchData = []
    if (searchByProduct.value != '') {
        searchData = productStore.list.filter((product) => {
            console.log(product.title);
            return product.title.toLowerCase().includes(searchByProduct.value.toLowerCase())
        })
    }

    if (electronicData.value != '') {
        electronicFilter = filterData(electronicData.value)
    }
    if (clothesData.value != '') {
        clothesFilter = filterData(clothesData.value)
    }
    if (jewelleryData.value != '') {
        jeweleryFilter = filterData(jewelleryData.value)
    }

    if (electronicFilter.length > 0 || clothesFilter.length > 0 || jeweleryFilter.length > 0) {
        filterArrays = [...electronicFilter, ...clothesFilter, ...jeweleryFilter]
        console.log(filterArrays)
        return filterArrays;
    } else if (searchData.length > 0) {
        return searchData
    } else if (searchByProduct.value != '' && searchData.length === 0) {
        return []
    }
    else {
        return productStore.list

    }
})

const filterData = (type) => {
    return productStore.list.filter((product) => {
        console.log(product.title);
        return product.category.toLowerCase().includes(type.toLowerCase())
    })
}

const onChange = (args) => {
    if (args === 'clothes' && clothes.value === true) {
        clothesData.value = 'clothing'
    } else if (args === 'clothes' && clothes.value === false) {
        clothesData.value = ''
    }
    else if (args === 'electronic' && electronic.value === true) {
        electronicData.value = 'electronics'
    } else if (args === 'electronic' && electronic.value === false) {
        electronicData.value = ''
    }
    else if (args === 'jewellery' && jewellery.value === true) {
        jewelleryData.value = 'jewelery'
    } else if (args === 'jewellery' && jewellery.value === false) {
        jewelleryData.value = ''
    }
}

</script>

<template>
    <div class="container fluid px-2">
        <div class="shadow p-3 mb-3 bg-body-tertiary rounded ">
            <input v-model="searchByProduct" style="width: 950px;" class="input mb-2"
                placeholder="Search by Product Name" />
            <RouterLink to="/cart" class="btn btn-primary ml-6" style="height: 45px;">
                <font-awesome-icon icon="cart-shopping" />
                <span class="badge badge-light">{{ cartStore.formattedCart.length }}</span>
            </RouterLink>
        </div>

        <section id="sidebar">

            <div class="border-bottom pb-2 ml-2">
                <h4 id="burgundy">Filters</h4>
            </div>
            <div class="py-2 border-bottom ml-3">
                <h6 class="font-weight-bold">Categories</h6>
                <div id="orange"><span class="fa fa-minus"></span></div>
                <form>
                    <div class="form-group " role="button"> <input v-model="electronic" type="checkbox"
                            @change="onChange('electronic')">
                        <label for="artisan">&nbsp;Electronic</label>
                    </div>
                    <div class="form-group">
                        <input v-model="clothes" type="checkbox" @change="onChange('clothes')"> <label for="breakfast">Men's
                            &nbsp;jclothing</label>
                    </div>
                    <div class="form-group"> <input v-model="jewellery" type="checkbox" @change="onChange('jewellery')">
                        <label for="healthy">&nbsp;Jewellery</label>
                    </div>
                </form>
            </div>
        </section>
        <div v-if="products.length !=0">
            <div class="row my-1">
            <div class="col-md-3 mb-3" v-for="product of products" key="product.id">
                <div class="card mb-4" style="width: 18rem; height: 100%;">
                    <img class="card-img-top img-height p-3" :src="product.image" alt="Card image cap">
                    <div class="card-body">
                        <p id="title" class="card-text">{{ product.title }}</p>
                        <span>
                            <p class="card-text">Price ${{ product.price }}</p>
                            <button @click="cartStore.add(product.id)"
                                class="button is-success d-flex justify-content-end">Add
                                to cart</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <template v-else-if="productStore.loaded">
          <span>
            <h1>No record to display</h1>
          </span>
        </template>
     
    </div>

    <!-- </div> -->
</template>

<style>
.img-height {
    height: 150px
}

#title {
    width: 120px;
    color: #0079c1;
    height: 2em;
    line-height: 1em;
    font-size: 20px;
    font-weight: 400;
    text-overflow: ellipsis;
    margin-bottom: 12px;
    cursor: pointer;
    word-break: break-all;
    overflow: hidden;
    white-space: nowrap;
}

#sidebar {
    width: 30%;
    padding: 20px;
    float: left
}

#title:hover {
    overflow: visible;
    white-space: normal;
    height: auto;
}
</style>