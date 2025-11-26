import type { BaseBoardObject } from "../setupObjects/objects";
import { BoardManager } from "../../managers/BoardManager";
import { FederatedPointerEvent, Graphics } from "pixi.js";

export const setupBoardEvent = (boardManager: BoardManager, appView: HTMLCanvasElement, hitArea: Graphics) => {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    let lastObjectWasClick: BaseBoardObject | null;
    let isMoveObject: boolean = false;
    let wasAdded: boolean = false;

    const screenToBoard = (e: MouseEvent): { x: number; y: number } => {
        const rect = appView.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scale = boardManager.scale;
        const boardX = (mouseX - boardManager.zoomLayer.x) / scale;
        const boardY = (mouseY - boardManager.zoomLayer.y) / scale;

        return { x: boardX, y: boardY };
    };

    const onLeftDown = (e: MouseEvent): void => {
        const boardPos = screenToBoard(e);
        const object = boardManager.getObjectWasClick(boardPos.x, boardPos.y);

        if (object) {
            if (!boardManager.selectionManager.isSelectObject(object)) {
                if (e.shiftKey)
                    boardManager.selectionManager.addSelectObject(object);
                else
                    boardManager.selectionManager.selectSingleObject(object);
                wasAdded = true;
            }
        }

        const wasClickOnSelectRect = boardManager.selectionManager.containsPoint(boardPos.x, boardPos.y);
        if (wasClickOnSelectRect)
            isMoveObject = true;
        else if (!wasAdded)
            boardManager.selectionManager.deselectAll();

        lastObjectWasClick = object;
    }

    const onLeftUp = (e: MouseEvent): void => {
        isMoveObject = false;
        if (!lastObjectWasClick) {
            boardManager.selectionManager.updateLastCord();
            return;
        };

        if (boardManager.selectionManager.getsssss() && !wasAdded) {
            if (e.shiftKey)
                boardManager.selectionManager.deselect(lastObjectWasClick);
            else
                boardManager.selectionManager.selectSingleObject(lastObjectWasClick);
        }

        boardManager.selectionManager.updateLastCord();
        lastObjectWasClick = null;
        wasAdded = false;
    }

    const getDeltaCord = (e: MouseEvent): [number, number] => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        return [dx, dy];
    }

    const moveContainer = (dx: number, dy: number): void => {
        boardManager.zoomLayer.x += dx;
        boardManager.zoomLayer.y += dy;
    };

    const onRightMouseDown = (e: MouseEvent) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        hitArea.cursor = "grabbing";
    };

    const onRightMouseUp = () => {
        isDragging = false;
        hitArea.cursor = "default";
    };

    const MouseMove = (e: MouseEvent) => {
        const [dx, dy] = getDeltaCord(e);
        if (isMoveObject)
            boardManager.selectionManager.move(dx, dy)
        if (isDragging)
            moveContainer(dx, dy);
    }

    hitArea.on("pointerdown", (e: FederatedPointerEvent) => {
        console.log('pointerdown');
        if (e.button === 0) onLeftDown(e);
        if (e.button === 2) onRightMouseDown(e);
    });

    hitArea.on("pointerup", (e: FederatedPointerEvent) => {
        console.log('pointerup');
        if (e.button === 0) onLeftUp(e);
        if (e.button === 2) onRightMouseUp();
    });

    hitArea.on("pointermove", (e: FederatedPointerEvent) => {
        MouseMove(e);
    });

    hitArea.on("rightclick", (e: FederatedPointerEvent) => {
        console.log("awdadwa");
        e.stopPropagation();
    });

    // Отменяем контекстное меню
    const onContextMenu = (e: MouseEvent) => { e.preventDefault(); };

    window.addEventListener("contextmenu", onContextMenu);

    return () => {
        window.removeEventListener("contextmenu", onContextMenu);
    };
};