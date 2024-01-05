import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllPartnerTypes,
  getAllPartnersById,
  getPartnerCallBack,
  getMorePartners
} from "../../../redux/Actions/client/partnerActions/partnerAction";
import AboutOurParnterCard from "./AboutOurParnterCard";
import OurParnter from '../../client/Home/our-partners/OurPartners'
import { Col, Nav, Row, Tab } from "react-bootstrap";
import PartnerMenuSkeleton from "../Home/our-partners/PartnerMenuSkeleton";
import SkeletonCard from "../Home/our-partners/SkeletonCard";
import PartnerCard from "../Home/our-partners/PartnerCard";
class AboutOurPartners extends Component {
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

  render() {
    const { id: defaultActiveKey } = this.state
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

    return (
      <>
        <div className="cus-container">
          <div className="d-flex flex-column justify-content-center align-items-center py-5">
            <h3 className="m-0 font-weight-bold page-title">OUR PARTNERS</h3>
            <p className="m-0 text-center py-3 ">
              We cooperate with many local and international partners related to
              KOSIGN, Korean and Cambodian governments and universities to
              increase training ability.
            </p>
          </div>

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

          {this.props.partnerCbLoading && <SkeletonCard />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    partnerTypes: state.clientPartnerReducer.partnerTypes,
    partners: state.clientPartnerReducer.partners,
    partnerTypesLoading: state.clientPartnerReducer.partnerTypesLoading,
    partnerCbLoading: state.clientPartnerReducer.partnerCbLoading
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllPartnerTypes,
      getAllPartnersById,
      getPartnerCallBack,
      getMorePartners,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(AboutOurPartners);
