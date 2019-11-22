import React from 'react'

const Aud = (props) => {

  let renderAudio = (
    <div>
      <iframe title={props.resource.title} width="300" height="100" scrolling="no" frameBorder="no" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"
        + `${props.resource.url}` +
        "&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"}></iframe>
    </div>
  )

  return (
    <div>
      {renderAudio}
    </div >
  )
}

export default Aud
