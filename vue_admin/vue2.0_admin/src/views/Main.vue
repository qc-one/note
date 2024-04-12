<template>
    <div style="height: 100%">
        <el-container>
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <Tag></Tag>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tag from "@/components/Tag";
export default {
    name: "Main",
    components: {
        Aside,
        Header,
        Tag,
    },
    data() {
        return {};
    },
};
</script>
<style scoped lang="less">
.el-container {
    height: 100%;
}
.el-header {
    padding: 0;
}

.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>