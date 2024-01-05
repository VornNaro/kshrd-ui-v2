import React, { useEffect, useState } from "react";
import "./curriculum.css";
import Viewer, { Worker, SpecialZoomLevel } from "@phuocng/react-pdf-viewer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurriculumById } from "../../../redux/Actions/client/curriculumn/curriculumAction";
import { getAllCourseTraining } from "../../../redux/Actions/client/courseTrainingActions/courseTrainingAction";
import { Link } from "react-router-dom";
import CurriculumSkeleton from "./CurriculumSkeleton";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Curriculum(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    props.getCurriculumById(props.match.params.id);
    props.getAllCourseTraining();
  }, []);

  let moreCourse = null;

  if (props.allCourseTraining.length !== 0) {
    moreCourse = props.allCourseTraining.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div className="our-course-title">
            <img className="mr-4" width="60" src={item.logo} alt="course" />
            <Link
              className="more-course-link"
              onClick={() => {
                props.getCurriculumById(props.match.params.id);
              }}
              to={`/curriculum/${item.id}`}
            >
              <h5>{item.name}</h5>
            </Link>
          </div>
        </React.Fragment>
      );
    });
  }

  return (
    <div className="cus-container">
      <div className="row">
        <div className="col-lg-8">
          {!props.loading ? (
            <>
              <div className="course-details pt-4">
                <h5>{props.data.name}</h5>
                <p>{props.data.description}</p>
              </div>
              <div className="custom-scroll">
                <Document
                  className={window.innerWidth < 578 && 'w-100'}
                  file={props.data.file}
                  options={{ workerSrc: "/pdf.worker.js", scale: 2 }}
                  onLoadSuccess={onDocumentLoadSuccess}
                  noData={<h2>Not yet available!</h2>}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              </div>
            </>
          ) : (
              <CurriculumSkeleton />
            )}
        </div>
        <div className="col-lg-4">
          <div className="card our-course-sidebar border-0 rounded-0 mt-5">
            <div className="card-header rounded-0">
              <h5>Our Course</h5>
            </div>
            <div className="card-body">{moreCourse}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.clientCurriculumReducer.data,
    allCourseTraining: state.clientCourseTrainingTypeReducer.allCourseTraining,
    loading: state.clientCurriculumReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCurriculumById,
      getAllCourseTraining,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Curriculum);
