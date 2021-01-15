<template>
    <div class="login-container">
        <el-card class="login-form-layout">
            <el-form autocomplete="on" :model="loginForm" ref="loginForm" :rules="rules" label-position="left">
                <h2 class="login-title color-main">IT资产管理</h2>
                <el-form-item prop="phone">
                    <el-input type="text" v-model="loginForm.phone" autocomplete="on" placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :type="pwdType" v-model="loginForm.password" autocomplete="on" placeholder="请输入密码"
                              @keyup.enter.native="handleLogin">
                    </el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 60px">
                    <el-button style="width: 100%" type="primary"
                               :loading="loading" @click="handleLogin('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    phone:'',
                    password:''
                },
                loading: false,
                pwdType: "password",
                rules: {
                    phone: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
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
                        axios.post('http://localhost:8090/login',this.loginForm)
                            .then(response => {
                                this.loading = false;
                                let code = response.data;
                                if(code.success === true){
                                    /*存储到ls*/
                                    localStorage.setItem('eleToken',token);
                                    this.$router.push('/ListAsset');
                                }else {
                                    this.$router.push({
                                        callback: action =>{
                                            window.location.reload()
                                        }
                                    });
                                }

                                // if (code == 'success') {
                                //     this.$router.push({
                                //         path: "/asset"
                                //     });
                                // } else {
                                //     this.$router.push({
                                //         callback: action => {
                                //             window.location.reload()
                                //         }
                                //     });
                                // }
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    } else {
                        console.log("参数验证不合法！");
                        return false;
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
