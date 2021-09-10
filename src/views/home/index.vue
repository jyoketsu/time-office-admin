<template>
  <el-container class="root">
    <el-aside width="200px"><leftMenu /></el-aside>
    <el-container>
      <el-header><topHead /></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LeftMenu from "./LeftMenu.vue";
import TopHead from "./TopHead.vue";

export default defineComponent({
  components: { LeftMenu, TopHead },
  setup() {
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        store.dispatch("auth/getUserByToken", token);
      } else {
        router.push("/welcome");
      }
    });
  },
});
</script>
<style scoped lang="scss">
.root {
  position: absolute;
  width: 100%;
  height: 100%;
}
.el-header {
  height: 48px;
  border-bottom: 1px solid #e0e4ef;
}

.el-aside {
  background-color: $menuBg;
  overflow: hidden;
}

.el-main {
  background-color: $contentBg;
  width: 100%;
  height: 100%;
}
</style>
