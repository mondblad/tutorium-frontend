import * as OBJ from "../objects";
import { Container } from "pixi.js";

export const setupObjects = (
    container: Container
) => {
    const objects: OBJ.BaseBoardObject[] = [
        new OBJ.RectangleBoardObject(0, 0, 100, 50, "0xFF0000"),
        new OBJ.RectangleBoardObject(50, 50, 200, 100, "0xFFA500"),
        new OBJ.CircleBoardObject(400, 400, 100, "0xFFA500"),
    ];

    objects.forEach(element => {
        element.createPixiObject(container);
    });
};