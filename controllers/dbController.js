var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var ConnectionPool = require("tedious-connection-pool");

// Avoiding concurrent SQL SERVER calls
var poolConfig = {
  min: 1,
  max: 1,
  log: true
};

// Edit this config
var connectionConfig = {
  userName: "sa",
  password: "clickhere2018",
  server: '192.168.2.102',
  options: {
    rowCollectionOnDone: true, // Only get row set instead of row by row
    useColumnNames: true // For easier JSON formatting
  }
};

var _rows = [];

var pool = new ConnectionPool(poolConfig, connectionConfig);

pool.on("error", function(err) {
  console.error(err);
});

var _rows = [];

const query = (params, sql, callback) => {
  pool.acquire((err, connection) => {
    request = new Request(sql, (err, rowCount) => {
      if (err) {
        console.log(err);
        return;
      }
      connection.release();
    });

    if (params.length > 0) {
      params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
      });
    }

    _rows = [];

    request.on("row", columns => {
      var _item = {};
      // Converting the response row to a JSON formatted object: [property]: value
      for (var name in columns) {
        _item[name] = columns[name].value;
      }
      _rows.push(_item);
    });

    // We return the set of rows after the query is complete, instead of returing row by row
    request.on("doneInProc", (rowCount, more, rows) => {
      callback(_rows);
    });

    connection.execSql(request);
  });
};

const proc = (params, sql, callback) => {
  pool.acquire((err, connection) => {
    request = new Request(sql, (err, rowCount) => {
      if (err) {
        console.log(err);
        return;
      }
      connection.release();
    });

    if (params.length > 0) {
      params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
      });
    }

    _rows = [];

    request.on("row", columns => {
      var _item = {};
      // Converting the response row to a JSON formatted object: [property]: value
      for (var name in columns) {
        _item[name] = columns[name].value;
      }
      _rows.push(_item);
    });

    // We return the set of rows after the procedure is complete, instead of returing row by row
    request.on("doneProc", (rowCount, more, rows) => {
      callback(_rows);
    });

    connection.callProcedure(request);
  });
};

const buildParams = (params, name, type, value) => {
  params.push({
    name: name,
    type: type,
    value: value
  });
};

module.exports = {
  buildParams: buildParams,
  query: query,
  proc: proc
};