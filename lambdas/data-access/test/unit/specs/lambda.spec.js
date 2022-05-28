import sinon from 'sinon';
import { lambda, response } from '../../../config/settings';
import { handler } from '../../../src';
import router from '../../../src/router';

const env = JSON.stringify(lambda.Environment.Variables);

describe('lambda', () => {
  beforeAll(() => {
    process.env = JSON.parse(env);
  });

  it('should respond to preflight requests for allowed origins', (done) => {
    // trigger a proxy response
    process.env.AWS_EXECUTION_ENV = true;
    // define the mock request origin
    const source = 'https://some-site.morningstar.com';
    // a mock event object - see https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html#eventsources-api-gateway-request
    const event = {
      httpMethod: 'OPTIONS',
      headers: {
        Origin: source,
      },
    };
    // the second argument is "context" and doesn't concern us here
    handler(event, {}, (err, result) => {
      expect(err).toEqual(null);
      expect(result.statusCode).toEqual(200);
      expect(result.headers['Access-Control-Allow-Origin']).toEqual(source);
      done();
    });
  });

  it("should return 'true' for the 'Access-Control-Allow-Credentials' header", (done) => {
    // trigger a proxy response
    process.env.AWS_EXECUTION_ENV = true;

    const event = {
      httpMethod: 'OPTIONS',
      headers: {
        Origin: 'https://some-site.morningstar.com',
      },
    };

    handler(event, {}, (err, result) => {
      expect(err).toEqual(null);
      // the API needs to return "true" for this header before the
      // fetch protocol allows sending cookies
      expect(result.headers['Access-Control-Allow-Credentials']).toEqual('true');
      done();
    });
  });

  it('should reject CORS for non-whitelisted origins', (done) => {
    // trigger a proxy response
    process.env.AWS_EXECUTION_ENV = true;
    // this should be rejected
    const event = {
      httpMethod: 'OPTIONS',
      headers: {
        Origin: 'https://this.will.fail',
      },
    };

    handler(event, {}, (err, result) => {
      // errors are returned to the client in a proxy response
      expect(err).toEqual(null);
      expect(result.statusCode).toEqual(403);
      expect(JSON.parse(result.body)).toEqual('request origin is not valid');
      done();
    });
  });

  it('should skip the origin check if AWS_EXECUTION_ENV is not truthy', (done) => {
    process.env.AWS_EXECUTION_ENV = false;
    // the origin header should be ignored
    const event = {
      httpMethod: 'OPTIONS',
      headers: {
        Origin: 'http://who.cares',
      },
    };

    handler(event, {}, (err, result) => {
      expect(err).toEqual(null);
      expect(result).toMatchObject({
        body: JSON.stringify('access granted'),
        statusCode: 200,
        headers: response.headers,
      });
      done();
    });
  });

  it('should send an event payload to the router function', () => {
    const event = {
      httpMethod: 'GET',
      resource: '/resource',
      queryStringParameters: { a: 1, b: 2 },
    };

    sinon.stub(router, 'send').callsFake((resource, httpMethod, payload) => {
      expect(resource).toEqual('/resource');
      expect(httpMethod).toEqual('GET');
      expect(payload).toMatchObject({
        queryStringParameters: { a: 1, b: 2 },
      });
    });

    handler(event);
    router.send.restore();
  });

  it('should default pathParameters and queryStringParameters to empty objects', () => {
    const event = {
      httpMethod: 'GET',
      resource: '/resource',
    };

    sinon.stub(router, 'send').callsFake((resource, httpMethod, payload) => {
      expect(payload).toMatchObject({
        pathParameters: {},
        queryStringParameters: {},
      });
    });

    handler(event);
    router.send.restore();
  });
});
