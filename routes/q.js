/**
 * Created by avzal on 23.09.2016.
 */
/* GET home page. */
var express=require('express');
var router=express.Router();
var ConfigModel=require("../models/ConfigModel");

router.get('/:hash/:name',function(req,res){
	ConfigModel.getRandomArray(req.params.hash,req.params.name)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(err.status).json(err.err.message);
		});

});

module.exports=router;