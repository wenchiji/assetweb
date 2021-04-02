<template>
    <div class="login-container" >
        <el-card class="login-form-layout">
            <el-form autocomplete="on" :model="loginForm" ref="loginForm" :rules="rules" label-position="left">
                <h2 class="login-title color-main">IT资产管理</h2>
                <el-form-item prop="username">
                    <el-input type="text" v-model="loginForm.username" autocomplete="on" placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :type="pwdType" v-model="loginForm.password" autocomplete="on" placeholder="请输入密码"
                              @keyup.enter.native="handleLogin">
                    </el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 10px">
                    <el-button style="width: 100%" type="primary"
                               :loading="loading" @click="handleLogin('loginForm')">登录</el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 50px">
                    <el-button style="width: 100%" type="primary"
                               :loading="loading" @click="register()">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        inject: ['reload'], //依赖注入
        username: "login",
        data() {
            return {
                loginForm: {
                    username:'',
                    password:''
                },
                loading: false,
                pwdType: "password",
                rules: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    // console.log(valid) 验证通过为true，有一个不通过就是false
                    if (valid) {
                        this.loading = true;
                        let param = new URLSearchParams()
                        param.append('username',this.loginForm.username)
                        param.append('password',this.loginForm.password)
                        axios.post('http://127.0.0.1:8000/itaim/login',param)
                            .then(response => {
                                this.loading = false;
                                let code = response.data;
                                if(code.success === "true"){
                                    /*存储到ls*/
                                    localStorage.setItem('eleToken',code.token);
                                    console.log('eleToken');
                                    this.$router.push('/ListAsset');
                                }else {
                                    this.$alert('用户名或密码错误!','提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.reload();
                                        }
                                    });
                                }
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    } else {
                        console.log("参数验证不合法！");
                        return false;
                    }
                });
            },
            register(){
                this.$alert('企业微信联系-温炽基!','提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.reload();
                        // window.location.reload()
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .login-form-layout {
        position: absolute;
        left: 0;
        right: 0;
        width: 360px;
        margin: 140px auto;
        /*border-top: 10px solid #409eff;*/
    }

    .login-title {
        text-align: center;
    }

    /* 背景 */
    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../assets/login.jpg");
        background-size:100% 100%;
    }
    .login-center-layout {
        background: #409eff;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin-top: 200px;
    }
</style>
