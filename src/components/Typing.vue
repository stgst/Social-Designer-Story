<script setup>
import { inject, onMounted } from 'vue'

const props = defineProps(['text', 'bgImage'])
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
    }, (props.text.length) / 8 * 1000)
}

onMounted(() => {
    delayAnimation()
})

</script>
<template>
    <div class="animate__animated animate__fadeIn">
        <div id="bg" :style="{ 'background-image': `url('./assets/images/${props.bgImage}')` }"
            class=" fixed inset-0 -z-10 bg-cover bg-center"></div>
        <div id="bg-wrapper" class="fixed inset-0 -z-10 bg-black opacity-70"></div>

        <div class="w-full h-screen flex flex-col items-center justify-center">
            <div class="w-[80%] md:w-[60%]">
                <VueTyped :strings="[props.text]" :typeSpeed="70" :loop="false"
                    class="text-center text-white font-medium text-2xl md:text-4xl leading-12 md:leading-15">
                </VueTyped>
            </div>
            <button
                class="mt-10 my-3 w-[35%] md:w-[10%] py-5 bg-gray-300 text-gray-700 text-xl rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(80,80,80,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100"
                @click="forwardStageID()" id="btn" hidden>
                繼續...
            </button>
        </div>
    </div>
</template>
<style scoped></style>