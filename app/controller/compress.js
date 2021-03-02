'use strict';

const Controller = require('egg').Controller;

class CompressController extends Controller {

    async compressFile(){
        const result = await this.ctx.service.compress.compressFile();
        this.ctx.status = 200;
        this.ctx.body = result;
    }

    async uncompressFile(){
        const result = await this.ctx.service.compress.uncompressFile();
        this.ctx.status = 200;
        this.ctx.body = result;
    }

}

module.exports = CompressController;