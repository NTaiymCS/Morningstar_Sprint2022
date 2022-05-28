import settings from '../config/settings';

const defaultHeaders = JSON.stringify(settings.response.headers);

export function getHeaderValuesFrom(headers) {
  return (name) => {
    // make a case-insensitive regexp
    const key = new RegExp(name, 'i');
    // match case-insentitive headers
    return headers[
      Object.keys(headers).find((h) => h.match(key))
    ];
  };
}

// export a matching expression for validating request origins
export function getOriginMatchingExpression(origins) {
  // split the list of origins since it is a comma-separated string
  const list = origins.split(/,\s?/g);
  // leading stanza - check for https protocol
  const head = '^https:\\/\\/(.+?\\.)?(';
  // trailing stanza - capture ports for local development servers
  const tail = ')(\\:\\d{4})?(?!\\D+?)';
  // count the number of origins
  let { length } = list;
  // generate a regular expression string
  const exp = list.reduce((acc, str) => {
    // escape dots in the domain string
    const match = str.replace(/\./g, '\\$&');
    // insert an OR statement, if required
    const separator = --length ? '|' : '';
    // concat to the expression string
    return acc + match + separator;
  }, head) + tail;
  // return a case-insensetive RegExp object
  return new RegExp(exp, 'i');
}

// return the default set of response headers
export function getResponseHeaders() {
  // clone the headers object for this function invocation
  return JSON.parse(defaultHeaders);
}

// a custom error class constructor
export class StatusCodeException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
// this expects a binding to the first two arguments (callback, headers)
// in the Lambda handler, i.e. `const done = responseHandler.bind(null, callback, headers);`
// then, 'done' can act like a regular node-style callback function,
// with the addition of a third "status code" parameter.
// if the business logic returns an error, it should be an instance of StatusCodeException.
// Otherwise, use the "status" parameter to pass the response status code.
export function responseHandler(callback, headers, error, data, status = 200) {
  // format a JSON body
  const body = (() => {
    // reference an error message, if present
    const message = error ? error.message : data;
    // support preformatted JSON messages
    try {
      JSON.parse(message);
    } catch (e) {
      return JSON.stringify(message);
    }
    return message;
  })();
  // read the status code from a StatusCodeException, if present
  const statusCode = (() => {
    if (error) {
      return error.statusCode || 500;
    }
    return status;
  })();
  // capture the Lambda response object for our logs
  const response = {
    body,
    headers,
    statusCode,
  };
  // send the error message with the response
  return callback(null, response);
}
