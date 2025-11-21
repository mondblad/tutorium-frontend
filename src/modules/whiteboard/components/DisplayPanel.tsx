import React, { useState, useRef, useEffect } from "react";

interface DisplayPanelProps {
    mode: "grid" | "dots";
    setMode: (mode: "grid" | "dots") => void;
    scale: number;
    setScale: (scale: number) => void;
    minScale: number;
    maxScale: number;
}

export const DisplayPanel: React.FC<DisplayPanelProps> = ({
    mode,
    setMode,
    scale,
    setScale,
    minScale,
    maxScale,
}) => {
    const [showPreset, setShowPreset] = useState(false);
    const presets = [0.25, 0.5, 1, 2, 3]; // 25%, 50%, 100%, 200%, 300%
    const presetRef = useRef<HTMLDivElement>(null);

    // Закрытие popup при клике вне него
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (presetRef.current && !presetRef.current.contains(event.target as Node)) {
                setShowPreset(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div style={styles.panel}>
            {/* Кнопка уменьшения */}
            <button
                style={styles.button}
                onClick={() => setScale(Math.max(scale - 0.1, minScale))}
            >
                -
            </button>

            {/* Число с popup */}
            <div style={styles.scaleWrapper} ref={presetRef}>
                <div
                    style={styles.scaleLabel}
                    onClick={() => setShowPreset(!showPreset)}
                >
                    {Math.round(scale * 100)}%
                </div>

                {showPreset && (
                    <div style={styles.presetPopup}>
                        {presets.map((p) => (
                            <div
                                key={p}
                                style={styles.presetItem}
                                onClick={() => {
                                    setScale(Math.min(Math.max(p, minScale), maxScale));
                                    setShowPreset(false);
                                }}
                            >
                                {Math.round(p * 100)}%
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Кнопка увеличения */}
            <button
                style={styles.button}
                onClick={() => setScale(Math.min(scale + 0.1, maxScale))}
            >
                +
            </button>

            {/* Кнопки режима */}
            <div style={styles.modeButtons}>
                <button
                    style={mode === "grid" ? styles.activeButton : styles.button}
                    onClick={() => setMode("grid")}
                >
                    Сетка
                </button>
                <button
                    style={mode === "dots" ? styles.activeButton : styles.button}
                    onClick={() => setMode("dots")}
                >
                    Точки
                </button>
            </div>
        </div>
    );
};

const styles = {
    panel: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 100,
    } as React.CSSProperties,

    scaleWrapper: {
        position: "relative",
    } as React.CSSProperties,

    scaleLabel: {
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        userSelect: "none",
        padding: "2px 6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#f8f8f8",
        width: "60px",           // фиксированная ширина
        textAlign: "center",
        boxSizing: "border-box",
    } as React.CSSProperties,

    presetPopup: {
        position: "absolute",
        bottom: `calc(100% + 5px)`, // над панелью на 5px
        left: 0,
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 200,
    } as React.CSSProperties,

    presetItem: {
        padding: "4px 8px",
        cursor: "pointer",
        whiteSpace: "nowrap",
    } as React.CSSProperties,

    modeButtons: {
        display: "flex",
        gap: "10px",
    } as React.CSSProperties,

    button: {
        padding: "6px 10px",
        cursor: "pointer",
        borderRadius: "4px",
        border: "1px solid #ccc",
        background: "#f8f8f8",
        font: "inherit",
        margin: 0,
        outline: "none",
        boxShadow: "none",
        textAlign: "center",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
    } as React.CSSProperties,

    activeButton: {
        padding: "6px 10px",
        cursor: "pointer",
        borderRadius: "4px",
        border: "1px solid #007bff",
        background: "#007bff",
        color: "#fff",
        font: "inherit",
        margin: 0,
        outline: "none",
        boxShadow: "none",
        textAlign: "center",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
    } as React.CSSProperties,
};
