<template>
    
    <h2 class="heading1">Welcome to Quiz App</h2>
    <div v-if="!dataPresent" class="d-flex justify-content-center mt-5">
        
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading your Quiz...</span>
        </div>
    </div>

    <div class="game-quiz-container">

<div v-if="dataPresent" class="game-details-container">
    <h1> Question : <span id="question-number"></span> / 10</h1>
</div>

<div class="game-question-container">
    <h1 id="display-question"></h1>
</div>

<div class="game-options-container">

   <div class="modal-container" id="option-modal">

        <div class="modal-content-container">
             <h1>Please Pick An Option</h1>

             <div class="modal-button-container">
                <button onclick="closeOptionModal()">Continue</button>
            </div>

        </div>

   </div>

    <span>
        <input type="radio" id="option-one" name="option" class="radio" value="optionA" />
        <label for="option-one" class="option" id="option-one-label"></label>
    </span>


    <span>
        <input type="radio" id="option-two" name="option" class="radio" value="optionB" />
        <label for="option-two" class="option" id="option-two-label"></label>
    </span>


    <span>
        <input type="radio" id="option-three" name="option" class="radio" value="optionC" />
        <label for="option-three" class="option" id="option-three-label"></label>
    </span>


    <span>
        <input type="radio" id="option-four" name="option" class="radio" value="optionD" />
        <label for="option-four" class="option" id="option-four-label"></label>
    </span>


</div>

<div class="next-button-container">
    <button onclick="handleNextQuestion()">Next Question</button>
</div>

</div>

</template>

<script setup>
import axios from "axios";
import { reactive, computed, onBeforeMount, ref, onMounted } from "vue";
import {useRoute, useRouter} from 'vue-router'
import moment from "moment";
import { useStoreQuiz } from "../../stores/storeQuiz.js";

const useQuiz = useStoreQuiz();
const router = useRouter()

const data = reactive({
    question: "",
    correctAnswer: "",
    choices: [],
});

const counter = ref(0);
const dataPresent = ref(false);
const options = ref('');
const score = ref(0)
const previosClicked = ref(false)

onBeforeMount(async () => {
    console.log("on before Mount");
    await useQuiz.getData();
});

onMounted(() => {
    console.log("On Mount");
    setTimeout(() => {
        getNextQuesion();
    }, 2000);
});

const getNextQuesion = () => {
    data.question = ''
    data.correctAnswer = ''
    let index = counter.value;
    let questionData = useQuiz.data[index]
    data.question = questionData.question;
    data.choices = questionData.choices;
    counter.value += 1;
    dataPresent.value = true;
    if(options.value) {
    checkAnswer(options.value, useQuiz.data[index-1].answerText, index-1)
    }
};

const getPreviousQuesion = () => {
    data.question = ''
    data.correctAnswer = ''
    let index = counter.value;
    counter.value -= 1
    let questionData = useQuiz.data[index]
    
    data.question = questionData.question;
    data.choices = questionData.choices;
};

const checkAnswer = (userAnswer, serverAnswer) => {
    useQuiz.updateRecords(userAnswer, serverAnswer)
    if(userAnswer === serverAnswer)
    {
        score.value++
    } else {
        score.value--
    }
    console.log(score.value)
}

const yourScore = () => {
    router.push('/score')
}

</script>

<style>
/* *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */

/* html, body{
    height: 100%;
} */


/* body{
    font-family: 'Montserrat', serif;

} */

main{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    background: url('../assets/background_image.jpg');
    background-color : black;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
}

.game-quiz-container{
    width: 40rem;
    height: 30rem;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 30px;
    margin-left: 20%;
}

.game-details-container{
    width: 80%;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.game-details-container h1{
    font-size: 1.2rem;
}

.game-question-container{
    width: 80%;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid darkgray;
    border-radius: 25px;
}

.game-question-container h1{
    font-size: 1.1rem;
    text-align: center;
    padding: 3px;
}

.game-options-container{
    width: 80%;
    height: 12rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
}

.game-options-container span{
    width: 45%;
    height: 3rem;
    border: 2px solid darkgray;
    border-radius: 20px;
    overflow: hidden;
}
span label{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s;
    font-weight: 600;
    color: rgb(22, 22, 22);
}

span label:hover{
    -ms-transform: scale(1.12);
    -webkit-transform: scale(1.12);
    transform: scale(1.12);
    color: white;
}

input[type="radio"] {
    position: relative;
    display: none;
}


input[type=radio]:checked ~ .option {
    background: paleturquoise;
}

.next-button-container{
    width: 50%;
    height: 3rem;
    display: flex;
    justify-content: center;
}
.next-button-container button{
    width: 8rem;
    height: 2rem;
    border-radius: 10px;
    background: none;
    color: rgb(25, 25, 25);
    font-weight: 600;
    border: 2px solid gray;
    cursor: pointer;
    outline: none;
}
.next-button-container button:hover{
    background-color: rgb(143, 93, 93);
}

.modal-container{
    display: none;
    position: fixed;
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    -webkit-animation: fadeIn 1.2s ease-in-out;
    animation: fadeIn 1.2s ease-in-out;
}

.modal-content-container{
    height: 20rem;
    width: 25rem;
    background-color: rgb(43, 42, 42);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 25px;
}

.modal-content-container h1{
    font-size: 1.3rem;
    height: 3rem;
    color: lightgray;
    text-align: center;
}

.grade-details{
    width: 15rem;
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.grade-details p{
    color: white;
    text-align: center;
}

.modal-button-container{
    height: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-button-container button{
    width: 10rem;
    height: 2rem;
    background: none;
    outline: none;
    border: 1px solid rgb(252, 242, 241);
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 20px;
}
.modal-button-container button:hover{
    background-color: rgb(83, 82, 82);
}

@media(min-width : 300px) and (max-width : 350px){
    .game-quiz-container{
        width: 90%;
        height: 80vh;
     }
     .game-details-container h1{
        font-size: 0.8rem;
     }

     .game-question-container{
        height: 6rem;
     }
     .game-question-container h1{
       font-size: 0.9rem;
    }

    .game-options-container span{
        width: 90%;
        height: 2.5rem;
    }
    .game-options-container span label{
        font-size: 0.8rem;
    }
    .modal-content-container{
        width: 90%;
        height: 25rem;
    }

    .modal-content-container h1{
        font-size: 1.2rem;
    }
}

@media(min-width : 350px) and (max-width : 700px){
   .game-quiz-container{
       width: 90%;
       height: 80vh;
    }
    .game-details-container h1{
        font-size: 1rem;
    }

    .game-question-container{
        height: 8rem;
    }

    .game-question-container h1{
        font-size: 0.9rem;
     }

    .game-options-container span{
        width: 90%;
    }
    .modal-content-container{
        width: 90%;
        height: 25rem;
    }
    .modal-content-container h1{
        font-size: 1.2rem;
    }
}



@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity:1 ;}
  }

  @-webkit-keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
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
