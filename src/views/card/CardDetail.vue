<template>
  <el-dialog
    custom-class="card-detail"
    :title="`${isAdd ? '新增' : '修改'}卡片`"
    v-model="visible"
    @closed="emit('close')"
    :fullscreen="true"
    style="display: flex; flex-direction: column"
  >
    <el-form :model="form">
      <el-form-item label="卡片名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="卡片图标"> <QiniuUpload /> </el-form-item>
    </el-form>

    <CardFieldTypes @click="handleClickAddField" />
    <div class="table-wrapper">
      <el-table :data="extraFields" height="100%" style="width: 100%">
        <el-table-column prop="meaning" label="字段名称" width="180">
        </el-table-column>
        <el-table-column prop="fieldName" label="字段名" width="180">
        </el-table-column>
        <el-table-column prop="fieldType" label="字段类型" width="180">
        </el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <el-button
              icon="el-icon-edit"
              circle
              @click="handleEditField(scope.$index, scope.row)"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              circle
              @click="handleDeleteField(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取 消</el-button>
        <el-button type="primary" @click="commit(form)">确 定</el-button>
      </span>
    </template>
    <CardFieldOptions
      :visible="fieldOptionsVisible"
      :form="selectedRow"
      @close="fieldOptionsVisible = false"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { Card } from "../../interfaces/Card";
import { CardFieldType } from "../../interfaces/CardFieldType";
import CardFieldTypes from "./CardFieldTypes.vue";
import CardFieldOptions from "./CardFieldOptions.vue";
import QiniuUpload from "../../components/QiniuUpload.vue";

const extraFields = ref<CardFieldType[]>([]);
const fieldOptionsVisible = ref(false);
const selectedRow = ref<CardFieldType | null>(null);

const props = defineProps<{ visible: boolean; isAdd: boolean; form: Card }>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

watchEffect(() => {
  if (props.form._key) {
    // let field: CardFieldType = {};
    // const keys = Object.keys(props.form);
    // for (let index = 0; index < keys.length; index++) {
    //   const key = keys[index];
    //   // todo
    // }
    // extraFields.value.push(fields);
  }
});

const commit = (form: any) => {
  console.log("---form---", form.name);
};

const handleClickAddField = (field: CardFieldType) => {
  // form;
  console.log("---点击添加字段---", field);
  extraFields.value.push(field);
};
const handleDeleteField = (index: number) => {
  extraFields.value.splice(index, 1);
};

const handleEditField = (index: number, row: any) => {
  fieldOptionsVisible.value = true;
  selectedRow.value = row;
};
</script>
<style scoped>
.table-wrapper {
  flex: 1;
  overflow: hidden;
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
