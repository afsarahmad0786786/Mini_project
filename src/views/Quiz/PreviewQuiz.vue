<template>
  <div class="card">
    <div class="card-header">
      Your Score Card is here
      <p class="scoring">Score is : {{ useQuiz.score }}</p>
    </div>

    <div v-for="(res, index) in data.allQuestions" class="card card-body mb-2">

      <h5 class="card-title">Q{{ index + 1 }}&nbsp{{ res.question }}</h5>
      <div v-for="(choice, index) in res.choices">

        <p :style="{ 'color': res.userSavedAnswer === choice ? 'blue' : 'black' }" class="card-text is-success">{{ index + 1 }}){{
          choice }}
          <span v-if="(res.userSavedAnswer !== res.answerText) && choice == res.userSavedAnswer">
            <font-awesome-icon icon="x" />
          </span>
          <span v-if="res.answerText && choice != res.userSavedAnswer && choice == res.answerText">
            <font-awesome-icon icon="check" />
          </span>
          <span v-else>
            <font-awesome-icon v-if="res.userSavedAnswer === res.answerText && choice == res.answerText" icon="check" />
          </span>
        </p>
      </div>


    </div>
  </div>
  <div class="text-center">
    <RouterLink to="/quizs" class="btn btn-primary text-center mt-3">Play Quiz Again</RouterLink>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStoreQuiz } from "../../stores/storeQuiz.js";

const useQuiz = useStoreQuiz();

const data = reactive({
  allQuestions: []
});

data.allQuestions = useQuiz.data

</script>

<style>
.scoring {
  margin-left: 800px;
}
</style>