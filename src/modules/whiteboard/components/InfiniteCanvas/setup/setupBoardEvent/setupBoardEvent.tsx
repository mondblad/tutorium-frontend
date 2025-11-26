import type { BaseBoardObject } from "../setupObjects/objects";
import { BoardManager } from "../../managers/BoardManager";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { MouseHelper } from "../../helpers/mouseHelper";
import { SelectionRectManager } from "../../managers/SelectionRectManager";

export const setupBoardEvent = (boardManager: BoardManager, hitArea: Graphics) => {
    const selectionRectManager: SelectionRectManager = new SelectionRectManager(boardManager);

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    let lastObjectWasClick: BaseBoardObject | null;
    let isMoveObject: boolean = false;
    let wasAdded: boolean = false;

    let selectred: boolean = false;

    const getDeltaCord = (e: MouseEvent): [number, number] => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        return [dx, dy];
    }

    const onLeftDown = (e: MouseEvent, boardManager: BoardManager): void => {
        const boardPos = MouseHelper.screenToBoard(e, boardManager);
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
        else if (!wasAdded && !selectred) {
            boardManager.selectionManager.deselectAll();

            selectionRectManager.start(boardPos.x, boardPos.y);
            selectred = true;
        }

        lastObjectWasClick = object;
    }

    const onLeftUp = (e: MouseEvent): void => {
        isMoveObject = false;
        selectred = false;
        selectionRectManager.end();

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

    const onMouseMove = (e: MouseEvent) => {
        const [dx, dy] = getDeltaCord(e);
        const boardPos = MouseHelper.screenToBoard(e, boardManager);
        if (selectred)
            selectionRectManager.update(boardPos.x, boardPos.y);
        if (isMoveObject)
            boardManager.selectionManager.move(dx, dy)
        if (isDragging)
            boardManager.zoomLayer.position.set(boardManager.zoomLayer.x + dx, boardManager.zoomLayer.y + dy);
    }

    hitArea.on("pointerdown", (e: FederatedPointerEvent) => {
        console.log('pointerdown');
        if (e.button === 0) onLeftDown(e, boardManager);
        if (e.button === 2) onRightMouseDown(e);
    });

    hitArea.on("pointerup", (e: FederatedPointerEvent) => {
        console.log('pointerup');
        if (e.button === 0) onLeftUp(e);
        if (e.button === 2) onRightMouseUp();
    });

    hitArea.on("pointermove", (e: FederatedPointerEvent) => {
        onMouseMove(e);
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