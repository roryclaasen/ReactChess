import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'normalize.css';
import './client/index.scss';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainApp from './client/components/app';

const theme = createMuiTheme({
	typography: {
		useNextVariants: true
		// fontFamily: '\'Roboto Slab\', serif'
	},
	palette: {
		primary: {
			light: '#757de8',
			main: '#3f51b5',
			dark: '#002984',
			contrastText: '#fff'
		},
		secondary: {
			light: '#fff350',
			main: '#ffc107',
			dark: '#c79100',
			contrastText: '#000'
		}
	}
});

ReactDOM.render(
	<React.Fragment>
		<CssBaseline />
		<MuiThemeProvider theme={theme}>
			<MainApp />
		</MuiThemeProvider>
	</React.Fragment>,
	document.getElementById('root')
);
