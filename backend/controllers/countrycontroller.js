const {data} = require('../models/Database')
const {realdata} = require('../models/Livetimedata')

exports.country = (req,res)=>{
    try{
    if(data){
        res.status(201).json({ data });
    }
} catch(error){
    res.status(500).json({ message: 'Server error', error });
}
}

exports.realdata = (req,res)=>{
    try{
        if(realdata){
            res.status(201).json({ realdata });
        }
    } catch(error){
        res.status(500).json({ message: 'Server error', error });
    }
}

