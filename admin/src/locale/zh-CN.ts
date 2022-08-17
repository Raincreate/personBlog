import localeSettings from './zh-CN/settings';
import localeMessageBox from '../components/MessageBox/locale/zh-CN';
// import localeSearchTable from '../pages/search-table/locale/zh-CN';
import login from '../pages/login/locale/zh-CN';

export default {
  'menu.list': '列表页',
  'menu.categories': '分类管理',
  'menu.articles': '文章管理',
  'menu.tags': '标签管理',
  'menu.abouts': '关于管理',
  'menu.user': '用户管理',
  'menu.comment': '评论管理',
  'menu.site': '网页配置',
  'navbar.docs': '文档中心',
  ...localeSettings,
  ...localeMessageBox,
  // ...localeSearchTable,
  ...login,
};
