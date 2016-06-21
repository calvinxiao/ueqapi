/**
 * Created by calvin on 6/21/16.
 */

"use strict";

const Promise = require('bluebird');
const ueqapi = require('../');
const co = require('co');
const assert = require('assert');

let appkey = 'b0b940ef-1c55-4a4c-9d1e-2252de60ee18';
let token = '1af0e804-d791-4384-a5f8-f2cce57659c1';
let secret = '53a211e7-9edc-46bb-b5ee-f03c74fe7751';

describe('Testing ueqapi', function () {
    it('should get the express route info', function (done) {
        co(function* () {
            //111800002027
            let api = new ueqapi.Api({appkey: appkey, token: token, secret: secret});
            let expressCode = '111800002027';

            let expressResult = yield api.getExpressByCode(expressCode);
            assert(!!expressResult, 'return is null');
            assert(!!expressResult.response, 'response is null');
            assert(expressResult.response.code === '1', 'code is not "1"');
            assert(expressResult.response.expressRoute !== null, 'expressRoute is not null');
            //console.log(JSON.stringify(expressResult));
        }).then(done).catch(done);
    });

    it('should not get the express route info with wrong code', function (done) {
        co(function* () {
            //111800002027
            let api = new ueqapi.Api({appkey: appkey, token: token, secret: secret});
            let expressCode = 'calvinishandsome';

            let expressResult = yield api.getExpressByCode(expressCode);
            //console.log(JSON.stringify(expressResult));
            assert(!!expressResult, 'return is null');
            assert(!!expressResult.response, 'response is null');
            assert(expressResult.response.code === '1', 'code is not "1"');
            assert(expressResult.response.expressRoute === null, 'expressRoute is not null');
            //console.log(JSON.stringify(expressResult));
        }).then(done).catch(done);
    });
});
