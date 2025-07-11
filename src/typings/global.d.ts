// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name?: string;
    component?: string | (() => Promise<any>);
    redirect?: string;
    meta?: MetaProps;
    children?: MenuOptions[];
    auth_level?: number;
    hidden?: boolean;
  }
  interface MetaProps {
    icon?: string;
    title?: string;
    activeMenu?: string;
    isLink?: string;
    isHide?: boolean;
    isFull?: boolean;
    isAffix?: boolean;
    isKeepAlive?: boolean;
  }
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
  VITE_API_URL: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_GLOB_APP_TITLE: string;
  VITE_DROP_CONSOLE: boolean;
  VITE_PROXY_URL: string;
  VITE_BUILD_GZIP: boolean;
  VITE_REPORT: boolean;
}
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
declare type Nullable<T> = T | null;
declare type PropType<T> = VuePropType<T>;

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};
