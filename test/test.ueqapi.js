/**
 * Created by calvin on 6/21/16.
 */

"use strict";

const Promise = require('bluebird');
const ueqapi = require('../');
const co = require('co');
const assert = require('assert');
const moment = require('moment');
const debug = require('debug')('ueqapi');

let appkey = 'b0b940ef-1c55-4a4c-9d1e-2252de60ee18';
let token = '1af0e804-d791-4384-a5f8-f2cce57659c1';
let secret = '53a211e7-9edc-46bb-b5ee-f03c74fe7751';

describe('Testing ueqapi', function () {
    let api = new ueqapi.Api({appkey: appkey, token: token, secret: secret});

    it('should get the express route info', function (done) {
        co(function* () {
            //111800002027
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

    it('should get the order info', function (done) {
        co(function* () {
            let orderId = 'Z2106110001';
            let result = yield api.getOrder(orderId);
            //console.log(JSON.stringify(result));
        }).then(done).catch(done);
    });

    it('should get the order state', function (done) {
        co(function* () {
            let orderId = 'Z2106110001';
            let result = yield api.getOrderState(orderId);
            //console.log(JSON.stringify(result));
        }).then(done).catch(done);
    });

    it('should add order correctly', function (done) {
        this.timeout(10000);
        co(function* () {
            //let orderInfo = {
            //    orderId: Math.random().toString(36).slice(3),
            //    orderDate: moment().format('YYYY-MM-DD'),
            //    name: '玉树临',
            //    province: '广东省',
            //    city: '湛江市',
            //    area: '蓬江区',
            //    addr: '上山打老虎',
            //    //zipCode: '510000',
            //    cardType: '0',
            //    cardNo: '370211198106134438',
            //    phone: '13800138000',
            //    total: 0.99,
            //    freight: 3.14,
            //    insuredFee: 6.66,
            //    portCode: '5141',
            //    busiMode: 'BC',
            //    whCode: 'UHKC3',
            //    isinsure: 'N',
            //    isdelayinsure: 'N',
            //    expressCode: '',
            //    extraInfoList: {
            //        extraInfos: []
            //    },
            //    orderItemList: {
            //        orderItems: [{
            //            productId: '8712400110044',
            //            productName: '疯狂桔子索亚D系列食碗食盆水碗绿色特大号',
            //            qty: 1,
            //            price: 3,
            //            total: 3
            //        }]
            //    }
            //};
            let orderInfo = {
                "addr": "朝阳区XXX",
                "area": "朝阳区",
                "busiMode": "BC",
                "cardNo": "41132819811229002X",
                "cardType": "0",
                "city": "北京市",
                "expressCode": "",
                "extraInfoList": {
                    "extraInfos": []
                },
                "freight": 20,
                "insuredFee": 302,
                "name": "李香便",
                "orderDate": "2015-07-23",
                "orderId": "SFH1234567878A",
                "isdelayinsure": "Y",
                "insureamount": "111",
                "isinsure": "Y",
                "orderItemList": {
                    "orderItems": [
                        {
                            "price": 50,
                            "productId": "8712400110044",
                            "productName": "荷兰Nutrilon  牛栏婴儿4段800g/罐",
                            "qty": 2,
                            "total": 100
                        },
                        {
                            "price": 50,
                            "productId": "8712400111096",
                            "productName": "荷兰Nutrilon  牛栏婴儿4段800g/罐",
                            "qty": 2,
                            "total": 100
                        },
                        {
                            "price": 179,
                            "productId": "4901301230881",
                            "productName": "荷兰Nutrilon  牛栏婴儿4段800g/罐",
                            "qty": 2,
                            "total": 358
                        },
                        {
                            "price": 179,
                            "productId": "4901301230843",
                            "productName": "荷兰Nutrilon  牛栏婴儿4段800g/罐",
                            "qty": 2,
                            "total": 358
                        }
                    ]
                },
                "phone": "13569249312",
                "portCode": "5141",
                "province": "北京市",
                "total": 916,
                "whCode": "UHKC3"
            };
            let result = yield api.addOrder(orderInfo);
            //console.log(JSON.stringify(result));
            //console.log(result.response);

            assert(!!result, 'return is null');
            assert(!!result.response, 'response is null');
            assert(result.response.code === '1', 'code is not "1"');

        }).then(done).catch(done);
    });

});
