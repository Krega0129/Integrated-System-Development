<template>
  <v-card class="full-height">
    <v-card-title>服务商城</v-card-title>
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
      
        <template v-slot:[`item.introduction`]="{ item }">
          {{ item.introduction || '无' }}
        </template>

        <template v-slot:[`item.seller`]="{ item }">
          <div v-if="item.seller" class="d-flex">
            {{ item.seller.name }}

            <div class="text-center">
              <v-menu
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
                :nudge-left="200"
                max-width="200px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn x-small class="ml-5" v-bind="attrs" v-on="on" icon>
                    <v-icon> mdi-menu </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <avatar :sex="item.seller.sex"></avatar>
                      <v-list-item-title>{{ item.seller.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        账号：{{ item.seller.account }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        性别：{{ item.seller.sex == 1 ? '男' : '女' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        年龄：{{ item.seller.age }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </template>

        <template v-slot:[`item.releaseTime`]="{ item }">
          {{ timeFormatter(item.releaseTime) }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn :class="item.hasBought ? '' : 'success'" :disabled="!!item.hasBought" small @click="_buyService(item)">
            {{ item.hasBought ? '已购买' : '购买'}}
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>  
</template>

<script>
import * as API from '@/service/api';
import { headersArrToHeadersMap, generateHeaders } from "@/utils/tableConstant";
import { timeFormatter } from '@/utils';

export default {
  data: () => ({
    desserts: []
  }),
  created() {
    this._getService()
  },
  methods: {
    _getService() {
      API.getService().then(res => {
        this.desserts = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    _buyService(service) {
      API.buyService({
        serviceId: service.id
      }).then(res => {
        this.$hot.showSuccessSnackbar('购买成功')
        service.hasBought = true
        console.log(res);
      }).catch(err => {
        this.$hot.showErrorSnackbar('购买失败')
        console.log(err);
      })
    },
    timeFormatter
  },
  computed: {
    headers() {
      return generateHeaders(this.desserts[0], headersArrToHeadersMap('SERVICE_STORE'), {
        sort: ['name', 'category', 'seller', 'price', 'introduction', 'releaseTime', 'actions'],
        sortable: true
      })
    }
  }
}
</script>

<style>

</style>