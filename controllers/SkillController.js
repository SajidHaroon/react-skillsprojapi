const skillRouter = require('express').Router()
const Skill = require('../models/Skill')

// In the app.js, we are using --> app.use('/skills', skillRouter)
// so NOW skillRouter simply means "http://localhost:3030/skills"

// To save data to MongoDB collection and create a skill
skillRouter.post('/', async (req,res) => {
    const body = req.body


    if (!body.title){
        return res.status(400).json({ error: "Title not available."})
    }
    const skill = new Skill ({
        title:body.title,
        description: body.description
    })                               // For post in postman, we need >Headers: Key:ContentType Value:application/json and >Boday>raw and enter the body object like {  }

    const savedSkill = await skill.save()
    res.json(savedSkill)
})

// Get all data entries from database
skillRouter.get('/', async (req,res) => {
    const skills = await Skill.find({})
    res.json(skills)
})

// Get specific data by id
skillRouter.get('/:id', async (req,res) => {
    const id = req.params.id
    const skill = await Skill.findById(id)
    skill ? res.json(skill) : res.status(404).end()
})

// Delete a data by id
skillRouter.delete('/:id', async (req, res, next) => {   // next use to avoid deleting next entry right after one first is deleted
    const id = req.params.id
    Skill.findByIdAndRemove(id)
        .then(res => res.status(204).end())
        .catch(err => next(err))
})

// To update an entry OR skill              // FOR PUT: Same as post in postman, we need >Headers: Key:ContentType Value:application/json and >Boday>raw and enter the body object like {  }
skillRouter.put('/:id', async(req, res, next) => {    // next use to avoid updating next entry right after one first is updated
    const body = req.body
    const id = req.params.id

    const skill = {
        title: body.title,
        description: body.description
    }

    Skill.findByIdAndUpdate(id, skill, { new: true })
        .then (updatedSkill => res.json(updatedSkill))
        .catch( err => next(err))
})

module.exports = skillRouter


