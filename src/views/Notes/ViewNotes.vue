<template>
    <div class="notes">

        <addEditNote v-model="newNotes" ref="addEditNoteRef" placeholder="Enter a notes" label="Adding Notes">
            <template #buttons>
                <button @click="addNote" :disabled="!newNotes" class="button is-link has-background-success">Add New Notes
                </button>
            </template>
        </addEditNote>
        <input v-model="searchposts" class="input" type="text" placeholder="search your notes" />
        <!-- <progress v-if="storeNotes.notes.length" class="progress is-large is-info" max="100">60%</progress> -->


        <Note v-for="note in filteredList()" :key="note.id" :note="note" />

        <div class="is-size-4 has-text-centered has-text-=grey-light is-family-monospace" v-if="!storeNotes.notes.length">
            No Notes here to display.

        </div>
        <NoResults v-if="!filteredList().length & storeNotes.notes.length" />


    </div>
</template>

<script setup>
/*
imports
*/

import { ref, watch, onMounted } from 'vue';
import Note from '../../components/Notes/Note.vue'
import { useStoreNotes } from '../../stores/storeNotes'
import { useStoreAuth } from '../../stores/storeNotesAuth.js'
import addEditNote from '../../components/Notes/addEditNote.vue'
import { useWatchCharacters } from '../../use/useWatch'
import NoResults from '../../components/Notes/NoResults.vue'


const storeNotes = useStoreNotes();
const storeAuth = useStoreAuth();
const newNotes = ref('');
const addEditNoteRef = ref(null)
const searchposts = ref('')

storeNotes.navTitle = 'Notes App'

const addNote = () => {
    storeNotes.note(newNotes.value)
    newNotes.value = '';
    addEditNoteRef.value.focusTextArea();
}

useWatchCharacters(newNotes, 100)

function filteredList() {
    return storeNotes.notes.filter((note) =>
        note.content.toLowerCase().includes(searchposts.value.toLowerCase())
    );
}

onMounted(() => {
    storeNotes.getNotes()
})


</script>
