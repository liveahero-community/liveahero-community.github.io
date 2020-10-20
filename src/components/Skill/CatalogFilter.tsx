// Node modules.
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Header,
  Icon,
  Dropdown,
  DropdownProps,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
// Local modules.
import { EffectClass } from '../../models/Skill';
import { effectClassTransform } from '../../utils/Transformer';
import * as Routes from '../../utils/Routes';

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
  effectClasses: EffectClass[];
}

const CatalogFilter: React.FC<CatalogFilterProps> = (props) => {
  const { className } = props;
  const { effectClasses } = props;

  const [open, setOpen] = useState(false);
  const [selectEffectClass, setSelectEffectClass] = useState<EffectClass>();

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const updateSelectedEffectClass = useCallback((_event, data: DropdownProps) => {
    setSelectEffectClass(data.value as EffectClass);
  }, []);

  useEffect(() => {
    setSelectEffectClass(undefined);
    setOpen(false);
  }, [selectEffectClass]);

  const effectClassOptions = _.map(effectClasses, (effectClass) => ({
    key: effectClass,
    text: effectClassTransform(effectClass),
    value: effectClass,
  }))

  if (selectEffectClass) {
    return (
      <Redirect to={`${Routes.SKILL_CATEGORIES}/${selectEffectClass}`} />
    );
  }

  return (
    <Modal className={className} basic size='small' dimmer='blurring' closeOnDimmerClick={false}
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
        <Header as='h3' inverted textAlign='center'>
          {`技能類型`}
        </Header>

        <Dropdown fluid search selection
          options={effectClassOptions}
          onChange={updateSelectedEffectClass}
        />
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

const styledCatalogFilter = styled(CatalogFilter)`
  .item {
    cursor: pointer;
  }
`;

export {
  styledCatalogFilter as CatalogFilter,
};
