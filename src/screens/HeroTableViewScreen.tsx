// Node modules.
import _ from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import {
  Container,
  Header,
  Segment,
  Button,
  Rating,
  Table,
  Image,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import urlJoin from 'url-join';
// Local modules.
import * as Config from '../configs/index';
import * as Routes from '../utils/Routes';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';

interface HeroTableViewProps {
  className?: string;
  filtering: {
    ranks: boolean[];
    elements: boolean[];
  };
}

const HeroTableView: React.FC<HeroTableViewProps> = (props) => {
  const { className } = props;
  const { filtering } = props;

  const { elements } = filtering;

  const [rarity, setRarity] = useState<number>(6);
  const [level, setLevel] = useState<number>(60);
  const [column, setColumn] = useState<string>('id');
  const [direction, setDirection] = useState<'ascending' | 'descending'>('descending');

  const { masterData } = useContext(AppContext);

  const updateRarity = useCallback((selectedRarity: number) => {
    setRarity(selectedRarity);
    setLevel(selectedRarity * 10);
  }, []);

  const onSort = useCallback((selectedColumn: string) => {
    console.log(selectedColumn, column);
    if (selectedColumn === column) {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    } else {
      setColumn(selectedColumn);
      setDirection('descending');
    }
  }, [column, direction]);

  // Filtering.
  const characters = _
    // Filter rarity 5 and 6 data.
    .map(masterData?.characterDict, (character: DataExtend.CharacterData) => ({
      ...character,
      heroes: character.heroes.filter((hero) => hero.rarity === rarity),
    }))
    .filter((character) => character.heroes.length > 0)
    // Metric status.
    .map((character) => ({
      meta: character.meta,
      hero: {
        ...character.heroes[0],
        growth: character.heroes[0].growths.find((growth) => growth.level === level),
      },
    }))
    // Filter by element
    .filter((character) => {
      return !_.includes(elements, false) || elements[character.meta.heroElement! - 1];
    });

  // Sorting.
  const sortedCharacters = _.orderBy(
    characters,
    [`hero.growth.${column}`],
    [direction === 'ascending' ? 'asc' : 'desc'],
  );

  return (
    <>
      <Container text textAlign='center'>
        <Header inverted>
          <Header.Content>
            {`英雄能力一覽`}
          </Header.Content>
        </Header>

        <Segment basic>
          <Button inverted color={rarity === 5 ? 'orange' : 'grey'}
            onClick={() => updateRarity(5)}
          >
            <Rating icon='star' disabled rating={5} maxRating={5} />
          </Button>

          <Button inverted color={rarity === 6 ? 'orange' : 'grey'}
            onClick={() => updateRarity(6)}
          >
            <Rating icon='star' disabled rating={6} maxRating={6} />
          </Button>
        </Segment>
      </Container>

      <Table className={className} sortable compact celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'
              sorted={column === 'id' ? direction : undefined}
              onClick={() => onSort('name')}
            >
              {`名稱`}
            </Table.HeaderCell>

            <Table.HeaderCell textAlign='center'>
              {`等級`}
            </Table.HeaderCell>

            <Table.HeaderCell textAlign='center'
              sorted={column === 'hp' ? direction : undefined}
              onClick={() => onSort('hp')}
            >
              {`血量`}
            </Table.HeaderCell>

            <Table.HeaderCell textAlign='center'
              sorted={column === 'attack' ? direction : undefined}
              onClick={() => onSort('attack')}
            >
              {`攻擊力`}
            </Table.HeaderCell>

            <Table.HeaderCell textAlign='center'
              sorted={column === 'agility' ? direction : undefined}
              onClick={() => onSort('agility')}
            >
              {`速度`}
            </Table.HeaderCell>

            <Table.HeaderCell textAlign='center'
              sorted={column === 'addView' ? direction : undefined}
              onClick={() => onSort('addView')}
            >
              {`view`}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(sortedCharacters, (character, i) => (
            <Table.Row key={i}>
              {/* Image and name */}
              <Table.Cell collapsing textAlign='center'>
                <Link className={className} to={`${Routes.HEROES}/${character.meta.resourceName}`}>
                  <Image alt='' size='mini'
                    src={urlJoin(Config.publicUrl, `/archives/Texture2D/icon_${character.meta.resourceName}_h01.png`)}
                  />
                </Link>
              </Table.Cell>

              {/* Level */}
              <Table.Cell textAlign='center'>
                {character.hero.growth?.level}
              </Table.Cell>

              {/* HP */}
              <Table.Cell textAlign='right'>
                {character.hero.growth?.hp}
              </Table.Cell>

              {/* Attack */}
              <Table.Cell textAlign='right'>
                {character.hero.growth?.attack}
              </Table.Cell>

              {/* Speed */}
              <Table.Cell textAlign='right'>
                {character.hero.growth?.agility}
              </Table.Cell>

              {/* View */}
              <Table.Cell textAlign='right'>
                {character.hero.growth?.addView}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

const HeroTableViewScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`英雄能力一覽 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container>
        <HeroTableView
          filtering={{
            ranks: [],
            elements: [],
          }}
        />
      </Container>
    </Framework.Common>
  );
}

export {
  HeroTableViewScreen,
};
