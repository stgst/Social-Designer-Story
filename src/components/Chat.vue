<template>
  <div class="chat-container">
    <div class="chat-header">
      <h1>聊天室</h1>
      <router-link to="/" class="back-button">← 返回主頁</router-link>
    </div>
    <div class="chat-content">
      <p>這是聊天頁面</p>
      <!-- 在這裡添加您的聊天功能 -->
    </div>
  </div>
</template>

<script setup>
// Chat 組件的邏輯
</script>

<style scoped>
.chat-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}

.chat-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  min-height: 400px;
}
</style>