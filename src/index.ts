import { App } from "vue"
import RatingInput from './components/rating-input.vue'

const VueRatingInput = {
    install(app: App): void {
        app.component('RatingInput', RatingInput)
    }
}

export { VueRatingInput }
export default RatingInput
