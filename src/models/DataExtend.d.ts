type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare namespace DataExtend {
  interface HeroData extends Character.HeroData {
    skills: DataExtend.SkillData[];
  }

  interface SidekickData extends Omit<Character.SidekickData, 'equipmentSkills'> {
    equipmentSkillIds: number[];
    equipmentSkills: DataExtend.SkillData[];
    skills: DataExtend.SkillData[];
  }

  interface SkillData extends Skill.SkillData {
    effects: {
      skillEffectId: number;
      prob: number;
      effectTarget: number;
      effectDetail: Skill.SkillEffectDetail & {
        status: Skill.StatusData;
      };
    }[];
  }

  interface SkillDataWithCharacter extends Skill.SkillData {
    characterType: 'hero' | 'sidekick';
    characterId: number;
    characterResourceName: string;
  }

  interface CharacterData {
    meta: {
      characterId: number;
      cardName: string;
      resourceName: string;
      heroElement?: number;
      heroRarity: number;
      detail: {
        h01?: string;
        h02?: string;
        s01?: string;
      };
    };
    heroes: DataExtend.HeroData[];
    sidekicks: DataExtend.SidekickData[];
  }
}