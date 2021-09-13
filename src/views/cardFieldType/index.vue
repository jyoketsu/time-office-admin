<template>
  <div class="card-field-wrapper">
    <el-card
      v-for="field in cardFieldTypeList"
      :key="field.fieldType"
      shadow="hover"
    >
      <div class="field-card">
        <i
          class="card-icon"
          :style="`background-image: url(${field.fieldIcon})`"
        ></i>
        <div class="text item">
          {{ field.fieldType }}
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { cardFieldTypeList } from "./data";
</script>
<style scoped>
.card-field-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 15px;
  row-gap: 15px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.field-card {
  height: 30px;
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
