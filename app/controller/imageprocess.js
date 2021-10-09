'use strict';

const Controller = require('egg').Controller;

class ImageprocessController extends Controller {

    async addText1() {
        const { ctx } = this;
        const result = await this.ctx.service.imageprocess.addTextWithSharp();
        ctx.status = 201;
        ctx.body = result
    }

    async addText2() {
        const { ctx } = this;
        const result = await this.ctx.service.imageprocess.addTextWithJimp();
        ctx.status = 201;
        ctx.body = result;
    }

    async compressImg() {
        const { ctx } = this;
        const result = await this.ctx.service.imageprocess.compressImg();
        ctx.status = 201;
        ctx.body = result;
    }

}

module.exports = ImageprocessController;