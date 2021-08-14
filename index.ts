import express from 'express';
import morgan from 'morgan';
import puppeteer from 'puppeteer';

import type { Request } from 'express';

const PORT = 2020;

type QueryParams = {
  url: string;
};

express()
  .use(morgan('common'))
  .get('/', async (req: Request<{}, {}, {}, QueryParams>, res) => {
    const { url } = req.query;

    if (!url) return res.end('No URL provided!');

    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();

    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
      });
    } catch (ex) {
      return res.json(ex);
    }

    return res.send(await page.content());
  })

  .get('*', (req, res) => res.redirect('/'))

  .listen(PORT, () => console.log('listening on port ' + PORT + '...'));
