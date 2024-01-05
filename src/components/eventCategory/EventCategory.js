import React, { Component } from "react";
import { Table, Button, Form, Col, FormControl, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { bindActionCreators } from "redux";
import { getAllCourseTrainingType } from "../../redux/Actions/admin/courseTrainingTypeAction/CourseTrainingTypeAction";
import swal from "sweetalert";
import Swal from "sweetalert2";
import "./EventCategory.css";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import {
  getEventCategory,
  addEventCategory,
  deleteEventCategory,
  updateEventCategory,
  searchEventCategory,
} from "../../redux/Actions/admin/eventCategoryActions/EventCategoryActions";
import Loading from "../Loading/Loading";
import { scrollToTop } from "../helpers/scrollTop";
class EventCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",

      courseTrainingTypeId: 0,
      perPage: 5,
      activePage: 1,
      isUpdate: false,
      condition: true,
    };
  }

  componentWillMount() {
    this.props.getEventCategory(this.state.activePage);
    this.props.getAllCourseTrainingType();
  }

  //TODO: This function is created to clear data from input form
  handleClear = () => {

    this.setState({
      id: 0,
      name: "",
      courseTrainingTypeId: 0,
      isUpdate: false,
    });
  };

  //TODO: This function is created to select an image to upload
  handleSelect = (event) => {

    let id = event.target.value;
    this.setState({
      courseTrainingTypeId: id,
    });
  };

  //TODO: This function is created to hanlde data change of inputs
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to create request object
  eventCategoriesRequest = () => {

    const eventCategoriesRequest = {
      name: this.state.name,
      courseTrainingTypeId: {
        id: this.state.courseTrainingTypeId,
      },
    };
    return eventCategoriesRequest;
  };

  //TODO: This function is created to handle submit data
  handleSubmit = async (e) => {

    e.preventDefault();

    let eventCategoriesRequest = this.eventCategoriesRequest();

    if (this.state.isUpdate) {

      let id = this.state.id;
      const eventCategoriesReq = {
        ...eventCategoriesRequest,
      };

      await this.props.updateEventCategory(id, eventCategoriesReq, (res) => {
        swal("success", res, "success");
      });

      this.setState({
        id: 0,
        name: "",
        isUpdate: false,
      });
    } else {

      const eventCategoriesReq = {
        ...eventCategoriesRequest,
      };
      await this.props.addEventCategory(eventCategoriesReq);
    }

    let errors = null;

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.props.getEventCategory(this.state.activePage);
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

  //TODO: This function is created to handle delete data
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

        this.props.deleteEventCategory(id);

        if (this.props.data.length <= 1) {
          this.props.getEventCategory(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    this.setState({
      name: "",
    });
  };

  //TODO: This function is created to get data from input form
  handleEdit = (id, name, courseTrainingTypeId) => {

    this.setState({
      id: id,
      name: name,
      courseTrainingTypeId: courseTrainingTypeId,
      isUpdate: true,
      condition: false,
    });
  };

  //TODO: This function is created to hanlde page change
  handlePageChange = (pageNumber) => {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getEventCategory(this.state.activePage);
    });
  };

  //TODO: This function is created to handle searching data
  handleSearch = ({ target }) => {
    this.props.searchEventCategory(target.value);
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const tableData = this.props.data.map((data) => {
      return (
        <tbody key={data.id} style={{ textAlign: "center" }}>
          <tr>
            <td style={{ verticalAlign: "middle" }}>{data.id}</td>
            <td style={{ verticalAlign: "middle" }}>{data.name}</td>
            <td style={{ verticalAlign: "middle" }}>
              {data.courseTrainingTypeId.name}
            </td>
            <td className="text-center" style={{ verticalAlign: "middle" }}>
              <div className="text-center">
                <Button
                  variant="warning"
                  className="btn-edit mr-1"
                  onClick={(id, name, courseTrainingTypeId) => {
                    this.handleEdit(
                      data.id,
                      data.name,
                      data.courseTrainingTypeId.id
                    );
                    scrollToTop.scroll();
                  }}
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
              </div>
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
                <h4 className="m-0 text-dark" onClick={this.handleClick} style={{ cursor: 'pointer' }}>Insert Event Category</h4>
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
                    <div className="form-group row w-100">
                      <label for="inputEmail3" className="col-sm-3 col-form-label">Name of Event type</label>
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

                    <div className="form-group row w-100">
                      <label for="inputEmail3" className="col-sm-3 col-form-label">Type of Course</label>
                      <div className="col-sm-9">
                        <Form.Control as="select" onChange={this.handleSelect}>
                          <option value={0}>
                            Select course training type...
                        </option>
                          {this.props.courseTrainingType.map((d) => {
                            return (
                              <option key={d.id} value={d.id}>
                                {d.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </div>

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

            <hr style={{ borderWidth: "3px", marginTop: 0 }}></hr>
            <h4 className="my-3 text-dark">List of Event Categories</h4>
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
                        <th>Course Training Type</th>
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
    data: state.EventCategoryReducer.data,
    del: state.EventCategoryReducer.del,
    courseTrainingType: state.courseTrainingTypeReducer.courseTrainingType,
    totalRecord: state.EventCategoryReducer.totalRecord,
    loading: state.EventCategoryReducer.loading,
    postedMessage: state.EventCategoryReducer.postedMessage,
    deletedMessage: state.EventCategoryReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getEventCategory,
      addEventCategory,
      deleteEventCategory,
      updateEventCategory,
      getAllCourseTrainingType,
      searchEventCategory,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionToProps)(EventCategory);
