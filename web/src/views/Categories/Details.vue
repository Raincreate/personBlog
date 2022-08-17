<template>
  <div
    class="common"
    :style="{
      background: `url(${categoriesDetailsBgImg}) 0px center no-repeat`,
      backgroundSize: 'cover',
    }"
  >
    <Header :light-index="3" background="transparent"></Header>
    <div v-show="isPC">
      <Footer fixed></Footer>
    </div>

    <div class="content">
      <mu-paper v-if="isPC" class="pc-box" :z-depth="5">
        <mu-list>
          <div class="sub-title">分类-技术(100)</div>
          <mu-list-item button>
            <mu-list-item-title class="item">
              <span class="title">文字标题 </span>
              <span>2022-7-06 16:33</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <div class="pagination">
          <mu-pagination
            :total="100"
            :current.sync="current"
            :pageSize.sync="pageSize"
          ></mu-pagination>
        </div>
      </mu-paper>
      <div v-else class="wap-box">
        <div class="sub-title">第二个</div>
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title class="item">
              <span class="title">文章标题d打了几年狄拉克就你的撒旦啦</span>
              <span>2022-7-06 16:33</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title class="item">
              <span class="title">文章标题d打了几年狄拉克就你的撒旦啦</span>
              <span>2022-7-06 16:33</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title class="item">
              <span class="title">文章标题d打了几年狄拉克就你的撒旦啦</span>
              <span>2022-7-06 16:33</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <Footer fixed></Footer>
      </div>

      <mu-button
        v-show="!isPC"
        small
        fab
        color="#fff"
        class="back-fab"
        @click="$router.go(-1)"
      >
        <mu-icon color="#ccc" value="arrow_back"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Details",
  components: {
    Header,
    Footer,
  },
  methods: {},
  data() {
    return {
      categoriesDetailsBgImg: "http://nevergiveupt.top/category.jpg",
      current: 1,
      pageSize: this.isPC ? 10 : 15,
    };
  },
};
</script>

<style scoped lang="less">
.content {
  padding-top: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>