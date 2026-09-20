import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RatingInput from '../../components/rating-input.vue'
import StarSVG from '../../components/StarSVG.vue'

describe('Vue Rating Input', () => {
  describe('StarSVG component', () => {
    it('renders an svg', () => {
      const wrapper = shallowMount(StarSVG, {
        props: { value: 0.5, color: '#ffb74b', size: '2rem' },
      })
      expect(wrapper.find('svg.v-rating-star-svg').exists()).toBe(true)
    })

    it('clips the filled star according to the value', () => {
      const wrapper = shallowMount(StarSVG, {
        props: { value: 0.5, color: '#ffb74b', size: '2rem' },
      })
      const rect = wrapper.find('clipPath rect')
      expect(rect.attributes('width')).toBe('50%')
    })
  })

  describe('with default props', () => {
    it('renders the root element', () => {
      const wrapper = mount(RatingInput)
      expect(wrapper.find('.v-rating').exists()).toBe(true)
    })

    it('renders 5 stars by default', () => {
      const wrapper = mount(RatingInput)
      expect(wrapper.findAll('.v-rating__star')).toHaveLength(5)
    })

    it('emits update:modelValue with the clicked star value', async () => {
      const wrapper = mount(RatingInput)
      await wrapper.findAll('.v-rating__star')[2].trigger('click')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0]).toEqual([3])
    })

    it('does not re-emit when clicking the already selected star', async () => {
      const wrapper = mount(RatingInput)
      const star = wrapper.findAll('.v-rating__star')[1]

      await star.trigger('click')
      await star.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })
  })

  describe('with custom props', () => {
    it('renders the requested number of stars', () => {
      const wrapper = mount(RatingInput, { props: { numberOfStars: 3 } })
      expect(wrapper.findAll('.v-rating__star')).toHaveLength(3)
    })

    it('initializes the hidden input from modelValue', () => {
      const wrapper = mount(RatingInput, { props: { modelValue: 2 } })
      const input = wrapper.find('input[type="hidden"]')
      expect((input.element as HTMLInputElement).value).toBe('2')
    })

    it('does not emit on click when readonly', async () => {
      const wrapper = mount(RatingInput, { props: { readonly: true } })
      await wrapper.findAll('.v-rating__star')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('renders before and after slots', () => {
      const wrapper = mount(RatingInput, {
        slots: {
          before: '<span class="my-before">before</span>',
          after: '<span class="my-after">after</span>',
        },
      })
      expect(wrapper.find('.my-before').exists()).toBe(true)
      expect(wrapper.find('.my-after').exists()).toBe(true)
    })
  })

  describe('prop validation', () => {
    it('throws when numberOfStars is out of range', () => {
      expect(() => mount(RatingInput, { props: { numberOfStars: 20 as never } })).toThrow(RangeError)
    })
  })
})
