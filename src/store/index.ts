import { createStore, StoreOptions } from "vuex";
import { RootState } from "./types/RootType";
import auth from "./modules/auth";

const store: StoreOptions<RootState> = {
  modules: {
    auth,
  },
};

export default createStore(store);
