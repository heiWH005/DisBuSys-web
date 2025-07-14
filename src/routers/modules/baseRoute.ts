const homeRoute = [
  {
    path: "/home/index",
    name: "home",
    component: "/home/index",
    meta: {
      icon: "HomeFilled",
      title: "首页",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: true,
      isKeepAlive: true
    }
  }
];

const userRoute = [
  {
    path: "/user/index",
    name: "user",
    component: "/user/index",
    meta: {
      icon: "UserFilled",
      title: "用户管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    }
  }
];
const goodsRoute = [
  {
    path: "/goods/index",
    name: "goods",
    component: "/goods/index",
    meta: {
      icon: "GoodsFilled",
      title: "商品列表",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    }
  }
];
const orderRoute = [
  {
    path: "/order/index",
    name: "order",
    component: "/order/index",
    meta: {
      icon: "Notebook",
      title: "订单管理",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    }
  }
];
const splitAccountRoute = [
  {
    path: "/splitAccount/index",
    name: "splitAccount",
    component: "/splitAccount/index",
    meta: {
      icon: "Reading",
      title: "分账列表",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    }
  }
];
const withdrawalReviewRoute = [
  {
    path: "/withdrawalReview/index",
    name: "withdrawalReview",
    component: "/withdrawalReview/index",
    meta: {
      icon: "Checked",
      title: "提现审核列表",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    }
  }
];

export default [...homeRoute, ...userRoute, ...goodsRoute, ...orderRoute, ...splitAccountRoute, ...withdrawalReviewRoute];
