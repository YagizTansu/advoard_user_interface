import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Box, Typography, Container, Accordion, AccordionSummary, 
  AccordionDetails, Button, Grid, Divider, TextField, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import styles from '../styles/Home.module.css';

export default function Help() {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <Box className={styles.pageContainer}>
      {/* Hero section */}
            <Box className={styles.pageContainer}>
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                          <IconButton 
                            component={Link} 
                            href="/"
                            sx={{ mr: 2 }}
                          >
                            <ArrowBackIcon />
                          </IconButton>
                          
                          <Breadcrumbs aria-label="breadcrumb">
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
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Search box */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              mb: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              borderRadius: 2,
              overflow: 'hidden'
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
                sx: { 
                  p: 0.5,
                  '& fieldset': { border: 'none' }
                }
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
                style={{ marginBottom: '2rem' }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    mb: 3,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '8px',
                      backgroundColor: category.color
                    }}
                  />
                  
                  <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{ 
                      fontWeight: 600,
                      mb: 2, 
                      pl: 1.5,
                      color: category.color
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
                      sx={{ 
                        mb: 1,
                        '&:before': { display: 'none' },
                        bgcolor: 'transparent',
                        '&.Mui-expanded': {
                          bgcolor: 'rgba(0,0,0,0.02)',
                          borderRadius: 2
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${category.id}-${idx}-content`}
                        id={`${category.id}-${idx}-header`}
                        sx={{ 
                          '&.Mui-expanded': { minHeight: 48 },
                          '& .MuiAccordionSummary-content.Mui-expanded': { my: 0.5 }
                        }}
                      >
                        <Typography sx={{ fontWeight: 500 }}>{t(faq.q)}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ pt: 0 }}>
                        <Typography 
                          sx={{ 
                            color: 'text.secondary',
                            whiteSpace: 'pre-line'
                          }}
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
            <Box sx={{ textAlign: 'center', py: 4 }}>
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
          <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              {t('help.stillNeedHelp')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              {t('help.contactMessage')}
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    height: '100%',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <EmailIcon sx={{ fontSize: 40, color: '#3a86ff', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>{t('help.contactEmail')}</Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="mailto:support@iue.edu.tr"
                    sx={{ 
                      color: '#3a86ff', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    support@iue.edu.tr
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    height: '100%',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    borderRadius: 2,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 40, color: '#8338ec', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>{t('help.contactPhone')}</Typography>
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href="tel:+902324888000"
                    sx={{ 
                      color: '#8338ec', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
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
