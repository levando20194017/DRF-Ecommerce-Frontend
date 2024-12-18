import React, { useEffect, useState } from "react";
import Chartist from "react-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

export const LineChart = ({ dataChart }) => {
    const [data, setData] = useState({})
    useEffect(() => {
        if (dataChart?.series?.length > 0) {
            setData({
                labels: dataChart?.labels,
                series: [dataChart.series[2].data, dataChart.series[0].data]
            })
        }
    }, [dataChart])

    const options = {
        low: 0,
        showArea: true,
        fullWidth: true,
        axisX: {
            position: 'end',
            showGrid: true
        },
        axisY: {
            // On the y-axis start means left and end means right
            showGrid: false,
            showLabel: false,
            labelInterpolationFnc: value => `$${value / 1}k`
        }
    };

    const plugins = [
        ChartistTooltip()
    ]

    return (
        <Chartist data={data} options={{ ...options, plugins }} type="Line" className="ct-series-g ct-double-octave" />
    );
};