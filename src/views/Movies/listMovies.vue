<template>
  <div class="weather py-2">
    <!-- <h2 class="headiing">Movies</h2> -->
    <input class="input" type="text" placeholder="Saerch your Movies" @keyup.enter="showList($event.target.value)" />
  </div>

  <div v-if="data.poster" class="wrapper">
    <div class="main_card">
      <div class="card_left">
        <div class="card_datails">
          <h1>{{ data.title }}</h1>
          <div class="card_cat">
            <!-- <p class="PG">PG - 13</p> -->
            <p class="year">{{ data.year }}</p>
            <p class="genre">{{ data.genre }} </p>
            <p class="time">{{ data.runtime }}</p>
          </div>
          <p class="disc">{{ data.plot }}</p>
          <!-- <a href="https://www.imdb.com/title/tt4912910/" target="_blank">Read More</a> -->
          <div class="social-btn">
            <p class="year">Cast - {{ data.actors }}</p>
            <p class="year">Rating - {{ data.rating }}</p>
          </div>
        </div>
      </div>
      <div class="card_right">
        <div class="img_container">
          <img :src="data.poster" alt="">
        </div>
        <div class="play_btn">
          <a href="https://www.imdb.com/title/tt4912910/" target="_blank">
            <i class="fas fa-play-circle"></i>
          </a>
        </div>
      </div>
    </div>
  </div>



  <!-- FOLLOW -->
  <a class="Follow" href="https://codepen.io/ZaynAlaoudi/" target="blank_"></a>
</template>
  
<script setup>
import axios from 'axios'
import { reactive, onMounted } from 'vue'
import { useStoreNotes } from '../../stores/storeNotes'
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'Movies App'

const data = reactive({
  title: '',
  year: '',
  released: '',
  runtime: '',
  genre: '',
  plot: '',
  poster: '',
  actors: '',
  rating: ''
})

onMounted(() => {
  showList()
})

const showList = async (searchtext) => {
  let moviesData
  if (searchtext != undefined && searchtext != '') {
    data.users = []
    moviesData = await axios.get(`https://www.omdbapi.com/?t=${searchtext}&page=2&apikey=dbee93e2`);
    console.log(moviesData)
    let res = moviesData.data
    data.title = res.Title
    data.year = res.Year;
    data.released = res.Released
    data.runtime = res.Runtime;
    data.genre = res.Genre
    data.plot = res.Plot
    data.poster = res.Poster
    data.actors = res.Actors
    data.rating = res.Ratings[0].Value

  }
}


</script>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  /* background-color: rgb(174, 241, 174) !important; */
}

.main_card {
  color: #fff;
  width: 760px;
  height: 390px;
  margin: 50px auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: 770px;
  background: #00C9FF;
  background: -webkit-linear-gradient(to right, #92FE9D, #00C9FF);
  background: -webkit-gradient(linear, left top, right top, from(#92FE9D), to(#00C9FF));
  background: -webkit-linear-gradient(left, #92FE9D, #00C9FF);
  background: -o-linear-gradient(left, #92FE9D, #00C9FF);
  background: linear-gradient(to right, #92FE9D, #00C9FF);
  -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.card_left {
  width: 90%;
}

.card_datails {
  width: 90%;
  padding: 30px;
  margin-top: -25px;
}

.card_datails h1 {
  font-size: 30px;
}

.card_right img {
  height: 390px;
  border-radius: 2px;
}

.card_right {
  border-radius: 2px;
}

.card_cat {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.PG,
.year,
.genre,
.time {
  color: fff;
  padding: 10px;
  font-weight: bold;
  border-radius: 15px;
}

.PG {
  background: #92FE9D;
  -webkit-box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  -webkit-transition: 300ms ease-in-out;
}

.disc {
  font-weight: 100;
  line-height: 27px;
}

a {
  color: darkcyan;
  display: block;
  text-decoration: none;
}

.social-btn {
  margin-left: -10px;
}

button {
  color: #fff;
  border: none;
  padding: 20px;
  outline: none;
  font-size: 12px;
  margin-top: 30px;
  margin-left: 10px;
  background: #92FE9D;
  border-radius: 12px;
  -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -webkit-transition: 300ms ease-in-out;
  -o-transition: 200ms ease-in-out;
  transition: 200ms ease-in-out;
}

button:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.play_btn {
  height: 100%;
  margin: -394px auto;
  position: relative;
  text-align: center;
  background: rgba(0, 244, 170, 0.4);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
}

.fa-play-circle {
  color: #255;
  font-size: 160px;
  margin-top: 110px;
  -webkit-animation: bounce 1.0s -0.4s infinite;
  animation: bounce 1.0s -0.4s infinite;
}

.fa-play-circle:hover {
  color: aqua;
  animation: bounce 0.4s infinite;
}

@-webkit-keyframes bounce {
  8% {
    transform: scale(0.3);
    -webkit-transform: scale(0.8);
    opacity: 1;
  }

  10% {
    transform: scale(1.8);
    -webkit-transform: scale2);
    opacity: 0;
  }
}

@keyframes bounce {
  8% {
    transform: scale(0.3);
    -webkit-transform: scale(0.8);
    opacity: 1;
  }

  20% {
    transform: scale(1.8);
    -webkit-transform: scale2);
    opacity: 0;
  }
}





/*  FOLLOW*/
.Follow {
  background: url("https://pbs.twimg.com/profile_images/959092900708544512/v4Db9QRv_bigger.jpg")no-repeat center / contain;
  width: 50px;
  height: 50px;
  bottom: 9px;
  right: 20px;
  display: block;
  position: fixed;
  border-radius: 50%;
  z-index: 999;
  animation: rotation 10s infinite linear;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(359deg);
  }
}</style>