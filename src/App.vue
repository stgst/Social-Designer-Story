<script setup>
import Menu from '@/components/Menu.vue'
import Typing from '@/components/Typing.vue'
import Story from '@/components/Story.vue'
import { ref, provide, onUnmounted} from 'vue'

const currentStoryID = ref(0)
const currentStageID = ref(0)
const playerScore = ref(0)
provide('currentStoryID', currentStoryID)
provide('currentStageID', currentStageID)
provide('playerScore', playerScore)

import { useAutoReset } from '@/composables/useAutoReset'
useAutoReset(currentStageID, currentStoryID, 120000)

</script>

<template>
  <Menu v-if="currentStoryID === 0"/>
  <Story v-else></Story>
</template>
<style scoped>
</style>