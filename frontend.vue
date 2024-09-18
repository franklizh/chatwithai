//npm run serve

<template>
  <div class="chat-container">
      <h1>AI Chat Bot</h1>
      <div class="chat-box">
          <div v-for="(message, index) in messages" :key="index" class="message">
              <div :class="message.from === 'user' ? 'user-message' : 'ai-message'">
                  {{ message.text }}
              </div>
          </div>
      </div>
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          userInput: '',
          messages: []
      };
  },
  methods: {
    async sendMessage() {
    if (this.userInput.trim() === '') return;

    // 添加用户消息到消息列表
    this.messages.push({ text: this.userInput, from: 'user' });

    try {
        // 调试输出，确认用户输入
        console.log('Sending message:', this.userInput);

        // 调用后端 API
        // const response = await axios.post('http://localhost:3000/api/chat', {
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         { role: "system", content: "You are a helpful assistant." },
        //         { role: "user", content: this.userInput }
        //     ]
        // });

        const response = await axios.post('http://localhost:3000/api/chat', {
              content: this.userInput
          });
        
        // 调试输出，确认响应
        console.log('Response from API:', response.data);

        // 检查响应数据
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            this.messages.push({ text: response.data.choices[0].message.content, from: 'ai' });
        } else {
            this.messages.push({ text: 'Error: Unexpected response format', from: 'ai' });
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = error.response ? error.response.data.message : 'Error: Unable to connect to the server.';
        this.messages.push({ text: errorMessage, from: 'ai' });
    } finally {
        // 清空用户输入框
        this.userInput = '';
    }
}

  }
};
</script>

<style>
.chat-container {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  padding: 8px;
}

.message {
  margin-bottom: 8px;
}

.user-message {
  background-color: #d1edf5;
  padding: 8px;
  border-radius: 5px;
  text-align: right;
}

.ai-message {
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 5px;
  text-align: left;
}

input {
  width: 80%;
  padding: 8px;
}

button {
  padding: 8px;
}
</style>
