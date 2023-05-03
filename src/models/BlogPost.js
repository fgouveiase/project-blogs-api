module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
      'BlogPost',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        published: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        tableName: 'blog_posts',
        underscored: true,
      },
    );
  
    BlogPost.associate = (model)	=> {
      BlogPost.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
  
    return BlogPost;
  };