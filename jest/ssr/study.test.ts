import * as cheerio from 'cheerio';
import { get } from '../request';
import { environment } from '../../src/environments/environment';

test('Meeting page has meta', async () => {
  const response = await get(`${environment.portal_url}/study/geography/group-lessons/London-is-a-capital-of-Great-Britain-r0fa4z0f`);
  expect(response.status).toBe(200);

  const $ = cheerio.load(response.data);

  // <title>London is a capital of Great Britain, Geography, December 2nd, 2019 10:00 — 11:00, Beginner, Kaya Edwards — Study | OnClass</title>
  const title = $('title').text();
  expect(title).toContain('London is a capital of Great Britain');
  // TODO проверить что там текст "London is a capital of Great Britain"
  
  // <meta name="description" content="Lorem ipsum dolor sit amet<...>">
  const description = $('meta[name="description"]').attr('content').toString().trim();
  expect(description).toContain('Lorem ipsum dolor sit amet');
  // TODO Проверить что там есть текст Lorem ipsum dolor sit amet



  // TODO const h1 = $('app-meeting-card h1').toString().trim();
  const h1 = $('app-meeting-card h1').toString().trim();
  expect(h1).toContain('London is a capital of Great Britain');
  // TODO проверить что там текст "London is a capital of Great Britain"

  // TODO const img = $('app-meeting-card img.cover-img').attr(???).toString().trim();
  const imgUrl = $('app-meeting-card img.cover-img').attr('src').toString().trim();
  // https://fs.onclass.tech/storage/a815df04-898e-4fd3-8472-8d89a15cb34d/e044f6f7-5ea1-43d3-9e62-85a51c6fe9d8/_london-md.jpg

  let fixedUrl = fixUrl(imgUrl)
  expect(fixedUrl).toContain('/storage/a815df04-898e-4fd3-8472-8d89a15cb34d/e044f6f7-5ea1-43d3-9e62-85a51c6fe9d8/_london-md.jpg');
  // TODO проверить что там URL картинки

  function fixUrl(url){
    url = url.replace("https://", "").replace("http://", "");
    const firstSlash = url.indexOf("/");
    return url.slice(firstSlash);
  }
});

