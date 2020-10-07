import fs from 'fs';
import fetch from 'node-fetch';

const download = async (url: string, filename: string) => {
  const res = await fetch(url);

  await new Promise((resolve, reject) => {
    const filepath = `./translations/${filename}.tsv`;
    const fileStream = fs.createWriteStream(filepath);
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', () => {
      const raw = fs.readFileSync(filepath, { encoding: 'utf-8' });
      const updated = raw.replace(/\r\n/g, '\n');
      fs.writeFileSync(filepath, updated, { encoding: 'utf-8' });
      resolve();
    });
  });
};

const main = async () => {
  download(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSxuXPUSc_HF5hn1C58PiOYBDK9szPeFp3J6NCmFqFXdtBvs7O17jw4PiKKwicPnk6DSbGfNtgiB_33/pub?gid=928706510&single=true&output=tsv`,
    `skills_ja-jp`,
  );

  download(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSxuXPUSc_HF5hn1C58PiOYBDK9szPeFp3J6NCmFqFXdtBvs7O17jw4PiKKwicPnk6DSbGfNtgiB_33/pub?gid=1980693559&single=true&output=tsv`,
    `skills_zh-tw`,
  );

  download(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSxuXPUSc_HF5hn1C58PiOYBDK9szPeFp3J6NCmFqFXdtBvs7O17jw4PiKKwicPnk6DSbGfNtgiB_33/pub?gid=1576211236&single=true&output=tsv`,
    `status_ja-jp`,
  );

  download(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSxuXPUSc_HF5hn1C58PiOYBDK9szPeFp3J6NCmFqFXdtBvs7O17jw4PiKKwicPnk6DSbGfNtgiB_33/pub?gid=74916732&single=true&output=tsv`,
    `status_zh-tw`,
  );
};

main();