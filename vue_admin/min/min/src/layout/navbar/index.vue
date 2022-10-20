<template>
  <div class="header">
    <div class="logoBox">
      <h3 class="title">姐妹奶茶管理系统</h3>
    </div>
    <div class="menuTitle">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :default-active="activerouter"
        @select="handleSelect"
      >
        <el-menu-item v-for="(menu, t) in menuList" :key="t" :index="menu.path">
          {{ menu.meta.title }}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "", //标题
      activerouter: "/orderManagement/index",
      menuList: [
        {
          path: "/dashboard/index",
          meta: { title: "首页" },
          name: "首页",
        },
        {
          path: "/orderManagement/index",
          meta: { title: "订单管理" },
          name: " ",
        },
        {
          path: "/commodityManagement/index",
          meta: { title: "商品管理" },
          name: " ",
        },
      ],
    };
  },
  mounted() {
 
    
  },
  methods: {
    handleSelect(key,keypath) {
      console.log(key, keypath)
    
    },
  },
};
</script>


<style lang="scss">
.header {
  width: 100%;
  height: 100%;

  .logoBox {
    width: 15%;
    float: left;
    background: rgb(197, 116, 24);
    color: white;
  }
  .menuTitle {
    float: right;
    width: 80%;
    border: 1px solid red;
    background-color: #ffecda;
  }
}
</style>