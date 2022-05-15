<template>
  <div>
    <v-list-item-avatar>
      <v-img
        v-if="sex == 1"
        src="../assets/img/male.png"
      ></v-img>
      <v-img
        v-else
        src="../assets/img/female.png"
      ></v-img>
    </v-list-item-avatar>
  </div>
</template>

<script>
export default {
  props: {
    sex: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>

<style>

</style>