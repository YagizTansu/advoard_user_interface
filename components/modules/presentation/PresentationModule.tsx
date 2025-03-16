import { useState, useEffect } from 'react';
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
  },
  {
    id: 3,
    title: 'presentations.information.title',
    description: 'presentations.information.description',
    image: '/images/info-demo.jpg',
    videoSrc: '/videos/info-demo.mp4',
    color: '#ff006e',
  },
  {
    id: 4,
    title: 'presentations.assistance.title',
    description: 'presentations.assistance.description',
    image: '/images/help-demo.jpg',
    videoSrc: '/videos/help-demo.mp4',
    color: '#3a0ca3',
  },
];

const PresentationModule: React.FC<PresentationModuleProps> = ({ onInteraction }) => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-rotate through presentations
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % presentations.length);
        setShowVideo(false); // Reset video state when changing presentation
      }
    }, 20000); // Change every 20 seconds
    
    return () => clearInterval(timer);
  }, [isPaused]);
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % presentations.length);
    setShowVideo(false);
  };
  
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => prevIndex === 0 ? presentations.length - 1 : prevIndex - 1);
    setShowVideo(false);
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
        <Box className={`${styles.videoContainer} ${styles.fullscreenVideoContainer}`}>
          <video 
            autoPlay 
            muted 
            loop
            className={styles.video}
            src={presentation.videoSrc}
            poster={presentation.image}
          />
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
            <Typography variant="subtitle1" className={styles.videoTitle}>
              {t(presentation.title)}
            </Typography>
            <Chip 
              label={t('presentations.nowPlaying')} 
              size="small"
              className={styles.videoChip}
            />
          </Box>
        </Box>
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
          
          <Typography variant="h4" className={styles.imageTitle}>
            {t(presentation.title)}
          </Typography>
          
          <Typography variant="body1" className={styles.imageDescription}>
            {t(presentation.description)}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box className={styles.container} onClick={() => showVideo ? setShowVideo(false) : null}>
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
              <Typography 
                variant="h3" 
                gutterBottom
                className={styles.headerTitle}
              >
                {t('presentations.welcomeTitle')}
              </Typography>
              <Typography 
                variant="h6"
                className={styles.headerSubtitle}
              >
                {t('presentations.welcomeSubtitle')}
              </Typography>
              
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
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: showVideo ? 0 : 4, m: showVideo ? 0 : 'auto', maxWidth: showVideo ? '100%' : 'lg' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
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
