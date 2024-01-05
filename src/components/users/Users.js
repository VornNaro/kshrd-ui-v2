import React, { Component } from 'react';
import './Users.css';
import {
  Table,
  Button,
  Form,
  Col,
  Image,
  Row,
  FormControl,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getUsers,
  postUser,
  deleteUser,
  updateUser,
  searchUser,
} from '../../redux/Actions/admin/userActions/UserAction';
import { uploadFile } from '../../redux/Actions/admin/fileUploadActions/fileUploadActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';
import Pagination from 'react-js-pagination';
import { scrollToTop } from '../helpers/scrollTop';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'Male',
      photo: '',

      activePage: 1,
      perPage: 5,

      isUpdate: false,
      imageUrl: '',
      fileImage: '',
      loading: true,
      condition: true,
    };
  }

  fetchData = () => {
    this.props.getUsers(this.state.activePage);
  }

  componentDidMount() {
    if (this.props.data.length === 0) {
      this.fetchData();
    }
  }


  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.props.getUsers(this.state.activePage);
    });
  }

  //TODO: This function is created to get data from input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to get data from Radio buttons
  handleRadio = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  //TODO: This function is created to get data from Username and password inputs
  onUserNameAndPasswordChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    this.setState({
      [e.target.name]: value,
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
  userRequest = () => {
    const userRequest = {
      username: this.state.username,
      password: this.state.password,
      gender: this.state.gender,
      email: this.state.email,
      photo: this.state.photo,
      role_id: 1,
    };
    return userRequest;
  };

  //TODO: This function is created to add new and update data
  handleSubmit = async (event) => {

    event.preventDefault();

    let userRequest = this.userRequest();
    if (this.state.password === this.state.confirmPassword) {

      if (!this.state.isUpdate) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);
        const photo = this.props.imageUrlRes;

        const userReq = {
          ...userRequest,
          photo,
        };
        await this.props.postUser(userReq);

      } else {

        let id = this.state.id;

        if (this.state.fileImage) {

          const formData = new FormData();
          formData.append(`files`, this.state.fileImage);

          await this.props.uploadFile(formData);
          const photo = this.props.imageUrlRes;

          const userReq = {
            ...userRequest,
            photo,
          };

          await this.props.updateUser(id, userReq);
          this.componentWillMount();

        } else {

          let userRequest = this.userRequest();
          const userReq = {
            ...userRequest,
          };
          await this.props.updateUser(id, userReq);
        }
      }

      let errors = null;

      if (this.props.postedMessage.message.includes('successfully')) {

        swal('success', this.props.postedMessage.message, 'success');
        this.props.getUsers(this.state.activePage);
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
    } else alert('Password and confirm password do not match');
  };

  //TODO: This function is created to clear state
  handleClear = () => {

    this.setState({
      id: 0,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      photo: '',
      imageUrl: '',
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

    }).then(async (result) => {

      if (result.value) {

        await this.props.deleteUser(id);

        if (this.props.data.length <= 1) {

          this.props.getUsers(this.state.activePage - 1);
        } else {
          this.fetchData();
        }
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });

    this.setState({
      id: 0,
      name: '',
      address: '',
      partnertype: 0,
      logo: '',
      imageUrl: '',
      isUpdate: false,
    });
  };

  //TODO: This function is created to get data to update
  handleUpdate = (id, username, gender, password, email, photo) => {
    this.setState({

      id: id,
      username: username,
      gender: gender,
      password: password,
      email: email,
      photo: photo,
      imageUrl: photo,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
  };

  //TODO: This function is created to get data from gender input
  handleSelect = (event) => {

    let gender = event.target.value;
    this.setState({
      gender: gender,
    });
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchUser(target.value);
  };

  //TODO: This function is created to view data
  handleView = (id, username, email, gender, photo) => {

    Swal.fire({
      title: username,
      imageUrl:
        photo ||
        'https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: username,
      html: `<p>${email}</p><p>${gender}</p> `,
    });
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  };

  render() {

    const myData = this.props.data.map((data) => (

      <tbody key={data.id} style={{ textAlign: 'center' }}>

        <tr className="rowTable">

          <td style={{ maxWidth: '5%', verticalAlign: 'middle' }}>{data.id}</td>

          <td style={{ maxWidth: '10%', verticalAlign: 'middle' }}>
            {data.username}
          </td>

          <td style={{ maxWidth: '10%', verticalAlign: 'middle' }}>
            {data.email}
          </td>

          <td style={{ maxWidth: '10%', verticalAlign: 'middle' }}>
            {data.gender}
          </td>

          <td style={{ maxWidth: '10%', verticalAlign: 'middle' }}>

            <Image
              src={data.photo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png';
              }}
              width="50%"
              style={{ maxHeight: '100px', maxWidth: '100px' }}
            />
          </td>

          <td
            style={{
              textAlign: 'center',
              maxWidth: '30%',
              verticalAlign: 'middle',
            }}
          >
            <Button
              className="btn-view mr-1"
              variant="info"
              onClick={(id, username, email, gender, phot) =>
                this.handleView(
                  data.id,
                  data.username,
                  data.gender,
                  data.email,
                  data.photo
                )
              }
            >
              View
            </Button>

            <Button
              className="btn-edit mr-1"
              variant="warning"
              onClick={(id, username, gender, password, email, photo) =>
                this.handleUpdate(
                  data.id,
                  data.username,
                  data.gender,
                  data.password,
                  data.email,
                  data.photo
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
    ));

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
                  Insert Admin
                </h4>
              </div>
            </div>
          </div>
        </div>

        <section className="content d-block">
          <div className="container-fluid">
            <div className={this.state.condition ? 'd-none row' : 'd-flex row'}>
              <div className="col-md-8">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <label>Username</label>
                      <Form.Control
                        type="text"
                        placeholder="input username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onUserNameAndPasswordChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="input email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="input password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onUserNameAndPasswordChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="input confirm password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onUserNameAndPasswordChange}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Row>
                        <Form.Group
                          as={Col}
                          controlId="exampleForm.ControlSelect1"
                        >
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            as="select"
                            defaultValue={this.state.gender}
                            onChange={this.handleSelect}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Form.Control>
                        </Form.Group>
                      </Row>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Photo</Form.Label>
                      <Form.File
                        id="file-image"
                        label="Custom file input"
                        accept="image/*"
                        custom
                        onChange={this.handleChangeImage}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Button
                      className="btn-add"
                      variant="primary my-3"
                      type="submit"
                    >
                      {this.state.isUpdate ? 'UPDATE' : 'ADD NEW'}
                    </Button>
                  </Form.Row>
                </Form>
              </div>
              <div className="col-md-4">
                <img
                  src={
                    this.state.imageUrl ||
                    'https://iwfstaff.com.au/wp-content/uploads/2017/12/placeholder-image.png'
                  }
                  alt="Thumbnail"
                  style={{
                    paddingTop: '33px',
                    maxHeight: '240px',
                    minHeight: '240px',
                    maxWidth: '80%',
                    minWidth: '80%',
                  }}
                />
              </div>
            </div>
            <hr style={{ borderWidth: '3px' }}></hr>

            <h4 className="m-0 text-dark">List of Admins</h4>
            <div className="row mt-3">
              <div className="col-md-3">
                <FormControl
                  type="text"
                  placeholder="Search by username"
                  className="mr-sm-2"
                  onChange={this.handleSearch}
                />
              </div>
            </div>
            {this.props.loading && (
              <div className="content-wrapper ml-5">
                <div className="ml-5">
                  <Loading />
                </div>
              </div>
            )}

            {!this.props.loading && (
              <div>
                <Table responsive="md" className="mt-4 tableData">
                  <thead style={{ textAlign: 'center', background: 'white' }}>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Photo</th>
                      <th>Action</th>
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
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.userReducer.data,
    imageUrlRes: state.fileUploadReducer.imageUrl,
    loading: state.userReducer.loading,
    totalRecord: state.userReducer.totalRecord,
    postedMessage: state.userReducer.postedMessage,
    deletedMessage: state.userReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUsers,
      postUser,
      deleteUser,
      updateUser,
      uploadFile,
      searchUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(Users);
