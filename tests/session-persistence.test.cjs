const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

// Exercise the shipped component with a small hook host; no browser packages
// are needed to simulate an unmount and a fresh page reading the same storage.
const bundle = fs.readFileSync(path.join(__dirname, '../assets/index-BDg-rzyS.js'), 'utf8');
const app = bundle.slice(bundle.indexOf('function In('), bundle.indexOf('var Wl='));
const key = 'sudohint.session.v1';
const parse = text => Array.from({ length: 9 }, (_, r) =>
  text.slice(r * 9, r * 9 + 9).split('').map(value => Number(value) || null));
const puzzle = parse('530070000600195000098000060800060003400803001700020006060000280000419005000080079');
const solution = parse('534678912672195348198342567859761423426853791713924856961537284287419635345286179');
const plain = value => JSON.parse(JSON.stringify(value));
function storage() {
  const values = new Map();
  return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) };
}
function mount(localStorage, now = 1000000) {
  let cursor, dirty, tree, effects, clock = now;
  const slots = [], timeouts = [], intervals = new Map(), events = new Map();
  const depsChanged = (before, after) => !before || !after || after.some((v, i) => !Object.is(v, before[i]));
  const xe = {
    useState(initial) {
      const i = cursor++;
      if (!slots[i]) slots[i] = { value: typeof initial === 'function' ? initial() : initial };
      return [slots[i].value, next => {
        const value = typeof next === 'function' ? next(slots[i].value) : next;
        if (!Object.is(value, slots[i].value)) { slots[i].value = value; dirty = true; }
      }];
    },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial }; },
    useCallback(callback) { cursor++; return callback; },
    useEffect(callback, deps) {
      const i = cursor++;
      if (depsChanged(slots[i]?.deps, deps)) effects.push(() => {
        slots[i]?.cleanup?.();
        slots[i] = { deps, cleanup: callback() };
      });
    }
  };
  const jsx = (tag, props) => ({ tag, ...props });
  const window = { localStorage, setTimeout: callback => timeouts.push(callback),
    setInterval: callback => { const id = {}; intervals.set(id, callback); return id; },
    clearInterval: id => intervals.delete(id), addEventListener: (name, cb) => events.set(name, cb),
    removeEventListener: (name, cb) => { if (events.get(name) === cb) events.delete(name); } };
  const context = vm.createContext({ xe, g: { jsx, jsxs: jsx }, window, navigator: {},
    document: { documentElement: { setAttribute() {} } }, Date: { now: () => clock },
    setTimeout: window.setTimeout });
  vm.runInContext(app, context);
  function render() {
    let passes = 0;
    do {
      assert.ok(passes++ < 10, 'effects should settle');
      dirty = false; cursor = 0; effects = [];
      tree = context.ad();
      for (const effect of effects) effect();
    } while (dirty);
  }
  function nodes(node, result = []) {
    if (arguments.length === 0) node = tree;
    if (Array.isArray(node)) node.forEach(n => nodes(n, result));
    else if (node && typeof node === 'object') { result.push(node); nodes(node.children, result); }
    return result;
  }
  render();
  return { context, nodes, saved: () => JSON.parse(localStorage.getItem(key)),
    click(id) { const node = nodes().find(n => n['data-testid'] === id); assert.ok(node, id); node.onClick(); render(); },
    load(grid) { window.SudoHint.loadPuzzle(grid); render(); },
    flush() { while (timeouts.length) { timeouts.shift()(); render(); } },
    advance(seconds) { clock += seconds * 1000; for (const callback of intervals.values()) callback(); render(); },
    unmount() { for (const slot of slots) slot?.cleanup?.(); }
  };
}

test('a refresh restores imported clues, editable entries, notes, settings, and a paused timer', () => {
  const store = storage(), first = mount(store);
  assert.equal(store.getItem(key), null, 'idle mount must not overwrite a save');
  first.load(puzzle);
  first.click('diff-extreme');
  first.click('cell-0-2');
  first.click('numpad-4');
  first.click('cell-0-3');
  first.click('manual-pencil-toggle');
  first.click('numpad-6');
  first.advance(37);
  const saved = first.saved();
  assert.equal(saved.grid[0][2], 4);
  assert.equal(saved.givens[0][2], null);
  assert.deepEqual(saved.notes[0][3], [6]);
  first.unmount();
  const refreshed = mount(store, 9000000);
  assert.deepEqual(refreshed.saved(), saved);
  assert.ok(refreshed.nodes().find(n => n['data-testid'] === 'diff-extreme')['aria-pressed']);
  assert.match(refreshed.nodes().find(n => n['data-testid'] === 'cell-0-0').className, /state-given/);
  assert.match(refreshed.nodes().find(n => n['data-testid'] === 'cell-0-2').className, /state-filled/);
  refreshed.advance(2);
  assert.equal(refreshed.saved().elapsedSeconds, 39, 'time away should not inflate the timer');
  refreshed.click('manual-pencil-toggle');
  refreshed.click('cell-0-2');
  refreshed.click('numpad-clear');
  assert.equal(refreshed.saved().grid[0][2], null, 'restored entries remain editable');
});

test('candidate eliminations and manual removal marks survive refresh', () => {
  const store = storage(), first = mount(store);
  first.load(puzzle);
  first.click('toggle-candidates');
  first.click('manual-pencil-toggle');
  first.click('cell-0-2');
  first.click('numpad-1');
  const session = first.saved();
  assert.deepEqual(session.removed[0][2], [1]);
  // Persist an actual logical elimination separately from display-only marks.
  session.candidates[0][2] = session.candidates[0][2].filter(v => v !== 2);
  store.setItem(key, JSON.stringify(session));
  first.unmount();
  const refreshed = mount(store);
  assert.deepEqual(refreshed.saved(), session);
  assert.equal(refreshed.saved().candidates[0][2].includes(2), false);
});

test('generating a replacement and completing a puzzle persist across fresh mounts', () => {
  const store = storage(), first = mount(store);
  first.load(puzzle);
  first.click('diff-extreme');
  first.click('generate-btn');
  first.flush();
  const generated = first.saved();
  assert.notDeepEqual(generated.givens, puzzle);
  first.unmount();
  const refreshed = mount(store);
  assert.deepEqual(refreshed.saved().grid, generated.grid);
  const nearlyDone = solution.map(row => row.slice());
  nearlyDone[0][0] = null;
  refreshed.load(nearlyDone);
  refreshed.click('cell-0-0');
  refreshed.click('numpad-5');
  assert.equal(refreshed.saved().status, 'complete');
  refreshed.unmount();
  const completed = mount(store);
  assert.equal(completed.saved().status, 'complete');
  assert.ok(completed.nodes().some(n => n.className === 'complete-overlay'));
});

test('bad saves and blocked storage do not prevent starting or playing', () => {
  const base = storage(), first = mount(base);
  first.load(puzzle);
  const valid = first.saved();
  first.unmount();
  const corruptions = [
    s => { s.version = 99; }, s => { s.grid = [[5]]; },
    s => { s.grid[0][0] = 9; }, s => { s.notes[0][2] = [10]; },
    s => { s.candidates[0][2] = [5]; }, s => { s.solution[0][0] = null; },
    s => { s.status = 'complete'; }
  ];
  for (const corrupt of corruptions) {
    const store = storage(), saved = plain(valid); corrupt(saved);
    store.setItem(key, JSON.stringify(saved));
    const page = mount(store);
    assert.ok(!page.nodes().some(n => n['data-testid'] === 'cell-0-0'));
    page.load(puzzle);
    assert.deepEqual(page.saved().grid, puzzle);
  }
  for (const raw of ['{broken', 'null', '[]']) {
    const store = storage(); store.setItem(key, raw);
    assert.doesNotThrow(() => mount(store).load(puzzle));
  }
  const blocked = { getItem() { throw Error('disabled'); }, setItem() { throw Error('quota'); } };
  const page = mount(blocked);
  page.load(puzzle);
  page.click('cell-0-2'); page.click('numpad-4');
  assert.equal(page.context.window.SudoHint.getCurrentPuzzleString()[2], '4');
  assert.equal(mount(storage()).nodes().some(n => n['data-testid'] === 'cell-0-0'), false,
    'another browser storage profile must start independently');
});
