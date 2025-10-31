import type { IRouterConfig } from './types';
import type { RouteObject } from 'react-router-dom';
import { AuthGuardPermission } from './AuthGuardPermission';
import { EntityLockGuard } from './EntityLockGuard';

export class RouterUtils {
  static treeRoute: IRouterConfig[] = [];

  static createRouter(
    platformRoutes: IRouterConfig[]
  ): RouteObject[] {
    // 1. Объединяем все модули
    const modules = RouterUtils.importDynamicRoutes();
    const flatRoutes = RouterUtils.flattenRoutes([...platformRoutes, ...modules]);

    // 2. Оборачиваем гвардами
    const guardedRoutes = RouterUtils.applyGuards(flatRoutes);

    // 3. Снова делаем дерево
    const tree = RouterUtils.arrayToTree(guardedRoutes, null);

    RouterUtils.treeRoute = tree; // для меню

    // 4. Конвертируем в RouteObject
    return RouterUtils.convertToRouteObject(tree);
  }

  // Превращает дерево в плоский массив
  static flattenRoutes(routes: IRouterConfig[]): IRouterConfig[] {
    const result: IRouterConfig[] = [];
    const recursive = (route: IRouterConfig) => {
      result.push(route);
      route.children?.forEach(recursive);
    };
    routes.forEach(recursive);
    return result;
  }

  // Превращает плоский массив в дерево
  static arrayToTree(
    arr: IRouterConfig[],
    parent: string | null
  ): IRouterConfig[] {
    return arr
      .filter(r => r.parent === parent)
      .map(r => ({ ...r, children: RouterUtils.arrayToTree(arr, r.name) }));
  }

  // Гварды permissions и lock
  static applyGuards(arr: IRouterConfig[]): IRouterConfig[] {
    return arr.map(r => ({
      ...r,
      element: (
        <AuthGuardPermission subject={r.permissions ?? []}>
          {r.lock ? <EntityLockGuard config={r.lock}>{r.element}</EntityLockGuard> : r.element}
        </AuthGuardPermission>
      ),
    }));
  }

  // Конвертируем в RouteObject для React Router
  static convertToRouteObject(arr: IRouterConfig[]): RouteObject[] {
    return arr.map(r => ({
      path: r.path,
      element: r.element,
      loader: r.loader,
      errorElement: r.errorElement,
      children: r.children?.length ? RouterUtils.convertToRouteObject(r.children) : undefined,
    }));
  }

  // Динамический импорт модулей (пример)
  static importDynamicRoutes(): IRouterConfig[] {
    const modules = import.meta.glob('./modules/**/route.tsx', { eager: true });
    const routes: IRouterConfig[] = [];
    for (const path in modules) {
        const mod = modules[path] as { default: IRouterConfig[] };
        routes.push(...mod.default);
    }
    return routes.flat();
  }
}
