/* eslint valid-jsdoc: "off" */

'use strict';
const userConfig = require('./config.userConfig');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1658373275492_9633';

  // add your middleware config here
  config.middleware = ['errorHandler','auth'];

  config.auth = {
    whiteList: [userConfig.userName],
  };

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // csrf安全关闭
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // session key 的配置
  config.session = {
    key: 'BLOG_EGG_SESSION_KEY',
    encrypt: false,
  };

  // 配置mongodb的配置项
  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {},
  };

  // 配置
  config.jwt = {
    secret: userConfig.userName,
  };

  return {
    ...config,
    ...userConfig,
  };
};
