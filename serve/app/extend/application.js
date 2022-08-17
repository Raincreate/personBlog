const BAR = Symbol('Application#bar');

module.exports = {
  log(param) {
  // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    console.log(param);
  },
  get bar() {
    if (!this[BAR]) {
      this[BAR] =
        this.config.news.serverUrl + '?limit=' + this.config.news.limit;
    }
    return this[BAR];
  },
};
