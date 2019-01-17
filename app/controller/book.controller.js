const db = require('../config/db.config.js');
const Book = db.book;
const User = db.user;
const Swap = db.swap;

const Op = db.Sequelize.Op;

// add a book to the collection
exports.addBookToCollection = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookToCollection");
  const {
    ISBN_13,
    ISBN_10,
    title,
    subTitle,
    publisher,
    publishedDate,
    description,
    author,
    pageCount,
    category,
    smallThumbnail,
    thumbnail,
    language,
    webReaderLink,
    bookQualityRating
  } = req.body;
  
  const bookDTO = {
    userId: req.userId,
    ISBN_13,
    ISBN_10,
    title,
    subTitle,
    publisher,
    publishedDate,
    description,
    author,
    pageCount,
    category,
    smallThumbnail,
    thumbnail,
    language,
    webReaderLink,
    bookQualityRating
  };
  
  Book.create(bookDTO).then(book => {
    res.status(200).json(book);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
};

// swipe right. add the book to swiped table.
exports.addBookAsSwiped = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookAsSwiped");
  const {
    BOOK_ID,
    BOOK_OWNER_ID
  } = req.body;
  
  const swapDTO = {
    BOOK_ID,
    BOOK_OWNER_ID,
    USER_ID: req.userId
  };
  
  Swap.create(swapDTO).then(swap => {
    // res.status(200).json(swap);
    Swap.findAll({
      where: {
        BOOK_OWNER_ID: req.userId,
        USER_ID: swap.BOOK_OWNER_ID
      }
    }).then(swapMatch => {
      res.status(200).json(swapMatch);
    }).catch(err => {
      res.status(500).json({
        "description": "Failure at swap match",
        "error": err
      });
    })
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
};

// get collection details
exports.getCollectionByUserId = (req, res) => {
  console.log("Processing func -> getCollectionByUserId userId:", req.userId);
  Book.findAll({
    where: { userId: req.userId}
  }).then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Books get",
      "error": err
    });
  })
}

//getSwapList
exports.getSwapList = (req, res) => {
  console.log("Processing func -> getSwapList userId:", req.userId);
  Book.findAll({
    where: { userId: { [Op.not]: req.userId}}
  }).then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Books get",
      "error": err
    });
  })
}