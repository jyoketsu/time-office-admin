<template>
  <div class="card-field-wrapper">
    <ui-card
      v-for="field in cardFieldTypeList"
      :key="field.fieldType"
      shadow="hover"
    >
      <ui-card-text class="field-card">
        <i
          class="card-icon"
          :style="`background-image: url(${field.fieldIcon})`"
        ></i>
        <div class="text item">
          {{ field.fieldType }}
        </div>
      </ui-card-text>
    </ui-card>
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
  padding: 15px;
}
.text {
  font-size: 18px;
}

.item {
  padding: 18px 0;
}

.field-card {
  height: 80px;
  display: flex;
  align-items: center;
}
.card-icon {
  margin-right: 8px;
  width: 18px;
  height: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
