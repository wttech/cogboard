import React from 'react';
import { object, array, string } from 'prop-types';

import { StyledContainerBox, CaptionWithMargin } from '../../../styled';
import { capitalize } from '../../../../utils/common';
import { Typography, Link } from '@material-ui/core';
import { StyledPopoverWithControls } from './styled';

const bundleArrayToComponents = array => (
  <>
    {array.map(object => (
      <Typography
        key={object['symbolicName'] + object['id']}
        component="span"
        variant="body2"
      >
        {object['name']} - {object['state']} (id: {object['id']}, symbolicName:{' '}
        {object['symbolicName']})
      </Typography>
    ))}
  </>
);

const BundlesInfoWithPopover = ({ bundleArray, name }) =>
  bundleArray.length ? (
    <StyledPopoverWithControls
      title={`${name} bundles: ${bundleArray.length}`}
      body={bundleArrayToComponents(bundleArray)}
    />
  ) : null;

const AemBundleInfoWidget = ({
  url,
  bundleStatus,
  excludedBundles,
  inactiveBundles
}) => (
  <>
    <StyledContainerBox>
      {Object.keys(bundleStatus).map(key => (
        <Link href={url} target="_blank">
          <CaptionWithMargin key={key}>
            {capitalize(key)}: {bundleStatus[key]}
          </CaptionWithMargin>
        </Link>
      ))}
      <BundlesInfoWithPopover bundleArray={excludedBundles} name="Excluded" />
      <BundlesInfoWithPopover bundleArray={inactiveBundles} name="Inactive" />
    </StyledContainerBox>
  </>
);

AemBundleInfoWidget.propTypes = {
  url: string.isRequired,
  bundleStatus: object.isRequired,
  excludedBundles: array.isRequired,
  inactiveBundles: array.isRequired
};

AemBundleInfoWidget.defaultProps = {
  bundleStatus: {},
  excludedBundles: [],
  inactiveBundles: []
};

export default AemBundleInfoWidget;
