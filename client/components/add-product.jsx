import React from 'react';

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      fields: {
        sku: '',
        color: '',
        qty: '',
        name: '',
        categoryId: '',
        supplierId: '',
        cost: '',
        shippingCost: '',
        size: '',
        location: '',
        imageUrl: '/images/P001.jpg',
        status: true
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

    const newState = {};
    newState[e.target.id] = e.target.value;
    this.setState({ fields: Object.assign({}, this.state.fields, newState) });

    !Object.values(this.state.fields).includes('')
      ? this.setState({ error: false })
      : this.setState({ error: true });
  }

  handleSubmit(e) {
    e.preventDefault();

    const product = Object.assign({}, this.state.fields);
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(result => {
        this.props.setView('productList', {});
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <div className='container'>
        <div className='row card'>
          <div className="back-arrow w-100 p-2 cursor text-muted font-italic d-flex justify-content-end" onClick={() => this.props.setView('productList', {})} >
            <p>Back to Product List -&gt;</p>
          </div>
          <div className="row justify-content-center m-2">
            <img className="col-6 card-img-left border" src={this.state.fields.imageUrl} onChange={this.handleChange} />
            <div className="col-6">
              <div className="row m-2">
                Sku:
                <div className="ml-auto">
                  <input
                    type="text"
                    className="form-control product-form form-control-sm"
                    placeholder="Sku"
                    size="5"
                    id='sku'
                    value={this.state.fields.sku}
                    onChange={this.handleChange} required>
                  </input>
                </div>
              </div>
              <div className="row m-2">
                Color:
                <div className="ml-auto">
                  <input
                    type="text"
                    className="form-control product-form form-control-sm"
                    placeholder="Color"
                    size="5"
                    id='color'
                    value={this.state.fields.color}
                    onChange={this.handleChange} required>
                  </input>
                </div>
              </div>
              <div className="row m-2">
                QTY:
                <div className="ml-auto">
                  <input
                    type="text"
                    className="form-control product-form form-control-sm"
                    placeholder="Qty"
                    size="5"
                    id='qty'
                    value={this.state.fields.qty}
                    onChange={this.handleChange} required>
                  </input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 text-center my-2">
            <div className="row align-items-center m-2">
              Name:
              <div className="ml-auto">
                <input
                  type="text"
                  className="form-control product-form form-control-sm"
                  placeholder="Name"
                  size="25"
                  id='name'
                  value={this.state.fields.name}
                  onChange={this.handleChange} required>
                </input>
              </div>
            </div>
            <div className="row align-items-center m-2">
              Category:
              <div className="ml-auto">
                <select
                  className="form-control-sm product-drop-down"
                  id='categoryId'
                  value={this.state.fields.categoryId}
                  onChange={this.handleChange} required>
                  <option>Select One...</option>
                  <option value="1">Necklace</option>
                  <option value="2">Packaging</option>
                  <option value="3">Dog Tag</option>
                </select>
              </div>
            </div>
            <div className="row align-items-center m-2">
              Supplier:
              <div className="ml-auto">
                <select
                  className="form-control-sm product-drop-down"
                  id='supplierId'
                  value={this.state.fields.supplierId}
                  onChange={this.handleChange} required>
                  <option>Select One...</option>
                  <option value="1">Yiwu Basic Stainless</option>
                  <option value="2">jpb box & Zhihua Packaging</option>
                  <option value="3">Jienuo Stainless</option>
                  <option value="4">Lazy Cat Alex</option>
                </select>
              </div>
            </div>
            <div className="row align-items-center m-2">
              Cost:
              <div className="ml-auto">
                <input
                  type="text"
                  className="form-control product-form form-control-sm"
                  placeholder="0.00"
                  size="25"
                  id='cost'
                  value={this.state.fields.cost}
                  onChange={this.handleChange} required></input>
              </div>
            </div>
            <div className="row align-items-center m-2">
              Shipping Cost:
              <div className="ml-auto">
                <input
                  type="text"
                  className="form-control product-form form-control-sm"
                  placeholder="0.00"
                  size="25"
                  id='shippingCost'
                  value={this.state.fields.shippingCost}
                  onChange={this.handleChange} required></input>
              </div>
            </div>
            <div className="row align-items-center m-2">
              Size:
              <div className="ml-auto">
                <input
                  type="text"
                  className="form-control product-form form-control-sm"
                  placeholder="4mmx4mmx4mm"
                  size="25"
                  id='size'
                  value={this.state.fields.size}
                  onChange={this.handleChange} required></input>
              </div>
            </div>
            <div className="row align-items-center m-2">
              Location:
              <div className="ml-auto">
                <input
                  type="text"
                  className="form-control product-form form-control-sm"
                  placeholder="Location"
                  size="25"
                  id='location'
                  value={this.state.fields.location}
                  onChange={this.handleChange} required></input>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            {this.state.error
              ? <p className="d-flex justify-content-center">Please fill out the entire form</p>
              : <p className="d-none"></p>}
          </div>
          <div className="d-flex justify-content-center">

            {this.state.error
              ? <button className="add-product btn-grey m-3" disabled>Submit</button>
              : <button className="add-product btn-blue m-3" onClick={this.handleSubmit}>Submit</button>}
          </div>

        </div>
      </div>

    );
  }

}
