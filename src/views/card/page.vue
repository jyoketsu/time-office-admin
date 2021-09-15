<template>
  <div class="card-type-wrapper">
    <div class="table-wrapper">
      <el-table :data="tableData" height="100%" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              circle
            ></el-button>
          </template>
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              style="margin-right: 15px"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        style="text-align: left"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const handleSizeChange = (val: number) => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = (val: number) => {
      console.log(`当前页: ${val}`);
    };
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      handleEdit: (index: number, row: any) => {},
      handleDelete: (index: number, row: any) => {},
      handleSizeChange,
      handleCurrentChange,
      currentPage: ref(1),
    };
  },
});
</script>
<style scoped>
.card-type-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table-wrapper {
  padding: 20px;
  background-color: white;
  flex: 1;
  overflow: hidden;
}
.page-wrapper {
  padding: 0 20px 20px 20px;
  background-color: white;
}
</style>
