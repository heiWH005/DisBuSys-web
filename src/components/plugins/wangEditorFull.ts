import { IButtonMenu, IDomEditor } from "@wangeditor/editor";

class MyButtonMenu implements IButtonMenu {
  title: string;
  tag: string;
  constructor() {
    this.title = "全屏";
    this.tag = "button";
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor: IDomEditor): string | boolean {
    return null;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor: IDomEditor): boolean {
    return false;
  }

  isDisabled(editor: IDomEditor): boolean {
    return false;
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string) {
    let config = editor.getMenuConfig("myFullScreen");
    if (config.toggleFull && config.toggleFull instanceof Function) {
      config.toggleFull();
    }
  }
}

export default MyButtonMenu;
