import api from "../../util/api";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { CommonState } from "../types/CommonState";

const state: CommonState = {
  iconList: [],
};

const mutations: MutationTree<CommonState> = {
  setIconList(state, data) {
    state.iconList = data;
  },
};

const actions: ActionTree<CommonState, RootState> = {
  async getIconList({ commit }) {
    const res: any = await api.auth.getIcons(1, 1000);
    if (res.status === 200) {
      commit("setIconList", res.data);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};