import settings from '../../../config/settings';
import {
  getHeaderValuesFrom,
  getResponseHeaders,
  getOriginMatchingExpression,
  StatusCodeException,
  responseHandler,
} from '../../../src/utils';

describe('utils', () => {
  it('should return an accessor for header values from getHeaderValuesFrom', () => {
    const origin = 'https://morningstar.com';
    const event = { headers: {} };
    // the function should be case insensitive
    event.headers.origin = origin;
    expect(getHeaderValuesFrom(event.headers)('origin')).toEqual(origin);
    delete event.headers.origin;
    event.headers.Origin = origin;
    expect(getHeaderValuesFrom(event.headers)('origin')).toEqual(origin);
  });

  it('should return a clean set of response headers from getResponseHeaders', () => {
    const resHeaders = getResponseHeaders();
    expect(resHeaders).toMatchObject(settings.response.headers);
    resHeaders['X-API-RequestId'] = 'something';
    expect(settings.response.headers).not.toHaveProperty('X-API-RequestId');
    expect(getResponseHeaders()).not.toHaveProperty('X-API-RequestId');
  });

  it('should return an regular expression for matching request origin headers from getOriginMatchingExpression', () => {
    const multiOrigin = getOriginMatchingExpression('a.b,c.d');
    expect(multiOrigin.test('https://a.b')).toEqual(true);
    expect(multiOrigin.test('https://c.d')).toEqual(true);
    expect(multiOrigin.test('http://a.b')).toEqual(false);
    expect(multiOrigin.test('https://e.f')).toEqual(false);
    expect(getOriginMatchingExpression('e.f').test('https://e.f:8443')).toEqual(true);
  });

  it('should instantiate an Error subclass with "statusCode" property from StatusCodeException', () => {
    const statusException = new StatusCodeException('I\'m a teapot', 418);
    expect(statusException).toBeInstanceOf(StatusCodeException);
    expect(statusException.message).toEqual('I\'m a teapot');
    expect(statusException.statusCode).toEqual(418);
  });

  it('should return a well-formed Lambda proxy-integration response from responseHandler', () => {
    const errorTest = (error, data) => {
      expect(error).toEqual(null);
      expect(data).toMatchObject({
        body: JSON.stringify('I\'m a teapot'),
        headers: { foo: 'bar' },
        statusCode: 418,
      });
    };
    const dataTest = (error, data) => {
      expect(error).toEqual(null);
      expect(data).toMatchObject({
        body: JSON.stringify('whatever'),
        headers: { boom: 'bap' },
        statusCode: 200,
      });
    };
    const jsonErrorTest = (error, data) => {
      expect(error).toEqual(null);
      expect(data).toMatchObject({
        body: JSON.stringify('this is getting out of hand'),
        headers: { fizz: 'buzz' },
        statusCode: 500,
      });
    };
    const jsonData = JSON.stringify({ who: 'what', when: 'where' });
    const jsonTest = (error, data) => {
      expect(error).toEqual(null);
      expect(data).toMatchObject({
        body: jsonData,
        headers: { ooka: 'chocka' },
        statusCode: 100,
      });
    };

    responseHandler(errorTest, { foo: 'bar' }, new StatusCodeException('I\'m a teapot', 418));
    responseHandler(dataTest, { boom: 'bap' }, null, 'whatever');
    responseHandler(jsonErrorTest, { fizz: 'buzz' }, new Error('this is getting out of hand'));
    responseHandler(jsonTest, { ooka: 'chocka' }, null, jsonData, 100);
  });
});
