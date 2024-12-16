import { ref } from 'vue'

export function useObserveMouse() {
  const el = ref<HTMLElement | null>(null)
  const clientRect = ref<DOMRect | null>(null)
  const mouseInLeftHalf = ref<boolean>(false)

  const observe = (event: MouseEvent) => {
    if (clientRect.value) {
      mouseInLeftHalf.value =
        event.clientX < clientRect.value.left + clientRect.value.width / 2
    } else {
      mouseInLeftHalf.value = false
    }
  }

  const startObserve = (element: HTMLElement) => {
    if (element) {
      el.value = element
      clientRect.value = element.getBoundingClientRect()
      element.addEventListener('mousemove', observe)
    }
  }

  const endObserve = () => {
    if (el.value) {
      el.value.removeEventListener('mousemove', observe)
      el.value = null
      clientRect.value = null
    }
  }

  return { startObserve, endObserve, mouseInLeftHalf }
}
