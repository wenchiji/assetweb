<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router :default-openeds="['2','3']">
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">
                        <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                        <el-menu-item v-for="item2 in item.children" :index="item2.path"
                                      :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown @command="logout">
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>管理员</span>
                    &nbsp
<!--                    <el-button @click="logout">退出</el-button>-->
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{

            logout(){
                localStorage.removeItem('eleToken');
                localStorage.removeItem('user');
                // window.location.href="/logout";
                this.$router.push("/")
            }
        },
        mounted() {
            var that = this
            //设置超时退出
            var lastTime = new Date().getTime();
            var currentTime = new Date().getTime();
            var timeOut = 30 * 60 * 1000; //设置超时时间： 10分

            $(function(){
                /* 鼠标移动事件 */
                $(document).mouseover(function(){
                    lastTime = new Date().getTime(); //更新操作时间

                });
            });

            function testTime(){
                currentTime = new Date().getTime(); //更新当前时间
                if(currentTime - lastTime > timeOut){ //判断是否超时
                    console.log("超时");
                    localStorage.removeItem("eleToken")
                    that.$router.push({
                        path:"/"
                    })
                }
            }

            /* 定时器  间隔1秒检测是否长时间未操作页面  */
            window.setInterval(testTime, 1000);
        },
    }
</script>

<style scoped>

</style>
