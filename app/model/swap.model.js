module.exports = (sequelize, Sequelize) => {
  const Swap = sequelize.define('swaps', {
    BOOK_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      }
    },
    BOOK_OWNER_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    USER_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    location: { type: Sequelize.STRING },
    datetime: { type: Sequelize.STRING },
    meetingBy: { type: Sequelize.STRING},
    isAccepted: { type: Sequelize.STRING}
  });
  
  return Swap;
}