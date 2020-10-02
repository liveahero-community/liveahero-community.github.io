// Node modules.
import _ from 'lodash';
// Local modules.
import HeroDataRaw from '../data/CardMaster.json';
import SidekickDataRaw from '../data/SidekickMaster.json';
import SkillDataRaw from '../data/SkillMaster.json';
import SkillEffectDataRaw from '../data/SkillEffectMaster.json';

const skillMapping = (skillId: number) => {
  const skill = _.get(SkillDataRaw, skillId);

  return {
    ...skill,
    effects: skill.effects.map((effect) => ({
      ...effect,
      effectDetail: _.get(SkillEffectDataRaw, effect.skillEffectId).skillEffectJson,
    })),
  };
};

const heroData = _.map(HeroDataRaw, (data) => ({
  ...data,
  skills: data.skillIds.map(skillMapping),
}));

const sidekickData = _.map(SidekickDataRaw, (data) => ({
  ...data,
  equipmentSkillIds: data.equipmentSkills,
  equipmentSkills: data.equipmentSkills.map(skillMapping),
  skills: data.skillIds.map(skillMapping),
}));

const heroDict = _.groupBy(heroData, 'characterId');
const sidekickDict = _.groupBy(sidekickData, 'characterId');
const characterDict = _.mergeWith(heroDict, sidekickDict, (heroes, sidekicks) => {
  const [a] = heroes || [];
  const [b] = sidekicks || [];

  return {
    meta: {
      cardName: a?.cardName || b?.cardName,
      characterId: a?.characterId || b?.characterId,
      resourceName: a?.resourceName || b?.resourceName,
    },
    heroes: heroes || [],
    sidekicks: sidekicks || [],
  };
});

export {
  characterDict,
  HeroDataRaw,
  SidekickDataRaw,
};
