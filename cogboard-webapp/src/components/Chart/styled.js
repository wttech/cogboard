import styled from '@emotion/styled/macro';

import ChartistGraph from 'react-chartist';
import { COLORS } from '../../constants';

export const StyledZabbixChart = styled(ChartistGraph)`
	svg {
		overflow: visible;
	}

	.ct-label {
		color: white;
	}

  .custom-label {
		overflow: visible;

    .tooltip {
			background-color: white;
			border-radius: 50%;
			display: inline-block;
			height: 6px;
			margin: 0 auto;
			position: relative;
			width: 6px;

			&::after {
				background-color: rgba(97, 97, 97, 0.9);
				color: ${COLORS.WHITE};
				content: attr(data-tooltip);
				left: -32px;
				opacity: 0;
				padding: 4px 8px;
				position: absolute;
				text-align: center;
				top: 16px;
				visibility: hidden;
			}
    }

		&:hover .tooltip::after {
			opacity: 1;
			visibility: visible;
		}
  }
`;
