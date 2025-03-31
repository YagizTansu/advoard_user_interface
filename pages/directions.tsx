import { SetStateAction, useState } from 'react';
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

// Define building type
interface Building {
  id: number;
  name: string;
  floor: string;
  type: 'academic' | 'administrative';
  description: string;
}

// Building information component
const BuildingInfo = ({ building, active, onClick }: {
  building: Building;
  active: boolean;
  onClick: (id: number) => void;
}) => {
  return (
    <Card 
      elevation={active ? 4 : 1} 
      className={`${directionStyles.buildingCard} ${active ? directionStyles.buildingCardActive : ''} ${directionStyles.buildingCardElevated}`}
      onClick={() => onClick(building.id)}
    >
      <CardContent>
        <Box className={directionStyles.buildingContent}>
          <Box className={directionStyles.buildingIconBox}>
            {building.type === 'academic' ? 
              <SchoolIcon /> : 
              <ApartmentIcon />
            }
          </Box>
          <Box>
            <Typography variant="subtitle1" className={directionStyles.buildingName}>
              {building.name}
            </Typography>
            <Typography variant="body2" className={directionStyles.buildingDetails}>
              {building.floor} {building.type === 'academic' ? '• Academic' : '• Administrative'}
            </Typography>
          </Box>
        </Box>
        
        {active && (
          <Fade in={active}>
            <Box>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" className={directionStyles.buildingDescription}>
                {building.description}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<NavigationIcon />}
                className={directionStyles.directionsButton}
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

  const handleBuildingClick = (id: SetStateAction<null>) => {
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
      
      <Box className={directionStyles.pageContainer}>
        <Box className={directionStyles.navigationContainer}>
          <IconButton 
            component={Link} 
            href="/"
            className={directionStyles.backButton}
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
            <Typography color="text.primary">{t('nav.directions')}</Typography>
          </Breadcrumbs>
        </Box>
        
        <Container maxWidth="lg" className={directionStyles.contentSection}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              {/* Sidebar with building list */}
              <Grid item xs={12} md={4}>
                <Paper className={directionStyles.sidebarPaper} elevation={3}>
                  {/* Search input placed before tabs */}
                  <Box className={directionStyles.searchBox}>
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
                    className={directionStyles.tabsContainer}
                    classes={{ indicator: directionStyles.tabIndicator }}
                  >
                    <Tab label={t('directions.all')} className={activeTab === 0 ? directionStyles.selectedTab : ''} />
                    <Tab label={t('directions.academic')} className={activeTab === 1 ? directionStyles.selectedTab : ''} />
                    <Tab label={t('directions.administrative')} className={activeTab === 2 ? directionStyles.selectedTab : ''} />
                  </Tabs>
                </Paper>
                
                <Box sx={{ px: 1 }}>
                  <Typography variant="subtitle2" className={directionStyles.resultsCount}>
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
                    <Box className={directionStyles.noResultsBox}>
                      <LocationOnIcon className={directionStyles.noResultsIcon} />
                      <Typography variant="body1">
                        {t('directions.noLocationsFound')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              {/* Map section */}
              <Grid item xs={12} md={8}>
                <Paper className={directionStyles.mapPaper} elevation={2}>
                  <Box className={directionStyles.mapHeader}>
                    <Typography variant="h6" component="h2" className={directionStyles.mapTitle}>
                      {t('directions.campusMap')}
                    </Typography>
                    <Chip 
                      icon={<DirectionsIcon />} 
                      label={t('directions.getDirections')} 
                      variant="outlined" 
                      className={directionStyles.locationChip}
                    />
                  </Box>
                  
                  <MapComponent />
                  
                  <Box>
                    <Typography variant="subtitle1" className={directionStyles.destinationsTitle}>
                      {t('directions.commonDestinations')}
                    </Typography>
                    <Grid container spacing={2}>
                      {['Main Entrance', 'Library', 'Cafeteria', 'Administrative Building'].map((destination, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper className={directionStyles.destinationItem}>
                            <PinDropIcon className={directionStyles.destinationIcon} />
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
