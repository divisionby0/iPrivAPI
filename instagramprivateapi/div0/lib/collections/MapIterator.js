var MapIterator = function (_collection) {

    var _that = this;
    this.counter = -1;
    this.collection = _collection;
    this.keys = this.collection.getKeys();
    

    this.hasNext = function () {
        var nextIndex = _that.counter + 1;
        if (nextIndex < _that.keys.length) {
            return true;
        }
        else {
            return false;
        }
    };
    this.next = function () {
        _that.counter += 1;
        var key = _that.keys[_that.counter];
        return _that.collection.get(key);
    };
    this.size = function () {
        return _that.keys.length;
    };
};
module.exports.MapIterator = MapIterator;