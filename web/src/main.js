import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import { isPC } from '@/utils'
Vue.prototype.isPC = isPC  //将判断pc的方法放在全局
Vue.prototype.avatar = "https://www.baidu.com/link?url=aYXG-RWEjmtvxsfDPndRg1adeY8mOCcAYA3S1v4s77NIzSpVt3jzFb1yKr0hSB1B2HpsYLDlcMh6UBrPhdvilGGgc6YZ7YwZWAeJz9eF-vm3t3NM0Dd28WZ4KbE7TzvhBQbtJx72LZ7ONGDMU1T64-1Na-yUfofxKDBeqi0LAbWfAh3Ope_TjfCqpqIVHQ0HCt7kJIQIVfVvA0_N0joV_1omyV4-G2H-G-STWmuS6AYltD-EvnmWpFsYjDaGesCyos9epUpGYVxJTyKw0OMOjgkk0Yqv2bNasz9z84-Ovgc8yBi-Lmv_l_oWPCuNVdCJytPSSLa5cM9adlt8KEfPwJocPoty5T0R-xbVuHFJF-pGavWXqYCGcEsoP3pJocL8TSxufs1nuaJ8pha5lBRU7mqM6fAPRuFBJ4_qIYXtjvt-q8USvHu30UzMckH5s4SkDgv-xVdk3V0VhrlilSICiVmm-yzWa3HTZp-PdQQpAhG0uEGd569q4Cjjxbw0s_sec7aTxRtmyduk-XuQ4Rug2MkqXXDnSCeQaa_F_sqJBsmpvtEO6-YgTEQEK_qdcnT_rFA8isbvp_5PaKZuCGHZgRFEwOH0zQzVGzSd-SXWiwCQ90luuUom8uHSjRPH4UCWCiX7xYhX8IoJ6BuibjmbuTPqsYzRWR4ulNpNZDmq66a&wd=&eqid=a7e0408a001bd3760000000262c6c74d"

Vue.config.productionTip = false
import './global.less';
import 'lib-flexible'; //引入改变字体的插件

import 'muse-ui/lib/styles/base.less';
import {
  Button,
  Select,
  AppBar,
  Icon,
  Menu,
  List,
  Popover,
  Avatar,
  BottomSheet,
  Paper,
  Pagination,
  Card,
  Chip,
  Tooltip,
  Snackbar,
  TextField,
  Dialog,
  Divider,
  Badge,
  Form,
} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';

Vue.config.productionTip = false

// import Vant,{Lazyload} from 'vant';
// import 'vant/lib/index.css'
// Vue.use(Vant);
// Vue.use(Lazyload);
import Helpers from 'muse-ui/lib/Helpers';

Vue.use(Helpers);
Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(List);
Vue.use(Popover);
Vue.use(Avatar);
Vue.use(BottomSheet);
Vue.use(Paper);
Vue.use(Pagination);
Vue.use(Card);
Vue.use(Chip);
Vue.use(Tooltip);
Vue.use(Snackbar);
Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Badge);
Vue.use(Form);

import Toast from 'muse-ui-toast';
Vue.use(Toast, {
  position: 'top',
  time: 2000,
  closeIcon: 'close',
  close: true,
  successIcon: 'check_circle',
  infoIcon: '',
  warningIcon: 'priority_high',
  errorIcon: 'waring',
})

import * as filters from './filter';
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))  //注册过滤器

Vue.prototype.filterDate = filters.filterDate

import theme from 'muse-ui/lib/theme';
theme.add('selfDark', {
  primary: '#1976d2',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#757575',
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    alternate: '#303030',
    disabled: 'rgba(255, 255, 255, 0.3)',
    hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
  },
  divider: 'rgba(255, 255, 255, 0.3)',
  background: {
    paper: '#424242',
    chip: '#616161',
    default: '#303030'
  }
}, 'dark');

theme.add('selfLight', {
  primary: '#2196f3',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#bdbdbd',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'gba(0, 0, 0, 0.54)',
    alternate: '#fff',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    chip: '#e0e0e0',
    default: '#fafafa'
  }
}, 'light');

const hours = new Date().getHours();
let defaultTheme = ''
if (hours >= 8 && hours <= 18) {
  defaultTheme = 'selfLight';
} else {
  defaultTheme = 'selfDark';
}
const selfTheme = defaultTheme || localStorage.getItem('theme')

theme.use(selfTheme);

Vue.prototype.theme = theme;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
