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
  import vueRatingInput from 'vue-rating-input'

  import { ref, Ref } from 'vue'

  const value:Ref<number | undefined> = ref()
</script>

<template>
    <RatingInput v-model="value" />
</template>
```

and import CSS on your main.js
```javascript
import "vue-rating-input/dist/style.css";
```

### Props
```javascript
{
    numberOfStars: {
        type: Number,
        default: 5,
        description: Number of starts to display
    },
    color: {
        type: String,
        default: '#ffb74b',
        description: Color of star icon
    },
    size: {
        type: String,
        default: '2rem',
        description: CSS size of star icon
    },
    modelValue: {
        type: Number,
        default: undefined,
        description: Default value of the input
    },
}
```