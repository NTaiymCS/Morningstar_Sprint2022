module.exports = {
  /*
        this is a handy way to invoke AWS client services - pass a config object
        with the client name, method, and params; get a promisified result
    */
  invoke({ client, method, params }) {
    return new Promise((resolve, reject) => {
      client[method](params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  },
  /*
        it's only a matter of time before you encounter race conditions when
        creating/destroying AWS resources - it's nice to have a simply "rety"
        mechanism, that is promise-aware, to pair with the above - pass this
        a "bound" promise, a delay time, and a number of attempts. A promise
        is re-tryable only if _all_ of its arguments are bound prior to being
        passed to this function.
    */
  retry(prm, delay, attempts) {
    return new Promise((resolve, reject) => {
      function iterate() {
        prm()
          .then(resolve)
          .catch((err) => {
            if (attempts--) {
              /* eslint-disable-next-line no-console */
              console.log(`retrying... ${attempts} attempts remaining`);
              setTimeout(iterate, delay);
            } else {
              reject(err);
            }
          });
      }
      iterate();
    });
  },
};
