import { SetStateAction, useState, useEffect } from 'react';
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
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import MapIcon from '@mui/icons-material/Map';
import directionStyles from '../styles/directions.module.css';
import { getBuildings, getCommonDestinations, getProfessorRooms, Building, CommonDestination, ProfessorRoom } from '../src/lib/supabase';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 30 
    } 
  }
};

// Map component with styled box
const MapComponent = () => {
  return (
    <motion.div 
      className={directionStyles.mapContainer}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <MapIcon className={directionStyles.mapIcon} />
      <Typography variant="body1" className={directionStyles.buildingNameText}>
        Campus Map View
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Interactive map will be displayed here
      </Typography>
    </motion.div>
  );
};

// Building information component
const BuildingInfo = ({ building, active, onClick }: {
  building: Building;
  active: boolean;
  onClick: (id: number) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Card 
        className={`${directionStyles.buildingCard} ${active ? directionStyles.buildingCardActive : ''} ${directionStyles.elevationOverride}`}
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
                <Divider className={directionStyles.dividerSpacing} />
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
    </motion.div>
  );
};

export default function Directions() {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [destinations, setDestinations] = useState<CommonDestination[]>([]);
  const [professorRooms, setProfessorRooms] = useState<ProfessorRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buildingsData, destinationsData, professorsData] = await Promise.all([
          getBuildings(),
          getCommonDestinations(),
          getProfessorRooms()
        ]);
        setBuildings(buildingsData);
        setDestinations(destinationsData);
        setProfessorRooms(professorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter buildings and professors based on search and tab
  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 0 || 
      (activeTab === 1 && building.type === 'academic') || 
      (activeTab === 2 && building.type === 'administrative');
    return matchesSearch && matchesTab;
  });

  const filteredProfessors = professorRooms.filter(professor => {
    const matchesSearch = professor.professor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         professor.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 0 || activeTab === 1; // Show in All and Academic tabs
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
            <Grid container spacing={3} className={directionStyles.gridSpacing}>
              {/* Sidebar with building list */}
              <Grid item xs={12} md={4}>
                <Paper className={directionStyles.sidebarPaper}>
                  {/* Search input placed before tabs */}
                  <Box className={directionStyles.searchBox}>
                    <TextField
                      className={directionStyles.searchTextField}
                      placeholder={t('directions.searchPlaceholder')}
                      variant="outlined"
                      size="small"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon className={directionStyles.searchAdornment} />
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
                
                <Box className={directionStyles.sidebarPadding}>
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
                <Paper className={directionStyles.mapPaper}>
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
                      {destinations.map((destination) => (
                        <Grid item xs={12} sm={6} key={destination.id}>
                          <Paper className={directionStyles.destinationItem}>
                            <PinDropIcon className={directionStyles.destinationIcon} />
                            <Typography variant="body2">{destination.name}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Professor Rooms - Only show in All and Academic tabs */}
                    {(activeTab === 0 || activeTab === 1) && (
                      <>
                        <Typography variant="subtitle1" className={directionStyles.destinationsTitle}>
                          {t('directions.professorRooms')}
                        </Typography>
                        <Grid container spacing={2}>
                          {filteredProfessors.map((professor) => (
                            <Grid item xs={12} sm={6} key={professor.id}>
                              <Paper className={directionStyles.destinationItem}>
                                <PersonIcon className={directionStyles.destinationIcon} />
                                <Box className={directionStyles.professorInfo}>
                                  <Typography variant="subtitle2">
                                    {professor.professor_name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {professor.room_number} • {professor.floor}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    {professor.department}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    {professor.office_hours}
                                  </Typography>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
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

export async function getServerSideProps({ locale }: { locale?: string }) {
  const safeLocale = locale || 'tr';
  
  return {
    props: {
      ...(await serverSideTranslations(safeLocale, ['common'])),
    },
  };
}
