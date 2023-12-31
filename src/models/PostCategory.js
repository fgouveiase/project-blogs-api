module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    }, {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    });
  
    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        foreignKey: 'postId',
        otherKey: 'categoryId',
        through: PostCategory
      });
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        foreignKey: 'categoryId',
        otherKey: 'postId',
        through: PostCategory
      });
    };
  
    return PostCategory;
  };