import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import Provider from 'react-redux/lib/components/Provider';

import configureStore from './store/index';
import { setDataTree, setNodes, setBranches } from './actions/index';
import { getRoutes } from './routing';
import { processTree } from './util/visualizer';
import { prepareTree, convertTreeToNode } from './util/parser';
import jsonData from '../dist/cs-structure.json';

const store = configureStore();
const dataTreeRoot = prepareTree(jsonData);
const normalizedData = processTree({ root: dataTreeRoot });

store.dispatch(setDataTree(convertTreeToNode(dataTreeRoot)));
store.dispatch(setNodes(normalizedData.get('nodes')));
store.dispatch(setBranches(normalizedData.get('branches')));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{getRoutes()}</Router>
  </Provider>,
  document.getElementById('app')
);
