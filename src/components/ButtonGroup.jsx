import React from 'react'

function ButtonGroup(props) {
  const play = props.playVideo;
  const pause = props.pauseVideo;
  const stop = props.stopVideo;

  return (
    <div className='btn-group'>
      <button onClick={play}>PLAY</button>
      <button onClick={pause}>pause</button>
      <button onClick={stop}>stop</button>
    </div>
  )
}

export default ButtonGroup