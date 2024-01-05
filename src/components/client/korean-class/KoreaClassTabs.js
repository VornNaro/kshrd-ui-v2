import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

export default function KoreaClassTabs() {
   return (
      <div>
         <Tabs
            transition={false}
            className="tabs-menu"
            defaultActiveKey="description"
            id="uncontrolled-tab-example"
         >
            <Tab
               tabClassName="tabs-link"
               eventKey="description"
               title="DESCRIPTION"
            >
               <p className="p-4 basic-description">
                  All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.All students learn Korean 2 hours a day during both basic and advanced course. Both Khmer and native Korean instructors teach the students together for better understanding.
          </p>
            </Tab>
            <Tab tabClassName="tabs-link" eventKey="detail" title="DETAIL">
               <div className="course-detail">
                  <ul>
                     <li>
                        <span className="icon-next">
                           <FontAwesomeIcon icon={faChevronCircleRight} />
                        </span>
                     Provide training materials
                  </li>
                     <li>
                        <span className="icon-next">
                           <FontAwesomeIcon icon={faChevronCircleRight} />
                        </span>
                     Study with teachers who have many experience
                  </li>
                     <li>
                        <span className="icon-next">
                           <FontAwesomeIcon icon={faChevronCircleRight} />
                        </span>
                     Practice with Koreans
                  </li>

                  </ul>
               </div>
            </Tab>
         </Tabs>
      </div>
   )
}
