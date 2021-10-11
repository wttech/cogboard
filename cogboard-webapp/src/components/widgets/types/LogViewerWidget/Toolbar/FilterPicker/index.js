import React from 'react';
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
import { useState } from 'react';

const FilterPicker = () => {
  const handleDelete = name => {
    setFilters(filters.filter(item => item !== name));
  };

  const [filters, setFilters] = useState([]);
  const [logLevel, setLogLevel] = useState('');

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
          <MenuItem value="all">ALL</MenuItem>
          <MenuItem value="debug">DEBUG</MenuItem>
          <MenuItem value="info">INFO</MenuItem>
          <MenuItem value="warn">WARN</MenuItem>
          <MenuItem value="error">ERROR</MenuItem>
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
          <MenuItem value="">ALL</MenuItem>
          <MenuItem value="debug">DEBUG</MenuItem>
          <MenuItem value="info">INFO</MenuItem>
          <MenuItem value="warn">WARN</MenuItem>
          <MenuItem value="error">ERROR</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" size="small">
        Advanced
      </Button>
    </ToolbarGroup>
  );
};

export default FilterPicker;
