'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller{
    async getFileByName(){
        const { ctx } = this;
        const fileName = ctx.params.fileName;
        ctx.body = await ctx.service.file.getFileByName(fileName);
        const suffix = fileName.split('.')[1];
        ctx.set('Content-Type',`image/${suffix}`);
    }
}

module.exports = FileController;