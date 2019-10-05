import Point from "./Point";

export interface Activable {

  getPosition(): Point;
  doAction(): void;

}
