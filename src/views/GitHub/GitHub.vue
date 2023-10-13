<template>
  <div class="weather py-2">
    <!-- <h2 class="headiing">GitHub</h2> -->
    <input class="input" type="text" placeholder="Saerch by User Name" @keyup.enter="showList($event.target.value)" />
  </div>

  <section>
    <div v-if="data.users" class="container mt-4">
      <div class="row">
        <div class="col-md-3 mb-4" v-for="data in data.users">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-4">
              <div class="text-black">
                <div class="flex-shrink-0">
                  <img :src="data.avatar_url" alt="Generic placeholder image" class="img-fluid"
                    style="max-width: 200px; border-radius: 10px;">
                </div>
                <div class="flex-grow-1 ms-3">
                  <h5 class="mt-2">Name - {{ data.login }}</h5>
                  <p class="mb-2 pb-1" style="color: #2b2a2a;">Type - {{ data.type }}</p>
                  <!-- <div class="d-flex justify-content-start rounded-3 p-2 mb-2" style="background-color: #efefef;">
                    <div>
                      <p class="small text-muted mb-1">Repos</p>
                      <p class="mb-0">{{ data.public_repos }}</p>
                    </div>
                    <div class="px-3">
                      <p class="small text-muted mb-1">Followers</p>
                      <p class="mb-0">{{ data.followers }}</p>
                    </div>
                    <div>
                      <p class="small text-muted mb-1">Following</p>
                      <p class="mb-0">{{ data.following }}</p>
                    </div>
                  </div> -->
                  <div class="d-flex pt-1">

                    <RouterLink :to="`/git/${data.login}`" class="btn btn-primary">See Profile</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <div class="card">
  <h5 class="card-header">Repos</h5>
  <div v-for="repo in data.repos" class="card-body">
    <h5 class="card-title">{{ repo.full_name }}</h5>
    <p class="card-text">Repo - {{ repo.git_url }}</p>
    
    <RouterLink 
    :to="`/git/${repo.id}`"
    class="btn btn-primary">See Profile</RouterLink>
    <hr/>
  </div>
</div> -->
</template>

<script setup>
import axios from 'axios'
import { reactive, computed, onMounted, ref, onBeforeMount } from 'vue'
import { useStoreGit } from "../../stores/storeGit.js";
import { useStoreNotes } from '../../stores/storeNotes'
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'GitHub App'

const useGit = useStoreGit();

const dataLoaded = ref(false)

const data = reactive({
  userName: '',
  avatar_url: '',
  public_repos: '',
  followers: '',
  following: '',
  repos: [],
  type: '',
  users: []
})

onBeforeMount(() => {
  showList()
})

const showList = async (searchtext) => {
  //console.log(searchtext)
  let gitHubdata
  //let repos = await axios.get(`https://api.github.com/users/${searchtext}/repos`);

  if(searchtext != undefined && searchtext !='') {
    data.users = []
    gitHubdata = await axios.get(`https://api.github.com/users/${searchtext}`);
    data.users = gitHubdata.data
    let singledata = []
    let single = {
      avatar_url: gitHubdata.data.avatar_url,
      login: gitHubdata.data.login,
      type: gitHubdata.data.type

    }
    singledata.push(single)
    data.users = singledata
  } else {
    gitHubdata = await axios.get('https://api.github.com/users');
    data.users = gitHubdata.data
    
  }
}


</script>