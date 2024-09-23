// components/SplineViewer.js
import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineViewer = ({ url }) => {
  return (
    <div id="spline-container">
      <Spline scene={url} />
    </div>
  );
};

export default SplineViewer;
