<template>
  <section class="chat-list-wrapper">
    <el-dialog title="Chat creating" v-model="isChatCreatingModal">
      <el-form v-model="createChatForm">
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
          ></el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="chat-list-wrapper__filter">
      <el-input v-model="searchInput"/>
      <el-button type="primary" :icon="Edit" circle @click="isChatCreatingModal = true"/>
    </div>
  </section>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import {Edit} from '@element-plus/icons-vue'
import {required} from '@/constants/rules'

const store = useStore()

const searchInput = ref('')
const isChatCreatingModal = ref(false)

const createChatForm = ref({
  type: 'dialog',
  name: '',
  members: []
})
const isGroup = computed(() => createChatForm.value.type === 'group')

const getUsers = query => {
  store.dispatch('users/fetchUsersList', query)
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
</style>