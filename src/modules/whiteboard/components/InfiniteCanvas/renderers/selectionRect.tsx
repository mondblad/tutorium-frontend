import { Graphics, Container, type ColorSource } from "pixi.js"

export class SelectionRect {
    public container: Container;

    private rect: Graphics = new Graphics();
    private circleTopLeft: Graphics = new Graphics();
    private circleTopRight: Graphics = new Graphics();
    private circleBottomLeft: Graphics = new Graphics();
    private circleBottomRight: Graphics = new Graphics();

    public static selectColor: ColorSource = 0x00A2E8;
    public static selectWidth: number = 1;

    public constructor() {
        const container = new Container();

        const radius = 2;
        this.rect.rect(0, 0, 0, 0).fill({ color: 0x000000, alpha: 0.001 }).stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });
        this.circleTopLeft.circle(0, 0, radius).fill().stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });
        this.circleTopRight.circle(0, 0, radius).fill().stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });
        this.circleBottomLeft.circle(0, 0, radius).fill().stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });
        this.circleBottomRight.circle(0, 0, radius).fill().stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });

        container.addChild(this.rect);
        container.addChild(this.circleTopLeft);
        container.addChild(this.circleTopRight);
        container.addChild(this.circleBottomLeft);
        container.addChild(this.circleBottomRight);

        this.container = container;
    }

    public draw(width: number, height: number) {
        this.rect.clear();
        this.rect.rect(0, 0, width, height).fill({ color: 0x000000, alpha: 0.001 }).stroke({ width: SelectionRect.selectWidth, color: SelectionRect.selectColor });

        this.circleTopRight.position.set(width, 0);
        this.circleBottomLeft.position.set(0, height);
        this.circleBottomRight.position.set(width, height);
    }
};