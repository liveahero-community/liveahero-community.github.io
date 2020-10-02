// Node modules.
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Divider,
  Grid,
  Header,
  Rating,
  RatingProps,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
// Local modules.
import { SidekickData } from '../../models/Hero';
// Local components.
import * as Hero from './index';

const MAX_RARITY = 4;
const MAX_LEVEL_ZONE = 6;

interface SidekickMetricProps {
  sidekickCards: SidekickData[];
};

const SidekickMetric: React.FC<SidekickMetricProps> = (props) => {
  const { sidekickCards } = props;

  const [rarity] = useState(
    _.first(sidekickCards)!.rarity || 0
  );
  const [selectedLevelZone, setSelectedLevelZone] = useState(
    _.first(sidekickCards)!.levelZone || 0
  );
  const [sidekickCard, setSidekickCard] = useState<SidekickData>(
    _.find(sidekickCards, (card) => card.rarity === rarity)!
  );
  const [previousSidekickCard, setPreviousSidekickCard] = useState<SidekickData>();

  const minLevelZone = _.minBy(sidekickCards, (card) => card.levelZone)!.levelZone || 0;
  const maxLevelZone = _.maxBy(sidekickCards, (card) => card.levelZone)!.levelZone || 0;

  // When level zone is changing.
  const onLevelZoneChanged = useCallback((_event, data: RatingProps) => {
    const levelZone = Number(data.rating);

    if (minLevelZone <= levelZone && levelZone <= maxLevelZone) {
      setSelectedLevelZone(levelZone);
    } else {
      toast(`${sidekickCard.cardName} 為 ${minLevelZone} 級至 ${maxLevelZone} 級`);
    }
  }, [sidekickCard, minLevelZone, maxLevelZone]);

  // Update current hero card to seleted level zone.
  useEffect(() => {
    const currentCard = _.find(sidekickCards, (card) => card.levelZone === selectedLevelZone)!;
    const lowerCard = _.find(sidekickCards, (card) => card.levelZone === selectedLevelZone - 1)!;
    setSidekickCard(currentCard);
    setPreviousSidekickCard(lowerCard);
  }, [selectedLevelZone, sidekickCards]);

  return (
    <>
      {/* Status */}
      <Grid verticalAlign='middle'>
        <Grid.Column width={5}>
          <Header as='h3'>{`助手技能`}</Header>
        </Grid.Column>

        <Grid.Column width={11} textAlign='right'>
          <div>
            {`固定星數：`}
            <Rating icon='star' disabled
              rating={rarity}
              maxRating={MAX_RARITY}
            />
          </div>

          <div>
            {`調整上限：`}
            <Rating icon='heart'
              rating={selectedLevelZone}
              maxRating={MAX_LEVEL_ZONE}
              onRate={onLevelZoneChanged}
            />
          </div>
        </Grid.Column>
      </Grid>

      <Hero.CharacterDetailStatusTable
        card={sidekickCard}
        previousCard={previousSidekickCard}
      />

      <Divider section />

      {/* Skills */}
      <Grid verticalAlign='middle'>
        <Grid.Column width={5}>
          <Header as='h3'>{`助手技能`}</Header>
        </Grid.Column>

        <Grid.Column width={11} textAlign='right'>
          <div>
            {`固定星數：`}
            <Rating icon='star' disabled
              rating={rarity}
              maxRating={MAX_RARITY}
            />
          </div>

          <div>
            {`調整上限：`}
            <Rating icon='heart'
              rating={selectedLevelZone}
              maxRating={MAX_LEVEL_ZONE}
              onRate={onLevelZoneChanged}
            />
          </div>
        </Grid.Column>
      </Grid>

      <Hero.CharacterDetailSkillTable
        path={'skills'}
        card={sidekickCard}
        previousCard={previousSidekickCard}
      />

      <Header as='h3'>{`助手裝備技能`}</Header>

      <Hero.CharacterDetailSkillTable
        hideCost={true}
        path={'equipmentSkills'}
        card={sidekickCard}
        previousCard={previousSidekickCard}
      />
    </>
  );
}

export {
  SidekickMetric,
};
