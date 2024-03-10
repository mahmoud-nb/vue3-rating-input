import { ref, computed } from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RatingInputComponent from '../../components/rating-input.vue'
import StarSvgIcon from '../../components/star-svg-icon.vue'

const getRandomIndex = (max:number): number => Math.floor(Math.random() * max);

describe('Vue Rating Input', () => {

  const RatingInputWrapper = mount(RatingInputComponent)
  const stars = RatingInputWrapper.findAll('.rating-input__item')

  describe('Star Svg Icon Component', () => {
    const StarSvgIconWrapper = shallowMount(StarSvgIcon);
    it('renders correctly', () => {
        expect(StarSvgIconWrapper.exists()).toBe(true);
    })

    it('changes color when hovered', async () => {
        await stars[0].trigger('mouseenter')
        const svg = StarSvgIconWrapper.find('svg')
        expect(svg.find('use').attributes().href).toEqual('#solid')
    })

    it('emits update:modelValue when clicked', async () => {
        await stars[0].trigger('click')
        expect(RatingInputWrapper.emitted('update:modelValue')).toBeTruthy();
    })
  })

  describe('Vue Rating Input Component', () => {
      
    describe('With default props', () => {
    
      it('shoud render Rating Input component', () => {
        expect(RatingInputWrapper.find('.rating-input').exists()).toBeTruthy()
      })
      
      it.skip('shoud load Rating Input component template', () => {
        expect(RatingInputWrapper.html()).toMatchSnapshot()
      })
  
      it('shoud load Rating Input component with 5 stars', () => {
        const stars = RatingInputWrapper.findAll('.rating-input__item').length
        expect(stars).toEqual(5)
      })
    
      it('shoud load Rating Input component with 5 stars', async () => {
  
        const randomSelectStar = ref(getRandomIndex(6))
        const randomSelectStarValue = computed(() => randomSelectStar.value + 1) 

        const stars = RatingInputWrapper.findAll('.rating-input__item')

        await stars[randomSelectStar.value].trigger('click')

        // @ts-ignore
        expect(RatingInputWrapper.vm.selectedStar).toEqual(randomSelectStarValue.value)

        const emitedValue = RatingInputWrapper.emitted()['update:modelValue']

        expect(emitedValue).toBeTruthy()

        expect(emitedValue[randomSelectStar.value]).toEqual([randomSelectStarValue.value])
      })
    })

    describe('With custom props', () => {

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
  
        const modelValue = ref(2)

        const wrapper = mount(RatingInputComponent, {
            propsData: {
                modelValue: modelValue.value
            }
        })
      
        // @ts-ignore
        expect(wrapper.vm.selectedStar).toEqual(modelValue.value)
      })
    })
  })
})







