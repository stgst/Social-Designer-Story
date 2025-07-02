<script setup>

const pieces = [
  { clipPath: 'polygon(0% 0%, 0% 60%, 50% 0)', imageUrl: '1_0.jpg', position: '500% 0%' },                 // 左上三角
  { clipPath: 'polygon(50% 0, 60% 0%, 80% 40%, 0% 60%)', imageUrl: '3_0.jpg' }, //中間梯形
  { clipPath: 'polygon(60% 0%, 100% 0,100% 60%, 100% 80%)', imageUrl: '4_0.jpg' }, // 右上梯形
  { clipPath: 'polygon(50% 47.5%, 80% 40%, 100% 80%, 100% 100%, 30% 100%)', imageUrl: '5_0.jpg' }, // 右下五邊形
  { clipPath: 'polygon(0% 60%, 50% 47.5%, 30% 100%, 0% 100%)', imageUrl: '2_0.jpg', position: '200% 100%' }, // 左下梯形

]
import { inject } from 'vue'

const currentStoryID = inject('currentStoryID')
const currentStageID = inject('currentStageID')

const selectStoryID = (index) => {
    currentStoryID.value = index + 1
    currentStageID.value += 1
}
</script>
<template>
  <div class="hidden md:block w-full min-h-screen bg-black">
    <div class="fixed w-full h-full flex flex-col items-center justify-center">
      <h1
        class="text-center text-4xl md:text-5xl font-bold text-gray-200 mb-8 animate__animated animate__flash animate__slower animate__infinite opacity-100">
        選擇章節...</h1>
    </div>
    <div v-for="(piece, index) in pieces" :key="index" :style="{
      clipPath: piece.clipPath,
      backgroundImage: `url('/assets/images/${piece.imageUrl}')`,
      backgroundPosition: piece.position || 'top left',
    }"
      class="piece absolute w-full h-full bg-cover opacity-70 transition-transform duration-500 ease-in-out cursor-pointer hover:transition-transform hover:opacity-100"
      @click="selectStoryID(index)" v-html="hi"></div>
  </div>

  <div class="min-h-screen justify-center items-center flex flex-col">
    <div id="bg" class="bg-[url('/assets/bg.jpg')] fixed inset-0 -z-10 bg-cover bg-center"></div>
    <div id="bg-wrapper" class="fixed inset-0 -z-10 bg-black opacity-50"></div>
    <div>
      <p
        class="text-center text-2xl text-white mb-3 animate__animated animate__flash animate__slower animate__infinite">
        請選擇章節..</p>
      <div v-for="(btn, index) in ['《我只是看到了而已》', '《我以為不會有事》', '《她不再跟我說話了》', '《我只是做了一個平台》', '《不是我，卻也無處可逃》']"
        class="flex flex-col items-center">
        <button
          class="my-3 w-full py-5 bg-gray-300 text-gray-700 text-xl rounded-2xl font-bold shadow-[0px_10px_0_0_rgba(0,0,0,1)] hover:cursor-pointer hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform duration-100"
          @click="selectStoryID(index)">
          {{ btn }}
        </button>
      </div>
    </div>
  </div>

</template>
