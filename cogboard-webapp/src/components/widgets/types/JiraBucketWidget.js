import React from 'react';
import { array } from 'prop-types';

const JiraBucketWidget = ({ buckets }) => {
  const issueURL = 'https://jira.cognifide.com/jira/browse/';
  const bucketIssues = buckets.map(bucket => (
    <ul>
      {bucket.map(issue => (
        <li>
          <a href={issueURL + issue.key}>{issue.key}</a>
        </li>
      ))}
    </ul>
  ));

  return (
    <>
      <div>{bucketIssues}</div>
    </>
  );
};

JiraBucketWidget.propTypes = {
  buckets: array.isRequired
};

JiraBucketWidget.defaultProps = {
  buckets: []
};

export default JiraBucketWidget;
