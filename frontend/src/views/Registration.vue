<template>
  <section class="registration-wrapper">
    <el-card class="registration-form">
      <template #header>
        <h2 style="margin: 0">Registration</h2>
      </template>
      <el-form ref="form" :model="registrationForm" label-width="120px">
        <el-form-item :rules="required" label="Nickname" prop="nickname">
          <el-input v-model="registrationForm.nickname"/>
        </el-form-item>
        <el-form-item :rules="[required, email]" prop="email" label="E-mail">
          <el-input v-model="registrationForm.email" type="email"/>
        </el-form-item>
        <el-form-item :rules="[required, password]" label="Password" prop="password">
          <el-input v-model="registrationForm.password" type="password"/>
        </el-form-item>
        <el-form-item :rules="[required, repeatPasswordRule]" label="Repeat password" prop="repeatPassword">
          <el-input v-model="registrationForm.repeatPassword" type="password"/>
        </el-form-item>
        <el-form-item :rules="required" label="Invite key" prop="inviteKey">
          <el-input v-model="registrationForm.inviteKey"/>
        </el-form-item>
        <el-form-item class="registration-form__buttons">
          <el-link @click="toLogin">Already registered?</el-link>
          <el-button type="primary" @click="onSubmit">Register</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script setup>
import {ref, toRaw} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {email, required, password} from '@/constants/rules'

const store = useStore()
const router = useRouter()

const form = ref(null)


const registrationForm = ref({
  email: '',
  nickname: '',
  password: '',
  repeatPassword: '',
  inviteKey: ''
})

const repeatPasswordRule = {
  validator: (rule, val, cb) => {
    if (val !== registrationForm.value.password) {
      cb(new Error('Please input the password again'))
    }
    cb()
  },
  trigger: ['blur', 'change']
}

const onSubmit = () => {
  form.value.validate(valid => {
    if (valid) {
      store.dispatch('auth/fetchRegister', toRaw(registrationForm.value)).then(() => router.push({name: 'Login'}))
    }
  })
}
const toLogin = () => {
  router.push({name: 'Login'})
}
</script>

<style lang="scss">
.registration-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.registration-form {
  @media all and (min-width: 1024px) {
    width: 500px;
  }

  &__buttons {
    .el-form-item__content {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
}
</style>