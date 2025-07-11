/* GlobalState */
export interface GlobalState {
  token: string;
  userInfo: any;
  assemblySize: AssemblySizeType;
  language: string;
  typeAllList: Array<any>;
  themeConfig: ThemeConfigProps;
  loginConfigInfo: any;
}

/* themeConfigProp */
export interface ThemeConfigProps {
  maximize: boolean;
  layout: LayoutType;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isCollapse: boolean;
  isWeak: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  tabs: boolean;
  tabsIcon: boolean;
  footer: boolean;
}

export type AssemblySizeType = "default" | "small" | "large";

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

/* tabsMenuProps */
export interface TabsMenuProps {
  icon: string;
  title: string;
  path: string;
  name: string;
  close: boolean;
  isKeepAlive?: boolean;
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[];
}

export interface UserInfo {
  [key: string]: string;
}

/* AuthState */
export interface AuthState {
  routeName: string;
  authMenuList: Menu.MenuOptions[];
}

/* keepAliveState */
export interface keepAliveState {
  keepAliveName: string[];
}
