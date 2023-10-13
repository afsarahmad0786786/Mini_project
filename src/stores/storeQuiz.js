import { defineStore } from "pinia";
import axios from "axios";

export const useStoreQuiz = defineStore("storeQuiz", {
  state: () => {
    return {
      data: [],
      preview: [],
      score: ''
    };
  },
  actions: {
    async getData() {
      this.data = []
      await axios
        .get("https://opentdb.com/api.php?amount=10")
        .then((response) => {
          return response.data.results;
        })
        .then((data) => {
          const newQuestions = data.map((serverQuestion) => {
            const arrangedQuestion = {
              question: serverQuestion.question,
              choices: "",
              answer: "",
              answerText: "",
              category: serverQuestion.category
            };
            const choices = serverQuestion.incorrect_answers;
            arrangedQuestion.answer = Math.floor(Math.random() * 4 + 1);
            arrangedQuestion.answerText = serverQuestion.correct_answer

            choices.splice(
              arrangedQuestion.answer - 1,
              0,
              serverQuestion.correct_answer
            );
            arrangedQuestion.choices = choices;
            this.data.push(arrangedQuestion);
          });
        });
    },

    updateRecords(userAnswer, serverAnswer) {
           let index = this.data.findIndex((question) => question.answerText === serverAnswer);
           this.data[index].userSavedAnswer = userAnswer;
    },
  },

  getters: {
    getOptions: (state) => {
      return state.data.filter((task) => task.isTask === "false");
    },
  },
});
