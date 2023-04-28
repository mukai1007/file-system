import React from "react";

export interface FileComponentProps {
  name: string;
  info: {
    id: string;
    name: string;
    type: string;
    icon: {};
  };
}

function FileComponent(props: FileComponentProps) {
  return (
    <div className="file-component">
      {props.info.icon}{props.name}
    </div>
  );
}

export default FileComponent;
