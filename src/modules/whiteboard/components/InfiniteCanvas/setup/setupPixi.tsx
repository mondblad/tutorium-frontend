import { type Application, Graphics, Container } from "pixi.js";
import { BoardManager } from "../managers/BoardManager";

import { setupBoardEvent } from "./setupBoardEvent/setupBoardEvent";
import { setupObjects } from "./setupObjects/setupObjects";
import { setupViewportZoom } from "./setupViewportZoom/setupViewportZoom";

export const setupPixi = (
    pixiApp: Application
) => {
    const zoomLayer = new Container();

    zoomLayer.sortableChildren = true;

    const boardManager = new BoardManager(zoomLayer, pixiApp.canvas);

    zoomLayer.sortableChildren = true;

    const hitAreaBg = new Graphics();
    hitAreaBg.rect(0, 0, pixiApp.renderer.width, pixiApp.renderer.height).fill(0x000000, 0.1);
    hitAreaBg.interactive = true;
    hitAreaBg.cursor = "default";

    pixiApp.stage.addChild(zoomLayer);
    pixiApp.stage.addChild(hitAreaBg);

    setupBoardEvent(boardManager, hitAreaBg);
    setupViewportZoom(boardManager);
    setupObjects(boardManager);
};