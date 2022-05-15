<template>
  <div class="text-center">
    <v-dialog
      v-model="$store.state.loading"
      persistent
      width="150"
    >
      <v-card
        color="rgba(0,0,0,.5)"
        dark
      >
        <v-btn x-small class="absolute right-0">
          <v-icon x-small>mdi-close-circle</v-icon>
        </v-btn>
        <v-card-text class="pa-5 text-center">
          <v-progress-circular
            :size="30"
            color="white"
            indeterminate
          ></v-progress-circular>
          加载中...
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>