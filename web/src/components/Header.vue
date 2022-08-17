<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- 昵称 -->
      <span style="cursor: pointer">Raincreate</span>
      <!-- 头像 -->
      <mu-avatar slot="left" :size="50" class="header-avatar">
        <img src="http://www.nevergiveupt.top/user_avatar.png" />
      </mu-avatar>

      <mu-button
        flat
        @click="go(item)"
        v-show="isPC"
        slot="right"
        v-for="(item, index) in info.menu"
        :key="item.name"
        :color="lightIndex === index ? '#00e676' : ''"
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}
      </mu-button>

      <!-- 移动端端看到的菜单 -->
      <mu-button slot="left" icon v-show="!isPC" @click="toogleMobleMenu(true)">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <mu-bottom-sheet :open.sync="openMobleMenu">
        <mu-list @item-click="toogleMobleMenu(false)">
          <mu-list-item
            button
            v-for="(item, index) in info.menu"
            :key="item.name"
            @click="go(item)"
          >
            <mu-list-item-action>
              <mu-icon
                :value="item.icon"
                :color="lightIndex === index ? '#00e676' : ''"
              ></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title
              :style="{ color: lightIndex === index ? '#00e676' : '' }"
              >{{ item.name }}</mu-list-item-title
            >
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

      <!-- 头部导航栏的主题切换 -->
      <mu-button flat ref="button" slot="right" @click="openTheme = !openTheme">
        <mu-icon value="color_lens"></mu-icon>
      </mu-button>
      <mu-popover :open.sync="openTheme" :trigger="triggerTheme">
        <mu-list>
          <mu-list-item button @click="toogleTheme('selfLight')">
            <mu-list-item-title>
              <mu-icon
                :color="item === 'selfLight' ? 'primary' : ''"
                value="brightness_7"
              ></mu-icon>
            </mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="toogleTheme('selfDark')">
            <mu-list-item-title>
              <mu-icon
                :color="item === 'selfDark' ? 'primary' : ''"
                value="brightness_4"
              ></mu-icon>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>

      <!-- 用户 -->
      <mu-button
        flat
        ref="buttonUser"
        slot="right"
        @click="openUser = !openUser"
      >
        <div class="User">
          <span>小接口decadasdadad</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="triggerUser">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>

    <!-- 登录注册弹窗 -->
    <div class="tool" v-if="isShowAction">
      <div class="tool-row" v-if="info.login">
        <mu-slide-left-transition>
          <mu-button
            v-show="showToBtn"
            color="primary"
            @click="
              openLoginModal = true;
              showToBtn = false;
            "
            fab
            >登录</mu-button
          >
        </mu-slide-left-transition>
      </div>

      <div class="tool-row">
        <mu-tooltip placeholder="right-start" content="登录/搜索/注册">
          <mu-button
            @click="showToBtn = !showToBtn"
            color="info"
            fab
            class="search-fab"
          >
            <mu-icon value="adb"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-slide-left-transition>
          <mu-button
            v-show="showToBtn && info.searchBtn"
            color="error"
            fab
            @click="handleSearch"
            >搜索</mu-button
          >
        </mu-slide-left-transition>
      </div>

      <div class="tool-row" v-if="info.register">
        <mu-slide-left-transition>
          <mu-button
            @click="
              openRegisterModal = true;
              showToBtn = false;
            "
            v-show="showToBtn"
            color="warning"
            fab
            >注册</mu-button
          >
        </mu-slide-left-transition>
      </div>
    </div>

    <!-- 注册组件 -->
    <RegisterForm
      :open="openRegisterModal"
      @toggle="toggleRegisterModal"
    ></RegisterForm>

    <!-- 登录组件 -->
    <LoginForm :open="openLoginModal" @toggle="toggleLoginModal"></LoginForm>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "./LoginForm.vue";

const menus = [
  //遍历数组
  {
    name: "首页",
    router: "index",
    icon: "home",
  },
  {
    name: "文章",
    router: "articles",
    icon: "note_add",
  },
  {
    name: "归档",
    router: "archives",
    icon: "drafts",
  },
  {
    name: "分类",
    router: "categories",
    icon: "dns",
  },
  {
    name: "标签",
    router: "tags",
    icon: "loyalty",
  },
  {
    name: "关于",
    router: "about",
    icon: "perm_identity",
  },
];
export default {
  components: {
    RegisterForm,
    LoginForm,
  },
  props: {
    lightIndex: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
    },
  },
  data() {
    return {
      info: {
        menu: menus,
        login: true,
        register: true,
        searchBtn: true,
      },
      openTheme: false, //控制灯光下拉列表
      openUser: false, //控制个人中心等列表
      openMobleMenu: false, //控制移动端列表
      triggerTheme: null, //
      triggerUser: null, //

      showToBtn: false, //控制登录注册的表单
      isShowAction: true, //是否显示操作按钮
      openRegisterModal: false,
      openLoginModal: false,
      item: "",
      // user:JSON.parse(localStorage.getItem('user'))
    };
  },
  mounted() {
    this.triggerTheme = this.$refs.button.$el; //选择tragger的值
    this.triggerUser = this.$refs.buttonUser.$el;
    window.onscroll = () => {
      if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
    };

    const hours = new Date().getHours();
    let defaultTheme = "";
    if (hours >= 8 && hours <= 18) {
      defaultTheme = "selfLight";
    } else {
      defaultTheme = "selfDark";
    }
    this.item = defaultTheme || localStorage.getItem("theme");
  },
  methods: {
    toggleRegisterModal(bool) {
      this.openRegisterModal = bool;
    },
    toggleLoginModal(bool) {
      this.openLoginModal = bool;
    },
    go(item) {
      // console.log(this.$route);
      if (this.$route.name === item.router) {
        return;
      }
      this.$router.push({
        name: item.router,
      });
    },
    handleSearch() {},
    toogleTheme(item) {
      this.theme.use(item);
      this.item = item;
      localStorage.setItem("theme", item);
      this.openTheme = false;
    },
  },
  computed: {
    // isShowAction() {
    //   return !(
    //     !this.info.searchBtn &&
    //     !this.info.register &&
    //     !this.info.login
    //   );
    // },
  },
};
</script>

<style lang='less' scoped>
.header {
  position: fixed;
  z-index: 1501; /* //因为框架的值是1500 */
  width: 100%;
  top: 0;
}
.header-avatar {
  margin-left: 20px;
  cursor: pointer;
}
.User {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: block;
    width: 60px;
    overflow: hidden; //超出部分隐藏
    text-overflow: ellipsis; //显示三个点功能
    white-space: nowrap;
    text-align: right;
  }
}

.tool {
  position: fixed;
  left: 0;
  bottom: 2.7rem;
  .tool-row {
    margin-top: 20px;
    height: 56px;
    .search-fab {
      margin-left: -28px;
      margin-right: 20px;
    }
  }
}
</style>