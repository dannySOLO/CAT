import qs from 'query-string';

import configs from 'configs/configs';

const onErrors = [];

async function sendRequest(method, path, data = {}, header = {}) {
  let url = `${configs.apiBaseURL}${path}`;
  const opts = {
    method,
    header,
  };
  if (method === 'GET' || method === 'DELETE') {
    const query = qs.stringify(data);
    if (query) {
      url += `?${query}`;
    }
  } else {
    opts.header = { ...opts.header, 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, opts);
    const contentType = res.headers.get('content-type');
    let body;
    if (contentType && contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
    if (res.status === 200) {
      return body;
    }
    throw body;
  } catch (e) {
    if (e instanceof Error) {
      // eslint-disable-next-line
      e = {
        error: `${e}`,
        message: 'Something went wrong while sending API request',
      };
    }
    try {
      onErrors.forEach(c => c(e));
    } catch (e) {
      //
    }
    throw e;
  }
}

export default {
  GET(path, data = {}) {
    return sendRequest('GET', path, data);
  },
  POST(path, data = {}) {
    return sendRequest('POST', path, data);
  },
  PUT(path, data = {}) {
    return sendRequest('PUT', path, data);
  },
  DELETE(path, data = {}) {
    return sendRequest('DELETE', path, data);
  },
  onError(callback) {
    onErrors.push(callback);
  },
};