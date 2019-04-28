const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

  const controller = require('../controller/controller.js');
  const bookController = require('../controller/book.controller.js');
 	const meetupController = require('../controller/meetup.controller');
 	
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
	app.post('/api/auth/signin', controller.signin);
	
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
	
	// book details and collection
  app.get('/api/user/', [authJwt.verifyToken], controller.user)
  app.post('/api/book/redeem', [authJwt.verifyToken], bookController.redeemBookScore);
  app.post('/api/book/add', [authJwt.verifyToken], bookController.addBookToCollection);
  app.get('/api/book/collection/',[authJwt.verifyToken], bookController.getCollectionByUserId);
  app.get('/api/book/swapList/',[authJwt.verifyToken], bookController.getSwapList);
  app.post('/api/book/addSwipeRight', [authJwt.verifyToken], bookController.addBookAsSwiped);
  app.post('/api/swap/meetup', [authJwt.verifyToken], meetupController.addMeetupDetails);
  app.get('/api/meetup/myApprovedOrPendingMeetings/', [authJwt.verifyToken], meetupController.myApprovedOrPendingMeetings);
  app.get('/api/meetup/getApprovalPendingOrPendingMeetupsForMe/', [authJwt.verifyToken], meetupController.getApprovalPendingOrPendingMeetupsForMe);
  app.post('/api/meetup/acceptMeetup/', [authJwt.verifyToken], meetupController.acceptMeetup);
};