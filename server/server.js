const http = require('http');

let list = [];

const nextId = () => Math.max(0, ...list.map(x => x.id)) + 1;

const actions = {
  get: (p) => list.filter(x => Object.keys(p).reduce((a, c) => (p[c] === x[c]) && a, true)),
  delete: (p) => list = list.filter(x => [x.id, x.parent, x.from, x.to].indexOf(p.id) < 0),
  add: (p) => list.push({ ...{ id: nextId() }, ...p }),
  update: (p) => {
    const item = list.find(x => x.id === p.id);
    Object.entries(p).forEach(([key, value]) => item[key] = value);
    return item;
  }
}

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
  res.writeHead(200, headers);
  req.on('data', (data) => {
    let request = JSON.parse(data.toString());
    const response = actions[request.action](request.params);
    res.end(JSON.stringify(response));
  });
};

const server = http.createServer(requestListener);
server.listen(8081);
