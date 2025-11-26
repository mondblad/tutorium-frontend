import { Graphics, type ColorSource } from "pixi.js";
import type { BoardManager } from "./BoardManager";
import { BaseRenderObject } from "../renderers/BaseRenderObject";
import type { BaseBoardObject } from "../setup/setupObjects/objects";

export class SelectionRectManager extends BaseRenderObject {
    private rect: Graphics;

    private selectLocalColor: ColorSource = 0x00A2E8;

    private x: number = 0;
    private y: number = 0;

    constructor(boardManager: BoardManager) {
        super(boardManager, 0, 0);
        this.rect = new Graphics();
        this.renderContainer.addChild(this.rect);
        boardManager.zoomLayer.addChild(this.renderContainer);
    }

    start(x: number, y: number) {
        console.log("start");
        this.setRenderPos(x, y);

        this.x = x;
        this.y = y;

        this.draw(x, y, 0, 0);
        this.renderContainer.visible = true;
    }

    update(mouseX: number, mouseY: number) {
        const left = Math.min(this.x, mouseX);
        const top = Math.min(this.y, mouseY);

        const width = Math.abs(mouseX - this.x);
        const height = Math.abs(mouseY - this.y);

        this.draw(left, top, width, height);

        const objs = this.getObjectsInSelection(width, height);
        this.boardManager.selectionManager.selectObjects(objs);
    }

    end() {
        this.rect.clear();
        this.renderContainer.visible = false;
    }

    private draw(x: number, y: number, width: number, height: number) {
        this.setRenderX(x);
        this.setRenderY(y);

        this.rect
            .clear()
            .rect(0, 0, width, height)
            .stroke({ width: 1, color: this.selectLocalColor })
            .fill({ color: this.selectLocalColor, alpha: 0.1 });
    }

    private getObjectsInSelection(width: number, height: number): BaseBoardObject[] {
        const leftUpCornerX = this.getRenderX();
        const leftUpCornerY = this.getRenderY();
        const rightBottomCornerX = leftUpCornerX + Math.abs(width);
        const rightBottomCornerY = leftUpCornerY + Math.abs(height);

        const selectedObjects: BaseBoardObject[] = [];

        for (const obj of this.boardManager.objects) {
            const objX = obj.x;
            const objY = obj.y;
            const objW = obj.width ?? 0;
            const objH = obj.height ?? 0;

            const isIntersecting =
                objX + objW >= leftUpCornerX &&
                objX <= rightBottomCornerX &&
                objY + objH >= leftUpCornerY &&
                objY <= rightBottomCornerY;

            if (isIntersecting) {
                selectedObjects.push(obj);
            }
        }

        return selectedObjects;
    }
}
