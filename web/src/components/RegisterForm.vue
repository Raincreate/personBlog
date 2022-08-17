<template>
  <div>
    <mu-dialog
      scrollable
      title="注册"
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

        <mu-form-item label="昵称" prop="nickName" :rules="nickNameRules">
          <mu-text-field
            v-model.trim="validateForm.nickName"
            prop="nickName"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码(必填)" prop="password" :rules="passwordRules">
          <mu-text-field
            v-model.trim="validateForm.password"
            prop="password"
            :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'text' : 'password'"
          ></mu-text-field
          ><br />
        </mu-form-item>

        <mu-form-item
          label="确认密码(必填)"
          prop="confirmPassword"
          :rules="confirmPasswordRules"
        >
          <mu-text-field
            v-model.trim="validateForm.confirmPassword"
            prop="confirmPassword"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="验证码" prop="captcha" :rules="captchaRules">
          <mu-text-field
            placeholder="区分大小写"
            v-model.trim="validateForm.captcha"
            prop="captcha"
          ></mu-text-field>
        </mu-form-item>
      </mu-form>

      <mu-button slot="actions" flat>
        <mu-avatar :size="30" style="margin-right: 10px">
          <img :src="Icon.github" alt="" /> </mu-avatar
        >GitHub
      </mu-button>

      <mu-button slot="actions" small flat @click="clear">取消</mu-button>
      <mu-button slot="actions" small flat color="primary" @click="submit"
        >注册</mu-button
      >
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
    close() {
      this.open = false;
    },
    ok() {
      this.close();
    },
  },
  data() {
    return {
      Icon,
      captcha: "",
      visibility: false,

      nickNameRules: [
        {
          validate: (val) => val.length <= 20,
          message: "用户名长度大于3小于20个字符",
        },
      ],
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
      confirmPasswordRules: [
        { validate: (val) => !!val, message: "必须填写确认密码" },
        {
          validate: (val) => {
            return this.validateForm.password === val;
          },
          message: "密码不一致",
        },
      ],
      emailRules: [
        { validate: (val) => !!val, message: "必须填写邮箱" },
        { validate: (val) => val.length >= 6, message: "邮箱长度必须大于6" },
      ],
      captchaRules: [{ validate: (val) => !!val, message: "验证码不能为空" }],
      validateForm: {
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
        captcha: "",
      },
    };
  },
  methods: {
    async getCaptcha() {
      const res = await this.$axios.get("/captcha");
      if (res) {
        this.captcha = res.data;
      }
    },
    clear() {
      console.log('这个应该是要取消的');
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
        captcha: "",
      };
      this.$emit("toogle", false);
    },
    submit() {
      this.$refs.form.validate().then(async (result) => {
        if (result) {
          const res = await this.$axios.post("/register", this.validateForm);
          if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$toast.success("注册成功");
            location.reload;
            this.$emit("toogle", false);
          } else {
            this.$toast.error(res.msg);
            this.getCaptcha();
          }
        }
      });
    },
  },
  watch:{
    // open(newVal){
    //   if(newVal){
    //     this.getCaptcha()
    //   }
    // }
  }
};
</script>

<style>
</style>