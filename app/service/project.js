'use strict'

const Service = require('egg').Service;

class ProjectService extends Service{
    async list({offset = 0, limit = 10}){
        return this.ctx.model.Project.findAndCountAll({
            limit,
            offset,
            order: [['id','desc']]
        });
    }

    async find(id){
        const project = await this.ctx.model.findByPK(id);
        if(!project){
            this.ctx.throw(404,'project not found');
        }
    }

    async create(project){
        return await this.ctx.model.Project.create(project);
    }

    async update({id,updates}){
        const project = await this.ctx.model.Project.findByPK(id);
        if(!project){
            this.ctx.throw(404,'project not found');
        }
        return project.update(updates);
    }

    async del(id){
        const project = await this.ctx.model.Project.findByPK(id);
        if(!project){
            this.ctx.throw(404,'project not found');
        }
        return project.destroy();
    }
}

module.exports = ProjectService;