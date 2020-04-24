import React from 'react';
import { array } from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const JiraBucketWidget = ({ bucketNames, issueCounts }) => {
  const buckets = bucketNames.map((bucket, index) => (
    <TableRow>
      <TableCell>{bucket}</TableCell>
      <TableCell>{issueCounts[index]}</TableCell>
    </TableRow>
  ));

  return (
    <>
      <div>
        <table>
          <TableHead>
            <TableRow>
              <TableCell>Bucket name</TableCell>
              <TableCell>Issues</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{buckets}</TableBody>
        </table>
      </div>
    </>
  );
};

JiraBucketWidget.propTypes = {
  bucketNames: array.isRequired,
  issueCounts: array.isRequired
};

JiraBucketWidget.defaultProps = {
  bucketNames: [],
  issueCounts: []
};

export default JiraBucketWidget;
