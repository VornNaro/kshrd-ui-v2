import React from 'react'
import './Drawer.css'
import './navbarTop.css'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Spinner } from 'react-bootstrap'
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { getMenus } from '../../../redux/Actions/client/menuActions/menuAction'
import { bindActionCreators } from 'redux';
import NavbarSkeleton from './NavbarSkeleton';
import 'react-slide-out/lib/index.css';
import { Drawer } from 'antd';
import { Menu } from 'antd';
import CloseSvg from './CloseSvg'
import NavbarResSkeleton from './NavbarResSkeleton'
const { SubMenu } = Menu;

class NavbarTop extends React.Component {
   state = {
      active: false,
   }

   //TODO: This function is created to change active status
   onActive = () => {
      this.setState({ active: !this.state.active })
   }

   componentWillMount() {
      this.props.getMenus();
   }

   //TODO: This function is created to splict sub menu
   getMenuNoSubMenu = (menuItem) => {

      if (menuItem.parent_id.length === 0) {

         let menuLink = menuItem.link.toLowerCase().split(' ').join('-');
         if(menuLink.includes('http') || menuLink.includes('https')) {
            return (
               <li>
                  <a className="text-capitalize" href={`${menuLink}`} target="_blank">{menuItem.name}</a>
               </li>
            )
         }
         return (
            <li>
               <NavLink exact to={`${menuLink}`} activeClassName="top-menu-active" className="text-capitalize" >
                  {menuItem.name}
               </NavLink>
            </li>
         )
      }


   }

   //TODO: This function is created to primary menu when responsive
   getMenuNoSubMenuResponsive = (menuItem, index) => {

      if (menuItem.parent_id.length === 0) {

         let menuLink = menuItem.link.toLowerCase().split(' ').join('-');

         return (
            <Menu.Item className="text-capitalize" onClick={() => {
               this.props.history.push(menuLink)
               this.setState({ active: false })
            }} key={index}>
               {menuItem.name}
            </Menu.Item>
         )
      }


   }


   //TODO: This function is created to get sub menu when responsive
   getMenuWithSubMenuResponsive = (menuItem, index) => {
      if (menuItem.parent_id.length !== 0) {
         return (
            <SubMenu className="text-capitalize" title={menuItem.name}>
               {
                  menuItem.parent_id.map((subMenu, id) => {

                     const subMenuLink = subMenu.link.toLowerCase().split(' ').join('-')

                     return <Menu.Item className="text-capitalize" key={`sub${index}${id}`}
                        onClick={() => {
                           this.props.history.push(subMenuLink)
                           this.setState({ active: false })
                        }}>{subMenu.name}</Menu.Item>
                  })
               }

            </SubMenu>
         )
      }
   }



   //TODO: This function is created to get sub menu from parent menu
   getMenuWithSubMenu = (menuItem) => {

      if (menuItem.parent_id.length !== 0) {

         return (
            <li>
               <div className="dropdown menu-item">
                  <Nav.Link className="dropdown-menu-top text-capitalize">{menuItem.name}</Nav.Link>
                  <div className="dropdown-content">
                     {
                        menuItem.parent_id.map((subMenu, index) => {

                           const subMenuLink = subMenu.link.toLowerCase().split(' ').join('-')

                           return <NavLink exact key={index} className="text-capitalize" to={`${subMenuLink}`}> {subMenu.name}</NavLink>
                        })
                     }
                  </div>
               </div>
            </li>
         )
      }
   }

   render() {

      //menu top

      const renderMenuTop = this.props.allMenus.length !== 0 ? this.props.allMenus.slice(0, 6).map((menuItem, index) => {

         return (
            <React.Fragment key={index}>
               {this.getMenuNoSubMenu(menuItem)}
               {this.getMenuWithSubMenu(menuItem)}
            </React.Fragment>
         )
      }) : null


      //menu bottom

      const renderMenuBottom = this.props.allMenus.slice(6).map((menuItem, index) => {
         return (
            <React.Fragment key={index}>
               {this.getMenuNoSubMenu(menuItem)}
               {this.getMenuWithSubMenu(menuItem)}
            </React.Fragment>
         )
      })

      const renderMenuResponsive = this.props.allMenus.map((menuItem, index) => {
         return (
            <React.Fragment key={index}>
               {this.getMenuNoSubMenuResponsive(menuItem, index)}
               {this.getMenuWithSubMenuResponsive(menuItem, index)}
            </React.Fragment>
         )
      })



      return (
         <>
            <div className="menu">
               <div className="menu-top cus-container">
                  <div className="logo res-logo">
                     <Navbar.Brand as={Link} to="/">
                        <img className="mx-2 pl-1" width="50" src={logo} alt="logo" />
                     </Navbar.Brand>
                     <span className="nav-link px-0 font-weight-bold title-logo res-title">KSHRD</span>
                  </div>

                  <div onClick={this.onActive} className="btn-open-menu">
                     <FontAwesomeIcon icon={faBars} />
                  </div>

                  <nav className={'nav-wrapper responsive'}>
                     <ul>

                        {this.props.loading ? <NavbarSkeleton /> : renderMenuTop}

                     </ul>
                  </nav>

                  <Drawer
                     title={<div className="d-flex justify-content-between align-items-center">
                        <span>
                           <img className="mr-3" width="40" src={logo} alt="logo" />
                           <span style={{ letterSpacing: '1px', fontWeight: 600, fontSize: '1rem' }}>KSHRD</span>
                        </span>
                        <CloseSvg onClick={this.onActive} />
                     </div>
                     }
                     placement={'left'}
                     closable={false}
                     onClose={this.onActive}
                     visible={this.state.active}
                     key={'left'}
                  >
                     <Menu
                        onClick={this.handleClick}
                        style={{ width: '100%' }}
                        defaultSelectedKeys={['1']}
                        mode="inline"
                     >
                        {this.props.loading ? <NavbarResSkeleton /> : renderMenuResponsive}
                     </Menu>
                  </Drawer>
               </div>

               <div className="menu-bottom shadow-sm ">
                  <div className="cus-container d-flex justify-content-between align-items-center h-100">
                     <Link to="/" className="nav-link px-0 font-weight-bold title-logo ">
                        KSHRD
                     </Link>
                     <nav className="nav-wrapper-bottom">
                        <ul>
                           {this.props.loading ? <NavbarSkeleton /> : renderMenuBottom}
                        </ul>
                     </nav>

                  </div>
               </div>
            </div >
         </>
      )
   }
}

const mapStateTopProps = state => {
   return {
      allMenus: state.clientMenuReducer.menus,
      loading: state.clientMenuReducer.loading
   }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
      getMenus
   }, dispatch)
}

export default connect(mapStateTopProps, mapDispatchToProps)(NavbarTop);
