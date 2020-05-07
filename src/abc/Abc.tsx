import React from "react";

interface AbcProps {
  text: string;
}

export class Abc extends React.Component<AbcProps> {
  render() {
    return <div>{this.props.text}</div>;
  }
}
