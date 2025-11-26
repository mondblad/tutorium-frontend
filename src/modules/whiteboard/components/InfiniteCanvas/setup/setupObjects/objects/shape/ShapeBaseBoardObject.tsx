import { Container, type ColorSource } from "pixi.js";
import { BaseBoardObject } from "../BaseBoardObject";
import type { BoardManager } from "../../../../managers/BoardManager";

export abstract class ShapeBaseBoardObject<T extends Container = Container> extends BaseBoardObject<T> {
    color: ColorSource;

    constructor(boardManager: BoardManager, x: number, y: number, width: number, height: number, color: ColorSource) {
        super(boardManager, x, y, width, height, true);
        this.color = color;
    }
}