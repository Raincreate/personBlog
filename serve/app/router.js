'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // 定义一个公共路径
  const baseRouter = app.config.baseRouter;

  router.resources(
    'articles',
    baseRouter + '/articles',
    jwt,
    controller.articles
  ) // 文章

  router.resources(
    "categories",
    baseRouter + "/categories",
    jwt,
    controller.categories
  ); // 分类

  router.resources(
    'about',
    baseRouter + '/about',
    jwt,
    controller.about
  ); // 关于管理

  router.resources(
    "tags",
    baseRouter + "/tags",
    jwt,
    controller.tags
  ); // 标签管理

  router.resources(
    "user",
    baseRouter + "/user",
    jwt,
    controller.user
  ); // 用户管理

  router.resources(
    "comment",
    baseRouter + "/comment",
    jwt,
    controller.comment
  ); // 评论管理

  router.resources(
    'home',
    baseRouter + '/config/home',
    jwt,
    controller.config.home
  ) // 网页配置-首页配置

  router.resources(
    'hf',
    baseRouter + '/config/hf',
    jwt,
    controller.config.hf
  ) // 网页配置-Header/Footer配置

  router.post(
    baseRouter + '/admin/login',
    controller.admin.adminLogin
  ); // 登录接口

  router.post(
    baseRouter + '/admin/logout',
    controller.admin.adminLogout
  ); // 退出



  // 标签状态
  router.put(
    baseRouter + "/tags/status/:id",
    jwt,
    controller.tags.updateStatus
  );

  // 文章状态
  router.put(
    baseRouter + '/articles/status/:id',
    jwt,
    controller.articles.changeStatus
  )

  // 文章发布
  router.put(
    baseRouter + '/articles/publishStatus/:id',
    jwt,
    controller.articles.changePublishStatus
  )

  router.post(
    baseRouter + "/articles/collectStatus",
    jwt,
    controller.articles.changeCollectStatus
  ); // 一键开启或关闭收藏

  // // 查
  // router.get('/admin/list', controller.admin.list);
  // // 删
  // router.delete('/admin/remove/:id', controller.admin.remove);
  // // 修改
  // router.post('/admin/updateData/:id', controller.admin.updateData);
};

// model -> router -> controller -> service -> model
