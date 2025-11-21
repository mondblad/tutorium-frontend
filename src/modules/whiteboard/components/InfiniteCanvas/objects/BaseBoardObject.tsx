import { Container } from "pixi.js";

export abstract class BaseBoardObject {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean = false;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Создает PixiJS объект для рендеринга
   */
  abstract createPixiObject(container: Container): void;
}