import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Divider, 
  Paper, 
  IconButton, 
  Chip, 
  InputAdornment, 
  Fade, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Link as MuiLink,
  Breadcrumbs
} from '@mui/material';
import Head from 'next/head';
import SearchIcon from '@mui/icons-material/Search';
import NavigationIcon from '@mui/icons-material/Navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import Link from 'next/link';
import MapIcon from '@mui/icons-material/Map';
import styles from '../styles/Home.module.css';
import directionStyles from '../styles/directions.module.css';

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

// Map component with styled box
const MapComponent = () => {
  return (
    <Box className={directionStyles.mapContainer}>
      <MapIcon className={directionStyles.mapIcon} />
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
        Campus Map View
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Interactive map will be displayed here
      </Typography>
    </Box>
  );
};

// Building information component
const BuildingInfo = ({ building, active, onClick }) => {
  return (
    <Card 
      elevation={active ? 4 : 1} 
      className={`${directionStyles.buildingCard} ${active ? directionStyles.buildingCardActive : ''}`}
      onClick={() => onClick(building.id)}
      sx={{
        mb: 2,
        borderRadius: 2,
        overflow: 'visible',
        position: 'relative',
        '&::before': active ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: '#8338ec',
          borderRadius: '2px 2px 0 0'
        } : {}
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 42, 
              height: 42, 
              borderRadius: '50%', 
              backgroundColor: 'rgba(131, 56, 236, 0.1)',
              color: '#8338ec',
              mr: 2
            }}
          >
            {building.type === 'academic' ? 
              <SchoolIcon /> : 
              <ApartmentIcon />
            }
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {building.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {building.floor} {building.type === 'academic' ? '• Academic' : '• Administrative'}
            </Typography>
          </Box>
        </Box>
        
        {active && (
          <Fade in={active}>
            <Box>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" sx={{ mb: 2 }}>
                {building.description}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<NavigationIcon />}
                sx={{ 
                  color: '#8338ec',
                  borderColor: '#8338ec',
                  '&:hover': {
                    borderColor: '#8338ec',
                    backgroundColor: 'rgba(131, 56, 236, 0.05)'
                  }
                }}
              >
                Get Directions
              </Button>
            </Box>
          </Fade>
        )}
      </CardContent>
    </Card>
  );
};

export default function Directions() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [activeBuilding, setActiveBuilding] = useState(null);
  
  // Sample building data - would come from an API in production
  const buildings = [
    { id: 1, name: 'A Block', floor: '4 Floors', type: 'academic', description: 'Main lecture halls and faculty offices.' },
    { id: 2, name: 'B Block', floor: '3 Floors', type: 'academic', description: 'Computer labs and research facilities.' },
    { id: 3, name: 'C Block', floor: '5 Floors', type: 'academic', description: 'Library and study spaces.' },
    { id: 4, name: 'Admin Building', floor: '2 Floors', type: 'administrative', description: 'Student affairs and administration offices.' },
  ];

  // Filter buildings based on search and tab
  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 0 || (activeTab === 1 && building.type === 'academic') || (activeTab === 2 && building.type === 'administrative');
    return matchesSearch && matchesTab;
  });

  const handleBuildingClick = (id) => {
    setActiveBuilding(activeBuilding === id ? null : id);
  };

  // Create a simple string title for the page to avoid multiple children warning
  const pageTitle = `${t('directions.pageTitle')} | IUE`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Find your way around Izmir University of Economics campus" />
      </Head>
      
      <Box className={styles.pageContainer}>
        {/* 
        // Hero section with gradient overlay 
        <Box 
          className={styles.heroSection} 
          sx={{ 
            height: '35vh',
            background: 'linear-gradient(135deg, #8338ec 0%, #3a0ca3 100%)'
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
                <MuiLink 
                  component={Link} 
                  href="/" 
                  color="inherit" 
                  underline="hover" 
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {t('home')}
                </MuiLink>
                <Typography color="white">{t('directions.pageTitle')}</Typography>
              </Breadcrumbs>

              <Typography 
                variant="h2" 
                component="h1" 
                className={styles.heroTitle}
                sx={{ fontWeight: 500 }}
              >
                {t('directions.title')}
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
                {t('directions.subtitle')}
              </Typography>

              <Button
                component={Link}
                href="/"
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
        
        {/* Main content - Removed separate search section */}
        <Container maxWidth="lg" sx={{ py: 6, mt: 3, position: 'relative', zIndex: 10 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              {/* Sidebar with building list */}
              <Grid item xs={12} md={4}>
                <Paper 
                  sx={{ mb: 3, p: 2, borderRadius: 2 }} 
                  elevation={3}
                >
                  {/* Search input placed before tabs */}
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      placeholder={t('directions.searchPlaceholder')}
                      variant="outlined"
                      size="small"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'rgba(0,0,0,0.54)' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  
                  {/* Tabs below search */}
                  <Tabs 
                    value={activeTab} 
                    onChange={(e, val) => setActiveTab(val)}
                    variant="fullWidth"
                    sx={{
                      mt: 1,
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                      pt: 1,
                      '& .MuiTabs-indicator': {
                        backgroundColor: '#8338ec',
                      },
                      '& .MuiTab-root.Mui-selected': {
                        color: '#8338ec'
                      }
                    }}
                  >
                    <Tab label={t('directions.all')} />
                    <Tab label={t('directions.academic')} />
                    <Tab label={t('directions.administrative')} />
                  </Tabs>
                </Paper>
                
                <Box sx={{ px: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    {filteredBuildings.length} {t('directions.locationsFound')}
                  </Typography>
                  
                  <motion.div variants={containerVariants}>
                    {filteredBuildings.map(building => (
                      <motion.div key={building.id} variants={itemVariants}>
                        <BuildingInfo 
                          building={building} 
                          active={activeBuilding === building.id} 
                          onClick={handleBuildingClick}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {filteredBuildings.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
                      <LocationOnIcon sx={{ fontSize: 48, mb: 2, color: '#8338ec' }} />
                      <Typography variant="body1">
                        {t('directions.noLocationsFound')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              {/* Map section */}
              <Grid item xs={12} md={8}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'visible',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: '#8338ec',
                      borderRadius: '2px 2px 0 0'
                    }
                  }} 
                  elevation={2}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                      {t('directions.campusMap')}
                    </Typography>
                    <Chip 
                      icon={<DirectionsIcon />} 
                      label={t('directions.getDirections')} 
                      variant="outlined" 
                      sx={{ 
                        borderColor: '#8338ec',
                        color: '#8338ec',
                        '& .MuiChip-icon': {
                          color: '#8338ec'
                        }
                      }} 
                    />
                  </Box>
                  
                  <MapComponent />
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                      {t('directions.commonDestinations')}
                    </Typography>
                    <Grid container spacing={2}>
                      {['Main Entrance', 'Library', 'Cafeteria', 'Administrative Building'].map((destination, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper 
                            sx={{ 
                              p: 2, 
                              display: 'flex', 
                              alignItems: 'center', 
                              borderRadius: 2,
                              '&:hover': {
                                backgroundColor: 'rgba(131, 56, 236, 0.05)',
                                cursor: 'pointer'
                              }
                            }}
                          >
                            <PinDropIcon sx={{ mr: 1, color: '#8338ec' }} />
                            <Typography variant="body2">{destination}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  const safeLocale = locale || 'tr';
  
  return {
    props: {
      ...(await serverSideTranslations(safeLocale, ['common'])),
    },
  };
}
