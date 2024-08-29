<template>
  <div class="about">
    <h1>This is an elementui page</h1>
    <!-- <el-button type="primary">Primary</el-button>
    <el-icon size="250"
      color="red">
      <el-icon-filter></el-icon-filter>
    </el-icon> -->
    <!-- <el-icon size="250"
      color="red"> -->
      <!-- <Edit /> -->
    <!-- </el-icon> -->
    <el-input
      v-model="filterText"
      style="width: 240px"
      placeholder="Filter keyword"
    />
    <el-tree
      ref="treeRef"
      style="max-width: 600px"
      :props="props"
      :data="data"
      show-checkbox
      node-key="id"
      :filter-node-method="filterNode"
      :check-strictly="true"
      @check-change="handleCheckChange"
      @check="check"
    />
  </div>
</template>

<script setup>
import { ref,watch } from 'vue'
import { getUsersApi } from "@/api/users.ts"
async function getUsers() {
  let res = await getUsersApi()
  console.log('res', res)
}
getUsers()

const props = {
  label: 'label',
  children: 'children',
}
const filterText = ref('')
const treeRef = ref('')
const handleCheckChange = (
  data,
  checked,
  indeterminate
) => {
  console.log(111, data, checked, indeterminate)
  console.log(222, treeRef.value.getCheckedNodes())
}
watch(filterText, (val) => {
  treeRef.value.filter(val)
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
function check(data, checked) {
  console.log('check', data, checked)
  console.log('checkedKeys', treeRef.value.getCheckedKeys())
  console.log('checkedNodes', treeRef.value.getCheckedNodes())
  console.log('childGroups', data.childGroups)
  let checkedKeys = treeRef.value.getCheckedKeys()
  checkedKeys.forEach(element => {
    console.log('element', element)
    console.log('11234', treeRef.value.getNode(element))
    let node = treeRef.value.getNode(element)
    if (!node.visible) {
      treeRef.value.setChecked(element, false)
    }
  });
}

const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 3,
        label: 'Level two 2-1',
        children: [
          {
            id: 4,
            label: 'Level three 3-1-1',
          },
          {
            id: 5,
            label: 'Level three 3-1-2'
          },
          {
            id: 8,
            label: 'Level three 88'
          },
        ],
      },
      {
        id: 2,
        label: 'Level two 2-2',
        children: [
          {
            id: 6,
            label: 'Level three 3-2-1',
          },
          {
            id: 7,
            label: 'Level three 3-2-2'
          },
        ],
      },
    ],
  },
  {
    id: 10,
    label: 'Level one 2',
    children: [
      {
        id: 30,
        label: 'Level two 2-1',
        children: [
          {
            id: 40,
            label: 'Level three 3-1-1',
          },
          {
            id: 50,
            label: 'Level three 3-1-2'
          },
        ],
      },
      {
        id: 20,
        label: 'Level two 2-2',
        children: [
          {
            id: 60,
            label: 'Level three 3-2-1',
          },
          {
            id: 70,
            label: 'Level three 3-2-2'
          },
        ],
      }
    ]
  }
]

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
