<script setup>
import Menu from '@/components/Menu.vue'
import Story from '@/components/Story.vue'
import Choose from '@/components/Choose.vue'
import { ref, provide } from 'vue'

const currentStoryID = ref(-1)
const currentStageID = ref(-1)
const playerScore = ref(0)
const playerData = ref([])
provide('currentStoryID', currentStoryID)
provide('currentStageID', currentStageID)
provide('playerScore', playerScore)
provide('playerData', playerData)

import { useAutoReset } from '@/composables/useAutoReset'
useAutoReset(currentStageID, currentStoryID, playerData, playerScore, 120000)

</script>

<template>
  <Menu v-if="currentStoryID === -1"/>
  <Choose v-else-if="currentStoryID === 0"/>
  <Story v-else></Story>
</template>
<style scoped>
</style>
