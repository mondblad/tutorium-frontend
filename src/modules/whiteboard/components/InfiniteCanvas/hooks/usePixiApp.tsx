import { useEffect } from "react";
import * as PIXI from "pixi.js";
import { setupPixi } from "../setup/setupPixi";

export const usePixiApp = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        if (!containerRef.current) return;

        let pixiApp: PIXI.Application | null = null;

        const initApp = async () => {
            try {
                pixiApp = new PIXI.Application();

                await pixiApp.init({
                    antialias: true,
                    backgroundColor: 0xFAFAFA,
                    resizeTo: containerRef.current!,
                });

                if (!pixiApp.view) {
                    throw new Error("PIXI view is null");
                }

                containerRef.current!.appendChild(pixiApp.view);

                setupPixi(pixiApp);
            } catch (error) {
                console.error("Failed to initialize PIXI:", error);
                // Очищаем в случае ошибки
                safeDestroy(pixiApp);
                pixiApp = null;
            }
        };

        // Безопасное уничтожение
        const safeDestroy = (app: PIXI.Application | null) => {
            if (app && typeof app.destroy === 'function') {
                try {
                    app.destroy(true);
                } catch (destroyError) {
                    console.error("Error during PIXI destruction:", destroyError);
                }
            }
        };

        initApp();

        // Cleanup при размонтировании
        return () => {
            safeDestroy(pixiApp);
        };
    }, [containerRef]);
};