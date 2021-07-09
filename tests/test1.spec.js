import * as mocha from 'mocha' // mocha is a testing framework
import * as chai from 'chai' // chai is an assertion library
import request from 'supertest'
import * as utils from '../src/utils.js'
import { StatusCodes } from 'http-status-codes'

mocha.describe('Reverse a string', () => {
    mocha.it('Should reverse a string and return', () => {
        const result = utils.reverseString('abcd');
        chai.expect(result).to.equal('dcba');
    });
})

mocha.describe('Add char at beginning and end of array', () => {
    mocha.it('Should add char at beginning and end', () => {
        const result = utils.addAtBeginningAndEndOfArray([2, 3, 4], 1, 5);
        chai.expect(result).deep.to.equal([1, 2, 3, 4, 5]);
    });
})

mocha.describe('Find max difference in an array', () => {
    mocha.it('Max difference with 0 elements', () => {
        const result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting([]);
        chai.expect(result).to.be.equal(-1);
    });

    mocha.it('Max difference with 1 elements', () => {
        const result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting([2]);
        chai.expect(result).to.be.equal(0);
    });

    mocha.it('Max difference with 5 elements', () => {
        const result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting([2, 5, 1, 2, 0]);
        chai.expect(result).to.be.equal(3);
    });

    mocha.it('Max difference with 7 elements', () => {
        const result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting([1, 2, 3, 7, 16, 17, 20]);
        chai.expect(result).to.be.equal(9);
    });

    mocha.it('Max difference with negative elements', () => {
        const result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting([-2, -5, 1, -2, 0]);
        chai.expect(result).to.be.equal(3);
    });

    mocha.it('Max difference with decimal elements', () => {
        const result = utils.findMaxDifferenceBetweenSuccessiveElementsAfterSorting([-2.2, -5.5, -1.6, 2.3, 0]);
        chai.expect(result).to.be.equal(3.3);
    });
})

mocha.describe('GET /ping', function () {
    mocha.it('it should ping and return status code 200', function (done) {
        request('http://localhost:5000/api/generic')
            .get('/ping')
            .expect(StatusCodes.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }

                done();
            });
    });
});

// mocha.describe('POST /add_datum', function () {
//     mocha.it('it should add datum and return status code 200', function (done) {
//         request('http://localhost:5000')
//             .post('/add_datum')
//             .send({ id: 10, info: 'dfads'})
//             .expect(StatusCodes.OK)
//             .end(function (err, res) {
//                 if (err) {
//                     done(err);
//                 }

//                 done();
//             });
//     });
// });