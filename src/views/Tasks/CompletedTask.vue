<template>
    <div>
        <div class="row justify-content-end m-0">
            <Breadcrumb>
        <template #link>
            <li class="is-active"><a href="#">Task Completed</a></li>
        </template>
    </Breadcrumb>
            <div class="col-md-9">
                <h5 class="title is-2 m-3" title-color>Task Completed Stats</h5>
            </div>
            <div class="col-md-3">
                <select class="form-select mb-4" aria-label="Filter" @change="statusWise($event.target.value)"
                    :selected="selectedValue == value">
                    <option selected disabled>Select filter</option>
                    <option value="1">All</option>
                    <option value="2">Active</option>
                    <option value="3">Completed</option>
                </select>
            </div>
        </div>
    </div>

    <table class="table table-striped m-4 " id="divID">
        <thead class="thead-dark">
            <tr>
                <th scope="col"><b>Sr No</b></th>
                <th scope="col"><b>Task Name</b></th>
                <th scope="col"><b>Task Status</b></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in CompletedTaskOnly" :key="task.id" ind>
                <td>{{ index + 1 }}</td>
                <td>{{ task.content }}</td>
                <td :style="{ 'color': task.isTask ? 'green' : 'red' }">
                    {{ task.isTask ? 'Completed' : 'Active' }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStoreTask } from "../../stores/storeTask";
import Breadcrumb from "../../components/breadCrumbs/BreadCrumbs.vue";

const storetask = useStoreTask();
const selectedValue = ref(null)

const statusWise = ((id) => {
    let taskData = ref()
    selectedValue.value = +id
    if (+id === 1) {
        taskData = storetask.tasks
    } else if (+id === 2) {
        taskData = storetask.tasks.filter(task => !task.isTask);
    } else {
        taskData = storetask.tasks.filter(task => task.isTask);
    }
    CompletedTaskOnly = taskData
});

let CompletedTaskOnly = computed(() => {

    return storetask.tasks.filter(task => task.isTask);

});
</script>

