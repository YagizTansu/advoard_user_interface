import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Grid, Container, Fade, IconButton, Divider } from '@mui/material';
import PresentationModule from '../components/modules/presentation/PresentationModule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningIcon from '@mui/icons-material/Warning'; // Import warning icon for exclamation mark
import styles from '../styles/index.module.css';
import { dbService } from '../src/services/firebaseService';
import rosConnection from '../src/lib/ros_connecitons';

export default function Home() {
  const { t } = useTranslation('common');
  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Send robot command function to avoid duplicate code
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

      // const orderId = await dbService.setDataWithId('robots_command', "robot4", commandData);
      rosConnection.publishEmergencyStop(stop_boolean);
      // console.log('Robot command sent successfully:', orderId);
    } catch (error) {
      console.error('Error sending robot command:', error);
    }
  };
  
  // Reset the idle timer
  const resetIdleTimer = () => {
    // Clear any existing timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    // Set new timer - return to PresentationModule after 20 seconds of inactivity
    idleTimerRef.current = setTimeout(async () => {
      // Send robot command before entering presentation mode
      await sendRobotCommand(false);
      setIsIdle(true);
    }, 30000); // 20 seconds
  };
  
  // Set to presentation mode after inactivity
  useEffect(() => {
    // Handle user activity
    const handleActivity = async () => {
      if (isIdle) {
        setIsIdle(false);
        
        // Send command to robot when user interacts with screen
        await sendRobotCommand(true);
      }
      resetIdleTimer();
    };
    
    // Set up event listeners
    window.addEventListener('click', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    // window.addEventListener('mousemove', handleActivity);
    
    // Initial timer setup
    if (!isIdle) {
      resetIdleTimer();
    }
    
    // Cleanup
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      // window.removeEventListener('mousemove', handleActivity);
    };
  }, [isIdle]);

  if (isIdle) {
  
    return <PresentationModule onInteraction={() => setIsIdle(false)} />;
  }
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };
  
  return (
    <Box className={styles.pageContainer}>
      {/* Hero section with elegant gradient overlay */}
      <Box className={styles.heroSection}>
        <Container maxWidth="lg">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Logos Section */}
            <Box sx={{ mb: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: { xs: 2, sm: 3 },
                    mb: { xs: 2, sm: 3 }
                  }}
                >
                  <Box 
                    component="img"
                    src="/images/logo2.png" 
                    alt="Logo 2"
                    sx={{ 
                      height: { xs: '60px', sm: '70px', md: '120px' },
                      width: 'auto',
                      filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
                    }}
                  />
                </Box>
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                className={styles.heroTitle}
                sx={{ 
                  fontWeight: 500,
                  fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }
                }}
              >
                {t('welcome')}
              </Typography>
              
              <Divider 
                sx={{ 
                  width: '120px', 
                  margin: '16px auto', 
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  height: '2px'
                }} 
              />

              <Button
                variant="contained"
                href="/gpt"
                className={styles.uniGptHeroButton}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  width: '100%',
                  mx: { xs: 0, sm: -2, md: -4 }, // Negative margins to make it wider
                  px: { xs: 2, sm: 4, md: 6 },   // Increased horizontal padding
                  mb: 2,
                }}
              >
                UniGPT
              </Button>
              
              {/* New Exam Schedule Button */}
              <Button
                variant="outlined"
                href="/exams"
                startIcon={<WarningIcon />}
                sx={{
                  width: '100%',
                  mx: { xs: 0, sm: -2, md: -4 },
                  px: { xs: 2, sm: 4, md: 6 },
                  mb: 3,
                  borderColor: '#FF8C00',
                  color: '#FF8C00',
                  backgroundColor: 'rgba(255, 140, 0, 0.05)',
                  borderWidth: '1px',
                  borderRadius: '12px',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 140, 0, 0.1)',
                    borderColor: '#FF8C00',
                  }
                }}
              >
                {t('examSchedule')}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
    
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 3, sm: 4, md: 5 },  // Increased vertical padding 
          mb: { xs: 4, sm: 5 }          // Added bottom margin
        }}
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid 
            container 
            spacing={{ xs: 3, sm: 3, md: 4 }}  // Increased spacing between grid items
          >
            {[
              {
                title: 'services.order.title',
                description: 'services.order.description',
                button: 'services.order.button',
                href: '/services',
                color: '#3a86ff'
              },
              {
                title: 'services.directions.title',
                description: 'services.directions.description',
                button: 'services.directions.button',
                href: '/directions',
                color: '#8338ec'
              },
              {
                title: 'services.information.title',
                description: 'services.information.description',
                button: 'services.information.button',
                href: '/information',
                color: '#ff006e'
              },
              {
                title: 'services.help.title',
                description: 'services.help.description',
                button: 'services.help.button',
                href: '/help',
                color: '#3a0ca3'
              }
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Box className={styles.serviceCard}>
                    {/* Decorative top border */}
                    <Box 
                      className={styles.cardTopBorder}
                      style={{ background: service.color }}
                    />
                    
                    <Box className={styles.cardContent}>
                      <div>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={styles.cardTitle}
                          sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                        >
                          {t(service.title)}
                        </Typography>
                        <Typography 
                          className={styles.cardDescription}
                          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                          {t(service.description)}
                        </Typography>
                      </div>
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          variant="contained"
                          href={service.href}
                          fullWidth
                          endIcon={<ArrowForwardIcon />}
                          className={styles.cardButton}
                          style={{ 
                            background: service.color,
                          }}
                          sx={{
                            '&:hover': {
                              background: service.color,
                              filter: 'brightness(1.1)'
                            },
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            py: { xs: 0.7, sm: 0.75 }
                          }}
                        >
                          {t(service.button)}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  // Use a default locale if none is provided
  const safeLocale = locale || 'tr';
  
  return {
    props: {
      ...(await serverSideTranslations(safeLocale, ['common'])),
    },
  };
}
