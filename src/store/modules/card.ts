import api from "../../util/api";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { CardState } from "../types/CardState";

const state: CardState = {
  cardList: [],
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
};

const actions: ActionTree<CardState, RootState> = {
  async getCardList({ commit }) {
    const res: any = await api.card.getCards();
    if (res.status === 200) {
      commit("setCardList", res.data);
    }
  },
  async addCard({ commit }, { name, icon }) {
    const res: any = await api.card.addCard(name, icon);
    if (res.status === 200) {
      commit("addCard", res.data);
    }
  },
  async updateCard({ commit }, { cardKey, name, icon }) {
    const res: any = await api.card.editCard(cardKey, name, icon);
    if (res.status === 200) {
      commit("updateCardList", res.data);
    }
  },
  async deleteCard({ commit }, cardKey: string) {
    const res: any = await api.card.deleteCard(cardKey);
    if (res.status === 200) {
      commit("deleteCard", cardKey);
    }
  },
  clearCardList({ commit }) {
    commit("clearCardList");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
