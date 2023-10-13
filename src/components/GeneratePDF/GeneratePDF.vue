<template>
    <div id="app">
        <div @click="generatePDF()" class="np-btn">Generate PDF</div>

    </div>
</template>
  
<script setup>
import jsPDF from 'jsPDF'
import StatsView from '../../views/StatsView.vue'
//let pdfjs = StatsView.document.querySelector('#divID');
console.log(pdfjs)
const generatePDF = () => {
    console.log('hello')
    let pdfName = 'test';
    var doc = new jsPDF();
    doc.text('Post Status', 10, 10);
    doc.h
    //doc.text(postCount.value, 12, 14);
    doc.save(pdfName + '.pdf');
}


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