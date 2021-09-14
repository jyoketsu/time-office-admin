<template>
  <div class="field-options">
    <div class="option-item" v-for="(option, index) in options">
      <el-input
        class="option-item-input"
        v-model="option.name"
        autocomplete="off"
      ></el-input>
      <el-button icon="el-icon-delete" circle @click="handleDelete(index)" />
    </div>
    <el-button
      class="add-button"
      type="primary"
      round
      icon="el-icon-plus"
      @click="handleAdd"
      >新增一个选项</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { CardOption } from "../../interfaces/CardFieldType";
const props = defineProps<{ options: CardOption[] }>();

const handleAdd = () => {
  props.options.push({ name: "", color: "#FFF" });
};
const handleDelete = (index: number) => {
  props.options.splice(index, 1);
};
</script>
<style scoped>
.option-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.option-item-input {
  margin-right: 15px;
}
.add-button {
  width: 100%;
  margin-top: 5px;
}
</style>
