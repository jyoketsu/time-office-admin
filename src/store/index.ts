import { createStore, StoreOptions } from "vuex";
import { RootState } from "./types/RootState";
import auth from "./modules/auth";
import card from "./modules/card";

const store: StoreOptions<RootState> = {
  modules: {
    auth,
    card,
  },
};

export default createStore(store);
