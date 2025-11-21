import { Container, Graphics, type ColorSource } from "pixi.js";
import { ShapeBaseBoardObject } from "./ShapeBaseBoardObject";

export class CircleBoardObject extends ShapeBaseBoardObject {
  radius: number;

  constructor(x: number, y: number, radius: number, color: ColorSource) {
    // super принимает левый верхний угол, поэтому смещаем на радиус
    super(x - radius, y - radius, radius * 2, radius * 2, color);
    this.color = color;
    this.radius = radius;
  }

  createPixiObject(container: Container): void {
    const circle = new Graphics();
    circle.beginFill(this.color);
    circle.drawCircle(0, 0, this.radius);
    circle.endFill();

    // Ставим позицию объекта на центр
    circle.position.set(this.x + this.radius, this.y + this.radius);

    container.addChild(circle);
  }
}
