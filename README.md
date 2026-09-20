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

  import { ref } from 'vue'

  const value = ref<number>()
</script>
```

### Global registration (plugin)

The default export is also a Vue plugin, so you can register the component globally once:
```javascript
import { createApp } from 'vue'
import RatingInput from 'vue-rating-input'

const app = createApp(App)
app.use(RatingInput) // registers <RatingInput /> globally
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

### Style
> From version 1.3.0 you no longer need to explicitly import the style. Please remove the style import if this is the case for you
~~import "vue-rating-input/dist/style.css";~~

### Props
```javascript
{
    numberOfStars: {
        type: Number,
        required: false,
        default: 5,
        validator: Must be between 2 and 10
        description: Number of starts to display
    },
    color: {
        type: CssColor,
        required: false,
        default: '#ffb74b',
        description: Color of the star icon (CSS color value)
    },
    size: {
        type: CssSize,
        required: false,
        default: '2rem',
        description: CSS size of star icon
    },
    readonly: {
        type: Boolean,
        required: false,
        default: false,
        description: Allows you to distinguish between editable mode and reading mode
    },
    enableOutline: {
        type: Boolean,
        required: false,
        default: true,
        description: Enable outline style
    },
    backgroundColor: {
        type: CssColor,
        required: false
        description: Define color of empty star (CSS color value)
    },
    allowHalfSelect: {
        type: Boolean,
        required: false,
        default: false,
        description: Allow selection of half a star (mouse only — see note below)
    },
    modelValue: {
        type: Number,
        default: 0,
        description: Default value of the input
    },
    label: {
        type: String,
        required: false,
        default: 'Rating',
        description: Accessible label (aria-label) exposed to assistive technologies
    },
}
```

> **Note on `allowHalfSelect`:** half-star selection relies on the mouse position over the star and is therefore pointer-only. Keyboard users get a `0.5` step via the arrow keys, but touch devices fall back to whole-star selection.

### Accessibility

The component is exposed as a slider to assistive technologies (`role="slider"` with `aria-valuemin` / `aria-valuemax` / `aria-valuenow`). It is a single focus stop and can be operated with the keyboard:

| Key | Action |
| --- | --- |
| `→` / `↑` | Increase the rating by one step |
| `←` / `↓` | Decrease the rating by one step |
| `Home` | Set to 0 |
| `End` | Set to the maximum |

In `readonly` mode it is exposed as an image (`role="img"`) with the value in its label, and is removed from the tab order.

### Slots

Two slots are available for this component:

- After: allows you to add content before the stars. It will be useful to define your labels.
- Before: allows you to add content after the stars. it will be useful to add content such as the average grades in the case of reading mode (readonly = true) for example.

```html
<template>
    <RatingInput>
        <template #before>
            <label>Leave your rating</label>
        </template>
    </RatingInput>

    <RatingInput readonly>
        <template #after>
            <label>Rating is 4,75</label>
        </template>
    </RatingInput>
</template>
```

## Releasing

This project uses [Changesets](https://github.com/changesets/changesets) to version the package and maintain the [CHANGELOG](./CHANGELOG.md).

```sh
# 1. Describe your changes (pick patch/minor/major, write a summary)
npm run changeset

# 2. Apply pending changesets: bumps the version and updates CHANGELOG.md
npm run version

# 3. Build and publish to npm
npm run release
```

## License
[ISC](./LICENSE) © Mahmoud NBET
