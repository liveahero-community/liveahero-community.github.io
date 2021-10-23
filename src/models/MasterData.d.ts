declare namespace MasterData {
  interface CardMaster {
    [heroCardId: string]: Character.HeroData;
  }

  interface SidekickMaster {
    [sidekickCardId: string]: Character.SidekickData;
  }

  interface HeroExpMaster {
    [level: string]: Character.HeroExp;
  }

  interface SidekickExpMaster {
    [level: string]: Character.SidekickExp;
  }

  interface SkillMaster {
    [skillId: string]: Skill.SkillData;
  }

  interface SkillEffectMaster {
    [skillEffectId: string]: Skill.SkillEffectData;
  }

  interface StatusMaster {
    [statusId: string]: Skill.StatusData;
  }

  interface UserRankMaster {
    [level: string]: Player.UserRank;
  }

  interface ItemMaster {
    [itemId: string]: Item.ItemData;
  }

  type ParallelWeaponExpMaster = {
    level: number;
    nextExp: number;
    totalExp: number;
  }[]
}
