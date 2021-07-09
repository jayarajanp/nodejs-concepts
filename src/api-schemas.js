import Joi from 'joi'

const maxDifferenceSchema = Joi.object({
    array: Joi.array().min(1).required()
})

export const validateMaxDifferenceSchema = (maxDifference) => maxDifferenceSchema.validate(maxDifference)

const addDatumSchema = Joi.object({
    id: Joi.number().min(1).required(),
    info: Joi.string().min(1).required()
})

export const validateAddDatumSchema = (datum) => addDatumSchema.validate(datum)

const updateDatumSchema = Joi.object({
    info: Joi.string().min(1).required()
})

export const validateUpdateDatum = (info) => updateDatumSchema.validate(info)