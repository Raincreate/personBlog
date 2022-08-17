import localeSettings from './en-US/settings';
import localeMessageBox from '../components/MessageBox/locale/en-US';
// import localeSearchTable from '../pages/search-table/locale/en-US';
import login from '../pages/login/locale/en-US';

export default {
  'menu.list': 'List',
  'navbar.docs': 'Docs',
  'menu.categories': 'categories',
  'menu.articles': 'articles',
  'menu.tags': 'tags',
  'menu.abouts': 'abouts',
  'menu.user': 'user',
  'menu.comment': 'comment',
  'menu.site': 'site',
  ...localeSettings,
  ...localeMessageBox,
  // ...localeSearchTable,
  ...login,
};
