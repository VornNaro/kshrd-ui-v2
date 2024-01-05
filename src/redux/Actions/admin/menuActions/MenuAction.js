import {
  GET_MENU,
  SEARCH_MENU,
  DELETE_MENU,
  FETCH_MENU_REQUEST,
  FETCH_MENU_FAILURE,
  FETCH_MENU_SUCCUESS,
  POST_MENU,
  UPDATE_MENU,
  UPDATE_MENU_REQUEST,
  UPDATE_MENU_SUCESS,
  UPDATE_MENU_FAILURE,
  SEARCH_MENU_REQUEST,
  SEARCH_MENU_FAILURE,
} from "./MenuActionType";
import axiosInstance from "../../../../components/helpers/axios";
import { baseUrl } from "../../../../config/API";

//TODO: This function is created to get parent menu
export const getParentMenu = () => {
  return async (dispatch) => {
    const menu = await axiosInstance.getToken().get(`${baseUrl}/menus`);
    dispatch({
      type: GET_MENU,
      data: menu.data.data,
    });
  };
};

export const getParentMenuOrder = (cb) => {
  return async (dispatch) => {

    const menu = await axiosInstance.getToken().get(`${baseUrl}/menus`)
    dispatch({
      type: "get menu 2",
      data: menu.data.data
    })

    cb(menu.data.data)
  }
}

//TODO: This function is created to get menu
export const getMenu = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MENU_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/menus-with-pagination?limit=5&page=${page}`);

      dispatch({
        type: FETCH_MENU_SUCCUESS,
        data: result.data.data,
        totalRecord: result.data.pagination.totalCount,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MENU_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};

//TODO: This function is created to post generation
export const postMenu = (menu) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MENU_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().post(`/menus`, menu);
      dispatch({
        type: POST_MENU,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MENU_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};

//TODO: This function is created to update menu
export const updateMenu = (id, menu) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_MENU_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().put(`/menus/${id}`, menu);
      dispatch({
        type: UPDATE_MENU_SUCESS,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_MENU_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};

//TODO: This function is created to delete generation
export const deleteMenu = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_MENU_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance.getToken().delete(`/menus/${id}`);
      dispatch({
        type: DELETE_MENU,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MENU_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};

//TODO: This function is created to search generation
export const searchMenu = (name) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_MENU_REQUEST,
        data: [],
        loading: true,
      });
      const result = await axiosInstance
        .getToken()
        .get(`/menus-with-pagination?name=${name}`);
      dispatch({
        type: SEARCH_MENU,
        data: result.data.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_MENU_FAILURE,
        data: [],
        loading: false,
      });
    }
  };
};
