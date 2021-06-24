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
                chart:{
                    height: this.props.height,
                    width: this.props.width,
                    type: this.props.type
                },
                xaxis:{
                    categories: y_data
                }
        }
        this.setState({series: data, options});
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
            var options = prevstate.options;
            options.xaxis.categories = y_data;
            // var options = {
            //     chart:{
            //         height: this.props.height,
            //         width: this.props.width,
            //         type: this.props.type
            //     },
            //     xaxis:{
            //         categories: y_data
            //     }
            // }
            this.setState({options, series: data});
        }

        if (this.props.type !== prevprops.type){
            console.log(prevstate, prevprops);
            var options = prevstate.option;
            options.chart.type = this.props.type;

            this.setState({type: this.props.type, options});
        }

        if (this.props.height !== prevprops.height){
            this.setState({height: this.props.height});
        }

        if(this.props.width !== prevprops.width){
            this.setState({width: this.props.width});
        }
    }



    render(){
        const titlestyle = {
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Arial",
            color: "#000",
            margin: 20,
            align: "center"
        };
        return (
            <div className="text-center">
                <p style={titlestyle}>{this.props.title}</p>
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

