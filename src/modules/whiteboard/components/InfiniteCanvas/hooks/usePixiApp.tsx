import { useEffect } from "react";
import * as PIXI from "pixi.js";
import { setupViewportPan } from "../pixiApp/setupViewportPan";
import { setupViewportZoom } from "../pixiApp/setupViewportZoom";
import { setupObjects } from "../pixiApp/setupObjects";

export const usePixiApp = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        if (!containerRef.current) return;

        let pixiApp: PIXI.Application | null = null;

        const initApp = async () => {
            try {
                console.log("Starting PIXI initialization...");

                // Создаем PIXI приложение
                pixiApp = new PIXI.Application();

                // Ждем инициализации
                await pixiApp.init({
                    antialias: true,
                    backgroundColor: 0x2d2d2d,
                    resizeTo: containerRef.current!,
                });

                console.log("PIXI initialized successfully");

                // Проверяем что view создан
                if (!pixiApp.view) {
                    throw new Error("PIXI view is null");
                }

                // Добавляем canvas в DOM
                containerRef.current!.appendChild(pixiApp.view);

                // Создаем слой для масштабирования и панорамирования
                const zoomLayer = new PIXI.Container();
                pixiApp.stage.addChild(zoomLayer);

                const centerDot = new PIXI.Graphics();
                centerDot.beginFill(0xFF0000); // красная точка
                centerDot.drawCircle(0, 0, 5); // радиус точки 5px
                centerDot.endFill();

                // ставим в центр контейнера
                centerDot.position.set(pixiApp.renderer.width / 2, pixiApp.renderer.height / 2);

                zoomLayer.addChild(centerDot);

                // Настраиваем обработчики
                setupViewportPan(pixiApp.view, zoomLayer);
                setupViewportZoom(pixiApp.view, zoomLayer);
                setupObjects(zoomLayer);

                console.log("PIXI setup completed");

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
            console.log("Cleaning up PIXI...");
            safeDestroy(pixiApp);
        };
    }, [containerRef]);
};