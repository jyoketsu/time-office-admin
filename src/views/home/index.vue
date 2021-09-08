<template>
  <div>home</div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
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
