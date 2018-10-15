import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

import BoardComponent from './client/components/board';

ReactDOM.render(
	<React.Fragment>
		<BoardComponent />
	</React.Fragment>,
	document.getElementById('root')
);
