import React from "react";
import ReactDOM from "react-dom";

class AppointmentsTable extends React.Component {

    constructor(props) {
        super(props);
        this.headings = ['Id', 'Name', 'Time', 'Kind']
        this.rowData=[];
        this.state = {
            appointments: []
        }
        this.headerData = this.headings.map((item,index) => {
            return <th key={index}>{item}</th>
        })
        this.email = '';
    }

    async componentDidMount() {
        try {
            const response = await fetch('/api/physicians/' + this.props.id);
            const json = await response.json();
            this.setState({ appointments: json[0] });
          } catch (error) {
            console.log(error);
          }
        
    }

    async componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id) {
            try {
                const response = await fetch('/api/physicians/' + newProps.id);
                const json = await response.json();
                this.setState({ appointments: json[0] });
              } catch (error) {
                console.log(error);
              }
        }
      }

    render() {
        if(Object.keys(this.state.appointments).length > 0){
            this.rowData = this.state.appointments.list.map((item, index) => {
                return (
                    <tr key={item.patientId}>
                        <td>{item.patientId}</td>
                        <td>{item.patientName}</td>
                        <td>{item.time}</td>
                        <td>{item.kind}</td>
                    </tr>
                )
            })
            this.email = this.state.appointments.email
        }

        return (
            <div>
                <h1> {this.props.prefix + ' ' + this.props.firstName + ' ' + this.props.lastName}</h1>
                <h3>{this.email}</h3>
                <table className="table table-hover">
                    <thead><tr>{this.headerData}</tr></thead>
                    <tbody>{this.rowData}</tbody>
                </table>
            </div>
        )
    }
}

export default AppointmentsTable;