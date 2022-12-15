module.exports = (sequelize, DataTypes) => {
   return sequelize.define(
      "Pokemon",
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false, // allowNull: false veut dire que le champ ne peut pas être null
         },
         hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         picture: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
               // ici on définit un getteur selon sequelize
               return this.getDataValue("types").split(",");
            },
            set(types) {
               // ici on définit un setteur selon sequelize
               this.setDataValue("types", types.join());
            },
         },
      },
      {
         timestamps: true,
         createdAt: "created",
         updatedAt: false,
      }
   );
};
