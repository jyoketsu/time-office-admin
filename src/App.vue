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
*,
:after,
:before {
  box-sizing: border-box;
}
*:not(input):not(textarea) {
  user-select: none;
}
body {
  margin: 0;
}
.mdc-menu-surface {
  max-height: 50vh !important;
}
</style>
