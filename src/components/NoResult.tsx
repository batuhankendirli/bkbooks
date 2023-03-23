import React from 'react';

const NoResult = ({ header, text }: { header: string; text: string }) => {
  return (
    <div className="no-result">
      <h1 className="no-result-header">{header}</h1>
      <p className="no-result-text">{text}</p>
    </div>
  );
};

export default NoResult;
