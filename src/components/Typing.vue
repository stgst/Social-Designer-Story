<script setup>
import { inject, onMounted } from 'vue'

const props = defineProps(['text'])
const currentStageID = inject('currentStageID')

const forwardStageID = () => {
    currentStageID.value += 1
}

const delayAnimation = () => {
    setTimeout(() => {
        document.querySelectorAll('#btn').forEach((elem, index) => {
            elem.hidden = false
            elem.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')
        })
    }, (props.text.length)/10 * 1200)
}

onMounted(() => {
    delayAnimation()
})

</script>
<template>
    <div class="w-full h-screen bg-black flex flex-col items-center justify-center animate__animated animate__fadeIn">
        <div class="w-[80%] md:w-[60%]">
            <VueTyped :strings="[props.text]" :typeSpeed="70" :loop="false"
                class="text-center text-white font-medium text-2xl md:text-4xl leading-12 md:leading-15">
            </VueTyped>
        </div>
        <button
            class="mt-10 my-3 w-[35%] md:w-[10%] py-5 bg-gray-300 text-gray-700 text-xl rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100" @click="forwardStageID()" id="btn" hidden>
            繼續...
        </button>
    </div>
</template>
<style scoped></style>