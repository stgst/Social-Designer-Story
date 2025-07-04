<template>
  <div class="flex flex-col h-screen max-w-md mx-auto bg-[url('https://i.pinimg.com/736x/24/69/90/246990856080012235a4cbae9ef5b792.jpg')] bg-cover bg-center">
    <!-- Chat Header -->
    <div class="flex justify-between items-center px-2 py-3 text-white">
      <div class="flex items-center gap-3">
        <router-link 
          to="/" 
          class="w-8 h-8 flex items-center justify-center text-white text-2xl rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
        >
          &lt;
        </router-link>
        <div class="text-lg font-semibold"> {{ data[`${chapter}`]['name'] }} </div>
      </div>
      <div class="flex items-center gap-2 text-2xl text-white">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 transition-colors">⌕</button>
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 transition-colors">≡</button>
      </div>
    </div>
    
    <!-- Chat Messages -->
    <div ref="chatContainer" class="flex-1 p-4 overflow-y-auto custom-scrollbar">
      <div v-for="message in messages" :key="message.id" class="mb-3">
        <!-- Outgoing Message -->
        <div v-if="message.sender === 'me'" class="flex justify-end items-end gap-2">
          <div class="flex flex-col items-end">
            <span v-if="message.read" class="text-xs text-gray-200">已讀</span>
            <span class="text-xs text-gray-200">{{ message.time }}</span>
          </div>
          <div class="max-w-[75%]">
            <div class="bg-[#8de02c] text-black rounded-2xl rounded-br-sm px-4 py-2">
              <p class="text-base leading-relaxed">{{ message.text }}</p>
            </div>
          </div>
        </div>

        <!-- Incoming Message -->
        <div v-else class="flex justify-start items-end gap-2">
          <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <img :src="message.avatar" alt="聯絡人頭像" class="w-full h-full object-cover" />
          </div>
          <div class="max-w-[75%]">
            <div class="bg-white rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
              <p class="text-base leading-relaxed">{{ message.text }}</p>
            </div>
          </div>
          <span class="text-xs text-gray-200">{{ message.time }}</span>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="p-2 bg-white border-t border-gray-200 flex items-center gap-2">
      <button class="text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
      <div class="relative flex-1">
        <input 
          type="text" 
          placeholder="輸入訊息..." 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          class="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 text-base outline-none placeholder-gray-500"
        />
      </div>
      <button 
        @click="sendMessage" 
        class="text-red-500 p-2 rounded-full hover:bg-red-100 active:scale-95 transition-all"
      >
        <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const newMessage = ref('')
const chatContainer = ref(null)
const chapter = ref(route.query.chapter)

const data = {
  "1": {
    name: "江昕禾",
    comment: "嗨，我是江昕禾。我想跟你分享一些我曾經後悔的事，也許你也有過類似的經歷？"
  },
  "2": {
    name: "游晨昀",
    comment: "我是游晨昀。說實話，我做過很蠢的事，傷害了別人。現在想起來真的很後悔。"
  },
  "3": {
    name: "陳恩宇",
    comment: "我是陳恩宇。我曾經看著最好的朋友受傷，卻不知道該怎麼幫她...那種無力感很難受。"
  },
  "4": {
    name: "周子睿",
    comment: "我是周子睿。我以為我創造的是一個讓人自由說話的空間，但後來發現事情沒那麼簡單。"
  },
  "5": {
    name: "許以辰",
    comment: "我是許以辰。我從來沒做過那些事，但所有人都以為是我...被誤解的感覺真的很孤單。"
  }
}

const messages = ref([
  {
    id: 1,
    text: data[chapter.value]['comment'],
    time: new Date().toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: true }),
    sender: 'other',
    avatar: `/assets/images/${chapter.value}_0.jpg`
  }
])

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const sendMessage = async () => {
  const trimmedMessage = newMessage.value.trim()
  if (trimmedMessage) {
    const messageToSend = trimmedMessage
    
    messages.value.push({
      id: Date.now(),
      text: messageToSend,
      time: new Date().toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: true }),
      sender: 'me',
      read: false
    })
    
    newMessage.value = ''
    scrollToBottom()

    try {
      const response = await fetch(`https://story-api.xiung.workers.dev/message?msg=${encodeURIComponent(messageToSend)}&chapter=${chapter.value}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      if (data.respond) {
        messages.value.push({
          id: Date.now() + 1,
          text: data.respond,
          time: new Date().toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: true }),
          sender: 'other',
          avatar: `/assets/images/${chapter.value}_0.jpg`
        })
        scrollToBottom()
      }
    } catch (error) {
      console.error('Error sending message:', error)
      messages.value.push({
        id: Date.now() + 1,
        text: '抱歉，訊息無法傳送。',
        time: new Date().toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: true }),
        sender: 'other',
        avatar: `/assets/images/${chapter.value}_0.jpg`
      })
      scrollToBottom()
    }
  }
}

onMounted(() => {
  scrollToBottom()
})

</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

/* 自定義滾動條樣式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>