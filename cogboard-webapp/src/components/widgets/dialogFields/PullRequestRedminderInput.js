import React, { useState } from 'react';
import { FormControl } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { StyledFab, StyledInput } from './styled';

const PullRequestRedminderInput = () => {
  const [formValueRepoLink, setFormValueRepoLink] = useState('');
  const [pullRequests, setPullRequests] = useState([]);

  const handleFormValueRepoLinkChange = e =>
    setFormValueRepoLink(e.target.value);

  const handleSave = async () => {
    //create api call url from given repo url:
    const GIT_API_SEARCH = `${formValueRepoLink.replace(
      'github.com',
      'api.github.com/repos'
    )}/pulls`;

    //await the responses
    const response = await fetch(GIT_API_SEARCH);
    const json = await response.json();

    //push pull request to state array:
    for (let i = 0; i < json.length; i++) {
      setPullRequests(prevState => [
        ...prevState,
        {
          id: json[i].id,
          title: json[i].title,
          url: json[i].html_url
        }
      ]);
    }

    // reset inpust:
    resetInput();
  };

  const resetInput = () => setFormValueRepoLink('');

  return (
    <FormControl>
      <StyledInput
        data-cy="repo"
        placeholder="Link to Repository"
        onChange={handleFormValueRepoLinkChange}
        value={formValueRepoLink}
      />
      <StyledFab
        variant="extended"
        size="small"
        color="primary"
        aria-label="add repository link"
        onClick={handleSave}
      >
        <>
          <GetApp /> Get Pull Requests
        </>
      </StyledFab>
      <div style={{ margin: '20px' }}>
        {pullRequests.map(pr => (
          <div key={pr.id} style={{ margin: '10px auto' }}>
            <a href={pr.url}>{pr.title}</a>
          </div>
        ))}
      </div>
    </FormControl>
  );
};

export default PullRequestRedminderInput;
