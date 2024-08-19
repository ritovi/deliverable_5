const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Director,Actor,Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const specialSetActors = async(req,res)=>{
    try{
        const {user_id} = req.params;
        if(!user_id) return res.status(400).json({error : "Movie Id is required..."});

        const movie = await Movie.findByPk(user_id);
        if(!movie) return res.status(404).json({error: "Movie not found"});

        await movie.setActors(req.body);
         
        const result = await movie.getActors();

        return res.json(result);
    }catch(erro){
        console.log("Error in specialSetActors : ", error);
        return res.status(500).json({error: "An unexpected error ocurred"});
    }
};

const specialSetDirectors = async(req,res)=>{
    try{
        const {user_id} = req.params;
        if(!user_id) return res.status(400).json({error: "User ID is required ... "});

        const movie = await Movie.findByPk(user_id);
        if(!movie) return res.status(404).json({error: "Movie not found"});
        
        await movie.setDirectors(req.body);

        const result = await movie.getDirectors();

        return res.json(result);

    }catch(error){
        console.log("Error in specialDirectors : ", error);
        return res.status(500).json({error: "An Unexpected error ocurred ..."})
    }
};

const specialSetGenres = async(req,res)=>{
    try{
        const {user_id} = req.params;
        if(!user_id) return res.status(400).json({error: "Movie ID is required ...."});
    
        const movie = await Movie.findByPk(user_id);
        if(!movie) return res.status(404).json({error: "Movie not found..."});
    
        await movie.setGenres(req.body);
        const result = await movie.getGenres();
    
        return res.json(result);
    }catch(error){
        console.log("Error in SpecialSetGenres...", error);
        return res.status(500).json({error: "An unexpected error ocurred"});
    }
    
};



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    specialSetActors,
    specialSetDirectors,
    specialSetGenres,
}