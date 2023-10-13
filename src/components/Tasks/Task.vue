<template>
  <div style=".cntnr{
        overflow-x: hidden;
    }">
  <div class="card  mb-4" style="transition: transform 1s 0s;">
    <div class="card-content">
      <div class="content">
        {{ task.content }}
      </div>
    </div>
    <footer class="card-footer">
      <a 
      @click.prevent="showAlertConfirmForEdit(task.id, task.content)" 
      href="#" 
      class="card-footer-item">
      <font-awesome-icon icon="edit" /> Edit
      </a>
      <a 
      @click.prevent="showAlertConfirm()" 
      href="#" 
      class="card-footer-item">
      <font-awesome-icon icon="trash" />Delete
      </a>
      <a class="card-footer-item">
      <label 
      class="card-footer-item checkbox " 
      style="color: blue;">
      <input 
      type="checkbox" 
      v-model="isTask" 
      v-on:change="istaskCompleted(task.id)">
      Done
      <!-- <font-awesome-icon icon="check" /> -->
      </label>
    </a>
    </footer>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreTask } from '../../stores/storeTask'
import { inject } from 'vue'

const swal = inject('$swal')
const storeTask = useStoreTask();

const isTask = ref(false);

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const istaskCompleted = (id) => {
  storeTask.completedTask(id, isTask.value)
  console.log('hello')
}

const showAlertConfirmForEdit = (id, task) => {
  swal({
    title: 'Edit your Task',
    input: 'text',
    inputLabel: 'Your Task',
    inputValue: task,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d13737',
    confirmButtonText: 'Edit'
  }).then((result) => {
    if (result.value) {
      console.log(result.value)
      storeTask.updateTask(id, result.value)
      swal(
        'Edited!',
        'Your Task has been Edited.',
        'Success'
      )
    }
  });
}

const showAlertConfirm = () => {
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
      storeTask.delete(props.task.id)
      swal(
        'Deleted!',
        'Your Task has been deleted.',
        'Success'
      )
    }
  });
}
</script>