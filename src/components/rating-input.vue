<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue'
    import StarSvgIcon from './star-svg-icon.vue'
    import { IntRange, CssColor, CssSize } from '../types/globals.ts'

    const NUMBER_OF_STARS_RANGE = { min: 2, max: 10 }

    const props = withDefaults(defineProps<{ 
        numberOfStars?:IntRange<2, 10>,
        color?:CssColor, 
        size?:CssSize, 
        readonly?: boolean,
        modelValue?:number 
    }>(), { numberOfStars: 5, color: '#ffb74b', size: '2rem', readonly:false })

    const emit = defineEmits<{( e: "update:modelValue", value: number | undefined ): void}>()

    const selectedStar: Ref<number | undefined> = ref(props.modelValue)
    const hoveredStar: Ref<number | undefined> = ref(undefined)
    
    onMounted(() => {

        if (props.numberOfStars) {
            if (Number.isNaN(props.numberOfStars)) {
                throw new Error('numberOfStars must be a number between 0 10');
            } else if (props.numberOfStars < NUMBER_OF_STARS_RANGE.min || props.numberOfStars > NUMBER_OF_STARS_RANGE.max) {
                throw new RangeError(`The prop \`numberOfStars\` is out of range [${NUMBER_OF_STARS_RANGE.min}, ${NUMBER_OF_STARS_RANGE.max}].`);
            }
        }
    })

    const isSolid = (starIndex:number) => {
        return (hoveredStar?.value ?? selectedStar.value ?? -1 ) >= starIndex 
    }

    const onStarOver = (starIndex:number) => {
        if (!props.readonly) 
            hoveredStar.value = starIndex
    }

    const onStarLeave = () => {
        if (!props.readonly) 
            hoveredStar.value = selectedStar.value
    }

    const onStarClick = (starIndex:number) => {
        if (!props.readonly && starIndex !== selectedStar.value) {
            selectedStar.value = starIndex
            emit('update:modelValue', selectedStar.value)
        }
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
                @mouseover.native="onStarOver(index)"
                @mouseleave.native="onStarLeave()"
                @focusin="onStarOver(index)"
                @focusout="onStarLeave()"
                @click.native="onStarClick(index)"
            >
                <StarSvgIcon :display="isSolid(index) ? 'solid' : 'outline'" :color="color" :size="size" />
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