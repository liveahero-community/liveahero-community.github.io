// Node modules.
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import {
  Grid,
  Table,
  Header,
  Image,
  Select,
  DropdownProps,
} from 'semantic-ui-react';
import styled from 'styled-components';
// Local modules.
import { CharacterData } from '../../models/Hero';

interface MetadataProps {
  className?: string;
  character: CharacterData;
};

const Metadata: React.FC<MetadataProps> = (props) => {
  const { className } = props;
  const { character: { heroes, sidekicks } } = props;

  const character = (_.first(heroes) || _.first(sidekicks))!;
  const options = [];

  if (_.first(heroes)) {
    options.push({
      key: `${character.resourceName}_h01`,
      value: `/assets/illustrations/${character.resourceName}_h01.png`,
      text: `英雄`,
    });
  }
  if (_.first(sidekicks)) {
    options.push({
      key: `${character.resourceName}_s01`,
      value: `/assets/illustrations/${character.resourceName}_s01.png`,
      text: `助手`,
    });
  }

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
      </Grid.Column>
    </Grid>
  );
}

const styledMetadata = styled(Metadata)`
`;

export {
  styledMetadata as Metadata,
};
