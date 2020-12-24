// Node modules.
import React, { useContext } from 'react';
import Disqus from 'disqus-react';
import styled from 'styled-components';
// Local modules.
import { AppContext } from '../../contexts/AppContext';
import { disqusSettings as disqus } from '../../configs/';

interface PlayerDiscussionProps {
  className?: string;
  character: DataExtend.CharacterData;
};

const PlayerDiscussion: React.FC<PlayerDiscussionProps> = (props) => {
  const { className } = props;
  const { character: { meta } } = props;

  const { language } = useContext(AppContext);

  const { characterId, resourceName, cardName } = meta;
  const disqusConfig = {
    // This is the official solution.
    // https://help.disqus.com/en/articles/1717163-using-disqus-on-ajax-sites
    url: window.location.href.replace(disqus.orignalEntry, disqus.allowedEntry),
    identifier: `character:${characterId}-${resourceName}-${language}`,
    title: `${cardName} (${resourceName})`,
    language: language.replace('-', '_'),
  };

  return (
    <div className={className}>
      <Disqus.DiscussionEmbed
        shortname={disqus.shortname}
        config={disqusConfig}
      />
    </div>
  );
}

const styledPlayerDiscussion = styled(PlayerDiscussion)`
  #disqus_thread {
    position: relative;
  }

  #disqus_thread:after {
    content: '';
    display: block;
    height: 55px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: white;
  }
`;

export {
  styledPlayerDiscussion as PlayerDiscussion,
};
