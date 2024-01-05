// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
var CryptoJS = require("crypto-js");
const PrivateRoute = ({ component: Component, ...rest }) => {

  const encryptedTokenField = sessionStorage.key(0)
  let bytes = null
  let decryptedTokenField = null
  if(encryptedTokenField!=null){
    bytes = CryptoJS.AES.decrypt(encryptedTokenField, 'kshrd');
    decryptedTokenField= bytes.toString(CryptoJS.enc.Utf8);
  }
   
  let token = null
  let isLoggedIn = false
  if(decryptedTokenField === 'token'){
    let encryptedToken = sessionStorage.getItem(encryptedTokenField)
    let bytes  = CryptoJS.AES.decrypt(encryptedToken, 'kshrd');
    token = bytes.toString(CryptoJS.enc.Utf8);
  }
  if(token!=null)
    isLoggedIn = true

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
