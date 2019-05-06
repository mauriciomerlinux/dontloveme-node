module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER, field: 'id' },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'dt_create' }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
