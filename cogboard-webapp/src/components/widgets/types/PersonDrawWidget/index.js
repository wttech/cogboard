import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { Refresh } from '@material-ui/icons';
import { getIsAuthenticated } from '../../../../selectors';
import { useSelector } from 'react-redux';
import { TypographyVariant } from './styled';
import { CenterWrapper } from '../TextWidget/styled';
import { array, bool, number } from 'prop-types';
import { postWidgetContentUpdate } from '../../../../utils/fetch';

const PersonDrawWidget = ({ id, multiTextInput, index }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const caption =
    multiTextInput && multiTextInput.length - 1 >= index
      ? multiTextInput[index]
      : '';

  function handleManualRefresh() {
    postWidgetContentUpdate({
      id,
      content: { forceCycle: true }
    }).catch(e => console.log(e));
  }

  return (
    <>
      <CenterWrapper>
        <TypographyVariant>{caption}</TypographyVariant>
      </CenterWrapper>
      {isAuthenticated && (
        <IconButton
          color="primary"
          aria-label="refresh"
          component="span"
          onClick={handleManualRefresh}
        >
          <Refresh />
        </IconButton>
      )}
    </>
  );
};

PersonDrawWidget.propTypes = {
  randomizeCheckbox: bool,
  personDrawInterval: number,
  personDrawDailySwitch: bool,
  multiTextInput: array,
  index: number
};

PersonDrawWidget.defaultProps = {
  index: -1,
  randomizeCheckbox: false,
  personDrawInterval: 120,
  personDrawDailySwitch: false,
  multiTextInput: []
};

export default PersonDrawWidget;
