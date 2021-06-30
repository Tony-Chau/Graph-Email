import React, { Component } from 'react';
import Chart from 'react-apexcharts';


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

    componentDidMount() {
        var xname, yname;
        this.props.headings.forEach((item) =>{
            if (parseInt(this.props.xHeadingKey) === item.id){
                xname = item.name;
            }
            if (parseInt(this.props.yHeadingKey) === item.id){
                yname = item.name;
            }
        });
        var x_data = [];
        var y_data = [];
        this.props.excelJson.forEach((item) =>{ 
            x_data.push(item[xname]);
            y_data.push(item[yname]);
        });

        var data =  [
            {
                name: yname,
                data: y_data,
                title:{
                    text: yname
                }
            }
        ];
        var options = {
            title: {
                text: this.props.title,
                align: 'center',
                margin: 10,
                style: {
                  fontSize:  '14px',
                  fontWeight:  'bold',
                  fontFamily:  'Arial',
                  color:  '#263238'
                },
            },
            chart:{
                type: this.props.type, 
                toolbar:{
                    show: false
                }
            },
            xaxis:{
                categories: x_data,
                title:{
                    text: xname
                }
            }
        }
        this.setState({series: data, options: options});
    }

    componentDidUpdate(prevprops, prevstate){
        var options;
        if (prevprops.xHeadingKey !== this.props.xHeadingKey || prevprops.yHeadingKey !== this.props.yHeadingKey){
            var xname, yname;
            this.props.headings.forEach((item) =>{
                if (parseInt(this.props.xHeadingKey) === item.id){
                    xname = item.name;
                }
                if (parseInt(this.props.yHeadingKey) === item.id){
                    yname = item.name;
                }
            });

            var x_data = [];
            var y_data = [];
            this.props.excelJson.forEach((item) =>{ 
                x_data.push(item[xname]);
                y_data.push(item[yname]);
            });
            var data =  [
                {
                    name: yname,
                    data: y_data,
                    title:{
                        text: yname
                    }
                }
            ];
            console.log(data);
            options = {
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
                    type: prevstate.options.chart.type, 
                    toolbar:{
                        show: false
                    }
                },
                xaxis:{
                    labels: xname,
                    categories: x_data,
                    title:{
                        text: xname
                    }
                }
            };
            this.setState({options : options, series: data});
        }

        if (this.props.type !== prevprops.type){
            options = {
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
                    type: this.props.type, 
                    toolbar:{
                        show: false
                    }
                },
                xaxis:{
                    labels: xname,
                    categories: prevstate.options.xaxis.categories,
                    title:{
                        text: prevstate.options.xaxis.title.text
                    }
                }
            }
            this.setState({type: this.props.type, options : options});
        }

        if (this.props.title !== prevprops.title){
            options = {
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
                dataLabels: {
                    enabled: false
                },
                chart:{
                    type: prevstate.options.chart.type
                },
                xaxis:{
                    labels: xname,
                    categories: prevstate.options.xaxis.categories,
                    title:{
                        text: prevstate.options.xaxis.title.text
                    }
                }
            }
            this.setState({options: options});
        }
    }

    render(){
        return (
            <React.Fragment>
                <div id="Graph">
                    <Chart options = {this.state.options}
                    series = {this.state.series}
                    height = {this.state.height}
                    width = {this.state.width}
                    type = {this.state.type}/>
                </div>
                <p className="text-center">This graph was generated by <a href="https://apexcharts.com/" target="_blank" rel="noreferrer">ApexCharts</a></p>
            </React.Fragment>
                
        );
    }
}

