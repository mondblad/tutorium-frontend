import { BoardManager } from "../../managers/BoardManager";

export const setupViewportZoom = (
    boardManager: BoardManager,
    minZoom = 0.25,
    maxZoom = 3
) => {
    const onWheel = (e: WheelEvent) => {
        e.preventDefault();

        const oldScale = boardManager.scale;
        const direction = e.deltaY < 0 ? 1 : -1;
        const zoomFactor = 0.1;

        let newScale = oldScale + direction * zoomFactor;
        newScale = Math.max(minZoom, Math.min(maxZoom, newScale));
        boardManager.scale = newScale;

        const rect = boardManager.appView.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const worldX = (mouseX - boardManager.zoomLayer.x) / oldScale;
        const worldY = (mouseY - boardManager.zoomLayer.y) / oldScale;

        // обновляем масштаб и позицию zoomLayer
        boardManager.zoomLayer.scale.set(newScale);
        boardManager.zoomLayer.x = mouseX - worldX * newScale;
        boardManager.zoomLayer.y = mouseY - worldY * newScale;
    };

    boardManager.appView.addEventListener("wheel", onWheel, { passive: false });

    return () => {
        boardManager.appView.removeEventListener("wheel", onWheel);
    };
};
