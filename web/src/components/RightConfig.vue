<template>
  <div class="right-config">
    <mu-card class="slider-card" :size="100">
        <mu-avatar>
            <img v-lazy="avatar" alt="">
        </mu-avatar>

        <div class="title">RainCreate</div>
        <div class="desc">前端初学者，希望能够在秋招的时候进入互联网大厂工作</div>
        <div class="tags">
            <mu-chip class="chip">node.js</mu-chip>
            <mu-chip class="chip">javascript.js</mu-chip>
            <mu-chip class="chip">React</mu-chip>
        </div>

        <div class="friend-link-box">
            <p class="friend-link-title">链接</p>
            <div class="friend-links">
                <mu-button fab small>
                    <mu-avatar>
                        <img src="" alt="">
                    </mu-avatar>
                </mu-button>

                <mu-button fab small>
                    <mu-avatar>
                        <img src="" alt="">
                    </mu-avatar>
                </mu-button>
            </div>
        </div>
    </mu-card>


  </div>
</template>

<script>
export default {
    name:'RightConfig',
}
</script>

<style scoped lang="less">
.right-config{
    width: 4rem;
}

.slider-card{
    position: relative;
    margin-top:16px ;
    text-align: center;
    padding: 16px;
    border-radius: 5px;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12); 
    .avatar {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }
  .title {
    font-size: 20px;
    color: #d5143b;
  }
  .desc {
    font-size: 14px;
    margin: 10px 0;
  }
  .tags {
    .chip {
      margin: 0 10px 10px 0;
    }
  }
  .friend-link-box {
    .friend-link-title {
      position: relative;
      &::before {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    // 链接下面的样式
    .friend-links {
      display: flex;
      justify-content: space-around;
    }
  }
}


</style>