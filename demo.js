window.$translate = {
  instant(str) {
    return str;
  }
};
let arr = [
  {
    class: 0,
    key: 0,
    value: "单笔消费金额达到",
    sub: [0, 1, 2, 8, 14]
  },
  {
    class: 0,
    key: 1,
    value: "活动期间消费总金额",
    sub: [0, 1, 2, 8, 14]
  },
  {
    class: 0,
    key: 2,
    value: "活动期间消费总次数",
    sub: [0, 1, 2, 8, 14]
  },
  {
    class: 1,
    key: 3,
    value: "帖子加精",
    sub: [3, 4, 8]
  },
  {
    class: 1,
    key: 4,
    value: "帖子置顶",
    sub: [3, 4, 8]
  },
  {
    class: 2,
    key: 5,
    value: "生日",
    sub: [5, 8]
  },
  {
    class: 3,
    key: 6,
    value: "个人资料完善",
    sub: [6, 8]
  },
  {
    class: 4,
    key: 7,
    value: "激活海乐卡",
    sub: [7, 8]
  },
  {
    class: -1,
    key: 8,
    value: "手动领取",
    sub: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16]
  },
  {
    class: 5,
    key: 9,
    value: this.$translate.instant("当月升级为银海"),
    sub: [8, 9]
  },
  {
    class: 6,
    key: 10,
    value: this.$translate.instant("当月升级为金海"),
    sub: [8, 10]
  },
  {
    class: 7,
    key: 11,
    value: this.$translate.instant("当月升级为黑海"),
    sub: [8, 11]
  },
  {
    class: 8,
    key: 12,
    value: "订单评论",
    sub: [8, 12]
  },
  {
    class: 9,
    key: 13,
    value: "私人订制口味分享奖励",
    sub: [8, 13]
  },
  // 新增活动条件
  {
    class: 0,
    key: 14,
    value: "活动期间消费门店",
    sub: [0, 1, 2, 8, 14]
  },
  {
    class: 10,
    key: 15,
    value: "APP新注册会员",
    sub: [8, 16]
  },
  {
    class: 10,
    key: 16,
    value: "门店首单消费金额",
    sub: [8, 16]
  }
];
let arr_tmp = [
  {
    class: -1,
    key: 8,
    value: "手动领取",
    sub: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16]
  }
];
let arr_tmp_ = {};

function deduplicationAndSortArray(data) {
  let hash = {};
  // 去重
  let arr = data.reduceRight((item, next) => {
    hash[next.key] ? "" : (hash[next.key] = true && item.push(next));
    return item;
  }, []);

  // 排序
  return arr.sort((v1, v2) => {
    if (v1.key > v2.key) {
      return 1;
    }
    return -1;
  });
}
// 重新拼接数组
function filterData(data, index) {
  let arr = [];
  if (!Array.isArray(data)) {
    return false;
  }
  data.reduce((accumulator, currentValue) => {
    if (currentValue.class === accumulator.class || currentValue.class === -1) {
      arr.push(currentValue);
    }
    return accumulator;
  }, data[index]);
  return arr;
}

function filterArr(arr, arr_) {
  let arr__ = arr.filter(item => arr_.every(item_ => item.key !== item_.key));
  // 排序
  return arr__.sort((v1, v2) => {
    if (v1.key > v2.key) {
      return 1;
    }
    return -1;
  });
}
