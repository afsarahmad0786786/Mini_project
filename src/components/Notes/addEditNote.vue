<template>
    <div class="p-4 my-2"
    :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">
        {{ label }}
    </label>
    
        <div class="field">
            <div class="control">
                <textarea :value="modelValue" 
                @input="$emit('update:modelValue', $event.target.value)" 
                ref="textareaRef"
                class="textarea" 
                :placeholder="placeholder"
                v-autofocus>
                </textarea>
            </div>
        </div>

        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons" />

            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {vAutofocus} from '../../Directives/vAutoFocus.js'
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'type something....'
    },
    label: {
        type: String,
        default: 'Give a label name'
    }
})

const emit = defineEmits(['update:modelValue']);
const textareaRef = ref(null);

const focusTextArea = () => {
    //console.log('helloinfocus')
    textareaRef.value.focus()
};

defineExpose({
    focusTextArea
})



</script>