const elementTransform = (elementId: number) => {
  switch (elementId) {
    case 1:
      return '火';
    case 2:
      return '水';
    case 3:
      return '木';
    case 4:
      return '光';
    case 5:
      return '影';
    default:
      return '無';
  }
};

const roleTransform = (roleId: number) => {
  switch (roleId) {
    case 1:
      return '攻擊';
    case 2:
      return '防禦';
    case 3:
      return '強化';
    case 4:
      return '弱體化';
    case 5:
      return '速度操作';
    case 6:
      return '獲得 view';
    case 7:
      return '回復';
    case 99:
      return '特殊';
    default:
      return '助手';
  }
};

const effectClassTransform = (effectClass: Skill.EffectClass) => {
  switch (effectClass) {
    case 'Damage':
      return '單體/全體傷害';
    case 'ChangeHp':
      return '生命 % 數變化';
    case 'MultipleAttack':
      return '攻擊力變化';
    case 'ChangeView':
      return 'View 變化';
    case 'MultipleDefence':
      return '防禦力變化';
    case 'ChangeAgi':
      return '速度變化';
    case 'RemoveBuff':
      return '移除增益效果';
    case 'SpdDeferenceDamage':
      return '速度差異增傷';
    case 'Heal':
      return '恢復血量';
    case 'ComboPlus':
      return 'combo 數增加';
    case 'ComboDamage':
      return 'combo 數增傷';
    case 'Aggregation':
      return '傷害集中';
    case 'HealthDamage':
      return '血量 % 數增傷';
    case 'Provocation':
      return '嘲諷';
    case 'Cure':
      return '消除減益效果';
    case 'MultipleBaseView':
      return '基礎 view 變化';
    case 'NowViewDamage':
      return '當前 view 增傷';
    case 'ChangeSkillProve':
      return '技能發動率';
    case 'NeedViewChange':
      return '技能所需 view 改變 (% 數)';
    case 'StatusNumDamage':
      return '增益數量增傷';
    case 'Silence':
      return '沉默';
    case 'MoreTurn':
      return '額外行動回合';
    case 'Penetration':
      return '無視嘲諷';
    case 'IncreaseLAH':
      return '增加金幣';
    case 'MultipleHp':
      return '血量改變';
    case 'IncreaseExp':
      return '增加經驗值';
    case 'NeedViewValueChange':
      return '技能所需 view 改變 (定值)';
    case 'AddMultDamage':
      return '傷害追加 (% 數)';
    case 'Hide':
      return '隱蔽';
    case 'RandomTeamAttack':
      return '隨機友軍追擊';
    case 'AimHighestHPCharacter':
      return '瞄準高血量角色';
    case 'RateChangeView':
      return '獲得 view';
    case 'AimHighestAtkCharacter':
      return '瞄準高攻擊力角色';
    default:
      console.log(`Unknown effectClass: ${effectClass}`);
      return '其他類型';
  }
};

export {
  elementTransform,
  roleTransform,
  effectClassTransform,
};
