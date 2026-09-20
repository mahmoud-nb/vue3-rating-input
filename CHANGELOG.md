# vue-rating-input

## 2.1.0

### Minor Changes

- Accessibility, tooling and packaging improvements.
  
  Features:
  
  - Full keyboard support: the widget is exposed as a `slider` (`role="slider"` with `aria-valuemin`/`aria-valuemax`/`aria-valuenow`) and can be operated with the arrow keys, `Home` and `End`. In `readonly` mode it is exposed as an `img` with the value in its label.
  - New `label` prop to customize the accessible label (`aria-label`).
  - The default export is now a self-installable Vue plugin, so `app.use(RatingInput)` registers `<RatingInput />` globally.
  
  Fixes:
  
  - Ship proper TypeScript declarations: `types` now points to the generated `dist/index.d.ts` instead of a source file that was never published.
  - Make `StarSVG` SSR-safe: the shared SVG symbol definitions are injected once, on the client only, with prefixed ids to avoid collisions with the host page and duplicate `<defs>`.
  - `numberOfStars` out of range now warns and clamps instead of throwing and crashing the host app.
  - Corrected the `GlobalComponents` type augmentation to register `RatingInput` (matching the plugin).
  
  Chores:
  
  - Updated the dev toolchain (Vitest 5, `@vue/test-utils`) and fixed the previously broken test suite.
  - Added type-declaration generation to the build (`vite-plugin-dts`) and a coverage runner (`@vitest/coverage-v8`).
  - Added an ISC `LICENSE` file and documented accessibility, the `label` prop and plugin registration in the README.
