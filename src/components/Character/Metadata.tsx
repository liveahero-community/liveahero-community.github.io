// Node modules.
import _ from 'lodash';
import React, { useCallback, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Table,
  Header,
  Image,
  Select,
  DropdownProps,
  Tab,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import * as Routes from '../../utils/Routes';
import { AppContext } from '../../contexts/AppContext';

const detailKeyMapping = (key: string) => {
  switch (key) {
    case 'h01':
      return '情報01';
    case 'h02':
      return '情報02';
    case 's01':
      return '外傳';
  }
};

const breakLineWrapper = (text: string) => {
  return text.split('<br>').map((line, i) =>
    <div key={i} className='paragraph'>{line}</div>
  );
};

interface MetadataProps {
  className?: string;
  character: DataExtend.CharacterData;
};

interface Option {
  key: string;
  value: string;
  text: string;
}

const Metadata: React.FC<MetadataProps> = (props) => {
  const { className } = props;
  const { character: { heroes, sidekicks, meta } } = props;

  const { figureProvider } = useContext(AppContext);

  const character = (_.first(heroes) || _.first(sidekicks))!;
  const options: Option[] = [];

  if (_.first(heroes)) {
    const figures = figureProvider?.getFigureUrls(character.resourceName, ['group:hero']);
    figures?.forEach((figure) => {
      options.push({
        key: figure.name,
        value: figure.url,
        text: `英雄 (${figure.name})`,
      });
    });
  }

  if (_.first(sidekicks)) {
    const figures = figureProvider?.getFigureUrls(character.resourceName, ['group:sidekick']);
    figures?.forEach((figure) => {
      options.push({
        key: figure.name,
        value: figure.url,
        text: `助手 (${figure.name})`,
      });
    });
  }

  const detailPanes = _.map(meta.detail, (value, key) => ({
    menuItem: detailKeyMapping(key),
    render: () => (
      <Segment className='detail' basic compact>
        {breakLineWrapper(value!)}
      </Segment>
    ),
  }));

  const [illustration, setIllustration] = useState(_.first(options)?.value);

  // When selection is changing.
  const onIllustrationChanged = useCallback((_event, data: DropdownProps) => {
    const illustration = String(data.value);
    setIllustration(illustration);
  }, []);

  return (
    <Grid className={className} columns={2} stackable centered>
      <Grid.Column>
        <Select fluid
          value={illustration}
          onChange={onIllustrationChanged}
          options={options}
        />

        <Image className='illustration' alt={''}
          src={illustration}
        />
      </Grid.Column>

      <Grid.Column>
        <Header as='h3'>{`基本資訊`}</Header>

        <Table basic='very' unstackable>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='right'>
                <Header as='h4'>{`人物編號`}</Header>
              </Table.Cell>
              <Table.Cell>{character.characterId}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell textAlign='right'>
                <Header as='h4'>{`繪師`}</Header>
              </Table.Cell>
              <Table.Cell>{character.illustrator}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell textAlign='right'>
                <Header as='h4'>{`聲優`}</Header>
              </Table.Cell>
              <Table.Cell>{character.characterVoice}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell textAlign='right'>
                <Header as='h4'>{`職業`}</Header>
              </Table.Cell>
              <Table.Cell>{character.job}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell textAlign='right'>
                <Header as='h4'>{`所屬事務所`}</Header>
              </Table.Cell>
              <Table.Cell>{character.affiliationOffice}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Header as='h3'>{`個人情報`}</Header>

        <Tab panes={detailPanes} defaultActiveIndex={detailPanes.length - 1} />

        <Link className='source' to={Routes.CONTRIBUTORS}>
          <div>{`翻譯來源`}</div>
        </Link>
      </Grid.Column>
    </Grid>
  );
}

const styledMetadata = styled(Metadata)`
  .detail {
    line-height: 1.75em;
    letter-spacing: 0.05em;

    .paragraph {
      margin-bottom: 1em;
    }
  }

  .source {
    color: #AAA;
    text-align: right;
    font-style: italic;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export {
  styledMetadata as Metadata,
};
