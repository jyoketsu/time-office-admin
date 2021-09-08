<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.state.auth.user);
    const handleLogin = () => {
      if (user.value) {
        router.push("/");
      } else {
        const redirect = `${window.location.protocol}//${window.location.host}/#/login`;
        const logo = "https://mindcute.com/icon/logo.svg";
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        window.open(
          `https://account.qingtime.cn?app=48&apphigh=36&logo=${logo}&redirect=${redirect}`,
          "new",
          `width=360, height=588, resizable=false, toolbar=no, menubar=no, location=no, status=no, top=${
            (screenHeight - 588) / 2
          }, left=${(screenWidth - 360) / 2}`
        );
      }
    };
    const lintenerHandle = (e: any) => {
      if (
        e.origin === "https://account.qingtime.cn" &&
        e.data.eventName === "redirect"
      ) {
        window.location.href = e.data.data;
      }
    };
    onMounted(() => {
      window.addEventListener("message", lintenerHandle, false);
      const token = localStorage.getItem("auth_token");
      if (token) {
        store.dispatch("auth/getUserByToken", token);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("message", lintenerHandle);
    });
    return { handleLogin };
  },
});
</script>
<template>
  <div class="root">
    <div class="logo"></div>
    <div class="wave-back"></div>
    <div class="wave-middle"></div>
    <div class="wave-front"></div>
    <el-button class="button" type="primary" @click="handleLogin"
      >进入系统</el-button
    >
  </div>
</template>

<style scoped>
.root {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.logo {
  width: 686px;
  height: 209px;
  background-image: url(/icon/mindcute.svg);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  left: calc(50% - 341px);
  top: calc(40vh - 100px);
}
.wave-back {
  position: absolute;
  left: -50%;
  width: calc(100% + 50%);
  height: 100%;
  overflow: hidden;
  background-image: url(/icon/wave-back.svg);
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  animation: 40s linear 1s infinite running waveBack;
}
.wave-middle {
  position: absolute;
  right: -50%;
  width: calc(100% + 50%);
  height: 100%;
  overflow: hidden;
  background-image: url(/icon/wave-middle.svg);
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  animation: 50s linear 1s infinite running waveMiddle;
}
.wave-front {
  position: absolute;
  left: -50%;
  width: calc(100% + 50%);
  height: 100%;
  overflow: hidden;
  background-image: url(/icon/wave-front.svg);
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  animation: 60s linear 1s infinite running waveFront;
}
.button {
  position: absolute;
  top: 38px;
  right: 5vw;
  width: 154px;
  height: 50px;
  border-radius: 30px;
}
@keyframes waveBack {
  0% {
    left: -50%;
  }
  50% {
    left: 0px;
  }
  100% {
    left: -50%;
  }
}
@keyframes waveMiddle {
  0% {
    right: "-50%";
  }
  50% {
    right: "0px";
  }
  100% {
    right: "-50%";
  }
}
@keyframes waveFront {
  0% {
    left: "-50%";
  }
  50% {
    left: "0px";
  }
  100% {
    left: "-50%";
  }
}
@media screen and (max-width: 960px) {
  .logo {
    width: 70%;
    left: calc(50% - 35%);
  }
  .wave-back {
    background-size: 260%;
  }
  .wave-middle {
    background-size: 260%;
  }
  .wave-front {
    background-size: 260%;
  }
}
</style>
