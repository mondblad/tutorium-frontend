import * as OBJ from "./objects";
import { BoardManager } from "../../managers/BoardManager";

export const setupObjects = (
    boardManager: BoardManager,
) => {
    const objects: OBJ.BaseBoardObject[] = [
        new OBJ.RectangleBoardObject(boardManager, 0, 0, 100, 50, 0xFF0000),
        new OBJ.RectangleBoardObject(boardManager, 50, 50, 200, 100, "0xFFA500"),
        new OBJ.CircleBoardObject(boardManager, 500, 500, 100, "0xFFA500"),
    ];

    objects.forEach(element => {
        boardManager.objects.push(element);
        boardManager.zoomLayer.addChild(element.getRenderContainer());
    });
};