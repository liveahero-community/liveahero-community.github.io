// Node modules.
import React from 'react';

interface RoleIconProps {
  roleId: number;
}

const RoleIcon: React.FC<RoleIconProps> = (props) => {
  const { roleId } = props;

  switch (roleId) {
    case 1:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-attack' color='#333333'/>
        </svg>
      );
    case 2:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-defence_icon' color='#333333' />
        </svg>
      );
    case 3:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-exe-strong' color='#333333' />
        </svg>
      );
    case 4:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-sick' color='#333333' />
        </svg>
      );
    case 5:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-fast' color='#333333' />
        </svg>
      );
    case 6:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-attendees' color='#333333' />
        </svg>
      );
    case 7:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-health' color='#333333' />
        </svg>
      );
    case 99:
      return (
        <svg className='icon iconfont' aria-hidden='true'>
          <use xlinkHref='#icon-stars' color='#333333' />
        </svg>
      );
  }

  return null;
}

export {
  RoleIcon,
};
