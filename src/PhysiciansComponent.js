import React from "react";
import ReactDOM from "react-dom";
import AppointmentsTable from "./AppointmentsTable";

class PhysiciansComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            physicians: [],
            prefix: '',
            showAppointments: false
        };
        this.pysiciansTable =[];
        this.physicianAppointments =[];
        this.id = 0;
    }

    componentDidMount() {
        fetch('/api/physicians')
        .then(res => res.json())
        .then(data => this.setState({ physicians: data.physicians, prefix: data.prefix }))
    }

    loadTable(physicianDetails,event){
        console.log('physician id', physicianDetails)
        // if(this.id != physicianDetails.id){
         this.physicianAppointments = <AppointmentsTable id={physicianDetails.id} firstName={physicianDetails.firstName} lastName={physicianDetails.lastName} prefix={this.state.prefix}/>
        //  console.log('abcdef', this.physicianAppointments );
         this.setState({showAppointments: true})

        // }
        
        
    }    

    render() {
        if(this.state.physicians.length>0){
            this.pysiciansTable = this.state.physicians.map((item) => {
                return <li key={item.id}><a key={item.id} onClick={this.loadTable.bind(this,{id: item.id,firstName: item.firstName,lastName: item.lastName})}>{ item.lastName+','+item.firstName }</a></li>
            })
        }
        return (
            <div className='container' id='main-container'> 
            <h1>Notable</h1> 
            <h3>Physicians</h3>
            <div className="row">
                <div className="col-4">
                    <ul>
                        {this.pysiciansTable}
                    </ul>
                </div>
                <div className="col-8">
                   {this.physicianAppointments}   
                </div>   
            </div>
            <button type="button" className="btn btn-primary"> Logout </button>
            </div>
        )
    }


}

export default PhysiciansComponent;
