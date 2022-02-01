import Home from './components/Home.vue'
import Help from './components/Help.vue'
import Chart from './components/Chart.vue'

const routes = {
  '': Home,
  '/': Home,
  'home': Home,
  'help': Help,
  'chart': Chart
};

export default routes;
