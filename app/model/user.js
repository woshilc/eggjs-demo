'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    //调用方法的是source model，方法内被引用的是target model，此处User为source model，post含有关联字段
    app.model.User.hasMany(app.model.Post,{foreignKey:'user_id'});

    //多对多关联，through对应的是中间表
    app.model.User.belongsToMany(app.model.Project,{
      through: 'user_projects',//sequelize6以上指定表名，6以下指定model
      foreignKey: 'user_id'
    });
  };

  return User;
};