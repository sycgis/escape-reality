import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-bmfont-text-component';
import Bookmark from './Bookmark';
import $ from 'jquery';

const Height = 3;
const Width = 6;

export default props => {
  const extraProps = AFRAME.utils.extend({}, props);
  delete extraProps.color;
  delete extraProps.text;

  let adjustCoordinates = (position, width) => {
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 1.5).toString();
    } else {
      zCoordinate = (zCoordinate - 1.5).toString();
    }
    xCoordinate = (xCoordinate).toString();
    //temporary
    yCoordinate = yCoordinate.toString();
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }
//
  let adjustEntityCoordinates = (position) => {
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    return (`${xCoordinate} ${yCoordinate} -3`)
  }

  let adjustEntityRotation = (rotation) => {
    let rotations = rotation.split(" ").map((element) => Number(element));
    let xRotation = rotations[1];
    return (`0 ${xRotation} 0`)
  }

  let adjustIconCoordinates = (position, width, height) => {
    let coordinates = position.split(" ").map((element) => Number(element));
    let xCoordinate = coordinates[0];
    let yCoordinate = coordinates[1];
    let zCoordinate = coordinates[2];
    if (zCoordinate < 0) {
      zCoordinate = (zCoordinate + 0.1).toString();
    } else {
      zCoordinate = (zCoordinate - 0.1).toString();
    }
    xCoordinate = (xCoordinate + (width/2.5)).toString(); //bigger modifier moves left
    //temporary
    console.log('adjustIconCoordinates height:', height)
    yCoordinate = (yCoordinate + (height/2.75)).toString(); //bigger modifier moves down
    return (`${xCoordinate} ${yCoordinate} ${zCoordinate}`);
  }

  //make sure main text doesn't overflow beyond component parameters
 let reduceMainTextSize = (text) => {
   if (text.length >= 500) {
     text = text.slice(0, text.length -1);
     let finalPeriod = text.lastIndexOf('. ')
     return (text.slice(0, finalPeriod) + '.').replace(/\s+/g, ' ').trim()
   } else {
     return text.replace(/\s+/g, ' ').trim();
   }
 }

  let greenAngleCalc = (position) => {
    console.log('Position in greenAngleCalc:', position, 'type of position:', typeof position)
    position = cardCoordCalc(position);
    let coordinates = position.split(" ").map((element) => Number(element));
    let x = coordinates[0];
    let z = coordinates[2];
    if (z <= 0 && x <= 0){
      return `0 ${90 - Math.abs(Math.atan(z/x) * (180/Math.PI))} 0`
    } 
    if (z >= 0 && x >= 0) {
      return `0 ${-90 - Math.abs(Math.atan(z/x) * (180/Math.PI))} 0`
    } 
    if (z >= 0 && x <= 0){
      return `0 ${90 + Math.abs(Math.atan(z/x) * (180/Math.PI))} 0`
    }
    if (z <= 0 && x >= 0) {
      return `0 ${Math.abs(Math.atan(z/x) * (180/Math.PI)) - 90} 0`
    }
  }

  let cardCoordCalc = (position) => {  //y=tx, x=tz
    let coordinates = position.split(" ").map((element) => Number(element));
    let tx = coordinates[0];
    let tz = coordinates[2];
    let s = Math.abs(tx/ tz); // s = slope
    let z = 3 / (Math.sqrt(Math.pow(s, 2) + 1));
    let x = s*z;
    x = Math.sign(tx) * x;
    z = Math.sign(tz) * z
    // let gAngle = greenAngleCalc(`${x} 0.5 ${z}`);
    // return {'x': x, 'z': z, 'gAngle': gAngle};
    return `${x.toString()} 0.5 ${z.toString()}`
  }

let addBookmark = (title) => {
  $.get({
    url: '/addBookmark?exactWikiTitle=' + title,
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.error('error in fetch paragraph', error);
      $('.error').show();
    }
  });
};


//  return <Entity id="TextPlane" position={adjustEntityCoordinates(props.position)} rotation={adjustEntityRotation(props.rotation)}>
  return <Entity id="TextPlane" position={cardCoordCalc(props.position)} rotation={greenAngleCalc(props.position)}>

      <Entity>

        {/* Assume that props.position === "0 1 -3" */}


        {/* Background Plane */}
        <Entity
          geometry={`primitive: plane; width: ${Width}; height: ${Height}`}
          // position='0 0 0'
          rotation='0 0 0'
          material={{color: 'black'}}
        />

        {/* Main Image */}
        <Entity geometry={`primitive: plane; width: ${(Width/9)*3}; height: ${(Height/3)*2}`}
            material={{side: 'double', src: 'url(' + props.imageSrc + ')', opacity: 1}}
            // position={adjustImageCoordinates(props.position, Width, (Height/3)*2)}
            position={`${(Width/-3.65)} ${(Height/-10)} 0.1`}
            rotation='0 0 0'
        >
        </Entity>

        {/* Header Text */}
        <Entity bmfont-text={{align: 'left', width: '750', color: 'yellow', text: props.header}}
          // position={adjustHeaderTextCoordinates(props.position, Width, Height)}
          position={`${props.headerAdjust} 1 0.1`}
          rotation='0 0 0'
          scale='1.85 1.85 0'
        />

        {/* Main Body Text */}
        <Entity bmfont-text={{align: 'left', width: '775', color: 'white', text: reduceMainTextSize(props.text)}} // Max character length = 500
          // position={adjustMainTextCoordinates(props.position, Width, Height)}
          position={`-0.35 ${props.textAdjust - 1.1} 0.1`}
          rotation='0 0 0'
          scale='0.8 0.8 0'
        />

      </Entity>

      {/*Collapse Icon*/}
      <Entity
            onClick={() => props.hidePlane()}
            geometry={`primitive: plane; width: ${Width/18}; height: ${Height/9}`}
            material={{side: 'double', src: 'url(http://i.imgur.com/W4tbzxv.png)', opacity: 0.99}}
            position={`2.65 1.2 0.1`}
            rotation='0 0 0'
            scale='1 1 0'
      >
      </Entity>

      <Entity
            onClick={() => addBookmark(props.wikiTitle)}
            geometry={`primitive: plane; width: ${Width/18}; height: ${Height/9}`}
            material={{side: 'double', src: '#bookmark', opacity: 0.99}}
            position={`-2.65 1.2 0.1`}
            rotation='0 0 0'
            scale='1 1 0'
      >
      </Entity>


    </Entity>
};
