<template>
  <div class="left-menu">
    <div class="head">
      <i></i>
      <span>Working Admin</span>
    </div>
    <div class="menu-wrapper">
      <el-menu
        :uniqueOpened="true"
        default-active="1"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        background-color="#474747"
        text-color="#fff"
        active-text-color="#1ca8b3"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-postcard"></i>
            <span>卡片管理</span>
          </template>
          <el-menu-item index="card">卡片列表</el-menu-item>
          <el-menu-item index="field-type">字段类型</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      handleOpen: (key: string, keyPath: string) => {},
      handleClose: (key: string, keyPath: string) => {},
    };
  },
});
</script>
<style scoped lang="scss">
.left-menu {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.head {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.head > i {
  width: 32px;
  height: 32px;
  background-image: url(/icon/logo.svg);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.head > span {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}
.menu-wrapper {
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  background: $menuBg;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #1ca8b3;
}
.el-menu-vertical {
  border-right: unset;
  text-align: left;
}
</style>
