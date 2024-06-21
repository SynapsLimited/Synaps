// components/SplineViewer.js
import React from 'react';

const SplineViewer = ({ url }) => {
  return (
    <div id="spline-container">
      <spline-viewer url={url}></spline-viewer>
    </div>
  );
};

export default SplineViewer;
