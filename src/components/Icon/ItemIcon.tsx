// Node modules.
import React from 'react';
import { Image } from 'semantic-ui-react';
import urlJoin from 'url-join';
import styled from 'styled-components';
// Local modules.
import * as Configs from '../../configs';

enum Item {
  EXP = 'exp',
  TRAINING_BAND = 'trainingband',
  PWEXP = 'pwexp',
}

interface ItemIconProps {
  className?: string;
  name: Item;
  size?: number;
}

const ItemIcon: React.FC<ItemIconProps> = (props) => {
  const { className } = props;
  const { name } = props;

  switch (name) {
    case Item.EXP:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/archives/Texture2D/item_exp.png')}
        />
      );

    case Item.TRAINING_BAND:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/archives/Texture2D/item_trainingband.png')}
        />
      );

    case Item.PWEXP:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/archives/Texture2D/item_pwexp.png')}
        />
      );
        
    default:
      return null;
  }
}

const styledItemIcon = styled(ItemIcon)`
  & {
    display: inline-block !important;
    width: ${props => props.size || 18}px !important;
    height: ${props => props.size || 18}px !important;
  }
`;

export {
  styledItemIcon as ItemIcon,
  Item,
};
