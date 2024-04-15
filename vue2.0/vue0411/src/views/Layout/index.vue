<template>
  <div class="layout">
    <!-- eslint-disable -->
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
          <el-menu-item index="Dragable">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>Dragable</span>
            </template>
          </el-menu-item>
          <el-menu-item index="VueGridLayout">
            <i class="el-icon-menu"></i>
            <span slot="title">VueGridLayout</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>

<script>
/*eslint-disable*/
import { RouterView } from "vue-router";

export default {
  name: "LayoutView",
  components: {},
  data() {
    return {
      defaultActive: ""
    }
  },
  created() {
    this.defaultActive = this.$route.name
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath, "handleSelect");
      this.$router.replace({
        name: key,
        params: {
          id: 123,
          title: 234,
        }
      }, () => { })
    }
  }
};
</script>
