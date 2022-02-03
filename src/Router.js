const Router = {
  routes: [],
  route: '',
  params: [],
  getRoute: () => window.location.pathname.split('/')[1],
  getParams: () => window.location.pathname.split('/').slice(2),
  init: (routes) => {
    Router.routes = routes;
    const route = Router.getRoute();
    Router.route = Router.routes[route] ? route : '';
    Router.params = Router.getParams();
    window.onpopstate = () => Router.setRoute(Router.getRoute(), Router.getParams());
  },
  subscriptions: [],
  setRoute: (route, params) => {
    let url = window.location.origin + '/' + route;
    if (params) {
      url += '/' + params.join('/');
    }
    window.history.pushState('', '', url);
    Router.params = params;
    Router.route = Router.routes[route] ? route : '';
    Router.subscriptions.forEach(handler => handler());
  },
  subscribe: (handler) => {
    handler();
    Router.subscriptions.push(handler);
  }
};

export default Router;
