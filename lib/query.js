module.exports = query;

function _getValue (key, entry) {
  var keys = key.split(".");
  var value = entry;
  for (var i = 0; i < keys.length; i++) {
    value = value[keys[i]];
  };
  return value;
};

/**Operators*/
var operators = {
  /**Comparison operators*/
  comparison: {
    /**Equal*/
    $eq: function (key, value, collection) {
      return collection.filter(function (entry) {
        return _getValue(key, entry) == value;
      });
    },
    /**Not equal*/
    $ne: function (key, value, collection) {
      return collection.filter(function (entry) {
        return _getValue(key, entry) != value;
      });
    },
    /**Greater than*/
    $gt: function (key, value, collection) {
      return collection.filter(function (entry) {
        return _getValue(key, entry) > value;
      });
    },
    /*Greater than or equal*/
    $gte: function (key, value, collection) {
      return collection.filter(function (entry) {
        return _getValue(key, entry) >= value;
      });
    },
    /**Less than*/
    $lt: function (key, value, collection) {
      return collection.filter(function (entry) {
        return _getValue(key, entry) < value;
      });
    },
    /**Less than or equal*/
    $lte: function (key, value, collection) {
      return collection.filter(function (entry) {
        return _getValue(key, entry) <= value;
      });
    }
  },

  /**Logical operators*/
  logical: {
    /**And*/
    $and: function () {
      // body...
    },
    /**Or*/
    $or: function () {
      // body...
    }
  },

  /**Functional operators*/
  inclusion: {
    $in: function (argument) {
      // body...
    }
  },

  isComparison: function (operator) {
    return this.comparison[operator] ? true : false;
  },
  isLogical: function (operator) {
    return this.logical[operator] ? true : false;
  },
  isInclusion: function (operator) {
    return false;
    //TODO: Implement
  }
};

function query (criteria, collection) {
  for (key in criteria) {
    if (operators.isLogical(key)) {
      //TODO: Implement
    } else if (operators.isInclusion(key)) {
      //TODO: Implement
    } else if (typeof criteria[key] == "object") {
      for (_key in criteria[key]) {
        if (!operators.isComparison(_key)){
          throw new Error("Syntax error at " + JSON.stringify(criteria))
        };
        collection = operators.comparison[_key](key, criteria[key][_key], collection);
      };
    } else {
      collection = operators.comparison.$eq(key, criteria[key], collection);
    };
  };

  return collection;
};