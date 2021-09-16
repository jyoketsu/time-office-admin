import api from "../../util/api";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { CardState } from "../types/CardState";
import { ElMessage } from "element-plus";

const state: CardState = {
  cardList: [],
  cardDetail: [],
};

const mutations: MutationTree<CardState> = {
  setCardList(state, data) {
    state.cardList = data;
  },
  addCard(state, data) {
    state.cardList.push(data);
  },
  updateCardList(state, data) {
    const index = state.cardList.findIndex((card) => card._key === data._key);
    state.cardList[index] = data;
  },
  deleteCard(state, cardKey) {
    const index = state.cardList.findIndex((card) => card._key === cardKey);
    state.cardList.splice(index, 1);
  },
  clearCardList(state) {
    state.cardList = [];
  },
  setCardDetail(state, data) {
    state.cardDetail = data;
  },
  addCardDetail(state, data) {
    state.cardDetail.push(data);
  },
  updateCardDetail(state, { index, data }) {
    state.cardDetail[index] = data;
  },
};

const actions: ActionTree<CardState, RootState> = {
  async getCardList({ commit }) {
    commit("common/setLoading", true, { root: true });
    const res: any = await api.card.getCards();
    if (res.status === 200) {
      commit("common/setLoading", false, { root: true });
      commit("setCardList", res.data);
    } else {
      ElMessage.error(res.msg);
    }
  },
  async addCard({ commit }, { name, icon, cardFieldArr }) {
    const res: any = await api.card.addCard(name, icon, cardFieldArr);
    if (res.status === 200) {
      commit("addCard", res.data);
      ElMessage.success("新建卡片成功！");
    } else {
      ElMessage.error(res.msg);
    }
  },
  async updateCard({ commit }, { id, name, icon }) {
    const res: any = await api.card.editCard(id, name, icon);
    if (res.status === 200) {
      commit("updateCardList", res.data);
      ElMessage.success("卡片更新成功！");
    } else {
      ElMessage.error(res.msg);
    }
  },
  async deleteCard({ commit }, cardKey: string) {
    const res: any = await api.card.deleteCard(cardKey);
    if (res.status === 200) {
      commit("deleteCard", cardKey);
    } else {
      ElMessage.error(res.msg);
    }
  },
  clearCardList({ commit }) {
    commit("clearCardList");
  },
  async getCardDetail({ commit }, cardKey: string) {
    commit("common/setLoading", true, { root: true });
    const res: any = await api.card.getCardDetail(cardKey);
    if (res.status === 200) {
      commit("common/setLoading", false, { root: true });
      commit("setCardDetail", res.data);
    } else {
      ElMessage.error(res.msg);
    }
  },
  async addCardField({ commit }, field) {
    const res: any = await api.card.addCardField(field);
    if (res.status === 200) {
      commit("addCardDetail", res.data);
    } else {
      ElMessage.error(res.msg);
    }
  },
  async editCardField({ commit }, { index, field }) {
    const res: any = await api.card.editCardField(field);
    if (res.status === 200) {
      commit("updateCardDetail", { index, data: res.data });
    } else {
      ElMessage.error(res.msg);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
