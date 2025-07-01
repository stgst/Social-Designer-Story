<script setup>
import { inject } from 'vue'

const currentStoryID = inject('currentStoryID')
const currentStageID = inject('currentStageID')

const selectStoryID = (index) => {
    currentStoryID.value = index + 1
    currentStageID.value += 1
}

</script>
<template>
    <div id="bg" class="bg-[url('@/assets/bg.jpg')] fixed inset-0 -z-10 bg-cover bg-center"></div>
    <div id="bg-wrapper" class="fixed inset-0 -z-10 bg-black opacity-50"></div>

    <div class="min-h-screen justify-center items-center flex flex-col">
        <div>
            <h1 class="text-center text-4xl md:text-5xl font-bold text-white mb-8">留下來的不止影像</h1>
            <p
                class="text-center text-lg md:text-xl text-white mb-8 animate__animated animate__flash animate__slower animate__infinite">
                請選擇章節..</p>
            <div v-for="(btn, index) in ['《我只是看到了而已》', '《我以為不會有事》', '《她不再跟我說話了》', '《我只是做了一個平台》', '《不是我，卻也無處可逃》']"
                class="flex flex-col items-center">
                <button
                    class="my-3 w-full py-5 bg-gray-300 text-gray-700 text-xl rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(0,0,0,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100"
                    @click="selectStoryID(index)">
                    {{ btn }}
                </button>
            </div>
            <div class="text-white text-center mt-10">
                <div class="flex justify-center gap-5">
                    <a href="https://www.instagram.com/have_genderandluck/" target="_blank">
                        <svg class="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="mailto:mail@xiung.me" target="_blank">
                        <svg class="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                            <path
                                d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                        </svg>
                    </a>
                    <a href="https://havegenderluck.org/" target="_blank">
                        <svg class="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                        </svg>

                    </a>
                </div>
            </div>
        </div>
    </div>
</template>