<template>
  <v-card class="full-height d-flex flex-column">
    <v-card-title class="text-h5 font-weight-black">服务信息</v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="3">
            <v-select
              :items="items"
              label="服务分类"
              v-model="serviceForm.category"
              class="mt-5"
            ></v-select>
            <v-text-field
              v-model="serviceForm.name"
              label="服务名称"
              counter="15"
              hint="至多15位"
              class="mt-5"
            ></v-text-field>
            <v-text-field
              v-model="serviceForm.price"
              label="价格"
              type="number"
              hide-spin-buttons
              hint="只能是数字"
              :rules="[rules.priceArange]"
              class="mt-5"
            ></v-text-field>
          </v-col>
          <v-col></v-col>
          <v-col cols="6">
            <v-textarea
              outlined
              label="简介信息（可选）"
              v-model="serviceForm.introduction"
              class="mt-5"
              height="300"
              auto-grow
              counter="200"
              :rules="[rules.introductionLen]"
            ></v-textarea>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="mt-auto mb-10">
      <v-spacer></v-spacer>
      <v-btn
        class="success"
        :disabled="!valid"
        @click="_releaseService"
      >
        发布
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as API from '@/service/api';

export default {
  data() {
    return {
      serviceForm: {
        name: '',
        price: '',
        category: '',
        introduction: ''
      },
      valid: false,
      rules: {
        priceArange: v => v >= 0 && v < Math.pow(10, 10) || '价格超出范围',
        introductionLen: v => v.length <= 200 || '简介字数不能大于200'
      },
      items: []
    }
  },
  created() {
    this._getCategory()
  },
  methods: {
    _getCategory() {
      API.getCategory().then(res => {
        this.items = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    _releaseService() {
      API.releaseService(this.serviceForm).then(() => {
        this.serviceForm = {
          name: '',
          price: '',
          category: '',
          introduction: ''
        }
        this.$hot.showSuccessSnackbar('发布成功')
      }).catch(err => {
        this.$hot.showErrorSnackbar('发布失败')
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>