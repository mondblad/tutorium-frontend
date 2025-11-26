import { Container, Graphics, type ColorSource, /*FederatedPointerEvent*/ } from "pixi.js";
import { BoardManager } from "../../../managers/BoardManager";
import { BaseRenderObject } from "../../../renderers/BaseRenderObject";

export abstract class BaseBoardObject<T extends Container = Container> extends BaseRenderObject {
  public width: number;
  public height: number;

  public x: number;
  public y: number;
  public zIndex: number;

  public isSelected: boolean = false;

  protected selectColor: ColorSource = 0x00A2E8;
  protected pixiObject: T | null = null;
  protected selectionFrame: Graphics = new Graphics();
  protected selectionColor: number = 0x00FF00;
  protected selectionWidth: number = 3;

  constructor(boardManager: BoardManager, x: number, y: number, width: number, height: number, isInteractive: boolean) {
    super(boardManager, x, y);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.zIndex = 0;

    this.renderContainer.sortableChildren = true;
    this.renderContainer.addChild(this.selectionFrame);

    this.selectionFrame.zIndex = 9999;
    this.selectionFrame.rect(0, 0, this.width, this.height).stroke({ width: 0.5, color: this.selectColor });
    this.selectionFrame.visible = false;

    if (isInteractive)
      this.makeInteractive(this.renderContainer);
  }

  protected init() {
    this.pixiObject = this.createPixiObject();
    this.renderContainer.addChild(this.pixiObject);
  }

  // Абстрактный метод для создания Pixi объекта
  protected abstract createPixiObject(): T;

  select(): void {
    this.isSelected = true;
  };

  deselect(): void {
    this.isSelected = false;

    //this.boardManager.zoomLayer.addChild(this.getRenderContainer());
    //this.setRenderPos(this.x, this.y);
  }

  move(dx: number, dy: number): void {
    this.x = this.x + dx / this.boardManager.scale;
    this.y = this.y + dy / this.boardManager.scale;
    this.setRenderPos(this.x, this.y);
  }

  // Делает объект интерактивным
  private makeInteractive(obj: Container) {
    obj.eventMode = 'dynamic';
    obj.cursor = 'pointer';

    /*obj.on("pointerdown", (event: FederatedPointerEvent) => {
      if (event.button === 0) {
        if (event.shiftKey)
          this.boardManager.selectionManager.addSelectObject(this);
        else
          this.boardManager.selectionManager.selectSingleObject(this);
        console.log('awd');

        event.stopPropagation();
      }
    });

    /*obj.on("pointerup", (event: FederatedPointerEvent) => {
      if (event.button === 0)
        this.boardManager.isDragging = false;
    });*/

    /*obj.on("pointerupoutside", () => {
      //this.boardManager.selectionManager.deselectAll();
    });*/
  }

  /**
   * Удаляет объект из контейнера
   */
  removeFromContainer(): void {
    if (this.pixiObject && this.pixiObject.parent) {
      this.pixiObject.parent.removeChild(this.pixiObject);
    }
  }

  /**
   * Уничтожает объект
   */
  destroy(): void {
    if (this.pixiObject) {
      this.pixiObject.destroy();
      this.pixiObject = null;
    }
  }

  /**
   * Проверяет, содержит ли объект точку
   */
  containsPoint(x: number, y: number): boolean {
    return x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height;
  }
}