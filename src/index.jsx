import React    from 'react';
import ReactDom from 'react-dom';
import App      from 'components/app';

function main() {
  const APP_ELEMENT = document.createElement('div');
  document.body.appendChild(APP_ELEMENT);
  ReactDom.render(<App />, APP_ELEMENT);
}

main();
