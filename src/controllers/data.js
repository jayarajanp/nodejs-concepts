import * as express from 'express'
import * as apiSchemas from '../api-schemas.js'
import { ApiResponse } from '../models.js'
import { StatusCodes } from 'http-status-codes'

const data = [
    {
        id: 1,
        info: 'abc'
    },
    {
        id: 2,
        info: 'xyz'
    }
];

export const router = express.Router();

configureEndpoints();

function configureEndpoints() {
    router.get('/get_data', getDataHandler());
    router.get('/get_datum/:id', getDatumHandler());
    router.post('/add_datum', addDatumHandler());
    router.put('/update_datum/:id', updateDatumHandler());
    router.delete('/delete_datum/:id', deleteDatumHandler());
}

function getDataHandler() {
    return (_, res) => {
        res.status(StatusCodes.OK).send(new ApiResponse(true, 'Returning data', data));
    }
}

function getDatumHandler() {
    return (req, res) => {
        const inputId = req.params.id;
        if (!inputId) {
            res.status(StatusCodes.BAD_REQUEST).send(new ApiResponse(false, 'Unsuccessful: id input could not found'));
            return;
        }

        const datum = data.find(d => d.id === parseInt(inputId));

        if (!datum) {
            res.status(StatusCodes.NOT_FOUND).send(new ApiResponse(false, 'Datum for the provided ID was not found'));
            return;
        }

        res.status(StatusCodes.OK).send(new ApiResponse(true, 'Datum found!', datum));
    }
}

function addDatumHandler() {
    return (req, res) => {
        const { error } = apiSchemas.validateAddDatumSchema(req.body);

        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(new ApiResponse(false, `Invalid body: ${error}`));
            return;
        }

        let datum = { id: req.body.id, info: req.body.info };

        data.push(datum);

        res.status(StatusCodes.CREATED).send(new ApiResponse(true, 'Added datum', data));
    }
}

function updateDatumHandler() {
    return (req, res) => {
        const inputId = req.params.id;
        if (!inputId) {
            res.status(StatusCodes.BAD_REQUEST).send(new ApiResponse(false, 'Unsuccessful: id input could not found'));
            return;
        }

        const { error } = apiSchemas.validateUpdateDatum(req.body);

        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(new ApiResponse(false, `Invalid body: ${error}`));
            return;
        }

        let inputInfo = req.body.info;

        const datum = data.find(d => d.id === parseInt(inputId));

        if (!datum) {
            res.status(StatusCodes.NOT_FOUND).send(new ApiResponse(false, 'Datum for the provided ID was not found'));
            return;
        }

        datum.info = inputInfo;

        res.status(StatusCodes.OK).send(new ApiResponse(true, 'Resource updated', datum));
    }
}

function deleteDatumHandler() {
    return (req, res) => {
        const inputId = parseInt(req.params.id);
        if (!inputId) {
            res.status(StatusCodes.BAD_REQUEST).send(new ApiResponse(false, 'Unsuccessful: id input could not found'));
            return;
        }

        const datumToBeDeleted = data.find(d => d.id === inputId)
        if (!datumToBeDeleted) {
            res.status(StatusCodes.NOT_FOUND).send(new ApiResponse(false, 'Unsuccessful: Datum could not be found'));
            return;
        }

        const indexOfDatumToBeDeleted = data.indexOf(datumToBeDeleted);
        const datum = data.splice(indexOfDatumToBeDeleted, 1);

        res.status(StatusCodes.OK).send(new ApiResponse(true, 'Datum deleted', datum));
    }
}