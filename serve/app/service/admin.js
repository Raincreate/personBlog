
const Service = require('egg').Service;

class AdminService extends Service {
  async adminLogin(params) {
    // console.log('params:', params);
    const { ctx, app } = this;
    const oldUser = await ctx.model.Admin.findOne({
      userName: params.userName,
    });

    if (!oldUser) {
      return {
        msg: '用户不存在',
      };
    }

    // console.log('oldUser:', oldUser);
    // console.log('oldUser:', oldUser);
    const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
    // console.log('ismatch:', isMatch);

    if (!isMatch) {
      return {
        msg: '用户名或密码错误',
      };
    }

    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      expiresIn: '1h',
    });

    ctx.cookies.set('token', token, {
      maxAge: 86400000,
      httpOnly: true,
    });

    return {
      data: {
        token,
        userName: oldUser.userName,
      },
      msg: '登录成功！',
    };

    // console.log('ctx:', ctx);
    // console.log('body:', body);
    // console.log('ctx.model.Admin.find:', ctx.model.Admin.find(body));
    // const res = await ctx.model.Admin.create(body);
    // console.log('-------------');
    // console.log('res:', res);
    // return res;
  }

  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set('token', '', {
      maxAge: 0,
    });

    return {
      msg: '退出成功',
    };
  }


  async list() {
    const { ctx } = this;
    const res = await ctx.model.Admin.find();
    // console.log('list中的res:', res);
    return res;
  }

  async remove(id) {
    const { ctx } = this;
    const res = await ctx.model.Admin.deleteOne({ _id: id });
    return res;
  }

  async updateData(id) {
    const { ctx } = this;
    const res = await ctx.model.Admin.updateOne({ _id: id }, { userName: 'wangwu1234' });
    return res;
  }
}

module.exports = AdminService;
