exports.handler = function(event, context, callback) {
  // ここに中身の処理を記述
  callback(null, {
    statusCode: 200,
    body: "Hello World"
  });
};
