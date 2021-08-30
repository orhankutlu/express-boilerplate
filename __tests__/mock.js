module.exports = {
  mockRequest: ({
    body = {},
    params = {}
  } = {}) => {
    const req = {};
    req.body = jest.fn().mockReturnValue(body);
    req.params = jest.fn().mockReturnValue(params);
    return req;
  },

  mockResponse: (respData = {}) => {
    const res = {};
    res.send = jest.fn().mockReturnValue(respData);
    res.status = jest.fn().mockReturnValue(respData);
    res.json = jest.fn().mockReturnValue(respData);
    res.ok = jest.fn().mockReturnValue(respData);
    res.redirect = jest.fn().mockReturnValue(respData);
    res.locals = {};
    return res;
  },
  mockNext: (returnVal = true) => jest.fn().mockReturnValue(returnVal)
};
