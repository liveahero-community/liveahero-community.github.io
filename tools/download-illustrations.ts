import fs from 'fs';
import _ from 'lodash';
import fetch from 'node-fetch';
import xpath from 'xpath';
import { DOMParser } from 'xmldom';

const getCharacterIllustrationUrls = async (characterUrl: string) => {
  const res = await fetch(characterUrl);
  const xml = await res.text();

  const doc = new DOMParser().parseFromString(xml);
  const nodes: any[] = xpath.select('//div[@id="navi2"]/ul/li/a/img', doc);

  const urls: string[] = nodes.map((node) => {
    const { value: url } = _.find(node.attributes, (attribute) => attribute.name === 'src');
    return url;
  });

  return urls;
};

const download = async (url: string, filename: string) => {
  const res = await fetch(url);

  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(`./public/assets/${filename}.png`);
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

const main = async () => {
  const listUrl = 'https://live-a-hero.jp/character_list';
  const res = await fetch(listUrl);
  const xml = await res.text();

  const doc = new DOMParser().parseFromString(xml);
  const nodes: any[] = xpath.select('//figure/a', doc);

  const illustrations = await Promise.all(nodes.map(async (node) => {
    const { value: characterUrl } = _.find(node.attributes, (attribute) => attribute.name === 'href');
    const { value: coverUrl } = _.find(node.firstChild.attributes, (attribute) => attribute.name === 'src');
    const { 1: name } = characterUrl.match(/^.+\/(\w+)$/);
    const urls = await getCharacterIllustrationUrls(characterUrl);

    return { name, urls, coverUrl };
  }));

  // Start download.
  illustrations.forEach((illustration) => {
    download(illustration.coverUrl, `covers/${illustration.name}`);
    illustration.urls.forEach((url) => {
      const { 1: id } = url.match(/^.+_(\w+)\.png$/)!;
      download(url, `illustrations/${illustration.name}_${id}`);
    })
  })

  // TODO: special cases.
  download(
    `https://live-a-hero.jp/wp-content/uploads/2020/10/chara_player.png`,
    `covers/player`
  );
  download(
    `https://live-a-hero.jp/wp-content/uploads/2020/09/fg_huckle_s01.png`,
    `illustrations/huckle_s01`
  );
};

main();
