<template>
  <div id="app">
    <el-main>
      <router-view></router-view>
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
    data() {
      const item = {
        date: '',
        name: '',
        address: ''
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
