// Node modules.
import _ from 'lodash';
import React, { useState } from 'react';
import { Message, Modal, Tab } from 'semantic-ui-react';
// Local modules.
import { CharacterData } from '../../models/Hero';
// Local components.
import * as Hero from './index';

interface DetailModalProps {
  character: CharacterData;
}

const DetailModal: React.FC<DetailModalProps> = (props) => {
  const { children, character } = props;

  const [open, setOpen] = useState(false);

  return (
    <Modal closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={children}
    >
      <Modal.Header>
        {character.meta.cardName} ({character.meta.resourceName})
      </Modal.Header>

      <Modal.Content scrolling>
        <Modal.Description>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={[
              {
                menuItem: '英雄資訊',
                render: () => (_.isEmpty(character.heroes)
                  ? <Message>
                    <Message.Header>此人物不能作為英雄</Message.Header>
                  </Message>
                  : <Hero.HeroMetric heroCards={character.heroes} />
                ),
              },
              {
                menuItem: '助手資訊',
                render: () => (_.isEmpty(character.sidekicks)
                  ? <Message>
                    <Message.Header>此人物不能作為助手</Message.Header>
                  </Message>
                  : <Hero.SidekickMetric sidekickCards={character.sidekicks} />
                ),
              },
              {
                menuItem: '人物資訊',
                render: () => <Hero.Metadata character={character} />,
              },
            ]}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export {
  DetailModal,
};
