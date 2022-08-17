const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  moment,
  // 加密
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },

  // 解密函数
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        // console.log('_password, password:', _password, password);
        // console.log('err:', err);
        // console.log('isMatch:', isMatch);
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  },

  // 返回code和data状态
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0代表成功，其他代表失败
      msg: res.msg ? res.msg : '请求成功！',
    };
  },

  filterEmptyField(params) {
    let pam = {};
    for (let i in params) {
      if (params[i]) {
        if (i !== "page" && i !== "pageSize") {
          pam[i] = params[i];
        }
      }
    }
    return pam;
  },
  getTimeQueryCon(params) {
    let timeQuery = {};

    if (params.createStartTime) {
      timeQuery.createTime = { $gte: params.createStartTime };
    }
    if (params.createEndTime) {
      timeQuery.createTime = { $lte: params.createEndTime };
    }
    if (params.createStartTime && params.createEndTime) {
      timeQuery.createTime = {
        $gte: params.createStartTime,
        $lte: params.createEndTime,
      };
    }

    if (params.updateStartTime) {
      timeQuery.updateTime = { $gte: params.updateStartTime };
    }
    if (params.updateEndTime) {
      timeQuery.updateTime = { $lte: params.updateEndTime };
    }
    if (params.updateStartTime && params.updateEndTime) {
      timeQuery.updateTime = {
        $gte: params.updateStartTime,
        $lte: params.updateEndTime,
      };
    }

    return timeQuery;
  },
};

exports.relativeTime = time => moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');

