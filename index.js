/**
 * All apis return Promise, no more callback
 * Created by calvin on 6/21/16.
 */

"use strict";

const utils = require('./utils');
const moment = require('moment');
const _ = require('lodash');
const debug = require('debug')('ueqapi');
const querystring = require('querystring');
const requestPromise = require('request-promise');
//requestPromise.debug = true;
const co = require('co');

/**
 * constructor
 * @param options
 * @constructor
 */
function Api(options) {
    if (!options.appkey || !options.token || !options.secret) {
        throw new Error('[ueqapi] appkey, token和secret均不能为空');
    }

    let newOptions = {
        appkey: options.appkey,
        token: options.token,
        secret: options.secret,
        apiUrlPrefix: 'http://120.26.227.237:2020/ueq-openapi/openapi/handle' // for test
    };

    if (options.apiUrlPrefix) {
        newOptions.apiUrlPrefix = options.apiUrlPrefix;
    }

    this.options = newOptions;
}

/**
 * get sign
 * @param options
 * @returns {String}
 */
Api.prototype.sign = function (options) {
    debug(options);
    _.each(['format', 'method', 'params', 'timestamp'], key => {
        if (!options[key]) {
            throw new Error(`[ueqapi:sign] ${key}不能为空`);
        }
    });

    let originString = this.options.secret +
        options.appkey +
        options.format +
        options.method +
        options.params +
        options.timestamp +
        options.token +
        options.v +
        this.options.secret;

    debug({originString: originString});
    let md5String = utils.md5(originString);
    debug({md5String: md5String});
    let sign = utils.toBase64(md5String);
    debug({sign: sign});
    return sign;
};

/**
 * get default config
 * @returns {{format: string, v: string, timestamp: *, appkey: *, token: *}}
 */
Api.prototype.getDefaultOptions = function () {
    return {
        format: 'json',
        v: 'U1',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        appkey: this.options.appkey,
        token: this.options.token
    }
};

/**
 * build option helper
 * @param options
 * @returns {{format: string, v: string, timestamp: *, appkey: *, token: *}}
 */
Api.prototype.buildOptions = function (options) {
    _.each(['method', 'params'], key => {
        if (!options[key]) {
            throw new Error(`[ueqapi:sign] ${key}不能为空`);
        }
    });

    let defaultOption = this.getDefaultOptions();
    _.assign(defaultOption, options);
    return defaultOption;
};

/**
 * add order to ueq
 * @param orderObject, {}
 */
Api.prototype.addOrder = function (orderObject) {
    let options = {
        method: 'ueq.order.add',
        params: JSON.stringify(orderObject)
    };

    return this.request(options);

};

/**
 * get order info
 * @param orderId, 订单id
 */
Api.prototype.getOrder = function (orderId) {
    let options = {
        method: 'ueq.order.get',
        params: JSON.stringify({orderId: orderId})
    };

    return this.request(options);
};

/**
 * get order state
 * @param orderId, 订单id
 */
Api.prototype.getOrderState = function (orderId) {
    //ueq.orderstate.get
    let options = {
        method: 'ueq.orderstate.get',
        params: JSON.stringify({orderId: orderId})
    };

    return this.request(options);
};

/**
 * get order express delivery routes, by ueq express number
 * @param expressCode, 物流单号
 * @returns {Promise}
 */
Api.prototype.getExpressByCode = function (expressCode) {
    let options = {
        method: 'ueq.express.getByUeqExpressCode',
        params: JSON.stringify({ueqExpressCode: expressCode}),
    };

    return this.request(options);
};

/**
 * http helper with request-promise
 * @param options
 * @returns {Promise}
 */
Api.prototype.request = function(options) {
    options = this.buildOptions(options);
    let sign = this.sign(options);
    options.sign = sign;
    debug(JSON.stringify(options));
    let queryString = querystring.stringify(options);
    debug(queryString);
    return requestPromise({
        method: 'POST',
        uri: this.options.apiUrlPrefix,
        form: options,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept-Charset': 'utf-8'
        },
        json: true
    });
};

module.exports = {
    Api: Api
};
