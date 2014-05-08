var assert     = require("assert")
,   fs         = require("fs")
,   mquery     = require("..")
,   Collection = mquery.Collection;

describe("Collection", function () {
  var collection = new Collection();

  describe("#insert", function () {
    it("should insert the given entry", function () {
      collection.insert({a: 1, b: 2});
      assert.deepEqual(collection[0], {a: 1, b: 2});
    });
    it("should insert all entries sent as arguments", function () {
      collection.insert({a: 3, b: 4}, {a: 5, b: 6});
      assert.deepEqual(collection[1], {a: 3, b: 4});
      assert.deepEqual(collection[2], {a: 5, b: 6});
    });
    it("should insert all entries in the array", function () {
      collection.insert([{a: 7, b: 8}, {a: 9, b: 10}]);
      assert.deepEqual(collection[3], {a: 7, b: 8});
      assert.deepEqual(collection[4], {a: 9, b: 10});
    });
  });

  describe("#removeEntries", function () {
    it("should remove the given entry", function () {
      collection.removeEntries(collection[0]);
      assert.deepEqual(collection[0], {a: 3, b: 4});
    });
    it("should remove all entries sent as arguments", function () {
      collection.removeEntries(collection[0], collection[1]);
      assert.deepEqual(collection[0], {a: 7, b: 8});
    });
    it("should remove all entries in the array", function () {
      collection.removeEntries([collection[0], collection[1]]);
      assert.equal(collection.length, 0);
    });
  });

  var users = new Collection(JSON.parse(fs.readFileSync("./test/source.json")));

  describe("#find", function () {
    describe("comparison operators", function () {
      it("should return the entries matching {gender: {$eq: 'female'}}", function () {
        var females = users.find({gender: {$eq: "female"}});
        assert.equal(females.length, 5);
        females.forEach(function (user) {
          assert.equal(user.gender, "female");
        });
      });
      it("should return the entries matching {gender: {$ne: 'female'}}", function () {
        var males = users.find({gender: {$ne: "female"}});
        assert.equal(males.length, 2);
        males.forEach(function (user) {
          assert.equal(user.gender, "male");
        });
      });
      it("should return the entries matching {age: {$gte: 30, $lte: 32}}", function () {
        var thirtyThirtyTwo = users.find({age: {$gte: 30, $lte: 32}});
        assert.equal(thirtyThirtyTwo.length, 3);
        thirtyThirtyTwo.forEach(function (user) {
          assert.equal(user.age >= 30 && user.age <= 32, true);
        });
      });
      it("should return the entries matching {age: {$gt: 32, $lt: 35}}", function () {
        var thirtyThirtyFive = users.find({age: {$gt: 30, $lt: 35}});
        assert.equal(thirtyThirtyFive.length, 2);
        thirtyThirtyFive.forEach(function (user) {
          assert.equal(user.age > 30 && user.age < 35, true);
        });
      });
    });
  });
});