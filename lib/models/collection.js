/**
A Collection is a in-memory dataset where the objects rely to be managed.
*/

module.exports = Collection;

var query = require('../query');
var util = require('util');
util.inherits(Collection, Array);

/**
* Defines a collection
* @constructor
* @arg {Object[]} entries - Array of entries to insert in the collection after instantiation
*/
function Collection (entries) {
  if (entries && entries.length) {
    for (var i = 0; i < entries.length; i++) {
      this.insert(entries[i]);
    };
  };
};

/**
* @private
*/
Collection.prototype._getEntries = function() {
  if (!arguments.length) return [];
  if (arguments.length == 1 && Array.isArray(arguments[0])) {
    return arguments[0];
  } else {
    return arguments;
  };
};

/**
* Validates the given entry against the collection schema.
* @private
*/
Collection.prototype._validate = function(first_argument) {
  //TODO: Implement
  return;
};

/**
* Inserts the entries in the collection.
* @arg {(Object|...Object|Object[])} entry - an entry or an array of entries to insert.
* @returns {Boolean|Error} true if the entry was inserted or an error if it wasn't.
*/
Collection.prototype.insert = function () {
  var error
  ,   entries = this._getEntries.apply(this, arguments);

  for (var i = 0; i < entries.length; i++) {
    if (error = this._validate(entries[i])) return error;
    this.push(entries[i]);
  };

  return this;
};

/**
* Removes the entry or entries from the collection
* @arg {(Object|...Object|Object[])} entry - an entry or an array of entries to remove.
*/
Collection.prototype.removeEntries = function () {
  var index
  ,   entries = this._getEntries.apply(this, arguments);

  for (var i = 0; i < entries.length; i++) {
    if ((index = this.indexOf(entries[i])) != -1){
      this.splice(index, 1);
    };
  };

  return this;
};

/**
* Returns the entries matching the given criteria.
* @arg {Object} criteria - an object defining the find criteria.
* @returns {Object} collection
*/
Collection.prototype.find = function (criteria) {
  return new Collection(query(criteria, this));
};