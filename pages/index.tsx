import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Grid, Container, Fade, IconButton, Divider } from '@mui/material';
import PresentationModule from '../components/modules/presentation/PresentationModule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from '../styles/index.module.css';

export default function Home() {
  const { t } = useTranslation('common');
  const [isIdle, setIsIdle] = useState(true);
  
  // Set to presentation mode after inactivity
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setIsIdle(true);
    }, 60000); // 1 minute
    
    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
    };
    
    window.addEventListener('click', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    // window.addEventListener('mousemove', handleActivity);
    
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      // window.removeEventListener('mousemove', handleActivity);
    };
  }, []);

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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Typography 
                variant="subtitle1" 
                component="div"
                className={styles.universityNameEnglish}
                sx={{ 
                  fontWeight: 900, 
                  letterSpacing: 5,
                  mb: 3,
                }}
              >
                IZMIR UNIVERSITY OF ECONOMICS
              </Typography>
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
                sx={{ fontWeight: 500 }}
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

              <Typography 
                variant="h5" 
                component="p" 
                className={styles.heroSubtitle}
                sx={{ mt: 2, fontWeight: 400 }}
              >
                {t('selectService')}
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
        
        {/* Enhanced decorative elements */}
        <Box className={styles.decorativeCircle1} />
        <Box className={styles.decorativeCircle2} />
        <motion.div 
          className={styles.decorativeShape}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 0.7, duration: 1.2 }}
        />
        <motion.div 
          className={styles.decorativeShape2}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 0.9, duration: 1.2 }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} className="mt-4">
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
                        >
                          {t(service.title)}
                        </Typography>
                        <Typography className={styles.cardDescription}>
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
                            }
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
