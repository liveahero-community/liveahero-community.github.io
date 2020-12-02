// Node modules.
import React, { useContext } from 'react';
import Disqus from 'disqus-react';
import styled from 'styled-components';
// Local modules.
import { AppContext } from '../../contexts/AppContext';

interface PlayerDiscussionProps {
  className?: string;
  character: DataExtend.CharacterData;
};

const PlayerDiscussion: React.FC<PlayerDiscussionProps> = (props) => {
  const { className } = props;
  const { character: { meta } } = props;

  const { language } = useContext(AppContext);

  const { characterId, resourceName, cardName } = meta;
  const disqusShortname = cardName;
  const disqusConfig = {
    url: window.location.href.replace('/#/', '/'),
    identifier: `character-${characterId}-${resourceName}`,
    title: cardName,
    language: language.replace('-', '_'),
  };

  return (
    <div className={className}>
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}

const styledPlayerDiscussion = styled(PlayerDiscussion)`
`;

export {
  styledPlayerDiscussion as PlayerDiscussion,
};
