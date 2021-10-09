'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('users','/users',controller.user);
  router.post('/users/findUP',controller.user.listUserAndProject);
  router.put('/users/addProject/:id',controller.user.addProject);

  router.resources('posts','/posts',controller.post);

  router.resources('projects','/projects',controller.project);

  router.get('/files/getFile/:fileName',controller.file.getFileByName);

  router.post('/compress/compressfile',controller.compress.compressFile);
  router.post('/compress/uncompressfile',controller.compress.uncompressFile);

  router.post('/imageprocess/addText1',controller.imageprocess.addText1);
  router.post('/imageprocess/addText2',controller.imageprocess.addText2);
  router.post('/imageprocess/compressImg',controller.imageprocess.compressImg);
};
