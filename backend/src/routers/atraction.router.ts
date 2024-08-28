import express from 'express'
import { AtractionController } from '../controllers/atraction.controller'


const atractionRouter=express.Router()

atractionRouter.route('/getAllAtractions').get(
    (req,res)=>new AtractionController().getAllAtractions(req,res)
)

atractionRouter.route('/rateLocation').post(
    (req,res)=>new AtractionController().rateLocation(req,res)
)

export default atractionRouter