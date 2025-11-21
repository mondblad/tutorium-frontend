import { type ColorSource } from "pixi.js";
import { BaseBoardObject } from "../BaseBoardObject";

export abstract class ShapeBaseBoardObject extends BaseBoardObject {
    color: ColorSource;

    constructor(x: number, y: number, width: number, height: number, color: ColorSource) {
        super(x, y, width, height);
        this.color = color;
    }
}