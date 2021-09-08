import api from "../../util/api";
import { MutationTree, ActionTree, Module } from "vuex";
import { AuthState } from "../types/AuthType";
import { RootState } from "../types/RootType";

const state: AuthState = {
  user: null,
  expired: false,
};

const mutations: MutationTree<AuthState> = {
  // 保存用户信息
  setUser(state, data) {
    state.user = data;
    state.expired = false;
  },
  // 清除用户信息
  clearUser(state) {
    state.user = null;
    state.expired = true;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  // 获取用户信息
  async getUserByToken({ commit }, token: string) {
    const res: any = await api.auth.loginByToken(token);
    if (res.statusCode === "200") {
      const user = res.result;
      commit("setUser", user);
    } else {
      commit("clearUser");
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
