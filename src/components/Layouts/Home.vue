<template>
  <br />
  <br />
  <div class="row my-1">

    <div class="col-sm-3">
      <div class="card text-white bg-success rounded-6" style="width: 18rem;">
        <img class="card-img-top img-height" src="../../assets/note.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Note App</h5>
          <p class="card-text">We can insert and edit notes</p>
          <RouterLink to="/notes" class="btn btn-primary">Visit</RouterLink>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card text-white bg-success rounded-6" style="width: 18rem;">
        <img class="card-img-top img-height" src="../../assets/weather.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Weather App</h5>
          <p class="card-text">See current weather </p>
          <RouterLink to="/weather" class="btn btn-primary">Visit</RouterLink>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="card text-white bg-success rounded-6" style="width: 18rem;">
        <img class="card-img-top img-height" src="../../assets/task.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Task App</h5>
          <p class="card-text">We can insert and edit task</p>
          <RouterLink to="/task" class="btn btn-primary">Visit</RouterLink>
        </div>
      </div>

    </div>
    <div class="col-sm-3">
      <div class="card text-white bg-success rounded-6" style="width: 18rem;">
        <img class="card-img-top img-height" src="../../assets/github.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">GitHub App</h5>
          <p class="card-text">We can see github profile</p>
          <RouterLink to="/git" class="btn btn-primary">Visit</RouterLink>
        </div>
      </div>
    </div>
  </div>


  <div class="row my-3 py-4">
    <div class="col-sm-3">
    <div class="card text-white bg-success rounded-6" style="width: 18rem;">
  <img  class="card-img-top img-height" src="../../assets/shoppinh.png" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Ecommerce App</h5>
    <p class="card-text">Buy your products</p>
    <RouterLink to="/ecommerce" class="btn btn-primary">Visit</RouterLink>
  </div>
</div>
  </div>

  <div class="col-sm-3">
    <div class="card text-white bg-success rounded-6" style="width: 18rem;">
  <img  class="card-img-top img-height" src="../../assets/quiz.png" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Quiz Game</h5>
    <p class="card-text">Here you can play quiz</p>
    <RouterLink to="/quizs" class="btn btn-primary">Visit</RouterLink>
  </div>
</div>
  </div>

  <div class="col-sm-3">
    <div class="card text-white bg-success rounded-6 popup" style="width: 18rem;">
  <img  class="card-img-top img-height" src="../../assets/movie.png" alt="Card image cap" >
  <div class="card-body">
    <h5 class="card-title">Movies App</h5>
    <p class="card-text">Watch your faviorate movies</p>
    <RouterLink to="/movies" class="btn btn-primary">Visit</RouterLink>
  </div>
</div>
  </div>
  
    </div>
</template>

<script setup>
import { useStoreNotes } from "../../stores/storeNotes.js";
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'Mini Project'
</script>


<style>
.img-height {
  height: 148px
}

.bg-success1 {
  background-color: rgb(26, 39, 39);
}
</style>