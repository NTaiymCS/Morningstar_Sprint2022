import { StatusCodeException } from './utils';
import * as business from './lib';
// this is exported as an object to allow stubbing in tests.
export default {
  // please note that not all Lambda functions will require a "router" interface.
  // this is handy if the Lambda is set up to handle requests to multiple resources,
  // and / or multiple HTTP verbs. it's a good place to handle interface errors,
  // and a buffer separating business logic code from the Lambda handler.
  send(resource, httpMethod, payload, callback) {
    // in this case, we're switching on the resource path.
    // the way this is written should reflect the API interface for the Lambda,
    // which may or may not be handling multiple routes or http methods.
    const handler = (() => {
      switch (resource) {
        // map HTTP verbs to business logic handlers
        case '/resource': {
          return {
            GET: business.read,
          };
        }
        case '/resource/{resourceId}': {
          return {
            PUT: business.update,
          };
        }
      }
    })();

    if (!handler) {
      throw new StatusCodeException(`'${resource}' is not recognized`, 400);
    }

    if (!handler[httpMethod]) {
      throw new StatusCodeException(`${httpMethod} requests are not accepted by '${resource}'`, 400);
    }
    // send the request payload and callback to the handler function
    return handler[httpMethod](payload, callback);
  },
};
