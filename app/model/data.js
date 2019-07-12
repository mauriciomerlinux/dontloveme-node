module.exports = (sequelize, Sequelize) => {
    return sequelize.define('data', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER, field: 'id' },
        user_id: { type: Sequelize.STRING },
        to: { type: Sequelize.STRING },    
        from: { type: Sequelize.STRING },
    	message: { type: Sequelize.STRING },
        dtMessage: { tupe: Sequelize.DATE, field: 'dt_message' },
        dtCreate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'dt_create' }
    },
    {       
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    });
};
