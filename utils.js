/**
 * Created by calvin on 6/21/16.
 */
"use strict";

const crypto = require('crypto');
const nodeMd5 = require('md5');

module.exports = {
    md5: str => {
        return nodeMd5(str);
    },
    toBase64: str => {
        return new Buffer(str).toString('base64');
    }
};
