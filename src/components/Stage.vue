<script setup>
import { inject, defineProps, onMounted } from 'vue'

// initialize varables
const currentStoryID = inject('currentStoryID')
const currentStageID = inject('currentStageID')
const playerData = inject('playerData')

// next stage
const forwardStageID = () => {
    currentStageID.value += 1
}

// load data from props
const { data } = defineProps(['data'])
var stageData = data[currentStoryID.value - 1].stages[currentStageID.value - 2]


// score calculation
const playerScore = inject('playerScore')
const scoreCalculate = (index) => {
    playerScore.value += index + 1
    playerData.value.push({
        storyID: currentStoryID.value,
        stageID: currentStageID.value,
        choice: stageData.choice[index],
    })
    forwardStageID()
}

// animation
const delayAnimation = () => {
    setTimeout(() => {
        document.querySelectorAll('#choice').forEach((elem, index) => {
            elem.hidden = false
            elem.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')
        })
    }, (stageData.description.length) / 8 * 1000)
}

onMounted(() => {
    delayAnimation()
})

</script>
<template>
    <div class="animate__animated animate__fadeIn">
        <div id="bg" :style="{ 'background-image': `url('./assets/images/${stageData.bgImage}')` }"
            class=" fixed inset-0 -z-10 bg-cover bg-center"></div>
        <div id="bg-wrapper" class="fixed inset-0 -z-10 bg-black opacity-70"></div>

        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="text-center w-[90%] md:w-[60%]">
                <div id="title" class="">
                    <VueTyped :strings="[stageData.description]" :typeSpeed="100" :loop="false"
                        class="text-xl md:text-2xl mb-5 text-white font-bold md:leading-12">
                    </VueTyped>
                </div>
                <p id="choice" class="text-center text-lg md:text-xl text-white mb-5" hidden>
                    （你會怎麼做..）
                </p>
                <div v-for="(btn, index) in stageData.choice" class="flex flex-col items-center ">
                    <button
                        class="my-3 w-full px-2 py-5 bg-violet-50 text-gray-700 text-sm md:text-xl rounded-2xl font-medium shadow-[0px_10px_0_0_rgba(0,0,0,1)] hover:cursor-pointer hover:bg-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100"
                        @click="scoreCalculate(index)" id="choice" v-html="btn" hidden>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
