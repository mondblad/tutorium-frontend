import { Graphics, Container, type ColorSource } from "pixi.js"
import type { BoardManager } from "../managers/BoardManager";

export class SelectionRect {
    public boardManager: BoardManager;

    public container: Container;

    private rect: Graphics = new Graphics();
    private circleTopLeft: Graphics = new Graphics();
    private circleTopRight: Graphics = new Graphics();
    private circleBottomLeft: Graphics = new Graphics();
    private circleBottomRight: Graphics = new Graphics();

    public static selectColor: ColorSource = 0x00A2E8;
    private startRadius = 6;
    public static selectWidth: number = 2;

    public constructor(boardManager: BoardManager) {
        const container = new Container();
        this.boardManager = boardManager;

        this.draw(0, 0);

        container.addChild(this.rect);
        container.addChild(this.circleTopLeft);
        container.addChild(this.circleTopRight);
        container.addChild(this.circleBottomLeft);
        container.addChild(this.circleBottomRight);

        this.container = container;
    }

    public draw(width: number, height: number) {
        this.drawRect(width, height);

        const radius = this.startRadius / this.boardManager.scale;
        this.drawCircle(this.circleTopLeft, radius);
        this.drawCircle(this.circleTopRight, radius);
        this.drawCircle(this.circleBottomLeft, radius);
        this.drawCircle(this.circleBottomRight, radius);

        this.circleTopRight.position.set(width, 0);
        this.circleBottomLeft.position.set(0, height);
        this.circleBottomRight.position.set(width, height);
    }

    private drawCircle(circle: Graphics, radius: number) {
        circle.clear()
            .circle(0, 0, radius)
            .fill()
            .stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });
    }

    private drawRect(width: number, height: number) {
        this.rect.clear()
            .rect(0, 0, width, height)
            .fill({ color: 0x000000, alpha: 0.001 })
            .stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });
    }
};