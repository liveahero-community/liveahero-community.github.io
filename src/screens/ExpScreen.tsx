// Node modules.
import React, { useCallback, useContext, useState } from 'react';
import {
  Container,
  Grid,
  Header,
  Checkbox,
  CheckboxProps,
  Divider,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
// Local modules.
import * as Config from '../configs/index';
import { AppContext } from '../contexts/AppContext';
// Local components.
import * as Framework from '../components/Framework';
import { ExpTable } from '../components/Character';
import { ItemIcon, Item } from '../components/Icon/ItemIcon';

interface RightSubTitle {
  className?: string;
}

const RightSubTitle: React.FC<RightSubTitle> = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

const StyledRightSubTitle = styled(RightSubTitle)`
  & {
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 0.75em;

    .checkbox {
      transform: scale(0.7);
    }
  }
`;

const ExpScreen: React.FC = () => {
  const { language } = useContext(AppContext);

  const [isSimple, setIsSimple] = useState(true);

  const onSimpleModeChange = useCallback((_event, data: CheckboxProps) => {
    setIsSimple(data.checked!);
  }, []);

  return (
    <Framework.Common>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`EXP 需求 | ${Config.websiteTitle[language]}`}</title>
      </Helmet>

      <Container text>
        <Grid columns={2} verticalAlign='middle'>
          <Grid.Column>
            <Header inverted floated='left'>
              <ItemIcon name={Item.EXP} size={28} />
              <Header.Content>
                {`英雄 EXP 需求`}
              </Header.Content>
            </Header>
          </Grid.Column>

          <Grid.Column>
            <Header inverted floated='right'>
              <StyledRightSubTitle>
                {'精簡'}
                <Checkbox className={'checkbox'} toggle
                  checked={isSimple}
                  onChange={onSimpleModeChange}
                />
              </StyledRightSubTitle>
            </Header>
          </Grid.Column>
        </Grid>

        <ExpTable mode='hero' isSimple={isSimple} />

        <Divider inverted section />

        <Grid columns={2} verticalAlign='middle'>
          <Grid.Column>
            <Header inverted floated='left'>
              <ItemIcon name={Item.TRAINING_BAND} size={28} />
              <Header.Content>
                {`助手 EXP 需求`}
              </Header.Content>
            </Header>
          </Grid.Column>

          <Grid.Column>
            <Header inverted floated='right'>
              <StyledRightSubTitle>
                {'精簡'}
                <Checkbox className={'checkbox'} toggle
                  checked={isSimple}
                  onChange={onSimpleModeChange}
                />
              </StyledRightSubTitle>
            </Header>
          </Grid.Column>
        </Grid>

        <ExpTable mode='sidekick' isSimple={isSimple} />
      </Container>
    </Framework.Common>
  );
}

export {
  ExpScreen,
};
