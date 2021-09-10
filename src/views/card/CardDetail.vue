<template>
  <el-dialog
    :title="`${isAdd ? '新增' : '修改'}卡片`"
    v-model="visible"
    @closed="emit('close')"
  >
    <el-form :model="form">
      <el-form-item label="卡片名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取 消</el-button>
        <el-button type="primary" @click="commit(form)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { Card } from "../../interfaces/Card";

defineProps<{ visible: boolean; isAdd: boolean; form: Card }>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
const commit = (form: any) => {
  console.log("---form---", form.name);
};
</script>
