// Node modules.
import fs from 'fs';
import _ from 'lodash';
import appRoot from 'app-root-path';
// Local modules.
import SkillData from '../src/data/ja-jp/SkillMaster.json';

const main = async () => {
  const rawData = fs.readFileSync(`${appRoot}/translations/skills_zh-tw.tsv`, 'utf-8');
  const updatedSkills = rawData.split(/\r\n/).map((line) => {
    const [skillId, skillName, description] = line.split('\t');
    return { skillId, skillName, description };
  });

  updatedSkills.forEach((skill) => {
    Object.assign(_.get(SkillData, skill.skillId), {
      ...skill,
      skillId: Number(skill.skillId),
    });
  });

  const text = JSON.stringify(SkillData, null, 2) + '\n';

  fs.writeFileSync(`${appRoot}/src/data/zh-tw/SkillMaster.json`, text, 'utf-8');
};

main();
