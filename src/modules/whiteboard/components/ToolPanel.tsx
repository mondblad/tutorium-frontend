import { kistochka, kistochka2 } from "../assets/image"

export const ToolPanel: React.FC = () => {
    return (
        <div style={styles.panel}>
            <img style={styles.icon} src={kistochka}></img>
            <img style={styles.icon} src={kistochka}></img>
            <img style={styles.icon} src={kistochka}></img>
            <img style={styles.icon} src={kistochka}></img>
            <img style={styles.icon} src={kistochka2}></img>
        </div>
    );
};

const styles = {
    panel: {
        position: "absolute",
        top: "50%",
        left: "15px",
        transform: "translateY(-50%)",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        zIndex: 100,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
    } as React.CSSProperties,

    icon: {
        width: "35px",
        height: "35px",
        padding: "5px",
    } as React.CSSProperties,
};


