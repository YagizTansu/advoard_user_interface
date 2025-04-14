import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, IconButton, Container, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../../styles/PresentationModule.module.css';
import { dbService } from '../../../src/services/firebaseService';

interface PresentationModuleProps {
  onInteraction: () => void;
}

const presentations = [
  {
    id: 1,
    title: 'presentations.services.title',
    description: 'presentations.services.description',
    image: '/images/service-demo.jpg',
    videoSrc: '/videos/service-demo.mp4',
    color: '#3a86ff',
  },
  {
    id: 2,
    title: 'presentations.directions.title',
    description: 'presentations.directions.description',
    image: '/images/directions-demo.jpg',
    videoSrc: '/videos/directions-demo.mp4',
    color: '#8338ec',
  }
];

const PresentationModule: React.FC<PresentationModuleProps> = ({ onInteraction }) => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(true); // Start with video playing
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Send robot command function 
  const sendRobotCommand = async (stop_boolean: boolean) => {
    try {
      const commandData = {
        request:{
          0: stop_boolean,
          1: stop_boolean,
          2: stop_boolean,
        },
        service_name: "command_emergency",
      };

      const orderId = await dbService.setDataWithId('robots_command', "robot3", commandData);
      console.log('Robot command sent successfully:', orderId);
    } catch (error) {
      console.error('Error sending robot command:', error);
    }
  };
  
  // Send command when component mounts (presentation mode is opened)
  useEffect(() => {
    // Send stop_boolean as false when presentation mode opens
    sendRobotCommand(false);
    
    // Cleanup function when component unmounts
    return () => {
      // Optional: You can add cleanup logic here if needed
    };
  }, []); // Empty dependency array means this runs once on mount
  
  // Handle video end and transition to next presentation
  const handleVideoEnd = () => {
    const nextIndex = (currentIndex + 1) % presentations.length;
    setCurrentIndex(nextIndex);
    setShowVideo(true); // Ensure the next video shows
  };
  
  // Auto-rotate through presentations
  useEffect(() => {
    if (isPaused) return;
    
    // If not showing video, use timer to rotate
    let timer: NodeJS.Timeout | null = null;
    
    if (!showVideo) {
      timer = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % presentations.length);
          setShowVideo(true); // Show video when changing presentation
        }
      }, 20000); // Change every 20 seconds when not showing video
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPaused, showVideo, currentIndex]);
  
  // Reset video playback when current index changes
  useEffect(() => {
    if (videoRef.current && showVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, [currentIndex, showVideo]);
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % presentations.length);
    setShowVideo(true); // Show video for the next presentation
  };
  
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => prevIndex === 0 ? presentations.length - 1 : prevIndex - 1);
    setShowVideo(true); // Show video for the previous presentation
  };
  
  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
  };

  // Render media content with enhanced styling
  const renderMediaContent = () => {
    const presentation = presentations[currentIndex];
    
    if (showVideo) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={`${styles.videoContainer} ${styles.fullscreenVideoContainer}`}
        >
          <video 
            ref={videoRef}
            autoPlay 
            muted
            className={styles.video}
            src={presentation.videoSrc}
            poster={presentation.image}
            onEnded={handleVideoEnd}
            style={{ opacity: 1, transition: "opacity 0.5s ease-in-out" }}
          />
          
          {/* Touch info overlay text */}
          <Box className={styles.touchInfoOverlay}>
            <TouchAppIcon fontSize="medium" />
            <Typography variant="h6">{t('presentations.touchForInfo')}</Typography>
          </Box>
          
          <IconButton
            className={styles.exitFullscreenBtn}
            onClick={(e) => {
              e.stopPropagation();
              setShowVideo(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box className={styles.videoOverlay}>
            <Chip 
              label={t('presentations.nowPlaying')} 
              size="small"
              className={styles.videoChip}
            />
          </Box>
        </motion.div>
      );
    }
    
    // Enhanced image display
    return (
      <Box 
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${presentation.image})` }}
      >
        <Box className={styles.imageOverlay} />
        
        <Box className={styles.imageContent}>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setShowVideo(true);
            }}
            className={styles.playButton}
          >
            {t('presentations.watchDemo')}
          </Button>
          

        </Box>
      </Box>
    );
  };

  return (
    <Box 
      className={styles.container} 
      onClick={() => showVideo ? setShowVideo(false) : null}
      sx={{
        transition: 'background-color 0.5s ease-in-out',
        backgroundColor: showVideo ? 'black' : 'transparent'
      }}
    >
      {/* Only show the header and controls when not playing video */}
      {!showVideo && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.header}
          >
            <Box className={styles.headerContent}>

              {/* Interactive instruction */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ marginTop: '16px' }}
              >
                <Chip
                  icon={<TouchAppIcon fontSize="small" />}
                  label={t('presentations.touchToInteract')}
                  className={styles.interactChip}
                />
              </motion.div>
            </Box>
            
            {/* Decorative background elements */}
            <Box 
              className={styles.decorativeBackground}
              style={{ background: `radial-gradient(circle, ${presentations[currentIndex].color}20 0%, ${presentations[currentIndex].color}00 70%)` }}
            />
          </motion.div>
        </>
      )}
      
      {/* Main content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: showVideo ? 0 : 4, 
          m: showVideo ? 0 : 'auto', 
          maxWidth: showVideo ? '100%' : 'lg',
          transition: 'all 0.3s ease-out'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${showVideo}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              type: showVideo ? "tween" : "spring", 
              duration: showVideo ? 0.5 : undefined,
              stiffness: showVideo ? undefined : 250, 
              damping: showVideo ? undefined : 25 
            }}
            className="h-full flex flex-col"
          >
            {renderMediaContent()}
          </motion.div>
        </AnimatePresence>
      </Container>
      
      {/* Controls and navigation - only visible when not playing video */}
      {!showVideo && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box className={styles.controlsContainer}>
            {/* Presentation controls */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={togglePause}
                className={styles.controlButton}
              >
                {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
              
              <IconButton 
                onClick={handlePrevious}
                className={styles.controlButton}
                sx={{ ml: 1 }}
              >
                <ArrowBackIcon />
              </IconButton>
              
              <IconButton 
                onClick={handleNext}
                className={styles.controlButton}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
            
            {/* Indicator dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              {presentations.map((_, index) => (
                <Box
                  key={index}
                  component="button"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    setShowVideo(false);
                  }}
                  className={`${styles.indicatorDot} ${index === currentIndex ? styles.activeIndicatorDot : ''}`}
                  style={{ 
                    backgroundColor: index === currentIndex 
                      ? presentations[currentIndex].color 
                      : 'rgba(255,255,255,0.3)'
                  }}
                />
              ))}
            </Box>
            
            {/* Exit button */}
            <Button 
              variant="outlined"
              color="inherit"
              endIcon={<ExitToAppIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onInteraction();
              }}
              className={styles.exitButton}
            >
              {t('presentations.exitButton')}
            </Button>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default PresentationModule;
