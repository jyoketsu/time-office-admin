import { AuthState } from "./AuthState";
import { CardState } from "./CardState";
import { CommonState } from "./CommonState";

export interface RootState {
  auth: AuthState;
  card: CardState;
  common: CommonState;
}
