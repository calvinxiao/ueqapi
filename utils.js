/**
 * Created by calvin on 6/21/16.
 */
"use strict";

const crypto = require('crypto');

module.exports = {
    md5: str => {
        let hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex');
    },
    toBase64: str => {
        return new Buffer(str).toString('base64');
    }
};
