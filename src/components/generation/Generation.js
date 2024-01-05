import React, { Component } from "react";
import "./Generation.css";
import { Table, Button, Form, Col, FormControl, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getGeneration,
  deleteGeneration,
  postGeneration,
  updateGeneration,
  searchGeneration,
} from "../../redux/Actions/admin/generationActions/GenerationAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import { scrollToTop } from "../helpers/scrollTop";

class Generation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      startYear: "",
      endYear: "",

      isUpdate: false,
      perPage: 5,
      activePage: 1,
      condition: true,
    };
  }

  componentWillMount() {
    this.props.getGeneration(this.state.activePage);
  }

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getGeneration(this.state.activePage);
    });
  }

  //TODO: This function is created to get data form input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to content state to an object
  generationRequest = () => {

    const generationRequest = {
      name: this.state.name,
      startYear: this.state.startYear,
      endYear: this.state.endYear,
    };
    return generationRequest;
  };

  //TODO: This function is created to clear state
  handleClear = () => {

    this.setState({
      name: "",
      startYear: "",
      endYear: "",
      isUpdate: false,
    });
  };

  //TODO: This function is created to add new & update data
  handleSubmit = async (e) => {

    e.preventDefault();
    let generationRequest = this.generationRequest();

    if (!this.state.isUpdate) {

      const generationReq = {
        ...generationRequest,
      };
      await this.props.postGeneration(generationReq);

    } else {


      let id = this.state.id;
      const generationReq = {
        ...generationRequest,
      };

      await this.props.updateGeneration(id, generationReq);
    }

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.props.getGeneration(this.state.activePage);
      this.handleClear();

    } else {

      let errors = this.props.postedMessage.error.map((err) => {
        return "\n\n" + err.message;
      });
      swal("Error", this.props.postedMessage.message.concat(errors), "error");
    }
  };

  //TODO: This function is created to get data to update state
  handleUpdate = (id, name, startYear, endYear) => {

    this.setState({
      id: id,
      name: name,
      startYear: startYear,
      endYear: endYear,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
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

        this.props.deleteGeneration(id);

        if (this.props.generation.length <= 1) {

          this.props.getGeneration(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    this.handleClear();
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchGeneration(target.value);
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const myData = this.props.generation.map((data) => (
      <tbody key={data.id} style={{ textAlign: "center" }}>
        <tr className="rowTable">
          <td style={{ verticalAlign: "middle" }}>{data.id}</td>
          <td style={{ verticalAlign: "middle" }}>{data.name}</td>
          <td style={{ verticalAlign: "middle" }}>{data.startYear}</td>
          <td style={{ verticalAlign: "middle" }}>{data.endYear}</td>
          <td style={{ textAlign: "center" }}>

            <Button
              className="btn-edit mr-1"
              variant="warning"
              onClick={(id, name, startYear, endYear) =>
                this.handleUpdate(
                  data.id,
                  data.name,
                  data.startYear,
                  data.endYear
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
                <h4 className="m-0 text-dark" onClick={this.handleClick} style={{ cursor: 'pointer' }}>Insert Generation</h4>
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
                      <label for="inputEmail3" className="col-sm-3 col-form-label">Name of Generation</label>
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

                    <div className="form-group row w-100">
                      <label for="inputEmail3" className="col-sm-3 col-form-label">Start Year</label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="number"
                          placeholder="input start year"
                          name="startYear"
                          value={this.state.startYear}
                          onChange={this.handleChange}
                        />
                        <small className="text-danger">
                          {this.state.startYearError}
                        </small>
                      </div>

                    </div>

                    <div className="form-group row w-100">
                      <label for="inputEmail3" className="col-sm-3 col-form-label">End Year</label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="number"
                          placeholder="input end year"
                          name="endYear"
                          value={this.state.endYear}
                          onChange={this.handleChange}
                        />
                        <small className="text-danger">
                          {this.state.endYearError}
                        </small>
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
            <h4 className="my-3 text-dark">List of Generations</h4>
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
                        <th className="th-style">#</th>
                        <th className="th-style">Name</th>
                        <th className="th-style">Start Year</th>
                        <th className="th-style">End Year</th>
                        <th className="th-style">Action</th>
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
    generation: state.generationReducer.generation,
    totalRecord: state.generationReducer.totalRecord,
    loading: state.generationReducer.loading,
    postedMessage: state.generationReducer.postedMessage,
    deletedMessage: state.generationReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getGeneration,
      deleteGeneration,
      postGeneration,
      updateGeneration,
      searchGeneration,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(Generation);
