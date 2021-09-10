<template>
  <div class="card-type-wrapper">
    <div class="table-wrapper">
      <el-table :data="cardList" height="100%" style="width: 100%">
        <el-table-column prop="name" label="卡片名称" width="180">
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              circle
              @click="detailVisible = true"
            ></el-button>
          </template>
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              style="margin-right: 15px"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <cardDetail
        :visible="detailVisible"
        :form="selectedRow"
        :isAdd="isAdd"
        @close="detailVisible = false"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import CardDetail from "./CardDetail.vue";

export default defineComponent({
  components: { CardDetail },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.auth.user);
    watchEffect(() => {
      if (user.value) {
        store.dispatch("card/getCardList");
      }
    });
    return {
      cardList: computed(() => store.state.card.cardList),
      handleEdit: (index: number, row: any) => {
        console.log(index, row);
      },
      handleDelete: (index: number, row: any) => {
        console.log(index, row);
      },
      detailVisible: ref(false),
      isAdd: ref(false),
      selectedRow: ref({
        _key: "",
        name: "",
        icon: "",
      }),
    };
  },
});
</script>
<style scoped>
.card-type-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table-wrapper {
  padding: 20px;
  background-color: white;
  flex: 1;
  overflow: hidden;
}
</style>
