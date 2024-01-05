import React, { Component } from "react";
import { Nav, Tab, Row, Col } from "react-bootstrap";
import "./ourPartners.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCard from "./SkeletonCard";
import { getAllPartnerTypes, getPartnerCallBack, getAllPartnersById, getMorePartners } from '../../../../redux/Actions/client/partnerActions/partnerAction'
import PartnerCard from "./PartnerCard";
import PartnerMenuSkeleton from "./PartnerMenuSkeleton";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import next from "../../../icons/goal.svg";
import youtubeIcon from "../../../icons/youtube (1).svg";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AboutUs from "../../../images/about-us.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PartnersMenu extends Component {

  state = {
    page: 1,
    hasMore: true,
    id: '',
    ourPartner: []
  }

  fetchData = async () => {
    //get all partner type
    await this.props.getAllPartnerTypes();

    //get default active
    if (this.props.partnerTypes.length !== 0) {

      this.setState({
        id: this.props.partnerTypes[0].id
      }, async () => {

        this.props.partnerTypes.map(async item => {
          this.props.getPartnerCallBack(item.id, async (res) => {
            this.setState({
              ourPartner: [...this.state.ourPartner, {
                idN: item.id,
                data: res
              }]
            })

          });
        })



      })

    }
  }

  componentDidMount() {
    this.fetchData()
  }


  fetchMorePartners = () => {

    this.setState(prevState => { return { page: prevState.page + 1 } }, () => {
      this.props.getMorePartners(this.state.page, this.state.id, (res) => {

        if (res.length === 0) {
          this.setState({ hasMore: false })
        } else {
          this.setState({
            ourPartner: [
              ...this.state.ourPartner.map(item => {
                if (parseInt(this.state.id) === parseInt(item.idN)) {

                  item.data = item.data.concat(res)
                }
                return item
              })
            ]
          })
        }
      });
    });

  }

  onSelect = (id) => {
    this.setState({ id })
    // this.fetchMorePartners();
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props)
  //   console.log(state)
  //   state.ourPartner.map((item, index) => {

  //     if (state.ourPartner.length - 1 === index) {
  //       if (item.data.length === props.partners.length) {
  //         console.log(true)
  //       }
  //     }

  //   })


  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('prevProps', prevProps)
  //   console.log('prevState', prevState)
  //   console.log("prev props length", prevProps.partners.length)

  //   prevState.ourPartner.map(item => {
  //     if (item.idN === prevState.id) {
  //       console.log("prev state length", item.data.length)
  //       if (item.data.length === prevProps.partners.length) {
  //         // this.fetchMorePartners();
  //       }
  //     }
  //   })

  // }

  // getSnapshotBeforeUpdate(oldProps, oldState) {
  //   console.log('oldProps', oldProps)
  //   console.log('oldState', oldState)

  //   oldState.ourPartner.map(item => {
  //     if (item.idN === parseInt(oldState.id)) {
  //       console.log("prev state length", item.data.length)
  //       if (item.data.length === oldProps.partners.length) {
  //         // this.fetchMorePartners();
  //       }
  //     }
  //   })
  // }


  render() {
    const { id: defaultActiveKey } = this.state

    const pertnerMenu = this.props.partnerTypes.map((partnerType, index) => {
      return <Nav.Item key={index} className="mx-5 m-0">
        <Nav.Link
          className="tabs-link-partner"
          eventKey={partnerType.id}
          onSelect={(id) => this.onSelect(id)}
        >
          {partnerType.name}
        </Nav.Link>
      </Nav.Item >
    })


    const partnerContent = this.state.ourPartner.length !== 0 ? this.state.ourPartner.map((item, index) => {
      return (
        <Tab.Pane key={index} eventKey={item.idN} transition={false}>
          {/* <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={item.data.length}
            next={this.fetchMorePartners}
            hasMore={this.state.hasMore}
            loader={<SkeletonCard />}
          >
            <PartnerCard data={item.data} />

          </InfiniteScroll> */}
          <PartnerCard data={item.data} />
        </Tab.Pane >
      )

    }) : null

    return (
      <>
        <div className="partners-menu flex-column">
          <Tab.Container id="left-tabs-example" activeKey={defaultActiveKey}>
            <Row className="tabs-menu-partner-wrapper">
              <Col sm={12}>
                <Nav
                  variant="pills"
                  className="flex-row tabs-menu-partner justify-content-center"
                  data-aos="fade-left"
                >
                  {this.props.partnerTypesLoading ? <PartnerMenuSkeleton /> : pertnerMenu}
                </Nav>
              </Col>
            </Row>

            <Row className="w-100">
              <Col sm={12}>
                <Tab.Content >
                  {/* our partner card list */}
                  {!this.props.partnerCbLoading && partnerContent}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>

        { this.props.partnerCbLoading && <SkeletonCard />}

        {/*{!this.props.partnerCbLoading && <div className="mb-5">
          <div className="row">
            <div
              className="col-md-5 mb-lg-0 mb-md-0 mb-sm-4 mb-4"
              data-aos="fade-up"
              data-aos-offset="200"
            >
              <div className="card shadow-none border-0 d-block h-100 text-center p-4 rounded-0">
                <h4 className="m-0 py-3 font-weight-bold">STAY IN TOUCH</h4>
                <h5 className="m-0 line-height">
                  If you want to know more information, please feel free to
                  contact us.
                  </h5>
                <h5 className="font-weight-bold m-0 p-3">
                  or give us call{" "}
                  <br/>
                  <a className="contact-phone" href="tel:+85512998919">
                    012 998 919
                    </a>
                    <span> or </span >
                     <a className="contact-phone" href="tel:+85585402605">
                    085 402 605
                    </a>
                </h5>
                <Button
                  as={Link}
                  to="/contact-us"
                  size="lg"
                  className="contact-button border-0 m-0 my-3"
                >
                  Contact Us
                  </Button>
                <h4 className="line-height page-title m-0 p-3">
                  KEEP A PULSE ON HRD CENTER. GIVE US A FOLLOW.
                  </h4>
                <div className="d-flex justify-content-center align-items-center">

                  <a
                    style={{ color: "rgb(66, 103, 178)" }}
                    target="_blank"
                    href="https://web.facebook.com/ksignhrd"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      className="mx-2"
                      icon={faFacebook}
                      style={{ fontSize: "2em" }}
                    />
                  </a>

                  <a style={{ color: "rgb(66, 103, 178)" }}
                    target="_blank"
                    href="https://www.youtube.com/c/KoreaSoftwareHRDCenter"
                    rel="noopener noreferrer">
                    <img
                      style={{ marginBottom: "2px" }}
                      width="30"
                      height="30"
                      className="mx-2"
                      src={youtubeIcon}
                      alt="ytIcon"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-offset="200"
              className="col-md-7"
            >
              <div className="card shadow-none our-version h-100 border-0 p-4 rounded-0">
                <h4 className="font-weight-bold m-0 p-3">OUR VISION</h4>
                <ul>
                  <li className="m-0">
                    <span>
                      <img className="pb-1 px-2" src={next} alt="nextIcon" />
                    </span>
                    <span>
                      To be the top 1 IT Tower in Cambodia
                     </span>
                  </li>
                </ul>
                <h4 className="font-weight-bold m-0 p-3">OUR MISSION</h4>
                <ul>
                  <li className="m-0">
                    <span>
                      <img className="pb-1 px-2" src={next} alt="nextIcon" />
                    </span>
                    <span>
                      To provide high quality IT training, and job opportunity
                      </span>

                  </li>
                  <li className=" m-0">
                    <span>
                      <img className="pb-1 px-2" src={next} alt="nextIcon" />
                    </span>
                    <span>
                      To develop SW technologies in Cambodia
                      </span>
                  </li>
                </ul>
                <div className="d-flex justify-content-lg-end justify-content-center">
                  <div className="img-about-us">
                    <img className="w-100 h-100" src={AboutUs} alt="about-us" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>} */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    partnerTypes: state.clientPartnerReducer.partnerTypes,
    partners: state.clientPartnerReducer.partners,
    loading: state.clientPartnerReducer.partnerLoading,
    partnerTypesLoading: state.clientPartnerReducer.partnerTypesLoading,
    partnerCbLoading: state.clientPartnerReducer.partnerCbLoading
  }
}
const mapActionToProps = (dispatch) => {
  return bindActionCreators({
    getAllPartnerTypes,
    getAllPartnersById,
    getMorePartners,
    getPartnerCallBack
  }, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(PartnersMenu)

