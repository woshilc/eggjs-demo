'use strict';

module.exports = app => {
    const { INTEGER, DATE } = app.Sequelize;

    const UserProject = app.model.define('user_projects', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        user_id: {
            type: INTEGER(11),
            references: {//sequelize6需指定此属性
                model: app.model.User,
                key: 'id'
            }
        },
        project_id: {
            type: INTEGER(11),
            references: {
                model: app.model.Project,
                key: 'id'
            }
        },
        created_at: DATE,
        updated_at: DATE,
    },{
        freezeTableName: true,
    });

    return UserProject;
}