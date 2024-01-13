import React from 'react';
import { getFilters, getLevel, saveFilters, saveLevel } from './helpers';
import logLevels from '../../logLevels';

import { MenuItem, InputLabel, Tooltip } from '@material-ui/core';
import {
  ScrollableBox,
  FiltersFormControl,
  FiltersSelect,
  LogLevelFormControl,
  LogLevelSelect,
  StyledChip,
  FiltersWrapper
} from './styled';
import AdvancedFiltersMenu from './AdvancedFiltersMenu';

const FilterPicker = ({ widgetLocalStorage, quarantine }) => {
  const regExpFilters = getFilters(widgetLocalStorage);
  const logLevel = getLevel(widgetLocalStorage);

  const handleSelection = selectedList =>
    saveFilters(
      widgetLocalStorage,
      regExpFilters.map(filter => ({
        ...filter,
        checked: selectedList.map(({ id }) => id).includes(filter.id)
      }))
    );

  const handleDelete = id =>
    saveFilters(
      widgetLocalStorage,
      regExpFilters.map(filter =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );

  const handleLevelSelection = level => saveLevel(widgetLocalStorage, level);

  return (
    <>
      <LogLevelFormControl>
        <InputLabel id="log-level-label">Log level</InputLabel>
        <LogLevelSelect
          labelId="log-level-label"
          value={logLevel}
          onChange={e => handleLevelSelection(e.target.value)}
          data-cy="log-level-menu"
        >
          {Object.keys(logLevels).map((key, index) => (
            <MenuItem
              key={index}
              value={key}
              data-cy={`log-level-menu-option-${key}`}
            >
              {key.toUpperCase()}
            </MenuItem>
          ))}
        </LogLevelSelect>
      </LogLevelFormControl>
      <FiltersWrapper>
        <FiltersFormControl>
          <InputLabel id="filters-label">
            {regExpFilters.length > 0 ? `Filters` : `No filters defined`}
          </InputLabel>
          <FiltersSelect
            data-cy="filters-menu"
            disabled={regExpFilters.length <= 0}
            labelId="filters-label"
            multiple
            value={regExpFilters.filter(filter => filter.checked)}
            onChange={e => handleSelection(e.target.value)}
            renderValue={selected => (
              <ScrollableBox>
                {selected.map(({ id, label, regExp }) => (
                  <Tooltip
                    key={id}
                    title={`Regular expression: ${regExp}`}
                    placement="bottom"
                  >
                    <StyledChip
                      label={label}
                      onDelete={() => handleDelete(id)}
                      onMouseDown={e => e.stopPropagation()}
                      data-cy="filters-chip"
                    />
                  </Tooltip>
                ))}
              </ScrollableBox>
            )}
          >
            {regExpFilters.map(filter => (
              <MenuItem
                key={filter.id}
                value={filter}
                data-cy="filters-menu-option"
              >
                {filter.label}
              </MenuItem>
            ))}
          </FiltersSelect>
        </FiltersFormControl>
        <AdvancedFiltersMenu
          widgetLocalStorage={widgetLocalStorage}
          quarantine={quarantine}
        />
      </FiltersWrapper>
    </>
  );
};

export default FilterPicker;
