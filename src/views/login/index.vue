<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = computed(() => store.state.auth.user);
    watchEffect(() => {
      if (user.value) {
        router.push("/card");
      }
    });
    onMounted(() => {
      const query = route.query;
      const token = query.token;
      if (token) {
        store.dispatch("auth/getUserByToken", token);
      }
    });
    return {};
  },
});
</script>
<template>
  <div class="login"><ui-spinner active></ui-spinner></div>
</template>
<style scoped>
.login {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
