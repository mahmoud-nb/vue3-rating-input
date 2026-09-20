<script setup lang="ts">
    import { computed, onMounted, useId } from 'vue'
    import { CssColor, CssSize } from '../types/globals.ts'
    import { ensureStarDefs, OUTLINE_SYMBOL_ID, FILLED_SYMBOL_ID } from '../composables/starDefs.ts'

    const props = withDefaults(defineProps<{
        value:number,
        color:CssColor,
        size:CssSize,
        enableOutline?: boolean,
        backgroundColor?:CssColor

    }>(), {
        value: 0,
        color: '#ffb74b',
        size: '2rem',
        enableOutline: true
    })

    const uniqueId = useId()

    const clipWidth = computed(() => props.value * 100)

    // The shared <symbol> definitions live once in <body>. Injection happens on
    // mount (client only), so this component is safe to render during SSR.
    onMounted(ensureStarDefs)
</script>

<template>
    <svg class="v-rating-star-svg" :fill="props.color" :height="props.size" :width="props.size">
        <defs>
            <clipPath :id="`clip-star-${uniqueId}`">
                <rect x="0" y="0" :width="`${clipWidth}%`" height="100%" />
            </clipPath>
        </defs>
        <use v-if="props.backgroundColor" :xlink:href="`#${FILLED_SYMBOL_ID}`" :fill="props.backgroundColor"></use>
        <use v-if="props.enableOutline" :xlink:href="`#${OUTLINE_SYMBOL_ID}`"></use>
        <use :xlink:href="`#${FILLED_SYMBOL_ID}`" :clip-path="`url(#clip-star-${uniqueId})`"></use>
    </svg>
</template>
