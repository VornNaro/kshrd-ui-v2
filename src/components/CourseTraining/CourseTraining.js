import React, { Component } from 'react';
import {
  Table,
  Button,
  Image,
  Form,
  Col,
  FormControl,
  Row,
} from 'react-bootstrap';
import {
  getCourseTraining,
  deleteCourseTraining,
  updateCourseTraining,
  postCourseTraining,
  searchCourseTraining,
} from '../../redux/Actions/admin/courseTraining/CourseTrainingAction';
import { getAllCourseTrainingType } from '../../redux/Actions/admin/courseTrainingTypeAction/CourseTrainingTypeAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { uploadFile } from '../../redux/Actions/admin/fileUploadActions/fileUploadActions';
import Pagination from 'react-js-pagination';
import Loading from '../Loading/Loading';
import './CourseTraining.css';
import { scrollToTop } from '../helpers/scrollTop';
class CourseTraining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      logo: '',
      file: '',
      courseTrainingTypeId: 0,
      isUpdate: false,
      activePage: 1,
      perPage: 5,

      imageUrl: '',
      fileImage: '',
      pdfUrl: '',
      filePdf: '',
      condition: true,
    };
  }

  componentWillMount() {

    this.props.getCourseTraining(this.state.activePage);
    this.props.getAllCourseTrainingType();
  }

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getCourseTraining(this.state.activePage);
    });
  }

  //TODO: This function is created to get data from input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to get option of course training type
  handleSelect = (event) => {

    let id = event.target.value;
    this.setState({
      courseTrainingTypeId: id,
    });
  };

  //TODO: This function is created to content state for an object
  courseTrainingRequest = () => {

    const courseTrainingRequest = {

      name: this.state.name,
      courseTrainingTypeId: {
        id: this.state.courseTrainingTypeId,
      },
      description: this.state.description,
      file: this.state.file,
      logo: this.state.logo,
    };
    return courseTrainingRequest;
  };

  //TODO: This function is created to select an image to upload
  handleChangeImage = ({ target }) => {

    if (target.files[0]) {

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

  //TODO: This function is created to get file pdf from input form
  handleChangePdf = ({ target }) => {

    if (target.files[0]) {

      const file = target.files[0];
      this.setState({ filePdf: file });

      const fileReader = new FileReader();

      fileReader.addEventListener('load', (e) => {
        this.setState({
          pdfUrl: e.target.result,
        });
      });

      fileReader.readAsDataURL(file);
    }
  };

  //TODO: This function is created to clear state
  handleClear = () => {

    this.setState({
      id: 0,
      courseTrainingTypeId: 0,
      name: '',
      description: '',
      logo: '',
      file: '',
      imageUrl: '',
      fileImage: '',
      isUpdate: false,
    });
  };

  //TODO: This function is created to add new & update data
  handleSubmit = async (e) => {

    e.preventDefault();
    let courseTrainingRequest = this.courseTrainingRequest();

    if (!this.state.isUpdate) {

      const formData = new FormData();
      formData.append(`files`, this.state.fileImage);

      await this.props.uploadFile(formData);
      const logo = this.props.imageUrlRes;

      const pdfData = new FormData();
      pdfData.append(`files`, this.state.filePdf);

      await this.props.uploadFile(pdfData);

      const file = this.props.imageUrlRes;

      const courseTrainingReq = {
        ...courseTrainingRequest,
        logo,
        file,
      };

      await this.props.postCourseTraining(courseTrainingReq);

    } else {

      let id = this.state.id;

      if (this.state.fileImage) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);

        const logo = this.props.imageUrlRes;

        const courseTrainingReq = {
          ...courseTrainingRequest,
          logo,
        };

        await this.props.updateCourseTraining(id, courseTrainingReq);

      } else if (this.state.filePdf) {

        const pdfData = new FormData();
        pdfData.append(`files`, this.state.filePdf);

        await this.props.uploadFile(pdfData);

        const file = this.props.imageUrlRes;
        const courseTrainingReq = {
          ...courseTrainingRequest,
          file,
        };
        await this.props.updateCourseTraining(id, courseTrainingReq);

      } else {

        let courseTrainingRequest = this.courseTrainingRequest();
        console.log('courseTrainingRequest', courseTrainingRequest);
        const courseTrainingReq = {
          ...courseTrainingRequest,
        };
        await this.props.updateCourseTraining(id, courseTrainingReq);
      }
    }

    let errors = null;

    if (this.props.postedMessage.message.includes('successfully')) {

      swal('success', this.props.postedMessage.message, 'success');
      this.props.getCourseTraining(this.state.activePage);
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

  //TODO: This function is created to get data to update
  handleUpdate = (id, name, description, logo, file, courseTrainingTypeId) => {

    this.setState({
      id: id,
      name: name,
      description: description,
      logo: logo,
      file: file,
      courseTrainingTypeId: courseTrainingTypeId,
      imageUrl: logo,
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

        this.props.deleteCourseTraining(id);

        if (this.props.courseTraining.length <= 1) {
          this.props.getCourseTraining(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
    this.handleClear();
  };

  //TODO: This function is created to view data
  handleView = (id, name, description, logo, file, courseTrainingTypeId) => {

    Swal.fire({
      imageUrl:
        logo ||
        'https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png',
      imageAlt: name,
      html: `<div style="text-align:left;margin-top:40px"><p>Name: ${name}</p><p>Type: ${courseTrainingTypeId}</p><p>Description: ${description}</div> `,
    });
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchCourseTraining(target.value);
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  };

  render() {
    const myData = this.props.courseTraining.map((data) => (
      <tbody key={data.id} style={{ textAlign: 'center' }}>
        <tr className="rowTable">
          <td style={{ width: '3%', verticalAlign: 'middle' }}>{data.id}</td>
          <td style={{ width: '20%', verticalAlign: 'middle' }}>{data.name}</td>
          <td style={{ width: '15%', verticalAlign: 'middle' }}>
            {data.courseTrainingTypeId.name}
          </td>

          <td
            style={{ width: '20%', verticalAlign: 'middle' }}
            className="descriptionOverflow"
          >
            {data.description}
          </td>
          <td style={{ width: '20%', verticalAlign: 'middle' }}>
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

          <td
            style={{
              textAlign: 'center',
              verticalAlign: 'middle',
              display: 'flex'
            }}
          >
            <Button
              className="btn-view mr-1"
              variant="info"
              onClick={(
                id,
                name,
                description,
                logo,
                file,
                courseTrainingTypeId
              ) =>
                this.handleView(
                  data.id,
                  data.name,
                  data.description,
                  data.logo,
                  data.file,
                  data.courseTrainingTypeId.name
                )
              }
            >
              View
            </Button>
            <Button
              className="btn-edit mr-1"
              variant="warning"
              onClick={(
                id,
                name,
                description,
                logo,
                file,
                courseTrainingTypeId
              ) =>
                this.handleUpdate(
                  data.id,
                  data.name,
                  data.description,
                  data.logo,
                  data.file,
                  data.courseTrainingTypeId.id
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
                  Insert Course Training
                </h4>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className={this.state.condition ? 'd-none row' : 'd-flex row'}>
              <Col md={12}>
                <div className="row">
                  <div className="col-md-8">
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Row>
                        <Form.Group as={Col}>
                          <label>Name</label>
                          <Form.Control
                            type="text"
                            placeholder="input name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="exampleForm.ControlSelect1"
                          as={Col}
                        >
                          <Form.Label>Course</Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.courseTrainingTypeId}
                            onChange={this.handleSelect}
                          >
                            <option value={0}>
                              Select course training type{' '}
                            </option>
                            {this.props.courseTrainingType.map((d) => {
                              return (
                                <option key={d.id} value={d.id}>
                                  {d.name}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label>Curriculum PDF</Form.Label>
                          <Form.File
                            id="file-image"
                            label='Upload Curriculum PDF'
                            custom
                            onChange={this.handleChangePdf}
                          />
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>Logo of Course</Form.Label>
                          <Form.File
                            id="file-image"
                            label='Upload Course Logo'
                            accept="image/*"
                            custom
                            onChange={this.handleChangeImage}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Row>
                        <Form.Group as={Col}>
                          <label>Description</label>
                          <Form.Control
                            style={{ resize: 'none' }}
                            as="textarea"
                            rows="4"
                            placeholder="input description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                      </Row>
                      <Button
                        className="btn-add"
                        variant="primary my-3"
                        type="submit"
                      >
                        {this.state.isUpdate ? 'UPDATE' : 'ADD NEW'}
                      </Button>
                    </Form>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="mt-4"
                      style={{
                        border: '1px solid grey',
                        textAlign: 'center',
                        width: '350px',
                        height: '300px',
                      }}
                    >
                      <img
                        src={
                          this.state.imageUrl ||
                          'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'
                        }
                        alt="Thumbnail"
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </div>

            <hr style={{ borderWidth: '3px' }}></hr>
            <h4 className="m-0 text-dark">List of Course Trainings</h4>
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
                      <th>#</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Logo</th>
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
    courseTraining: state.courseTrainingReducer.courseTraining,
    courseTrainingType: state.courseTrainingTypeReducer.courseTrainingType,
    imageUrlRes: state.fileUploadReducer.imageUrl,
    totalRecord: state.courseTrainingReducer.totalRecord,
    loading: state.courseTrainingReducer.loading,
    uploadLoading: state.fileUploadReducer.uploadLoading,
    postedMessage: state.courseTrainingReducer.postedMessage,
    deletedMessage: state.courseTrainingReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCourseTraining,
      getAllCourseTrainingType,
      deleteCourseTraining,
      updateCourseTraining,
      postCourseTraining,
      searchCourseTraining,
      uploadFile,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(CourseTraining);
