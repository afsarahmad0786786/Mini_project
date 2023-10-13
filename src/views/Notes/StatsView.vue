<template>
    <Breadcrumb>
        <template #link>
            <li class="is-active"><a href="#">view Stats</a></li>
        </template>
    </Breadcrumb>

    <h5 class="title is-2" title-color>
        Post Status
    </h5>
    <button style="margin-left: 87%; margin-top: -8%; " class="button  is-success is-rounded" @click="generatePDF()">
        <span class="icon">
            <font-awesome-icon icon="file-pdf" />
        </span>
        <span>Get PDF</span>
    </button>
    <table class="table is-fullwidth " id="divID">
        <thead>
            <tr>
                <th>Posts Count</th>
                <th>Character Count</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Number of Notes</td>
                <td>{{ postCount }}</td>
            </tr>
            <tr>
                <td>Number of Characters</td>
                <td>{{ characterCount }}</td>
            </tr>
        </tbody>
    </table>
    <input type="text" class="input" v-model="reviews" placeholder="Do you love NoteBalls?" v-autofocus />
    <br />
    <br />
    <button @click="handleSubmitReviews" :disabled="!reviews" style="margin-left:45%;"
        class="button is-success  x`">Submit</button>
    <br />
    <br />
    <div v-for="review1 in storeNotes.reviews" :key="review1.id" class="card  mb-4">
        <div class="card-content" style="background-color:beige; text-shadow: 0cqmax; text-transform: capitalize;
            text-overflow: ellipsis; text-justify: newspaper; text-indent: 0dvb;
            font-weight: 200%; font-size:large;;">
            <div class="content ">
                {{ review1.review }}
                <!-- <div class="has-text-right">
                        <small>This reviews has {{ countCharacter }}</small>
                    </div> -->
            </div>
        </div>
    </div>
    <p>Have a phone call1: <font-awesome-icon :icon="['fas', 'file-pdf']" /></p>
</template>

<script setup>
import { useStoreNotes } from '../../stores/storeNotes'
import { useWatchCharacters } from '../../use/useWatch'
import { ref, computed } from 'vue'
import Breadcrumb from '../../components/breadCrumbs/BreadCrumbs.vue'
import jsPDF from 'jsPDF'
import { vAutofocus } from '../../Directives/vAutoFocus'

const storeNotes = useStoreNotes();
const postCount = ref('');
const characterCount = ref('');
const reviews = ref('');

postCount.value = storeNotes.countOfPost
characterCount.value = storeNotes.countOfCharacters

const generatePDF = () => {
    let doc = new jsPDF('20', 'mm', [1800, 2000]);
    let pdfjs = document.querySelector('#divID');
    let pdfName = 'stats';
    doc.html(pdfjs, {
        callback: function (doc) {
            doc.save(pdfName + '.pdf');
        },
        x: 5,
        y: 6
    });
}

const handleSubmitReviews = () => {
    storeNotes.addReviews(reviews.value)
    reviews.value = ''
}

const countCharacter = computed(() => {
    console.log(storeNotes.reviews.review)
    let description = storeNotes.reviews.reviewlength > 1 ? 'character' : 'word';

    return `${storeNotes.reviews.reviewlength} ${description}`
})

useWatchCharacters(reviews, 50)

</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.np-btn {
    padding: 2px 8px;
    margin: 12px 8px;
    border: 1px solid #161516;
    width: 110px;
    background: hsl(276, 86%, 46%);
    border-radius: 6px;
    color: #ffffff;
    cursor: pointer;
}
</style>