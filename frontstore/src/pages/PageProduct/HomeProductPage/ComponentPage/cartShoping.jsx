
function CartShoping() {
  return (
    <div>
  <div className="container-fluid bg-success mb-5" style={{borderRadius:"1rem"}} >
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-white mb-3">Shopping Cart</h1>
      <div className="d-inline-flex">
        <p className="m-0 text-white"><a href="#">Home</a></p>
        <p className="m-0 px-2 text-white">-</p>
        <p className="m-0 text-white">Shopping Cart</p>

<div className="spinner-grow text-light  " style={{marginLeft:"10px"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>

      </div>
    </div>
  </div>
  <div className="container-fluid pt-5">
    <div className="row px-xl-5">
      <div className="col-lg-8 table-responsive mb-5">
        <table className="table table-bordered text-center mb-0">
          <thead className="bg-secondary text-dark">
            <tr>

              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            <tr>
              <td className="align-middle"><img src="img/slider1.png" alt="img" style={{width: 50}} /> Colorful Stylish Shirt</td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width:100,columnGap:"5px"}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus " >
                      <i className="fa fa-minus " />
                    </button>
                  </div>
                  <input type="text" className="form-control form-control-sm  text-center"  defaultValue={1} />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
            </tr>
            <tr>
              <td className="align-middle"><img src="img/vetem2.png" alt="img1" style={{width: 50}} /> Colorful Stylish Shirt</td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width:100,columnGap:"5px"}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input type="text" className="form-control form-control-sm  text-center"  defaultValue={1} />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
            </tr>
            <tr>
              <td className="align-middle"><img src="img/vetem7.png" alt="img3" style={{width: 50}} /> Colorful Stylish Shirt</td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width:100,columnGap:"5px"}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input type="text" className="form-control form-control-sm  text-center"  defaultValue={1} />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
            </tr>
            <tr>
              <td className="align-middle"><img src="img/vetm1.png" alt="img4" style={{width: 50}} /> Colorful Stylish Shirt</td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width:100,columnGap:"5px"}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input type="text" className="form-control form-control-sm  text-center"  defaultValue={1} />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
            </tr>
            <tr>
              <td className="align-middle"><img src="img/laptop4.png" alt="img5" style={{width: 50}} /> Colorful Stylish Shirt</td>
              <td className="align-middle">$150</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width:100,columnGap:"5px"}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus">
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input type="text" className="form-control form-control-sm  text-center"  defaultValue={1} />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus">
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">$150</td>
              <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-lg-4" >
        <form className="mb-4" >
          <div className="input-group " >
            <input type="text" className="form-control m-2 pt-"  placeholder="Coupon Code"  />
            <div className="input-group-append " >
              <button className="btn btn-primary m-2 ">Apply Coupon</button>
            </div>
          </div>
        </form>
        <div className="card border-secondary mb-5">
          <div className="card-header  border-0" style={{backgroundColor:"#0ead69"}}>
            <h4 className="font-weight-semi-bold m-0 text-white">Cart Summary</h4>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3 pt-4">
              <h6 className="font-weight-medium"><strong>Subtotal</strong></h6>
              <h6 className="font-weight-medium" ><strong>$150</strong></h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-medium"><strong>Shipping</strong></h6>
              <h6 className="font-weight-medium"><strong>$10</strong></h6>
            </div>
          </div>
          <div className="card-footer border-secondary bg-transparent">
            <div className="d-flex justify-content-between mt-2">
              <h5 className="font-weight-bold">Total</h5>
              <h5 className="font-weight-bold">$160</h5>
            </div>
            <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default CartShoping;