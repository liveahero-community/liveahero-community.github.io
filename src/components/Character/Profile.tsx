// Node modules.
import _ from 'lodash';
import React, { useState } from 'react';
import { Card, Grid, Image, Rating } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import urlJoin from 'url-join';
import styled from 'styled-components';
// Local modules.
import * as Configs from '../../configs';
import * as Routes from '../../utils/Routes';
import { elementTransform, roleTransform } from '../../utils/Transformer';
import { ElementIcon } from '../Icon/ElementIcon';
import { RoleIcon } from '../Icon/RoleIcon';

interface AvatarProps {
  lazyLoadOffset: number;
  resourceName: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { lazyLoadOffset, resourceName } = props;

  return (
    <LazyLoad classNamePrefix='avatar-container image lazy' offset={lazyLoadOffset}>
      {resourceName !== 'player' && [
        <Image key={`${resourceName}_1`} className={'advance'} ui={false} alt={''}
          src={urlJoin(Configs.resizePrefix, `/atlas/fg_${resourceName}_h02.png`)}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src= e.target.fixed
              ? ''
              : urlJoin(Configs.resizePrefix, `/atlas/fg_${resourceName}_h01.png`);
            e.target.fixed = true;
          }}
        />,
        <Image key={`${resourceName}_2`} className={'normal'} ui={false} alt={''}
          src={urlJoin(Configs.resizePrefix, `/atlas/fg_${resourceName}_s01.png`)}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src= e.target.fixed
              ? ''
              : urlJoin(Configs.resizePrefix, `/atlas/fg_${resourceName}_h01.png`);
            e.target.fixed = true;
          }}
        />,
        <div key={`${resourceName}_3`} className={'background-decorator-1'} />,
      ]}

      {resourceName === 'player' && [1, 2, 3, 4].map((i) =>
        <Image key={`${resourceName}_${i}`} className={`player player${i}`} ui={false} alt={''}
          src={urlJoin(Configs.resizePrefix, `/atlas/fg_${resourceName}${i}_s01.png`)}
        />
      )}
    </LazyLoad>
  );
};

interface ProfileProps {
  className?: string;
  character: DataExtend.CharacterData;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { className } = props;
  const { character } = props;
  const [heroCard] = _.orderBy(character.heroes, 'stockOrder', 'asc');

  const [lazyLoadOffset] = useState(200);

  return (
    <Link className={className} to={`${Routes.HEROES}/${character.meta.resourceName}`}>
      <Card fluid>
        {/* This className is a workaround for LazyLoad with Card.Image */}
        {/* className will be 'image lazy-wrapper' */}
        <Avatar
          lazyLoadOffset={lazyLoadOffset}
          resourceName={character.meta.resourceName}
        />

        <Card.Content>
          <Card.Header>{character.meta.cardName}</Card.Header>

          <Card.Meta>{character.meta.resourceName}</Card.Meta>

          <Card.Description>
            <Grid divided={!isMobile} textAlign='center'>
              <Grid.Row>
                {character.meta.heroElement &&
                  <Grid.Column width={6}>
                    <ElementIcon elementId={character.meta.heroElement} />
                    {!isMobile && elementTransform(character.meta.heroElement)}
                  </Grid.Column>
                }

                <Grid.Column width={10}>
                  {!isMobile && <RoleIcon roleId={heroCard?.role} />}
                  {roleTransform(heroCard?.role)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Rating icon='star' disabled
            defaultRating={heroCard?.rarity}
            maxRating={6}
          />
        </Card.Content>
      </Card>
    </Link>
  );
};


const StyledProfile = styled(Profile)`
  & {
    width: 100%;
    -webkit-user-drag: none;
     -khtml-user-drag: none;
       -moz-user-drag: none;
         -o-user-drag: none;
  }

  .avatar-container {
    position: relative;
    width: 100% !important;
    padding-top: 120% !important; /* 1:1 Aspect Ratio */
    overflow: hidden;

    .advance {
      position: absolute;
      top: -10%;
      left: -20%;
      bottom: 0;
      right: 0;
      opacity: 0.5;
      z-index: 10;
      -webkit-filter: drop-shadow(0px 0px 10px #CCC);
              filter: drop-shadow(0px 0px 10px #CCC);
      transition: 0.5s;
      -webkit-user-drag: none;
       -khtml-user-drag: none;
         -moz-user-drag: none;
           -o-user-drag: none;
    }

    .normal {
      position: absolute;
      top: 10%;
      left: 20%;
      bottom: 0;
      right: 0;
      opacity: 1;
      z-index: 20;
      -webkit-filter: drop-shadow(0px 0px 10px #CCC);
              filter: drop-shadow(0px 0px 10px #CCC);
      transition: 0.5s;
      -webkit-user-drag: none;
       -khtml-user-drag: none;
         -moz-user-drag: none;
           -o-user-drag: none;
    }

    .background-decorator-1 {
      position: absolute;
      top: 30%;
      left: 0;
      width: 200%;
      height: 200%;
      background: rgba(0, 0, 0, 0.2);
      z-index: 15;
      transform: rotate(40deg);
    }

    .player {
      position: absolute;
      width: 80% !important;
      top: 5%;
      left: 20%;
      bottom: 0;
      right: 0;
      opacity: 1;
      transition: 0.5s;
    }

    .player.player1 {
      left: 0%;
      z-index: 3;
    }

    .player.player2 {
      left: 25%;
      z-index: 4;
    }

    .player.player3 {
      left: -25%;
      z-index: 2;
    }

    .player.player4 {
      left: 50%;
      z-index: 1;
    }
  }

  &:hover {
    .avatar-container {
      .advance {
        top: 5%;
        left: 5%;
        bottom: 0;
        right: 0;
        opacity: 1;
        z-index: 20;
        -webkit-filter: drop-shadow(0px 0px 10px #CCC);
                filter: drop-shadow(0px 0px 10px #CCC);
      }

      .normal {
        top: -10%;
        left: -20%;
        bottom: 0;
        right: 0;
        opacity: 0.5;
        z-index: 10;
        -webkit-filter: drop-shadow(0px 0px 10px #CCC);
                filter: drop-shadow(0px 0px 10px #CCC);
      }
    }
  }
`;

export {
  StyledProfile as Profile,
};
