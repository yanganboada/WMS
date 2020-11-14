import React from 'react';

export default class AddEditProduct extends React.Component {
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
        imageUrl: '',
        status: true
      },
      imageFile: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hangdleImageChange = this.hangdleImageChange.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.params.productId !== 'undefined') {
      this.setState({ edit: true });
      fetch(`/api/products/${this.props.params.productId}`)
        .then(res => res.json())
        .then(res => {
          this.setState({ fields: Object.assign({}, res) });
        })
        .catch(err => console.error(err));
    }
  }

  hangdleImageChange(e) {
    this.setState({
      fields: Object.assign(this.state.fields, { imageUrl: URL.createObjectURL(e.target.files[0]) }),
      imageFile: e.target.files[0]
    });
  }

  handleChange(e) {

    const newState = {};
    newState[e.target.id] = e.target.value;

    this.setState({
      fields: Object.assign(this.state.fields, newState)
    });

    !Object.values(this.state.fields).includes('')
      ? this.setState({ error: false })
      : this.setState({ error: true });
  }

  handleSubmit(e) {
    e.preventDefault();

    const product = Object.assign({}, this.state.fields);
    if (typeof this.props.params.productId !== 'undefined') {
      fetch(`/api/products/${this.props.params.productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then(result => {
          this.props.setView('productDetails', this.props.params);
        })
        .catch(err => console.error(err));
    } else {
      const formData = new FormData();
      formData.append('imageUpload', this.state.imageFile);
      fetch('/api/images', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            fields: Object.assign(this.state.fields, { imageUrl: `/images/${data.originalname}` })
          });
        })
        .then(() => {
          fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          })
            .then(res => res.json())
            .then(result => {
              this.props.setView('productList', {});
            })
            .catch(err => console.error(err));
        })
        .catch(error => {
          console.error(error);
        });
    }

  }

  render() {

    return (
      <div className='container'>
        <div className='row card'>
          <div className="back-arrow w-100 p-2 cursor text-muted font-italic d-flex justify-content-end" onClick={() => this.props.setView('productList', {})} >
            <p>Back to Product List -&gt;</p>
          </div>
          <div className="row justify-content-center m-2">
            <form encType="multipart/form-data" className="row justify-content-between" onSubmit={this.handleSubmit}>
              <div className='row m-2'>
                <div className='col-6 flex-column'>
                  <img className="col-12 card-img-left border"
                    src={this.state.fields.imageUrl === ''
                      ? './images/image-holder.png'
                      : this.state.fields.imageUrl
                    }
                    onChange={this.hangdleImageChange} />
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="imageUrl"
                      name="imageUpload"
                      accept="image/*"
                      onChange={this.hangdleImageChange} />
                    <label
                      className="custom-file-label"
                      htmlFor="customFile">
                      Choose Image
                    </label>
                  </div>
                </div>
                <div className='col-6'>
                  <div className="row m-2">
                    Sku:
                    <div className="ml-auto">
                      <input
                        type="text"
                        className="form-control product-form form-control-sm"
                        placeholder="Sku"
                        size="8"
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
                        size="8"
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
                        size="8"
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
              { this.state.error
                ? <div className="w-100 text-center">
                  <p className="w-100 text-center text-danger">
                    { this.state.edit
                      ? 'At least one filed need to be changed'
                      : 'Please fill out the entire form' }
                  </p>
                  <button className="btn-grey mx-auto mb-4" disabled>Submit</button>
                </div>
                : <div className="w-100 text-center">
                  <p></p>
                  <button type='submit' className="btn-blue mx-auto mb-4" >Submit</button>
                </div>
              }
            </form>
          </div>
        </div>
      </div>

    );
  }

}
