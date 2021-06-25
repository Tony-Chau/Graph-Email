import React, { Component } from 'react';
import Chart from 'react-apexcharts';
// const {ExportManager, ExportConfig} = require('fusionexport-node-client');

export default class Graph extends Component {
    constructor(props){
        super(props);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    state = {
        options: {},
        series:[],
        height: this.props.height,
        width: this.props.width,
        type: this.props.type
    }
    // https://apexcharts.com/docs/export-to-pdf-in-node-js/

    componentDidMount() {
        var xname, yname;
        this.props.headings.forEach((item) =>{
            if (this.props.xHeadingKey == item.id){
                xname = item.name;
            }
            if (this.props.yHeadingKey == item.id){
                yname = item.name;
            }
        });
        var x_data = [];
        var y_data = [];
        this.props.excelJson.forEach((item) =>{ 
            x_data.push(eval(`item.${xname}`));
            y_data.push(eval(`item.${yname}`));
        });

        var data =  [
            {
                name: xname,
                data: x_data
            }
        ];
        var options = {
            title: {
                text: this.props.title,
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '14px',
                  fontWeight:  'bold',
                  fontFamily:  'Arial',
                  color:  '#263238'
                },
            },
                chart:{
                    height: this.props.height,
                    width: this.props.width,
                    type: this.props.type
                },
                xaxis:{
                    categories: y_data
                }
        }
        this.setState({series: data, options: options});
    }

    componentDidUpdate(prevprops, prevstate){
        if (prevprops.xHeadingKey !== this.props.xHeadingKey || prevprops.yHeadingKey !== this.props.yHeadingKey){
            var xname, yname;
            this.props.headings.forEach((item) =>{
                if (this.props.xHeadingKey == item.id){
                    xname = item.name;
                }
                if (this.props.yHeadingKey == item.id){
                    yname = item.name;
                }
            });
            var x_data = [];
            var y_data = [];
            this.props.excelJson.forEach((item) =>{ 
                x_data.push(eval(`item.${xname}`));
                y_data.push(eval(`item.${yname}`));
            });
            var data =  [
                {
                    name: xname,
                    data: x_data
                }
            ];
            var options = {
                title: {
                    text: this.props.title,
                    align: 'center',
                    margin: 10,
                    style: {
                      fontSize:  '18px',
                      fontWeight:  'bold',
                      fontFamily:  'Arial',
                      color:  '#000'
                    },
                },
                chart:{
                    height: prevstate.options.chart.height,
                    width: prevstate.options.chart.width,
                    type: prevstate.options.chart.type
                },
                xaxis:{
                    categories: y_data
                }
            };
            this.setState({options : options, series: data});
        }


        if (this.props.type !== prevprops.type){
            var options = {
                title: {
                    text: this.props.title,
                    align: 'center',
                    margin: 10,
                    style: {
                      fontSize:  '18px',
                      fontWeight:  'bold',
                      fontFamily:  'Arial',
                      color:  '#000'
                    },
                },
                chart:{
                    height: prevstate.options.chart.height,
                    width: prevstate.options.chart.width,
                    type: this.props.type
                },
                xaxis:{
                    categories: prevstate.options.xaxis.categories
                }
            }
            this.setState({type: this.props.type, options : options});
        }

        if (this.props.height !== prevprops.height){
            this.setState({height: this.props.height});
        }

        if(this.props.width !== prevprops.width){
            this.setState({width: this.props.width});
        }

        if (this.props.title !== prevprops.title){
            var options = {
                title: {
                    text: this.props.title,
                    align: 'center',
                    margin: 10,
                    style: {
                      fontSize:  '18px',
                      fontWeight:  'bold',
                      fontFamily:  'Arial',
                      color:  '#000'
                    },
                },
                chart:{
                    height: prevstate.options.chart.height,
                    width: prevstate.options.chart.width,
                    type: prevstate.options.chart.type
                },
                xaxis:{
                    categories: prevstate.options.xaxis.categories
                }
            }
            this.setState({options: options});
        }
    }



    render(){
        return (
            <div className="text-center">
                <Chart options = {this.state.options}
                series = {this.state.series}
                height = {this.state.height}
                width = {this.state.width}
                type = {this.state.type}/>
                <p>This graph was generated by <a href="https://apexcharts.com/" target="_blank">ApexCharts</a></p>
            </div>
                
        );
    }
}

