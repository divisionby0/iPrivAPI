//var mapIterator = require('./MapIterator');
//var mapJsonEncoder = require('./MapJsonEncoder');
var Map = function (id) {
    var _that = this;
    _that.keys = new Array();
    
    if (id) {
        _that.id = id;
    }
    _that.items = {};

    var mapIterator = require("./MapIterator");
    
    this.removeKey = function(key){
        var index = this.keys.indexOf(key);
        _that.keys.splice(index, 1);
    };


    this.add = function (key, value) {
        var keyExists = _that.has(key);
        if (!keyExists) {
            _that.items[key] = value;
            _that.keys.push(key);
        }
        else {
            throw new Error(key + ' already exists');
        }
    };
    this.remove = function (key) {
        delete _that.items[key];
        // remove key
        _that.removeKey(key);
    };
    this.update = function (key, newValue) {
        var value = _that.get(key);
        if (value != undefined && value != null) {
            _that.items[key] = newValue;
        }
        else {
            console.error('Map error. No such element by key ' + key);
        }
    };
    this.clear = function () {
        _that.keys = new Array();
        _that.items = {};
    };
    this.has = function (key) {
        return key in _that.items;
    };
    this.get = function (key) {
        return _that.items[key];
    };
    this.getKeys = function () {
        return _that.keys;
    };
    this.size = function () {
        return _that.keys.length;
    };
    this.getIterator = function () {
        return new mapIterator.MapIterator(this);
    };
    this.setId = function (id) {
        _that.id = id;
    };
    this.getId = function () {
        return _that.id;
    };
    this.getEncoder = function () {
        return new mapJsonEncoder.MapJsonEncoder(_that);
    };
};
module.exports.Map = Map;