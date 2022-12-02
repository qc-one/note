<template>
    <el-row>
        <el-col :span="8" style="padding-right: 10px">
            <el-card class="box-card" shadow="hover">
                <div class="user">
                    <img src="../../assets/images/touxiang.png" alt="" />
                    <div class="user-info">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>
                        上次登录时间：
                        <span>2021-7-19</span>
                    </p>
                    <p>
                        上次登录地点：
                        <span>北京</span>
                    </p>
                </div>
            </el-card>
            <el-card
                class="box-card"
                shadow="hover"
                style="margin-top: 20px; height: 460px"
            >
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="课程">
                    </el-table-column>
                    <el-table-column prop="todayBug" label="今日购买">
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="总购买">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px">
            <div class="num">
                <el-card
                    shadow="hover"
                    :body-style="{ display: 'flex', padding: 0 }"
                    v-for="item in countData"
                    :key="item.name"
                >
                    <i
                        class="icon"
                        :class="'el-icon-' + item.icon"
                        :style="{ backgroundColor: item.color }"
                    ></i>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px">
                <div ref="echarts1" style="height: 240px"></div>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px">
                    <div ref="echarts2" style="height: 240px"></div>
                </el-card>
                <el-card style="height: 260px">
                    <div ref="echarts3" style="height: 240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from "../../api";
import * as echarts from "echarts";
export default {
    name: "Home",
    data() {
        return {
            tableData: [],
            countData: [
                {
                    name: "今日支付订单1",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日支付订单2",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日支付订单3",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日支付订单4",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日支付订单5",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日支付订单6",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9",
                },
            ],
        };
    },
    created() {
        getData()
            .then((res) => {
                const { tableData, orderData, userData, videoData } =
                    res.data.data;
                this.tableData = tableData;
                // 折线图
                const echarts1 = echarts.init(this.$refs.echarts1);
                const xAxis = Object.keys(orderData.data[0]);
                const seriesArr = [];
                xAxis.forEach((v) => {
                    seriesArr.push({
                        name: v,
                        data: orderData.data.map((i) => {
                            return i[v];
                        }),
                        type: "line",
                    });
                });
                var echarts1Option = {
                    tooltip: {},
                    legend: {
                        data: xAxis,
                    },
                    xAxis: {
                        data: xAxis,
                    },
                    yAxis: {},
                    series: seriesArr,
                };
                echarts1.setOption(echarts1Option);

                // 柱状图
                var echarts2 = echarts.init(this.$refs.echarts2);
                var echarts2Option = {
                    tooltip: {
                        trigger: "axis",
                    },
                    legend: {
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    xAxis: {
                        type: "category",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                        data: userData.map((item) => item.date),
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        {
                            name: "新增用户",
                            type: "bar",
                            data: userData.map((item) => item.new),
                        },
                        {
                            name: "活跃用户",
                            type: "bar",
                            data: userData.map((item) => item.active),
                        },
                    ],
                };
                echarts2.setOption(echarts2Option);

                // 饼状图
                var echarts3 = echarts.init(this.$refs.echarts3);
                var echarts3Option = {
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [
                        {
                            data: videoData,
                            type: "pie",
                        },
                    ],
                };
                echarts3.setOption(echarts3Option);
            })
            .catch((err) => {
                console.log(err, "错误");
            });
    },
};
</script>
<style lang="less" scoped>
.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 48%;
    }
}
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #ffffff;
    }
    .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc {
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
    }
}
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
        width: 150px;
        height: 150px;
        border-radius: 200px;
        margin-right: 40px;
    }
    .user-info {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access {
            color: #999999;
        }
    }
}
.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span {
            margin-left: 60px;
        }
    }
}
</style>