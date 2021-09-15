<template>
  <div>
    <div
      class="icon"
      v-if="iconUrl"
      :style="`background-image:url(${iconUrl})`"
      @click="dialogVisible = true"
    ></div>
    <div v-else class="icon-none-wrapper" @click="dialogVisible = true">
      <div class="el-icon-plus icon-none"></div>
    </div>
    <el-dialog title="图标库" v-model="dialogVisible" width="30%">
      <div class="icon-list-wrapper">
        <div
          v-for="icon in iconList"
          :key="icon._key"
          class="icon-item"
          :style="`background-image:url(${icon.url})`"
          @click="handleClick(icon.url)"
        ></div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps<{ iconUrl: string | null }>();
const emit = defineEmits<{
  (e: "click", url: string): void;
}>();

const iconList = computed(() => store.state.common.iconList);

const dialogVisible = ref(false);

watchEffect(() => {
  if (dialogVisible.value && !iconList.value.length) {
    store.dispatch("common/getIconList");
  }
});

const handleClick = (url: string) => {
  emit("click", url);
  dialogVisible.value = false;
};
</script>
<style scoped>
.icon-list-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 5px;
  column-gap: 5px;
  max-height: 50vh;
  overflow: auto;
}
.icon,
.icon-none-wrapper {
  width: 56px;
  height: 56px;
  cursor: pointer;
}
.icon {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.icon-none-wrapper {
  border: 1px dashed #d9d9d9;
}
.icon-none {
  font-size: 28px;
  color: #8c939d;
  width: 56px;
  height: 56px;
  line-height: 56px;
  text-align: center;
}
.icon-item {
  width: 56px;
  height: 56px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
</style>
