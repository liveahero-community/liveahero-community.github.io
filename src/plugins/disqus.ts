// Local modules.
import { disqusSettings } from '../configs/';

const { allowedEntry, orignalEntry } = disqusSettings;
const fixedPath = window.location.href.replace(allowedEntry, orignalEntry);
console.log(fixedPath);

if (fixedPath !== window.location.href) {
  window.location.href = fixedPath;
}

export {};
