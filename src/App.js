import React from 'react';
import Layouts from './views/layout';

import { Route, Switch } from 'react-router-dom';
import routers from './router/index.js';

const App = () => {
	return (
		<Switch>
			<Layouts>
				{routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
			</Layouts>
		</Switch>
	);
};
export default App;
