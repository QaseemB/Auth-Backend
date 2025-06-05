import express from 'express';
var router = express.Router();

router.route('/login')
      .get((req, res) => {
       res.render('login');
      });

export default {router};
