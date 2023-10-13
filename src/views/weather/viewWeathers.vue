<template>
    <div class="weather py-2">
        <!-- <h2 class=" justify-content-center">Welcome to Weather Application</h2> -->
        <input class="input" type="text" placeholder="Search your City" @change="showWeather($event.target.value)" />
    </div>
    <section class="vh-100" style="background-color: #C1CFEA;">
  <div v-if="data.temp"  class="container py-5 h-100">

    <div class="row d-flex justify-content-center align-items-center h-100" style="color: #282828;">
      <div class="col-md-9 col-lg-7 col-xl-5">

        <div class="card mb-4 gradient-custom" style="border-radius: 25px;">
          <div class="card-body p-4">

            <div id="demo1" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              <!-- <ul class="carousel-indicators mb-0">
                <li data-target="#demo1" data-slide-to="0" class="active"></li>
                <li data-target="#demo1" data-slide-to="1"></li>
                <li data-target="#demo1" data-slide-to="2"></li>
              </ul> -->
              <!-- Carousel inner -->
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="d-flex justify-content-between mb-4 pb-2">
                    <div>
                      <h2 class="display-2"><strong>{{ data.temp }}°C</strong></h2>
                      <p class="text-muted mb-0">{{ data.place }}</p>
                      <p class="text-muted mb-0">{{ data.icon.toUpperCase() }}</p>
                      <p class="text-muted mb-0">Humidity-{{ data.humidity }}</p>
                      <p class="text-muted mb-0">Snow-{{ data.snow }}</p>
                    </div>
                   <div>
                       
                    </div>
                    <div>
                       <p class="ml-6">{{ data.currentTime }}</p>
                        <Icon :icon="data?.icon"
                        fontSize="90px" ></Icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="card mb-4" style="border-radius: 25px;"> 
          <div class="card-body p-4">

            <div id="demo2" class="carousel slide" data-ride="carousel">
       
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="d-flex justify-content-around text-center mb-4 pb-3 pt-2">
                    <div v-for="hour in data.hoursdata" class="flex-column">
                      <p class="small"><strong>{{hour.temp}}°C</strong></p>
                      <i class="fas fa-sun fa-2x mb-3" style="color: #ddd;"></i>
                      <p class="mb-0"><strong>{{hour.datetime}}</strong></p>
                      <p class="mb-0 text-muted" style="font-size: .65rem;">{{hour.icon}}</p>
                      <Icon :icon="hour.icon"
                        fontSize="20px" ></Icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div> 


      </div>
    </div>

  </div>
</section>

</template>

<script setup>
import axios from 'axios'
import { reactive, computed, onMounted } from 'vue'
import moment from 'moment'
import Icon from '../../components/Layouts/Icon.vue';
import { useStoreNotes } from '../../stores/storeNotes'
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'Weather App'

const data = reactive({
    temp: '',
    place: '',
    icon: '',
    cloudCover: '',
    humidity: '',
    snow: '',
    currentTime: '',
    hoursdata: []
})

onMounted(() => {
    showWeather()
})

const showWeather = async (searchtext='Mumbai') => {
    data.hoursdata=[]
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate = date.replace(' ', 'T')
    data.currentTime = moment().format('HH:MM A')
    const key = 'N9YTZQVS4C34DDVUL9U9Q2FMG'
    let result = await 
    axios
    .get
    (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchtext}/${newDate}?unitGroup=metric&key=${key}&include=current,hours`);
    //let celsius = ((result.data.currentConditions.temp - 32) * 5 / 9).toFixed(0);
    data.temp = result.data.currentConditions.temp
    data.place = result.data.resolvedAddress
    data.icon = result.data.currentConditions.icon
    data.snow = result.data.currentConditions.snow
    data.humidity = result.data.currentConditions.humidity
    for(let i=0; i<5; i++) {
      let index = result.data.days[0].hours.findIndex((hour) => hour.datetime.includes(moment().format('HH')));
        data.hoursdata.push(result.data.days[0].hours[index+i+1])
    }
}

console.log(data.hoursdata)

</script>

<style>
.gradient-custom {
/* fallback for old browsers */
background: #ffffff;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 236, 210, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 236, 210, 1))
}

.carousel-indicators li {
background-color: #282828;
width: 7px;
height: 7px;
border-radius: 50%;
}

.heading1 {
    font-size: 70px;
    font-weight: 600;
    background-image: linear-gradient(to left, #553c9a, #b393d3);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    margin-left: 18%;
}
</style>