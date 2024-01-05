import React from "react";
import BasicDetail from "./BasicDetail";
import { Tabs, Tab } from "react-bootstrap";

export default function BasicCourseTabsDetail() {
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
            Training period of basic course is 5 months from 8:00am to 5:00pm.
            We trains Java, Database, and Web technologies. The goal of basic
            course is tounderstand the key concepts of the technologies and
            improve the implementation skills. We motivate students to practice
            more by giving homework and assignments, which could help them
            improve the understanding and implementation skills.
          </p>
        </Tab>
        <Tab tabClassName="tabs-link" eventKey="detail" title="DETAIL">
          <BasicDetail />
        </Tab>
      </Tabs>
    </div>
  );
}
