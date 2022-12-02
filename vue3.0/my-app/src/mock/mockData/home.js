import Mock from 'mockjs'

let List = [];
export default {
    getStaticData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [{
                        name: '小米',
                        value: 2999,
                    },
                    {
                        name: '苹果',
                        value: 5999,
                    },
                    {
                        name: 'vivo',
                        value: 3999,
                    },
                    {
                        name: 'oppo',
                        value: 4999,
                    },
                    {
                        name: '魅族',
                        value: 1999,
                    },
                    {
                        name: '三星',
                        value: 8999,
                    }
                ],
                // 柱状图
                userData: [{
                    date: '周一',
                    new: 5,
                    active: 200,
                }, {
                    date: '周二',
                    new: 10,
                    active: 500,
                }, {
                    date: '周三',
                    new: 12,
                    active: 550,
                }, {
                    date: '周四',
                    new: 5,
                    active: 200,
                }, {
                    date: '周五',
                    new: 5,
                    active: 200,
                }, {
                    date: '周六',
                    new: 5,
                    active: 200,
                }, {
                    date: '周日',
                    new: 5,
                    active: 200,
                }],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                tableData: [{
                        name: 'oppo',
                        todayBug: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'vivo',
                        todayBug: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: '小米',
                        todayBug: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: '苹果',
                        todayBug: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: '魅族',
                        todayBug: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: '三星',
                        todayBug: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    }
                ]
            }
        }
    }
}