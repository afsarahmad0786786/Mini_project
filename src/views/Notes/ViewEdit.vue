<template>
    <div class="edit-note">
       
        <Breadcrumb>
            <template #link>
                <li class="is-active"><a href="#">Edit Notes</a></li>
            </template>
        </Breadcrumb>
       
        <addEditNote
        v-model="noteContent"
         ref="addEditNoteref"
         bg-color="info"
         placeholder="Edit a notes"
         label="Editing Notes"
         >
            <template #buttons>
                <!-- <RouterLink to="/"
                    class="button is-link is-light"
                    >Cancel
                    </RouterLink> -->

                    <button @click="$router.push('/')"
                    class="button is-link is-light mr-4"
                    >Cancel
                    </button>
                <button 
                    class="button is-link has-background-link"
                    @click="showAlertConfirm"
                    :disabled="!noteContent">Save Notes
                    </button>

                    
            </template>
         </addEditNote>
    </div>
</template>

<script setup>
/*
imports
*/
import { ref } from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStoreNotes} from '../../stores/storeNotes'
import addEditNote from '../../components/Notes/addEditNote.vue'
import Breadcrumb from '../../components/breadCrumbs/BreadCrumbs.vue'
import { inject } from 'vue'

const swal = inject('$swal')
const noteContent = ref('')
const storeNotes = useStoreNotes();
const route = useRoute()
const router = useRouter()

noteContent.value = storeNotes.getnoteContent(route.params.id);

// const handleSaveClicked = () =>  {
//     // const payload = {
//     //     id : route.params.id,
//     //     content: noteContent.value
//     // }
//     storeNotes.updateNotes(route.params.id,noteContent.value);
//     router.push('/')
// }

const  showAlertConfirm = () => {
            swal.fire({
                title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
            }).then((result) => {
              if (result.value) {
                storeNotes.updateNotes(route.params.id,noteContent.value);
    
                swal.fire('Saved!', '', 'success')
                router.push('/notes')
              }
            });
        }
</script>