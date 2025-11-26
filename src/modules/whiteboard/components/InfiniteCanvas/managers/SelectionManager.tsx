import { BaseBoardObject } from "../setup/setupObjects/objects"
import { SelectionRect } from "../renderers/selectionRect";
import { BaseRenderObject } from "../renderers/BaseRenderObject";
import type { BoardManager } from "./BoardManager";
import { Graphics, /*FederatedPointerEvent*/ } from "pixi.js";

export class SelectionManager extends BaseRenderObject {
    private selectedObjects: Map<BaseBoardObject, Graphics> = new Map();

    private selectionRect: SelectionRect = new SelectionRect();

    public isDragging: boolean = false;

    private lastX: number;
    private lastY: number;

    public isSelectObject(object: BaseBoardObject): boolean {
        return this.selectedObjects.has(object);
    }

    public updateLastCord() {
        this.lastX = this.getRenderX();
        this.lastY = this.getRenderY();
    }

    public getLastX = (): number => this.lastX;
    public getLastY = (): number => this.lastY;
    public getsssss = (): boolean => this.lastX === this.getRenderX() && this.lastY === this.getRenderY();

    public constructor(boardMangaer: BoardManager) {
        const startCord = 0;

        super(boardMangaer, startCord, startCord);
        this.lastX = startCord;
        this.lastY = startCord;

        this.boardManager.zoomLayer.addChild(this.renderContainer);

        this.renderContainer.addChild(this.selectionRect.container);
        this.renderContainer.sortableChildren = true;
        this.renderContainer.zIndex = 9999;
        this.selectionRect.container.zIndex = 9999;

        this.renderContainer.eventMode = 'dynamic';
        this.renderContainer.cursor = 'pointer';
    }

    private rectObjects() {
        const bounds = this.getSelectionBounds();
        if (!bounds) return;

        for (const [obj, rect] of this.selectedObjects) {
            rect.position.set(obj.x - bounds.X, obj.y - bounds.Y);
        }
    }

    public selectSingleObject(object: BaseBoardObject): void {

        this.deselectAll();

        const rect = new Graphics();
        rect.rect(0, 0, object.width, object.height)
            .stroke({ width: 0.5, color: SelectionRect.selectColor });
        rect.zIndex = 9998;
        this.renderContainer.addChild(rect);

        this.selectedObjects.set(object, rect);
        object.select();

        this.make();
    }

    public addSelectObject(object: BaseBoardObject): void {
        if (this.selectedObjects.has(object)) return;

        const rect = new Graphics();
        rect.rect(0, 0, object.width, object.height)
            .stroke({ width: 0.5, color: SelectionRect.selectColor });
        rect.zIndex = 9998;
        this.renderContainer.addChild(rect);

        this.selectedObjects.set(object, rect);
        object.select();

        this.make();
    }

    public deselect(object: BaseBoardObject): void {
        const rect = this.selectedObjects.get(object);
        if (!rect) return;

        object.deselect();

        this.renderContainer.removeChild(rect);
        this.selectedObjects.delete(object);

        this.make();
    }

    public deselectAll(): void {
        for (const [obj, rect] of this.selectedObjects) {
            obj.deselect();
            this.renderContainer.removeChild(rect);
        }
        this.selectedObjects.clear();

        this.make();
    }

    public move(dx: number, dy: number) {
        for (const obj of this.selectedObjects.keys()) {
            obj.move(dx, dy);
        }

        const bounds = this.getSelectionBounds();
        if (!bounds) return;

        this.setRenderPos(bounds.X, bounds.Y);
    }

    private make(): void {
        const bounds = this.getSelectionBounds();

        if (!bounds) {
            this.renderContainer.visible = false;
            return;
        }

        if (!this.renderContainer.visible)
            this.renderContainer.visible = true;

        this.updateCord();
        this.rectObjects();
        this.selectionRect.draw(bounds.width, bounds.height);
    }

    private updateCord() {
        const cord = this.getSelectionBounds();
        if (!cord) return;
        this.setRenderPos(cord.X, cord.Y);
    }

    private getSelectionBounds() {
        if (this.selectedObjects.size === 0)
            return null;

        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        for (const obj of this.selectedObjects.keys()) {
            const left = obj.x;
            const right = obj.x + obj.width;
            const top = obj.y;
            const bottom = obj.y + obj.height;

            if (left < minX) minX = left;
            if (right > maxX) maxX = right;
            if (top < minY) minY = top;
            if (bottom > maxY) maxY = bottom;
        }

        return {
            X: minX,
            Y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    }

    // Проверяет, содержит ли объект точку
    containsPoint(x: number, y: number): boolean {
        const bounds = this.getSelectionBounds();
        console.log(bounds, x, y);
        if (!bounds) return false;

        return x >= bounds.X &&
            x <= bounds.X + bounds.width &&
            y >= bounds.Y &&
            y <= bounds.Y + bounds.height;
    }
}
