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
      <el-form-item label="卡片图标">
        <el-upload
          class="avatar-uploader"
          :action="upload_qiniu_url"
          :data="qiniuData"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
            <el-button icon="el-icon-edit" circle></el-button>
            <el-button icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="commit(form)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { Card } from "../../interfaces/Card";
import { CardFieldType } from "../../interfaces/CardFieldType";
import { guid } from "../../util/util";
import CardFieldTypes from "./CardFieldTypes.vue";
const store = useStore();

const upload_qiniu_url = "https://upload.qiniup.com";
const upload_qiniu_addr = "https://cdn-icare.qingtime.cn/";
const uploadToken = computed(() => store.state.auth.uploadToken);
const imageUrl = ref("");
const qiniuData = ref({
  key: "",
  token: uploadToken.value,
});
const extraFields = ref<CardFieldType[]>([]);

const props = defineProps<{ visible: boolean; isAdd: boolean; form: Card }>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

watchEffect(() => {
  if (uploadToken.value) {
    qiniuData.value.token = uploadToken.value;
  }
});

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

const beforeUpload = (file: File) => {
  qiniuData.value.key = `${guid(8, 16)}${
    file.name ? file.name.substr(file.name.lastIndexOf(".")) : ".png"
  }`;
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG && !isPNG) {
    alert("图片只能是 JPG/PNG 格式!");
    return false;
  }
  if (!isLt2M) {
    alert("图片大小不能超过 2MB!");
    return false;
  }
};
const handleSuccess = (res: any) => {
  imageUrl.value = `${upload_qiniu_addr}${res.key}`;
};

const commit = (form: any) => {
  console.log("---form---", form.name);
};

const handleClickAddField = (field: CardFieldType) => {
  // form;
  console.log("---field---", field);
  extraFields.value.push(field);
};
</script>
<style scoped>
.avatar-uploader {
  width: 56px;
  height: 56px;
  text-align: left;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 56px;
  height: 56px;
  line-height: 56px;
  text-align: center;
}
.avatar {
  width: 56px;
  height: 56px;
  display: block;
}

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
.card-detail>.el-dialog__body{
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
