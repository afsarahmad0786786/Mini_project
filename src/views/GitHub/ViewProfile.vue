<template>
  <section v-if="useGit.repos.length > 0" class="h-100 gradient-custom-2">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
            <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
              <img :src="useGit.userDetails.avatar_url"
                alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                style="width: 150px; z-index: 1">
        
            </div>
            <div class="ms-3" style="margin-top: 130px;">
              <nh5>{{ useGit.userDetails.name }}</nh5>
              <p>Created - {{useGit.userDetails.created_at}}</p>
            </div>
          </div>
          <div class="p-4 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5">{{useGit.userDetails.public_repos}}</p>
                <p class="small text-muted mb-0">Repos</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h5">{{useGit.userDetails.follower}}</p>
                <p class="small text-muted mb-0">Followers</p>
              </div>
              <div>
                <p class="mb-1 h5">{{useGit.userDetails.following}}</p>
                <p class="small text-muted mb-0">Following</p>
              </div>
            </div>
          </div>
          <div class="card-body p-4 text-black">
            <div class="mb-1">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style="background-color: #f8f9fa;">
                <p class="font-italic mb-1">Type - {{useGit.userDetails.type}}</p>
                <p class="font-italic mb-1">Twitter - {{useGit.userDetails.twitter_username}}</p>
                <!-- <p class="font-italic mb-0">Photographer</p> -->
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <p class="lead fw-normal mb-0">Repos</p>

            </div>
            <div v-for="repo in useGit.repos[0]" class="card-body ">
    <h5 class="card-title">{{ repo.full_name }}</h5>
    <p class="card-text">Repo - <a :href="repo.html_url">{{ repo.git_url }}</a></p>
    <hr/>
    
</div> 
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center">
        <RouterLink
        to="/git" 
        class="btn btn-primary text-center mt-0">
        Back
      </RouterLink>
      </div>
</section>
</template>
  
  <script setup>
import {reactive, onMounted} from  'vue';
import {useRoute, useRouter} from 'vue-router'
import { useStoreGit } from "../../stores/storeGit.js";
import Breadcrumb from '../../components/breadCrumbs/BreadCrumbs.vue'

const useGit = useStoreGit();
const route = useRoute()
const router = useRouter()

onMounted(() => {
    getProfile()
})

let getProfile = () => {
  const data = useGit.loadUserDetails(route.params.id)
  
}
</script>
  
<style>
  .scoring {
    margin-left: 800px;
  }
</style>
