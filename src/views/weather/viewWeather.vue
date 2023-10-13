<template>
    <div class="weather py-2">
        <h2 class="headiing">Welcome to Weather Application</h2>
        <input class="input" type="text" placeholder="Search your City" @change="showWeather($event.target.value)" />
    </div>
    <section class="vh-100" style="background-color: #4B515D;">
        <div class="container py-5 h-100">

            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-8 col-lg-6 col-xl-4">

                    <div v-if="data.temp" class="card" style="color: #4B515D; border-radius: 35px;">
                        <div class="card-body p-4">

                            <div class="d-flex">
                                <h6 class="flex-grow-1">{{ data.place }}</h6>
                                <h6>{{ data.currentTime }}</h6>
                            </div>

                            <div class="d-flex flex-column text-center mt-5 mb-4">
                                <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;">{{ data.temp }}°C</h6>
                                <span class="small" style="color: #868B94">{{ data.icon }}</span>
                            </div>

                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1" style="font-size: 1rem;">
                                    <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">

                                        </span></div>
                                    <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1">

                                        </span>
                                    </div>
                                    <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1">

                                        </span>
                                    </div>
                                    <div>
                                    <Icon :icon="data?.icon"
                                    fontSize="20px" />
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
    currentTime: ''
})

onMounted(() => {
    showWeather()
})

const showWeather = async (searchtext='Mumbai') => {
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    let newDate = date.replace(' ', 'T')
    data.currentTime = moment().format('HH:MM')
    const key = 'N9YTZQVS4C34DDVUL9U9Q2FMG'
    let result = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchtext}/${newDate}?unitGroup=metric&key=${key}&include=current`);
    //let celsius = ((result.data.currentConditions.temp - 32) * 5 / 9).toFixed(0);
    data.temp = result.data.currentConditions.temp
    data.place = result.data.resolvedAddress
    data.icon = result.data.currentConditions.icon
    data.snow = result.data.currentConditions.snow
    data.humidity = result.data.currentConditions.humidity
    data.cloudcover = result.data.currentConditions.cloudcover
}

const imgSrc = computed(() => {
    let imgName = "clearday.png"
    if (data.icon === 'CLEAR-DAY') {
        imgName = "clearday.png"
    } else {
        imgName = "partialCloudy.png"
    }
    return imgName
    // const imgUrl = `../../assets/weathers/${imgName}`
    // return imgUrl
    // return new URL(`../../assets/weathers/${imgName}.png`, import.meta.url).href
})

</script>