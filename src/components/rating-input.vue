<script setup lang="ts">
    import { ref, Ref } from 'vue'
    import StarSvgIcon from './star-svg-icon.vue'

    const props = withDefaults(defineProps<{ numberOfStars: number }>(), { numberOfStars: 5})

    const emit = defineEmits<{( e: "change", value: number ): void}>()

    const selectedStar: Ref<number | null> = ref(null)
    const hoveredStar: Ref<number | null> = ref(null)

    const isSolid = (starIndex:number) => {
        return (hoveredStar?.value ?? -1 ) >= starIndex
    }

    const onStarOver = (starIndex:number) => {
        hoveredStar.value = starIndex
    }

    const onStarLeave = () => {
        hoveredStar.value = selectedStar.value
    }

    const onStarClick = (starIndex:number) => {
        selectedStar.value = starIndex
        emit('change', selectedStar.value)
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
                @mouseover.native="onStarOver(index)"
                @mouseleave.native="onStarLeave()"
                @focusin="onStarOver(index)"
                @focusout="onStarLeave()"
                @click="onStarClick(index)"
            >
                <StarSvgIcon :display="isSolid(index) ? 'solid' : 'outline'" />
            </button>
        </div>
        <input type="hidden" :value="selectedStar" @input="$emit('update', selectedStar)">
    </div>
</template>

<style scoped lang="scss">
.rating-input {
    &__item {
        padding: 0;
        border: none;
        background: none;
        outline: none;;
    }
}
</style>