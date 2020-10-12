// Node modules.
import _ from 'lodash';
import React, { useState } from 'react';
import { Card, Grid, Image, Rating } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
// Local modules.
import { CharacterData } from '../../models/Hero';
import * as Routes from '../../utils/Routes';
import { elementTransform, roleTransform } from '../../utils/Transformer';
import { ElementIcon } from '../Icon/ElementIcon';
import { RoleIcon } from '../Icon/RoleIcon';

interface ProfileProps {
  character: CharacterData;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { character } = props;
  const [heroCard] = _.orderBy(character.heroes, 'stockOrder', 'asc');

  const [lazyLoadOffset] = useState(200);

  return (
    <Link to={`${Routes.HEROES}/${character.meta.characterId}`}>
      <Card fluid>
        {/* This className is a workaround for LazyLoad with Card.Image */}
        {/* className will be 'image lazy-wrapper' */}
        <LazyLoad classNamePrefix='image lazy' offset={lazyLoadOffset}>
          <Image ui={false} alt={''}
            src={`/assets/covers/${character.meta.resourceName}.png`}
          />
        </LazyLoad>

        <Card.Content>
          <Card.Header>{character.meta.cardName}</Card.Header>

          <Card.Meta>{character.meta.resourceName}</Card.Meta>

          <Card.Description>
            <Grid divided={!isMobile} textAlign='center'>
              <Grid.Row>
                <Grid.Column width={6}>
                  <ElementIcon elementId={heroCard?.element} />
                  {!isMobile && elementTransform(heroCard?.element)}
                </Grid.Column>

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
}

export {
  Profile,
};
