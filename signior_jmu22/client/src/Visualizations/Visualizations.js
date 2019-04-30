import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Visualizations.css';
import CarDataGraph from  './CarDataGraph/CarDataGraph';
import CarbonEmissionsGraph from './CarbonEmissionsGraph/CarbonEmissionsGraph';
class Visualizations extends Component {
  constructor(props) {
    super(props);

    this.state = {data: [], countriesList: [], graphCountries: []}
    
    this.getCheckedValues = this.getCheckedValues.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:5000/car_and_emissions", {method: 'GET', dataType:'json'})
      .then(r => r.json())
      .then(r => {
        let countries = []
        for (let i = 0; i < r.length; i++) {
          let row = r[i];
          countries.push(row['country'])
        }
        this.setState({data: r, countriesList: countries})
      }).catch(err => console.log(err))
  }

  getCheckedValues() {
    const { countriesList } = this.state;
    let countryIds = countriesList.map(countryName => ('id-'+countryName));
    let selectedCountries = [];
    for (let i = 0; i < countryIds.length; i++) {
      let currId = countryIds[i];
      let checkboxCurr = document.getElementById(currId);
      if (checkboxCurr.checked) {
        let countryName = currId.split("-")[1];
        selectedCountries.push(countryName);
      }
    }
    this.setState({graphCountries: selectedCountries})
  }



  getColors(graphCountries, countriesList) {
    let colors = ["#b8ac0b","#f5416a","#825d4c","#273b22","#3a1abf","#d32538","#1d63bf","#357465","#d4708d","#fe215f","#cce99b",
    "#9fbf62","#f96918","#fb55b4","#1ec23c","#9cd222","#f7ae29","#511fb2","#7ba573","#39faad","#3ae3c4","#2b9184","#8cd5ea","#19f9b7","#1e85fc",
    "#61fb22","#a8a19b","#59ab86","#a67f32","#56e072","#14b2f1","#f433e0","#e4575f","#651ebc","#109269","#7cfadf","#954e5f","#9366e8",
    "#fea166","#f0f892","#370e2e","#159983","#14486a","#5250a6","#35e016","#216b92","#c210dc","#95510c"];
    let result = [];
    for (let i = 0; i < graphCountries.length; i++) {
      let country = graphCountries[i];
      let index = countriesList.indexOf(country);
      result.push(colors[index]);
    }
    return result;
  }

  render() {
    /* TODO: grab values from check box and send data as prop to the charts below */
    const { data, countriesList, graphCountries } = this.state;
    let colors = this.getColors(graphCountries, countriesList);
    return (
      <div className="visualDiv">
        <div className="checkBoxDiv">
          <Button onClick={this.getCheckedValues} className="buttonStyling" variant="primary">
            Change Graph Data
          </Button>
          <Form>
            {countriesList.map(countryName => (
              <div key={`key-${countryName}`}>
                <Form.Check 
                  custom
                  type={'checkbox'}
                  id={`id-${countryName}`}
                  label={`${countryName}`}
                />
              </div>
            ))}
            
          </Form>
        </div>
        <div>
          <CarDataGraph props={[data, graphCountries, colors]}/>
          <CarbonEmissionsGraph props={[data, graphCountries, colors]}/>
        </div>
      </div>
    )
  }
}

export default Visualizations;