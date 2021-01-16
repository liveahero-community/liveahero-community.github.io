// Node modules.
import React from 'react';
import { Image } from 'semantic-ui-react';
import urlJoin from 'url-join';
import styled from 'styled-components';
// Local modules.
import * as Configs from '../../configs';

interface ElementIconProps {
  className?: string;
  elementId: number;
  onClick?: Function;
  size?: number;
  pointer?: boolean;
  translucent?: boolean;
}

const ElementIcon: React.FC<ElementIconProps> = (props) => {
  const { className } = props;
  const { elementId } = props;

  switch (elementId) {
    case 1:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/assets/icon/element/icon_element_fire.png')}
        />

        // <svg className='icon iconfont' aria-hidden='true'>
        //   <use xlinkHref='#icon-fire' color='#FF3333'/>
        // </svg>
      );
    case 2:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/assets/icon/element/icon_element_water.png')}
        />

        // <svg className='icon iconfont' aria-hidden='true'>
        //   <use xlinkHref='#icon-water' color='#3399FF' />
        // </svg>
      );
    case 3:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/assets/icon/element/icon_element_earth.png')}
        />

        // <svg className='icon iconfont' aria-hidden='true'>
        //   <use xlinkHref='#icon-grass' color='#00CC00' />
        // </svg>
      );
    case 4:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/assets/icon/element/icon_element_light.png')}
        />

        // <svg className='icon iconfont' aria-hidden='true'>
        //   <use xlinkHref='#icon-sun' color='#E9AF0E' />
        // </svg>
      );
    case 5:
      return (
        <Image className={className}
          src={urlJoin(Configs.publicUrl, '/assets/icon/element/icon_element_shadow.png')}
        />

        // <svg className='icon iconfont' aria-hidden='true'>
        //   <use xlinkHref='#icon-Moon' color='#AE32FF' />
        // </svg>
      );
  }

  return null;
}

const styledElementIcon = styled(ElementIcon)`
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
  styledElementIcon as ElementIcon,
};
