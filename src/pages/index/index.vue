<template>
  <div class="pubmxxtx_index">
    <div class="btngroup">
      <mt-button class="btn" type="primary" size="large" @click="goSQ()">休学申请</mt-button>
      <mt-button class="btn" type="primary" size="large" @click="goSH()">休学审核</mt-button>
    </div>
  </div>
</template>
<style>
.btngroup {
  margin: 100px auto;
  width: 75%;
}
.btn {
  margin-bottom: 50px;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goSQ() {
      this.$router.push({
        name: "SQ",
        query: {}
      });
    },
    goSH() {
      this.$router.push({
        name: "SH",
        query: {}
      });
    },
   
  },
  components: {},
  
  mounted() {}
};
</script>
