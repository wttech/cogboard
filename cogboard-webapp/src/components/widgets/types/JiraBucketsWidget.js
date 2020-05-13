import React from 'react';
import { array } from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const JiraBucketsWidget = ({ buckets }) => {
  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bucket</TableCell>
              <TableCell>Issues</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buckets.map(bucket => (
              <TableRow>
                <TableCell>{bucket.name}</TableCell>
                <TableCell>{bucket.issueCounts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

JiraBucketsWidget.propTypes = {
  buckets: array.isRequired
};

JiraBucketsWidget.defaultProps = {
  buckets: []
};

export default JiraBucketsWidget;
