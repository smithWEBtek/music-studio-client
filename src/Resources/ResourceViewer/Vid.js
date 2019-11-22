import React from 'react';

const Vid = (props) => {

  return (
    <div>
      <iframe
        title={props.title}
        width="450"
        height="450"
        src={props.url}
        frameBorder="0"
        allowFullScreen={true}>
      </iframe>
    </div>
  )
};

export default Vid;
