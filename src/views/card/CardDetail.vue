<template>
  <ui-dialog
    v-model="visible"
    @confirm="commit"
    @close="emit('close')"
    fullscreen
    maskClosable
  >
    <ui-dialog-title>{{
      `${isAdd ? "新增" : "编辑"}${form.name || "卡片"}`
    }}</ui-dialog-title>
    <ui-dialog-content>
      <ui-form nowrap item-margin-bottom="16" label-width="80">
        <template #default="{ subitemClass }">
          <ui-form-field>
            <label class="required">卡片名称：</label>
            <ui-textfield v-model="form.name"></ui-textfield>
          </ui-form-field>
          <ui-form-field>
            <label>卡片图标：</label>
            <QiniuUpload :url="form.icon" @handle-change="handleChangeIcon" />
          </ui-form-field>
        </template>
      </ui-form>
      <CardFieldTypes @click="handleClickAddField" />
      <div class="table-wrapper">
        <ui-table
          :data="extraFields"
          :thead="thead"
          :tbody="tbody"
          fullwidth
          fixedHeader
          :scroll="{ y: 100 }"
        >
          <template #actions="{ data }">
            <ui-icon
              v-if="!data.beReserve"
              @click="handleEditField(data)"
              style="cursor: pointer"
              >edit</ui-icon
            >
            <ui-icon
              v-if="!data.beReserve"
              @click="handleDeleteField(data)"
              style="cursor: pointer"
              >delete</ui-icon
            >
          </template>
        </ui-table>
      </div>
    </ui-dialog-content>
    <ui-dialog-actions acceptText="保存" cancelText="取消"></ui-dialog-actions>
  </ui-dialog>
  <CardFieldOptions
    :index="currentRowIndex"
    :visible="fieldOptionsVisible"
    :form="selectedRow"
    :is-edit="!isAdd"
    @close="fieldOptionsVisible = false"
  />
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { Card } from "../../interfaces/Card";
import { CardFieldType } from "../../interfaces/CardFieldType";
import CardFieldTypes from "./CardFieldTypes.vue";
import CardFieldOptions from "./CardFieldOptions.vue";
import QiniuUpload from "../../components/QiniuUpload.vue";
import { useStore } from "vuex";
import { useAlert } from "balm-ui";

const $alert = useAlert();

const store = useStore();

const props = defineProps<{ visible: boolean; isAdd: boolean; form: Card }>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const cardDetail = computed(() => store.state.card.cardDetail);
const loading = computed(() => store.state.common.loading);

const extraFields = ref<CardFieldType[]>([]);
const fieldOptionsVisible = ref(false);
const currentRowIndex = ref(0);
const selectedRow = ref<CardFieldType | null>(null);

const thead = ["字段名称", "字段名", "字段类型", "操作"];
const tbody = [
  "meaning",
  "fieldName",
  {
    field: "fieldType",
    fn: (data: CardFieldType) => {
      return data["fieldType"] || "预定义类型";
    },
  },
  {
    slot: "actions",
  },
];

watchEffect(() => {
  if (props.form._key && props.visible) {
    store.dispatch("card/getCardDetail", props.form._key);
  }
});

watchEffect(() => {
  extraFields.value = cardDetail.value;
});

watchEffect(() => {
  if (!props.visible) {
    extraFields.value = [];
  }
});

const handleChangeIcon = (imageUrl: string) => {
  props.form.icon = imageUrl;
};

const handleClickAddField = (field: CardFieldType) => {
  if (props.isAdd) {
    extraFields.value.push(field);
  } else {
    extraFields.value.push({ ...field, ...{ cardKey: props.form._key } });
  }
};
const handleDeleteField = (row: CardFieldType) => {
  let index;
  if (row._key) {
    index = extraFields.value.findIndex((item) => item._key === row._key);
  } else {
    index = extraFields.value.findIndex((item) => item.rowId === row.rowId);
  }
  extraFields.value.splice(index, 1);
};

const handleEditField = (row: CardFieldType) => {
  let index;
  if (row._key) {
    index = extraFields.value.findIndex((item) => item._key === row._key);
  } else {
    index = extraFields.value.findIndex((item) => item.rowId === row.rowId);
  }
  fieldOptionsVisible.value = true;
  selectedRow.value = row;
  currentRowIndex.value = index;
};

const commit = (result: boolean) => {
  if (result) {
    const form = props.form;
    if (form.name && form.icon) {
      if (props.isAdd) {
        store.dispatch("card/addCard", {
          name: form.name,
          icon: form.icon,
          cardFieldArr: extraFields.value,
        });
      } else {
        store.dispatch("card/updateCard", {
          id: form._key,
          name: form.name,
          icon: form.icon,
        });
      }
      emit("close");
    } else {
      $alert("请正确输入！");
    }
  } else {
    emit("close");
  }
};
</script>
<style scoped>
.table-wrapper {
  margin-top: 16px;
  min-height: 50vh;
}
</style>
<style>
.card-detail {
  display: flex;
  flex-direction: column;
}
.card-detail > .el-dialog__body {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
