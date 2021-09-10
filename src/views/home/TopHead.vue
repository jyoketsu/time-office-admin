<template>
  <div class="head">
    <div class="left"></div>
    <div class="right">
      <el-dropdown>
        <el-avatar
          class="avatar"
          size="medium"
          :src="user && user.profile ? user.profile.avatar : ''"
        ></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      user: computed(() => store.state.auth.user),
      logout: () => store.dispatch("auth/logout"),
    };
  },
});
</script>
<style lang="scss" scoped>
.head {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right {
  height: 100%;
  display: flex;
  align-items: center;
}
.avatar {
  cursor: pointer;
}
</style>
