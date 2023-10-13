import { createRouter, createWebHashHistory } from "vue-router";
import ViewTask from "../views/Tasks/ViewTask.vue";
import CompletedTask from "../views/Tasks/CompletedTask.vue";

import Home from "../components/Layouts/Home.vue";
/*
Notes import
*/
import ViewNotes from "../views/Notes/ViewNotes.vue";
import StatsView from "../views/Notes/StatsView.vue";
import ViewEdit from "../views/Notes/ViewEdit.vue";
import ViewAuth from "../views/Notes/ViewAuth.vue";

/*
Weather import
*/
import ViewWeathers from "../views/weather/viewWeathers.vue";

/*
Quiz import
*/
import ViewQuiz from "../views/Quiz/QuizByTrivia.vue";
import PreviewQuiz from "../views/Quiz/PreviewQuiz.vue";

/*
gitHUb import
*/
import GitHub from "../views/gitHUb/GitHub.vue";
import ViewProfile from "../views/gitHUb/ViewProfile.vue";

/*
Movies import
*/
import ListMovies from "../views/Movies/listMovies.vue";

/*
Ecommerce import
*/
//import ShowProduct from "../views/Ecommerce/ShowProduct.vue";
import HomeVue from "../views/Ecommerce/Home.vue"
import Cart from "../views/Ecommerce/Cart.vue"
import Product from "../views/Ecommerce/Product.vue"


/*
store import
*/
import { useStoreAuth } from "../stores/storeNotesAuth.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/task",
    name: "task",
    component: ViewTask,
  },

  {
    path: "/task/completed",
    component: CompletedTask,
  },

  {
    path: "/notes",
    name: "note",
    component: ViewNotes,
  },
  {
    path: "/stats",
    component: StatsView,
  },
  {
    path: "/edit/:id",
    component: ViewEdit,
  },
  {
    path: "/weather",
    component: ViewWeathers,
  },
  {
    path: "/auth",
    name: "auth",
    component: ViewAuth,
  },
  {
    path: "/quizs",
    name: "quiz",
    component: ViewQuiz,
  },
  {
    path: "/score",
    name: "score",
    component: PreviewQuiz,
  },
  {
    path: "/git",
    name: "git",
    component: GitHub,
  },
  {
    path: "/git/:id",
    name: "git_profile",
    component: ViewProfile,
  },
  {
    path: "/movies",
    name: "movies",
    component: ListMovies,
  },
  {
    path: "/ecommerce",
    name: "ecommerce",
    component: HomeVue,
  },
  {
    path: '/product/:productId', 
    component: Product
  },
  {
    path: '/cart', 
    component: Cart 
  }
];

const router = createRouter({
  history: createWebHashHistory(),

  scrollBehavior(to, from, savedPosition) {
    
    console.log("to", to);

    console.log("from", from);

    console.log("SavedPosition", savedPosition);

    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
  routes,
});

//Navigation Guard
// router.beforeEach(async (to, from) => {
//   const storeNoteAuth = useStoreAuth()
//   if (
//    !storeNoteAuth.user.id && to.name !== 'auth'
//   ) {
//     return { name: 'auth' }
//   }
//   if(storeNoteAuth.user.id && to.name === 'auth') {
//     return false
//   }
// })

export default router;
