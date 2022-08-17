const helper = require('../extend/helper');

module.exports = app => {
  const mongoose = app.mongoose;
  // console.log('mongoose:', mongoose);
  const Schema = mongoose.Schema;
  const AdminSchema = new Schema(
    {
      userName: {
        type: String,
        min: 5,
        max: 20,
      },
      password: { type: String },
    },
    {
      collection: 'admin',
      versionKey: false,
    }
    // console.log('aa23aa')

  );

  const AdminModel = mongoose.model('Admin', AdminSchema);

  const adminUser = {
    userName: 'admin',
    password: '123456',
  };

  helper.genSaltPassword(adminUser.password).then(async hash => {

    adminUser.password = hash;
    // console.log('加密的adminUser.password:', adminUser.password);

    const oldUser = await AdminModel.find({ userName: adminUser.userName });
    if (oldUser.length === 0) {
      AdminModel.create(adminUser);
    }
    // console.log('oldUser:', oldUser);
  });

  return AdminModel;
};
