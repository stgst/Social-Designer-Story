// composables/useAutoReset.js

import { watch, onUnmounted } from 'vue'

export function useAutoReset(stage, story, timeout = 5000) {
  let timer = null

  function resetTimer() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      stage.value = -1
      story.value = -1
    }, timeout)
  }

  watch(stage, resetTimer)

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { stage }
}
