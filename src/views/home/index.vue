<template>
  <el-container class="root">
    <el-aside width="200px"><leftMenu /></el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import LeftMenu from "./LeftMenu.vue";

export default defineComponent({
  components: { LeftMenu },
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
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: $menuBg;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  width: 100%;
  height: 100%;
}
</style>
