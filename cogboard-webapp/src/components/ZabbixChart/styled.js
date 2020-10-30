import styled from '@emotion/styled/macro';

import { COLORS } from '../../constants';

export const StyledZabbixChart = styled.div`
	position: relative;

	&::before,
	&::after {
		color: ${COLORS.WHITE};
		font-size: 11px;
		position: absolute;
		text-align: center;
	}

	&::before {
		content: attr(data-axis-x);
		width: 100%;
		left: 0;
		bottom: 2px;
	}

	&::after {
		content: attr(data-axis-y);
		left: -18px;
		top: 36%;
		transform: rotate(-90deg) translateY(50%);
	}

	svg {
		overflow: visible;
	}

	.ct-label {
		color: ${COLORS.WHITE};
	}

  .custom-label {
		overflow: visible;
		text-align: center;

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
