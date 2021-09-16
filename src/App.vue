<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const expired = computed(() => store.state.auth.expired);

watchEffect(() => {
  if (expired.value) {
    router.push("/welcome");
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: unset;
}
*:not(input):not(textarea) {
  user-select: none;
}
</style>
