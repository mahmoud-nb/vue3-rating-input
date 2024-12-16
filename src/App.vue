<script setup lang="ts">
  import RatingInput from './components/rating-input.vue'

  import { ref } from 'vue'

  const value = ref<number>()
</script>

<template>
    <RatingInput v-model="value" />
</template>