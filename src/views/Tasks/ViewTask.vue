<template>
    <div class="notes">
        <div id="navbarBasicExample " class="navbar-menu"
        :class="{'is-active': showMobileNav}">
          <div class="navbar-end">
            <RouterLink @click="showMobileNav=false" to="/task" class="navbar-item is-active">Task</RouterLink>
            <RouterLink @click="showMobileNav=false" to="/task/completed" class="navbar-item">Completed Task</RouterLink>
            <!-- <RouterLink @click="showMobileNav=false" to="/breadCrumbs" class="navbar-item">PDF</RouterLink> -->
           
          </div>
          </div>

         <addEditTask
         v-model="newtask"
         ref="addEditNoteRef"
         placeholder="Enter a Task"
         label="Add Task"
         bgColor="success"
         >
            <template #buttons>
                <button @click="addtask" 
                    :disabled="!newtask" 
                    class="button is-link has-background-dark">Add Task
                    </button>
            </template>
         </addEditTask>
        <Task v-for="task in notCompletedTaskOnly" :key="task.id" :task="task" />
    </div>
</template>

<script setup>
/*
imports
*/
import { ref, watch, computed } from 'vue';
import Task from '../../components/Tasks/Task.vue'
import {useStoreTask} from '../../stores/storeTask'
import addEditTask from '../../components/Tasks/addEditTask.vue'
//import {useWatchCharacters} from '../use/useWatch.js'
import { useStoreNotes } from '../../stores/storeNotes'
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'Task App'

const storeTask = useStoreTask();
const newtask = ref('');
const addEditNoteRef = ref(null)


const notCompletedTaskOnly = computed(() => {
    return storeTask.tasks.filter(task => !task.isTask)
  
})

const addtask = () => {
    storeTask.addTask(newtask.value)
    newtask.value = '';
    addEditNoteRef.value.focusTextArea();

}

</script>
