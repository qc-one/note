<template>
    <div class="tag-container">
        <el-tag
            v-for="(tag, index) in tabsList"
            :key="tag.path"
            :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
            size="small"
            >{{ tag.label }}</el-tag
        >
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "Header",
    computed: {
        ...mapState({
            tabsList: (state) => {
                return state.tab.tabsList;
            },
        }),
    },
    data() {
        return {
            items: [],
        };
    },
    created() {},
    methods: {
        ...mapMutations("tab", ["delMenu"]),
        // 删除tag功能
        handleClose(tag, i) {
            this.delMenu(tag);
            const length = this.tabsList.length;
            if (tag.name !== this.$route.name) {
                return;
            }
            if (i === length) {
                this.$router.push({
                    name: this.tabsList[i - 1].name,
                });
            } else {
                this.$router.push({
                    name: this.tabsList[i].name,
                });
            }
        },
        // 切换tag功能
        changeMenu(tag) {
            this.$router.push({
                name: tag.name,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.tag-container {
    margin-bottom: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>