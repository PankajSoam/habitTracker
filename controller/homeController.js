const User = require('../models/user');
const db = require('../config/mongoose');
const moment = require('moment');

//home page 
module.exports.homePage = function(req,res){
    

    //finding default user
    User.findOne({userName: "Pankaj"}, function(err,user){
        if(err){
            console.log(`error in finding user ${err}`);
            return;
        }
        //if not found then create one
        if(!user){
            User.create({
                userName : "Pankaj",
                habits: []
            },function(err,defultUser){
                if(err){
                    console.log(`error in creating default user : ${err}`);
                }
                console.log('******* default user created *******',defultUser);
                return res.redirect('back');
            });

        }
        //if found then render habits
        else if(user){

            
            
            console.log("******default user exists******");
            return res.render('home',{
                title: user.userName,
                habits: user.habits
            });

        }
    });
    
}


// render add habit page
module.exports.addHabitPage= function(req,res){

    
    return res.render('add_habit',{
        title : "Add Habit"
    });

}

// add habit function
module.exports.addHabit=function(req,res){
    console.log(req.body);

    //last 7 days for new habit
    
    var last7Days=[];
    for(let i=0;i<7;i++){
       let date = moment().subtract(i,'days');
       let dateObject = {
           Date : date.format('DD/MM/YYYY'),
           status : 0
       }
       last7Days.push(dateObject);
    }
    console.log(last7Days);
     
// push to mongodb
    db.collection('users').findOneAndUpdate({userName: "Pankaj"},
    {$push : {habits: {
            habitName: req.body.habitName,
              note   : req.body.habitNote,
              color  : req.body.color,
              habitRecord: [last7Days] 
        }}});

        console.log('************* new habit created ***********');
    
    return res.redirect('/');
   
}

module.exports.todayHabitPage= function(req,res){
    return res.render('todays_habit',{
        title: "todays Habit"
    })
}

module.exports.habitListPage= function(req,res){
    return res.render('habit_list',{
        title: "Habit List"
    })
}