// Node modules.
import _ from 'lodash';
import React, { useCallback, useContext, useState } from 'react';
import {
  Container,
  Header,
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

interface SidekickTableViewProps {
  className?: string;
}

const SidekickTableView: React.FC<SidekickTableViewProps> = (props) => {
  const { className } = props;

  const [levelZone] = useState<number>(6);
  const [level] = useState<number>(100);
  const [column, setColumn] = useState<string>('id');
  const [direction, setDirection] = useState<'ascending' | 'descending'>('descending');

  const { masterData } = useContext(AppContext);

  const onSort = useCallback((selectedColumn: string) => {
    if (selectedColumn === column) {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    } else {
      setColumn(selectedColumn);
      setDirection('descending');
    }
  }, [column, direction]);

  // Filtering.
  const characters = _
    // Filter levelZone 6 data.
    .map(masterData?.characterDict, (character: DataExtend.CharacterData) => ({
      ...character,
      sidekicks: character.sidekicks.filter((sidekick) => sidekick.levelZone === levelZone),
    }))
    .filter((character) => character.sidekicks.length > 0)
    // Metric status.
    .map((character) => ({
      meta: character.meta,
      sidekick: {
        ...character.sidekicks[0],
        growth: character.sidekicks[0].growths.find((growth) => growth.level === level),
      },
    }));

  // Sorting.
  const sortedCharacters = _.orderBy(
    characters,
    [`sidekick.growth.${column}`],
    [direction === 'ascending' ? 'asc' : 'desc'],
  );

  return (
    <>
      <Container text textAlign='center'>
        <Header inverted>
          <Header.Content>
            {`助手素質能力一覽`}
          </Header.Content>
        </Header>
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
                  {character.meta.resourceName !== 'player'
                    ? <Image alt='' size='mini'
                      src={urlJoin(Config.publicUrl, `/archives/Texture2D/icon_${character.meta.resourceName}_s01.png`)}
                    />
                    : <Image alt='' size='mini'
                      src={urlJoin(Config.publicUrl, `/archives/Texture2D/icon_player1_s01.png`)}
                    />
                  }
                </Link>
              </Table.Cell>

              {/* Level */}
              <Table.Cell textAlign='center'>
                {character.sidekick.growth?.level}
              </Table.Cell>

              {/* HP */}
              <Table.Cell textAlign='right'>
                {character.sidekick.growth?.hp}
              </Table.Cell>

              {/* Attack */}
              <Table.Cell textAlign='right'>
                {character.sidekick.growth?.attack}
              </Table.Cell>

              {/* Speed */}
              <Table.Cell textAlign='right'>
                {character.sidekick.growth?.agility}
              </Table.Cell>

              {/* View */}
              <Table.Cell textAlign='right'>
                {character.sidekick.growth?.addView}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

const SidekickTableViewScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`助手素質能力一覽 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container>
        <SidekickTableView />
      </Container>
    </Framework.Common>
  );
}

export {
  SidekickTableViewScreen,
};
