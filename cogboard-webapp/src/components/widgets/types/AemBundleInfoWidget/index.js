import React from 'react';
import { object, array, string } from 'prop-types';

import { StyledContainerBox } from '../../../styled';
import { capitalize } from '../../../../utils/common';
import { Typography, Link } from '@material-ui/core';
import { CaptionWithMargin, StyledPopoverWithControls } from './styled';

const bundleArrayToHoverText = array =>
  array.map(object => `${object['name']} - ${object['state']}`).join('\n');

const bundleArrayToComponents = array => (
  <>
    {array.map(object => (
      <Typography
        key={object['symbolicName'] + object['id']}
        component="span"
        display="block"
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
      titleHover={`${name} bundles:\n${bundleArrayToHoverText(bundleArray)}`}
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
        <Link key={ `${key}-link` } href={url} target="_blank">
          <CaptionWithMargin>
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
