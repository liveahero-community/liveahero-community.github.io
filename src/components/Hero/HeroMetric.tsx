// Node modules.
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Grid,
  Header,
  Divider,
  RatingProps,
  Rating,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
// Local modules.
import { HeroData } from '../../models/Hero';
import { elementTransform, roleTransform } from '../../utils/Transformer';
// Local components.
import { ElementIcon } from '../Icon/ElementIcon';
import { RoleIcon } from '../Icon/RoleIcon';
import * as Hero from './index';

const MAX_RARITY = 6;

interface HeroMetricProps {
  heroCards: HeroData[];
};

const HeroMetric: React.FC<HeroMetricProps> = (props) => {
  const { heroCards } = props;

  const [selectedRarity, setSelectedRarity] = useState(
    _.first(heroCards)!.rarity || 0
  );
  const [heroCard, setHeroCard] = useState<HeroData>(
    _.find(heroCards, (card) => card.rarity === selectedRarity)!
  );
  const [previousHeroCard, setPreviousHeroCard] = useState<HeroData>();

  const minRarity = _.minBy(heroCards, (card) => card.rarity)!.rarity || 0;
  const maxRarity = _.maxBy(heroCards, (card) => card.rarity)!.rarity || 0;

  // When rarity is changing.
  const onRarityChanged = useCallback((_event, data: RatingProps) => {
    const rarity = Number(data.rating);

    if (minRarity <= rarity && rarity <= maxRarity) {
      setSelectedRarity(rarity);
    } else {
      toast(`${heroCard.cardName} 為 ${minRarity} 星至 ${maxRarity} 星`);
    }
  }, [heroCard, minRarity, maxRarity]);

  // Update current hero card to seleted rarity.
  useEffect(() => {
    const currentCard = _.find(heroCards, (card) => card.rarity === selectedRarity)!;
    const lowerCard = _.find(heroCards, (card) => card.rarity === selectedRarity - 1)!;
    setHeroCard(currentCard);
    setPreviousHeroCard(lowerCard);
  }, [selectedRarity, heroCards]);

  return (
    <>
      {/* Meta */}
      <Grid stackable textAlign='center'>
        <Grid.Row columns={2}>
          <Grid.Column>
            {`屬性：`}
            <ElementIcon elementId={heroCard.element} />
            {elementTransform(heroCard.element)}
          </Grid.Column>

          <Grid.Column>
            {`角色定位：`}
            <RoleIcon roleId={heroCard.role} />
            {roleTransform(heroCard.role)}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {/* Status */}
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Column>
          <Header as='h3'>{`英雄能力`}</Header>
        </Grid.Column>

        <Grid.Column textAlign='right'>
          {`調整星數：`}
          <Rating icon='star'
            rating={selectedRarity}
            maxRating={MAX_RARITY}
            onRate={onRarityChanged}
          />
        </Grid.Column>
      </Grid>

      <Hero.CharacterDetailStatusTable
        card={heroCard}
        previousCard={previousHeroCard}
      />

      <Divider section />

      {/* Skills */}
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Column>
          <Header as='h3'>{`英雄技能`}</Header>
        </Grid.Column>

        <Grid.Column textAlign='right'>
          {`調整星數：`}
          <Rating icon='star'
            rating={selectedRarity}
            maxRating={6}
            onRate={onRarityChanged}
          />
        </Grid.Column>
      </Grid>

      <Hero.CharacterDetailSkillTable
        path={'skills'}
        card={heroCard}
        previousCard={previousHeroCard}
      />
    </>
  );
}

export {
  HeroMetric,
};
