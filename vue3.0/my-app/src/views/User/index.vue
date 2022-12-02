<template>
    <div style="height: 90%">
        <div class="manage">
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="40%"
                :befor-close="handleClose"
            >
                <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                    :inline="true"
                    :rules="rules"
                >
                    <el-form-item
                        label="姓名"
                        prop="name"
                        style="margin-right: 25px"
                    >
                        <el-input
                            v-model="form.name"
                            placeholder="请输入姓名"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input
                            v-model="form.age"
                            placeholder="请输入年龄"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option label="男" :value="1"></el-option>
                            <el-option label="女" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="form.birth"
                            style="width: 100%"
                            value-format="yyyy-MM-DD"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="地址" prop="addr">
                        <el-input
                            v-model="form.addr"
                            placeholder="请输入地址"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
            </el-dialog>
            <div class="manage-header">
                <el-button type="primary" @click="handleAdd">+ 新增</el-button>
                <el-form :modal="userForm" :inline="true">
                    <el-form-item>
                        <el-input
                            v-model="userForm.name"
                            placeholder="请输入名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit"
                            >搜索</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
            <div class="common-table">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    height="90%"
                    stripe
                >
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <span>
                                {{ +scope.row.sex === 1 ? "男" : "女" }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="birth" label="出生日期">
                    </el-table-column>
                    <el-table-column prop="addr" label="地址">
                    </el-table-column>
                    <el-table-column prop="addr" label="地址">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                size="mini"
                                @click="handleDelete(scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pager">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="20"
                        @current-change="handlePage"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import util from "../../utils";
import { getUser, addUser, editUser, deleteUser } from "../../api";
export default {
    name: "User",
    data() {
        return {
            dialogVisible: false,
            form: {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur",
                    },
                ],
                age: [
                    {
                        required: true,
                        message: "请输入年龄",
                    },
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                    },
                ],
                birth: [
                    {
                        required: true,
                        message: "请选择出生日期",
                    },
                ],
                addr: [
                    {
                        required: true,
                        message: "请填写地址",
                    },
                ],
            },
            tableData: [],
            total: 0,
            modalType: 0, // 0表示新增弹窗，1表示编辑弹窗
            pageData: {
                page: 1,
                limit: 20,
            },
            userForm: {
                name: "",
            },
        };
    },
    created() {
        this.getUser();
    },
    methods: {
        // 列表搜索
        onSubmit() {
            this.getUser();
        },
        // 切换当前页码
        handlePage(val) {
            this.pageData.page = val;
            this.getUser();
        },
        // 新增用户
        handleAdd() {
            this.dialogVisible = true;
            this.modalType = 0;
        },
        // 删除
        handleDelete(row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteUser({ id: row.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.getUser();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 编辑
        handleEdit(row) {
            this.modalType = 1;
            this.dialogVisible = true;
            this.form = util.deepClone(row);
        },
        // 取消弹窗
        cancel() {
            this.dialogVisible = false;
            this.handleClose();
        },
        // 关闭弹窗
        handleClose() {
            this.$refs.form.resetFields();
        },
        // 弹窗提交
        submit() {
            this.$refs.form.validate((valid) => {
                console.log(valid, this.form);
                if (valid) {
                    if (this.modalType === 0) {
                        addUser(this.form).then((res) => {
                            console.log(res);
                            this.getUser();
                        });
                    } else {
                        editUser(this.form).then((res) => {
                            console.log(res);
                            this.getUser();
                        });
                    }
                    this.dialogVisible = false;
                    this.handleClose();
                }
            });
        },
        // 获取列表数据
        getUser() {
            getUser({ params: { ...this.userForm, ...this.pageData } }).then(
                (res) => {
                    const { list, count } = res.data;
                    this.tableData = list;
                    this.total = count;
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.manage {
    height: 90%;
    .common-table {
        height: 90%;
        position: relative;
        background-color: #ffffff;
        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-form-item {
            margin-bottom: 0;
        }
    }
}
/deep/.el-select {
    width: 93%;
}
/deep/.el-date-editor {
    .el-input__inner {
        width: 87% !important;
    }
}
</style>