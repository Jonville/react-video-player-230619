import React from 'react'

function VideoFile(props) {

  const videoRef = props.con;

  return (
    <>
      <video ref={videoRef} src="./media/video2.mp4"></video>
    </>
  )
}

export default VideoFile