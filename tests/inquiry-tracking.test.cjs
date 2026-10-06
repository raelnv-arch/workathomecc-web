const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(filename, globals = {}, imports = {}) {
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(source, {
    module, exports: module.exports, URL, URLSearchParams,
    require: name => imports[name] || require(name), ...globals,
  }, { filename });
  return module.exports;
}

test('events require consent and the public website; event payloads omit submitted information', () => {
  let choice = null;
  const events = [];
  const window = { location: { hostname: 'www.workathomecc.com', pathname: '/' }, gtag: (...args) => events.push(args) };
  const analytics = load('app/analytics.ts', { window, localStorage: { getItem: () => choice } });
  analytics.trackInquiryEvent('generate_lead', { contact_method: 'consultation_form', email: 'private@example.com' });
  choice = 'declined';
  analytics.trackInquiryEvent('generate_lead', { contact_method: 'consultation_form' });
  choice = 'accepted';
  window.location.hostname = '127.0.0.1';
  analytics.trackInquiryEvent('generate_lead', { contact_method: 'consultation_form' });
  assert.equal(events.length, 0);
  window.location.hostname = 'www.workathomecc.com';
  analytics.trackInquiryEvent('generate_lead', { contact_method: 'consultation_form' });
  assert.equal(events.length, 1);
  assert.deepEqual(Object.keys(events[0][2]).sort(), ['contact_method', 'inquiry_type', 'page_path', 'transport_type']);
  window.gtag = () => { throw new Error('Blocked analytics'); };
  assert.doesNotThrow(() => analytics.trackInquiryEvent('generate_lead', { contact_method: 'consultation_form' }));
});

test('page locations retain marketing attribution but remove arbitrary query fields and hashes', () => {
  const analytics = load('app/analytics.ts', { window: { location: {
    origin: 'https://www.workathomecc.com', pathname: '/tijuana-call-center',
    search: '?email=private%40example.com&message=private&utm_source=newsletter&utm_medium=email',
  } } });
  assert.equal(analytics.analyticsPageLocation(), 'https://www.workathomecc.com/tijuana-call-center?utm_source=newsletter&utm_medium=email');
});

function formHarness(fetch) {
  const states = [];
  const events = [];
  let resets = 0;
  const component = load('app/ConsultationForm.tsx', {
    fetch,
    FormData: class { constructor(form) { this.form = form; } },
  }, {
    react: { useRef: value => ({ current: value }), useState: () => ['idle', value => states.push(value)] },
    './analytics': { trackInquiryEvent: (...args) => events.push(args) },
  }).default;
  const element = component();
  const form = { action: 'https://formspree.io/f/meelndov', reset: () => resets++ };
  return { submit: () => element.props.onSubmit({ preventDefault() {}, currentTarget: form }), states, events, resets: () => resets };
}

test('confirmed submission emits one lead; duplicate clicks while pending are suppressed', async () => {
  let resolve;
  let requests = 0;
  const harness = formHarness((url, options) => {
    requests++;
    assert.equal(url, 'https://formspree.io/f/meelndov');
    assert.equal(options.headers.Accept, 'application/json');
    return new Promise(done => { resolve = done; });
  });
  const submission = harness.submit();
  await harness.submit();
  assert.equal(requests, 1);
  assert.equal(harness.events.length, 0);
  resolve({ ok: true });
  await submission;
  assert.equal(harness.events.length, 1);
  assert.equal(harness.events[0][0], 'generate_lead');
  assert.equal(harness.resets(), 1);
  assert.deepEqual(harness.states, ['sending', 'success']);
});

test('server rejection or a network failure preserves entries and never counts a lead', async () => {
  for (const fetch of [async () => ({ ok: false }), async () => { throw new Error('Offline'); }]) {
    const harness = formHarness(fetch);
    await harness.submit();
    assert.equal(harness.events.length, 0);
    assert.equal(harness.resets(), 0);
    assert.deepEqual(harness.states, ['sending', 'error']);
  }
});
