import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@popperjs/core';
import 'bootstrap';
import 'perfect-scrollbar';
import './template/js/custom.js';
import './template/js/sidebarmenu.js';

import './styles/app.scss';

import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
