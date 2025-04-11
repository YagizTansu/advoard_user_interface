import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Box, Typography, Container, Accordion, AccordionSummary, 
  AccordionDetails, Button, Grid, Divider, TextField, Paper,
  IconButton, Breadcrumbs
} from '@mui/material';
import MuiLink from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import helpStyles from '../styles/help.module.css';

export default function Help() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle inactivity timeout
  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    
    // Set timeout for 20 seconds of inactivity
    inactivityTimeoutRef.current = setTimeout(() => {
      router.push('/');
    }, 20000); // 20 seconds
  };

  // Set up event listeners for user activity
  useEffect(() => {
    // Initial setup of the timer
    resetInactivityTimer();
    
    // Event listeners for user interaction
    const userActivityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    // Function to handle user activity
    const handleUserActivity = () => {
      resetInactivityTimer();
    };
    
    // Add event listeners
    userActivityEvents.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });
    
    // Clean up
    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      
      userActivityEvents.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [router]);

  const handleAccordionChange = 
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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

  const helpCategories = [
    {
      id: 'general',
      title: 'help.categories.general.title',
      color: '#3a86ff',
      questions: [
        { 
          q: 'help.categories.general.q1', 
          a: 'help.categories.general.a1' 
        },
        { 
          q: 'help.categories.general.q2', 
          a: 'help.categories.general.a2' 
        },
        { 
          q: 'help.categories.general.q3', 
          a: 'help.categories.general.a3' 
        }
      ]
    },
    {
      id: 'services',
      title: 'help.categories.services.title',
      color: '#8338ec',
      questions: [
        { 
          q: 'help.categories.services.q1', 
          a: 'help.categories.services.a1' 
        },
        { 
          q: 'help.categories.services.q2', 
          a: 'help.categories.services.a2' 
        }
      ]
    },
    {
      id: 'technical',
      title: 'help.categories.technical.title',
      color: '#ff006e',
      questions: [
        { 
          q: 'help.categories.technical.q1', 
          a: 'help.categories.technical.a1' 
        },
        { 
          q: 'help.categories.technical.q2', 
          a: 'help.categories.technical.a2' 
        },
        { 
          q: 'help.categories.technical.q3', 
          a: 'help.categories.technical.a3' 
        }
      ]
    }
  ];

  // Filter questions based on search
  const filteredCategories = searchQuery 
    ? helpCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          t(q.q).toLowerCase().includes(searchQuery.toLowerCase()) ||
          t(q.a).toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : helpCategories;

  return (
    <Box className={helpStyles.pageContainer}>
      {/* Hero section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Box className={helpStyles.breadcrumbContainer}>
          <IconButton 
            component={Link} 
            href="/"
            sx={{ mr: { xs: 1, sm: 2 } }}
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
            <Typography color="text.primary">{t('nav.help')}</Typography>
          </Breadcrumbs>
        </Box>
      
        {/* Search box */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Box 
            className={helpStyles.searchBox}
            sx={{ 
              padding: { xs: '16px', sm: '24px' },
              margin: { xs: '16px 0', sm: '24px 0' }
            }}
          >
            <TextField
              fullWidth
              placeholder={t('help.searchPlaceholder')}
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                className: helpStyles.searchInput
              }}
            />
          </Box>
        </motion.div>
        
        {/* Help categories and FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={helpStyles.categoryContainer}
                style={{ marginBottom: index < filteredCategories.length - 1 ? '24px' : '0' }}
              >
                <Paper 
                  className={helpStyles.categoryPaper}
                  sx={{ padding: { xs: '0 0 0 12px', sm: '0 0 0 16px' } }}
                >
                  <Box 
                    className={helpStyles.categoryIndicator}
                    sx={{ backgroundColor: category.color }}
                  />
                  
                  <Typography 
                    variant="h5" 
                    component="h2"
                    className={helpStyles.categoryTitle}
                    sx={{ 
                      color: category.color,
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                      padding: { xs: '16px 16px 8px', sm: '24px 24px 12px' }
                    }}
                  >
                    {t(category.title)}
                  </Typography>
                  
                  {category.questions.map((faq, idx) => (
                    <Accordion
                      key={idx}
                      expanded={expanded === `${category.id}-${idx}`}
                      onChange={handleAccordionChange(`${category.id}-${idx}`)}
                      elevation={0}
                      className={`${helpStyles.accordion} ${expanded === `${category.id}-${idx}` ? helpStyles.accordionExpanded : ''}`}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${category.id}-${idx}-content`}
                        id={`${category.id}-${idx}-header`}
                        className={helpStyles.accordionSummary}
                        classes={{
                          content: helpStyles.accordionSummaryContent
                        }}
                        sx={{ 
                          minHeight: { xs: '48px', sm: '56px' },
                          padding: { xs: '0 16px 0 4px', sm: '0 24px 0 8px' }
                        }}
                      >
                        <Typography 
                          className={helpStyles.accordionQuestion}
                          sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                        >
                          {t(faq.q)}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails 
                        className={helpStyles.accordionDetails}
                        sx={{ padding: { xs: '8px 16px 16px', sm: '12px 24px 24px' } }}
                      >
                        <Typography 
                          className={helpStyles.accordionAnswer}
                          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                        >
                          {t(faq.a)}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Paper>
              </motion.div>
            ))
          ) : (
            <Box className={helpStyles.noResults}>
              <Typography variant="h6">{t('help.noResults')}</Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => setSearchQuery('')}
              >
                {t('help.clearSearch')}
              </Button>
            </Box>
          )}
        </motion.div>
        
        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Box 
            className={helpStyles.contactSection}
            sx={{ 
              padding: { xs: '24px 16px', sm: '32px 24px', md: '48px 32px' },
              margin: { xs: '24px 0', sm: '32px 0', md: '48px 0' }
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              className={helpStyles.contactTitle}
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' } }}
            >
              {t('help.stillNeedHelp')}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              className={helpStyles.contactMessage}
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                maxWidth: { xs: '100%', sm: '80%', md: '60%' }
              }}
            >
              {t('help.contactMessage')}
            </Typography>
            
            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  className={helpStyles.contactCard}
                  sx={{ padding: { xs: '16px', sm: '24px' } }}
                >
                  <EmailIcon 
                    className={helpStyles.contactIcon}
                    sx={{ 
                      color: '#3a86ff',
                      fontSize: { xs: '2rem', sm: '2.5rem' } 
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    className={helpStyles.contactMethod}
                    sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                  >
                    {t('help.contactEmail')}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="mailto:support@iue.edu.tr"
                    className={helpStyles.contactLink}
                    sx={{ 
                      color: '#3a86ff',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    support@iue.edu.tr
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  className={helpStyles.contactCard}
                  sx={{ padding: { xs: '16px', sm: '24px' } }}
                >
                  <PhoneIcon 
                    className={helpStyles.contactIcon} 
                    sx={{ 
                      color: '#8338ec',
                      fontSize: { xs: '2rem', sm: '2.5rem' }
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    className={helpStyles.contactMethod}
                    sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                  >
                    {t('help.contactPhone')}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="tel:+902324888000"
                    className={helpStyles.contactLink}
                    sx={{ 
                      color: '#8338ec',
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    +90 232 488 8000
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
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
