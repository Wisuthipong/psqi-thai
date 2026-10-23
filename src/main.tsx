import React from 'react';
import {createRoot} from 'react-dom/client';
import Assessment from './features/psqi/Assessment';
import './styles.css';
import './print.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><Assessment/></React.StrictMode>);
