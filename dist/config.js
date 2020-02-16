'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

exports.default = {
    viewPath: (0, _path.join)(__dirname, '../views'),
    node_modules_path: (0, _path.join)(__dirname, '../node_modules'),
    public_path: (0, _path.join)(__dirname, '../public')
};