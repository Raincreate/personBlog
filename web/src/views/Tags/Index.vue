<template>
<!-- 标签页 -->
  <div
    class="common"
    :style="{
      background: `url(${tagsBgImg}) center center no-repeat`,
      backgroundSize: 'cover',
    }"
  >
    <Header :light-index="4" background="transparent"></Header>
    <Footer fixed></Footer>

    <div class="content">
      <div class="tags-wap">
        <a class="tag">Vue</a>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "tags",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      tagsBgImg: "http://nevergiveupt.top/tags.jpg",
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

.tags-wraps{
  padding: 0 0.53333rem;
  width: 70%;
  .tag{
    cursor: pointer;
    margin-right: 0.53333rem;
    margin-bottom: 0.53333rem;
  }
}
</style>