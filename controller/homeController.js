const User = require('../models/user');
const db = require('../config/mongoose');
//home page 
module.exports.homePage = function(req,res){
    console.log(User.userName);

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
                console.log('**************',defultUser);
                return res.redirect('back');
            });

        }
        //if found then render habits
        else if(user){
            console.log("default user exists",user);
            return res.render('home',{
                title: user.userName,
                habits: user.habits
            });

        }
    });
    
}


// add habit 
module.exports.addHabitPage= function(req,res){

    
    return res.render('add_habit',{
        title : "Add Habit"
    });

}


module.exports.addHabit=function(req,res){
    console.log(req.body);
    db.collection('users').findOneAndUpdate({userName: "Pankaj"},
    {$push : {habits: {
            habitName: req.body.habitName,
              note   : req.body.habitNote,
              color  : req.body.color 
        }}});

//    User.findOneAndUpdate({userName : "Pankaj"},//function(err,user){
//         // if(err){
//         //     console.log("error in finding default user : Pankaj");
//         // }
//         // User.update(
//         //     { userName: "Pankaj"},
//             { $push: { habits: 1}},
//             {returnNewDocument: true}
//             // );
//         // user.habits.push({
//         //     habitName: req.body.habitName,
//         //       note   : req.body.habitNote,
//         //       color  : req.body.color 
//         // });
//         // console.log("****** habit added *******");
       
//     //}
//     );
    
    return res.redirect('/');
    // let newHabit = { habitName: req.body.habitName,
    //     note   : req.body.habitNote,
    //     color  : req.body.color }
    //     db.User.update(
    //         { userName: "Pankaj"},
    //         { $push: { habits: newHabit }}
    //         );
        
    
    
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