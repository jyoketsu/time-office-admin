<template>
  <ui-menu-anchor>
    <ui-button raised @click="open = true">添加字段</ui-button>
    <ui-menu v-model="open" @selected="onSelected">
      <ui-menuitem
        class="card-field-type"
        v-for="field in cardFieldTypes"
        :key="field.fieldType"
      >
        <i
          class="card-icon"
          :style="`background-image: url(${field.fieldIcon})`"
        ></i>
        <ui-menuitem-text> {{ field.fieldType }}</ui-menuitem-text>
      </ui-menuitem>
    </ui-menu>
  </ui-menu-anchor>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { CardFieldType } from "../../interfaces/CardFieldType";
import { guid } from "../../util/util";
import { cardFieldTypeList } from "../cardFieldType/data";

const emit = defineEmits<{
  (e: "click", cardFieldType: CardFieldType): void;
}>();
const open = ref(false);
const cardFieldTypes = computed(() => cardFieldTypeList);
const onSelected = (data: any) => {
  const cardFieldType = cardFieldTypes.value[data.index];
  emit("click", { ...cardFieldType, ...{ rowId: guid(8, 16) } });
};
</script>
<style scoped>
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
