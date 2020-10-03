// Node modules.
import fs from 'fs';
import _ from 'lodash';
// Local modules.
import SkillData from '../src/data/ja-jp/SkillMaster.json';

const main = async () => {
  const skills = _.values(SkillData);
  const mapped: any[] = _.map(skills, _.partialRight(_.pick, ['skillId', 'skillName', 'description']));

  const data = mapped.map((data) => `${data.skillId}\t${data.skillName}\t${data.description}`).join('\n');

  fs.writeFileSync('./translations/skills_ja-jp.tsv', data, 'utf-8');
};

main();
