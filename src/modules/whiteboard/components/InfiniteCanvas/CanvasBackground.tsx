interface CanvasBackgroundProps {
    mode: "grid" | "dots";
    zoom: number;
}

export const CanvasBackground = ({ mode, zoom }: CanvasBackgroundProps) => {
    const style: React.CSSProperties = {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        transform: `scale(${zoom})`,
        transformOrigin: "0 0", // чтобы масштаб происходил от верхнего левого угла
        pointerEvents: "none", // чтобы фон не блокировал взаимодействие с доской
    };

    const backgroundStyle =
        mode === "grid"
            ? {
                backgroundImage: `
                    linear-gradient(to right, #cccccc 1px, transparent 1px),
                    linear-gradient(to bottom, #cccccc 1px, transparent 1px)
                  `,
                backgroundSize: "50px 50px",
            }
            : {
                backgroundImage: `
                    radial-gradient(#cccccc 2px, transparent 2px)
                  `,
                backgroundSize: "50px 50px",
            };

    return <div style={{ ...style, ...backgroundStyle }} />;
};
