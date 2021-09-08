<template>
  <div>home</div>
</template>
<script lang="ts">
import { computed, defineComponent, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const expired = computed(() => store.state.auth.expired);
    const token = localStorage.getItem("auth_token");
    if (token) {
      store.dispatch("auth/getUserByToken", token);
    } else {
      router.push("/login");
    }
    watchEffect(() => {
      if (expired.value) {
        router.push("/login");
      }
    });
  },
});
</script>
