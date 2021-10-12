<template>
  <ui-file accept="image/*" class="avatar-uploader" @change="beforeUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <ui-icon v-else>add</ui-icon>
  </ui-file>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { uploadImg } from "../util/uploadImage";
import { useAlert } from "balm-ui";
const store = useStore();
const $alert = useAlert();
const props = defineProps<{ url: string }>();
const emit = defineEmits<{
  (e: "handle-change", imageUrl: string): void;
}>();

const uploadToken = computed(() => store.state.auth.uploadToken);

const imageUrl = ref("");

onMounted(() => {
  store.dispatch("auth/getUploadToken");
});

watchEffect(() => {
  imageUrl.value = props.url;
});

const beforeUpload = async (files: any[]) => {
  const file = files[0].sourceFile;
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG && !isPNG) {
    $alert("图片只能是 JPG/PNG 格式!");
    return false;
  }
  if (!isLt2M) {
    $alert("图片大小不能超过 2MB!");
    return false;
  }

  if (uploadToken.value) {
    const url = await uploadImg(uploadToken.value, file);
    if (url && typeof url === "string") {
      emit("handle-change", url);
    }
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
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
