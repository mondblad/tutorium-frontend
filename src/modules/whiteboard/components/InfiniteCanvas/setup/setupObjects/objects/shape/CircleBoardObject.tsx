import { Graphics, type ColorSource } from "pixi.js";
import { ShapeBaseBoardObject } from "./ShapeBaseBoardObject";
import type { BoardManager } from "../../../../managers/BoardManager";

export class CircleBoardObject extends ShapeBaseBoardObject<Graphics> {
  radius: number;

  constructor(boardMager: BoardManager, x: number, y: number, radius: number, color: ColorSource) {
    // super принимает левый верхний угол, поэтому смещаем на радиус
    super(boardMager, x - radius, y - radius, radius * 2, radius * 2, color);
    this.color = color;
    this.radius = radius;
    this.init();
  }

  createPixiObject(): Graphics {
    const circle = new Graphics();
    circle.circle(this.radius, this.radius, this.radius).fill(this.color);
    return circle;
  }
}
