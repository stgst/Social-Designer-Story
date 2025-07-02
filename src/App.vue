<script setup>
import Menu from '@/components/Menu.vue'
import Typing from '@/components/Typing.vue'
import Story from '@/components/Story.vue'
import Choose from '@/components/Choose.vue'
import { ref, provide, onUnmounted} from 'vue'

const currentStoryID = ref(-1)
const currentStageID = ref(-1)
const playerScore = ref(0)
provide('currentStoryID', currentStoryID)
provide('currentStageID', currentStageID)
provide('playerScore', playerScore)

import { useAutoReset } from '@/composables/useAutoReset'
useAutoReset(currentStageID, currentStoryID, 120000)

</script>

<template>
  <Menu v-if="currentStoryID === -1"/>
  <Choose v-else-if="currentStoryID === 0"/>
  <Story v-else></Story>
</template>
<style scoped>
</style>