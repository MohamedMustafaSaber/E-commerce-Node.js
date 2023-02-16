const { signUp, signIn } = require('./user.auth');
const { createUser,  updateUser, deleteUser, getUsers, getUserByID, changeUserPassword } = require('./user.service');


const router = require('express').Router();



router.route('/').post(createUser).get(getUsers);
router.route('/:id').get(getUserByID).put(updateUser).delete(deleteUser);
router.patch('/changePassword/:id', changeUserPassword);
router.post('/signup' , signUp);
router.post('/signin', signIn);








module.exports = router;