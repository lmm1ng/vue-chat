<template>
  <section class="chat-list-wrapper">
    <el-dialog title="Chat creating" v-model="isChatCreatingModal">
      <el-form ref="formRef" :model="createChatForm" label-width="100px">
        <el-form-item label="Type" prop="type" :rules="required">
          <el-radio-group v-model="createChatForm.type">
            <el-radio label="dialog"/>
            <el-radio label="group"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Name" :rules="isGroup ? required : {}" prop="name">
          <el-input :disabled="!isGroup"/>
        </el-form-item>
        <el-form-item label="Members" :rules="required" prop="members">
          <el-select
            v-model="createChatForm.members"
            multiple
            filterable
            :multiple-limit="isGroup ? 5 : 1"
            placeholder="Enter a nickname"
            remote
            :remote-method="getUsers"
          >
            <el-option
                v-for="item in searchMembers"
                :key="item.id"
                :label="item.nickname"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onCreateChat">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="chat-list-wrapper__filter">
      <el-input v-model="searchInput"/>
      <el-button type="primary" :icon="Edit" circle @click="isChatCreatingModal = true"/>
    </div>
    <div class="chat-list-wrapper__chats">
      <chat-list-item
          v-for="chat in chats"
          :key="chat.id"
          :is-active="chat.id === activeChatId"
          :last-message="getLastChatMessage(chat)"
          :avatar="chat.avatar"
          :name="chat.name"
          @click="setActiveChat(chat.id)"
      />
    </div>
  </section>
</template>

<script setup>
import {ref, computed, toRaw, onMounted} from 'vue'
import ChatListItem from '@/components/ChatList/ChatListItem'
import {useStore} from 'vuex'
import {Edit} from '@element-plus/icons-vue'
import {required} from '@/constants/rules'

const store = useStore()

onMounted(() => {
  store.dispatch('chat/fetchGetChats')
})

const searchInput = ref('')

const isChatCreatingModal = ref(false)
const formRef = ref(null)

const createChatForm = ref({
  type: 'dialog',
  name: '',
  members: []
})
const onCreateChat = () => {
  formRef.value.validate(valid => {
    if (valid) {
      store.dispatch('chat/fetchCreateChat', toRaw(createChatForm.value))
    }
  })
}

const isGroup = computed(() => createChatForm.value.type === 'group')
const searchMembers = computed(() => store.getters["users/getUsersList"])

const getUsers = query => {
  return store.dispatch('users/fetchUsersList', query)
}

const chats = computed(() => store.getters['chat/getUserChats'])

const setActiveChat = chat => store.commit('chat/setActiveChat', chat)
const activeChatId = computed(() => store.getters['chat/getActiveChatId'])

const getLastChatMessage = chat => {
  return chat.messages[0]?.text || ''
}
</script>

<style lang="scss">
.chat-list-wrapper {
  padding: 1rem;
}
.chat-list-wrapper__filter {
  display: flex;
  gap: 10px;
}
.chat-list-wrapper__chats {
  margin-top: 10px;
}
</style>