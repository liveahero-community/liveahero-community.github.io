export interface SkillEffectData {
  turn: number;
  count: number;
  effects: {
    class: string;
    parameter: {
      value: number;
    };
  };
  filename: string;
  statusId: number;
  canDispel: boolean;
  description: string;
  isImmediate: boolean;
  persistence: boolean;
  canDuplicate: boolean;
}

export interface SkillData {
  skillId: number;
  skillName: string;
  useView: number;
  targetFlag: number;
  resourceName: string;
  subResourceName: string;
  timing: number;
  description: string;
  cutin: {
    info: {
      class: 'CutIn' | 'NormalAttack' | 'SidekickSkill' | 'System';
    };
    name: string;
  };
  effects: {
    skillEffectId: number;
    prob: number;
    effectTarget: number;
    // Appended.
    effectDetail: SkillEffectData;
  }[];
}

export interface HeroData {
  heroCardId: number;
  stockId: number;
  stockOrder: number;
  cardName: string;
  element: number;
  role: number;
  rarity: number;
  cardId: number;
  skillIds: number[];
  growths: {
    level: number;
    hp: number;
    attack: number;
    agility: number;
    addView: number;
  }[];
  rankUpItems: {
    itemId: number;
    value: number;
  }[];
  resourceName: string;
  characterId: number;
  job: string;
  affiliationOffice: string;
  characterVoice: string;
  illustrator: string;
  // Appended.
  skills: SkillData[];
}

export interface SidekickData {
  [key: string]: any;
  growths: {
    level: number;
    hp: number;
    attack: number;
    agility: number;
    addView: number;
  }[];
  // Appended.
  skills: SkillData[];
  equipmentSkills: SkillData[];
}

export interface CharacterData {
  meta: {
    characterId: number;
    cardName: string;
    resourceName: string;
  };
  heroes: HeroData[];
  sidekicks: SidekickData[];
}
