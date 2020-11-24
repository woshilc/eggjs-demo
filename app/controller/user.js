'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.user.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const user = await ctx.service.user.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({ id, updates: body });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
  }

  async listUserAndProject(){
    const ctx = this.ctx;
    const query = {
      limit: 10,
      offset: 0,
    };
    ctx.body = await ctx.service.user.listUserAndProject(query);
  }

  async addProject(){
    console.log(this.ctx.request.body);
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const projectIds = ctx.request.body.projectIds;
    ctx.body = await ctx.service.user.addProject({id,projectIds})
  }
}

module.exports = UserController;