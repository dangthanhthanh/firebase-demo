import React from 'react';
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Player } from "video-react";
import 'video-react/dist/video-react.css';
import "./CardVideo.css"
const CardVideo=()=>{
  return (
    <Card className="m-4" style={{ width: '350px',height:"320px",overflow:"hidden",borderRadius:"1rem",boxShadow:"0px 10px 25px rgba(0, 0, 0, 0.5)",border:"none"}}>
        <Player
            className="state"
            playsInline
            poster="/vite.svg"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            >
          </Player>
        <CardBody>
        <CardTitle className="mx-2" style={{fontSize:"20px",fontWeight:"700"}}>video </CardTitle>
        <div style={{display:"flex"}}>
            <Button className="md-5 mx-2" style={{width:"100%"}} variant="primary">Share</Button>
            <Button className="md-5 mx-2" style={{width:"100%"}} variant="primary">watch</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default CardVideo;