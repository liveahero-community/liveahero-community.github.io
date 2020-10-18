// Node modules.
import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import { SkillData } from '../../models/Hero';

interface SkillIconProps {
  className?: string;
  skill: SkillData;
}

const SkillIcon: React.FC<SkillIconProps> = (props) => {
  const { className } = props;
  const { skill } = props;

  return (
    <div className={className}>
      <Image className='main' alt=''
        src={`/assets/icon/skill/main/${skill.resourceName}.png`}
      />
      {skill.subResourceName &&
        <Image className='sub' alt=''
          src={`/assets/icon/skill/sub/${skill.subResourceName}.png`}
        />
      }
    </div>
  );
};

const styledSkillIcon = styled(SkillIcon)`
  & {
    flex: 0 0 48px;
    position: relative;
    width: 48px;
    height: 48px;

    .main {
      position: relative;
      width: 48px;
      height: 48px;
    }

    .sub {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 28px;
      height: 28px;
    }
  }
`;

export {
  styledSkillIcon as SkillIcon,
};
