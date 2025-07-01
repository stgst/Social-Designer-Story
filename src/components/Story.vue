<script setup>
import { ref, inject, provide, watch } from 'vue'
import Typing from '@/components/Typing.vue'
import Stage from '@/components/Stage.vue'
import End from '@/components/End.vue'
import storyData from '@/assets/story.json'

const currentStageID = inject('currentStageID')
const currentStoryID = inject('currentStoryID')
const playerScore = inject('playerScore')

const stageKey = ref(0)
watch(currentStageID, () => {
  stageKey.value++
})

</script>
<template>
    <Typing v-if="currentStageID === 0" :text="storyData[currentStoryID - 1].description"/>
    <End v-else-if="currentStageID === storyData[currentStoryID - 1].stages.length + 1" :data="storyData"/>
    <Stage v-else :key="stageKey" :data="storyData"/>
</template>