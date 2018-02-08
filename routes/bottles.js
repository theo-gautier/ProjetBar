'use strict';
const Express = require('express');
const Joi = require('joi');
const Celebrate = require('celebrate');

const DB = require('../db.js');

const router = Express.Router();

router.get('/', (req, res, next) => {

    console.log('GET /bottles');
    DB.all('SELECT * FROM BOTTLES', (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

router.get('/:id', (req, res, next) => {

    DB.get('SELECT * FROM BOTTLES WHERE ID = ?', [req.params.id], (err, data) => {

        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

router.post('/', Celebrate.celebrate(
    {
        body: Joi.object().keys({
            brand: Joi.string().required(),
            price: Joi.number().required(),
            volume: Joi.number().required(),
            count: Joi.number().required(),
        })
    }
    ),
    (req, res, next) => {

        console.log('INSERT new bottle of brand ' + req.body.brand);
        DB.run('INSERT INTO BOTTLES (BRAND, PRICE, VOLUME, COUNT) VALUES (?,?,?, ?)',
                [req.body.brand, req.body.price, req.body.volume, req.body.count], (err) => {

            if (err) {
                return next(err);
            }
            res.status(201);
            res.end();
        });
    });

router.patch('/:id', (req, res, next) => {

    DB.run('UPDATE BOTTLES SET COUNT=? WHERE ID = ?', [req.body.count, req.params.id], (err) =>{

        if (err) {
            return next(err);
        }
        res.end();
    });
});

router.delete('/:id', (req, res, next) => {

    DB.run('DELETE FROM BOTTLES WHERE ID = ?', [req.params.id], (err) => {

        if (err) {
            return next(err);
        }
        return res.end();
    });
});


module.exports.router = router;
