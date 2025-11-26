import { Container } from "pixi.js";
import type { BoardManager } from "../managers/BoardManager";

export abstract class BaseRenderObject {
    protected boardManager: BoardManager;
    protected renderContainer: Container;

    public constructor(boardManager: BoardManager, x: number, y: number) {
        this.boardManager = boardManager;
        this.renderContainer = new Container();

        this.setRenderX(x);
        this.setRenderY(y);
    }

    public getRenderX() {
        return this.renderContainer.position.x;
    }

    public getRenderY() {
        return this.renderContainer.position.y;
    }

    public setRenderX(x: number) {
        this.renderContainer.position.x = Math.round(x);
    }

    public setRenderY(y: number) {
        this.renderContainer.position.y = Math.round(y);
    }

    public setRenderPos(x: number, y: number) {
        this.renderContainer.position.set(Math.round(x), Math.round(y));
    }

    public getRenderContainer() {
        return this.renderContainer;
    }
}
