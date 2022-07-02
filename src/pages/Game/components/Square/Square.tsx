import React, { ReactNode } from "react";
import { SquareProps } from "../../../../interfaces/Square.interfaces";
import './Square.css'

class Square extends React.Component<SquareProps, {}> {


    render(): ReactNode {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

export default Square