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
};
