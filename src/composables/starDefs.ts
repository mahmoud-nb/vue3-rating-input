// Shared SVG <symbol> definitions used by every StarSVG instance.
//
// They are injected a single time into <body> instead of once per star:
//  - a module-level flag guarantees one injection per bundle instance,
//  - an id lookup guards against HMR / multiple bundle copies,
//  - the `document` check keeps it safe to import during SSR (the injection
//    only runs on the client, from a mounted hook).
//
// Ids are prefixed so they cannot collide with symbols on the host page.
export const DEFS_CONTAINER_ID = 'v-rating-star-defs'
export const OUTLINE_SYMBOL_ID = 'v-rating-star-outline'
export const FILLED_SYMBOL_ID = 'v-rating-star-filled'

const OUTLINE_PATH =
  'M13.85 4.96a.38.38 0 0 0-.34-.27l-4.18-.3L7.75.32A.38.38 0 0 0 7.4.08a.38.38 0 0 0-.35.25L5.5 4.38l-4.2.3a.38.38 0 0 0-.32.27.4.4 0 0 0 .11.43l3.22 2.8-1.02 4.25a.4.4 0 0 0 .14.41.36.36 0 0 0 .42.02l3.56-2.32 3.56 2.32c.06.04.13.06.2.06a.38.38 0 0 0 .22-.08.4.4 0 0 0 .15-.41L10.5 8.19l3.22-2.81a.4.4 0 0 0 .12-.42Zm-7.82.14-3.8.28 2.92 2.54-.9 3.77L7.4 9.63l3.16 2.06-.9-3.77 2.9-2.54L8.8 5.1 7.4 1.53 6.03 5.1Z'

const FILLED_PATH =
  'M13.48 4.96a.38.38 0 0 0-.33-.27l-4.19-.3L7.4.32a.38.38 0 0 0-.35-.25.38.38 0 0 0-.34.25L5.12 4.38l-4.18.3a.38.38 0 0 0-.33.28.4.4 0 0 0 .11.42l3.22 2.8-1.02 4.25a.4.4 0 0 0 .14.41.37.37 0 0 0 .43.02l3.56-2.32 3.55 2.32a.36.36 0 0 0 .42-.02.4.4 0 0 0 .15-.41l-1.02-4.24 3.22-2.81a.4.4 0 0 0 .11-.42Z'

let injected = false

export function ensureStarDefs(): void {
  if (typeof document === 'undefined') return // SSR guard
  if (injected || document.getElementById(DEFS_CONTAINER_ID)) {
    injected = true
    return
  }

  const container = document.createElement('div')
  container.id = DEFS_CONTAINER_ID
  container.setAttribute('aria-hidden', 'true')
  container.style.cssText =
    'position:fixed;width:0;height:0;bottom:0;left:0;overflow:hidden'
  container.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>' +
    `<symbol viewBox="0 0 14 13" id="${OUTLINE_SYMBOL_ID}"><path fill-rule="evenodd" clip-rule="evenodd" d="${OUTLINE_PATH}"/></symbol>` +
    `<symbol viewBox="0 0 14 13" id="${FILLED_SYMBOL_ID}"><path fill-rule="evenodd" clip-rule="evenodd" d="${FILLED_PATH}"/></symbol>` +
    '</defs></svg>'

  document.body.appendChild(container)
  injected = true
}
