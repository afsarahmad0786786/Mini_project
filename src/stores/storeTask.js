import { defineStore } from "pinia";

export const useStoreTask = defineStore("storeTask", {
  state: () => {
    return {
      title: 'task Manager',
      tasks: [
        {
          id: "id1",
          content: "Training need to be completeds",
          isTask: false
        },
        {
          id: "id2",
          content: "Mini Project need to start",
          isTask: false
        },
        {
          id: "id3",
          content: "Need to complette ISO training",
          isTask: true
        },
        {
            id:"id4",
            content: "Need to send an email for PTO approval..",
            isTask: false
        }
      ],
    
    };
  },
  actions: {
    addTask(newtask) {
      let id = new Date().getTime().toString()
      let task = {
        id,
        content: newtask,
        isTask: false
      };

      this.tasks.unshift(task);
    },
    delete(id) {
        this.tasks = this.tasks.filter((el) => {
                    return el.id != id
                }
                )

    },
    updateTask(id, content) {
        console.log('in store task', content)
        let index = this.tasks.findIndex(task => task.id === id);
        this.tasks[index].content = content
    },
    
    completedTask(id, istask) {
        console.log('in store task', istask)
        let index = this.tasks.findIndex(task => task.id === id);
        this.tasks[index].isTask = istask
        console.log(this.tasks)
    }
  },
  getters: {
    getTaskNotCompleted: (state) => {
        return state.tasks.filter(task => task.isTask === 'false')
    },
    countOfPost: (state) => {
        
        return state.notes.length
    },
    countOfCharacters: (state) => {
        let count = 0
           state.notes.forEach((note) => {
            console.log(note.content.length)
            count += note.content.length
            console.log(count)
        })
        return count
    },
    
  }
});
