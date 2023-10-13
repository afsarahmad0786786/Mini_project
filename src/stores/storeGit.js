import { defineStore } from "pinia";
import axios from "axios";

export const useStoreGit = defineStore("storeGit", {
  state: () => {
    return {
      repos: [],
      userDetails: {}
    };
  },
  actions: {
    async loadUserDetails(searchtext) {
      this.repos = []
      await axios
        .get(`https://api.github.com/users/${searchtext}/repos`)
        .then((response) => {
          this.repos.push(response.data) 
           console.log(this.repos)
        })   
        await axios
        .get(`https://api.github.com/users/${searchtext}`)
        .then((response) => {
            this.userDetails = {};
            this.userDetails.follower =  response.data.followers,
            this.userDetails.following =  response.data.following,
            this.userDetails.public_repos=  response.data.public_repos,
            this.userDetails.name = response.data.name,
            this.userDetails.avatar_url =  response.data.avatar_url
            this.userDetails.created_at = response.data.created_at
            this.userDetails.type = response.data.type
            this.userDetails.twitter_username = response.data.twitter_username
        })   
    }
  }, 
  //  getRepos(id) {
  //     let index = this.repos.findIndex((repo) => repo.id === id);
  //     return repos[index];
  //  }
});
