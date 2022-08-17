<template>
  <div class="details">
    <Header :light-index="1"></Header>

    <!-- 文章的内容 -->
    <div class="toc-fixed" v-if="isPC">
      <mu-card class="card">
        <div class="toc">
          <div class="title">文章目录</div>
          <!-- 遍历目录 -->
          <div v-for="item in toc" :key="item.name">
            <a @click="scrollTo(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </mu-card>

      <!-- 点赞等形式 -->
      <div class="action" :class="toc.length > 0 ? '' : 'noMulu'">
        <mu-tooltip placement="top" content="点赞">
          <mu-button fab color="primary">
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip placement="top" content="收藏">
          <mu-button fab color="purple500">
            <mu-icon value="grade"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip placement="top" content="评论">
          <mu-button @click="scrollTo('#comment')" fab color="red">
            <mu-icon value="chat"></mu-icon>
          </mu-button>
        </mu-tooltip>
      </div>
    </div>

    <div class="content">
      <div v-if="isPC" class="right">
        <RightConfig></RightConfig>
      </div>

      <div class="left" :style="{ marginTop: isPC ? '20px' : 0 }">
        <div class="left-box" :style="{ width: isPC ? '70%' : '100%' }">
          <mu-card class="card">
            <!-- 封面标题头 -->
            <mu-card-title
              :title="info.title"
              :sub-title="info.introduction"
            ></mu-card-title>
            <!-- 封面文章内容 -->
            <mu-card-media>
              <img v-lazy="info.cover" style="height: 100%" alt="" />
            </mu-card-media>
            <!-- 封面底部标签 -->
            <mu-card-actions class="sub-title">
              <mu-button class="cursor-default" flat color="warning"
                >字数（150）</mu-button
              >
              <mu-button class="cursor-default" flat color="secondary"
                >评论数（36）</mu-button
              >
              <mu-button class="cursor-default" flat color="info"
                >字数（150）</mu-button
              >
              <mu-button class="cursor-default" flat color="error"
                >字数（150）</mu-button
              >
              <mu-button class="cursor-default" flat color="primary"
                >字数（150）</mu-button
              >
              <mu-button class="cursor-default" flat color="#9e9e9e"
                >字数（150）</mu-button
              >
            </mu-card-actions>

            <!-- 编辑器，这个是引用的mavonEditor，在git上可以搜索到他的用法,因为这个是显示的，所以需要隐藏他的编辑栏 -->
            <mavonEditor
              v-model="content"
              defaultOpen="preview"
              :toolbarsFlag="false"
              :subfield="false"
              :navigation="isPC"
            >
            </mavonEditor>

            <!-- 这是底部的标签分类 -->
            <mu-card-actions>
              <mu-button class="cursor-default" flat color="primary">
                <mu-icon left value="dns"></mu-icon> 分类
              </mu-button>

              <mu-button class="cursor-default" flat color="">
                <mu-icon left value="loyalty"></mu-icon> 分类
              </mu-button>

              <mu-button class="cursor-default" flat color="">
                <mu-icon left value="loyalty"></mu-icon> 分类
              </mu-button>
            </mu-card-actions>
          </mu-card>

          <div class="action-list">
            <mu-tooltip placement="top" content="点赞">
              <mu-button fab color="primary">
                <mu-icon value="thumb_up"></mu-icon>
              </mu-button>
            </mu-tooltip>

            <mu-tooltip content="收藏">
              <mu-button fab color="purple500">
                <mu-icon value="grade"></mu-icon>
              </mu-button>
            </mu-tooltip>
          </div>

          <!-- 底部评论的功能 -->
          <mu-card id="comment" class="card">
            <Comment @comment="comment"></Comment>
          </mu-card>

          <!-- 底部评论的详情页面 -->
          <mu-card v-if="commentList.length > 0" class="card">
            <mu-card-title title="评论(3)"></mu-card-title>

            <mu-divider></mu-divider>

            <!-- 评论列表组件 -->
            <CommentList
              :list="commentList"
              :articleId="info._id"
              :articleTitle="info.title"
            ></CommentList>
          </mu-card>

          <!-- 最下方组件地址 -->
          <!-- <prev-next :prev="prev" :next="next" ></prev-next> -->
          <PrevNext :prev="prev" :next="next" ></PrevNext>
        </div>
      </div>
    </div>

    <!-- <Footer fixed></Footer> -->
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
// import Footer from "@/components/Footer.vue";
import RightConfig from "@/components/RightConfig.vue";
import Comment from "@/components/Comment.vue";
import CommentList from "@/components/CommentList.vue";
import PrevNext from "@/components/PrevNext.vue";
import $ from "jquery";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "articlesDetails",
  components: {
    Header,
    // Footer,
    RightConfig,
    mavonEditor,
    Comment,
    CommentList,
    PrevNext,
  },
  data() {
    return {
      info: {
        _id:1,
        title: "文章的详情页",
        introduction: "这个是文章的主要的描述",
        cover: "",
      },
      toc: [],
      content:
        "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。弹出通知，toast，被动弹出，snackbar，桌面通知，通知气泡或简单通知这些术语全部指的是向用户传达某些事件而不强迫用户立即对此通知做出反应的图形控件元素，这与以前不同。常规弹出窗口。桌面通知通常会在很短的时间后自动消失。然后，他们的内容通常存储在某个小部件中，使用户可以在更方便的时间访问过去的通知。弹出通知，toast，被动弹出，snackbar，桌面通知，通知气泡或简单通知这些术语全部指的是向用户传达某些事件而不强迫用户立即对此通知做出反应的图形控件元素，这与以前不同。常规弹出窗口。桌面通知通常会在很短的时间后自动消失。然后，他们的内容通常存储在某个小部件中，使用户可以在更方便的时间访问过去的通知。弹出通知，toast，被动弹出，snackbar，桌面通知，通知气泡或简单通知这些术语全部指的是向用户传达某些事件而不强迫用户立即对此通知做出反应的图形控件元素，这与以前不同。常规弹出窗口。桌面通知通常会在很短的时间后自动消失。然后，他们的内容通常存储在某个小部件中，使用户可以在更方便的时间访问过去的通知。弹出通知，toast，被动弹出，snackbar，桌面通知，通知气泡或简单通知这些术语全部指的是向用户传达某些事件而不强迫用户立即对此通知做出反应的图形控件元素，这与以前不同。常规弹出窗口。桌面通知通常会在很短的时间后自动消失。然后，他们的内容通常存储在某个小部件中，使用户可以在更方便的时间访问过去的通知。弹出通知，toast，被动弹出，snackbar，桌面通知，通知气泡或简单通知这些术语全部指的是向用户传达某些事件而不强迫用户立即对此通知做出反应的图形控件元素，这与以前不同。常规弹出窗口。桌面通知通常会在很短的时间后自动消失。然后，他们的内容通常存储在某个小部件中，使用户可以在更方便的时间访问过去的通知。\n### 1.安装\n### 2.使用 \n ```js \n console.log(123); \n```",
      commentList: [
        {
          targetReplayId: "6084ce48e268db458626591a",
          targetReplayContent: "good",
          currentReplayContent: "这篇文章写得不错",
          commentTime: 1623048202,
          auditTime: 0,
          auditStatus: "3",
          _id: "60bdc00ac4b76ef12cd151aa",
          avatar: "http://www.nevergiveupt.top/user_avatar.png",
          email: "13412345678@163.com",
          nickName: "Never",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
        {
          targetReplayId: "",
          targetReplayContent: "",
          currentReplayContent: "good",
          commentTime: 1619316296,
          auditTime: 1619316309,
          auditStatus: "1",
          _id: "6084ce48e268db458626591a",
          avatar:
            "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
          email: "1916579055@qq.com",
          nickName: "永不放弃",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
        {
          targetReplayId: "",
          targetReplayContent: "",
          currentReplayContent: "好，不错",
          commentTime: 1611745373,
          auditTime: 1612108800,
          auditStatus: "1",
          _id: "6011485dc4ae0128013d3246",
          avatar:
            "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
          email: "1916579055@qq.com",
          nickName: "永不放弃",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
      ],
      prev: {
        categories: "技术",
        collect: 0,
        comment: 0,
        content:
          "### 1.toRefs↵把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref↵↵`应用`: ",
        cover: "http://nevergiveupt.top/vue/vue_composition_api.jpeg",
        createTime: 1611739740,
        introduction:
          "toRefs把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。",
        isCollect: true,
        isComment: true,
        isLike: true,
        isReward: false,
        like: 0,
        publishStatus: 1,
        sort: 0,
        status: 1,
        tags: ["Vue"],
        title: "Vue3.x-toRefs & shallowReactive & shallowRef & shallowReadonly",
        updateTime: 1611739813,
        views: 5,
        _id: "6011325cc4ae0128013d3210",
      },
      next: {
        categories: "技术",
        collect: 0,
        comment: 0,
        content:
          "### 1.注册GitHub账号并创建一个OAuth Apps↵↵登录GitHub账号然后右上角找到你的头像点击",
        cover: "http://nevergiveupt.top/egg/github_signin.png",
        createTime: 1612341189,
        introduction:
          "『登录鉴权』 是一个常见的业务场景，包括『账号密码登录方式』和『第三方统一登录』。其中，后者我们经常使用到，如 Google， GitHub，QQ 统一登录，它们都是基于 OAuth 规范。",
        isCollect: true,
        isComment: true,
        isLike: true,
        isReward: true,
        like: 1,
        publishStatus: 1,
        sort: 0,
        status: 1,
        tags: ["Node.js", "Egg"],
        title: "使用Egg通过GitHub来实现用户登录",
        updateTime: 1612341807,
        views: 6,
        _id: "601a5fc5e268db458626523d",
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log("$:", $);
      const aArr = $(
        ".v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content a"
      ).toArray();
      let toc = [];
      aArr.forEach((item) => {
        let href = $(item).attr("id");
        let name = $(item).parent().text();
        if (href) {
          // 这里判断是因为我们只需要有id的内容，没有id的则过滤掉。
          toc.push({
            href: "#" + href,
            name,
          });
        }
      });
      this.toc = toc;
      
    })
    this.commentList =this.listToTree(this.commentList)
  },
  methods: {
    // 滚动函数
    scrollTo(id) {
      var position = $(id).offset();
      position.top = position.top - 80;
      $("html,body").animate({ scrollTop: position.top }, 500);
    },
    comment(data){
      console.log('data:',data);
    },
    listToTree(list){
      let info = list.reduce(
        (map, node) => ((map[node._id] = node), (node.children = []), map),
        {}
      );
      return list.filter((node) => {
        info[node.targetReplayId] &&
          info[node.targetReplayId].children.push(node);
        return !node.targetReplayId;
      });
    }
  },
};
</script>

<style scoped lang="less">
.details {
  padding-top: 64px;
}
.content {
  padding-bottom: 0.53333rem;
  display: flex;
  .left {
    flex: 9;
    margin-top: 20px;
    .card {
      border-radius: 5px;
      margin-bottom: 0.48rem;
      // 封面使用了盒子布局
      .sub-title {
        display: flex;
      }
    }
  }
  .right {
    flex: 3;
    display: flex;
    justify-content: center; //中间
  }
}

// 文章目录右边对齐
.toc-fixed {
  position: fixed;
  width: 20%;
  right: 20px;
  top: 80px;
  .toc {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    word-break: break-all;
    padding: 0.2rem 0 0.2rem 0.2rem;
    .title {
      font-size: 0.4rem;
      margin-bottom: 10px;
    }
    a {
      display: inline-block;
      color: #2196f3;
      font-size: 0.3rem;
      cursor: pointer;
      padding: 5px 0;
      &:hover {
        color: rgb(133, 232, 21);
      }
    }
  }
  // 点赞等按钮的样式
  .action {
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-around; //自动的间距
  }
}
.action-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.42667rem 0;
}
// 垂直按钮了
.noMulu {
  flex-direction: column;
  align-items: center;
  height: 400px;
}
.v-note-navigation-content.scroll-style {
  display: none;
}
</style>