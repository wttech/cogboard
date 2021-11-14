import React from 'react';
import { useState } from 'react';
import logLevels from '../../logLevels';

import {
  Button,
  Select,
  Chip,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { ScrollableBox } from './styled';
import ToolbarGroup from '../ToolbarGroup';
import AdvancedFiltersMenu from './AdvancedFiltersMenu';

const FilterPicker = () => {
  const handleDelete = name => {
    setFilters(filters.filter(item => item !== name));
  };

  const [filters, setFilters] = useState([]);
  const [logLevel, setLogLevel] = useState('info');

  return (
    <ToolbarGroup title="Filters">
      <FormControl>
        <InputLabel id="filters-label">Filters</InputLabel>
        <Select
          id="filters"
          labelId="filters-label"
          multiple
          style={{ width: '200px' }}
          value={filters}
          size="small"
          onChange={e => setFilters(e.target.value)}
          renderValue={selected => (
            <ScrollableBox>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={e => handleDelete(value)}
                  onMouseDown={e => {
                    e.stopPropagation();
                  }}
                  style={{ marginRight: '4px' }}
                  size="small"
                />
              ))}
            </ScrollableBox>
          )}
        >
          {logLevels.map((level, index) => (
            <MenuItem key={index} value={level.value}>
              {level.value.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="log-level-label">Log level</InputLabel>
        <Select
          labelId="log-level-label"
          label="Log level"
          style={{ width: '100px' }}
          value={logLevel}
          onChange={e => setLogLevel(e.target.value)}
        >
          {logLevels.map((level, index) => (
            <MenuItem key={index} value={level.value}>
              {level.value.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AdvancedFiltersMenu />
    </ToolbarGroup>
  );
};

export default FilterPicker;
