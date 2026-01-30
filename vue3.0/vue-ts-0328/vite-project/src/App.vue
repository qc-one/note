<!-- <script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
</script> -->
<!-- <script>
export default {
    data() {
        return {
            aa: 123,
        };
    },
    methods: {
        test() {},
    },
    setup() {
        const a = 1;

        return {
            a,
        };
    },
};
</script> -->

<template>
    <div>
        {{ a }}
        <button v-on:click="xxx">点击</button>
        <button @click="xxx">点击</button>
        <button @[handleType]="xxx">点击</button>
        <BaseData></BaseData>
    </div>
    <div id="excel" ref="state.excelContainer"  style="width: 100%; height: 800px;"></div>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import BaseData from "./components/BaseData.vue";
import { reactive, shallowRef, triggerRef, onMounted } from "vue";
// import luckysheet from 'luckysheet';
import axios from 'axios';
import * as XLSX from 'xlsx';


const state = reactive({
    excelContainer: null,
});


onMounted(async () => {
    // 第二种
    /**
 * 从后端获取并解析 Excel 文件
 * @param {string} url - 后端 Excel 文件的接口地址
 * @returns {Promise<Object>} 解析后的 Excel 数据
 */
async function fetchAndParseExcel(url:any) {
  try {
    // 1. 发送请求获取 Excel 文件的二进制数据
    const response = await axios({
      url: url,
      method: 'GET',
      responseType: 'arraybuffer', // 关键：指定响应类型为二进制数组
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
    console.log(response, 111)

    // 2. 将二进制数据转换为 Uint8Array 格式
    const data = new Uint8Array(response.data);
    console.log(data, 222)

    // 3. 解析 Excel 文件
    const workbook = XLSX.read(data, { type: 'array' });
    console.log(workbook, 333)

    // 4. 处理解析结果（以第一个工作表为例）
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    console.log(worksheet, firstSheetName, 444)
    
    // 5. 转换为 JSON 格式（可直接操作）
    let jsonData = XLSX.utils.sheet_to_json(worksheet);

    // 方案2：如果无表头，使用数组模式转换
    if (jsonData.length === 0) {
        console.log(`工作表【${firstSheetName}】无表头，尝试数组模式解析`);
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // header:1 表示以数组形式返回
    }
    
    worksheet[firstSheetName] = jsonData;
    console.log(`工作表【${firstSheetName}】解析结果：`, jsonData);

    console.log('Excel 解析结果：', jsonData);
    return {
      sheetNames: workbook.SheetNames, // 所有工作表名称
      data: jsonData, // 第一个工作表的 JSON 数据
      allSheetsData: workbook.SheetNames.reduce((acc:any, sheetName) => {
        acc[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        return acc;
      }, {}) // 所有工作表的 JSON 数据
    };

  } catch (error) {
    console.error('解析 Excel 失败：', error);
    throw new Error('获取或解析 Excel 文件失败，请检查文件地址或格式');
  }
}
fetchAndParseExcel('/api/api/excelpreview').then(result => {
    // 在这里处理解析后的数据
    console.log('所有工作表数据：', result.allSheetsData);
}).catch(err => {
    console.error('处理失败：', err);
  });

    // 第一种
//   try {
//     // 1. 从后端获取 Excel 文件的二进制数据
//     const response = await fetch('/api/excel-preview');
//     const arrayBuffer = await response.arrayBuffer();
//     console.log(arrayBuffer, 111)

//     // 2. 将 arrayBuffer 转换为 Blob，用于后续下载功能（可选）
//     const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//     // // 3. 初始化 Luckysheet 进行预览
//     luckysheet.create({
//       container: state.excelContainer, // 指定渲染容器
//       data: [], // 此处 data 会被 transformExcelToLucky 的结果覆盖
//       showtoolbar: false, // 隐藏工具栏，仅用于预览
//       showinfobar: false, // 隐藏信息栏
//       showsheetbar: false, // 隐藏工作表标签
//       allowCopy: false, // 禁用复制
//       allowEdit: false, // 禁用编辑，实现只读预览
//       hook: {
//         workbookCreateAfter: () => {
//           console.log('Excel 文件加载完成');
//         }
//       }
//     });

//     // 4. 使用 Luckysheet 的转换函数解析 Excel 数据
//     // 注意：Luckysheet 的 transformExcelToLucky 是一个全局函数，需要确保库已完全加载
//     luckysheet.transformExcelToLucky(arrayBuffer, (exportJson, luckysheetfile) => {
//       // 将解析后的数据更新到 Luckysheet 实例中
//       luckysheet.config(exportJson.sheets, excelContainer.value);
//     });
//   } catch (error) {
//     console.error('加载 Excel 文件失败:', error);
//   }
});

const a: number[] = [1, 2];

const xxx = () => {
    console.log("点击了");
};
const handleType = "click";
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
