import {
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_FIALURE,
  FILE_UPLOAD_MULTI_SUCCESS,
  FILE_UPLOAD_MULTI_REQ,
  FILE_UPLOAD_MULTI_FIALURE,
} from "./fileUploadActionType";
import axiosInstance from "../../../../components/helpers/axios";

//TODO: This function is created to upload file
export const uploadFile = (file) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILE_UPLOAD_REQUEST,
        data: "",
        uploadLoading: true,
      });

      const result = await axiosInstance.getToken().post(`/uploads`, file);
      dispatch({
        type: FILE_UPLOAD_SUCCESS,
        data: result.data.file1,
        uploadLoading: false,
      });
    } catch (error) {
      dispatch({
        type: FILE_UPLOAD_FIALURE,
        data: "",
        uploadLoading: false,
      });
    }
  };
};

export const uploadFileCallback = (file, cb) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILE_UPLOAD_MULTI_REQ,
        data: "",
        uploadLoading: true,
      });

      const result = await axiosInstance.getToken().post(`/uploads`, file);

      dispatch({
        type: FILE_UPLOAD_MULTI_SUCCESS,
        data: result.data.file1,
        uploadLoading: false,
      });
      cb(result.data.file1);

    } catch (error) {
      dispatch({
        type: FILE_UPLOAD_MULTI_FIALURE,
        data: [],
        uploadLoading: false,
      });
    }

  };
};
