// import {StrictMode} from 'react';
// import App from './App';

import {createRoot} from 'react-dom/client'; // imports createRoot method from the pkg || used for displaying content
// automatically installs babel and web pack
// const React = require('react'); // module for writing html elements & adding elements
const rootElement =  document.getElementById('root');
const ReactDom = createRoot(rootElement); // 2nd arg is optional options object
// 3 param -> code, where, callback
ReactDom.render(<h1>Hello World</h1>); // it replaces the content
