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
  <div>login</div>
</template>
