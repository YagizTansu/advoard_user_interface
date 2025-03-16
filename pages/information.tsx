import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Button,
  Divider,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

// Animation variants
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

export default function Information() {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const infoCategories = [
    { 
      id: 'academic',
      title: 'information.academic.title', 
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#ff006e' }} />,
      items: [
        { title: 'information.academic.faculties', content: 'information.academic.facultiesContent' },
        { title: 'information.academic.departments', content: 'information.academic.departmentsContent' },
        { title: 'information.academic.programs', content: 'information.academic.programsContent' }
      ]
    },
    { 
      id: 'events',
      title: 'information.events.title', 
      icon: <EventIcon sx={{ fontSize: 40, color: '#ff006e' }} />,
      items: [
        { title: 'information.events.upcoming', content: 'information.events.upcomingContent' },
        { title: 'information.events.calendar', content: 'information.events.calendarContent' }
      ]
    },
    { 
      id: 'resources',
      title: 'information.resources.title', 
      icon: <LibraryBooksIcon sx={{ fontSize: 40, color: '#ff006e' }} />,
      items: [
        { title: 'information.resources.library', content: 'information.resources.libraryContent' },
        { title: 'information.resources.online', content: 'information.resources.onlineContent' }
      ]
    },
    { 
      id: 'student',
      title: 'information.student.title', 
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#ff006e' }} />,
      items: [
        { title: 'information.student.clubs', content: 'information.student.clubsContent' },
        { title: 'information.student.services', content: 'information.student.servicesContent' }
      ]
    },
    { 
      id: 'campus',
      title: 'information.campus.title', 
      icon: <MapIcon sx={{ fontSize: 40, color: '#ff006e' }} />,
      items: [
        { title: 'information.campus.map', content: 'information.campus.mapContent' },
        { title: 'information.campus.facilities', content: 'information.campus.facilitiesContent' }
      ]
    },
    { 
      id: 'contact',
      title: 'information.contact.title', 
      icon: <InfoIcon sx={{ fontSize: 40, color: '#ff006e' }} />,
      items: [
        { title: 'information.contact.departments', content: 'information.contact.departmentsContent' },
        { title: 'information.contact.offices', content: 'information.contact.officesContent' }
      ]
    },
  ];

  return (
    <Box className={styles.pageContainer}>
      {/* 
      // Hero section with gradient overlay
      <Box 
        className={styles.heroSection} 
        sx={{ 
          height: '35vh',
          background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', mb: 2 }}>
              <Link href="/" passHref>
                <MuiLink color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center' }}>
                  {t('home')}
                </MuiLink>
              </Link>
              <Typography color="white">{t('services.information.title')}</Typography>
            </Breadcrumbs>

            <Typography 
              variant="h2" 
              component="h1" 
              className={styles.heroTitle}
              sx={{ fontWeight: 500 }}
            >
              {t('services.information.title')}
            </Typography>
            
            <Divider 
              sx={{ 
                width: '120px', 
                margin: '16px 0', 
                backgroundColor: 'rgba(255,255,255,0.7)',
                height: '2px'
              }} 
            />

            <Typography 
              variant="h5" 
              component="p" 
              className={styles.heroSubtitle}
              sx={{ mt: 2, fontWeight: 400, maxWidth: '80%' }}
            >
              {t('services.information.description')}
            </Typography>

            <Link href="/" passHref>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ 
                  mt: 3, 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {t('backToHome')}
              </Button>
            </Link>
          </motion.div>
        </Container>
        
        // Decorative elements
        <Box className={styles.decorativeCircle1} />
        <Box className={styles.decorativeCircle2} />
        <motion.div 
          className={styles.decorativeShape}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 0.7, duration: 1.2 }}
        />
      </Box>
      */}

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: 6, mt: 3, position: 'relative', zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {infoCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'visible',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#ff006e',
                        borderRadius: '2px 2px 0 0'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {category.icon}
                        <Typography variant="h5" component="h2" sx={{ ml: 1.5, fontWeight: 500 }}>
                          {t(category.title)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mt: 2 }}>
                        {category.items.map((item, i) => (
                          <Accordion 
                            key={i}
                            expanded={expanded === `${category.id}-panel-${i}`} 
                            onChange={handleAccordionChange(`${category.id}-panel-${i}`)}
                            sx={{
                              boxShadow: 'none',
                              '&:before': {
                                display: 'none',
                              },
                              mb: 1,
                              border: '1px solid rgba(0, 0, 0, 0.08)',
                              borderRadius: '8px !important',
                              overflow: 'hidden'
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${category.id}-content-${i}`}
                              id={`${category.id}-header-${i}`}
                              sx={{ 
                                backgroundColor: 'rgba(0,0,0,0.02)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255,0,110,0.05)'
                                }
                              }}
                            >
                              <Typography fontWeight={500}>{t(item.title)}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ py: 2 }}>
                              <Typography>{t(item.content)}</Typography>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
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
