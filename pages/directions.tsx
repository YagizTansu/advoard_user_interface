import { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Tabs, 
  Tab, 
  Divider, 
  Paper, 
  IconButton, 
  Chip, 
  InputAdornment,
  Avatar,
  SwipeableDrawer,
  Skeleton,
  useMediaQuery,
  Tooltip,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavigationIcon from '@mui/icons-material/Navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from '@mui/material/styles';

import directionStyles from '../styles/directions.module.css';
import { getBuildings, getCommonDestinations, getProfessorRooms, Building, CommonDestination, ProfessorRoom } from '../src/lib/supabase';

// Enhanced map component with SVG support
const CampusMap = ({ selectedBuildingId, buildings, onBuildingSelect }: { 
  selectedBuildingId: string | null, 
  buildings: Building[], 
  onBuildingSelect: (id: string) => void 
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  // Position pins based on SVG viewBox (these would ideally come from your building data)
  const buildingPositions = useMemo(() => {
    // Manual mapping of building IDs to positions
    // You can edit these positions manually as needed
    const positions: { [key: string]: { x: number, y: number } } = {
      // Example positions - replace these with your desired coordinates
      'acfd1492-7cd8-4de0-bba3-fcfdda9c7402': { x: 230, y: 280 },
      '12bc7064-7eb2-43d4-9e5c-f2f372a17f85': { x: 270, y: 380 },
      '7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c': { x: 80, y: 300 },
      '4f972c6c-36f5-47c6-97ca-1df7992f1f53': { x: 380, y: 160 },
      '2d7ad5bb-e87d-442a-87d5-b805d790f0ad': { x: 200, y: 100 },
      'building-6': { x: 200, y: 250 },
      'building-7': { x: 300, y: 250 },
      'building-8': { x: 400, y: 250 },
      // Add more building positions as needed
    };
    
    // For any buildings that don't have manually defined positions,
    // assign a default position to avoid errors
    buildings.forEach(building => {
      if (!positions[building.id]) {
        positions[building.id] = { x: 0, y: 0 };
      }
    });
    
    return positions;
  }, [buildings]);

  // Handle SVG load
  const handleSvgLoad = () => {
    setMapLoaded(true);
  };

  // Handle zoom operations
  const handleZoom = (action: string) => {
    switch (action) {
      case 'in':
        setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
        break;
      case 'out':
        setZoomLevel(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
        break;
      case 'reset':
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        break;
      default:
        break;
    }
  };

  // Handle pan operations
  const handlePan = (dx: number, dy: number) => {
    setPanPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  return (
    <div className={directionStyles.mapWrapper}>
      <div className={directionStyles.mapOverlay}>
        <div className={directionStyles.mapControls}>
          <IconButton className={directionStyles.mapControlButton}>
            <MapIcon />
          </IconButton>
          <IconButton className={directionStyles.mapControlButton}>
            <LocationOnIcon />
          </IconButton>
        </div>
        
        <div 
          className={directionStyles.mapImageContainer} 
          ref={mapRef}
          style={{
            transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out'
          }}
        >
          <object 
            data="/images/kroki.svg" 
            type="image/svg+xml"
            className={directionStyles.svgMap}
            onLoad={handleSvgLoad}
            aria-label="Campus Map"
          />
          
          {mapLoaded && buildings.map(building => {
            const position = buildingPositions[building.id] || { x: 0, y: 0 };
            return (
              <Tooltip key={building.id} title={building.name}>
                <div 
                  className={`${directionStyles.mapPin} ${selectedBuildingId === building.id ? directionStyles.mapPinActive : ''}`}
                  style={{ 
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                  }}
                  onClick={() => onBuildingSelect(building.id)}
                >
                  <div className={directionStyles.mapPinDot} />
                  <div className={directionStyles.mapPinLabel}>{building.name.substring(0, 1)}</div>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
      
      {/* SVG Controls */}
      <div className={directionStyles.svgControls}>
        <IconButton 
          className={directionStyles.svgControlButton} 
          aria-label="Zoom in"
          onClick={() => handleZoom('in')}
        >
          <span className={directionStyles.svgControlIcon}>+</span>
        </IconButton>
        <IconButton 
          className={directionStyles.svgControlButton} 
          aria-label="Zoom out"
          onClick={() => handleZoom('out')}
        >
          <span className={directionStyles.svgControlIcon}>−</span>
        </IconButton>
        <IconButton 
          className={directionStyles.svgControlButton} 
          aria-label="Reset view"
          onClick={() => handleZoom('reset')}
        >
          <FilterListIcon className={directionStyles.svgControlIcon} />
        </IconButton>
      </div>
    </div>
  );
};

// Building card component with improved UX
const BuildingCard = ({ building, isActive, onSelect, onGetDirections }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <Card 
        className={`${directionStyles.buildingCard} ${isActive ? directionStyles.buildingCardActive : ''}`}
        onClick={() => onSelect(building.id)}
        elevation={isActive ? 3 : 1}
      >
        <CardContent className={directionStyles.buildingCardContent}>
          <Box className={directionStyles.buildingHeader}>
            <Box className={directionStyles.buildingTypeIconContainer}>
              {building.type === 'academic' ? 
                <SchoolIcon className={directionStyles.buildingTypeIcon} /> : 
                <ApartmentIcon className={directionStyles.buildingTypeIcon} />
              }
            </Box>
            <Box className={directionStyles.buildingInfo}>
              <Typography variant="h6" className={directionStyles.buildingName}>
                {building.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className={directionStyles.buildingCode}>
                {building.code || `${t('directions.building')} ${building.id.substring(0, 3)}`}
              </Typography>
            </Box>
          </Box>
          
          <Box className={directionStyles.buildingMetadata}>
            <Chip 
              size="small"
              label={building.floor} 
              className={directionStyles.buildingChip}
              variant="outlined"
            />
            <Chip 
              size="small"
              label={building.type === 'academic' ? t('directions.academic') : t('directions.administrative')}
              className={`${directionStyles.buildingChip} ${directionStyles.buildingTypeChip}`}
              variant="outlined"
            />
          </Box>
        </CardContent>
        
        <CardActions className={directionStyles.buildingCardActions}>
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<DirectionsIcon />}
            className={directionStyles.directionsButton}
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onGetDirections(building.id, 'building');
            }}
          >
            {t('directions.getDirections')}
          </Button>
          {!isActive && isMobile && (
            <Button
              size="small"
              className={directionStyles.infoButton}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(building.id);
              }}
            >
              <InfoIcon fontSize="small" />
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

// Professor card component
const ProfessorCard = ({ professor, onSelect, isActive, onGetDirections }) => {
  const { t } = useTranslation('common');
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`${directionStyles.professorCard} ${isActive ? directionStyles.professorCardActive : ''}`}
        onClick={() => onSelect(professor.id)}
      >
        <CardContent className={directionStyles.professorCardContent}>
          <Box className={directionStyles.professorHeader}>
            <Avatar className={directionStyles.professorAvatar}>
              {professor.professor_name.substring(0, 1)}
            </Avatar>
            <Box className={directionStyles.professorInfo}>
              <Typography variant="subtitle1" className={directionStyles.professorName}>
                {professor.professor_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className={directionStyles.professorDepartment}>
                {professor.department}
              </Typography>
            </Box>
          </Box>
          
          <Box className={directionStyles.professorLocation}>
            <LocationOnIcon fontSize="small" className={directionStyles.professorLocationIcon} />
            <Typography variant="body2" className={directionStyles.professorRoomNumber}>
              {professor.room_number} • {professor.floor}
            </Typography>
          </Box>

          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={directionStyles.professorDetails}
            >
              <Divider className={directionStyles.professorDivider} />
              
              <Box className={directionStyles.professorDetailItem}>
                <AccessTimeIcon fontSize="small" className={directionStyles.professorDetailIcon} />
                <Typography variant="body2">
                  {t('directions.officeHours')}: {professor.office_hours || t('directions.byAppointment')}
                </Typography>
              </Box>
              
              {professor.email && (
                <Box className={directionStyles.professorDetailItem}>
                  <EmailIcon fontSize="small" className={directionStyles.professorDetailIcon} />
                  <Typography variant="body2" className={directionStyles.professorEmail}>
                    {professor.email}
                  </Typography>
                </Box>
              )}
              
              {professor.phone && (
                <Box className={directionStyles.professorDetailItem}>
                  <PhoneIcon fontSize="small" className={directionStyles.professorDetailIcon} />
                  <Typography variant="body2">
                    {professor.phone}
                  </Typography>
                </Box>
              )}
            </motion.div>
          )}
        </CardContent>
        
        <CardActions className={directionStyles.professorCardActions}>
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<DirectionsIcon />}
            className={directionStyles.directionsButton}
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onGetDirections(professor.id, 'professor');
            }}
          >
            {t('directions.findOffice')}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

// Directions Panel Component
const DirectionsPanel = ({ directions, onClose }) => {
  const { t } = useTranslation('common');
  if (!directions) return null;
  
  return (
    <Paper className={directionStyles.directionsPanel}>
      <Box className={directionStyles.directionsPanelHeader}>
        <Typography variant="h6">{t('directions.directions')}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      
      <Box className={directionStyles.directionsInfo}>
        <Box className={directionStyles.directionsOverview}>
          <LocationOnIcon />
          <Box>
            <Typography variant="subtitle1">{directions.destination.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {directions.distance} • {directions.duration}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Box className={directionStyles.directionsSteps}>
        {directions.steps.map((step, index) => (
          <Box key={index} className={directionStyles.directionStep}>
            <Box className={directionStyles.stepNumberContainer}>
              <Typography className={directionStyles.stepNumber}>{index + 1}</Typography>
            </Box>
            <Typography variant="body2">{step}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

// Main page component
export default function Directions() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<string | null>(null); // 'building' or 'professor'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [professors, setProfessors] = useState<ProfessorRoom[]>([]);
  const [destinations, setDestinations] = useState<CommonDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingDirections, setShowingDirections] = useState(false);
  const [directions, setDirections] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [buildingsData, professorsData, destinationsData] = await Promise.all([
          getBuildings(),
          getProfessorRooms(),
          getCommonDestinations()
        ]);
        
        setBuildings(buildingsData);
        setProfessors(professorsData);
        setDestinations(destinationsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter data based on search and active tab
  const filteredData = useMemo(() => {
    const filteredBuildings = buildings.filter(building => {
      const matchesSearch = !searchQuery || 
        building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (building.code && building.code.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'academic' && building.type === 'academic') || 
        (activeTab === 'administrative' && building.type === 'administrative');
      
      // Don't show buildings when professors tab is selected
      return matchesSearch && matchesTab && activeTab !== 'professors';
    });

    const filteredProfessors = professors.filter(professor => {
      const matchesSearch = !searchQuery || 
        professor.professor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professor.room_number.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Show professors in "all" or "professors" tabs only
      const matchesTab = activeTab === 'all' || activeTab === 'professors';
      
      return matchesSearch && matchesTab;
    });

    return {
      buildings: filteredBuildings,
      professors: filteredProfessors
    };
  }, [searchQuery, activeTab, buildings, professors]);

  // Handle item selection
  const handleItemSelect = (id: string, type: string) => {
    if (selectedItem === id && selectedItemType === type) {
      setSelectedItem(null);
      setSelectedItemType(null);
      setIsDrawerOpen(false);
    } else {
      setSelectedItem(id);
      setSelectedItemType(type);
      if (isMobile) {
        setIsDrawerOpen(true);
      }
    }
  };

  // Handle getting directions
  const handleGetDirections = (id, type) => {
    // Get the selected item details
    const item = type === 'building' 
      ? buildings.find(b => b.id === id)
      : professors.find(p => p.id === id);
    
    if (!item) return;
    
    // Create mock directions data
    // In a real app, you would call a directions API here
    const mockDirections = {
      destination: {
        name: type === 'building' ? item.name : `${item.professor_name}'s Office`,
        id: id
      },
      distance: '250m',
      duration: '3 mins walk',
      steps: [
        t('directions.exitCurrentBuilding'),
        t('directions.walkStraight'),
        t('directions.turnRightAtFountain'),
        type === 'building' 
          ? `${t('directions.enterBuilding')} ${item.name}` 
          : `${t('directions.enterBuildingAndTakeElevator')} ${item.floor}`,
        type === 'professor' && `${t('directions.findRoom')} ${item.room_number} ${t('directions.onFloor')} ${item.floor}`
      ].filter(Boolean)
    };
    
    // Set directions and show the panel
    setDirections(mockDirections);
    setShowingDirections(true);
    
    // Also select the item to highlight it on the map
    setSelectedItem(id);
    setSelectedItemType(type);
    
    // Open drawer on mobile
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };
  
  // Close directions panel
  const handleCloseDirections = () => {
    setShowingDirections(false);
    setDirections(null);
  };

  // Get details for selected item
  const selectedItemDetails = useMemo(() => {
    if (!selectedItem) return null;
    
    if (selectedItemType === 'building') {
      return buildings.find(b => b.id === selectedItem);
    } else if (selectedItemType === 'professor') {
      return professors.find(p => p.id === selectedItem);
    }
    
    return null;
  }, [selectedItem, selectedItemType, buildings, professors]);

  return (
    <>
      <Head>
        <title>{t('directions.pageTitle')} | Campus Navigator</title>
        <meta name="description" content={t('directions.pageDescription')} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      
      <Box className={directionStyles.rootContainer}>
        {/* App Bar */}
        <AppBar position="sticky" color="default" className={directionStyles.appBar}>
          <Toolbar className={directionStyles.toolbar}>
            <Box className={directionStyles.headerLeft}>
              <IconButton 
                component={Link} 
                href="/" 
                className={directionStyles.backButton}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" className={directionStyles.pageTitle}>
                {t('directions.campusNavigator')}
              </Typography>
            </Box>
            
            <Box className={directionStyles.searchWrapper}>
              <Paper className={directionStyles.searchContainer}>
                <InputAdornment position="start" className={directionStyles.searchIcon}>
                  <SearchIcon />
                </InputAdornment>
                <TextField
                  placeholder={t('directions.searchBuildingsProfessors')}
                  variant="standard"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={directionStyles.searchInput}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                {searchQuery && (
                  <IconButton 
                    size="small" 
                    className={directionStyles.clearSearchButton}
                    onClick={() => setSearchQuery('')}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Paper>
            </Box>
          </Toolbar>
          
          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            className={directionStyles.navigationTabs}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label={t('directions.all')} 
              value="all" 
              icon={<FilterListIcon />} 
              className={activeTab === 'all' ? directionStyles.activeTab : ''}
            />
            <Tab 
              label={t('directions.academic')} 
              value="academic" 
              icon={<SchoolIcon />}
              className={activeTab === 'academic' ? directionStyles.activeTab : ''}
            />
            <Tab 
              label={t('directions.administrative')} 
              value="administrative" 
              icon={<ApartmentIcon />}
              className={activeTab === 'administrative' ? directionStyles.activeTab : ''}
            />
            <Tab 
              label={t('directions.professors')} 
              value="professors" 
              icon={<PersonIcon />}
              className={activeTab === 'professors' ? directionStyles.activeTab : ''}
            />
          </Tabs>
        </AppBar>
        
        <Container className={directionStyles.mainContainer} maxWidth="lg">
          <Grid container spacing={3}>
            {/* Map Section */}
            <Grid item xs={12} md={7} lg={8} order={{ xs: 1, md: 2 }} className={directionStyles.mapSection}>
              <CampusMap 
                selectedBuildingId={selectedItemType === 'building' ? selectedItem : null}
                buildings={buildings}
                onBuildingSelect={(id: string) => handleItemSelect(id, 'building')}
              />
              
              {/* Show Directions Panel when directions are requested */}
              {showingDirections && directions && (
                <DirectionsPanel directions={directions} onClose={handleCloseDirections} />
              )}
              
              {/* Quick Access - Common Destinations */}
              {!showingDirections && (
                <Paper className={directionStyles.quickAccessPanel}>
                  <Typography variant="subtitle1" className={directionStyles.quickAccessTitle}>
                    {t('directions.quickAccess')}
                  </Typography>
                  <Box className={directionStyles.quickAccessGrid}>
                    {destinations.slice(0, 6).map(destination => (
                      <Button 
                        key={destination.id}
                        className={directionStyles.quickAccessButton}
                        startIcon={<LocationOnIcon className={directionStyles.quickAccessIcon} />}
                      >
                        {destination.name}
                      </Button>
                    ))}
                  </Box>
                </Paper>
              )}
            </Grid>
            
            {/* Results Section */}
            <Grid item xs={12} md={5} lg={4} order={{ xs: 2, md: 1 }} className={directionStyles.resultsSection}>
              <Paper className={directionStyles.resultsContainer}>
                <Box className={directionStyles.resultsHeader}>
                  <Typography variant="subtitle1" className={directionStyles.resultsTitle}>
                    {filteredData.buildings.length + filteredData.professors.length} {t('directions.results')}
                  </Typography>
                  
                  {searchQuery && (
                    <Chip 
                      label={`${t('directions.searching')}: "${searchQuery}"`}
                      onDelete={() => setSearchQuery('')}
                      size="small"
                      className={directionStyles.searchChip}
                    />
                  )}
                </Box>
                
                <AnimatePresence>
                  <motion.div
                    layout
                    className={directionStyles.resultsList}
                  >
                    {isLoading ? (
                      // Loading skeletons
                      Array.from(new Array(5)).map((_, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Skeleton variant="rectangular" height={100} />
                        </Box>
                      ))
                    ) : filteredData.buildings.length === 0 && filteredData.professors.length === 0 ? (
                      // No results state
                      <Box className={directionStyles.emptyStateContainer}>
                        <SearchIcon className={directionStyles.emptyStateIcon} />
                        <Typography variant="h6">
                          {t('directions.noResultsFound')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t('directions.tryAdjustingSearch')}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          className={directionStyles.resetButton}
                          onClick={() => {
                            setSearchQuery('');
                            setActiveTab('all');
                          }}
                        >
                          {t('directions.resetFilters')}
                        </Button>
                      </Box>
                    ) : (
                      // Results
                      <>
                        {/* Buildings */}
                        {filteredData.buildings.length > 0 && (
                          <Box className={directionStyles.categorySection}>
                            <Typography variant="subtitle2" className={directionStyles.categoryTitle}>
                              {t('directions.buildingsCount')} ({filteredData.buildings.length})
                            </Typography>
                            {filteredData.buildings.map(building => (
                              <motion.div key={building.id} layout transition={{ duration: 0.3 }}>
                                <BuildingCard
                                  building={building}
                                  isActive={selectedItem === building.id && selectedItemType === 'building'}
                                  onSelect={(id: string) => handleItemSelect(id, 'building')}
                                  onGetDirections={handleGetDirections}
                                />
                              </motion.div>
                            ))}
                          </Box>
                        )}
                        
                        {/* Professors */}
                        {filteredData.professors.length > 0 && (
                          <Box className={directionStyles.categorySection}>
                            <Typography variant="subtitle2" className={directionStyles.categoryTitle}>
                              {t('directions.professorsCount')} ({filteredData.professors.length})
                            </Typography>
                            {filteredData.professors.map(professor => (
                              <motion.div key={professor.id} layout transition={{ duration: 0.3 }}>
                                <ProfessorCard
                                  professor={professor}
                                  isActive={selectedItem === professor.id && selectedItemType === 'professor'}
                                  onSelect={(id: string) => handleItemSelect(id, 'professor')}
                                  onGetDirections={handleGetDirections}
                                />
                              </motion.div>
                            ))}
                          </Box>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        
        {/* Mobile Details Drawer */}
        {isMobile && (
          <SwipeableDrawer
            anchor="bottom"
            open={isDrawerOpen && !!selectedItemDetails && !showingDirections}
            onClose={() => setIsDrawerOpen(false)}
            onOpen={() => setIsDrawerOpen(true)}
            className={directionStyles.detailsDrawer}
            disableSwipeToOpen={false}
            swipeAreaWidth={30}
          >
            <Box className={directionStyles.drawerHandle}>
              <div className={directionStyles.drawerHandleBar} />
            </Box>
            
            {selectedItemDetails && (
              <Box className={directionStyles.detailsContent}>
                <Box className={directionStyles.detailsHeader}>
                  <Typography variant="h6" className={directionStyles.detailsTitle}>
                    {selectedItemType === 'building' ? (selectedItemDetails as Building).name : (selectedItemDetails as ProfessorRoom).professor_name}
                  </Typography>
                  <IconButton 
                    className={directionStyles.closeButton}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                {selectedItemType === 'building' ? (
                  // Building details
                  <Box className={directionStyles.buildingDetails}>
                    <Box className={directionStyles.detailSection}>
                      <Typography variant="subtitle2" className={directionStyles.detailLabel}>
                        {t('directions.buildingInformation')}
                      </Typography>
                      <Box className={directionStyles.detailInfo}>
                        <Box className={directionStyles.detailItem}>
                          <ApartmentIcon className={directionStyles.detailIcon} />
                          <Typography variant="body2">
                            {(selectedItemDetails as Building).type === 'academic' ? t('directions.academicBuilding') : t('directions.administrativeBuilding')}
                          </Typography>
                        </Box>
                        <Box className={directionStyles.detailItem}>
                          <LocationOnIcon className={directionStyles.detailIcon} />
                          <Typography variant="body2">
                            {(selectedItemDetails as Building).floor || t('directions.multipleFloors')}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" className={directionStyles.buildingDescription}>
                        {(selectedItemDetails as Building).description || t('directions.defaultBuildingDescription')}
                      </Typography>
                    </Box>
                    
                    <Divider className={directionStyles.detailDivider} />
                    
                    <Box className={directionStyles.actionButtonContainer}>
                      <Button
                        variant="contained"
                        startIcon={<DirectionsIcon />}
                        className={directionStyles.primaryActionButton}
                        fullWidth
                        onClick={() => handleGetDirections(selectedItem, 'building')}
                      >
                        {t('directions.getDirections')}
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  // Professor details
                  <Box className={directionStyles.professorDetails}>
                    <Box className={directionStyles.detailSection}>
                      <Typography variant="subtitle2" className={directionStyles.detailLabel}>
                        {t('directions.contactInformation')}
                      </Typography>
                      <Box className={directionStyles.detailInfo}>
                        <Box className={directionStyles.detailItem}>
                          <SchoolIcon className={directionStyles.detailIcon} />
                          <Typography variant="body2">
                            {(selectedItemDetails as ProfessorRoom).department}
                          </Typography>
                        </Box>
                        <Box className={directionStyles.detailItem}>
                          <LocationOnIcon className={directionStyles.detailIcon} />
                          <Typography variant="body2">
                            {(selectedItemDetails as ProfessorRoom).room_number} • {(selectedItemDetails as ProfessorRoom).floor}
                          </Typography>
                        </Box>
                        <Box className={directionStyles.detailItem}>
                          <AccessTimeIcon className={directionStyles.detailIcon} />
                          <Typography variant="body2">
                            {t('directions.officeHours')}: {(selectedItemDetails as ProfessorRoom).office_hours || t('directions.byAppointment')}
                          </Typography>
                        </Box>
                        {(selectedItemDetails as ProfessorRoom).email && (
                          <Box className={directionStyles.detailItem}>
                            <EmailIcon className={directionStyles.detailIcon} />
                            <Typography variant="body2" className={directionStyles.professorEmail}>
                              {(selectedItemDetails as ProfessorRoom).email}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    
                    <Divider className={directionStyles.detailDivider} />
                    
                    <Box className={directionStyles.actionButtonContainer}>
                      <Button
                        variant="contained"
                        startIcon={<DirectionsIcon />}
                        className={directionStyles.primaryActionButton}
                        fullWidth
                        onClick={() => handleGetDirections(selectedItem, 'professor')}
                      >
                        {t('directions.findOffice')}
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        className={directionStyles.secondaryActionButton}
                        fullWidth
                      >
                        {t('directions.contactProfessor')}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </SwipeableDrawer>
        )}
        
        {/* New Dialog for Directions (Popup style) */}
        <Dialog
          open={showingDirections && !!directions}
          onClose={handleCloseDirections}
          maxWidth="sm"
          fullWidth
          className={directionStyles.directionsDialog}
          PaperProps={{ 
            className: directionStyles.directionsDialogPaper,
            elevation: 5
          }}
          TransitionProps={{
            enter: true,
            appear: true
          }}
        >
          <DialogTitle className={directionStyles.directionsDialogTitle}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  {t('directions.directionsTo')} {directions?.destination.name}
                </Typography>
              </Box>
              <IconButton 
                onClick={handleCloseDirections} 
                size="small"
                className={directionStyles.closeDialogButton}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          
          <DialogContent className={directionStyles.directionsDialogContent}>
            <Box className={directionStyles.directionsOverviewContainer}>
              <NavigationIcon className={directionStyles.directionsDialogIcon} color="primary" />
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  {directions?.distance} • {directions?.duration}
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box className={directionStyles.directionsStepsList}>
              {directions?.steps.map((step, index) => (
                <Box key={index} className={directionStyles.directionsDialogStep}>
                  <div className={directionStyles.timelineConnector}>
                    <Avatar 
                      className={directionStyles.directionsStepNumber}
                    >
                      {index + 1}
                    </Avatar>
                    {index < (directions.steps.length - 1) && (
                      <div className={directionStyles.stepConnectorLine}></div>
                    )}
                  </div>
                  <Paper className={directionStyles.stepContentPaper}>
                    <Typography variant="body2">{step}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            
            <Box className={directionStyles.directionsDialogActions}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<NavigationIcon />}
                className={directionStyles.startNavigationButton}
                fullWidth
              >
                {t('directions.startNavigation')}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
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
