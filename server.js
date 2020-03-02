const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

app.use(bodyParser.json());

// Sample data
const physicians = [
    {id: 1, firstName: 'Julius', lastName: 'Hibbert'},
    {id: 2, firstName: 'Algernop', lastName: 'Krieger'},
    {id: 3, firstName: 'Nick', lastName: 'Riviera'}
];

const prefix = 'Dr';

const physiciansAppointments = [
    {id:1, email:'hibbert@notablehealth.com', list:[{patientId:1, patientName:'Sterling Archer',time:'8:00AM',kind:'New Patient'},
    {patientId:2, patientName:'Cyril Figis',time:'8:30AM',kind:'Follow-up'},
    {patientId:3, patientName:'Ray Gilette',time:'9:00AM',kind:'Follow-up'},
    {patientId:4, patientName:'Lana Kane',time:'9:30AM',kind:'New Patient'},
    {patientId:5, patientName:'Pam Poovey',time:'10:00AM',kind:'New Patient'}] },

    {id:2, email:'krieger@notablehealth.com', list:[{patientId:1, patientName:'abc def',time:'8:10AM',kind:'New Patient'},
    {patientId:2, patientName:'ghi jkl',time:'8:30AM',kind:'Follow-up'},
   ]},

    {id:3, email:'riviera@notablehealth.com', list:[{patientId:1, patientName:'mno pqr',time:'8:00AM',kind:'New Patient'},
                                                    {patientId:2, patientName:'stu vwz',time:'8:30AM',kind:'Follow-up'}]}

];

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});


app.get('/api/physicians', (req, res) => {
    res.json({physicians, prefix});
})

app.get('/api/physicians/:id', (req, res) => {
    let result = physiciansAppointments.filter((item) => item.id == req.params.id);
    res.json(result);
})

app.put('/api/physicians/appointments/:id', (req,res) => {
    const id = Number(req.params.id);
    const physician =  physiciansAppointments.filter((item) => item.id == req.params.id);
    console.log(physician)
    physician[0].list.push({
        patientId: ((physician[0].list).length)+1,
        patientName: req.body.name,
        time:req.body.time,
        kind:req.body.kind
    })
    console.log(physiciansAppointments[0].list)
    res.json({message: req.body})

});

app.use(express.static('dist'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

