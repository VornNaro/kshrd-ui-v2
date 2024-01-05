import React, { Component } from 'react';
import './Alumni.css';
import {
  Table,
  Button,
  Image,
  Form,
  Col,
  Row,
  FormControl,
} from 'react-bootstrap';
import {
  getAlumni,
  deleteAlumni,
  postAlumni,
  updateAlumni,
  searchAlumni,
} from '../../redux/Actions/admin/alumniActions/AlumniAction';
import { uploadFile } from '../../redux/Actions/admin/fileUploadActions/fileUploadActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import Loading from '../Loading/Loading';
import { scrollToTop } from '../helpers/scrollTop';

class Alumni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      major: '',
      workplace: '',
      comment: '',
      link: '',
      photo: '',

      isUpdate: false,
      imageUrl: '',
      fileImage: '',
      activePage: 1,
      perPage: 5,
      id: 1,
      condition: true,
    };
  }
  componentWillMount() {
    this.props.getAlumni(this.state.activePage);
  }

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getAlumni(this.state.activePage);
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to content the state to an object
  alumniRequest = () => {

    const alumniRequest = {

      name: this.state.name,
      major: this.state.major,
      workplace: this.state.workplace,
      comment: this.state.comment,
      photo: this.state.photo,
      link: this.state.link,
    };
    return alumniRequest;
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

  //TODO: This function is created for clear state
  handleClear = () => {

    this.setState({
      id: 0,
      name: '',
      major: '',
      workplace: '',
      comment: '',
      detail: '',
      link: '',
      photo: '',
      fileImage: '',
      imageUrl: '',
      isUpdate: false,
    });
  };

  //TODO: This function is created to add new & update data
  handleSubmit = async (e) => {
    e.preventDefault();

    let alumniRequest = this.alumniRequest();

    if (!this.state.isUpdate) {

      const formData = new FormData();
      formData.append(`files`, this.state.fileImage);

      await this.props.uploadFile(formData);
      const photo = this.props.imageUrlRes;

      const alumniReq = {
        ...alumniRequest,
        photo,
      };

      await this.props.postAlumni(alumniReq);

    } else {

      let id = this.state.id;

      if (this.state.fileImage) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);
        const photo = this.props.imageUrlRes;

        const alumniReq = {
          ...alumniRequest,
          photo,
        };

        await this.props.updateAlumni(id, alumniReq);

      } else {
        let alumniRequest = this.alumniRequest();
        const alumniReq = {
          ...alumniRequest,
        };

        await this.props.updateAlumni(id, alumniReq);
      }
    }

    if (this.props.postedMessage.message.includes('successfully')) {

      swal('success', this.props.postedMessage.message, 'success');
      this.props.getAlumni(this.state.activePage);
      this.handleClear();

    } else {
      let errors = this.props.postedMessage.error.map((err) => {
        return '\n\n' + err.message;
      });

      swal('Error', this.props.postedMessage.message.concat(errors), 'error');
    }
  };

  //TODO: This function is created to get data for update
  handleUpdate = (id, name, major, workplace, comment, link, photo) => {

    this.setState({
      id: id,
      name: name,
      major: major,
      workplace: workplace,
      comment: comment,
      link: link,
      photo: photo,
      imageUrl: photo,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
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

        this.props.deleteAlumni(id);

        if (this.props.alumni.length <= 1) {
          this.props.getAlumni(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
    this.handleClear();
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchAlumni(target.value);
  };

  //TODO: This function is created to view data
  handleView = (data) => {

    Swal.fire({
      width: 600,
      html: `
      <div data-aos="fade-up" class="aos-init aos-animate">
        <div class="row">
          <div class="col-md-12">
            <div class="alumni-profile">
              <div class="alumni-bg">
                <img class="alumni-pic rounded-circle w-100 h-100" alt="profile" src="${data.photo}">
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="alumni-comment alumni-comment-top mr-0">
              <div>
                <a href="https://www.facebook.com/vuthea.chheang" target="_blank" rel="noopener noreferrer">
                  <h4 class="alumni-name">${data.name}</h4>
                </a>
                <p class="text-muted m-0">${data.major}</p>
              </div>
              <div class="alumni-comment-description">
                <blockquote class="blockquote-row-top">${data.comment}</blockquote>
              </div>
            </div>
        </div>
      </div>
    </div>`
    });
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  };

  render() {
    const myData = this.props.alumni.map((data, index) => (
      <tr className="rowTable" key={data.id}>
        <td
          style={{ width: '3%', verticalAlign: 'middle' }}
          className="commentOverflow"
        >
          {index + 1}
        </td>
        <td style={{ width: '16%', verticalAlign: 'middle' }}>{data.name}</td>
        <td
          style={{ width: '20%', verticalAlign: 'middle' }}
          className="commentOverflow"
        >
          {data.workplace}
        </td>
        <td
          style={{ width: '27%', verticalAlign: 'middle' }}
          className="commentOverflow"
        >
          {data.comment}
        </td>
        <td style={{ width: '10%', textAlign: 'center' }}>
          <Image
            src={
              data.photo ||
              'https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png'
            }
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
          style={{ textAlign: 'center', verticalAlign: 'middle', display: 'flex', justifyContent: 'center' }}
        >
          <Button
            className="btn-view mr-1"
            variant="info"
            onClick={() =>
              this.handleView(
                data
              )
            }
          >
            View
          </Button>
          <Button
            className="btn-edit mr-1"
            variant="warning"
            onClick={(id, name, major, workplace, comment, link, photo) =>
              this.handleUpdate(
                data.id,
                data.name,
                data.major,
                data.workplace,
                data.comment,
                data.link,
                data.photo
              )
            }
          >
            Edit
          </Button>
          <Button
            className="btn-view mr-1"
            variant="danger"
            onClick={(id) => this.handleDelete(data.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
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
                  Insert Alumni
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
                    <div className="col-md-8">
                      <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-3 col-form-label">Name of Alumni</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Major</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input major"
                            name="major"
                            value={this.state.major}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Workplace</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input workplace"
                            name="workplace"
                            value={this.state.workplace}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Profile Link</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input link"
                            name="link"
                            value={this.state.link}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Comment</label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ resize: 'none', margin: 0 }}
                            as="textarea"
                            rows="5"
                            placeholder="input comment"
                            name="comment"
                            value={this.state.comment}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="col-md-4">
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
                          id="file-image"
                          label="Custom file input"
                          accept="image/*"
                          custom
                          onChange={this.handleChangeImage}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className='col-md-8'>
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

            <hr style={{ borderWidth: '3px', marginTop: 0 }}></hr>
            <h4 className="mb-3 text-dark">List of Alumni</h4>
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

              {!(this.props.loading || this.props.uploadLoading) && (
                <div>
                  <Table hover responsive className="mt-4">
                    <thead
                      style={{ textAlign: 'center', backgroundColor: '#FFF' }}
                    >
                      <tr>
                        <th className="th-style">#</th>
                        <th className="th-style">Name</th>
                        <th className="th-style">Workplace</th>
                        <th className="th-style">Comment</th>
                        <th className="th-style">Photo</th>
                        <th className="th-style">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">{myData}</tbody>
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
    alumni: state.alumniReducer.alumni,
    del: state.alumniReducer.del,
    imageUrlRes: state.fileUploadReducer.imageUrl,
    totalRecord: state.alumniReducer.totalRecord,
    loading: state.alumniReducer.loading,
    uploadLoading: state.fileUploadReducer.uploadLoading,
    autoId: state.alumniReducer.autoId,
    postedMessage: state.alumniReducer.postedMessage,
    deletedMessage: state.alumniReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAlumni,
      deleteAlumni,
      postAlumni,
      uploadFile,
      updateAlumni,
      searchAlumni,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(Alumni);
