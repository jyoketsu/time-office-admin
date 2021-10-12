import api from "../../util/api";
import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { CommonState } from "../types/CommonState";
import { useToast } from "balm-ui";

const state: CommonState = {
  iconList: [],
  loading: false,
};

const mutations: MutationTree<CommonState> = {
  setIconList(state, data) {
    state.iconList = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
};

const actions: ActionTree<CommonState, RootState> = {
  async getIconList({ commit }) {
    const res: any = await api.auth.getIcons(1, 1000);
    if (res.status === 200) {
      commit("setIconList", res.data);
    } else {
      const $toast = useToast();
      $toast({ message: res.msg, position: "top" });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
