<template>
    <div v-if="!item.hidden">
        <template
            v-if="
                hasOneShowingChild(item.children, item) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren)
            "
        >
            <AppLink
                v-if="onlyOneChild.meta"
                :to="resolvePath(onlyOneChild.path)"
            >
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{ 'submenu-title-noDropdown': !isNest }"
                >
                    <Item
                        :icon="
                            onlyOneChild.meta.icon ||
                            (item.meta && item.meta.icon)
                        "
                        :title="onlyOneChild.meta.title"
                    />
                </el-menu-item>
            </AppLink>
        </template>

        <el-submenu
            v-else
            ref="subMenu"
            :index="resolvePath(item.path)"
            popper-append-to-body
        >
            <template slot="title">
                <Item
                    v-if="item.meta"
                    :icon="item.meta && item.meta.icon"
                    :title="item.meta.title"
                />
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
import path from "path";
import utils from "@/utils";
import Item from "./Item";
import AppLink from "./Link";

export default {
    name: "SidebarItem",
    components: { Item, AppLink },
    props: {
        // route object
        item: {
            type: Object,
            required: true,
        },
        isNest: {
            type: Boolean,
            default: false,
        },
        basePath: {
            type: String,
            default: "",
        },
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        this.onlyOneChild = null;
        return {};
    },
    created() {},
    methods: {
        hasOneShowingChild(children = [], parent) {
            console.log(children, parent, "parentparentparent");
            const showingChildren = children.filter((item) => {
                if (item.hidden) {
                    return false;
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true;
                }
            });
            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = {
                    ...parent,
                    path: "",
                    noShowingChildren: true,
                };

                return true;
            }

            return false;
        },
        resolvePath(routePath) {
            if (utils.isExternal(routePath)) {
                return routePath;
            }
            if (utils.isExternal(this.basePath)) {
                return this.basePath;
            }
            // 拼接路径
            return path.resolve(this.basePath, routePath);
        },
    },
};
</script>
