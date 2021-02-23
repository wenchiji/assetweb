<template>
    <div>
        查询：
        <el-input @keyup.enter.native="findByName" v-model="username" style="width: 20%" placeholder="请输入姓名"></el-input>
        &nbsp
        <el-button type="danger" icon="el-icon-delete" @click="bathDeleteUser(selectionList)"
                   :disabled="this.selectionList.length === 0">批量删除</el-button>
<!--        <el-button @click="register" type="success">新增用户</el-button>-->
        <br><br>
        <el-table :data="tableData" border style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="phone" label="电话号码" width="180">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handerEdit(scope.$index,scope.row)" size="small">编辑</el-button>
                    <el-button @click="deleteUser(scope.row)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
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
        <!-- ’编辑‘弹框界面-->
        <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" style="width: 100%" title="编辑用户信息" >
            <el-form :model="editForm" ref="editForm">
                <el-form-item style="width: 80%" label="用户编号" prop="id" >
                    <el-input v-model="editForm.id" ></el-input>
                </el-form-item>
                <el-form-item style="width: 80%" label="用户姓名">
                    <el-input v-model="editForm.name" ></el-input>
                </el-form-item>
                <el-form-item style="width: 80%" label="电话" prop="phone" >
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item style="width: 80%" label="密码" prop="password" >
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="resetForm('editForm')">重置</el-button>
                <el-button type="primary" @click="updateUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        inject: ['reload'], //依赖注入
        methods: {
            findByName(){
                let str = this.username
                axios.get(this.baseUrl+'/findByName?name='+str).then(response => {
                    this.tableData = response.data
                    this.total = response.data.totalElements
                })
            },
            //批量选择时触发
            selectionChange(val){
                this.selectionList = val
            },
            bathDeleteUser () {
                // 获取所有选中行的account组成的字符串，以逗号分隔
                let accounts = this.selectionList.map(item => item.name).join()
                let userIds = this.selectionList.map(item => item.id).join()
                this.$confirm('永久删除 ' + accounts + ' 多个账号, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 发送删除请求
                    this.$axios.post(this.baseUrl+'/bathDeleteUser/?userIds='+userIds)
                    this.$alert('删除成功!','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.reload();
                        }
                    });
                }).catch((e) => {
                    console.log(e.message);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteUser(row) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.baseUrl+'/deleteUser?id='+row.id)
                    this.$alert('删除成功!','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.reload();
                        }
                    });
                }).catch((e) => {
                    console.log(e.message);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            findById(row){
                let user = axios.get(this.baseUrl+'/findById?id='+row.id)
            },
            //显示编辑页面
            handerEdit: function(index,row){
                this.dialogFormVisible = true;
                this.editForm = Object.assign({},row);
            },
            updateUser() {
                let para = Object.assign({},this.editForm);
                axios.post(this.baseUrl+'/updateUser',para).then((response)=>{
                    if(response.data == 'success'){
                        this.$alert('用户 '+this.editForm.name+' 信息修改成功!','提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.reload();
                            }
                        });
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            pageChange(currentPage){
                const that = this
                that.currentPage = currentPage;
                that.getList(that);
            },
            getList(that){
                axios.get(this.baseUrl+'/listAll/'+that.currentPage+'/10').then(function (response) {
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
                baseUrl: 'http://10.2.10.22:8090',
                input:'',
                username:'',
                //批量删除选中id
                selectionList:[],
                pageSize: 10,
                total: 0,
                tableData: [],
                currentPage: 1,
                center:true,
                dialogFormVisible: false,
                form: {
                    name: '',
                    phone:'',
                    password:''
                },
                formLabelWidth: '100px',
                editForm: {
                    id:'',
                    name: '',
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度为11个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                    ],
                }
            }
        }
    }
</script>
