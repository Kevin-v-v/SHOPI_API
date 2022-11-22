module.exports = function(req,res){
    req.session.destroy(function (){
        res.json({
            success: true,
            msg: "Sesion eliminada"
        });
    })
}