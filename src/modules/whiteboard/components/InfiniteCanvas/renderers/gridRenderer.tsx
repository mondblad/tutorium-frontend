import type { CameraState } from "../types";

export function drawGrid(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    camera: CameraState
) {
    const gridSize = 40;
    const scaledGrid = gridSize * camera.scale;

    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;

    const startX = camera.x % scaledGrid;

    for (let x = startX; x < canvas.width; x += scaledGrid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    const startY = camera.y % scaledGrid;

    for (let y = startY; y < canvas.height; y += scaledGrid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}
