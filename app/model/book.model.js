module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('books', {
    ISBN_13: {
      type: Sequelize.STRING
    },
    ISBN_10: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    subTitle: {
      type: Sequelize.STRING
    },
    publisher: {
      type: Sequelize.STRING
    },
    publishedDate: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    pageCount: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    smallThumbnail: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    language: {
      type: Sequelize.STRING
    },
    webReaderLink: {
      type: Sequelize.STRING
    }
  });
  
  return Book;
}