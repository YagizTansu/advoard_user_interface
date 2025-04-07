import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container, 
  Breadcrumbs,
  Link as MuiLink,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import styles from '../../styles/information.module.css';

// Supabase
import { getAllInformationContent, InformationContentFull, InformationItem } from '../../src/lib/supabase';

// Icon map for category icons
const iconMap: { [key: string]: React.ReactNode } = {
  School: <SchoolIcon fontSize="large" />,
  Event: <EventIcon fontSize="large" />,
  LibraryBooks: <LibraryBooksIcon fontSize="large" />,
  People: <PeopleIcon fontSize="large" />,
  Map: <MapIcon fontSize="large" />,
  Info: <InfoIcon fontSize="large" />
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`category-tabpanel-${index}`}
      aria-labelledby={`category-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  };
}

export default function CategoryDetail({ categories }: { categories: InformationContentFull[] }) {
  const router = useRouter();
  const { id } = router.query;
  const { t, i18n } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLanguage = i18n.language || 'en';
  const isEnglish = currentLanguage.startsWith('en');
  
  const [category, setCategory] = useState<InformationContentFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  // Find the category from the fetched categories
  useEffect(() => {
    if (id && categories.length > 0) {
      const foundCategory = categories.find(cat => cat.id === id);
      setCategory(foundCategory || null);
      setLoading(false);
    }
  }, [id, categories]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {t('information.categoryNotFound')}
        </Alert>
        <Box sx={{ mt: 2 }}>
          <Link href="/information" passHref>
            <MuiLink component="a">
              {t('common.backToInformation')}
            </MuiLink>
          </Link>
        </Box>
      </Container>
    );
  }

  const titleField = isEnglish ? 'title_en' : 'title_tr';
  const descField = isEnglish ? 'description_en' : 'description_tr';
  const icon = iconMap[category.icon_name] || <InfoIcon fontSize="large" />;
  const items = category.items || [];

  return (
    <Box className={styles.pageContainer}>
      {/* Hero section */}
      <Box 
        className={styles.detailHeaderSection} 
        sx={{ 
          backgroundColor: `${category.color_code}15`, // 15% opacity
          borderBottom: `4px solid ${category.color_code}`
        }}
      >
        <Container maxWidth="lg">
          <Box className={styles.headerContent}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    backgroundColor: category.color_code, 
                    color: '#fff', 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  {icon}
                </Box>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  className={styles.detailPageTitle}
                >
                  {category[titleField]}
                </Typography>
              </Box>
              
              <Typography 
                variant="body1" 
                className={styles.detailPageDescription}
              >
                {category[descField]}
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Breadcrumbs navigation */}
        <Box className={styles.breadcrumbContainer}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <IconButton 
              component={Link} 
              href="/information"
              className={styles.backButton}
              size={isMobile ? "small" : "medium"}
            >
              <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
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
            <MuiLink 
              component={Link} 
              href="/information"
              underline="hover" 
              color="inherit"
            >
              {t('nav.information')}
            </MuiLink>
            <Typography color="text.primary">
              {category[titleField]}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Main content */}
        <Box sx={{ mt: 4 }}>
          <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            {/* Tabs for switching between list view and grid view */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="category view tabs"
                sx={{
                  '& .MuiTab-root': {
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    minWidth: { xs: 'auto', md: 120 }
                  }
                }}
              >
                <Tab label={t('information.listView')} {...a11yProps(0)} />
                <Tab label={t('information.detailedView')} {...a11yProps(1)} />
              </Tabs>
            </Box>

            {/* List View Tab */}
            <TabPanel value={tabValue} index={0}>
              {items.length > 0 ? (
                items.map((item: InformationItem, index: number) => {
                  const itemTitleField = isEnglish ? 'title_en' : 'title_tr';
                  const itemContentField = isEnglish ? 'content_en' : 'content_tr';
                  
                  return (
                    <Accordion 
                      key={item.id}
                      expanded={expanded === `panel-${item.id}`} 
                      onChange={handleAccordionChange(`panel-${item.id}`)}
                      sx={{ 
                        mb: 1,
                        '&:last-child': { mb: 0 },
                        border: '1px solid rgba(0,0,0,0.08)',
                        '&:before': { display: 'none' }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${item.id}-content`}
                        id={`panel${item.id}-header`}
                      >
                        <Typography sx={{ fontWeight: 500 }}>
                          {item[itemTitleField]}
                          {item.subitems && item.subitems.length > 0 && (
                            <Box component="span" sx={{ 
                              ml: 1, 
                              backgroundColor: category.color_code,
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
                      <AccordionDetails>
                        <Typography sx={{ mb: 2 }}>
                          {item[itemContentField]}
                        </Typography>
                        
                        {/* Subitems */}
                        {item.subitems && item.subitems.length > 0 && (
                          <Box sx={{ mt: 3 }}>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                              {t('information.subitems')}
                            </Typography>
                            
                            {item.subitems.map((subitem) => {
                              const subitemTitleField = isEnglish ? 'title_en' : 'title_tr';
                              const subitemContentField = isEnglish ? 'content_en' : 'content_tr';
                              
                              return (
                                <Box key={subitem.id} sx={{ mb: 2, pb: 2, borderBottom: '1px dashed rgba(0,0,0,0.08)' }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 500, color: theme.palette.primary.main }}>
                                    {subitem[subitemTitleField]}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    {subitem[subitemContentField]}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {t('information.noItemsAvailable')}
                  </Typography>
                </Box>
              )}
            </TabPanel>

            {/* Detailed View Tab */}
            <TabPanel value={tabValue} index={1}>
              {items.length > 0 ? (
                items.map((item, index) => {
                  const itemTitleField = isEnglish ? 'title_en' : 'title_tr';
                  const itemContentField = isEnglish ? 'content_en' : 'content_tr';
                  
                  return (
                    <Paper 
                      key={item.id} 
                      elevation={0} 
                      sx={{ 
                        mb: 4, 
                        p: 3,
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderLeft: `4px solid ${category.color_code}`
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                        {item[itemTitleField]}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        {item[itemContentField]}
                      </Typography>
                      
                      {/* Subitems as cards */}
                      {item.subitems && item.subitems.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                          <Divider sx={{ mb: 3 }} />
                          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            {t('information.relatedInformation')}
                          </Typography>
                          
                          {item.subitems.map((subitem) => {
                            const subitemTitleField = isEnglish ? 'title_en' : 'title_tr';
                            const subitemContentField = isEnglish ? 'content_en' : 'content_tr';
                            
                            return (
                              <Box 
                                key={subitem.id} 
                                sx={{ 
                                  mb: 2, 
                                  p: 2, 
                                  backgroundColor: 'rgba(0,0,0,0.02)', 
                                  borderRadius: 1 
                                }}
                              >
                                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                  {subitem[subitemTitleField]}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {subitem[subitemContentField]}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Paper>
                  );
                })
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {t('information.noItemsAvailable')}
                  </Typography>
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export async function getStaticPaths() {
  try {
    const categories = await getAllInformationContent();
    const paths = categories.map((category) => ({
      params: { id: category.id },
    }));

    return {
      paths,
      fallback: 'blocking', // Show a fallback while loading
    };
  } catch (error) {
    console.error('Error generating category paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params, locale }: { params: { id: string }, locale?: string }) {
  const safeLocale = locale || 'tr';
  
  try {
    const allCategories = await getAllInformationContent();
    
    return {
      props: {
        ...(await serverSideTranslations(safeLocale, ['common'])),
        categories: allCategories,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      props: {
        ...(await serverSideTranslations(safeLocale, ['common'])),
        categories: [],
      },
      revalidate: 3600,
    };
  }
}
