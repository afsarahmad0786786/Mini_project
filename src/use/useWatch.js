import {watch} from 'vue'

export function useWatchCharacters(valueToWatch, maxchar) {
    watch(valueToWatch, (newValue, oldValue) => {
        if(newValue.length > maxchar) {
            alert(`only ${maxchar} characters are allowed`)
        }
    })
}