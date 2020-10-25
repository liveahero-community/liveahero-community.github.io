// Node modules.
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// Local modules.
import * as Routes from '../utils/Routes';

const SkillCategoriesScreen: React.FC = () => {
  const [defaultCategory] = useState<Skill.EffectClass>('SpdDeferenceDamage');

  return (
    <Redirect to={`${Routes.SKILL_CATEGORIES}/${defaultCategory}`} />
  );
}

export {
  SkillCategoriesScreen,
};
