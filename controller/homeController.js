module.exports.printHello = function(req,res){
    return res.render('home',{
        title : "home"
    });
}
