import React from 'react';
import { Pie } from 'react-chartjs-2';

export default class CategoryReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      necklaceQty: '',
      dogTagQty: '',
      packagingQty: '',
      necklaceCost: 0,
      dogTagCost: 0,
      packagingCost: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {

    fetch('/api/products-category')
      .then(res => res.json())
      .then(result => {
        this.setState({ data: result });

        const necklaceCategory = [];
        const dogTagCategory = [];
        const packagingCategory = [];

        for (const prop in this.state.data) {
          const dataProp = this.state.data[prop];

          if (dataProp.category === 'Necklace') {
            necklaceCategory.push(dataProp.quantity);
            this.setState({ necklaceCost: dataProp.cost });
          }
          if (dataProp.category === 'Dog Tag') {
            dogTagCategory.push(dataProp.quantity);
            this.setState({ dogTagCost: dataProp.cost });
          }
          if (dataProp.category === 'Packaging') {
            packagingCategory.push(dataProp.quantity);
            this.setState({ packagingCost: dataProp.cost });
          }

        }

        const qtyNeck = necklaceCategory.reduce(function (acc, val) { return acc + val; }, 0);
        const qtyDogTag = dogTagCategory.reduce(function (acc, val) { return acc + val; }, 0);
        const qtyPackaging = packagingCategory.reduce(function (acc, val) { return acc + val; }, 0);

        this.setState({
          necklaceQty: qtyNeck,
          dogTagQty: qtyDogTag,
          packagingQty: qtyPackaging
        });
      });
  }

  render() {

    const necklaceValue = parseInt(this.state.necklaceQty, 10);
    const dogTagValue = parseInt(this.state.dogTagQty, 10);
    const packagingValue = parseInt(this.state.packagingQty, 10);

    const data = {
      labels: ['Necklace', 'Dog Tag', 'Packaging'],
      datasets: [
        {
          data: [necklaceValue, dogTagValue, packagingValue],
          backgroundColor: [
            '#457B9D',
            '#A8DADC',
            '#F7D9C4'
          ],
          borderWidth: 1
        }
      ]
    };

    return (
      <div>
        <div className="back-arrow w-100 p-2 cursor text-muted font-italic d-flex justify-content-end" onClick={() => this.props.setView('reports', {})} >
          <p>Back to Report List -&gt;</p>
        </div>

        <div className="card py-5 m-3">
          <div className="m-auto justify-content-center align-items-center pb-3">
            <h4>Inventory By Category</h4>
          </div>
          <Pie
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true
            }}
          />
        </div>

        <div className="row justify-content-center align-items-center mt-3">
          <div>
            <div>
              <p>Necklace: ${(this.state.necklaceQty * this.state.necklaceCost).toFixed(2)}</p>
            </div>
            <div>
              <p>Dog Tag: ${(this.state.dogTagQty * this.state.dogTagCost).toFixed(2)}</p>
            </div>
            <div>
              <p>Packaging: ${(this.state.packagingQty * this.state.packagingCost).toFixed(2)}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
