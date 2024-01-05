import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { sanitizeHtml } from "sanitize-html";
import draftToHtml from "draftjs-to-html";
import { uploadFile } from "../../redux/Actions/admin/fileUploadActions/fileUploadActions";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Announcement.css";

import {
  Button,
  Form,
  Table,
  Image,
  FormControl,
  Col,
} from "react-bootstrap";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  searchAnnouncement,
} from "../../redux/Actions/admin/announcementActions/AnnouncementActions";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import { scrollToTop } from "../helpers/scrollTop";
import axiosInstance from "../../components/helpers/axios";
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      dataHtml: "",
      dataArr: [],
      isUpdate: false,
      id: 0,
      title: "",
      description: "",
      thumbnail: "",
      imageUrl: "",
      fileImage: "",
      activePage: 1,
      perPage: 5,
      condition: true,
    };
  }

  componentWillMount() {
    this.props.getAnnouncements(this.state.activePage);
  }

  //TODO: This function is created to delete data
  handleDeleteAnnouncement = (id) => {

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

        this.props.deleteAnnouncement(id);

        if (this.props.data.length <= 1) {
          this.props.getAnnouncements(this.state.activePage - 1);
        } else {
          this.componentWillMount();
        }

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    this.handleClear();
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

  //TODO: This function is created to content state to an object
  announcementRequest = () => {

    const announcementRequest = {
      title: this.state.title,
      description: this.state.description,
      thumbnail: this.state.thumbnail,
      content: this.state.dataHtml,
      date: Date.now(),
    };
    return announcementRequest;
  };

  handleClear = () => {
    this.setState({
      id: 0,
      title: "",
      description: "",
      thumbnail: "",
      content: "",
      imageUrl: "",
      isUpdate: false,
    });
  };

  //TODO: This function is created to add new and update data
  handleAddAnnouncement = async (e) => {

    e.preventDefault();
    let announcementRequest = this.announcementRequest();

    if (!this.state.isUpdate) {

      if (this.state.fileImage) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);
        const thumbnail = this.props.imageUrlRes;

        const announcementReq = {
          ...announcementRequest,
          thumbnail,
        };

        await this.props.addAnnouncement(announcementReq);
      } else {
        await this.props.addAnnouncement(announcementRequest);
      }
    } else {

      e.preventDefault();
      let id = this.state.id;

      if (this.state.fileImage) {

        const formData = new FormData();
        formData.append(`files`, this.state.fileImage);

        await this.props.uploadFile(formData);
        const thumbnail = this.props.imageUrlRes;

        const announcementReq = {
          ...announcementRequest,
          thumbnail,
        };

        await this.props.updateAnnouncement(id, announcementReq);
      } else {
        let announcementRequest = this.announcementRequest();
        const announcementReq = {
          ...announcementRequest,
        };

        await this.props.updateAnnouncement(id, announcementReq);
      }
    }

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.props.getAnnouncements(this.state.activePage);
      this.handleClear();
    } else {
      let errors = this.props.postedMessage.error.map((err) => {
        return "\n\n" + err.message;
      });

      swal("Error", this.props.postedMessage.message.concat(errors), "error");
    }

    this.setState({
      editorState: EditorState.createEmpty(),
    });
  };

  //TODO: This function is created to get data for update
  handleUpdate = (id, title, description, thumbnail, content) => {

    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(content))
      ),
      id: id,
      title: title,
      description: description,
      dataHtml: content,
      thumbnail: thumbnail,
      imageUrl: thumbnail,
      isUpdate: true,
      condition: false,
    });
    scrollToTop.scroll();
  };

  //TODO: This function is created to get data from edtior
  onEditorStateChange = (editorState) => {
    this.setState(
      {
        editorState,
        dataHtml: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      },
      () => {
        this.splitContent();
      }
    );
  };

  //TODO: This function is created to get an image from editor
  uploadImageCallBack = async (file) => {

    const form = new FormData();
    form.append("files", file);

    return axiosInstance
      .getToken()
      .post(`/uploads`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return {
          data: {
            link: response.data.file1,
          },
        };
      })
      .catch((error) => {

      });
  };

  //TODO: This function is created to split the content from edtior
  splitContent = () => {

    const content = this.state.dataHtml;
    var dataSlipt = content.split(/\n/);
    this.setState({
      dataArr: [...dataSlipt],
    });
  };

  //TODO: This function is created to clean html editor string
  cleanHtmlString = (html) => {
    var clean = sanitizeHtml(html, {
      allowedTags: ["br", "div"],
    });
    var cleanHtml = clean
      .replace(/<br \/>/g, "\n")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

    return cleanHtml;
  };

  //TODO: This function is created to get data from input form
  handleChange = (id, content) => {
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(content))
      ),
      isUpdate: true,
      id: id,
    });
  };

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      this.props.getAnnouncements(this.state.activePage);
    });
  }

  handleTitleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to view data
  handleView = (data) => {
    console.log('data', data);
    Swal.fire({
      width: '80%',
      imageUrl:
        data.thumbnail ||
        "https://i0.wp.com/autohub.de/wp-content/uploads/2019/08/placeholder.png",
      imageWidth: "100%",
      imageHeight: "auto",
      imageAlt: data.title,
      html: `
      <h2 style="font-size: 24px; font-family: &quot;khmer os Battambang&quot;; font-weight: 600; line-height: 2.5rem;">${data.title}</h2>
      <p style='font-size:15px'>${data.description}</p>
      <div class='text-left'>${data.content}</div>
      <div class="card-text m-0 py-2">
        <p class="text-muted d-flex align-items-center">
          <img class="pr-1" src="/static/media/clock.f591558c.svg" alt="clock"/>${moment(data.date).format("LL")}
          </p>
      </div>
      `
    });
  };

  //TODO: This function is created to search data by name
  handleSearch = ({ target }) => {
    this.props.searchAnnouncement(target.value);
  };

  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  };

  render() {
    const tableData = this.props.data.map((data) => {
      return (
        <tr>
          <td style={{ width: "3%", verticalAlign: "middle" }}>{data.id}</td>
          <td
            style={{ width: "10%", verticalAlign: "middle" }}
            className="contentOverflow"
          >
            {data.title}
          </td>
          <td style={{ width: "10%", verticalAlign: "middle" }}>
            <Image
              src={data.thumbnail}
              style={{ maxHeight: "100px", maxWidth: "100px" }}
            />
          </td>
          <td style={{ width: "8%", verticalAlign: "middle" }}>
            {moment(data.date).format("LL")}
          </td>
          <td
            className="text-center"
            style={{ width: "20%", verticalAlign: "middle" }}
          >
            <div className="text-center">
              <Button
                variant="info"
                className="btn-view mr-1"
                onClick={() =>
                  this.handleView(
                    data
                  )
                }
              >
                View
              </Button>
              <Button
                variant="warning"
                className="btn-edit mr-1"
                onClick={(id, title, description, thumbnail, content) =>
                  this.handleUpdate(
                    data.id,
                    data.title,
                    data.description,
                    data.thumbnail,
                    data.content
                  )
                }
              >
                Edit
              </Button>
              <Button
                className="btn-delete mr-1"
                variant="danger"
                value={data.id}
                onClick={(id) => this.handleDeleteAnnouncement(data.id)}
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      );
    });
    const { editorState } = this.state;
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
                  Insert Announcement
                </h4>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">

            <div className={this.state.condition ? 'd-none form-horizontal' : 'd-flex'}>
              <div className="card card-info w-100">

                <Form onSubmit={this.handleAddAnnouncement} className='form-horizontal'
                >
                  {/* <form className="form-horizontal"> */}
                  <div className="card-body row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-3 col-form-label">Title of Announcement</label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                          <Form.Control
                            style={{ margin: "0px" }}
                            as="textarea"
                            rows="4"
                            placeholder="Enter description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleTitleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputPassword3" className="col-sm-3 col-form-label">Content</label>
                        <div className="col-sm-9">
                          <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            toolbar={{
                              inline: { inDropdown: true },
                              list: { inDropdown: true },
                              textAlign: { inDropdown: true },
                              link: { inDropdown: true },
                              history: { inDropdown: true },
                              image: {
                                uploadCallback: this.uploadImageCallBack,
                                previewImage: true,
                                alt: { present: true, mandatory: false },
                                inputAccept: "image/jpeg,image/jpg,image/png",
                                defaultSize: {
                                  height: "auto",
                                  width: "100%",
                                  border: '1px solid #ced4da'
                                },
                              },
                            }}
                            onEditorStateChange={this.onEditorStateChange}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="col-md-3">
                      <img
                        src={
                          this.state.imageUrl ||
                          "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
                        }
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png";
                        }}
                        alt="Thumbnail"
                        style={{
                          height: "auto",
                          width: "100%",
                          border: '1px solid #eee',
                        }}
                      />
                      <Form.Group as={Col}>
                        <Form.File
                          id="file-image"
                          label="Custom file input"
                          custom
                          accept="image/*"
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


            <hr style={{ borderWidth: "3px", marginTop: 0 }}></hr>
            <h4 className="my-3 text-dark">List of Announcements</h4>
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
                    <thead
                      style={{ textAlign: "center", backgroundColor: "#FFF" }}
                    >
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Thumbnail</th>
                        <th>Date</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">{tableData}</tbody>
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
    data: state.AnnouncementReducer.data,
    deletedData: state.AnnouncementReducer.deletedData,
    postedMessage: state.AnnouncementReducer.postedMessage,
    updatedData: state.AnnouncementReducer.updatedData,
    imageUrlRes: state.fileUploadReducer.imageUrl,
    totalRecord: state.AnnouncementReducer.totalRecord,
    loading: state.AnnouncementReducer.loading,
    uploadLoading: state.fileUploadReducer.uploadLoading,
    deletedMessage: state.AnnouncementReducer.deletedMessage,
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAnnouncements,
      addAnnouncement,
      deleteAnnouncement,
      updateAnnouncement,
      uploadFile,
      searchAnnouncement,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(Announcement);
