<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const expired = computed(() => store.state.auth.expired);

    watchEffect(() => {
      if (expired.value) {
        router.push("/welcome");
      }
    });
  },
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: unset;
}
*:not(input):not(textarea) {
  user-select: none;
}
</style>
