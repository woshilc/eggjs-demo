'use strict';

const Service = require('egg').Service;
const compressing = require('compressing');

class CompressService extends Service {

    async compressFile() {
        const start = new Date().getTime();
        await compressing.zip.compressDir('C:\\Users\\shuiz\\Desktop\\面单测试数据\\测试','C:\\Users\\shuiz\\Desktop\\面单测试数据\\测试compress.zip');
        const end = new Date().getTime();
        console.log(end - start);
        return 'success';
    }

    async uncompressFile() {
        const start = new Date().getTime();
        await compressing.zip.uncompress('C:\\Users\\shuiz\\Desktop\\面单测试数据\\测试compress.zip','C:\\Users\\shuiz\\Desktop\\面单测试数据\\测试compress');
        const end = new Date().getTime();
        console.log(end - start);
        console.log('uncompressFile');
        return 'success';
    }

}

module.exports = CompressService;