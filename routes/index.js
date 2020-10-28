const express = require('express');

const router = express.Router();
const homeController =require('../controller/homeController');


router.get('/',homeController.homePage);

//rendering add habit page
router.get('/add-habit-page',homeController.addHabitPage);

//rendering todays habit page
router.get('/today-habit-page',homeController.todayHabitPage);

//rendering habit list page
router.get('/habit-list-page',homeController.habitListPage);

//add habit action
router.post('/add-habit',homeController.addHabit);




module.exports = router;
