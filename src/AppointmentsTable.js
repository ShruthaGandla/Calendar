import React from "react";
import ReactDOM from "react-dom";

class AppointmentsTable extends React.Component {

    constructor(props) {
        super(props);
        this.headings = ['Id', 'Name', 'Time', 'Kind']
        this.rowData=[];
        this.state = {
            appointments: [],
            name:'',
            time:'',
            kind:''
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

      getFormData = (event) => {

        //default Request Headers
        //Accept: */*//Informs the server about the types of data that can be sent back.
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language: en-US,en;q=0.9
        // Cache-Control: no-cache
        // Connection: keep-alive
        // Content-Length: 44
        // Content-Type: text/plain;charset=UTF-8//Indicates the media type of the resource.

        event.preventDefault();
        fetch('/api/physicians/appointments/'+ this.props.id, {
            method: 'PUT',
            headers: {
                // 'Accept': 'application/json',
                'Content-type':'application/json'

            },
            body: JSON.stringify({
                name: this.state.name, 
                time:this.state.time, 
                kind:this.state.kind
            })

        })
        .then(res => res.json())
        .then(data => console.log(data))
    }


    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleTimeChange = (event) => {
        this.setState({
            time: event.target.value
        })
    }
    handleKindChange = (event) => {
        this.setState({
            kind: event.target.value
        })
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
                <form onSubmit={(event) => this.getFormData(event)} autoComplete='off'>
                <input type='text 'placeholder='Name' name='name' value={this.state.name} onChange={this.handleNameChange}/> <br/>
                <input type='text 'placeholder='Time' name='time' value={this.state.time} onChange={this.handleTimeChange}/> <br/>
                <input type='text 'placeholder='Kind' name='kind' value={this.state.kind} onChange={this.handleKindChange}/> <br/>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}

export default AppointmentsTable;