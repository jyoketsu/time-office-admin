<template>
  <el-dialog
    custom-class="card-detail"
    :title="`${isAdd ? '新增' : '修改'}卡片`"
    v-model="visible"
    @closed="emit('close')"
    :fullscreen="true"
    style="display: flex; flex-direction: column"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="卡片名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="卡片图标" prop="icon">
        <QiniuUpload :url="form.icon" @handle-change="handleChangeIcon" />
      </el-form-item>
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
              v-if="!scope.row.beReserve"
              icon="el-icon-edit"
              circle
              @click="handleEditField(scope.$index, scope.row)"
            ></el-button>
            <el-button
              v-if="!scope.row.beReserve"
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
      :index="currentRowIndex"
      :visible="fieldOptionsVisible"
      :form="selectedRow"
      :is-edit="!isAdd"
      @close="fieldOptionsVisible = false"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { Card } from "../../interfaces/Card";
import { CardFieldType } from "../../interfaces/CardFieldType";
import CardFieldTypes from "./CardFieldTypes.vue";
import CardFieldOptions from "./CardFieldOptions.vue";
import QiniuUpload from "../../components/QiniuUpload.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const store = useStore();

const props = defineProps<{ visible: boolean; isAdd: boolean; form: Card }>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const cardDetail = computed(() => store.state.card.cardDetail);

const extraFields = ref<CardFieldType[]>([]);
const fieldOptionsVisible = ref(false);
const currentRowIndex = ref(0);
const selectedRow = ref<CardFieldType | null>(null);
const ruleForm = ref<any>(null);

const rules = {
  name: [
    { required: true, message: "请输入卡片名称", trigger: "change" },
    {
      min: 1,
      max: 50,
      message: "长度在 1 到 50 个字符",
      trigger: "change",
    },
  ],
  icon: [{ required: true, message: "请上传卡片图标", trigger: "change" }],
};

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
const handleDeleteField = (index: number) => {
  extraFields.value.splice(index, 1);
};

const handleEditField = (index: number, row: any) => {
  fieldOptionsVisible.value = true;
  selectedRow.value = row;
  currentRowIndex.value = index;
};

const commit = (form: any) => {
  if (ruleForm.value) {
    ruleForm.value.validate((valid: any) => {
      if (valid) {
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
      } else {
        ElMessage.error("请正确输入！");
      }
    });
  }
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
