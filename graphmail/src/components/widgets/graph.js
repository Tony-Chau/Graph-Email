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
                    categories: y_data
                }
        }
        this.setState({series: data, options: options});
    }

    componentDidUpdate(prevprops, prevstate){
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
                    type: prevstate.options.chart.type, 
                    toolbar:{
                        show: false
                    }
                },
                xaxis:{
                    categories: y_data
                }
            };
            this.setState({options : options, series: data});
        }


        if (this.props.type !== prevprops.type){
            console.log(`New - ${this.props.type}`, `Old - ${prevprops.type}`);
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
                    type: this.props.type, 
                    toolbar:{
                        show: false
                    }
                },
                xaxis:{
                    categories: prevstate.options.xaxis.categories
                }
            }
            this.setState({type: this.props.type, options : options});
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

