import * as express from 'express'
import * as utils from '../utils.js'
import * as apiSchemas from '../api-schemas.js'
import { ApiResponse } from '../models.js'
import { StatusCodes } from 'http-status-codes'

export const router = express.Router();

configureEndpoints()

function configureEndpoints() {
    router.post('/max_difference', findMaxDifferenceHandler());
}

function findMaxDifferenceHandler() {
    return (req, res) => {
        const { error } = apiSchemas.validateMaxDifferenceSchema(req.body);

        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(new ApiResponse(false, `Invalid body: ${error}`));
        }
    
        let array = req.body.array;
        let result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting(array);
    
        if (result === -1) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ApiResponse(false, 'Unsuccessful: Something went wrong'));
        } else {
            res.status(StatusCodes.OK).send(new ApiResponse(true, 'Successful: Found max difference', result));
        }
    }
}