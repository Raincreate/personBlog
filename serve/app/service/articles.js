const Service = require("egg").Service;

class ArticlesService extends Service {
  async updateCategoriesActicleNum() {
    const { ctx } = this;
    const categories = await ctx.model.Categories.find();
    if (categories && categories.length > 0) {
      categories.forEach(async (item) => {
        const articleNum = await ctx.model.Articles.find({
          categories: item.name,
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Categories.update(
          {
            name: item.name,
          },
          {
            articleNum,
          }
        );
      });
    }
  }

  async updateTagsActicleNum() {
    const { ctx } = this;
    const tags = await ctx.model.Tags.find();

    if (tags && tags.length > 0) {
      tags.forEach(async (item) => {
        const articleNum = await ctx.model.Articles.find({
          tags: { $elemMatch: { $eq: item.name } },
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Tags.update(
          {
            name: item.name,
          },
          {
            articleNum,
          }
        );
      });
    }
  }

  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);

    let mustCon = {};
    if (params.categories) {
      mustCon.categories = params.categories;
    }

    if (params.tags) {
      mustCon.tags = {
        $all: params.tags.split(","), //[vue,react]
      };
    }

    if (params.status != 0) {
      mustCon.status = params.status;
    }

    if (params.publishStatus != 0) {
      mustCon.publishStatus = params.publishStatus;
    }

    let timeQuery = ctx.helper.getTimeQueryCon(params);

    const queryCon = {
      $and: [
        mustCon,
        timeQuery,
        {
          title: {
            $regex: params.title ? new RegExp(params.title, "i") : "",
          },
        },
      ],
    };

    const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();

    const data = await ctx.model.Articles.find(queryCon)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
    };
  }

  async create(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({
      title: params.title,
    });
    if (oldArticles) {
      return {
        msg: "??????????????????",
      };
    }

    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Articles.create(data);
    // TODO ??????????????????????????????????????????
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: "??????????????????",
      data: res,
    };
  }

  async update(params) {
    const { ctx } = this;

    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: "???????????????",
      };
    }

    const updateData = {
      ...params,
      // createTime: oldArticles.createTime, // ???????????????????????? 1642774039
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    // TODO ??????????????????????????????????????????
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: "??????????????????",
    };
  }

  async destroy(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) {
      return {
        msg: "???????????????",
      };
    }
    await ctx.model.Articles.deleteOne({ _id: id });
    // TODO ??????????????????????????????????????????
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: "??????????????????",
    };
  }

  async changeStatus(params) {
    console.log('service??????changeStatus');
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: "???????????????",
      };
    }

    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      {
        status: params.status,
      }
    );
    return {
      msg: `??????${params.status === 1 ? "??????" : "??????"}??????`,
    };
  }

  async changePublishStatus(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: "???????????????",
      };
    }

    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      {
        publishStatus: params.publishStatus,
      }
    );
    return {
      msg: `??????${params.publishStatus === 1 ? "??????" : "??????"}??????`,
    };
  }

  async changeCollectStatus(params) {
    const { ctx } = this;

    await ctx.model.Articles.updateMany(
      {},
      {
        isCollect: params.isCollect,
      }
    );
    return {
      msg: `??????${params.isCollect ? "????????????" : "????????????"}??????`,
    };
  }

  async edit(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) {
      return {
        msg: "???????????????",
      };
    }
    return {
      data: oldArticles,
      msg: "????????????????????????",
    };
  }
}

module.exports = ArticlesService;
