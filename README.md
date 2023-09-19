# Vue Rating Input ⭐⭐⭐⭐⭐

[![npm](https://img.shields.io/npm/v/vue-rating-input)](https://www.npmjs.com/package/vue-rating-input)

## Description
A simple and easy to use Vue package that allows the use of a star rating field to use with your forms.
⭐⭐⭐⭐⭐

This package is created using the Vue3 framework and the typescript language


## Install
Available via npm
```sh
npm install vue-rating-input
```

## See it in action
Examples [here](https://vue-pmuxjd.stackblitz.io)

## Usage
Load and use vueRatingInput component.

### Script
```javascript

<script setup>
  import vueRatingInput from 'vue-rating-input'

  import { ref } from 'vue'

  const value = ref()
</script>
```
### Script using Typescript
```javascript

<script setup lang="ts">
  import vueRatingInput from 'vue-rating-input'

  import { ref, Ref } from 'vue'

  const value:Ref<number | undefined> = ref()
</script>
```

### Template

Using v-model
```html
<template>
    <RatingInput v-model="value" />
</template>
```

Using event callback
```html
<template>
    <RatingInput :modelValue="value" @update:modelValue="value = $event" />
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
        validator: Must be between 2 and 10
        description: Number of starts to display
    },
    color: {
        type: CssColor,
        default: '#ffb74b',
        description: Color of star icon
    },
    size: {
        type: CssSize,
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
