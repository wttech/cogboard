import React, { useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';
import { StyledZabbixChart } from './styled';
import { getNumberOfElements, calculatePercentageValue, convertEpochToDate } from './helpers';
import {
	COLORS,
	ZABBIX_METRICS_WITH_MAX_VALUE,
	ZABBIX_METRICS_WITH_PROGRESS
} from '../../constants';

const zabbixChartConfig = {
	column1: {
		numberOfResults: 6,
	},
	column2: {
		numberOfResults: 15,
	},
	column3: {
		numberOfResults: 23,
	},
	other: {
		numberOfResults: 40,
	}
}

const ZabbixChart = ({ id, content }) => {
	const [data, setData] = useState({})
	const widgetData = useSelector(
		({ widgets }) => widgets.widgetsById[id],
		shallowEqual
	);
	const widgetZabbixMetric = widgetData.selectedZabbixMetric;
	const widgetConfig = widgetData.config;
	const range = widgetData.range || [];
	const maxValue = widgetData.maxValue || 0;
	const setProgressSize = zabbixChartConfig[`column${widgetConfig.columns}`]
      ? zabbixChartConfig[`column${widgetConfig.columns}`]
      : zabbixChartConfig.other;
	const checkMetricHasMaxValue = ZABBIX_METRICS_WITH_MAX_VALUE.includes(widgetZabbixMetric);
	const checkMetricHasProgress = ZABBIX_METRICS_WITH_PROGRESS.includes(widgetZabbixMetric);
	const options = {
		chartPadding: 0,
		width: `95%`,
		height: '100%'
	};

	useMemo(() => {
		const LABELS = Object.keys(content.history).map((label) => convertEpochToDate(label).toLocaleString());
		let SERIES = Object.values(content.history);

		if (checkMetricHasMaxValue) {
			SERIES = SERIES.map((serie) => {
				return Math.round(serie / Math.pow(10, 9));
			});
		}

		setData({
			labels: getNumberOfElements(LABELS, setProgressSize.numberOfResults),
			series: [
				getNumberOfElements(SERIES, setProgressSize.numberOfResults)
			]
		});
	}, [content.history, setProgressSize, checkMetricHasMaxValue]);

	const setAxisYTitle = () => {
		let titleText;

		if (checkMetricHasMaxValue) {
			titleText = '(GB)';
		} else if (!checkMetricHasProgress) {
			titleText = 'No.'
		} else {
			titleText = '(%)'
		}

		return titleText;
	}

	const setBarColor = (value, maxValue, range) => {
		if (!value) return `${COLORS.WHITE}`;

		const percentageValue = checkMetricHasMaxValue ? calculatePercentageValue(value.y, maxValue) : value.y;
		let barColorStatus;

		if (percentageValue > range[1]) {
			barColorStatus = `${COLORS.RED}`;
		} else if (percentageValue < range[0]) {
			barColorStatus = `${COLORS.GREEN_DEFAULT}`;
		} else {
			barColorStatus = `${COLORS.ORANGE}`;
		}

		return barColorStatus;
	}

	const onDrawHandler = (context) => {
		const barColor = setBarColor(context.value, maxValue, range);

		if (context.type === 'label' && context.axis.units.pos === 'x') {
			const textHtml = ['<div class="tooltip" data-tooltip="', context.text, '"></div>'].join('');
			const multilineText = Chartist.Svg('svg').foreignObject(textHtml, { x: context.x, y: context.y, width: context.axis.stepLength, height: 20 }, 'ct-label ct-horizontal cta-end custom-label', true);
			context.element.replace(multilineText);
		}

		if (context.type === 'bar' && checkMetricHasProgress) {
			context.element.attr({
				style: `stroke: ${barColor};`
			});
		} else {
			context.element.attr({
				style: `stroke: ${COLORS.WHITE};`
			});
		}
	}

  return (
		<StyledZabbixChart
			data-axis-x="Date"
			data-axis-y={ setAxisYTitle() }>
			<ChartistGraph
				listener={{
					draw: e => onDrawHandler(e)
				}}
				data={data}
				options={options}
				type='Bar'
			/>
		</StyledZabbixChart>
  );
};

export default ZabbixChart;
