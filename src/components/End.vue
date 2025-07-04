<script setup>

import { inject, defineProps, onMounted } from 'vue'

// initialize variables
const currentStoryID = inject('currentStoryID')
const currentStageID = inject('currentStageID')
const playerScore = inject('playerScore')
const playerData = inject('playerData')

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
    currentStoryID.value = -1
    currentStageID.value = -1
    playerScore.value = 0
    playerData.value = []
}

const toggleModal = (Omodal) => {
    const modal = document.getElementById(Omodal)
    if (modal.style.display === 'block') {
        modal.style.display = 'none'
    } else {
        modal.style.display = 'block'
    }
}

onMounted(async () => {
    var url = "https://script.google.com/macros/s/AKfycbwhX385N0OQTbjojeZeDQ3a2OEGloZlqJnnI9zvr9J_36Z4RY2Ok9bgjty70ibdRD-1/exec"

    try {
        // 使用 form data 格式避免 CORS preflight
        const formData = new FormData()
        formData.append('comment', JSON.stringify(playerData.value))

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            const result = await response.text()
            console.log('Response:', result)
            if (result.includes('success') || result.includes('saved')) {
                console.log('Comment saved successfully')
            } else {
                console.log('Response received but uncertain if saved')
            }
        } else {
            console.error('HTTP Error:', response.status)
        }
    } catch (error) {
        console.error('Error:', error)
        // 即使發生錯誤也繼續執行 reset，讓用戶可以繼續使用
    }
})


</script>
<template>
    <div class="animate__animated animate__fadeIn">
        <div id="bg" :style="{ 'background-image': `url('./assets/images/${stageData.bgImage}')` }"
            class=" fixed inset-0 -z-10 bg-cover bg-center"></div>
        <div id="bg-wrapper" class="fixed inset-0 -z-10 bg-black opacity-50"></div>

        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="text-center w-[90%] md:w-[55%]">
                <div id="title">
                    <VueTyped :strings="[endData.role]" :typeSpeed="100" :loop="false"
                        class="text-5xl md:text-6xl mb-5 md:mb-10 text-white font-bold md:leading-12" id="role">
                    </VueTyped>
                </div>
                <p class="animate__animated animate__fadeIn animate__delay-1s text-center text-lg md:text-2xl text-white mb-5"
                    v-html="endData.description"></p>
            </div>
            <div class="w-full flex justify-center items-center gap-5">
                <button
                    class="mt-10 my-3 py-3 px-3 bg-blue-50 text-gray-500 text-md rounded-full font-bold shadow-[0px_5px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-400 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100 animate__animated animate__fadeIn animate__delay-1s"
                    @click="reset()">
                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 12h14M5 12l4-4m-4 4 4 4" />
                    </svg>

                </button>
                <a target="_blank" href="https://forms.gle/uh52ugGAcgSXxotKA"
                    class="block md:hidden mt-10 w-[25%] md:w-[15%] my-3 ">
                    <button
                        class="py-5 px-3 bg-blue-50 text-gray-700 text-md rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100 animate__animated animate__fadeIn animate__delay-1s">
                        回饋表單
                    </button>
                </a>
                <button
                    class="hidden md:block mt-10 my-3 w-[25%] md:w-[15%] py-5 bg-blue-50 text-gray-700 text-md rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100 animate__animated animate__fadeIn animate__delay-1s"
                    @click="toggleModal('modal-form')">
                    回饋表單
                </button>
                <div id="modal-form" class="absolute top-50 bottom-50" style="display: none;">
                    <div id="title"
                        class="text-white flex justify-center items-center animate__animated animate__fadeIn">
                        <div class="mx-auto px-4 w-xs md:w-md text-center text-lg">
                            <br><br>
                            <div class="bg-white shadow-lg rounded-xl p-6 text-black text-left">
                                <div class="flex justify-between mb-6">
                                    <h1 class="text-2xl font-bold text-center">回饋表單（請用手機掃描）</h1>
                                    <button @click="toggleModal('modal-form')" class="hover:cursor-pointer">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                    </button>
                                </div>
                                <center class="mb-3">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://forms.gle/uh52ugGAcgSXxotKA">
                                </center>
                            </div>
                            <br><br>
                        </div>
                    </div>
                </div>

                <a target="_blank" v-bind:href="'https://story.havegenderluck.org/#/chat?chapter=' + currentStoryID"
                    class="block md:hidden mt-10 w-[25%] md:w-[15%] my-3 ">
                    <button
                        class="py-5 px-3 bg-blue-200 text-gray-700 text-md rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100 animate__animated animate__fadeIn animate__delay-1s">
                        與 AI 對話
                    </button>
                </a>
                <button
                    class="hidden md:block mt-10 my-3 w-[25%] md:w-[15%] py-5 bg-blue-200 text-gray-700 text-md rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100 animate__animated animate__fadeIn animate__delay-1s"
                    @click="toggleModal('modal-ai')">
                    與 AI 對話
                </button>
                <div id="modal-ai" class="absolute top-50 bottom-50" style="display: none;">
                    <div id="title"
                        class="text-white flex justify-center items-center animate__animated animate__fadeIn">
                        <div class="mx-auto px-4 w-xs md:w-md text-center text-lg">
                            <br><br>
                            <div class="bg-white shadow-lg rounded-xl p-6 text-black text-left">
                                <div class="flex justify-between mb-6">
                                    <h1 class="text-2xl font-bold text-center">與角色對話（請用手機掃描）</h1>
                                    <button @click="toggleModal('modal-ai')" class="hover:cursor-pointer">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                    </button>
                                </div>
                                <center class="mb-3">
                                    <img v-bind:src="'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fstory.havegenderluck.org%2F%23%2Fchat%3Fchapter%3D' + currentStoryID">
                                </center>
                            </div>
                            <br><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
#role {
    font-family: 'chenyu';
}
</style>