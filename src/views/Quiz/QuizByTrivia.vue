<template>
    <!-- <h2 class="heading1">Welcome to Quiz App</h2> -->
    <div v-if="!dataPresent" class="d-flex justify-content-center mt-5">

        <div class="spinner-border" role="status">
            <span class="sr-only">Loading your Quiz...</span>
        </div>
    </div>

    <div v-if="dataPresent" class="container1 mt-sm-5 my-3">
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <span class="">{{ questionCount }} / 10</span>
            </li>
        </ul>
        <h2 class="innerheading"><b>Category - {{ data.category }}</b></h2>
        <div class="question ml-sm-5 pl-sm-5 pt-2">
            <div class="py-2 h5">
                <b>Q {{ questionCount }} &nbsp; {{ data.question }}</b>
            </div>
            <div v-for="option in data.choices" class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                <label class="options">{{ option }}
                    <input v-model="options" :value="option" type="radio" name="radio" />
                    <span class="checkmark"></span>
                </label>

            </div>
        </div>
        <div class="d-flex align-items-center pt-6">
            <div id="prev">
                <button :disabled="questionCount === 1" @click="getPreviousQuesion()"
                    class="btn btn-primary">Previous</button>
            </div>
            <div v-if="questionCount < 10" class="ml-auto mr-sm-5">
                <button :disabled="!options" @click="getNextQuesion()" class="btn btn-success">Next</button>
            </div>
            <template v-if="questionCount === 10">
                <div class="ml-auto mr-sm-5">
                    <button @click="yourScore()" class="btn btn-success">Submit</button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive, computed, onBeforeMount, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'
import moment from "moment";
import { useStoreQuiz } from "../../stores/storeQuiz.js";
import { useStoreNotes } from '../../stores/storeNotes'
const storeNotes = useStoreNotes();
storeNotes.navTitle = 'Quiz App'

const useQuiz = useStoreQuiz();
const router = useRouter()

const data = reactive({
    question: "",
    correctAnswer: "",
    choices: [],
});

const counter = ref(-1);
const questionCount = ref(0);
const dataPresent = ref(false);
const options = ref('');
const score = ref(0)
const category = ref('')

// onBeforeMount(async () => {
//     console.log("on before Mount");
//     await useQuiz.getData();
// });

onMounted(async () => {
    console.log("On Mount");
    return new Promise(async (resolve, reject) => {
        await useQuiz.getData();
        setTimeout(() => {
            getNextQuesion();
        }, 500);
        resolve(true)
    })
});

watch(options, () => {
    // if(useQuiz.data[counter.value].userSavedAnswer)

})

const getNextQuesion = () => {
  
    questionCount.value++;
    data.question = ''
    data.correctAnswer = ''
    data.category = ''
    //console.log(useQuiz.data[counter.value + 1].userSavedAnswer)
    // if(counter.value >= 1 && useQuiz.data[counter.value].userSavedAnswer) {
    // options.value = useQuiz.data[counter.value].userSavedAnswer ? useQuiz.data[counter.value].userSavedAnswer : null
    // }
    counter.value += 1;
    let index = counter.value;
    let questionData = useQuiz.data[index]
    data.question = decodeURI(questionData.question);
    data.choices = questionData.choices;
    data.category = questionData.category
    dataPresent.value = true;
    if (options.value) {
        checkAnswer(options.value, useQuiz.data[index - 1].answerText)
        options.value = ''
    }
};

const getPreviousQuesion = () => {
    
    options.value = useQuiz.data[counter.value - 1].userSavedAnswer ? useQuiz.data[counter.value - 1].userSavedAnswer : null
    questionCount.value--
    data.question = ''
    data.correctAnswer = ''
    data.category = ''
    let index = counter.value -= 1
    let questionData = useQuiz.data[index]
    data.question = questionData.question;
    data.choices = questionData.choices;
    data.category = questionData.category
};

const checkAnswer = (userAnswer, serverAnswer) => {
    useQuiz.updateRecords(userAnswer, serverAnswer)
    if (userAnswer === serverAnswer) {
        score.value += 1
    }
}

const yourScore = () => {
    let index = counter.value;
    if (options.value) {
        checkAnswer(options.value, useQuiz.data[index].answerText)
        options.value = ''
    }
    useQuiz.score = score.value
    router.push('/score')
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */

body {
    background-color: #333;
}

.container1 {
    background-color: #555;
    color: #ddd;
    border-radius: 10px;
    padding: 20px;
    font-family: "Montserrat", sans-serif;
    max-width: 700px;
    margin-left: 19%;
    max-height: 840px;


}

.container1 p {
    font-size: 32px;
}

.question {
    width: 90%;
}

.options {
    position: relative;
    padding-left: 40px;
}

#options label {
    display: block;
    margin-bottom: 15px;
    font-size: 14px;
    cursor: pointer;
}

.options input {
    opacity: 0;
}

.checkmark {
    position: absolute;
    top: -1px;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #555;
    border: 1px solid #ddd;
    border-radius: 50%;
}

.options input:checked~.checkmark:after {
    display: block;
}

.options .checkmark:after {
    content: "";
    max-width: 300px;
    max-height: 400px;
    display: block;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 300ms ease-in-out 0s;
}

.options input[type="radio"]:checked~.checkmark {
    background: #21bf73;
    transition: 300ms ease-in-out 0s;
}

.options input[type="radio"]:checked~.checkmark:after {
    transform: translate(-50%, -50%) scale(1);
}

.btn-primary {
    background-color: #555;
    color: #ddd;
    border: 1px solid #ddd;

}

.btn-primary:hover {
    background-color: #21bf73;
    border: 1px solid #21bf73;
}

.btn-success {
    padding: 5px 25px;
    background-color: #21bf73;

}

@media (max-width: 576px) {
    .question {
        width: 100%;
        word-spacing: 2px;
    }
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

.innerheading {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-style: oblique;
    font-weight: 100;
    lighting-color: #333;
    background-color: #222124;
    border-radius: 2%;
    margin-left: 1%;
    text-align: center;
    text-transform: uppercase;
    text-shadow: #333;
    padding: 1%;
}
</style>
