<script setup lang="ts">
  import RatingInput from './components/rating-input.vue'

  import { ref } from 'vue'

  const value = ref<number>()
</script>

<template>
    <RatingInput :modelValue="value" @update="value = $event" />
</template>