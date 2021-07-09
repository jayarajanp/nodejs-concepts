import * as express from 'express'
import { ApiResponse } from '../models.js'
import { StatusCodes } from 'http-status-codes'

export const router = express.Router();

configureEndpoints()

function configureEndpoints() {
    router.get('/ping', pingHandler());
}

function pingHandler() {
    return (_, res) => {
        res.status(StatusCodes.OK).send(new ApiResponse(true, 'Ping successful'));
    }
}