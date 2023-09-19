# Vue Rating Input ⭐⭐⭐⭐⭐

[![npm](https://img.shields.io/npm/v/vue-rating-input)](https://www.npmjs.com/package/vue-rating-input)

## Description
A simple and easy to use Vue package that allows the use of a star rating field to use with your forms.

This package is created using the Vue3 framework and the typescript language


## Install
Available via npm
```sh
npm install vue-rating-input
```

## Usage
Load the lib and create an instance
```javascript

<script setup lang="ts">
  import RatingInput from './components/rating-input.vue'

  import { ref, Ref } from 'vue'

  const value:Ref<number | undefined> = ref()
</script>

<template>
    <RatingInput :modelValue="value" @update="value = $event" />
</template>
```

and import CSS on your main.js
```javascript
import "vue-rating-input/dist/style.css";
```

### Props
- numberOfStars <Number> (not required) : Number of starts to display
- modelValue <Number> (not required) : The initial value of the input