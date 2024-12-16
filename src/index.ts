import { App } from "vue"
//@ts-ignore
import VueRatingInput from './components/rating-input.vue'

const RatingInput = {
    install(app: App): void {
        app.component('RatingInput', VueRatingInput)
    }
}

export default RatingInput
