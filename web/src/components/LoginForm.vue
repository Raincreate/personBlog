<template>
  <div>
    <mu-dialog
      scrollable
      title="登录"
      width="550"
      max-width="90%"
      :esc-press-colse="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="邮箱(必填)" prop="email" :rules="emailRules">
          <mu-text-field
            v-model.trim="validateForm.email"
            prop="email"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码(必填)" prop="password" :rules="passwordRules">
          <mu-text-field 
            v-model.trim="validateForm.password"
            prop="password"
            :action-icon="visibility ? 'visibility_off' : 'visibility'" 
            :action-click="() => (visibility = !visibility)" 
            :type="visibility ? 'text' : 'password'"
        ></mu-text-field><br/>
        </mu-form-item>

        <mu-form-item label="验证码" prop="captcha" :rules="captchaRules">
          <mu-text-field
            v-model.trim="validateForm.captcha"
            prop="captcha"
          ></mu-text-field>
        </mu-form-item>
      </mu-form>

      <mu-button slot="actions" flat>
        <mu-avatar :size="30" style="margin-right: 10px">
          <img :src="Icon.github" alt="" />
        </mu-avatar>GitHub
      </mu-button>

      <mu-button slot="actions" small flat @click="clear">取消</mu-button>
      <mu-button slot="actions" small flat color="primary" @click="submit">登录</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { Icon } from "@/utils";
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Icon,
      captcha: "",
      visibility: false,
      
      passwordRules: [
        { validate: (val) => !!val, message: "必须填写密码" },
        {
          validate: (val) => {
            let reg = /^[a-zA-Z]\w{5,19}$/;
            return reg.test(val);
          },
          message: "以字母开头，长度在6~20之间，只能包含字母、数字和下划线！ ",
        },
      ],
      emailRules: [
        { validate: (val) => !!val, message: "必须填写邮箱" },
        { validate: (val) => val.length >= 6, message: "邮箱长度必须大于6" },
      ],
      captchaRules: [{ validate: (val) => !!val, message: "验证码不能为空" }],
      validateForm: {
        email: "",
        password: "",
        captcha: "",
      },
    };
  },
  methods:{
    async getCaptcha() {
      const res = await this.$axios.get("/captcha");
      if (res) {
        this.captcha = res.data;
      }
    }, 
    clear(){
        this.$refs.form.clear();
        this.validateForm={
            email:'',
            password:'',
            captcha:'',
        }
        this.$emit("toogle",false)
    },
    submit(){
        this.$refs.form.validate().then(async (result) =>{
            if(result){
                const res = await this.$axios.post("/register",this.validateForm)
                if(res.data){
                    localStorage.setItem("user",JSON.stringify(res.data));
                    this.$toast.success("登录成功");
                    location.reload;
                    this.$emit("toogle",false)
                }else{
                    this.$toast.error(res.msg);
                    this.getCaptcha()
                }
            }
        })
    }
  }
};
</script>

<style>
</style>