import test from 'ava';

import { intensifyCSS } from './utils.js';

test('intensifyCSS', t => {
  let str;

  str = `
body {
  background: red;
  color: orange;
}
  `.trim();
  t.is(intensifyCSS(str), `
body {
  background: red !important;
  color: orange !important;
}
  `.trim());

  str = `
body {
  color: orange;
}
  `.trim();
  t.is(intensifyCSS(str), `
body {
  color: orange !important;
}
  `.trim());

  str = `
body {
  background: red;
  color: orange;
}

.someClass p {
  line-height: 1.5;

  background: calc(10px + 20%);
}

.someClass > p:after {
  content: '';
  position: absolute;
  box-shadow: 1px white;
}
  `.trim();
  t.is(intensifyCSS(str), `
body {
  background: red !important;
  color: orange !important;
}

.someClass p {
  line-height: 1.5 !important;

  background: calc(10px + 20%) !important;
}

.someClass > p:after {
  content: '' !important;
  position: absolute !important;
  box-shadow: 1px white !important;
}
  `.trim());

  // No double important
  str = `
body {
  background: red;
  color: orange !important;
  border: 1px solid orange !important       ; // Malformed
  line-height: 1.2;
}
  `.trim();
  t.is(intensifyCSS(str), `
body {
  background: red !important;
  color: orange !important;
  border: 1px solid orange !important; // Malformed
  line-height: 1.2 !important;
}
  `.trim());
});
