<template>
  <div class="articles">
    <Header :light-index="1"></Header>
    <div class="content">

      <div v-if="isPC" class="right">
        <RightConfig></RightConfig>
      </div>

      <div :class="[{'wap-left':!isPC},'left']">
        <!-- :class动态绑定class的名称，这样做是为了能够分出移动端和PC端的区别 -->
        <mu-card class="card" v-for="item in info.list" :key="item.id">

          <div v-if="isPC" class="cover">
            <img v-lazy="item.cover" class="cover-img" />
          </div>

          <div class="card-box" @click="goDetails(item)">
            <div class="title">{{item.title}}</div>
            <mu-card-actions class="sub-title">
              <mu-button class="cursor-default" flat color="info"
                >查看({{item.views}})</mu-button
              >

              <mu-button class="cursor-default" flat color="error"
                >评论({{item.comment}})</mu-button
              >
              <mu-button class="cursor-default" flat color="primary"
                >点赞({{item.like}})</mu-button
              >
              <mu-button class="cursor-default" flat color="#9e9e9e"
                >{{item.createTime}}</mu-button
              >

              <!-- 简介 -->
              <mu-card-text class="text"
                >{{item.introduction}}</mu-card-text
              >
            </mu-card-actions>
            <mu-card-actions>
              <mu-button class="cursor-default chip" flat color="primary">
                <mu-icon left value="dns"></mu-icon>{{item.categories}}
              </mu-button>

                <!-- 循环得到底部的标签 -->
              <mu-button v-for="sub in item.tags" :key="sub" class="cursor-default chip" flat>
                <mu-icon left value="loyalty"></mu-icon>{{sub}}
              </mu-button>

            </mu-card-actions>
          </div>
        </mu-card>
      </div>
    </div>

    <div v-if="info.totalCount > pageSize" class="pagination">
        <mu-pagination :total="info.totalCount" :current.sync="page" :pageSize.sync="pageSize" :pageCount="5"></mu-pagination>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import RightConfig from '@/components/RightConfig.vue'

export default {
  name: "articles",
  components: {
    Header,
    Footer,
    RightConfig,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      info: {
        page: 1,
        pageSize: 10,
        totalCount: 50,
        list: [
          {
            categories: "技术",
            collect: 0,
            comment: 0,
            content: "123",
            cover: "http://nevergiveupt.top/canvas/html2canvas.png",
            createTime: 1612403820,
            introduction:
              "有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。",
            isCollect: true,
            isComment: true,
            isLike: true,
            isReward: false,
            like: 0,
            publishStatus: 1,
            sort: 0,
            status: 1,
            tags: ["Canvas", "Pdf.js"],
            title: "这是第一个假的数据形式，没有使用后端传递参数的形式，主要是假数据",
            updateTime: 1612416421,
            views: 9,
            _id: "1",
          },
          {
            categories: "生活",
            collect: 0,
            comment: 0,
            content: "123",
            cover: "http://nevergiveupt.top/canvas/html2canvas.png",
            createTime: 1612403820,
            introduction:
              "有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。",
            isCollect: true,
            isComment: true,
            isLike: true,
            isReward: false,
            like: 0,
            publishStatus: 1,
            sort: 0,
            status: 1,
            tags: ["Canvas", "Pdf.js"],
            title: "使用jspdf+canvas2html将网页保存为pdf文件",
            updateTime: 1612416421,
            views: 9,
            _id: "2",
          },
        ],
      },
    };
  },
  methods:{
    goDetails(item){
      console.log('aaaa:',item);
      this.$router.push({
        name:'articlesDetails',
        query:{
          id:item._id
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.articles {
  padding-top: 64px;
  .content {
    padding-bottom: 0.53333rem;
    display: flex;
    .left {
      flex: 9; //扩展到全屏
      &.wap-left {
        .card {
          float: none;
          width: 90%;
        }
      }
      .card {
        width: 80%;
        float: left;
        margin: 0.42667rem auto 0;
        display: flex;
        flex-wrap: wrap;
        border-radius: 6px;
        &:hover {
          animation: pulse 1s;
        }
        .card-box {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .title {
          padding: 0.42667rem 0.42667rem 0 0.42667rem;
          font-size: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; //这个是几行之后隐藏，1就表示一行就隐藏
          cursor: pointer;
        }
        .sub-title {
          // display: flex;
          flex-wrap: wrap;
        }
        .text {
          padding: 0 0.42667rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; //这个是几行之后隐藏，3就表示3行就隐藏
        }

        .chip {
          margin-right: 0.2rem;
        }

        .cover {
          flex: 1;
          border-radius: 0;
          padding: 0.43rem;
          .cover-img {
            object-fit: cover;
            width: 100%;
            height: 4.3rem;
            vertical-align: middle; //垂直居中
          }
        }
      }
    }

    .right {
      flex: 3;
      display: flex;
      justify-content: center;
    }
  }
}

.pagination{
    margin: 0.5333rem 0;//距离上方的距离
    display: flex; //盒子布局
    justify-content: center; //水平居中
}
</style>