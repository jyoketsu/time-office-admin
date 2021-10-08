<template>
  <ui-dialog
    v-model="visible"
    :closable="false"
    @confirm="commit"
    @close="emit('close')"
  >
    <ui-dialog-title>{{ `${form?.fieldType}属性设置` }}</ui-dialog-title>
    <ui-dialog-content>
      <ui-form nowrap item-margin-bottom="16" label-width="90" v-if="form">
        <template #default="{ subitemClass, actionClass }">
          <ui-form-field>
            <label>字段名：</label>
            <ui-textfield v-model="form.fieldName"></ui-textfield>
          </ui-form-field>
          <ui-form-field>
            <label>字段名称：</label>
            <ui-textfield v-model="form.meaning"></ui-textfield>
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.show !== undefined">
            <label>是否显示：</label>
            <ui-switch v-model="form.show" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.beQuery !== undefined">
            <label>是否可查询：</label>
            <ui-switch v-model="form.beQuery" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.limitNum !== undefined">
            <label>是否可多个：</label>
            <ui-switch v-model="form.limitNum" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.precision !== undefined">
            <label>精度：</label>
            <ui-select v-model="form.precision" :options="precisionOptions" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.optionArr !== undefined">
            <label>选项配置：</label>
            <OptionArray
              :options="form.optionArr || [{ name: '', color: '' }]"
            />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.alignment !== undefined">
            <label>对齐方式：</label>
            <ui-select v-model="form.alignment" :options="alignmentOptions" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.subIcon !== undefined">
            <label>评分图标：</label>
            <IconSelector :icon-url="form.subIcon" @click="handleClickIcon" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.maxScore !== undefined">
            <label>分数上限：</label>
            <ui-select v-model="form.maxScore" :options="maxScoreOptions" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.unit !== undefined">
            <label>单位：</label>
            <ui-textfield v-model="form.unit"></ui-textfield>
          </ui-form-field>
          <ui-form-field
            class="form-item"
            v-if="form.thousandthShow !== undefined"
          >
            <label>千分位显示：</label>
            <ui-switch v-model="form.thousandthShow" />
          </ui-form-field>
          <ui-form-field class="form-item" v-if="form.symbol !== undefined">
            <label>货币符号：</label>
            <ui-select v-model="form.symbol" :options="symbolOptions" />
          </ui-form-field>
        </template>
      </ui-form>
    </ui-dialog-content>
    <ui-dialog-actions
      acceptText="保存字段"
      cancelText="取消"
    ></ui-dialog-actions>
  </ui-dialog>
</template>
<script setup lang="ts">
import { CardFieldType } from "../../interfaces/CardFieldType";
import OptionArray from "./OptionArray.vue";
import IconSelector from "../../components/IconSelector.vue";
import store from "../../store";
import { ref, watchEffect } from "vue";
import { useAlert } from "balm-ui";

const $alert = useAlert();

const precisionNum = 1;
const precisionOptions = [0, 1, 2, 3, 4].map((item) => {
  return { label: precisionNum.toFixed(item), value: item };
});
const alignmentOptions = [
  { value: "left", label: "左对齐" },
  { value: "right", label: "右对齐" },
  { value: "center", label: "居中" },
];
const maxScoreOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
  return { label: item, value: item };
});
const symbolOptions = [
  { value: "CNY", label: "¥ (人民币)" },
  { value: "EUR", label: "€ (欧元)" },
  { value: "USD", label: "$ (美元)" },
  { value: "JPY", label: "¥ (日元)" },
  { value: "Fr", label: "Fr (法郎)" },
];

const props = defineProps<{
  index: number;
  visible: boolean;
  form: CardFieldType | null;
  isEdit: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleClickIcon = (url: string) => {
  if (props.form) {
    props.form.subIcon = url;
  }
};

const commit = (result: boolean) => {
  if (result) {
    if (props.isEdit) {
      if (props.form?._key) {
        store.dispatch("card/editCardField", {
          index: props.index,
          field: props.form,
        });
      } else {
        store.dispatch("card/addCardField", props.form);
      }
    }
    emit("close");
  }
};
</script>

<style scoped>
.form-item {
  display: flex;
  align-items: center;
}
</style>
