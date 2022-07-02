import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

class Home extends React.Component {


  routeChange() {
  }

    render(): ReactNode {
        return (
          <Navigate to="/game" replace={true} />
        )
    }
  }
  
  export default Home;