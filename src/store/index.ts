import { createStore, StoreOptions } from "vuex";
import { RootState } from "./types/RootState";
import auth from "./modules/auth";
import card from "./modules/card";
import common from "./modules/common";

const store: StoreOptions<RootState> = {
  modules: {
    auth,
    card,
    common,
  },
};

export default createStore(store);
