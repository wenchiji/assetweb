<template>
    <div id="app">
        <el-form style="width: 40%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<style>
</style>
<script>
    export default {
        inject: ['reload'], //依赖注入
        data() {
            return {
                ruleForm: {
                    name: '',
                    phone: '',
                    password: ''
                },
                rules: {
                    name: [
                        { required: true, message: '用户名称不能为空', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                const this1 = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://10.2.10.22:8090/register',this.ruleForm).then(function(response){
                            if(response.data.success === true){
                                this1.$alert('用户 '+this1.ruleForm.name+' 添加成功!','提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.reload();
                                    }
                                });
                            }
                        })
                    } else {
                        console.log('用户添加失败!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
