<template>
  <div >
    <HomeAnimation />
    <Header background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="common">
        <div class="home">
            {{info.introduction}}
        </div>
    </div>

  </div>
</template>

<script>
import HomeAnimation from "@/components/HomeAnimation";
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue'

let i=0;
let timer =null ;

export default {
  name: "index",
  components: {
    HomeAnimation,
    Header,
    Footer,
  },
  data(){ //设置方法字体一个一个的出现
    return {
        info:{
            introduction:'',
            introductionTarget:'欢迎来到智伟Rain的个人博客网站'
        }
    }
  },
  mounted(){
    this.typing();
  },
  methods:{ //vue中是methods而不是method
    typing(){
        if(i<=this.info.introductionTarget.length){
            this.info.introduction=this.info.introductionTarget.slice(0,i++)+'_';
            timer =setTimeout(this.typing,100)
        }else{
            this.info.introduction =this.info.introductionTarget
            clearTimeout(timer) //清楚定时器
        }
    }
  }
};
</script>

<style scoped lang="less" >
.home{
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    font-size: 0.48rem; //rem是为了在客户端也可以显示出来
    color: #fff;
    font-weight: 500;
}

</style>