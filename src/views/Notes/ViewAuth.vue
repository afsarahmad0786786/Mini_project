<template>
    <div class="tabs is-centered">
        <ul>
            <li :class="{ 'is-active': !register }">
                <a @click.prevent="register = false">Login</a>
            </li>
            <li :class="{ 'is-active': register }">
                <a @click.prevent="register = true">Register</a>
            </li>

        </ul>
    </div>
    <form @submit.prevent="submitData()">
        <div class="card auth-form">
            <div class="card-content">
                <div class="title has-text-centered">{{ formTitle }}</div>

                <div class="content">
                    <div class="field">
                        <label class="label">UserName</label>
                        <div class="control">
                            <input v-model="credentials.email" class="input" type="text" placeholder="UserName">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input v-model="credentials.password" class="input" type="password" placeholder="Password">
                        </div>
                    </div>

                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-primary">
                                {{ formTitle }}
                            </button>
                        </p>

                    </div>


                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
/*
Import
*/
import { ref, computed, reactive } from 'vue'
import {useStoreAuth} from '../../stores/storeNotesAuth.js'

const register = ref(false)
const notesAuth = useStoreAuth()

const credentials = reactive({
    email: '',
    password: ''
})

const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login'
})

const submitData = () => {
    console.log('submit')
    if (!credentials.email || !credentials.password) {
        alert('Please enter UserName and Password')
    }
    else {
        if (register.value) {
            notesAuth.registerUser(credentials.email, credentials.password)

        } else {
            notesAuth.login(credentials)
        }
    }
}

</script>

<style>
.auth-form {
    max-width: 400px;
    margin: 0 auto;

}
</style>