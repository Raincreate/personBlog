<template>
  <div>
    <div class="comment-item">
      <mu-card class="card" :class="[classStyle, isPC ? '' : 'wrap-card']" v-for="item in list" :key="item._id">
        <mu-card-header :title="item.nickName" :sub-title="item.commentTime | filterData">
          <!-- 文档的样式，使用slot可以将头像放在最左边 -->
          <mu-avatar slot="avatar"><img :src="item.avatar" alt="" /></mu-avatar>
        </mu-card-header>

        <mu-card-text>
          <span v-if="preWho" class="who">@{{ preWho }}</span>
          {{ item.currentReplayContent }}
          <mu-badge v-if="item.auditStatus === 3" content="未审核" color="#ccc"></mu-badge>
        </mu-card-text>

        <mu-card-actions v-if="user && user.nickName !== item.nickName && user.email !== item.email">
          <mu-button small color="primary" @click="replay()">回复</mu-button>
        </mu-card-actions>

        <!-- 调用自身，递归组件 -->
        <div v-if="item.children">
          <comment-list :list="item.children" :articleId="articleId" :articleTitle="articleTitle"
            :preWho="item.nickName" classStyle="sub-card">
          </comment-list>
        </div>
      </mu-card>

    </div>

    <!-- 弹窗 -->
    <mu-dialog :title="modalTitle" width="600" max-width="80%" :open.sync="open" :overlay-close="false">
      <mu-text-field v-modal="replayContent" placeholder="请回复..." multi-line :row="5" full-width></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="close">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="ok">确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: "commentList",
  props: {
    list: {
      type: Array
    },
    articleId: {
      type: String
    },
    articleTitle: {
      type: String,
      default: ''
    },
    classStyle: {
      type: String,
      default: ''
    },
    preWho: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      good: "hello world",
      open: false,
      modalTitle: '',
      replayContent: '',
      user: JSON.parse(localStorage.getItem('user'))
    };
  },
  methods: {
    replay(item) {
      if (!this.user) {
        this.$toast.info('登录才能回复')
        // alert('请登录再回复')
        return
      } else {
        this.open = true
        this.modalTitle = `回复 @ ${item.nickName}`
      }
    },
    close() {
      this.open = false
      this.replayContent = ''
    },
    ok() {
      if (!this.replayContent) {
        this.$toast.info('请输入回复内容')
        return;
      }
    }
  }
};
</script>

<style scoped lang='less'>
.comment-item {
  padding-bottom: 0.5rem;

  /deep/ .mu-card-text {
    padding-top: 0;

    .who {
      color: red;
    }
  }
}

.card {
  margin: 0.4rem 1.1rem 0 1.1rem;
  padding-bottom: 0.4rem;
  box-shadow: none;
  border-radius: 0;
}

.wrap-card {
  margin: 4px 10px 0 10px;
}

.sub-card {
  border-left: 1px dashed green;
  border-bottom: 1px dashed green;
  box-shadow: none;
  border-radius: 0;
}
</style>