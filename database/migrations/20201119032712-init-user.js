'use strict';

module.exports = {
  //npx sequelize migration:generate --name=init-users新建迁移文件
  //npx sequelize db:migrate 执行迁移文件
  //如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
  //可以通过 `db:migrate:undo:all` 回退到初始状态
  //db:migrate:status 查看迁移文件执行状态
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
