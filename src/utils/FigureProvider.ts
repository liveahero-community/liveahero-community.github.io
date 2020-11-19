// Node modules.
// import _ from 'lodash';
import fetch from 'node-fetch';

interface Catalog {
  sha: string;
  url: string;
  tree: Array<{
    path: string; // "fg_ryekie_h01.png"
    mode: string; // "100644"
    type: string; // "blob"
    sha: string;  // "e6247e97a923f28c836f7b7d4534a8288f8a8281"
    size: number; // 513535
    url: string;  // "https://api.github.com/repos/liveahero-community/atlas/git/blobs/e6247e97a923f28c836f7b7d4534a8288f8a8281"
  }>;
  truncated: boolean;
}

interface FigureMap {
  [key: string]: Array<{
    name: string;
    fullname: string;
    characterName: string;
    categories: string[] | null;
  }>;
}

class FigureProvider {
  private catalogUrl = 'https://api.github.com/repos/liveahero-community/atlas/git/trees/gh-pages';
  // private figureRootUrl = 'https://';
  private figureMap: FigureMap;

  public async init() {
    const res = await fetch(this.catalogUrl);
    const catalog: Catalog = await res.json();

    this.figureMap = catalog.tree.reduce<FigureMap>((previous, leaf) => {
      const figure = this.naming(leaf.path);

      if (figure) {
        const newFigure = {
          ...figure,
          categories: this.category(figure.name),
        };

        if (previous[figure.characterName]) {
          previous[figure.characterName].push(newFigure);
        } else {
          previous[figure.characterName] = [newFigure];
        }
      }

      return previous;
    }, {});
  }

  public getFigureUrl() {
    // TODO:
    return this.figureMap;
  }

  /**
   * Extract names from figure raw path
   * @param {string} raw e.g. `fg_ryekie_h01.png`
   */
  private naming(raw: string) {
    const figureNameRegex = /^fg_(([^_]+)_\w+)\.png$/;
    const matches = raw.match(figureNameRegex);

    if (matches) {
      const [fullname, name, characterName] = matches;
      return { fullname, name, characterName };
    }

    return null;
  }

  /**
   * Extract categories from figure file name
   * @param {string} raw `ryekie_h01_skin1`
   * @returns {string[]} `['hero', 'skin1']` 
   */
  private category(raw: string): string[] | null {
    const regex = /^.+([h|s]\d+.+)$/;
    const matches = raw.match(regex);

    if (matches) {
      const { 1: categoriesRaw } = matches;
      const categories = categoriesRaw.split('_');

      // h01, h01b, h02, ...
      const heroRegex = /^[h]\d{2}[a-z]{0,1}$/;
      if (categories.some((category) => heroRegex.test(category))) {
        categories.push('group:hero');
      }

      // s01, s01b, s02, ...
      const sidekickRegex = /^[s]\d{2}[a-z]{0,1}$/;
      if (categories.some((category) => sidekickRegex.test(category))) {
        categories.push('group:sidekick');
      }

      // h01, s01, ...
      const idRegex = /^[h|s](\d{2})([a-z]{0,1})$/;
      if (categories.some((category) => idRegex.test(category))) {
        const token = categories.find((category) => idRegex.test(category))!;
        const { 1: id, 2: emotion } = token.match(idRegex)!;

        categories.push(`series:${id}`);
        if (emotion) {
          categories.push(`emotion:${emotion}`);
        }
      }

      // skin1, ...
      const skinRegex = /^skin(\d{1})$/;
      if (categories.some((category) => skinRegex.test(category))) {
        const token = categories.find((category) => skinRegex.test(category))!;
        const { 1: skinNum } = token.match(skinRegex)!;

        categories.push(`skin:${skinNum}`);
      }

      return categories;
    }

    return null;
  }
}

const figureProvider = new FigureProvider();
figureProvider.init();

export {
  figureProvider,
};
