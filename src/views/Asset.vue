<template>
  <div>
    根据工号查询：
    <el-input v-model="input" style="width: 20%" placeholder="请输入工号">根据工号查询</el-input>
    根据资产编号查询：
    <el-input v-model="input" style="width: 20%" placeholder="请输入资产编号">根据资产编号查询</el-input>
    <br><br>
    <el-button type="danger">删除</el-button>
    <br><br>
    <el-table
            :data="tableData"
            border
            style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed type="index" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="jobId" label="工号" width="150">
      </el-table-column>
      <el-table-column prop="assetType" label="资产类型" width="180">
      </el-table-column>
      <el-table-column prop="assetNumber" label="设备编号" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="updateAsset(scope.row)" type="info" size="small"icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteAsset(scope.row)" type="danger" size="small"icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size= "pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="pageChange">
    </el-pagination>
  </div>

</template>

<script>
  export default {
    methods: {
      deleteAsset(row){
        const this1 = this
        axios.delete('https://itaim.37ops.com/show/'+row.id).then(function (response) {
          this1.$alert('资产'+row.assetNumber+'删除成功!','提示', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          });
        })
      },
      updateAsset(row) {
        this.$router.push({
          path:'updateUser',
          query:{
            id:row.id
          }
        })
      },
      pageChange(currentPage){
        const that = this
        that.currentPage = currentPage;
        that.getList(that);
      },
      getList(that){
        axios.get('http://localhost:8090/listAsset/'+that.currentPage+'/5').then(function (response) {
          that.tableData = response.data.content
          that.total = response.data.totalElements
        })
      }
    },
    created() {
      const this1 = this
      this1.getList(this1)
    },
    data() {
      return {
        input:'',
        pageSize: 5,
        total: 0,
        tableData: [],
        currentPage: 1,
        checked: true
      }
    }
  }
</script>
