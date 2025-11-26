import { Graphics, type ColorSource } from "pixi.js";
import { ShapeBaseBoardObject } from "./ShapeBaseBoardObject";
import type { BoardManager } from "../../../../managers/BoardManager";

export class RectangleBoardObject extends ShapeBaseBoardObject<Graphics> {

  constructor(
    boardManager: BoardManager,
    x: number,
    y: number,
    width: number,
    height: number,
    color: ColorSource
  ) {
    super(boardManager, x, y, width, height, color);
    this.init();
  }

  protected createPixiObject(): Graphics {
    const graphics = new Graphics();
    graphics.rect(0, 0, this.width, this.height).fill({ color: this.color });
    return graphics;
  }
}