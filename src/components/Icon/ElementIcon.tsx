// Node modules.
import React from 'react';

interface ElementIconProps {
  elementId: number;
}

const ElementIcon: React.FC<ElementIconProps> = (props) => {
  const { elementId } = props;

  switch (elementId) {
    case 1:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-fire' color='#FF3333'/>
        </svg>
      );
    case 2:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-water' color='#3399FF' />
        </svg>
      );
    case 3:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-grass' color='#00CC00' />
        </svg>
      );
    case 4:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-sun' color='#E9AF0E' />
        </svg>
      );
    case 5:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-Moon' color='#AE32FF' />
        </svg>
      );
  }

  return null;
}

export {
  ElementIcon,
};
