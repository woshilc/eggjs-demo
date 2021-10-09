'use strict';

const Service = require('egg').Service;
const TextToSVG = require('text-to-svg');
const sharp = require('sharp');
const fs = require('fs');
const Jimp = require('jimp');
const imagemin = require('imagemin');//图片压缩
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

class ImageprocessService extends Service {
    async addTextWithSharp() {
        const start = new Date().getTime();
        const textToSVG = TextToSVG.loadSync('./public/font/OpenSans-Bold.ttf');
        const attributes = { fill: 'black' };
        const options = { x: 0, y: 0, fontSize: 32, anchor: 'top', attributes: attributes };
        let textBuffers = [];
        textBuffers.push({
            input: {create:{width:250,height:100,channels:4,background:'red'}},
            top: 700,
            left: 700
        });
        for(let i = 0; i < 2; i++){
            const svg = textToSVG.getSVG('Hello World!', options);
            const pngBuffer = await sharp(new Buffer.from(svg)).png().toBuffer();
            textBuffers.push({
                input: pngBuffer,
                top: 700 + i * 50,
                left: 700
            });
        }
        const result = await sharp('C:\\Users\\shuiz\\Desktop\\新建文件夹\\微信图片_20210226173455.png').composite(textBuffers).toBuffer();
        fs.writeFileSync('C:\\Users\\shuiz\\Desktop\\新建文件夹\\2.png',result);
        const end = new Date().getTime();
        console.log(end - start);
        return 'success'
    }

    async addTextWithJimp() {
        const start = new Date().getTime();
        const font = await Jimp.loadFont('./app/public/font/OpenSans_32.fnt');
        const image = await Jimp.read('C:\\Users\\shuiz\\Desktop\\新建文件夹\\微信图片_20210226173455.png');
        const background = await this.createBackground();
        image.blit(background, 700, 700);
        for(let i = 0; i < 2; i++){
            image.print(font, 700, 700 + i * 50, 'Hello World!');
        }
        await image.writeAsync('C:\\Users\\shuiz\\Desktop\\新建文件夹\\3.png');
        const end = new Date().getTime();
        console.log(end - start);
        return 'success';
    }

    async createBackground() {
        return new Promise((resolve,reject) => {
            new Jimp(250, 100, 'red', (err, image) => {
                resolve(image)
            })
        })
    }

    async compressImg() {
        const start = new Date().getTime();
        await imagemin(['E:/临时文件/1Z9Y8036908809.png'], {
            destination: 'E:/临时文件/build',
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        const end = new Date().getTime();
        console.log(end - start);
        return 'success';
    }
}

module.exports = ImageprocessService;