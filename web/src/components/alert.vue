<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="snackbar.type"
    app
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      timeout: 2000,
      snackbar: {
        text: '',
        type: ''
      }
    }
  },
  watch: {
    '$store.state.snackbar'(newVal) {
      this.snackbar = newVal
      this.show = true
    }
  }
}
</script>

<style>

</style>