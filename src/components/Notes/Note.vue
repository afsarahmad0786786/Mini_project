<template>
 
  
     <div  class="card card mb-2">
            <div class="card-content">
                <div class="content">
                    {{ note.content }}
                    <div class="columns is-mobile has-text-grey-light">
                      
                        <!-- <small class="column ">{{formatted}}</small> -->
                        <small class="column has-text-right ">This comment has {{ countCharacter }}</small>
                    </div>
                </div>
            </div>
            <footer class="card-footer">
                <RouterLink
                :to="`/edit/${note.id}`"
                class="card-footer-item"
                href="#">Edit</RouterLink>

                <a @click.prevent="showAlertConfirm()"
                href="#" class="card-footer-item">Delete</a>
            </footer>
            
        </div>

</template>

<script setup>
import { computed, watch, reactive } from 'vue';
import {useStoreNotes} from '../../stores/storeNotes'
import { inject } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'

const swal = inject('$swal')

const storeNotes = useStoreNotes();
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})

const formatted =computed(() => {
  let date = new Date(parseInt(props.note.date))
  let fromattedDate =  useDateFormat(date, 'MM-DD-YYYY HH:mm:ss')
  return fromattedDate.value
}) 

const modals = reactive({
   deleteNote: false
})

//const emit = defineEmits(['deleteClick'])

const countCharacter = computed(() => {
    let description = props.note.content.length > 1 ? 'character' : 'word';

    return `${props.note.content.length} ${description}`
})



const  showAlertConfirm = () => {
            swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d13737',
              confirmButtonText: 'Yes, Delete'
            }).then((result) => {
              if (result.value) {
                storeNotes.delete(props.note.id)
                swal(
                  'Deleted!',
                  'Your Data has been deleted.',
                  'Success'
                )
              }
            });
        }

</script>