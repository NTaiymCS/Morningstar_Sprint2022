import router from '../../../src/router';

describe('router', () => {
  it('should respond to GET requests to /resource', (done) => {
    const payload = {
      queryStringParameters: {
        a: 1,
        b: 2,
      },
    };

    router.send('/resource', 'GET', payload, (error, data) => {
      expect(error).toEqual(null);
      expect(data).toEqual(3);
      done();
    });
  });

  it('should respond to the PUT requests to /resource/{resourceId}', (done) => {
    const payload = {
      pathParameters: {
        resourceId: 'something',
      },
    };

    router.send('/resource/{resourceId}', 'PUT', payload, (error, data) => {
      expect(error).toEqual(null);
      expect(data).toEqual('gnihtemos');
      done();
    });
  });

  it('should throw an exception if the resource is not valid', () => {
    function test() { router.send('/whatever'); }
    expect(test).toThrow('\'/whatever\' is not recognized');
  });

  it('should throw an exception if the resource does not respond to the provided httpMethod', () => {
    function test() { router.send('/resource', 'DELETE'); }
    expect(test).toThrow('DELETE requests are not accepted by \'/resource\'');
  });
});
