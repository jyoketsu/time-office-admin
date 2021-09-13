<template>
  <el-dropdown style="width: 125px">
    <el-button round icon="el-icon-circle-plus el-button-">添加字段</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          class="card-field-type"
          v-for="field in cardFieldTypeList"
          :key="field.fieldType"
          @click="emit('click', field)"
        >
          <i
            class="card-icon"
            :style="`background-image: url(${field.fieldIcon})`"
          ></i>
          <div :key="field.fieldType" class="text item">
            {{ field.fieldType }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div class="card-field-types"></div>
</template>
<script setup lang="ts">
import { CardFieldType } from "../../interfaces/CardFieldType";
import { cardFieldTypeList } from "../cardFieldType/data";
const emit = defineEmits<{
  (e: "click", cardFieldType: CardFieldType): void;
}>();
</script>
<style scoped>
.card-field-types {
  width: 150px;
}
.card-field-type {
  display: flex;
  align-items: center;
}
.card-icon {
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
