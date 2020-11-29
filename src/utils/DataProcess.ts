// Node modules.
import _ from 'lodash';

interface RawData {
  heroDataRaw: MasterData.CardMaster;
  sidekickDataRaw: MasterData.SidekickMaster;
  heroExpRaw: MasterData.HeroExpMaster;
  sidekickExpRaw: MasterData.SidekickExpMaster;
  skillDataRaw: MasterData.SkillMaster;
  skillEffectDataRaw: MasterData.SkillEffectMaster;
  statusDataRaw: MasterData.StatusMaster;
  detailRaw: string;
};

interface Version {
  appVersion: string;
  masterVersion: number;
};

class DataProcess {
  private rawData: RawData;
  // Flatten character cards.
  private heroDataList: DataExtend.HeroData[];
  private sidekickData: DataExtend.SidekickData[];
  // Grouped character cards.
  private heroDict: _.Dictionary<DataExtend.HeroData[]>;
  private sidekickDict: _.Dictionary<DataExtend.SidekickData[]>;

  /**
   * Public fields.
   */
  public characterDict: any;
  // Exp information.
  public heroExpData: MasterData.HeroExpMaster;
  public sidekickExpData: MasterData.SidekickExpMaster;
  // Flatten skill data.
  public skillData: DataExtend.SkillDataWithCharacter[];
  // Status data.
  public statusDict: any;
  // Version.
  public version: Version;

  public constructor(rawData: RawData, version: Version) {
    this.rawData = rawData;

    this.heroDataList = _.map(rawData.heroDataRaw, (data) => ({
      ...data,
      skills: (data.skillIds).map(this.skillMapping.bind(this)),
    }));

    this.sidekickData = _.map(rawData.sidekickDataRaw, (data) => ({
      ...data,
      equipmentSkillIds: data.equipmentSkills,
      equipmentSkills: data.equipmentSkills.map(this.skillMapping.bind(this)),
      skills: data.skillIds.map(this.skillMapping.bind(this)),
    }));

    this.heroDict = _.groupBy(this.heroDataList, 'characterId');

    this.sidekickDict = _.groupBy(this.sidekickData, 'characterId');

    // TODO: need refactor.
    const detailDict = this.rawData.detailRaw.split('\n')
      .map((line) => ({
        key: line.substr(0, line.indexOf('=')),
        value: line.substr(line.indexOf('=') + 1),
      }))
      .filter(({ key }) => /^DETAIL_\w+_[H|S]\d{2}$/.test(key))
      .reduce((all, { key, value }) => {
        const matches = key.match(/^DETAIL_(\w+)_([H|S]\d{2})$/)!;
        const resourceName = matches[1].toLowerCase();
        const category = matches[2].toLowerCase();
        all[resourceName] = {
          ...all[resourceName],
          [category]: value,
        };
        return all;
      }, {} as any);

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
          detail: detailDict[a?.resourceName || b?.resourceName],
        },
        heroes,
        sidekicks,
      };

      return Object.assign(all, { [characterId.toString()]: data });
    }, {});

    this.heroExpData = rawData.heroExpRaw;
    this.sidekickExpData = rawData.sidekickExpRaw;

    this.skillData = _.sortBy(
      _.uniqBy(
        _.flattenDeep<DataExtend.SkillDataWithCharacter>([
          this.heroDataList.map((data) =>
            data.skills.map(this.skillAddMeta.bind(this, 'hero', data))
          ),
          this.sidekickData.map((data) => [
            data.skills.map(this.skillAddMeta.bind(this, 'sidekick', data)),
            data.equipmentSkills.map(this.skillAddMeta.bind(this, 'sidekick', data)),
          ]),
        ]),
        (skill) => skill.skillId
      ), ['skillId']
    );

    this.statusDict = rawData.statusDataRaw;

    this.version = version;
  }

  private skillMapping(skillId: number): DataExtend.SkillData {
    const skill = _.get(this.rawData.skillDataRaw, skillId);

    const effects = skill.effects.map((effect) => {
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
    });

    return { ...skill, effects };
  }

  private skillAddMeta(
    characterType: 'hero' | 'sidekick',
    data: DataExtend.HeroData | DataExtend.SidekickData,
    skill: Skill.SkillData
  ): DataExtend.SkillDataWithCharacter {
    return {
      ...skill,
      characterType,
      characterId: data.characterId,
      characterResourceName: data.resourceName,
    };
  }
}

export {
  DataProcess,
};
