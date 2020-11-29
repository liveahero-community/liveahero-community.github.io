// Node modules.
import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

enum Item {
  EXP = 'exp',
  TRAINING_BAND = 'trainingband',
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
          src='/assets/icon/item/item_exp.png'
        />
      );

    case Item.TRAINING_BAND:
      return (
        <Image className={className}
          src='/assets/icon/item/item_trainingband.png'
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
