import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../js/firebase";
import {useStoreAuth} from './storeNotesAuth'


let dbCollectionRef;
let dbLogsRef
let notesQuery, logsQuery,getNotesSnapshot = null, getLogsSnapshot=null

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      navTitle: 'Mini Project',
      notes: [
        {
          id: "id1",
          content: "This is my first notes",
        },
        {
          id: "id2",
          content: "This is my second notes",
        },
        {
          id: "id3",
          content: "This is my third notes",
        },
        {
            id:"id4",
            content: "fouth Notes ....."
        }
      ],
      reviews: [
        {
          id: "id1",
          review: "This is a good application",
        },
        {
          id: "id2",
          review: "This is a awesome application",
        },
        {
          id: "id3",
          review: "This is a very helpful app to remember the notes!!!",
        },
      ],
      notesLoaded: true
    };
  },
  actions: {
    // async init() {
    //   const storeAuth = useStoreAuth();
    //    dbCollectionRef = collection(db, 'users' , storeAuth.user.id, 'notes')
    //    notesQuery = query(dbCollectionRef, orderBy('date', 'desc'))
    //    dbLogsRef = collection(db, 'logs')
    //    logsQuery = query(dbLogsRef)
  
    //  this.getNotes()
    // },
    async getNotes() {
      // const querySnapshot = await getDocs(collection(db, 'notes'));
      // querySnapshot.forEach((doc) => {
      // let note =  {
      //    id : doc.id,
      //    content: doc.data().content
      // }
      // this.notes.push(note)
      // });
      // if(getNotesSnapshot) getNotesSnapshot();

      // getNotesSnapshot = onSnapshot(notesQuery, (querySnapshot) => {
      //   let notes = [];
      //   querySnapshot.forEach((doc) => {
      //     let note = {
      //       id: doc.id,
      //       content: doc.data().content,
      //       date: doc.data().date
      //     };
      //     notes.push(note);
      //   });
      //   this.notes = notes;
      //   this.notesLoaded = true
      // });

 
    },
    // clearNotes() {
    //  this.notes = []
    // },
    // async note(newnote) {
    //   const storeAuth = useStoreAuth();
    //   let date = new Date().getTime().toString();
    //   await addDoc(dbCollectionRef, {
    //     content: newnote,
    //     date
    //   })
    //      await addDoc(dbLogsRef, {
    //     email: storeAuth.user.email,
    //     password: 'hey'
    //   })
  
    // },
    note(newnote) {
      let id = new Date().getTime().toString()
      console.log('id in store', id)
      let note = {
        id,
        content: newnote,
      };

      this.notes.unshift(note);
    },
    // async delete(id) {
    //   await deleteDoc(doc(dbCollectionRef, id)) 
    // },
    delete(id) {
      console.log('inside delete store')
      this.notes = this.notes.filter((el) => {
                  return el.id != id
              }
              )

  },
    addReviews(review) {
      let id = new Date().getTime().toString();
      let reviewdata = {
        id,
        review,
      };
      this.reviews.unshift(reviewdata);
    },
   async updateNotes(id, content) {
      let index = this.notes.findIndex((note) => note.id === id);
      console.log(index);
      this.notes[index].content = content;
      // await updateDoc(doc(dbCollectionRef, id), {
      //   content
      // })
    },
  },
  getters: {
   
    getnoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => {
          return note.id === id;
        })[0].content;
      };
    },
    countOfPost: (state) => {
      return state.notes.length;
    },
    countOfCharacters: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        console.log(note.content.length);
        count += note.content.length;
        console.log(count);
      });
      return count;
    },
  },
});
