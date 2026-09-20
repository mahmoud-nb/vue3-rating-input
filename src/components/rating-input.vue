<script setup lang="ts">
    import { ref, computed } from 'vue'
    import StarSVG from './StarSVG.vue'
    import { IntRange, CssColor, CssSize } from '../types/globals'
    import { useObserveMouse } from '../composables/observeMouse.ts'

    const NUMBER_OF_STARS_RANGE = { min: 2, max: 10 }

    const props = withDefaults(defineProps<{
        numberOfStars?:IntRange<2, 10>,
        size?:CssSize,
        color?:CssColor,
        backgroundColor?:CssColor,
        enableOutline?: boolean,
        readonly?: boolean,
        allowHalfSelect?: boolean,
        modelValue?:number,
        label?: string
    }>(), {
        numberOfStars: 5,
        size: '2rem',
        color: '#ffb74b',
        enableOutline: true,
        readonly:false,
        allowHalfSelect: false,
        modelValue: 0,
        label: 'Rating'
    })

    const emit = defineEmits<{(e: "update:modelValue", value: number): void}>()

    const {startObserve, endObserve, mouseInLeftHalf} = useObserveMouse()

    const selectedStar = ref<number>(props.modelValue)
    const hoveredStar = ref<number>(0)

    // A bad `numberOfStars` should never crash the host app: warn (dev only) and
    // fall back to a sane value instead of throwing during render.
    const starCount = computed<number>(() => {
        const { min, max } = NUMBER_OF_STARS_RANGE
        const value = props.numberOfStars

        if (typeof value !== 'number' || Number.isNaN(value)) {
            console.warn(`[vue-rating-input] \`numberOfStars\` must be a number. Falling back to ${min}.`)
            return min
        }
        if (value < min || value > max) {
            console.warn(`[vue-rating-input] \`numberOfStars\` (${value}) is out of range [${min}, ${max}]. Clamping.`)
            return Math.min(Math.max(Math.floor(value), min), max)
        }
        return Math.floor(value)
    })

    const step = computed<number>(() => (props.allowHalfSelect ? 0.5 : 1))

    const valueText = computed<string>(() => `${selectedStar.value} of ${starCount.value}`)

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

    const setValue = (value: number) => {
        const clamped = Math.max(0, Math.min(value, starCount.value))

        if (selectedStar.value === clamped) return

        selectedStar.value = clamped
        emit('update:modelValue', clamped)
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
        if (props.readonly) return

        const value = props.allowHalfSelect ? starIndex - (mouseInLeftHalf.value ? 0.5 : 0) : starIndex

        setValue(value)
    }

    const onKeydown = (event: KeyboardEvent) => {
        if (props.readonly) return

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                event.preventDefault()
                setValue(selectedStar.value + step.value)
                break
            case 'ArrowLeft':
            case 'ArrowDown':
                event.preventDefault()
                setValue(selectedStar.value - step.value)
                break
            case 'Home':
                event.preventDefault()
                setValue(0)
                break
            case 'End':
                event.preventDefault()
                setValue(starCount.value)
                break
        }
    }
</script>

<template>
    <div class="v-rating">
        <div
            class="v-rating__stars"
            :role="readonly ? 'img' : 'slider'"
            :tabindex="readonly ? undefined : 0"
            :aria-label="readonly ? `${label}: ${valueText}` : label"
            :aria-readonly="readonly || undefined"
            :aria-valuemin="readonly ? undefined : 0"
            :aria-valuemax="readonly ? undefined : starCount"
            :aria-valuenow="readonly ? undefined : selectedStar"
            :aria-valuetext="readonly ? undefined : valueText"
            :aria-orientation="readonly ? undefined : 'horizontal'"
            @keydown="onKeydown"
        >
            <div v-if="$slots.before" class="v-rating__star">
                <slot name="before"></slot>
            </div>
            <div
                v-for="index in starCount"
                :key="`v-rating-${index}`"
                :class="[
                    'v-rating__star',
                    readonly && 'v-rating__star--is-readonly'
                ]"
                aria-hidden="true"
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
            <div v-if="$slots.after" class="v-rating__star">
                <slot name="after"></slot>
            </div>
        </div>
        <input type="hidden" v-model="selectedStar" />
    </div>
</template>

<style scoped lang="scss">
.v-rating {
    &__stars {
        display: flex;
        align-items: center;

        &:focus-visible {
            outline: 2px dashed darkorange;
            border-radius: 4px;
        }
    }

    &__star {
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
