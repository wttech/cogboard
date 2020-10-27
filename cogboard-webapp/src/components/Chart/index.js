import React, { useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { StyledZabbixChart } from './styled';

const zabbixChartConfig = {
	column1: {
		numberOfResults: 5,
		width: 200
	},
	column2: {
		numberOfResults: 15,
		width: 400
	},
	column3: {
		numberOfResults: 35,
		width: 600
	},
	other: {
		numberOfResults: 60,
		width: 800
	}
}

const Chart = ({ id, content }) => {
	const [data, setData] = useState({})
	const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
	);
	const widgetConfig = widgetData.config;
	const range = widgetData.range || [];
	// const maxValue = widgetData.maxValue || 0;
	const setProgressSize = zabbixChartConfig[`column${widgetConfig.columns}`]
      ? zabbixChartConfig[`column${widgetConfig.columns}`]
      : zabbixChartConfig.other;

	const options = {
		chartPadding: 0,
		width: setProgressSize.width,
  	height: '100%'
	};

	useMemo(() => {
		const LABELS = Object.keys(content.history);
		const SERIES = Object.values(content.history).map((serie) => {
			return Math.round(serie / Math.pow(10, 9));
		});

		setData({
			labels: LABELS.slice(Math.max(LABELS.length - setProgressSize.numberOfResults, 0)),
			series: [
				SERIES.slice(Math.max(SERIES.length - setProgressSize.numberOfResults, 0))
			]
		});
	}, [content.history, setProgressSize]);

	const onDrawHandler = (context) => {
		let barColorStatus;

		//create method
		console.log(context);
		if (context.value && context.value.y > range[1]) {
			barColorStatus = 'red'
		} else if (context.value && context.value.y < range[0]) {
			barColorStatus = 'green'
		} else {
			barColorStatus = 'orange'
		}

		if (context.type === 'bar') {
			context.element.attr({
				style: `stroke: ${barColorStatus};`
			});
		} else {
			context.element.attr({
				style: 'stroke: white;'
			});
		}
	}

  return (
		<StyledZabbixChart
			listener={{
				draw: e => onDrawHandler(e)
			}}
			data={data}
			options={options}
			type='Bar' />
  );
};

export default Chart;
