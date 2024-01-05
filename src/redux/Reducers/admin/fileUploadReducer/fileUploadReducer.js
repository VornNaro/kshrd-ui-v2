import {
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FIALURE,
  FILE_UPLOAD_MULTI_FIALURE,
  FILE_UPLOAD_MULTI_SUCCESS,
  FILE_UPLOAD_MULTI_REQ,
} from "../../../Actions/admin/fileUploadActions/fileUploadActionType";

const defaultState = {
  imageUrl: "",
  imageMultiUrl: "",
  uploadLoading: false
};

export const fileUploadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FILE_UPLOAD_REQUEST:
      return {
        ...state,
        uploadLoading: action.uploadLoading
      };
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        imageUrl: action.data,
        uploadLoading: action.uploadLoading
      };
    case FILE_UPLOAD_FIALURE:
      return {
        ...state,
        uploadLoading: action.uploadLoading
      };

    case FILE_UPLOAD_MULTI_REQ:
      return {
        ...state,
        imageMultiUrl: action.data,
        uploadLoading: action.uploadLoading
      };

    case FILE_UPLOAD_MULTI_SUCCESS:
      return {
        ...state,
        imageMultiUrl: action.data,
        uploadLoading: action.uploadLoading
      };
    case FILE_UPLOAD_MULTI_FIALURE:
      return {
        ...state,
        imageMultiUrl: action.data,
        uploadLoading: action.uploadLoading
      };

    default:
      return state;
  }
};
