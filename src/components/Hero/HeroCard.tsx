// Node modules.
import _ from 'lodash';
import React from 'react';
import { Card, Grid, Image, Rating } from 'semantic-ui-react';
// Local modules.
import { CharacterData } from '../../models/Hero';
import { elementTransform, roleTransform } from '../../utils/Transformer';
import { ElementIcon } from '../Icon/ElementIcon';
import { RoleIcon } from '../Icon/RoleIcon';
// Local components.
import { DetailModal } from './index';

interface HeroCardProps {
  character: CharacterData;
}

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const { character } = props;
  const [heroCard] = _.orderBy(character.heroes, 'stockOrder', 'asc');

  return (
    <DetailModal character={character}>
      <Card>
        <Image wrapped ui={false} alt={''}
          src={`https://live-a-hero.jp/wp-content/uploads/2020/09/chara_${character.meta.resourceName}.png`}
        />

        <Card.Content>
          <Card.Header>{character.meta.cardName}</Card.Header>

          <Card.Meta>{character.meta.resourceName}</Card.Meta>

          <Card.Description>
            <Grid divided textAlign='center'>
              <Grid.Row>
                <Grid.Column width={6}>
                  <ElementIcon elementId={heroCard?.element} />
                  {elementTransform(heroCard?.element)}
                </Grid.Column>

                <Grid.Column width={10}>
                  <RoleIcon roleId={heroCard?.role} />
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
  HeroCard,
};
