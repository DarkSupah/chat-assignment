<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { HOST_REGEX } from '~/utils/regex.ts'
import { useClient } from '~/composables/use-client.ts'

import { ref, reactive } from 'vue'

import { useRouter } from 'vue-router'

interface FormData {
  host: string
  password: string
  login: string
}

const form = ref<FormInstance>()

const { setup, loginWithPassword, start } = useClient()

const formData = reactive<FormData>({
  login: '',
  password: '',
  host: '',
})

const router = useRouter()

const rules = {
  host: [
    {
      required: true,
      message: 'Поле обязательно',
      trigger: 'blur',
    },
    {
      pattern: HOST_REGEX,
      message: 'Неверный формат адреса',
    },
  ],
  login: [
    {
      required: true,
      message: 'Поле обязательно',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Поле обязательно',
      trigger: 'blur',
    },
  ],
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      await setup({
        baseUrl: formData.host,
      })

      await loginWithPassword(formData.login, formData.password)

      await start()

      await router.push({ name: 'home' })
    }
  })
}
</script>

<template>
  <el-form class="login-page" ref="form" :model="formData">
    <el-form-item label="Домашний сервер" prop="host" label-position="top" :rules="rules.host">
      <el-input v-model="formData.host" />
    </el-form-item>
    <el-form-item label="Логин" prop="login" label-position="top" :rules="rules.login">
      <el-input v-model="formData.login" />
    </el-form-item>
    <el-form-item label="Пароль" prop="password" label-position="top" :rules="rules.password">
      <el-input type="password" v-model="formData.password" />
    </el-form-item>

    <el-button class="login-page__submit" type="primary" @click="submitForm(form)">Войти</el-button>
  </el-form>
</template>

<style lang="scss">
.login-page {
  &__submit {
    margin-top: 16px;
    width: 100%;
  }
}
</style>
