// Node modules.
import _ from 'lodash';
// Local modules.
import { HeroData, SidekickData } from '../models/Hero';
// ja-JP
import HeroDataRaw from '../data/ja-jp/CardMaster.json';
import SidekickDataRaw from '../data/ja-jp/SidekickMaster.json';
import SkillDataRaw from '../data/ja-jp/SkillMaster.json';
import SkillEffectDataRaw from '../data/ja-jp/SkillEffectMaster.json';
import StatusDataRaw from '../data/ja-jp/StatusMaster.json';
// zh-TW
import HeroDataRaw_zhTW from '../data/zh-tw/CardMaster.json';
import SidekickDataRaw_zhTW from '../data/zh-tw/SidekickMaster.json';
import SkillDataRaw_zhTW from '../data/zh-tw/SkillMaster.json';
import SkillEffectDataRaw_zhTW from '../data/zh-tw/SkillEffectMaster.json';
import StatusDataRaw_zhTW from '../data/zh-tw/StatusMaster.json';

interface RawData {
  heroDataRaw: typeof HeroDataRaw;
  sidekickDataRaw: typeof SidekickDataRaw;
  skillDataRaw: typeof SkillDataRaw;
  skillEffectDataRaw: typeof SkillEffectDataRaw;
  statusDataRaw: typeof StatusDataRaw;
}

class DataProcess {
  private rawData: RawData;
  private heroData: HeroData[];
  private sidekickData: SidekickData[];
  private heroDict: any;
  private sidekickDict: any;
  public characterDict: any;
  public statusDict: any;

  public constructor(rawData: RawData) {
    this.rawData = rawData;

    this.heroData = _.map(rawData.heroDataRaw, (data) => ({
      ...data,
      skills: (data.skillIds as any[]).map(this.skillMapping.bind(this)),
    })) as any;

    this.sidekickData = _.map(rawData.sidekickDataRaw, (data) => ({
      ...data,
      equipmentSkillIds: data.equipmentSkills,
      equipmentSkills: data.equipmentSkills.map(this.skillMapping.bind(this)),
      skills: data.skillIds.map(this.skillMapping.bind(this)),
    })) as any;

    this.heroDict = _.groupBy(this.heroData, 'characterId');

    this.sidekickDict = _.groupBy(this.sidekickData, 'characterId');

    const characterIds = _.union(_.flattenDeep([_.keys(this.heroDict), _.keys(this.sidekickDict)]));
    this.characterDict = characterIds.reduce((all, characterId) => {
      const heroes = _.get(this.heroDict, characterId) || [];
      const sidekicks = _.get(this.sidekickDict, characterId) || [];
      const [a] = heroes;
      const [b] = sidekicks;

      const data = {
        meta: {
          cardName: a?.cardName || b?.cardName,
          characterId: a?.characterId || b?.characterId,
          resourceName: a?.resourceName || b?.resourceName,
          heroElement: a?.element,
          heroRarity: a?.rarity,
        },
        heroes,
        sidekicks,
      };

      return Object.assign(all, {[characterId.toString()]: data });
    }, {});

    this.statusDict = rawData.statusDataRaw;
  }

  private skillMapping(skillId: number) {
    const skill = _.get(this.rawData.skillDataRaw, skillId);

    return {
      ...skill,
      effects: skill.effects.map((effect) => {
        const effectDetail = _.get(this.rawData.skillEffectDataRaw, effect.skillEffectId).skillEffectJson;
        const status = _.get(this.rawData.statusDataRaw, effectDetail.statusId);

        return {
          ...effect,
          // Append from skillEffectDataRaw.
          effectDetail: {
            ...effectDetail,
            // Append from statusDataRaw.
            status,
          },
        }
      }),
    };
  }
}

const rawData_jaJP: RawData = {
  heroDataRaw: HeroDataRaw,
  sidekickDataRaw: SidekickDataRaw,
  skillDataRaw: SkillDataRaw,
  skillEffectDataRaw: SkillEffectDataRaw,
  statusDataRaw: StatusDataRaw,
};

const rawData_zhTW: RawData = {
  heroDataRaw: HeroDataRaw_zhTW,
  sidekickDataRaw: SidekickDataRaw_zhTW,
  skillDataRaw: SkillDataRaw_zhTW,
  skillEffectDataRaw: SkillEffectDataRaw_zhTW,
  statusDataRaw: StatusDataRaw_zhTW,
};

const jpDataProcess = new DataProcess(rawData_jaJP);
const twDataProcess = new DataProcess(rawData_zhTW);

const allCharacterDict = {
  jaJP: jpDataProcess.characterDict,
  zhTW: twDataProcess.characterDict,
  // TODO: other lanuages.
  enUS: jpDataProcess.characterDict,
};

const allStatusDict = {
  jaJP: jpDataProcess.statusDict,
  zhTW: twDataProcess.statusDict,
  // TODO: other lanuages.
  enUS: jpDataProcess.statusDict,
};

export {
  allCharacterDict,
  allStatusDict,
};
