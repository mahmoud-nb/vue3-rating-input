<script setup lang="ts">
  import RatingInput from './components/rating-input.vue'

  import { ref, Ref } from 'vue'

  const value:Ref<number | undefined> = ref()
</script>

<template>
    <RatingInput :modelValue="value" @update="value = $event" />
</template>