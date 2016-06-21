/**
 * Created by calvin on 6/21/16.
 */

"use strict";

const utils = require('../utils');
const assert = require('assert');

describe('Testing utils', function() {
   it('should output correct md5', function(done) {
       let origin = '123456';
       let expect = 'e10adc3949ba59abbe56e057f20f883e';
       let actual = utils.md5(origin);
       assert(expect === actual, `wrong md5 ${JSON.stringify({actual: actual, expect: expect})}`);
       done();
   });

    it('should output correct base64 string', function(done) {
        let origin = '123456';
        let expect = 'MTIzNDU2';
        let actual = utils.toBase64(origin);
        assert(expect === actual, `wrong base ${JSON.stringify({actual: actual, expect: expect})}`);
        done();
    })
});