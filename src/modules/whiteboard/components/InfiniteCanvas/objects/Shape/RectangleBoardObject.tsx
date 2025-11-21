import { Container, Graphics, type ColorSource } from "pixi.js";
import { BaseBoardObject } from "../BaseBoardObject";

export class RectangleBoardObject extends BaseBoardObject {
  color: ColorSource;

  constructor(x: number, y: number, width: number, height: number, color: ColorSource) {
    super(x, y, width, height);
    this.color = color;
  }

  createPixiObject(container: Container): void {
    const square = new Graphics();
    square.beginFill(this.color);
    square.drawRect(0, 0, this.width, this.height);
    square.endFill();
    square.position.set(this.x, this.y);
    container.addChild(square);
  }
}