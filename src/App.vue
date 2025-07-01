<script setup>
import Menu from '@/components/Menu.vue'
import Typing from '@/components/Typing.vue'
import Story from '@/components/Story.vue'
import { ref, provide } from 'vue'

const currentStoryID = ref(0)
const currentStageID = ref(0)
const playerScore = ref(0)
provide('currentStoryID', currentStoryID)
provide('currentStageID', currentStageID)
provide('playerScore', playerScore)

</script>

<template>
  <Menu v-if="currentStoryID === 0"/>
  <Story v-else></Story>
</template>
<style scoped>
</style>