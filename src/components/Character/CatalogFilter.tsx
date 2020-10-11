// Node modules.
import React, { useCallback, useState } from 'react';
import {
  Button,
  Modal,
  Header,
  Icon,
  Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';
// Local components.
import { ElementIcon } from '../Icon/';

interface CatalogFilterButtonProps {
  className?: string;
}

const CatalogFilterButton: React.FC<CatalogFilterButtonProps> = (props) => {
  const { className } = props;

  return (
    <Button className={`${className} filter-button`} inverted circular
      color='orange'
      size='large'
      icon='filter'
    />
  );
}

const StyledCatalogFilterButton = styled(CatalogFilterButton)`
  &.filter-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    z-index: 100;
  }
`;

interface CatalogFilterProps {
  className?: string;
  ranks: boolean[];
  updateRanks: (index: number) => void;
  elements: boolean[];
  updateElements: (index: number) => void;
}

const CatalogFilter: React.FC<CatalogFilterProps> = (props) => {
  const { className } = props;
  const { elements, updateElements } = props;

  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Modal className={className} basic size='small' dimmer='blurring'
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      trigger={
        <div>
          <StyledCatalogFilterButton />
        </div>
      }
    >
      <Modal.Content>
        {/* TODO:

        <Checkbox />
        {`直接顯示人物最高星素質`}

        <Divider />

        */}

        {/* TODO:

        <Header as='h3' inverted textAlign='center'>
          {`英雄天生星數`}
        </Header>

        <Grid columns='equal' padded>
          <Grid.Row>
            {ranks.map((rank, i) => (
              <Grid.Column key={i} textAlign='center'>
                <div onClick={updateRanks.bind(null, i)}>
                  <RankIcon rankLevel={i + 3} size={54} pointer translucent={rank} />
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>

        <Divider />

        */}

        <Header as='h3' inverted textAlign='center'>
          {`英雄屬性`}
        </Header>

        <Grid columns='equal' padded>
          <Grid.Row>
            {elements.map((element, i) => (
              <Grid.Column key={i} textAlign='center'>
                <div onClick={updateElements.bind(null, i)}>
                  <ElementIcon elementId={i + 1} size={36} pointer translucent={!element} />
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Modal.Content>

      <Modal.Actions>
        <Button color='green' inverted onClick={onClose}>
          <Icon name='checkmark' />
          {`關閉`}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const syyledCatalogFilter = styled(CatalogFilter)`
  .item {
    cursor: pointer;
  }
`;

export {
  syyledCatalogFilter as CatalogFilter,
};
