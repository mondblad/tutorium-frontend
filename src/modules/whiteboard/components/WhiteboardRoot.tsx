import React, { useState } from "react";
import { ToolPanel } from "./ToolPanel";
import { InfiniteCanvas } from "./InfiniteCanvas/InfiniteCanvas";
import { DisplayPanel } from "./DisplayPanel";

export const WhiteboardRoot: React.FC = () => {
    // Камера: pan и zoom
    const [camera, setCamera] = useState({ x: 0, y: 0, scale: 1 });
    const [displayMode, setDisplayMode] = useState<"grid" | "dots">("grid");

    const minScale = 0.25;
    const maxScale = 3;

    return (
        <div style={styles.root}>
            <ToolPanel />

            <InfiniteCanvas
            //mode={displayMode}
            //camera={camera}
            //setCamera={setCamera}
            //minScale={minScale}
            //maxScale={maxScale}
            />

            <DisplayPanel
                mode={displayMode}
                setMode={setDisplayMode}
                scale={camera.scale}
                setScale={(newScale) => setCamera(prev => ({ ...prev, scale: newScale }))}
                minScale={minScale}
                maxScale={maxScale}
            />
        </div>
    );
};

const styles = {
    root: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        position: "relative",
    } as React.CSSProperties,
};
