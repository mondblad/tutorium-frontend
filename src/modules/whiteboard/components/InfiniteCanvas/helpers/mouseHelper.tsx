import type { BoardManager } from "../managers/BoardManager";

export class MouseHelper {
    static screenToBoard(
        e: MouseEvent,
        boardManager: BoardManager
    ): { x: number; y: number } {
        const rect = boardManager.appView.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scale = boardManager.scale;
        const boardX = (mouseX - boardManager.zoomLayer.x) / scale;
        const boardY = (mouseY - boardManager.zoomLayer.y) / scale;

        return { x: boardX, y: boardY };
    }
}