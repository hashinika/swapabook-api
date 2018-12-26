const db = require('../config/db.config.js');
const Book = db.book;
const User = db.user;

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
    userId
  } = req.body;
  
  const bookDTO = {
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
    userId,
  };
  
  Book.create(bookDTO).then(book => {
    res.send("Book added successfully!", );
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
};

// get collection details
exports.getCollectionByUserId = (req, res) => {
  console.log("Processing func -> getCollectionByUserId userId:", req.params.userId);
  Book.findAll({
    where: { userId: req.params.userId}
  }).then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Books get",
      "error": err
    });
  })
}