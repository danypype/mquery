var assert = require("assert")
,   mquery = require("..")
,   Collection = mquery.Collection;

describe("Collection", function () {
  var collection = new Collection();

  describe("#insert", function () {
    describe("insert one entry", function () {
      collection.insert({a: 1, b: 2});
      assert.deepEqual(collection[0], {a: 1, b: 2});
    });
    describe("insert multiple entries", function () {
      describe("insert sending multiple arguments", function () {
        collection.insert({a: 3, b: 4}, {a: 5, b: 6});
        assert.deepEqual(collection[1], {a: 3, b: 4});
        assert.deepEqual(collection[2], {a: 5, b: 6});
      });
      describe("insert sending an array", function () {
        collection.insert([{a: 7, b: 8}, {a: 9, b: 10}]);
        assert.deepEqual(collection[3], {a: 7, b: 8});
        assert.deepEqual(collection[4], {a: 9, b: 10});
      });
    });
  });

  describe("#removeEntries", function () {
    describe("remove one entry", function () {
      collection.removeEntries(collection[0]);
      assert.deepEqual(collection[0], {a: 3, b: 4});
    });
    describe("remove multiple entries", function () {
      describe("remove sending multiple arguments", function () {
        collection.removeEntries(collection[0], collection[1]);
        assert.deepEqual(collection[0], {a: 7, b: 8});
      });
      describe("remove sending an array", function (argument) {
        collection.removeEntries([collection[0], collection[1]]);
        assert.equal(collection.length, 0);
      });
    });
  });
});