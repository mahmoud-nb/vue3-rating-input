<script setup lang="ts">
  import RatingInput from './components/rating-input.vue'

  import { ref } from 'vue'

  const value = ref<number>(2)
</script>

<template>
    <RatingInput v-model="value" />
</template>