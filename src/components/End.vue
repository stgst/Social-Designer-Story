<script setup>

import { inject, defineProps } from 'vue'

// initialize variables
const currentStoryID = inject('currentStoryID')
const currentStageID = inject('currentStageID')
const playerScore = inject('playerScore')

// load data from props
const { data } = defineProps(['data'])
var stageData = data[currentStoryID.value - 1].ends
var endData

// score calculation
if (playerScore.value <= 10) {
    endData = stageData['10']
} else if (playerScore.value <= 15) {
    endData = stageData['15']
} else if (playerScore.value <= 20) {
    endData = stageData['20']
}
// reset function
const reset = () => {
    currentStoryID.value = 0
    currentStageID.value = 0
    playerScore.value = 0
}

</script>
<template>
    <div class="animate__animated animate__fadeIn">
        <div id="bg" :style="{ 'background-image': `url('./assets/${stageData.bgImage}')` }"
            class=" fixed inset-0 -z-10 bg-cover bg-center"></div>
        <div id="bg-wrapper" class="fixed inset-0 -z-10 bg-black opacity-50"></div>

        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="text-center w-[90%] md:w-[55%]">
                <div id="title">
                    <VueTyped :strings="[endData.role]" :typeSpeed="100" :loop="false"
                        class="text-5xl md:text-6xl mb-5 md:mb-10 text-white font-bold md:leading-12" id="role">
                    </VueTyped>
                </div>
                <p class="animate__animated animate__fadeIn animate__delay-1s text-center text-lg md:text-2xl text-white mb-5" v-html="endData.description"></p>
            </div>
            <button
                class="mt-10 my-3 w-[35%] md:w-[15%] py-5 bg-gray-300 text-gray-500 text-md rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100 animate__animated animate__fadeIn animate__delay-1s"
                 @click="reset()">
                選擇其他章節
            </button>
        </div>
    </div>
</template>
<style scoped>
#role {
    font-family: 'chenyu';
}
</style>