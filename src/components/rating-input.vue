<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import StarSVG from './StarSVG.vue'
    import { IntRange, CssColor, CssSize } from '../types/globals'
    import { useObserveMouse } from '../composables/observeMouse.ts';

    const NUMBER_OF_STARS_RANGE = { min: 2, max: 10 }

    const props = withDefaults(defineProps<{ 
        numberOfStars?:IntRange<2, 10>,
        size?:CssSize,
        color?:CssColor, 
        backgroundColor?:CssColor,
        enableOutline?: boolean,
        readonly?: boolean,
        allowHalfSelect?: boolean,
        modelValue?:number 
    }>(), { 
        numberOfStars: 5,
        size: '2rem',
        color: '#ffb74b', 
        enableOutline: true,
        readonly:false,
        allowHalfSelect: false,
        modelValue: 0 
    })

    const emit = defineEmits<{(e: "update:modelValue", value: number): void}>()

    const {startObserve, endObserve, mouseInLeftHalf} = useObserveMouse()

    const selectedStar = ref<number>(props.modelValue)
    const hoveredStar = ref<number>(0)
    
    onMounted(() => {
        if (props.numberOfStars) {
            if (Number.isNaN(props.numberOfStars)) {
                throw new Error('numberOfStars must be a number between 0 10');
            } else if (props.numberOfStars < NUMBER_OF_STARS_RANGE.min || props.numberOfStars > NUMBER_OF_STARS_RANGE.max) {
                throw new RangeError(`The prop \`numberOfStars\` is out of range [${NUMBER_OF_STARS_RANGE.min}, ${NUMBER_OF_STARS_RANGE.max}].`);
            }
        }
    })

    const getStarValue = (starIndex: number) => {
        if (hoveredStar.value !== 0) {
            if (props.allowHalfSelect)
                return hoveredStar.value >= starIndex ? (hoveredStar.value == starIndex ? (mouseInLeftHalf.value ? 0.5 : 1) : 1 ) : 0
            else 
                return hoveredStar.value >= starIndex ? 1 : 0
        }

        const currentValue = selectedStar.value - (starIndex - 1)
        return Math.max(0, Math.min(currentValue, 1))
    }

    const onStarOver = (starIndex: number, event: MouseEvent) => {
        if (props.readonly) return

        startObserve(event.currentTarget as HTMLElement)

        hoveredStar.value = starIndex
    }

    const onStarLeave = () => {
        hoveredStar.value = 0
        endObserve()
    }

    const onStarClick = (starIndex: number) => {
        if (props.readonly || selectedStar.value === starIndex) return

        if (props.allowHalfSelect) {
            const value = starIndex - (mouseInLeftHalf.value ? 0.5 : 0)
            selectedStar.value = value
        } else {
            selectedStar.value = starIndex
        }
    
        emit('update:modelValue', selectedStar.value)
    }
</script>

<template>
    <div class="rating-input">
        <div class="rating-input__items">
            <div v-if="$slots.before" class="rating-input__item">
                <slot name="before"></slot>
            </div>
            <div 
                v-for="index in props.numberOfStars" 
                :key="`rating-input-${index}`" 
                type="button" 
                :class="['rating-input__item', props.readonly && 'rating-input__item--is-readonly']"

                @mouseover="onStarOver(index, $event)"
                @mouseleave="onStarLeave"
                @click="onStarClick(index)"
            >
                <StarSVG 
                    :value="getStarValue(index)" 
                    :color="color" 
                    :size="size" 
                    :enable-outline
                    :background-color
                />
            </div>
            <div v-if="$slots.after" class="rating-input__item">
                <slot name="after"></slot>
            </div>
        </div>
        <input type="hidden" v-model="selectedStar" />
    </div>
</template>

<style scoped lang="scss">
.rating-input {
    &__items {
        display: flex;
        align-items: center;
    }

    &__item {
        cursor: pointer;
        padding: 0.125rem;
        border: none;
        background: none;
        outline: none;

        &--is-readonly {
            cursor: default;
        }
    }
}
</style>