const Repository = {
  API_URL: 'http://localhost:8081/',
  request: (action, params) => fetch(Repository.API_URL, { method: 'POST', body: JSON.stringify({ action, params }) }).then(response => response.json()),
  getList: params => Repository.request('get', params),
  getItem: id => Repository.request('get', { id }),
  add: item => Repository.request('add', item),
  update: item => Repository.request('update', item),
  delete: id => Repository.request('delete', { id })
};

export default Repository;
