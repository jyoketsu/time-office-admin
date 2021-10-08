<template>
  <div class="card-type-wrapper">
    <div class="table-wrapper">
      <ui-table
        :data="cardList"
        :thead="thead"
        :tbody="tbody"
        fullwidth
        fixedHeader
        :scroll="{ y: 100 }"
      >
        <template #actions="{ data }">
          <ui-icon
            @click="
              selectedRow = data;
              isAdd = false;
              detailVisible = true;
            "
            style="cursor: pointer"
            >edit</ui-icon
          >
          <ui-icon @click="handleDelete(data)" style="cursor: pointer"
            >delete</ui-icon
          >
        </template>
      </ui-table>
      <CardDetail
        :visible="detailVisible"
        :form="selectedRow"
        :isAdd="isAdd"
        @close="detailVisible = false"
      />
    </div>
    <ui-icon
      class="add_card_button"
      aria-describedby="tooltip-id"
      @click="
        selectedRow = { _key: '', name: '', icon: '' };
        detailVisible = true;
        isAdd = true;
      "
      >add_circle</ui-icon
    >
    <ui-tooltip id="tooltip-id">添加卡片</ui-tooltip>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import CardDetail from "./CardDetail.vue";
import { useConfirm } from "balm-ui";

export default defineComponent({
  components: { CardDetail },
  setup() {
    const $confirm = useConfirm();
    const store = useStore();
    const user = computed(() => store.state.auth.user);
    const loading = computed(() => store.state.common.loading);

    watchEffect(() => {
      if (user.value) {
        store.dispatch("card/getCardList");
      }
    });

    return {
      cardList: computed(() => store.state.card.cardList),
      handleDelete: (row: any) => {
        $confirm({
          message: `确定要删除【${row.name}】吗？`,
          acceptText: "删除",
          cancelText: "取消",
        }).then((result: any) => {
          if (result) {
            store.dispatch("card/deleteCard", row._key);
          }
        });
      },
      show: (data: any) => {
        console.log("---row-data---", data);
      },
      detailVisible: ref(false),
      isAdd: ref(false),
      selectedRow: ref({
        _key: "",
        name: "",
        icon: "",
      }),
      loading,
      thead: ["卡片名称", "操作"],
      tbody: [
        "name",
        {
          slot: "actions",
        },
      ],
    };
  },
});
</script>
<style scoped lang="scss">
.card-type-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table-wrapper {
  padding: 20px;
  background-color: white;
}
.add_card_button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  color: $mainColor;
  font-size: 48px;
  cursor: pointer;
}
</style>
