import * as PIXI from "pixi.js";

export const setupViewportPan = (canvas: HTMLCanvasElement, container: PIXI.Container) => {
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
        isDragging = false;
        canvas.style.cursor = "grab";
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        container.x += dx;
        container.y += dy;

        lastX = e.clientX;
        lastY = e.clientY;
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
        canvas.style.cursor = "default";
        canvas.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mousemove", onMouseMove);
    };
};