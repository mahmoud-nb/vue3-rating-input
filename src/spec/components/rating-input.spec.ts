import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RatingInputComponent from '../../components/rating-input.vue'

const getRandomIndex = (max:number): number => Math.floor(Math.random() * max);


describe('Vue Rating Input: default props', () => {

    const wrapper = mount(RatingInputComponent)

    it('shoud render Rating Input component', () => {
        expect(wrapper.find('.rating-input').exists()).toBeTruthy()
    })
    
    it('shoud load Rating Input component template', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('shoud load Rating Input component with 5 stars', () => {
        const stars = wrapper.findAll('.rating-input__item').length
    
        expect(stars).toEqual(5)
    })

    it('shoud load Rating Input component with 5 stars', async () => {
        const stars = wrapper.findAll('.rating-input__item')

        const randomSelectStar = getRandomIndex(6)
        const randomSelectStarValue = randomSelectStar + 1

        await stars[randomSelectStar].trigger('click')

        expect(wrapper.vm.selectedStar).toEqual(randomSelectStarValue)

        const emitedValue = wrapper.emitted()['update:modelValue'] // wrapper.emitted() : { "update:modelValue": [ [randomSelectStarValue] ] }

        expect(emitedValue).toBeTruthy()

        expect(emitedValue[0]).toEqual([randomSelectStarValue])
    })
})

describe('Vue Rating Input: custom props', () => {

    it('shoud load Rating Input component with 3 stars', () => {

        const numberOfStars = 3

        const wrapper = mount(RatingInputComponent, {
            propsData: {
                numberOfStars
            }
        })

        const stars = wrapper.findAll('.rating-input__item').length
    
        expect(stars).toEqual(numberOfStars)
    })

    it('shoud init selectedStar with props modelValue', () => {

        const modelValue = 2

        const wrapper = mount(RatingInputComponent, {
            propsData: {
                modelValue
            }
        })
    
        expect(wrapper.vm.selectedStar).toEqual(modelValue)
    })
})
