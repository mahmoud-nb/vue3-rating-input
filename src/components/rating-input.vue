<script setup lang="ts">
    import { ref, Ref } from 'vue'
    import StarSvgIcon from './star-svg-icon.vue'

    const props = withDefaults(defineProps<{ 
        numberOfStars?:number,
        color?:string, 
        size?:string, 
        modelValue?:number 
    }>(), { numberOfStars: 5, color: '#ffb74b', size: '2rem' })

    const emit = defineEmits<{( e: "update:modelValue", value: number | undefined ): void}>()

    const selectedStar: Ref<number | undefined> = ref(props.modelValue)
    const hoveredStar: Ref<number | undefined> = ref(undefined)

    const isSolid = (starIndex:number) => {
        return (hoveredStar?.value ?? selectedStar.value ?? -1 ) >= starIndex 
    }

    const onStarOver = (starIndex:number) => {
        hoveredStar.value = starIndex
    }

    const onStarLeave = () => {
        hoveredStar.value = selectedStar.value
    }

    const onStarClick = (starIndex:number) => {
        if (starIndex !== selectedStar.value) {
            selectedStar.value = starIndex
            emit('update:modelValue', selectedStar.value)
        }
    }
</script>

<template>
    <div class="rating-input">
        <div class="rating-input__items">
            <button 
                v-for="index in props.numberOfStars" 
                :key="`rating-input-${index}`" 
                type="button" 
                class="rating-input__item"
                :class="`rating-${index}`"
                @mouseover.native="onStarOver(index)"
                @mouseleave.native="onStarLeave()"
                @focusin="onStarOver(index)"
                @focusout="onStarLeave()"
                @click.native="onStarClick(index)"
            >
                <StarSvgIcon :display="isSolid(index) ? 'solid' : 'outline'" :color="color" />
            </button>
        </div>
        <input type="hidden" v-model="selectedStar" />
    </div>
</template>

<style scoped lang="scss">
.rating-input {
    &__items {
        display: flex;
    }

    &__item {
        cursor: pointer;
        padding: 0.125rem;
        border: none;
        background: none;
        outline: none;
    }
}
</style>