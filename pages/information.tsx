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
  Link as MuiLink,
  IconButton
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
import styles from '../styles/information.module.css';

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
      icon: <SchoolIcon className={styles.categoryIcon} />,
      items: [
        { title: 'information.academic.faculties', content: 'information.academic.facultiesContent' },
        { title: 'information.academic.departments', content: 'information.academic.departmentsContent' },
        { title: 'information.academic.programs', content: 'information.academic.programsContent' }
      ]
    },
    { 
      id: 'events',
      title: 'information.events.title', 
      icon: <EventIcon className={styles.categoryIcon} />,
      items: [
        { title: 'information.events.upcoming', content: 'information.events.upcomingContent' },
        { title: 'information.events.calendar', content: 'information.events.calendarContent' }
      ]
    },
    { 
      id: 'resources',
      title: 'information.resources.title', 
      icon: <LibraryBooksIcon className={styles.categoryIcon} />,
      items: [
        { title: 'information.resources.library', content: 'information.resources.libraryContent' },
        { title: 'information.resources.online', content: 'information.resources.onlineContent' }
      ]
    },
    { 
      id: 'student',
      title: 'information.student.title', 
      icon: <PeopleIcon className={styles.categoryIcon} />,
      items: [
        { title: 'information.student.clubs', content: 'information.student.clubsContent' },
        { title: 'information.student.services', content: 'information.student.servicesContent' }
      ]
    },
    { 
      id: 'campus',
      title: 'information.campus.title', 
      icon: <MapIcon className={styles.categoryIcon} />,
      items: [
        { title: 'information.campus.map', content: 'information.campus.mapContent' },
        { title: 'information.campus.facilities', content: 'information.campus.facilitiesContent' }
      ]
    },
    { 
      id: 'contact',
      title: 'information.contact.title', 
      icon: <InfoIcon className={styles.categoryIcon} />,
      items: [
        { title: 'information.contact.departments', content: 'information.contact.departmentsContent' },
        { title: 'information.contact.offices', content: 'information.contact.officesContent' }
      ]
    },
  ];

  return (
    <Box className={styles.pageContainer}>
      {/* Page header */}
      <Box className={styles.pageHeader}>
        <IconButton 
          component={Link} 
          href="/"
          className={styles.backButton}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <Breadcrumbs 
          aria-label="breadcrumb"
          sx={{ 
            '& .MuiBreadcrumbs-ol': { flexWrap: { xs: 'wrap', sm: 'nowrap' } },
            '& .MuiBreadcrumbs-li': { fontSize: { xs: '0.875rem', sm: '1rem' } }
          }}
        >
          <MuiLink 
            component={Link} 
            href="/"
            underline="hover" 
            color="inherit"
          >
            {t('nav.home')}
          </MuiLink>
          <Typography color="text.primary">{t('nav.information')}</Typography>
        </Breadcrumbs>
      </Box>
      {/* Main content */}
      <Container maxWidth="lg" className={styles.mainContent}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {infoCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={2}
                    className={styles.categoryCard}
                  >
                    <CardContent 
                      className={styles.cardContent}
                      sx={{ padding: { xs: '16px', sm: '24px' } }}
                    >
                      <Box 
                        className={styles.categoryHeader}
                        sx={{ 
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          mb: { xs: 2, sm: 3 }
                        }}
                      >
                        {category.icon}
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          className={styles.categoryTitle}
                          sx={{ 
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                            mt: { xs: 1, sm: 0 },
                            ml: { xs: 0, sm: 2 }
                          }}
                        >
                          {t(category.title)}
                        </Typography>
                      </Box>
                      
                      <Box 
                        className={styles.accordionContainer}
                        sx={{ mt: { xs: 1, sm: 2 } }}
                      >
                        {category.items.map((item, i) => (
                          <Accordion 
                            key={i}
                            expanded={expanded === `${category.id}-panel-${i}`} 
                            onChange={handleAccordionChange(`${category.id}-panel-${i}`)}
                            className={styles.accordion}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${category.id}-content-${i}`}
                              id={`${category.id}-header-${i}`}
                              className={styles.accordionSummary}
                              sx={{ padding: { xs: '0 12px', sm: '0 16px' } }}
                            >
                              <Typography 
                                className={styles.accordionTitle}
                                sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                              >
                                {t(item.title)}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails 
                              className={styles.accordionDetails}
                              sx={{ padding: { xs: '8px 12px 16px', sm: '8px 16px 16px' } }}
                            >
                              <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                {t(item.content)}
                              </Typography>
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
