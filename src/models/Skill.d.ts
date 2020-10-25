declare namespace Skill {
  interface SkillData {
    skillId: number;
    skillName: string;
    useView: number;
    targetFlag: 0 | 1 | 2 | 3 | 4 | 5;
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
    }[];
  }

  export type EffectClass =
    'Damage' |
    'ChangeHp' |
    'MultipleAttack' |
    'ChangeView' |
    'MultipleDefence' |
    'ChangeAgi' |
    'RemoveBuff' |
    'SpdDeferenceDamage' |
    'Heal' |
    'ComboPlus' |
    'ComboDamage' |
    'Aggregation' |
    'HealthDamage' |
    'Provocation' |
    'Cure' |
    'MultipleBaseView' |
    'NowViewDamage' |
    'ChangeSkillProve' |
    'NeedViewChange' |
    'StatusNumDamage' |
    'Silence' |
    'MoreTurn' |
    'Penetration' |
    'IncreaseLAH' |
    'MultipleHp' |
    'IncreaseExp' |
    'NeedViewValueChange';

  type SkillEffect = Effect.Aggregation |
    Effect.AllAttack |
    Effect.ChangeAgi |
    Effect.ChangeHp |
    Effect.ChangeSkillProve |
    Effect.ChangeChangeView |
    Effect.ComboDamage |
    Effect.ComboMultipleAttack |
    Effect.ComboPlus |
    Effect.Cure |
    Effect.Damage |
    Effect.DamageLimit |
    Effect.DeleteTurn |
    Effect.ElementPenetrateDamage |
    Effect.Heal |
    Effect.HealthDamage |
    Effect.HealthMultipleAttack |
    Effect.IgnoreElement |
    Effect.IncreaseExp |
    Effect.IncreaseLAH |
    Effect.MoreTurn |
    Effect.MultipleAttack |
    Effect.MultipleBaseView |
    Effect.MultipleDefence |
    Effect.MultipleHp |
    Effect.NeedViewChange |
    Effect.NeedViewValueChange |
    Effect.NowViewDamage |
    Effect.Penetration |
    Effect.Provocation |
    Effect.RegistDebuff |
    Effect.RemoveBuff |
    Effect.SalesBonusCheat |
    Effect.Silence |
    Effect.spdMult |
    Effect.StatusNumberMultipleAttack |
    Effect.StatusNumDamage |
    Effect.Wait;

  interface SkillEffectDetail {
    turn: number;
    count: number;
    effects: SkillEffect[];
    filename: string;
    statusId: number;
    canDispel: boolean;
    description: string;
    isImmediate: boolean;
    persistence: boolean;
    canDuplicate: boolean;
  }

  interface SkillEffectData {
    skillEffectId: number;
    skillEffectJson: SkillEffectDetail;
    useView: number;
    targetFlag: 0 | 1 | 2 | 3 | 4 | 5;
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
    }[];
  }

  interface StatusData {
    statusId: number;
    statusName: string;
    isGoodStatus: 0 | 1;
    description: string;
  }

  namespace Effect {
    interface Aggregation {
      class: 'Aggregation';
      parameter: [];
    }

    interface AllAttack {
      class: 'AllAttack';
      parameter: [];
    }

    interface ChangeAgi {
      class: 'ChangeAgi';
      parameter: {
        value: number;
      };
    }

    interface ChangeHp {
      class: 'ChangeHp';
      parameter: {
        value: number;
      };
    }

    interface ChangeSkillProve {
      class: 'ChangeSkillProve';
      parameter: {
        value: number;
      };
    }

    interface ChangeChangeView {
      class: 'ChangeChangeView';
      parameter: {
        value: number;
      };
    }

    interface ComboDamage {
      class: 'ComboDamage';
      parameter: {
        value: number;
        comboMul: number;
        // TODO: typo from rawdata.
        combpMul: number;
      };
    }

    interface ComboMultipleAttack {
      class: 'ComboMultipleAttack';
      parameter: {
        comboMul: number;
      };
    }

    interface ComboPlus {
      class: 'ComboPlus';
      parameter: {
        value: number;
      };
    }

    interface Cure {
      class: 'Cure';
      parameter: {
        value: number;
      };
    }

    interface Damage {
      class: 'Damage';
      parameter: {
        value: number;
      };
    }

    interface DamageLimit {
      class: 'DamageLimit';
      parameter: {
        value: number;
      };
    }

    interface DeleteTurn {
      class: 'DeleteTurn';
      parameter: {
        value: number;
      };
    }

    interface ElementPenetrateDamage {
      class: 'ElementPenetrateDamage';
      parameter: {
        value: number;
        element: boolean;
      };
    }

    interface Heal {
      class: 'Heal';
      parameter: {
        value: number;
      };
    }

    interface HealthDamage {
      class: 'HealthDamage';
      parameter: {
        value: number;
      };
    }

    interface HealthMultipleAttack {
      class: 'HealthMultipleAttack';
      parameter: [];
    }

    interface IgnoreElement {
      class: 'IgnoreElement';
      parameter: [];
    }

    interface IncreaseExp {
      class: 'IncreaseExp';
      parameter: {
        value: number;
        isPercent: boolean;
      };
    }

    interface IncreaseLAH {
      class: 'IncreaseLAH';
      parameter: {
        value: number;
        isPercent: boolean;
      };
    }

    interface MoreTurn {
      class: 'MoreTurn';
      parameter: {
        value: number;
      };
    }

    interface MultipleAttack {
      class: 'MultipleAttack';
      parameter: {
        value: number;
      };
    }

    interface MultipleBaseView {
      class: 'MultipleBaseView';
      parameter: {
        value: number;
      };
    }

    interface MultipleDefence {
      class: 'MultipleDefence';
      parameter: {
        value: number;
      };
    }

    interface MultipleHp {
      class: 'MultipleHp';
      parameter: {
        value: number;
      };
    }

    interface NeedViewChange {
      class: 'NeedViewChange';
      parameter: {
        value: number;
      };
    }

    interface NeedViewValueChange {
      class: 'NeedViewValueChange';
      parameter: {
        value: number;
      };
    }

    interface NowViewDamage {
      class: 'NowViewDamage';
      parameter: {
        value: number;
        viewMult: boolean;
      };
    }

    interface Penetration {
      class: 'Penetration';
      parameter: [];
    }

    interface Provocation {
      class: 'Provocation';
      parameter: [];
    }

    interface RegistDebuff {
      class: 'RegistDebuff';
      parameter: {
        value: number;
      };
    }

    interface RemoveBuff {
      class: 'RemoveBuff';
      parameter: {
        value?: number;
        target?: number;
      };
    }

    interface SalesBonusCheat {
      class: 'SalesBonusCheat';
      parameter: {
        value: number;
        isCheat: boolean;
      };
    }

    interface Silence {
      class: 'Silence';
      parameter: [];
    }

    interface spdMult {
      class: 'spdMult';
      parameter: {
        spdMult: number;
      };
    }

    interface StatusNumberMultipleAttack {
      class: 'StatusNumberMultipleAttack';
      parameter: {
        statusMult: number;
        isGoodStatus: boolean;
      };
    }

    interface StatusNumDamage {
      class: 'StatusNumDamage';
      parameter: {
        value: number;
        statusMult?: number;
        isGoodStatus?: boolean;
      };
    }

    interface Wait {
      class: 'Wait';
      parameter: [];
    }
  }
}
