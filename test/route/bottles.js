'use strict';
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab  = module.exports.lab = Lab.script();

const Supertest = require('supertest');
const Express = require('express');
const BottlesRouter = require('../../routes/bottles.js').router;
const DB = require('../../db.js');

const describe = lab.describe;
const it = lab.it;

describe('bottles', () => {

    describe('list', () => {

        it('should return the list of bottles in database', (done) => {

            DB.initAll('bottles.list');
            const app = Express();
            app.use('/bottles', BottlesRouter);
            Supertest(app)
                .get('/bottles')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    expect(body).to.be.an.array();
                    expect(body).to.have.length(2);
                    done();
                });
        });
    });


    describe('id', () => {

        it('should return the bottle with the given id in database', (done) => {

            DB.initAll('bottles.id');
            const app = Express();
            app.use('/bottles', BottlesRouter);
            Supertest(app)
                .get('/bottles/1')
                .end((err, response) => {

                    if (err) {
                        return done(err);
                    }

                    const body = response.body;

                    expect(body.ID).to.equal(1);
                    expect(body).to.have.length(5);
                    expect(body.ID).to.be.a.number();
                    expect(body.BRAND).to.be.a.string();
                    expect(body.BRAND).to.equal('Desperados');

                    done();
                });
        });
    });
});
