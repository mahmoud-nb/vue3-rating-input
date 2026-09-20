import RatingInput from './components/rating-input.vue'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
      RatingInput: typeof RatingInput
    }
}
