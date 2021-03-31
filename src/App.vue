<template>
  <div id="app">
    <el-main>
      <router-view v-if="isRouterAlive"></router-view>
    </el-main>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    line-height:100%
  }
</style>

<script>
  export default {
    name: 'app',
    provide() {
      return {
        reload: this.reload,
      }
    },
    data() {
      return {
        // tableData: Array(20).fill(item),
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    }
  };
</script>
