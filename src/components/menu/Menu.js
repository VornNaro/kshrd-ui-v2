import React, { Component } from "react";
import "./Menu.css";
import { Table, Button, Form, Col, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getMenu,
  postMenu,
  updateMenu,
  deleteMenu,
  searchMenu,
  getParentMenu,
} from "../../redux/Actions/admin/menuActions/MenuAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import Loading from "../Loading/Loading";
import { scrollToTop } from "../helpers/scrollTop";
import MenuDrag from "./MenuDrag";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu_order: 0,
      parent_id: 0,
      name: "",
      link: "",
      isUpdate: false,
      activePage: 1,
      perPage: 5,
      condition: true,
    };
  }

  //TODO: This function is created to get menu data
  fetchData = async () => {
    await this.props.getMenu(this.state.activePage);
  }

  componentDidMount() {
    if (this.props.menu.length === 0) {
      this.fetchData();
    }

  }

  //TODO: This function is created to change page number of pagination
  handlePageChange(pageNumber) {

    this.setState({ activePage: pageNumber }, () => {
      this.props.getMenu(this.state.activePage);
    });
  }

  //TODO: This function is created to get data from input form
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //TODO: This function is created to add new and update data
  onSubmit = async (e) => {

    e.preventDefault();

    if (this.state.isUpdate) {

      let id = this.state.id;

      let menu = {
        name: this.state.name,
        menu_order: this.state.menu_order,
        parent_id: this.state.parent_id,
        link: this.state.link,
      };
      await this.props.updateMenu(id, menu);

    } else {

      let menu = {
        name: this.state.name,
        menu_order: this.state.menu_order,
        parent_id: this.state.parent_id,
        link: this.state.link,
      };
      await this.props.postMenu(menu);
    }

    if (this.props.postedMessage.message.includes("successfully")) {

      swal("success", this.props.postedMessage.message, "success");
      this.props.getMenu(this.state.activePage);
      this.setState({
        id: 0,
        menu_order: 0,
        parent_id: 0,
        name: "",
        link: "",
        isUpdate: false,
      });
    } else {

      let errors = this.props.postedMessage.error.map((err) => {
        return "\n\n" + err.message;
      });
      swal("Error", this.props.postedMessage.message.concat(errors), "error");
    }
  };

  //TODO: This function is created to get data for update
  handleUpdate = (id, name, menu_order, parent_id, link) => {
    this.setState(
      {
        id: id,
        name: name,
        menu_order: menu_order,
        parent_id: parent_id,
        link: link,
        isUpdate: true,
        condition: false,
      }
    );
  };

  //TODO: This function is created to get an option of parent menu
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
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {

      if (result.value) {

        await this.props.deleteMenu(id);

        if (this.props.menu.length <= 1) {
          this.props.getMenu(this.state.activePage);
        } else {
          this.componentWillMount();
        }
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
    this.setState({
      id: 0,
      name: "",
      menu_order: "",
      link: "",
    });
  };

  //TODO: This function is created to search data by name
  handleOnSearch = async ({ target }) => {
    this.props.searchMenu(target.value);
  };

  //TODO: This function is created to view data
  handleView = (id, name, parentName, link) => {
    Swal.fire({
      html: `<div style="text-align:left;margin-top:40px"><p> Name: ${name} </p> <p> Parent Name: ${parentName === null ? "No Parent" : parentName}</p> <p> Link: ${link}</p></div>`,
    });
  };

  //TODO: This function is created to handle hiding input form
  handleClick = () => {
    this.setState({ condition: !this.state.condition });
  };

  render() {
    const myData = this.props.menu.map((data) => (
      <tbody key={data.id} style={{ textAlign: "center" }}>
        <tr className="rowTable">
          <td style={{ verticalAlign: "middle" }}>{data.id}</td>
          <td style={{ verticalAlign: "middle" }}>{data.name}</td>
          <td style={{ verticalAlign: "middle" }}>{data.menuParent.name}</td>
          <td style={{ verticalAlign: "middle" }}>{data.link}</td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <Button
              className="btn-view mr-1"
              variant="info"
              onClick={(id, name, parentName, link) => {
                this.handleView(
                  data.id,
                  data.name,
                  data.menuParent.name,
                  data.link
                );
              }}
            >
              View
            </Button>
            <Button
              className="btn-edit mr-1"
              variant="warning"
              onClick={(id, name, menu_order, parent_id, link) => {
                this.handleUpdate(
                  data.id,
                  data.name,
                  data.menu_order,
                  data.menuParent.id,
                  data.link
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
                  Insert Menu
                </h4>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className={this.state.condition ? 'd-none row' : 'd-flex row'}>
              <div className="col-md-7">
                <Form onSubmit={this.onSubmit}>
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
                    <Form.Group as={Col}>
                      <label>Parent Menu</label>
                      <Form.Control
                        as="select"
                        name="parent_id"
                        value={this.state.parent_id}
                        onChange={this.handleSelect}
                      >
                        <option value={0}>Select parent menu...</option>
                        {this.props.parentMenu.map((d) => {
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
                      <label>Link</label>
                      <Form.Control
                        type="text"
                        placeholder="input menu link"
                        name="link"
                        value={this.state.link}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Button
                    className="btn-add"
                    variant="primary my-3"
                    type="submit"
                  >
                    {this.state.isUpdate ? "UPDATE" : "ADD NEW"}
                  </Button>
                </Form>
              </div>
              <div className="col-md-5">
                {!this.props.loading && <MenuDrag />}
              </div>
            </div>
            <br></br>
            <div>
              <div className="row">
                <div className="col-md-3">
                  <FormControl
                    type="text"
                    placeholder="Search by name"
                    className="mr-sm-2"
                    onChange={this.handleOnSearch}
                  />
                </div>
              </div>
            </div>

            <hr style={{ borderWidth: "3px" }}></hr>

            {this.props.loading && (
              <div className="content-wrapper ml-5">
                <div className="ml-5">
                  <Loading />
                </div>
              </div>
            )}
            {!this.props.loading && (
              <div>
                <Table hover responsive>
                  <thead style={{ textAlign: "center", background: "#FFF" }}>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Parent Menu</th>
                      <th>Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {myData}
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
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menuReducer.menu,
    parentMenu: state.menuReducer.parentMenu,
    loading: state.menuReducer.loading,
    totalRecord: state.menuReducer.totalRecord,
    postedMessage: state.menuReducer.postedMessage,
    deletedMessage: state.menuReducer.deletedMessage,
  };
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getParentMenu,
      getMenu,
      postMenu,
      updateMenu,
      deleteMenu,
      searchMenu,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(Menu);
