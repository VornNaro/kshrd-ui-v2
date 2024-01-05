import { combineReducers } from "redux";
import { userReducer } from "./admin/userReducer/userReducer"
import { partnerReducer } from "./admin/partnerReducer/PartnerReducer";
import { partnerTypeReducer } from "./admin/partnerTypeReducer/partnerTypeReducer";
import { alumniReducer } from "./admin/alumniReducer/AlumniReducer";
import { menuReducer } from "./admin/menuReducer/MenuReducer";
import { courseTrainingTypeReducer } from "./admin/courseTrainingTypeReducer/CourseTrainingTypeReducer";
import { courseTrainingReducer } from "./admin/courseTrainingReducer/CourseTrainingReducer";
import { generationReducer } from "./admin/generationReducer/GenerationReducer";
import { careerPathReducer } from "./admin/careerPathReducer/CareerPathReducer";
import { AnnouncementReducer } from "./admin/announcementReducer/AnnouncementReducer";
import { fileUploadReducer } from "./admin/fileUploadReducer/fileUploadReducer";
import { EventCategoryReducer } from "./admin/eventCategoryReducer/EventCategoryReducer";
import { eventReducer } from "./admin/eventReducer/EventReducer";
import { loginReducer } from "./admin/loginReducer/LoginReducer"

// Client Import Reducers
import { clientMenuReducer } from "./client/menuReducer/menuReducer";
import { clientCovidReducer } from "./client/covidReducer/covidReducer";
import { clientHomeReducer } from "./client/homeReducer/homeReducer";
import { clientAlumniReducer } from "./client/alumniReducer/alumniReducer";
import { clientCareerPathReducer } from "./client/careerPathReducer/careerPathReducer";
import { clientBasicCourseReducer } from './client/basicCourseReducer/basicCourseReducer'
import { clientAdvancedCourseReducer } from './client/advancedCourseReducer/advancedCourseReducer'
import { clientAnnouncementReducer } from "./client/announcementReducer/AnnouncementReducer";
import { clientSpecialLectureReducer } from "./client/specialLectureReducer/specialLectureReducer";
import { clientPartnerReducer } from './client/partnerReducer/partnerReducer'
import { clientCourseTrainingTypeReducer } from "./client/courseTrainingReducer/courseTrainingReducer";
import { clientCurriculumReducer } from './client/curriculumReducer/curriculumReducer';

export const reducers = {
  userReducer: userReducer,
  partnerReducer: partnerReducer,
  partnerTypeReducer: partnerTypeReducer,
  alumniReducer: alumniReducer,
  menuReducer: menuReducer,
  courseTrainingTypeReducer: courseTrainingTypeReducer,
  courseTrainingReducer: courseTrainingReducer,
  generationReducer: generationReducer,
  careerPathReducer: careerPathReducer,
  AnnouncementReducer: AnnouncementReducer,
  fileUploadReducer: fileUploadReducer,
  EventCategoryReducer: EventCategoryReducer,
  EventReducer: eventReducer,
  loginReducer: loginReducer,


  // Client Reducers
  clientMenuReducer: clientMenuReducer,
  clientCovidReducer: clientCovidReducer,
  clientCareerPathReducer: clientCareerPathReducer,
  clientHomeReducer: clientHomeReducer,
  clientAlumniReducer: clientAlumniReducer,
  clientBasicCourseReducer: clientBasicCourseReducer,
  clientAdvancedCourseReducer: clientAdvancedCourseReducer,
  clientAnnouncementReducer: clientAnnouncementReducer,
  clientSpecialLectureReducer: clientSpecialLectureReducer,
  clientPartnerReducer: clientPartnerReducer,
  clientCourseTrainingTypeReducer: clientCourseTrainingTypeReducer,
  clientCurriculumReducer: clientCurriculumReducer
};


export const rootReducer = combineReducers(reducers);
