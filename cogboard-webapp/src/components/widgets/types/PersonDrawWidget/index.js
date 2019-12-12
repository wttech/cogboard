import React from 'react';

import { TypographyVariant } from './styled';

import storage from './helpers';
import IconButton from '@material-ui/core/IconButton';
import { Refresh } from '@material-ui/icons';
import { getIsAuthenticated } from '../../../../selectors';
import { useSelector } from 'react-redux';
import { CenterWrapper } from '../TextWidget/styled';
import { number, bool, string } from 'prop-types';

const getRandomNumber = length => Math.floor(Math.random() * length);
const getNextIndex = (currentIndex, length) =>
  currentIndex < length - 1 ? ++currentIndex : 0;
const calculateNextDay = () => {
  const day = new Date();
  day.setDate(day.getDate() + 1);
  return day.setHours(0, 1, 0, 0);
};
const calculateNextUpdate = minutes => {
  let d = new Date();
  return d.setMinutes(d.getMinutes() + minutes);
};
const getRandomIndex = (currentIndex, length) => {
  const usedIndexes = storage.getLastKeys() || [];
  let nextIndex;

  if (usedIndexes.length === 0 || usedIndexes.length > length) {
    storage.removeLastKeys();
    nextIndex = getRandomNumber(length);
    storage.setLastKeys([nextIndex]);
  } else {
    nextIndex = getRandomIndexFromArray(length, usedIndexes);
    usedIndexes.push(nextIndex);
    storage.setLastKeys(usedIndexes);
  }

  storage.setIndex(nextIndex);
  return nextIndex;
};
const getRandomIndexFromArray = (length, usedIndexes) => {
  const indexes = Array.from(new Array(length), (v, i) => i).filter(
    e => !usedIndexes.includes(e)
  );

  return indexes.length > 0
    ? indexes[getRandomNumber(indexes.length)]
    : getRandomNumber(length);
};
const getIndex = (length, getNextIndex, setUpdateTime) => {
  let index = storage.getIndex() || 0;
  index = index < length ? index : 0;
  if (storage.shouldGenerateNextIndex()) {
    index = getNextIndex(index, length);
    setUpdateTime();
    storage.setIndex(index);
  }
  return index;
};
const getCopy = (texts, cycleMethod, interval) => {
  return texts && texts.length >= 1
    ? texts[getIndex(texts.length, cycleMethod, interval)]
    : texts[0];
};

const TextWidgetSample = ({
  personDrawInterval,
  personDrawDailySwitch,
  randomizeCheckbox,
  multiTextInput
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const texts =
    multiTextInput && multiTextInput.length ? JSON.parse(multiTextInput) : [''];
  const cycleMethod = randomizeCheckbox ? getRandomIndex : getNextIndex;
  const nextChange = (isDaily, interval) =>
    isDaily
      ? () => storage.setDate(calculateNextDay())
      : () => storage.setDate(calculateNextUpdate(interval));
  if (
    !personDrawDailySwitch &&
    new Date().getTime() + 120 * 3600 - storage.getDate() < 0
  ) {
    storage.removeDate();
  }
  let caption = getCopy(
    texts,
    cycleMethod,
    nextChange(personDrawDailySwitch, personDrawInterval)
  );

  function handleManualRefresh() {
    storage.removeDate();
    caption = getCopy(
      texts,
      cycleMethod,
      nextChange(personDrawDailySwitch, personDrawInterval)
    );
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

TextWidgetSample.propTypes = {
  randomizeCheckbox: bool,
  personDrawInterval: number,
  personDrawDailySwitch: bool,
  multiTextInput: string
};

export default TextWidgetSample;
