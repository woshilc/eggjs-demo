'use strict';

const Service = require('egg').Service;

class User extends Service {
  async list({ offset = 0, limit = 10 }) {
    //这里为什么不用await
    return this.ctx.model.User.findAndCountAll({
      include:[{
        model: this.ctx.model.Post,
      }],
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  async create(user) {
    return this.ctx.model.User.create(user);
  }

  async update({ id, updates }) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.update(updates);
  }

  async del(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user.destroy();
  }

  async listUserAndProject({offset = 0, limit = 10}){
    const { ctx, app } = this;
    const users = await ctx.model.User.findAll({
      include: [
        {
          model: app.model.Project,
        }
      ],
      limit,
      offset,
      order:[['id','desc']]
    });
    return users;
  }

  async addProject({ id, projectIds }){
    projectIds = JSON.parse(projectIds);
    const projects = await this.ctx.model.Project.findAll({
      where: {
        id: projectIds
      }
    });
    console.log(projects);
    const user = await this.ctx.model.User.findByPk(id);
    console.log(user);
    console.log(Object.keys(user));
    if(!user){
      this.ctx.throw(404,'user not found');
    }
    //建立关联模型后自动插入 add get set 方法，可通过实例对象调用
    return await user.setProjects(projects);
  }
}

module.exports = User;