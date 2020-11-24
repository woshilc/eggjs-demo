'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Project = app.model.define('projects',{
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: STRING(30),
        content: STRING(255),
        created_at: DATE,
        updated_at: DATE,
    });

    Project.associate = function(){
        app.model.Project.belongsToMany(app.model.User,{
            through: 'user_projects',//sequelize6以上指定表名，6以下指定model
            foreignKey:'project_id'
        });
    }

    return Project;
}