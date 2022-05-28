// these functions are invoked by the httpMethodHandler
export function read(payload, callback) {
  // the payload contains all of the relevant event data received by Lambda
  const {
    queryStringParameters: { a, b },
  } = payload;
  // the callback accepts an optional third parameter for statusCode (default 200);
  callback(null, a + b, 200);
}

export function update(payload, callback) {
  const {
    pathParameters: { resourceId },
  } = payload;

  callback(null, Array.from(resourceId).reverse().join(''), 201);
}
