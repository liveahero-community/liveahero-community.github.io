// Node modules.
import _ from 'lodash';
import React from 'react';
import { Card, Grid, Image, Rating } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
// Local modules.
import { CharacterData } from '../../models/Hero';
import { elementTransform, roleTransform } from '../../utils/Transformer';
import { ElementIcon } from '../Icon/ElementIcon';
import { RoleIcon } from '../Icon/RoleIcon';
// Local components.
import { DetailModal } from './index';

interface ProfileProps {
  character: CharacterData;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { character } = props;
  const [heroCard] = _.orderBy(character.heroes, 'stockOrder', 'asc');

  return (
    <DetailModal character={character}>
      <Card>
        <Image wrapped ui={false} alt={''}
          src={`/assets/covers/${character.meta.resourceName}.png`}
        />

        <Card.Content>
          <Card.Header>{character.meta.cardName}</Card.Header>

          <Card.Meta>{character.meta.resourceName}</Card.Meta>

          <Card.Description>
            <Grid divided={!isMobile} textAlign='center'>
              <Grid.Row>
                <Grid.Column width={isMobile ? 4 : 6}>
                  <ElementIcon elementId={heroCard?.element} />
                  {!isMobile && elementTransform(heroCard?.element)}
                </Grid.Column>

                <Grid.Column width={isMobile ? 12 : 10}>
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
    </DetailModal >
  );
}

export {
  Profile,
};
