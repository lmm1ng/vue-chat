<template>
  <section class="chat" v-if="activeChat">
    <chat-header/>
    <div class="chat__content">
      <div class="chat__content messages">
        <message-comp
            v-for="message in activeChat.messages"
            :key="message.id"
            :text="message.text"
            :variant="activeChat.type"
            :time="message.createdAt"
            :from="message.from"
        />
      </div>
    </div>
    <div class="chat__inputs">
      <el-input v-model="message" type="textarea" placeholder="Start typing..." resize="none" rows="2"/>
      <el-button type="primary" :icon="Promotion" @click="sendMessage">Send</el-button>
    </div>
  </section>
  <div class="no-chat-banner" v-else>Select a chat</div>
</template>

<script setup>
import {computed, ref, inject} from 'vue'
import {useStore} from 'vuex'
import ChatHeader from '@/components/Chat/Header'
import MessageComp from '@/components/Chat/Message'
import {Promotion} from '@element-plus/icons-vue'
import {cryptMessage} from '@/utils/crypto'

const store = useStore()
const socket = inject('socket')

const activeChat = computed(() => store.getters['chat/getActiveChat'])
const currentUser = computed(() => store.getters['auth/getUser'])
const insertMessage = message => store.commit('chat/insertMessage', message)

const setOnlineUsers = data => store.commit('chat/setOnlineUsers', data)
const addOnlineUser = data => store.commit('chat/addOnlineUser', data)
const removeOnlineUser = data => store.commit('chat/removeOnlineUser', data)

const message = ref('')

const sendMessage = () => {
  const messageObj = {
    chat: activeChat.value.id,
    text: cryptMessage(message.value, localStorage.getItem(activeChat.value.id)),
    from: currentUser.value.id
  }
  socket.emit('send message', messageObj)
  insertMessage(messageObj)
}

socket.on('chat online users', data => {
  setOnlineUsers(data)
})

socket.on('user joined', data => {
  addOnlineUser(data)
})

socket.on('user leaved', data => {
  removeOnlineUser(data)
})

socket.on('receive message', data => {
  insertMessage(data)
})

socket.on('chat online users', data => {
  console.log(data)
})
</script>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__header {
    height: 50px;
  }

  &__content {
    height: calc(100% - 50px - 62px);
    position: relative;
    bottom: 0;
    overflow: auto;
    display: flex;
    min-width: 380px;
    &.messages {
      height: 100%;
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column-reverse;
      gap: 20px;
      box-sizing: border-box;
      padding: 20px;
      flex-grow: 1;
    }
  }

  &__inputs {
    height: 62px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding-bottom: 10px;
  }
}

.no-chat-banner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #DCDCDC;
}
</style>