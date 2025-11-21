import { useRef } from "react";
import { usePixiApp } from "./hooks/usePixiApp";

export const InfiniteCanvas = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    usePixiApp(containerRef);

    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100vh", position: "relative" }}
        />
    );
};