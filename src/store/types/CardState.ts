import { Card } from "../../interfaces/Card";
import { CardFieldType } from "../../interfaces/CardFieldType";

export interface CardState {
  cardList: Card[];
  cardDetail: CardFieldType[];
}
