const express = require('express');
const router = express.Router();
const DAO = require("../Database/database");
DB = new DAO();

router.get('/submissions',async (req,res)=>{
    let {page} = req.query;
    page = Number(page);
    if(page === undefined || isNaN(page)){
        res.status(400);
        res.json({msg:"provide page"});
        return;
    }
    const rows = await DB.getSubmission(page);
    let count = await DB.rowCount();
    count = count[0].count
    res.json({rows,totalPages:Math.ceil(count/DAO.PER_PAGE)});
});
router.post("/submit",async (req,res)=>{
    const body = req.body;
    if(body.hasOwnProperty("userName") && body.hasOwnProperty("submittedOn") && body.hasOwnProperty("code") && body.hasOwnProperty("language") && body.hasOwnProperty("stdin") && body.hasOwnProperty("output")){
        console.log("SUBMIT ON",body.submittedOn);
        const result = await DB.insertSubmission(body);
        res.json({affectedRows:result[0].affectedRows});
    }else{
        res.status(400);
        res.json({"msg":"bad request provide all field"})
    }
});

module.exports = router;