import { useState , useRef , useEffect } from 'react'
import './App.css'
import VideoFile from './components/VideoFile'
import TimeInfo from './components/TimeInfo'
import ButtonGroup from './components/ButtonGroup'

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
    
    const handleLoadedMetadata = () => setDuration(videoRef.current.duration);
    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

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
      <VideoFile 
        con={videoRef}
      />
      <TimeInfo 
        currentTime={currentTime}
        duration={duration}
      />
      <ButtonGroup 
        playVideo={playVideo}
        pauseVideo={pauseVideo}
        stopVideo={stopVideo}
      />
    </div>
  )

}

export default App
