import React, { Component } from 'react';
import './Partner.css';
import {
  Table,
  Button,
  Form,
  Image,
  FormControl,
  Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getPartners,
  getPartnerType,
  postPartner,
  deletePartner,
  updatePartner,
  searchPartner,
} from '../../redux/Actions/admin/partnerActions/PartnerAction';
import { uploadFile } from '../../redux/Actions/admin/fileUploadActions/fileUploadActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import Loading from '../Loading/Loading';
import { scrollToTop } from '../helpers/scrollTop';

class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      address: '',
      partnerType: 0,
      logo: '',

      isUpdate: false,
      imageUrl: '',
      fileImage: '',

      activePage: 1,
      perPage: 5,
      condition: true,
    };
  }

  componentDidMount() {
    this.props.getPartners(this.state.activePage);
    this.props.getPartnerType();
  }

  //TODO: This function is created to get data from input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getPartners(this.state.activePage);
    });
  }

  //TODO: This function is created to select an option of course training type
  handleSelect = (event) => {

    let id = event.target.value;
    this.setState({
      partnerType: id,
    });
  };

  //TODO: This function is created to select an image to upload
  handleChangeImage = ({ target }) => {

    if (target.files[0] != null) {

      const file = target.files[0];
      this.setState({ fileImage: file });

      const fileReader = new FileReader();

      fileReader.addEventListener('load', (e) => {
        this.setState({
          imageUrl: e.target.result,
        });
      });

      fileReader.readAsDataURL(file);
    }
  };

  //TODO: This function is created to content state to an object
  partnerRequest = () => {

    const partnerRequest = {

      name: this.state.name,
      address: this.state.address,
      partnerType: {
        id: this.state.partnerType,
      },
      logo: this.state.logo,
    };
    return partnerRequest;
  };

  //TODO: This function is created to add new and update data
  handleSubmit = async (e) => {

    e.preventDefault();

    let partnerRequest = this.partnerRequest();

    if (!this.state.isUpdate) {

      const formData = new FormData();
      formData.append(`files`, this.state.fileImage);

      await this.props.uploadFile(formData);
      const logo = this.props.imageUrlRes;

      const partnerReq = {
        ...partnerRequest,
        logo,
      };

      await this.props.postPartner(partnerReq);

    } else {

      let id = this.state.id;

      if (this.state.fileImage) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);
        const logo = this.props.imageUrlRes;

        const partnerReq = {
          ...partnerRequest,
          logo,
        };
        await this.props.updatePartner(id, partnerReq);

      } else {

        let partnerRequest = this.partnerRequest();
        const partnerReq = {
          ...partnerRequest,
        };
        await this.props.updatePartner(id, partnerReq);
      }
    }

    let errors = null;

    if (this.props.postedMessage.message.includes('successfully')) {

      swal('success', this.props.postedMessage.message, 'success');
      this.props.getPartners(this.state.activePage);
      this.handleClear();

    } else {

      if (this.props.postedMessage.error != null) {

        errors = this.props.postedMessage.error.map((err) => {
          return '\n\n' + err.message;
        });
      } else {
        errors = '';
      }
      swal('Error', this.props.postedMessage.message.concat(errors), 'error');
    }
  };

  //TODO: This function is created to clear state
  handleClear = () => {

    this.setState({

      id: 0,
      name: '',
      address: '',
      partnerType: 0,
      logo: '',
      imageUrl: '',
      fileImage: '',
      isUpdate: false,
    });
  };

  //TODO: This function is created to delete data
  handleDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',

    }).then((result) => {

      if (result.value) {

        this.props.deletePartner(id);

        if (this.props.partner.length <= 1) {
          this.props.getPartners(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
    this.handleClear();
  };

  //TODO: This function is created to get data to update
  handleUpdate = (id, name, address, partnerType, logo) => {

    this.setState({
      id: id,
      name: name,
      address: address,
      partnerType: partnerType,
      logo: logo,
      imageUrl: logo,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchPartner(target.value);
  };

  //TODO: This function is created to view data
  handleView = (id, name, address, partnerType, logo) => {

    Swal.fire({
      imageUrl:
        logo ||
        'https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: logo,
      html: `
      <div style="text-align:left;margin-top:10px">
        <p class="text-center font-weight-bold">${name}</p>
        <table class='sweet-table'>
          <tr>
            <th>Address: </th>
            <td>${address}</td>
          </tr>
          <tr>
            <th>Type: </th>
            <td>${partnerType}</td>
          </tr>
        </table>
        
      </div> `,
    });
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  };

  render() {
    const myData = this.props.partner.map((data) => {
      return (
        <tbody key={data.id} style={{ textAlign: 'center' }}>
          <tr className="rowTable">
            <td style={{ verticalAlign: 'middle' }}>{data.id}</td>
            <td style={{ verticalAlign: 'middle' }}>{data.name}</td>
            <td style={{ verticalAlign: 'middle' }}>{data.partnerType.name}</td>
            <td style={{ textAlign: 'center' }}>
              <Image
                src={data.logo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png';
                }}
                width="50%"
                style={{ maxHeight: '100px', maxWidth: '100px' }}
              />
            </td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <Button
                className="btn-view mr-1"
                variant="info"
                onClick={(id, name, address, partnerType, logo) =>
                  this.handleView(
                    data.id,
                    data.name,
                    data.address,
                    data.partnerType.name,
                    data.logo
                  )
                }
              >
                View
              </Button>
              <Button
                className="btn-edit mr-1"
                variant="warning"
                onClick={(id, name, address, partnerTypeId, logo) =>
                  this.handleUpdate(
                    data.id,
                    data.name,
                    data.address,
                    data.partnerType.id,
                    data.logo
                  )
                }
              >
                Edit
              </Button>
              <Button
                className="btn-delete mr-1"
                variant="danger"
                onClick={(id) => this.handleDelete(data.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h4
                  className="m-0 text-dark"
                  onClick={this.handleClick}
                  style={{ cursor: 'pointer' }}
                >
                  Insert Partner
                </h4>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className={this.state.condition ? 'd-none form-horizontal' : 'd-flex'}>
              <div className="card card-info w-100">

                <Form onSubmit={this.handleSubmit} className='form-horizontal'
                >
                  {/* <form className="form-horizontal"> */}
                  <div className="card-body row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-3 col-form-label">Name of Partner</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                          <small className="text-danger">
                            {this.state.nameError}
                          </small>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Type of Partner</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="select"
                            value={this.state.partnerType}
                            onChange={this.handleSelect}
                          >
                            <option value={0}>Select partner type </option>
                            {this.props.partnerTypes.map((d) => {
                              return (
                                <option key={d.id} value={d.id}>
                                  {d.name}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Address of Partner</label>
                        <div className="col-sm-9">
                          <Form.Control
                            className='mt-0'
                            as="textarea"
                            rows="5"
                            placeholder="input address"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="col-md-3">
                      <img
                        src={
                          this.state.imageUrl ||
                          'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'
                        }
                        alt="Thumbnail"
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                          border: '1px solid #eee',
                        }}
                      />
                      <Form.Group as={Col}>
                        <Form.File
                          className='mt-2'
                          id="file-image"
                          label="Upload Logo"
                          accept="image/*"
                          custom
                          onChange={this.handleChangeImage}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className='col-md-9'>
                    <Button
                      className="btn-add btn btn-primary float-right px-5"
                      variant="primary mb-3"
                      type="submit"
                    >
                      {this.state.isUpdate ? 'UPDATE' : 'ADD NEW'}
                    </Button>
                  </div>

                </Form>
              </div>

            </div>

            <hr style={{ borderWidth: '2px', marginTop: '0' }}></hr>

            <h4 className="mb-3 text-dark">List of Partners</h4>


            <div className='card px-3'>
              <div className="row mt-3">
                <div className="col-md-3">
                  <FormControl
                    type="text"
                    placeholder="Search by name"
                    className="mr-sm-2"
                    onChange={this.handleSearch}
                  />
                </div>
              </div>
              {(this.props.loading || this.props.uploadLoading) && (
                <div className="content-wrapper ml-5">
                  <div className="ml-5">
                    <Loading />
                  </div>
                </div>
              )}

              {!this.props.loading && !this.props.uploadLoading && (
                <div>
                  <Table hover responsive className="mt-4">
                    <thead style={{ textAlign: 'center', background: '#FFF' }}>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        {/* <th>Address</th> */}
                        <th className="text-center">Logo</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    {myData}
                  </Table>
                  <div style={{ marginLeft: '35%' }}>
                    <Pagination
                      prevPageText="prev"
                      nextPageText="next"
                      firstPageText="first"
                      lastPageText="last"
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.props.totalRecord}
                      onChange={this.handlePageChange.bind(this)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </div>
              )}

            </div>



          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    partner: state.partnerReducer.partner,
    partnerTypes: state.partnerReducer.partnerTypes,
    postedMessage: state.partnerReducer.postedMessage,
    imageUrlRes: state.fileUploadReducer.imageUrl,
    totalRecord: state.partnerReducer.totalRecord,
    loading: state.partnerReducer.loading,
    uploadLoading: state.fileUploadReducer.uploadLoading,
    deletedMessage: state.partnerReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPartners,
      getPartnerType,
      postPartner,
      deletePartner,
      updatePartner,
      searchPartner,
      uploadFile,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(Partner);
