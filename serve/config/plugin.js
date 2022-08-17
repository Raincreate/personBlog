'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 开启插件，跟着文档开启插件
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  // mongodb插件
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  // 返回token
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
