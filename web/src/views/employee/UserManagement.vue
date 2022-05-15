<template>
  <v-card class="full-height">
    <v-card-title>用户管理</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
        height="75vh"
        :footer-props="{
          itemsPerPageOptions: [10, 15]
        }"
      >

        <template v-slot:[`header.role`]>
          <v-select
            style="width: 120px"
            class="mb-n5"
            @change="_getUserList"
            dense
            :items="items"
            label="账号类别"
            v-model="role"
          ></v-select>
        </template>
        
        <template v-slot:[`item.role`]="{ item }">
          {{ roleFormatter(item.role) }}
        </template>
        
        <template v-slot:[`item.sex`]="{ item }">
          {{ sexFormatter(item.sex) }}
        </template>
        
      </v-data-table>
    </v-card-text>
  </v-card>  
</template>

<script>
import * as API from '@/service/api';
import { headersArrToHeadersMap, generateHeaders } from "@/utils/tableConstant";
import { roleFormatter, sexFormatter } from '@/utils';

export default {
  data: () => ({
    desserts: [],
    items: [
      {
        text: '全部',
        value: 0
      },
      {
        text: '员工',
        value: 1
      },
      {
        text: '自由职业者',
        value: 2
      },
      {
        text: '客户',
        value: 3
      }
    ],
    role: 0
  }),
  created() {
    this._getUserList()
  },  
  computed: {
    headers() {
      return generateHeaders(this.desserts[0], headersArrToHeadersMap('USER_MANAGEMENT'), {
        sort: ['account', 'name', 'role', 'sex', 'age'],
        sortable: false
      })
    }
  },
  methods: {
    _getUserList() {
      API.getUserList({
        role: this.role
      }).then(res => {
        this.desserts = res.data
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    roleFormatter,
    sexFormatter
  }
}
</script>