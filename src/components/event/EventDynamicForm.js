import React, { Component } from "react";
import {
  getEvent,
  postEvent,
  updateEvent,
  deleteEvent,
  searchEvent
} from "../../redux/Actions/admin/eventActions/EventActions";
import "./Event.css";
import {
  Button,
  Form,
  Col,
  Table,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import { getAllEventCategory } from "../../redux/Actions/admin/eventCategoryActions/EventCategoryActions";
import { getAllGeneration } from "../../redux/Actions/admin/generationActions/GenerationAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  uploadFile,
  uploadFileCallback,
} from "../../redux/Actions/admin/fileUploadActions/fileUploadActions";
import { scrollToTop } from "../helpers/scrollTop";
class EventDynamicForm extends Component {
  state = {
    eventDescription: [{ image: "", description: "" }],

    name: "",
    category: 0,
    generation: 0,
    imageUrl: "",
    fileImage: "",
    activePage: 1,
    perPage: 5,
    arrayUrl: [],
    isUpdate: false,
    condition: true,
  };

  //TODO: This function is created to clear state
  handleClear = () => {

    this.setState({
      eventDescription: [{ image: "", description: "" }],
      name: "",
      category: 0,
      generation: 0,
      imageUrl: "",
      fileImage: "",
      arrayUrl: [],
      isUpdate: false,
    });
  };

  //TODO: This function is created to fetch data
  fetchData = async () => {

    this.props.getEvent(this.state.activePage);
    await this.props.getAllEventCategory();
    await this.props.getAllGeneration();
  };

  componentWillMount() {
    this.fetchData();
  }

  //TODO: This function is created to get option of event category
  handleSelect = (event) => {

    let id = event.target.value;
    this.setState({
      category: id,
    });
  };

  //TODO: This function is created to get option of generation
  handleSelectGeneration = (event) => {

    let id = event.target.value;
    this.setState({
      generation: id,
    });
  };

  //TODO: This function is created to content state to an object
  eventRequest = () => {

    const eventRequest = {
      name: this.state.name,
      eventDescription: this.state.eventDescription,
      video: "string",
      category: {
        id: this.state.category,
      },
      generation: {
        id: this.state.generation,
      },
    };

    return eventRequest;
  };

  //TODO: This function is created to get data from input form
  handleChange = (e) => {

    if (["image", "description"].includes(e.target.className)) {

      let eventDescription = [...this.state.eventDescription];

      eventDescription[e.target.dataset.id][e.target.className] =
        e.target.value;

      this.setState({ eventDescription });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  //TODO: This function is created to add new state of event description
  addEventDescription = (e) => {

    this.setState((prevState) => ({
      eventDescription: [
        ...prevState.eventDescription,
        { image: "", description: "" },
      ],
    }));
  };

  //TODO: This function is created to remove an form of event description
  removeEventDescription = (id) => {

    const newEvenDescription = [...this.state.eventDescription];
    newEvenDescription.splice(id, 1);
    this.setState({ eventDescription: newEvenDescription });
  };

  //TODO: This function is created to select an image to upload
  handleChangeImage = async (e) => {

    if (["image", "custom-file-input"].includes(e.target.dataset.name)) {
      let eventDescription = [...this.state.eventDescription];

      const file = e.target.files[0];

      const formData = new FormData();

      formData.append(`files`, file);

      let targetId = e.target.dataset.id;
      let targetName = e.target.dataset.name;

      await this.props.uploadFileCallback(formData, (res) => {
        eventDescription[targetId][targetName] = res;
      });

      this.setState({ eventDescription });
    }
  };

  //TODO: This function is created to add new and update data
  handleSubmit = async (e) => {

    e.preventDefault();

    if (!this.state.isUpdate) {

      let eventRequest = this.eventRequest();

      await this.props.postEvent(eventRequest);
    } else {

      let id = this.state.id;
      let eventRequest = this.eventRequest();
      await this.props.updateEvent(id, eventRequest);
    }

    let errors = null;

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.fetchData();
      this.handleClear();

    } else {

      if (this.props.postedMessage.error != null) {
        errors = this.props.postedMessage.error.map((err) => {
          return "\n\n" + err.message;
        });
      } else {
        errors = "";
      }
      swal("Error", this.props.postedMessage.message.concat(errors), "error");
    }
  };

  //TODO: This function is created to view data
  handleView = (id, name, categoryName, generationName, courseTrainingType) => {
    Swal.fire({
      html: `<div style="text-align:left;margin-top:40px"><p>Name: ${name}</p><p>Category: ${categoryName}</p><p>Generation: ${generationName}</p><p>CourseTraining: ${courseTrainingType}</p></div>`,
    });
  };

  //TODO: This function is created to delete data
  handleDelete = (id) => {

    Swal.fire({

      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",

    }).then((result) => {

      if (result.value) {

        this.props.deleteEvent(id);

        if (this.props.data.length <= 1) {
          this.props.getEvent(this.state.activePage - 1);
        } else {
          this.fetchData();
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    this.handleClear();
  };

  //TODO: This function is created to get data to update
  handleUpdate = (id, eventDescription, name, category, generation) => {

    this.setState({
      id: id,
      eventDescription: eventDescription,
      name: name,
      category: category,
      generation: generation,
      imageUrl: eventDescription.image,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
  };

  //TODO: This function is created to change page number of pagination
  handlePageChange = (pageNumber) => {

    this.setState({ activePage: pageNumber }, () => {
      this.fetchData();
    });
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchEvent(target.value);
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const category = this.props.category.map((data, index) => {
      return (
        <option key={index} value={data.id}>
          {data.name} ({data.courseTrainingTypeId.name})
        </option>
      );
    });

    const generation = this.props.generation.map((data, index) => {
      return (
        <option key={index} value={data.id}>
          {data.name}
        </option>
      );
    });

    const tableData = this.props.data.map((data) => {
      return (
        <tbody key={data.id} style={{ textAlign: "center" }}>
          <tr>
            <td style={{ verticalAlign: "middle" }}>{data.id}</td>
            <td style={{ verticalAlign: "middle" }}>{data.name}</td>
            <td style={{ verticalAlign: "middle" }}>{data.category.name}</td>
            <td style={{ verticalAlign: "middle" }}>{data.generation.name}</td>
            <td style={{ verticalAlign: "middle" }}>
              {data.category.courseTrainingTypeId.name}
            </td>
            <td className="text-center" style={{ verticalAlign: "middle", display: 'flex' }}>
              <Button
                className="btn-view mr-1"
                variant="info"
                onClick={(
                  id,
                  name,
                  eventDescription,
                  categoryName,
                  generationName,
                  courseTrainingType
                ) =>
                  this.handleView(
                    data.id,
                    data.name,
                    data.category.name,
                    data.generation.name,
                    data.category.courseTrainingTypeId.name
                  )
                }
              >
                View
              </Button>

              <Button
                variant="warning"
                className="btn-edit mr-1"
                onClick={(id, eventDescription, name, category, generation) =>
                  this.handleUpdate(
                    data.id,
                    data.eventDescription,
                    data.name,
                    data.category.id,
                    data.generation.id
                  )
                }
              >
                Edit
              </Button>

              <Button
                className="btn-delete mr-1"
                variant="danger"
                value={data.id}
                onClick={(id) => this.handleDelete(data.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });

    let { name, eventDescription } = this.state;
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h4 className="m-0 text-dark" onClick={this.handleClick} style={{ cursor: 'pointer' }}>Insert Event</h4>
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
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Name of Event</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input name"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Event Category</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="select"
                            name="category"
                            onChange={this.handleSelect}
                          >
                            <option value={0}>Select event category...</option>
                            {category}
                          </Form.Control>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Generation</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="select"
                            name="category"
                            onChange={this.handleSelectGeneration}
                          >
                            <option value={0}>Select generation...</option>
                            {generation}
                          </Form.Control>
                        </div>
                      </div>

                    </div>

                    {eventDescription.map((val, idx) => {
                      let imgId = `image-${idx}`,
                        descriptionId = `description-${idx}`;
                      return (
                        <Row className='m-0 w-100'>
                          <Col key={idx} md={12}>
                            <Row style={{
                              border: '1px solid #eee',
                              padding: '15px',
                              position: 'relative'
                            }}>
                              <label htmlFor={descriptionId} className="col-sm-2 col-form-label">{`Description ${idx + 1
                                }`}</label>
                              <div className="col-sm-6">
                                {/* <Form.Control
                                  placeholder="input description"
                                name={descriptionId}
                                data-id={idx}
                                id={descriptionId}
                                value={eventDescription[idx].description}
                                onChange={this.handleChange}
                                className="description"
                                /> */}
                                <textarea
                                  type="text"
                                  placeholder="input description"
                                  name={descriptionId}
                                  data-id={idx}
                                  id={descriptionId}
                                  value={eventDescription[idx].description}
                                  onChange={this.handleChange}
                                  className="description"
                                  style={{
                                    width: '100%',
                                    marginTop: 0,
                                    border: '1px solid #ced4d9',
                                    boxShadow: 'none',
                                    borderRadius: '5px',
                                    padding: '3px 10px'
                                  }} />
                              </div>
                              <Col md={3}>
                                <img
                                  src={
                                    this.state.eventDescription[idx].image ||
                                    "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
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
                                    style={{ marginTop: "2%" }}
                                    label="input image"
                                    name={imgId}
                                    data-id={idx}
                                    id={imgId}
                                    custom
                                    data-name="image"
                                    accept="image/*"
                                    onChange={this.handleChangeImage}
                                  />
                                </Form.Group>
                                <span
                                  onClick={() => this.removeEventDescription(idx)}
                                  style={{
                                    cursor: 'pointer',
                                    top: 0,
                                    position: 'absolute',
                                    right: '-35%'
                                  }}
                                >
                                  ❌
                          </span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                      );
                    })}
                    <div className='col-md-12'>
                      <Button
                        variant="info"
                        onClick={this.addEventDescription}
                        style={{ height: "40px", borderRadius: 0 }}
                      >
                        New event category
                      </Button>
                    </div>
                  </div>
                  <div className='col-md-12'>
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


            <hr style={{ borderWidth: "2px", marginTop: 0 }}></hr>
            <h4 className="my-3 text-dark">List of Events</h4>
            <div className='card px-3'>
              <div className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <FormControl
                      type="text"
                      placeholder="Search by name"
                      className="mr-sm-2"
                      onChange={this.handleSearch}
                    />
                  </div>
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
                  <Table hover responsive className="mt-4">
                    <thead style={{ textAlign: "center", background: "#FFF" }}>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Generation</th>
                        <th>Course</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {tableData}
                  </Table>

                  <div style={{ marginLeft: "35%" }}>
                    <Pagination
                      prevPageText="prev"
                      nextPageText="next"
                      firstPageText="first"
                      lastPageText="last"
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.perPage}
                      totalItemsCount={this.props.totalRecord}
                      onChange={this.handlePageChange}
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
    data: state.EventReducer.data,
    category: state.EventCategoryReducer.data,
    generation: state.generationReducer.generation,
    deletedMessage: state.EventReducer.deletedMessage,
    loading: state.EventReducer.loading,
    uploadLoading: state.fileUploadReducer.uploadLoading,
    totalRecord: state.EventReducer.totalRecord,
    postedMessage: state.EventReducer.postedMessage,
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getEvent,
      postEvent,
      updateEvent,
      deleteEvent,
      getAllEventCategory,
      getAllGeneration,
      uploadFile,
      uploadFileCallback,
      searchEvent
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionToProps)(EventDynamicForm);
