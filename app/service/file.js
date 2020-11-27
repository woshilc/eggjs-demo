'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class FileService extends Service{
    async getFileByName(fileName){
        const data = await fs.readFileSync(`C:\\Users\\pc\\Desktop\\emoji\\${fileName}`);
        return data;
    }
}

module.exports = FileService;