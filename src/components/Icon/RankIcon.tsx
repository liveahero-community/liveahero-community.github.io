// Node modules.
import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

interface RankIconProps {
  className?: string;
  rankLevel: number;
  size?: number;
  pointer?: boolean;
  translucent?: boolean;
}

const RankIcon: React.FC<RankIconProps> = (props) => {
  const { className } = props;
  const { rankLevel } = props;

  return (
    <Image className={className}
      src={`/assets/icon/item/item_genericpiece_rank${rankLevel}.png`}
    />
  );
}

const styledRankIcon = styled(RankIcon)`
  & {
    display: inline-block !important;
    width: ${props => props.size || 18}px;
    height: ${props => props.size || 18}px;
    margin-right: 0.25em;
    cursor: ${props => props.pointer ? 'pointer' : 'auto'};
    opacity: ${props => props.translucent ? 0.25 : 1};
  }
`;

export {
  styledRankIcon as RankIcon,
};
