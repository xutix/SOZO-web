export const pages = {
  home: { file: "index.html", label: "首页" },
  products: { file: "products.html", label: "产品" },
  dock: { file: "dock.html", label: "SOZO Dock" },
  fpv: { file: "fpv.html", label: "FPV" },
  cases: { file: "cases.html", label: "服务" },
  gallery: { file: "gallery.html", label: "项目现场" },
  support: { file: "support.html", label: "支持" },
  about: { file: "about.html", label: "关于" },
  contact: { file: "contact.html", label: "联系合作" },
};

export const primaryNav = ["home", "products", "fpv", "cases", "support", "about"];

export const navActiveGroups = {
  products: ["products", "dock"],
  fpv: ["fpv"],
  cases: ["cases"],
  about: ["about", "gallery"],
};

export const productMenu = {
  eyebrow: "探索产品",
  items: [
    { label: "SOZO Dock", file: "dock.html" },
    { label: "模块化电烙铁", file: "products.html#modular-soldering" },
    { label: "模块化充电宝", file: "products.html#modular-power" },
    { label: "产品总览", file: "products.html" },
  ],
};

export const futureProductSupport = [
  { key: "manual", label: "用户手册", file: "manual.html", visibleInNav: false },
  { key: "downloads", label: "软件下载", file: "downloads.html", visibleInNav: false },
  { key: "updates", label: "更新日志", file: "updates.html", visibleInNav: false },
];
