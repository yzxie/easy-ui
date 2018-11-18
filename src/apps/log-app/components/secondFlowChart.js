import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import '../css/secondFlowChart.css'

export default class SecondFlowChart extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.drawCharts(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.drawCharts(nextProps)
    }

    drawCharts = props => {
        const { logs } = props
        if (logs != null) {
            let xData = []
            let yData = []
            logs.map(log => {
                xData.push(log.secondStamp)
                yData.push(log.requestCount)
            })
            this.doDrawCharts(xData, yData)
        }
    }

    doDrawCharts = (xData, yData) => {
        let myChart = echarts.init(document.getElementById('charts'));
        // 指定图表的配置项和数据
        let option = {
            title: {
                text: '每秒访问量统计'
            },
            tooltip: {},
            legend: {
                data:['每秒访问量统计']
            },
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [{
                name: '访问量',
                type: 'bar',
                data: yData
            }]
        };
        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    }

    render() {
        const { logs } = this.props
        return <div>
            <div id="charts"></div>
        </div>
    }
}