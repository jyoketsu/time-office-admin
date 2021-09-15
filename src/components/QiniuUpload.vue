<template>
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
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { guid } from "../util/util";
const store = useStore();
const upload_qiniu_url = "https://upload.qiniup.com";
const upload_qiniu_addr = "https://cdn-icare.qingtime.cn/";

const props = defineProps<{ url: string }>();
const emit = defineEmits<{
  (e: "handle-change", imageUrl: string): void;
}>();

const uploadToken = computed(() => store.state.auth.uploadToken);

const imageUrl = ref("");
const qiniuData = ref({
  key: "",
  token: uploadToken.value,
});

onMounted(() => {
  store.dispatch("auth/getUploadToken");
});

watchEffect(() => {
  if (uploadToken.value) {
    qiniuData.value.token = uploadToken.value;
  }
});

watchEffect(() => {
  imageUrl.value = props.url;
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
  emit("handle-change", imageUrl.value);
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
</style>
