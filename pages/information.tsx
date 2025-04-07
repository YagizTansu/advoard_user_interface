import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card,
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Fade,
  Tooltip,
  CircularProgress
} from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import styles from '../styles/information.module.css';

// Supabase
import { getAllInformationContent, InformationContentFull } from '../src/lib/supabase';

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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    } 
  }
};

// Map icon names from the database to MUI icon components
const iconMap: { [key: string]: React.ReactNode } = {
  School: <SchoolIcon className={styles.categoryIcon} />,
  Event: <EventIcon className={styles.categoryIcon} />,
  LibraryBooks: <LibraryBooksIcon className={styles.categoryIcon} />,
  People: <PeopleIcon className={styles.categoryIcon} />,
  Map: <MapIcon className={styles.categoryIcon} />,
  Info: <InfoIcon className={styles.categoryIcon} />
};

export default function Information({ initialData }: { initialData?: InformationContentFull[] }) {
  const { t, i18n } = useTranslation('common');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<InformationContentFull[]>([]);
  const [informationData, setInformationData] = useState<InformationContentFull[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLanguage = i18n.language || 'en';
  const isEnglish = currentLanguage.startsWith('en');

  // Fetch data if not provided through props
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const data = await getAllInformationContent();
          setInformationData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching information data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [initialData]);

  // Filter categories based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCategories(informationData);
      return;
    }
    
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = informationData.filter(category => {
      const titleField = isEnglish ? 'title_en' : 'title_tr';
      const descField = isEnglish ? 'description_en' : 'description_tr';
      
      // Check if category title or description matches
      if (
        category[titleField].toLowerCase().includes(lowercasedSearch) ||
        category[descField].toLowerCase().includes(lowercasedSearch)
      ) {
        return true;
      }
      
      // Check if any item title or content matches
      return category.items.some(item => {
        const itemTitleField = isEnglish ? 'title_en' : 'title_tr';
        const itemContentField = isEnglish ? 'content_en' : 'content_tr';
        
        return (
          item[itemTitleField].toLowerCase().includes(lowercasedSearch) ||
          item[itemContentField].toLowerCase().includes(lowercasedSearch)
        );
      });
    });
    
    setFilteredCategories(filtered);
  }, [searchTerm, informationData, isEnglish]);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Display loading state while data is being fetched
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.pageContainer}>
      {/* More minimal hero section */}
      <Box className={styles.headerSection}>
        <Box className={styles.headerOverlay} />
        <Container maxWidth="lg">
          <Box className={styles.headerContent}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h5"
                component="h1" 
                className={styles.pageTitle}
                gutterBottom
              >
                {t('information.pageTitle')}
              </Typography>
              
              <Typography 
                variant="body2"
                className={styles.pageDescription}
                gutterBottom
              >
                {t('information.pageDescription')}
              </Typography>
              
              <Box className={styles.searchContainer}>
                <TextField
                  fullWidth
                  placeholder={t('information.searchPlaceholder')}
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  size="small"
                  InputProps={{
                    className: styles.searchInput,
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon className={styles.searchIcon} fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Breadcrumbs navigation */}
        <Box className={styles.breadcrumbContainer}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tooltip title={t('common.back')}>
              <IconButton 
                component={Link} 
                href="/"
                className={styles.backButton}
                size={isMobile ? "small" : "medium"}
              >
                <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>
          </motion.div>
          
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
        <Box className={styles.mainContent}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={styles.categoriesGrid}
          >
            <Grid container spacing={3}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => {
                  const titleField = isEnglish ? 'title_en' : 'title_tr';
                  const descField = isEnglish ? 'description_en' : 'description_tr';
                  const icon = iconMap[category.icon_name] || <InfoIcon className={styles.categoryIcon} />;
                  
                  // Generate dynamic style for the category icon container
                  const iconContainerStyle = {
                    backgroundColor: `${category.color_code}15`, // 15% opacity
                    color: category.color_code
                  };
                  
                  // Make sure items array exists
                  const items = category.items || [];
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                      <motion.div 
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={styles.categoryCard} elevation={0}>
                          <Box className={styles.cardHeader}>
                            <Box 
                              className={styles.categoryIconContainer}
                              style={iconContainerStyle}
                            >
                              {icon}
                            </Box>
                            <Typography 
                              variant="h6" 
                              component="h2" 
                              className={styles.categoryTitle}
                            >
                              {category[titleField]}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ fontSize: '0.9rem' }}
                            >
                              {category[descField]}
                            </Typography>
                          </Box>
                          
                          <Box className={styles.cardContent}>
                            {items.length > 0 ? (
                              items.map((item, i) => {
                                const itemTitleField = isEnglish ? 'title_en' : 'title_tr';
                                const itemContentField = isEnglish ? 'content_en' : 'content_tr';
                                
                                return (
                                  <Accordion 
                                    key={i}
                                    expanded={expanded === `${category.id}-panel-${i}`} 
                                    onChange={handleAccordionChange(`${category.id}-panel-${i}`)}
                                    className={styles.accordion}
                                    disableGutters
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`${category.id}-content-${i}`}
                                      id={`${category.id}-header-${i}`}
                                      className={styles.accordionSummary}
                                    >
                                      <Typography className={styles.accordionTitle}>
                                        {item[itemTitleField]}
                                        {item.subitems && item.subitems.length > 0 && (
                                          <Box component="span" sx={{ 
                                            ml: 1, 
                                            backgroundColor: theme.palette.primary.main, 
                                            color: 'white',
                                            fontSize: '0.7rem',
                                            padding: '1px 6px',
                                            borderRadius: '10px',
                                            verticalAlign: 'middle'
                                          }}>
                                            {item.subitems.length}
                                          </Box>
                                        )}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={styles.accordionDetails}>
                                      <Typography className={styles.accordionContent}>
                                        {item[itemContentField]}
                                      </Typography>
                                      
                                      {/* Render subitems if available */}
                                      {item.subitems && item.subitems.length > 0 && (
                                        <Box sx={{ mt: 2, borderTop: '1px solid rgba(0,0,0,0.08)', pt: 2 }}>
                                          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                            {t('information.subitems')}
                                          </Typography>
                                          
                                          {item.subitems.map((subitem, subIndex) => (
                                            <Accordion 
                                              key={subIndex}
                                              className={styles.subAccordion}
                                              disableGutters
                                              elevation={0}
                                              sx={{ 
                                                backgroundColor: 'rgba(0,0,0,0.02)', 
                                                mb: 1,
                                                '&:before': { display: 'none' }
                                              }}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon fontSize="small" />}
                                                sx={{ minHeight: '48px !important', p: '0 12px' }}
                                              >
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                  {subitem[itemTitleField]}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails sx={{ pt: 0, pb: 2, px: 2 }}>
                                                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                                  {subitem[itemContentField]}
                                                </Typography>
                                              </AccordionDetails>
                                            </Accordion>
                                          ))}
                                        </Box>
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                );
                              })
                            ) : (
                              <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                                {t('information.noItemsAvailable')}
                              </Typography>
                            )}
                          </Box>
                          
                          <Box className={styles.cardFooter}>
                            <Button 
                              component={Link}
                              href={`/information/${category.id}`}
                              color="primary" 
                              endIcon={<ArrowForwardIcon />}
                              className={styles.moreButton}
                              size="small"
                            >
                              {t('common.learnMore')}
                            </Button>
                          </Box>
                        </Card>
                      </motion.div>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <Fade in={true} timeout={500}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      py: 6,
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: 2,
                      mb: 2 
                    }}>
                      <Typography variant="h6" gutterBottom color="textSecondary">
                        {t('information.noResults')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {t('information.tryAnotherSearch')}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => setSearchTerm('')}
                      >
                        {t('common.clearSearch')}
                      </Button>
                    </Box>
                  </Fade>
                </Grid>
              )}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

// Fetch data at build time for faster page loads
export async function getStaticProps({ locale }: { locale?: string }) {
  const safeLocale = locale || 'tr';
  
  // Fetch information data
  let informationData: InformationContentFull[] = [];
  
  try {
    informationData = await getAllInformationContent();
    console.log(`Pre-fetched ${informationData.length} categories with items`);
  } catch (error) {
    console.error('Error pre-fetching information data:', error);
  }
  
  return {
    props: {
      ...(await serverSideTranslations(safeLocale, ['common'])),
      initialData: informationData,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
}
