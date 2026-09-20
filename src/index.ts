import type { App, Plugin } from 'vue'
import RatingInput from './components/rating-input.vue'

// Attach `install` to the component itself so it doubles as a Vue plugin:
//   import RatingInput from 'vue-rating-input'
//   app.use(RatingInput)            // global registration
//   <RatingInput v-model="value" /> // or use it directly
type InstallableComponent = typeof RatingInput & Plugin

const VueRatingInput = RatingInput as InstallableComponent

VueRatingInput.install = (app: App): void => {
    app.component('RatingInput', RatingInput)
}

export { VueRatingInput }
export default VueRatingInput
