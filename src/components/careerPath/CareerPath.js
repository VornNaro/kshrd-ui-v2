import React, { Component } from "react";
import {
  Table,
  Button,
  Form,
  Col,
  Image,
  FormControl,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getCareerPath,
  deleteCareerPath,
  postCareerPath,
  updateCareerPath,
  searchCareerPath,
} from "../../redux/Actions/admin/careerPathActions/CareerPathAction";
import "./CareerPath.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swal from "sweetalert";
import { uploadFile } from "../../redux/Actions/admin/fileUploadActions/fileUploadActions";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import { scrollToTop } from "../helpers/scrollTop";

class CareerPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parent_id: 0,
      title: "",
      description: "",
      detail: "",
      photo: "",
      isUpdate: false,

      imageUrl: "",
      fileImage: "",
      activePage: 1,
      perPage: 5,
      condition: true,
    };
  }
  componentWillMount() {
    this.props.getCareerPath(this.state.activePage);
  }
  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getCareerPath(this.state.activePage);
    });
  }

  //TODO: This function is created to get data from input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to content the state to an object
  careerPathRequest = () => {

    const careerPathRequest = {
      parent_id: this.state.parent_id,
      title: this.state.title,
      description: this.state.description,
      detail: this.state.detail,
      photo: this.state.photo,
    };
    return careerPathRequest;
  };

  //TODO: This function is created to select an image to upload
  handleChangeImage = ({ target }) => {

    if (target.files[0] != null) {

      const file = target.files[0];
      this.setState({ fileImage: file });

      const fileReader = new FileReader();

      fileReader.addEventListener("load", (e) => {
        this.setState({
          imageUrl: e.target.result,
        });
      });
      fileReader.readAsDataURL(file);
    }
  };

  //TODO: This function is created to clear state
  handleClear = () => {

    this.setState({
      id: 0,
      parent_id: 0,
      title: "",
      description: "",
      detail: "",
      photo: "",
      imageUrl: "",
      fileImage: "",
      isUpdate: false,
    });
  };

  //TODO: This function is created to add new & update data
  handleSubmit = async (e) => {

    e.preventDefault();
    let careerPathRequest = this.careerPathRequest();

    if (!this.state.isUpdate) {

      const formData = new FormData();
      formData.append(`files`, this.state.fileImage);

      await this.props.uploadFile(formData);
      const photo = this.props.imageUrlRes;

      const careerPathReq = {
        ...careerPathRequest,
        photo,
      };

      await this.props.postCareerPath(careerPathReq);

    } else {


      let id = this.state.id;

      if (this.state.fileImage) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);
        const photo = this.props.imageUrlRes;

        const careerPathReq = {
          ...careerPathRequest,
          photo,
        };
        await this.props.updateCareerPath(id, careerPathReq);

      } else {

        let careerPathRequest = this.careerPathRequest();
        const careerPathReq = {
          ...careerPathRequest,
        };
        await this.props.updateCareerPath(id, careerPathReq);
      }
    }

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.props.getCareerPath(this.state.activePage);
      this.handleClear();

    } else {
      let errors = this.props.postedMessage.error.map((err) => {
        return "\n\n" + err.message;
      });
      swal("Error", this.props.postedMessage.message.concat(errors), "error");
    }
  };

  //TODO: This function is created to get data to update
  handleUpdate = (id, parent_id, title, description, detail, photo) => {

    this.setState({
      id: id,
      parent_id: parent_id,
      title: title,
      description: description,
      detail: detail,
      photo: photo,
      imageUrl: photo,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
  };

  //TODO: This function is created to select the option of parent menu in careerPath
  handleSelect = (event) => {
    let id = event.target.value;
    this.setState({
      parent_id: id,
    });
  };

  //TODO: This function is created to delete data
  handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",

    }).then((result) => {

      if (result.value) {

        this.props.deleteCareerPath(id);

        if (this.props.careerPath.length <= 1) {
          this.props.getCareerPath(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    this.handleClear();
  };

  //TODO: This function is created to search data by name
  handleOnSearch = ({ target }) => {
    this.props.searchCareerPath(target.value);
  };

  //TODO: This function is created to view data
  handleView = (data) => {
    console.log('data', data);
    Swal.fire({
      width: 1000,
      imageUrl:
        data.photo ||
        "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png",
      imageWidth: '100%',
      imageAlt: data.title,
      html: `
      <p>${data.title}</p>
      <div class="career-path-desc-title py-4">
        <span class="pr-2" style="font-size: 1.2em; font-weight: 600;">DESCRIPTION</span>
        <div class="career-path-line"></div>
      </div>
      <p class='text-left'>${data.description}</p>
      <div class="career-path-desc-title py-4">
        <span class="pr-2" style="font-size: 1.2em; font-weight: 600;">DETAIL</span>
        <div class="career-path-line"></div>
      </div>
      <p class='text-left'>${data.detail}</p>
      `
    });
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  }

  render() {
    const myData = this.props.careerPath.map((data) => (
      <tr className="rowTable" key={data.id}>
        <td style={{ width: "3%", verticalAlign: "middle" }}>{data.id}</td>
        <td style={{ width: "20%", verticalAlign: "middle" }}>{data.title}</td>
        <td
          style={{ width: "15%", verticalAlign: "middle" }}
          className="textOverFlow"
        >
          {data.description}
        </td>
        <td
          style={{ width: "20%", verticalAlign: "middle" }}
          className="textOverFlow"
        >
          {data.detail}
        </td>
        <td
          style={{
            width: "20%",
            verticalAlign: "middle",
            textAlign: "center",
          }}
        >
          <Image
            src={
              data.photo ||
              "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png"
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png";
            }}
            width="50%"
            style={{ maxHeight: "100px", maxWidth: "100px" }}
          />
        </td>
        <td
          style={{
            textAlign: "center",
            width: "20%",
            verticalAlign: "middle",
          }}
        >
          <Button
            className="btn-view mr-1"
            variant="info"
            onClick={() =>
              this.handleView(
                data,
              )
            }
          >
            View
          </Button>
          <Button
            className="btn-edit mr-1"
            variant="warning"
            onClick={(id, parent_id, title, description, detail, photo) =>
              this.handleUpdate(
                data.id,
                data.parent_id,
                data.title,
                data.description,
                data.detail,
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
                  Insert CareerPath
                </h4>
              </div>
            </div>
          </div>
        </div>

        <section id="career-path-top" className="content">
          <div className="container-fluid">

            <div className={this.state.condition ? 'd-none form-horizontal' : 'd-flex'}>
              <div className="card card-info w-100">

                <Form onSubmit={this.handleSubmit} className='form-horizontal'
                >
                  {/* <form className="form-horizontal"> */}
                  <div className="card-body row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-3 col-form-label">Parent Menu</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="select"
                            name="parent_id"
                            value={this.state.parent_id}
                            onChange={this.handleSelect}
                          >
                            <option value={0}>Select parent </option>
                            {this.props.careerPath.map((d) => {
                              return (
                                <option key={d.id} value={d.id}>
                                  {d.title}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Title of CareerPath</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="input workplace"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <Form.Control
                            className='mt-0'
                            style={{ resize: "none" }}
                            as="textarea"
                            rows="4"
                            placeholder="input description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Detail of CareerPath</label>
                        <div className="col-sm-9">
                          <Form.Control
                            className='mt-0'
                            style={{ resize: "none" }}
                            as="textarea"
                            rows="4"
                            placeholder="input detail"
                            name="detail"
                            value={this.state.detail}
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
                          className='mt-3'
                          id="file-image"
                          label="Custom file input"
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



            <hr style={{ borderWidth: "2px", marginTop: 0 }}></hr>
            <h4 className="mb-3 text-dark">List of CareerPath</h4>
            <div className='card px-3'>
              <div className="row mt-3">
                <div className="col-md-3">
                  <FormControl
                    type="text"
                    placeholder="Search by title"
                    className="mr-sm-2"
                    onChange={this.handleOnSearch}
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
              {(!(this.props.loading && !this.props.uploadLoading)) && (
                <div>

                  <Table hover responsive className="mt-4">
                    <thead style={{ textAlign: "center", background: "#FFF" }}>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Detail</th>
                        <th>Photo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">{myData}</tbody>
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
    careerPath: state.careerPathReducer.careerPath,
    del: state.alumniReducer.del,
    imageUrlRes: state.fileUploadReducer.imageUrl,
    totalRecord: state.careerPathReducer.totalRecord,
    loading: state.careerPathReducer.loading,
    uploadLoading: state.fileUploadReducer.uploadLoading,
    postedMessage: state.careerPathReducer.postedMessage,
    deletedMessage: state.careerPathReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCareerPath,
      deleteCareerPath,
      postCareerPath,
      uploadFile,
      updateCareerPath,
      searchCareerPath,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(CareerPath);
