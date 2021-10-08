import api from "../../util/api";
import { MutationTree, ActionTree } from "vuex";
import { AuthState } from "../types/AuthState";
import { RootState } from "../types/RootState";

const state: AuthState = {
  user: null,
  expired: false,
  uploadToken: null,
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
    localStorage.clear();
  },
  setUploadToken(state, data) {
    state.uploadToken = data;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  // 获取用户信息
  async getUserByToken({ commit }, token: string) {
    const res: any = await api.auth.loginByToken(token);
    if (res.statusCode === "200") {
      api.setToken(token);
      const user = res.result;
      const profile = user.profile || {};
      const syncRes: any = await api.auth.syncUser(
        user._key,
        profile.trueName || profile.nickName,
        user.mobile,
        user.app,
        user.appHigh,
        profile.avatar,
        profile.email
      );
      if (syncRes.status === 200) {
        commit("setUser", user);
      } else {
        alert('"获取用户信息失败！"');
      }
    } else {
      commit("clearUser");
    }
  },
  logout({ commit }) {
    commit("clearUser");
  },
  async getUploadToken({ commit }) {
    const res: any = await api.auth.getUptoken();
    if (res.statusCode === "200") {
      commit("setUploadToken", res.result);
    } else {
      alert("获取qiniu-token出错！");
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
