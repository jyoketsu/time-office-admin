import { AuthState } from "./AuthState";
import { CardState } from "./CardState";

export interface RootState {
  auth: AuthState;
  card: CardState;
}
