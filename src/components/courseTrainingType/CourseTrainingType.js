import React, { Component } from "react";
import { Table, Button, Form, Col, FormControl, Row } from "react-bootstrap";
import {
  getCourseTrainingType,
  deleteCourseTrainingType,
  postCourseTrainingType,
  updateCourseTrainingType,
  searchCourseTrainingType,
} from "../../redux/Actions/admin/courseTrainingTypeAction/CourseTrainingTypeAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";

class CourseTrainingType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      nameError: "",
      isUpdate: false,
      activePage: 1,
      perPage: 5,
      condition: true,
    };
  }
  componentWillMount() {
    this.props.getCourseTrainingType(this.state.activePage);
  }

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getCourseTrainingType(this.state.activePage);
    });
  }

  //TODO: This function is created to get data from input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to add new and update data
  onHandleSubmit = async (e) => {

    e.preventDefault();

    if (!this.state.isUpdate) {

      let courseTrainingType = {
        name: this.state.name,
      };

      await this.props.postCourseTrainingType(courseTrainingType);
    } else {

      let id = this.state.id;
      let courseTrainingType = {
        name: this.state.name,
      };
      await this.props.updateCourseTrainingType(id, courseTrainingType);
    }

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.props.getCourseTrainingType(this.state.activePage);

      this.setState({
        id: 0,
        name: "",
        isUpdate: false,
      });

    } else {

      let errors = this.props.postedMessage.error.map((err) => {
        return "\n\n" + err.message;
      });
      swal("Error", this.props.postedMessage.message.concat(errors), "error");
    }

    this.setState({
      id: 0,
      name: "",
      isUpdate: false,
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

        this.props.deleteCourseTrainingType(id);

        if (this.props.courseTrainingType.length <= 1) {

          this.props.getCourseTrainingType(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    this.setState({
      id: 0,
      name: "",
      isUpdate: false,
    });
  };

  //TODO: This function is created to get data to update
  handleUpdate = (id, name) => {

    this.setState({
      id: id,
      name: name,
      isUpdate: true,
      condition: false,
    });
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchCourseTrainingType(target.value);
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const myData = this.props.courseTrainingType.map((data) => (
      <tbody key={data.id} style={{ textAlign: "center" }}>
        <tr className="rowTable">
          <td style={{ verticalAlign: "middle" }}>{data.id}</td>
          <td style={{ verticalAlign: "middle" }}>{data.name}</td>
          <td style={{ textAlign: "center" }}>
            <Button
              className="btn-edit mr-1"
              variant="warning"
              onClick={(id, name) => this.handleUpdate(data.id, data.name)}
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
                <h4 className="m-0 text-dark" onClick={this.handleClick} style={{ cursor: 'pointer' }}>Insert Course Training Type</h4>
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
                      <label for="inputEmail3" className="col-sm-3 col-form-label">Name of Course Training Type</label>
                      <div className="col-sm-6">
                        <Form.Control
                          type="text"
                          placeholder="input name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className='col-md-3'>
                        <Button
                          className="btn-add"
                          variant="primary"
                          type="submit"
                        >
                          {this.state.isUpdate ? 'UPDATE' : 'ADD NEW'}
                        </Button>
                      </div>
                    </div>
                  </div>


                </Form>
              </div>

            </div>

            <hr style={{ borderWidth: "3px", marginTop: 0 }}></hr>

            <h4 className="my-3 text-dark">List of Course Training Types</h4>
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    {myData}
                  </Table>
                  <div style={{ marginLeft: "35%", zIndex: -1 }}>
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
    courseTrainingType: state.courseTrainingTypeReducer.courseTrainingType,
    totalRecord: state.courseTrainingTypeReducer.totalRecord,
    loading: state.courseTrainingTypeReducer.loading,
    postedMessage: state.courseTrainingTypeReducer.postedMessage,
    deletedMessage: state.courseTrainingTypeReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCourseTrainingType,
      deleteCourseTrainingType,
      postCourseTrainingType,
      updateCourseTrainingType,
      searchCourseTrainingType,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(CourseTrainingType);
