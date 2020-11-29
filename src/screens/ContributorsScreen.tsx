// Node modules.
import React, { useContext } from 'react';
import { Container, Header, Table, Icon, Divider } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
// Local modules.
import * as Config from '../configs/index';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';

interface DeclarationProps {
  className?: string;
}

const Declaration: React.FC<DeclarationProps> = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <p>{`相關翻譯已獲得作者轉載授權`}</p>
      <p>{`有志貢獻者請至巴哈姆特私訊 Salmon`}</p>
      <a target='_blank' rel='noopener noreferrer'
        href={`https://forum.gamer.com.tw/Co.php?bsn=39312&sn=106`} 
      >
        {'> 巴哈姆特討論串 <'}
      </a>

      <Divider inverted section />

      <p>
        {`本網站所使用之 `}
        <b><i>{`Live A Hero`}</i></b>
        {` 素材多為 `}
        <b><i>{`LifeWonders Inc.`}</i></b>
        {` 所擁有。`}
      </p>
      <p>{`僅作為學習，無商業營利等用途。`}</p>

      <br/>

      <p>
        {`Most of the `}
        <b><i>{`Live A Hero`}</i></b>
        {` materials used on this website are owned by `}
        <b><i>{`LifeWonders Inc.`}</i></b>
      </p>
      <p>{`Only used for learning, no commercial profit and other purposes.`}</p>
    </div>
  );
};

const StyledDeclaration = styled(Declaration)`
  & {
    color: #AAA;
    text-align: center;
  }
`;

const ContributorsScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`貢獻者列表 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Header inverted>{`貢獻者列表`}</Header>

        <Table basic='very' unstackable inverted>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='right'>{`網站架設`}</Table.Cell>
              <Table.Cell>{`Salmon`}</Table.Cell>
              <Table.Cell>
                <a target='_blank' rel='noopener noreferrer'
                  href='https://home.gamer.com.tw/homeindex.php?owner=grass0916' 
                >
                  <Icon name='share square outline' />
                </a>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell textAlign='right'>{`英雄技能翻譯`}</Table.Cell>
              <Table.Cell>{`划水德小牛`}</Table.Cell>
              <Table.Cell>
                <a target='_blank' rel='noopener noreferrer'
                  href='https://home.gamer.com.tw/homeindex.php?owner=double0435' 
                >
                  <Icon name='share square outline' />
                </a>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell textAlign='right'>{`人物檔案翻譯`}</Table.Cell>
              <Table.Cell>{`無世`}</Table.Cell>
              <Table.Cell>
                <a target='_blank' rel='noopener noreferrer'
                  href='https://home.gamer.com.tw/creation.php?owner=gght86' 
                >
                  <Icon name='share square outline' />
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Divider hidden />

        <StyledDeclaration />
      </Container>
    </Framework.Common>
  );
}

export {
  ContributorsScreen,
};
