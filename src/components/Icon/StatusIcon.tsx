// Node modules.
import _ from 'lodash';
import React from 'react';
import {
  Popup,
  Image,
  Label,
} from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import { statusIcons } from '../../utils/Mapping';

interface StatusIconProps {
  className?: string;
  statusId: number;
  name?: string;
  description?: string;
  turn?: number;
}

const StatusIcon: React.FC<StatusIconProps> = (props) => {
  const { className } = props;
  const { statusId, turn, name, description } = props;

  return (
    <Popup inverted position='top center'
      trigger={
        <div className={className}>
          <Image className='icon' alt=''
            src={_.get(statusIcons, statusId)}
          />

          {turn &&
            <Label className='turn' circular color='grey' size='tiny'>
              {turn}
            </Label>
          }
        </div>
      }
      content={`${name}: ${description}`}
    />
  );
};

const styledStatusIcon = styled(StatusIcon)`
  & {
    position: relative;
    width: 36px;
    height: 36px;
    margin: 10px;

    .icon {
      width: 36px;
      height: 36px;
    }

    .turn {
      position: absolute;
      bottom: -9px;
      right: -9px;
    }
  }
`;

export {
  styledStatusIcon as StatusIcon,
};
