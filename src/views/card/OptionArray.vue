<template>
  <div class="field-options">
    <div class="option-item" v-for="(option, index) in options">
      <ui-textfield class="option-item-input" v-model="option.name" />
      <ui-icon-button icon="delete" circle @click="handleDelete(index)" />
    </div>
    <ui-button class="add-button" outlined icon="add" @click="handleAdd"
      >新增一个选项</ui-button
    >
  </div>
</template>
<script setup lang="ts">
import { CardOption } from "../../interfaces/CardFieldType";
import { useAlert } from "balm-ui";
const $alert = useAlert();
const props = defineProps<{ options: CardOption[] }>();

const handleAdd = () => {
  props.options.push({ name: "", color: "#FFF" });
};
const handleDelete = (index: number) => {
  if (props.options.length > 1) {
    props.options.splice(index, 1);
  } else {
    $alert("至少要有一个选项！");
  }
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
