<template>
    <div>
        查询：
        <el-input @keyup.enter.native="findByName" v-model="name" style="width: 20%" placeholder="请输入姓名"></el-input>
        &nbsp
        <el-button type="danger" icon="el-icon-delete" @click="bathDeleteUser(selectionList)"
                   :disabled="this.selectionList.length === 0">批量删除</el-button>
        &nbsp
        <el-button @click="handerEdit()" type="success" icon="el-icon-edit">新增用户</el-button>
        <br><br>
        <el-table :data="tableData" border style="width: 100%" @selection-change="selectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column fixed type="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="150">
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
                    <el-input v-model="editForm.id" readonly ></el-input>
                </el-form-item>
                <el-form-item style="width: 80%" label="用户姓名">
                    <el-input v-model="editForm.username" ></el-input>
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
                <el-button type="primary" @click="addUser">新 增</el-button>
                <el-button type="primary" @click="updateUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        inject: ['reload'], //依赖注入
        methods: {
            getList(that){
                axios.get(this.baseUrl+'/listUser/',{
                    params:{
                        page: that.currentPage,
                        pagesize: that.pageSize
                    }
                }).then(function (response) {
                    that.tableData = response.data.userList
                    that.total = response.data.totalElements
                })
            },
            findByName(){
                axios.get(this.baseUrl+'/findByName/',{
                    params:{
                        username: this.name
                    }
                }).then(response => {
                    this.tableData = response.data.content
                })
            },
            //批量选择时触发
            selectionChange(val){
                this.selectionList = val
            },
            addUser(){
                let param = new URLSearchParams()
                param.append('username', this.editForm.username)
                param.append('phone', this.editForm.phone)
                param.append('password', this.editForm.password)
                axios.post(this.baseUrl+'/addUser/',param
                ).then((response)=>{
                    if(response.data.success == 'true'){
                        this.$alert('用户 '+this.editForm.username+' 添加成功!','提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.reload();
                            }
                        });
                    }else {
                        this.$alert('用户 '+this.editForm.username+' 添加失败!','提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.reload();
                            }
                        });
                    }
                })
            },
            bathDeleteUser () {
                // 获取所有选中行的id成的字符串，以逗号分隔
                let userIds = this.selectionList.map(item => item.id).join()
                let param = new URLSearchParams()
                param.append('ids', userIds)
                this.$confirm('此操作将永久删除所选中账号, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 发送删除请求
                    this.$axios.post(this.baseUrl+'/bathDeleteUser/',param).then((response)=>{
                        if(response.data.success == "true") {
                            this.$alert('删除成功!', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.reload();
                                }
                            });
                        }else {
                            this.$alert('删除失败!','提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.reload();
                                }
                            });
                        }
                    })
                }).catch((e) => {
                    console.log(e.message);
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteUser(row) {
                let param = new URLSearchParams()
                param.append('id', row.id)
                this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.baseUrl+'/deleteUser/',param)
                    .then((response)=>{
                        if(response.data.success == "true"){
                            this.$alert('删除成功!','提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.reload();
                                }
                            });
                        }else {
                            this.$alert('删除失败!','提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.reload();
                                }
                            });
                        }
                    })
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
                let param = new URLSearchParams()
                param.append('id', this.editForm.id)
                param.append('username', this.editForm.username)
                param.append('phone', this.editForm.phone)
                param.append('password', this.editForm.password)
                axios.post(this.baseUrl+'/updateUser/',param
                ).then((response)=>{
                    if(response.data.success == 'true'){
                        this.$alert('用户 '+this.editForm.username+' 信息修改成功!','提示', {
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

        },
        created() {
            const this1 = this
            this1.getList(this1)
        },
        data() {
            return {
                baseUrl: 'http://127.0.0.1:8000/itaim',
                input:'',
                name:'',
                //批量删除选中id
                selectionList:[],
                pageSize: 10,
                total: 0,
                tableData: [],
                currentPage: 1,
                center:true,
                dialogFormVisible: false,
                form: {
                    username: '',
                    phone:'',
                    password:''
                },
                formLabelWidth: '100px',
                editForm: {
                    id:'',
                    username: '',
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
