import type { CameraState } from "../types";

export function drawDots(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    camera: CameraState
) {
    const gridSize = 40;
    const scaledGrid = gridSize * camera.scale;

    ctx.fillStyle = "#d0d0d0";
    const dotRadius = 2 * camera.scale;

    for (let x = camera.x % scaledGrid; x < canvas.width; x += scaledGrid) {
        for (let y = camera.y % scaledGrid; y < canvas.height; y += scaledGrid) {
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
