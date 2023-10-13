
import { onMounted } from "vue"
 

export const vAutofocus = () => {
    
    onMounted: (el) => {
        el.focus()
    }
}