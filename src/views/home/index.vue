<template>
  <div class="root">
    <!-- App bar -->
    <ui-top-app-bar
      content-selector=".demo-content"
      :nav-icon="false"
      :title="'MindCute Admin'"
    >
      <template #toolbar="{ toolbarItemClass }">
        <ui-icon-button icon="logout" @click="logout"></ui-icon-button>
      </template>
    </ui-top-app-bar>
    <!-- Content -->
    <div class="demo-content">
      <!-- Drawer -->
      <ui-drawer viewport-height>
        <ui-drawer-content>
          <ui-nav>
            <ui-nav-item
              :active="pathName === '/card' ? true : false"
              @click="handleClick('card')"
            >
              <ui-icon class="nav-icon">content_paste</ui-icon>
              <span>卡片列表</span>
            </ui-nav-item>
            <ui-nav-item
              :active="pathName === '/field-type' ? true : false"
              @click="handleClick('field-type')"
            >
              <ui-icon class="nav-icon">satellite</ui-icon>
              <span>字段类型</span>
            </ui-nav-item>
          </ui-nav>
        </ui-drawer-content>
      </ui-drawer>
      <!-- App content -->
      <div class="app-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import TopHead from "./TopHead.vue";

export default defineComponent({
  components: { TopHead },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    onMounted(() => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        store.dispatch("auth/getUserByToken", token);
      } else {
        router.push("/welcome");
      }
    });

    return {
      handleClick: (pathName: string) => {
        router.push(pathName);
      },
      pathName: computed(() => route.path),
      logout: () => {
        store.dispatch("auth/logout");
      },
    };
  },
});
</script>
<style scoped lang="scss">
.root {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.nav-icon {
  margin-right: 8px;
}
.app-content {
  flex: 1;
  overflow: auto;
}
.demo-content {
  overflow: hidden;
}
</style>
