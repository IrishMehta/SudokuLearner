const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

// Optional browser regression: install Playwright (with Chromium), or expose an
// existing installation through NODE_PATH, then run this file with node --test.
let chromium;
try { ({ chromium } = require('playwright')); } catch {}

test('Apply & Next preserves the React tree across hint types', {
  skip: !chromium && 'Playwright is required for the browser regression',
  timeout: 120000
}, async t => {
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());
  const root = path.resolve(__dirname, '..');
  for (const difficulty of ['medium', 'hard', 'extreme']) {
    await t.test(difficulty, async () => {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        // Serve only the local build. No server, user profile, or network is used.
        await page.route('http://sudohint.test/**', route => {
          const relative = new URL(route.request().url()).pathname.slice(1) || 'index.html';
          const file = path.resolve(root, relative);
          if (!file.startsWith(root + path.sep)) return route.abort();
          return route.fulfill({ path: file });
        });
        await page.addInitScript(() => {
          let seed = 123456789;
          Math.random = () => {
            seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
            return (seed >>> 0) / 4294967296;
          };
        });
        await page.goto('http://sudohint.test/');
        await page.getByTestId('diff-' + difficulty).click();
        await page.getByTestId('generate-btn').click();
        await page.getByTestId('hint-btn').click();
        const techniques = new Set();
        let applied = 0;
        while (await page.locator('.apply-next-btn').count()) {
          assert.ok(applied++ < 200, 'each hint must make progress');
          techniques.add(await page.locator('.hint-technique').innerText());
          assert.equal(await page.locator('.sudohint-hint-key-title').count(), 1);
          assert.equal(await page.locator('.hint-legend .given-dot').count(), 1);
          const placing = await page.locator('.hint-digit').count();
          const targetLabel = page.locator('.hint-legend .legend-item:has(.target-dot) span:last-child');
          assert.equal(await targetLabel.innerText(), placing ? 'Place this digit' : 'Key pattern cells');
          await page.locator('.apply-next-btn').click();
          // Let MutationObserver helpers and React's commit both run.
          await page.evaluate(() => new Promise(requestAnimationFrame));
          assert.deepEqual(errors, [], 'hint transitions must not throw DOM errors');
          assert.equal(await page.locator('#root > .app-root').count(), 1);
        }
        assert.ok(applied > 6);
        assert.ok(techniques.size > 1, 'cover transitions between different hint types');
        const before = await page.evaluate(() => window.SudoHint.getCurrentPuzzleString());
        await page.reload();
        await page.getByTestId('cell-0-0').waitFor();
        const after = await page.evaluate(() => window.SudoHint.getCurrentPuzzleString());
        assert.equal(after, before, 'hint progress should still restore after refresh');
        assert.deepEqual(errors, []);
      } finally {
        await page.close();
      }
    });
  }
});
