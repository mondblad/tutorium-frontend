import * as PIXI from "pixi.js";

export const setupViewportZoom = (
    canvas: HTMLCanvasElement,
    container: PIXI.Container,
    minZoom = 0.1,
    maxZoom = 5
) => {
    let scale = 1;

    const onWheel = (e: WheelEvent) => {
        e.preventDefault();

        const oldScale = scale;
        const direction = e.deltaY < 0 ? 1 : -1;
        const zoomFactor = 0.1;

        let newScale = oldScale + direction * zoomFactor;
        newScale = Math.max(minZoom, Math.min(maxZoom, newScale));
        scale = newScale;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const worldX = (mouseX - container.x) / oldScale;
        const worldY = (mouseY - container.y) / oldScale;

        container.scale.set(newScale);
        container.x = mouseX - worldX * newScale;
        container.y = mouseY - worldY * newScale;
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
        canvas.removeEventListener("wheel", onWheel);
    };
};