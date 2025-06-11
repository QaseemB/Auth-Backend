import express from 'express';
import  {login,register,checkAuth,logout} from '../controllers/authController.mjs'
var router = express.Router();

router
    .route("/register")
    .post(register)

router
    .route("/logout")
    .post(logout)

router 
    .route("/check")
    .get(checkAuth)

router.route('/login',)
      .post(login)
      .get((req, res) => {
       res.render('login');
      });

export default router;
