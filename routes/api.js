/**
 * Created by avzal on 23.09.2016.
 */
var express=require('express');
var router=express.Router();
var configModel=require('../models/ConfigModel');

/* GET home page. */
router.get('/getConfig',function(req,res){
	configModel.get("1")
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(500).json(err);
		});

});

router.post('/addConfig',function(req,res){
	configModel.add("1",req.body.name,req.body.json_config,req.body.json)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(500).json(err);
		});

});

module.exports=router;