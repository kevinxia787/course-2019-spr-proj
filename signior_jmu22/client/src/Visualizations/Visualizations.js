import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import './Visualizations.css';
import CarDataGraph from  './CarDataGraph/CarDataGraph';
import CarbonEmissionsGraph from './CarbonEmissionsGraph/CarbonEmissionsGraph';
class Visualizations extends Component {
  constructor(props) {
    super(props);

    this.state = {data: [], countriesList: []}
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
  render() {
    const { data, countriesList } = this.state;
    return (
      <div className="visualDiv">
        <div className="checkBoxDiv">
          <h5>Change Graph Data</h5>
          <Form>
            {countriesList.map(countryName => (
                <Form.Check 
                  custom
                  type={'checkbox'}
                  id={`${countryName}`}
                  label={`${countryName}`}
                />
            ))}
          </Form>
        </div>
        <div>
          <CarDataGraph/>
          <CarbonEmissionsGraph/>
        </div>
      </div>
    )
  }
}

export default Visualizations;