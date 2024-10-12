import React from "react";
import { Table } from "reactstrap";
import Aux from "../../hoc/Aux/Aux";
import "./ResourcesList.css";
import ResourceRow from "../ResourceRow/ResourceRow";

const ResourcesList = (props) => {
  const loading = <div>Loading resources ...</div>;
// debugger;
  const sortedResources = () => {
    if (props.resources.length > 0) {
      return props.resources.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase()
          ? -1
          : a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : 0
      );
    } else {
      return [];
    }
  };

  const renderedResources = sortedResources().map((resource, index) => {
    return (
      <Aux key={index}>
        <ResourceRow
          key={index}
          resource={resource}
          edit={props.edit}
          deleteResource={props.deleteResource}
        />
      </Aux>
    );
  });

  return (
    <div>
      <Table striped size="sm" className="ResourcesList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Show</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Format</th>
            <th>Location</th>
            {props.edit ? <th>Edit</th> : null}
            {props.deleteResource ? <th>Delete</th> : null}
          </tr>
        </thead>
        <tbody>{renderedResources.length > 0 ? renderedResources : loading}</tbody>
      </Table>
    </div>
  );
};

export default ResourcesList;
