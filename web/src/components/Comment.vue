<template>
  <div class="clearflex">
    <mu-card-text></mu-card-text>
    <mu-text-field placeholder="说点什么..." v-model="content" multi-line :row="4" full-width class="comment-input"></mu-text-field>
    <mu-button class="comment-btn" color="primary" @click="openAlertFunc">评论</mu-button>

    <!-- 关闭点击弹窗外关闭弹窗功能 :overlay-close="false" -->
    <mu-dialog title="提示信息" width="600" :open.sync="openAlert" :overlay-close="false"> 
      评论内容需要审核，大约需要2小时
    <mu-button slot="actions" flat color="primary" @click="closeAlert">取消</mu-button>
    <mu-button slot="actions" flat color="primary" @click="ok()">确定</mu-button>
  </mu-dialog>

  </div>
</template>

<script>
export default {
  name:"Comment",
  data(){
    return {
      content:'',
      openAlert:false,
    }
  },
  methods:{
    openAlertFunc(){
      if(this.content){
        this.openAlert = true
      }else{
        // this.$toast.info('请输入评论内容')
        alert('请输入评论内容')
      }
    },
    closeAlert(){
      this.openAlert = false
      // this.content=''  //取消的时候不需要将内容初始化为空
    },
    ok(){
      this.$emit('comment',{
        content:this.content,
      })
      this.openAlert = false
      this.content=''
    }
  }
}
</script>

<style scoped lang="less">
.conment-input{
  padding: 0 0.4rem;
}
.comment-btn{
  float: right;
  margin: 0 0.4rem 0.4rem 0;
}
</style>