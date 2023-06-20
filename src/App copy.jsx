import { useState , useRef , useEffect } from 'react'
import './App.css'

function App() {
  const [duration , setDuration] = useState(0); // 영상 길이
  const [currentTime , setCurrentTime] = useState(0); // 현재 재생 시간

  // video 이름 (참조명) 만들기
  const videoRef = useRef();

  // play
  const playVideo = () => {
    console.log('play', videoRef.current)
    videoRef.current.play()
  }

  // pause
  const pauseVideo = () => {
    console.log('pause', videoRef.current)
    videoRef.current.pause()
  }

  // stop (중단하고 처음으로 돌아가기)
  const stopVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
  }

  // 비디오 재생 hook
  useEffect(()=>{
    setCurrentTime(videoRef.current.currentTime)  // 비디오 현재 시간
    setDuration(videoRef.current.duration)  // 비디오 길이를 구함

    // 매 초마다 비디오 시간 감지
    let videoInterval = setInterval(() => {
      setCurrentTime(videoRef.current.currentTime)
    }, 1000) ; 

    // cleanup : 인터벌 함수 제거
    return () => {clearInterval(videoInterval)}

  },[currentTime]);

  return (
    <div className='App'> 
      <h1>React Video Player</h1>
      <video ref={videoRef} src="./media/video2.mp4"></video>
      <p>{currentTime.toFixed(0)}초 / {duration.toFixed(1)}초 </p>
      <div className="time-info">
        <progress
          style={{width:'100%'}}
          min="0" 
          max="100" 
          value={currentTime * 100 / duration}
        />
      </div>
        <div className="htn-group">
        <button className="play" onClick={playVideo}>Play</button>
        <button className="pause" onClick={pauseVideo}>Pause</button>
        <button className="stop" onClick={stopVideo}>Stop</button>
      </div>
    </div>
  )

}

export default App
