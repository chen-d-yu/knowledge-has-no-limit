/// <reference types="react-scripts" />

declare module '*.module.scss' {
  const classes: {readonly [key: string]: string};
  export default classes;
}

declare module 'ezuikit-js' {
  const classes: any;
  export default classes;
}

declare module 'react-websocket' {
  const classes: any;
  export default classes;
}

declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
