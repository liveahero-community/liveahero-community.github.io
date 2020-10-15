// Node modules.
import _ from 'lodash';
// Local modules.
import { HeroData, SidekickData } from '../models/Hero';

interface RawData {
  heroDataRaw: any;
  sidekickDataRaw: any;
  skillDataRaw: any;
  skillEffectDataRaw: any;
  statusDataRaw: any;
};

export class DataProcess {
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
      effects: skill.effects.map((effect: any) => {
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
