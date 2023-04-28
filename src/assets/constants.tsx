import React from "react";
import { AiOutlineFolder } from 'react-icons/ai';
import { FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { SiTypescript } from 'react-icons/si';
import { DiCss3 } from 'react-icons/di';
import { AiFillHtml5 } from 'react-icons/ai';

export const foldersAndFiles = [
    { 
      id: "1", 
      name: "src", 
      type: 'folder', 
      icon: <AiOutlineFolder />, 
      children: [
        { id: "9", name: "index.js", type: 'file', icon: <IoLogoJavascript color="yellow" />, children: []},
        { id: "2", name: "components", type: 'folder', icon: <AiOutlineFolder />, children: [] }, 
        { id: "3", name: "Header.jsx", type: 'file', icon: <FaReact color="aqua" />, children: []}
      ]},
    { 
      id: "5", 
      name: "public", 
      type: 'folder', 
      icon: <AiOutlineFolder />, 
      children: [
        { id: "6", name: "style.css", type: 'file', icon: <DiCss3 color="007acc"/>, children: [] }
      ]},
    { 
      id: "7", 
      name: "node_modules", 
      type: 'folder', 
      icon: <AiOutlineFolder />, 
      children: [
        { id: "8", name: "index.tsx", type: 'file', icon: <SiTypescript color="007acc"/>, children: [] }
      ]}
  ];
  

  export const iconsByExtension: {[key: string]: JSX.Element} = {
    "js": <IoLogoJavascript color="yellow"/>,
    "jsx": <FaReact color="aqua"/>,
    "tsx": <SiTypescript color="#007acc"/>,
    "css": <DiCss3 color="007acc"/>,
    "html": <AiFillHtml5 color="#f06529"/>,
  };