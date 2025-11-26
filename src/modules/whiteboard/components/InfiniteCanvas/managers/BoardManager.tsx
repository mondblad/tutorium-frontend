import type { BaseBoardObject } from "../setup/setupObjects/objects";
import { SelectionManager } from "./SelectionManager";
import { Container } from "pixi.js";

export class BoardManager {
    public zoomLayer: Container;

    public selectionManager: SelectionManager;;
    public scale: number = 1;

    public objects: BaseBoardObject[] = [];

    public constructor(zoomLayer: Container) {
        this.zoomLayer = zoomLayer;
        this.selectionManager = new SelectionManager(this);
    }

    public getObjectWasClick(x: number, y: number): BaseBoardObject | null {
        let objectWasClick: BaseBoardObject | null = null;

        this.objects.forEach(t => {
            if (t.containsPoint(x, y) && (!objectWasClick || objectWasClick.zIndex < t.zIndex))
                objectWasClick = t;
        });

        return objectWasClick;
    }
}