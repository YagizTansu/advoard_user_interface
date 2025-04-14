import { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
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
  Dialog,
  DialogContent,
  DialogTitle,
  Toolbar, // Added missing Toolbar component
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavigationIcon from '@mui/icons-material/Navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from '@mui/material/styles';

import directionStyles from '../styles/directions.module.css';
import {
  getBuildings,
  getCommonDestinations,
  getProfessorRooms,
  Building,
  CommonDestination,
  ProfessorRoom,
} from '../src/lib/supabase';
import { generateDirections } from '../src/lib/directionUtils';

// Tip tanımları
interface DirectionsData {
  destination: {
    name: any;
    id: string;
  };
  steps: string[];
}

// Komponentleri ana fonksiyondan ayırma
// CampusMap bileşeni
interface CampusMapProps {
  selectedBuildingId: string | null;
  buildings: Building[];
  onBuildingSelect: (id: string) => void;
}

const CampusMap = ({ selectedBuildingId, buildings, onBuildingSelect }: CampusMapProps) => {
  const { t } = useTranslation('common');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const userPosition = { x: 380, y: 510 }; // Üniversite girişinde

  const handleSvgLoad = () => setMapLoaded(true);

  const handleZoom = (action: string) => {
    switch (action) {
      case 'in':
        setZoomLevel((prev) => Math.min(prev + 0.2, 3));
        break;
      case 'out':
        setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
        break;
      case 'reset':
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        break;
    }
  };

  return (
    <div className={directionStyles.mapWrapper}>
      <div className={directionStyles.mapOverlay}>
        <div
          className={directionStyles.mapImageContainer}
          ref={mapRef}
          style={{
            transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <object
            data="/images/kroki.svg"
            type="image/svg+xml"
            className={directionStyles.svgMap}
            onLoad={handleSvgLoad}
            aria-label="Campus Map"
          />

          {mapLoaded && (
            <div
              className={directionStyles.youAreHereMarker}
              style={{
                top: `${userPosition.y}px`,
                left: `${userPosition.x}px`,
              }}
            >
              <div className={directionStyles.youAreHereRing}></div>
              <div className={directionStyles.youAreHerePoint}></div>
              <div className={directionStyles.youAreHereLabel}>
                {t('directions.youAreHere', 'You are here')}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={directionStyles.svgControls}>
        <IconButton onClick={() => handleZoom('in')} className={directionStyles.svgControlButton}>
          <span className={directionStyles.svgControlIcon}>+</span>
        </IconButton>
        <IconButton onClick={() => handleZoom('out')} className={directionStyles.svgControlButton}>
          <span className={directionStyles.svgControlIcon}>−</span>
        </IconButton>
        <IconButton onClick={() => handleZoom('reset')} className={directionStyles.svgControlButton}>
          <FilterListIcon className={directionStyles.svgControlIcon} />
        </IconButton>
      </div>
    </div>
  );
};

// BuildingCard bileşeni
const BuildingCard = ({ 
  building, 
  isActive, 
  onSelect, 
  onGetDirections 
}: { 
  building: Building; 
  isActive: boolean; 
  onSelect: (id: string) => void; 
  onGetDirections: (id: string, type: 'building' | 'professor') => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');

  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} layout>
      <Card
        className={`${directionStyles.buildingCard} ${
          isActive ? directionStyles.buildingCardActive : ''
        }`}
        onClick={() => onSelect(building.id)}
        elevation={isActive ? 3 : 1}
      >
        <CardContent className={directionStyles.buildingCardContent}>
          <Box className={directionStyles.buildingHeader}>
            <Box className={directionStyles.buildingTypeIconContainer}>
              {building.type === 'academic' ? (
                <SchoolIcon className={directionStyles.buildingTypeIcon} />
              ) : (
                <ApartmentIcon className={directionStyles.buildingTypeIcon} />
              )}
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
              label={
                building.type === 'academic'
                  ? t('directions.academic')
                  : t('directions.administrative')
              }
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

// ProfessorCard bileşeni{
const ProfessorCard = ({ 
  professor, 
  isActive, 
  onSelect, 
  onGetDirections 
}: { 
  professor: ProfessorRoom; 
  isActive: boolean; 
  onSelect: (id: string) => void; 
  onGetDirections: (id: string, type: 'professor' | 'building') => void;
}) => {
  const { t } = useTranslation('common');

  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`${directionStyles.professorCard} ${
          isActive ? directionStyles.professorCardActive : ''
        }`}
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

// DirectionsPanel bileşeni
const DirectionsPanel = ({ directions, onClose }: { directions: DirectionsData | null; onClose: () => void }) => {
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

// Ana sayfa bileşeni - sadeleştirilmiş
export default function Directions() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'administrative' | 'professors'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [professors, setProfessors] = useState<ProfessorRoom[]>([]);
  const [destinations, setDestinations] = useState<CommonDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingDirections, setShowingDirections] = useState(false);
  const [directions, setDirections] = useState<DirectionsData | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hareketsizlik zamanlayıcısını sıfırlama
  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(() => router.push('/'), 100000);
  };

  // Kullanıcı aktivitesi için olay dinleyicileri
  useEffect(() => {
    resetInactivityTimer();
    const userActivityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const handleUserActivity = () => resetInactivityTimer();

    userActivityEvents.forEach((event) => document.addEventListener(event, handleUserActivity));

    return () => {
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
      userActivityEvents.forEach((event) => document.removeEventListener(event, handleUserActivity));
    };
  }, [router]);

  // Verileri yükleme
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [buildingsData, professorsData, destinationsData] = await Promise.all([
          getBuildings(),
          getProfessorRooms(),
          getCommonDestinations(),
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

  // Arama ve sekmeye göre verileri filtreleme
  const filteredData = useMemo(() => {
    const filteredBuildings = buildings.filter((building) => {
      const matchesSearch =
        !searchQuery ||
        building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (building.code && building.code.toLowerCase().includes(searchQuery.toLowerCase()));

      if (activeTab === 'professors') return false;

      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'academic' && building.type === 'academic') ||
        (activeTab === 'administrative' && building.type === 'administrative');

      return matchesSearch && matchesTab;
    });

    const filteredProfessors = professors.filter((professor) => {
      const matchesSearch =
        !searchQuery ||
        professor.professor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professor.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professor.room_number.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === 'all' || activeTab === 'professors';

      return matchesSearch && matchesTab;
    });

    return { buildings: filteredBuildings, professors: filteredProfessors };
  }, [searchQuery, activeTab, buildings, professors]);

  // Öğe seçimini işleme
  const handleItemSelect = (id: string, type: string) => {
    if (selectedItem === id && selectedItemType === type) {
      setSelectedItem(null);
      setSelectedItemType(null);
      setIsDrawerOpen(false);
    } else {
      setSelectedItem(id);
      setSelectedItemType(type);
      if (isMobile) setIsDrawerOpen(true);
    }
  };

  // Yol tarifi alma
  const handleGetDirections = (id: string, type: 'building' | 'professor') => {
    const mockDirections = generateDirections(null, id, type, buildings, professors);

    setDirections(mockDirections);
    setShowingDirections(true);
    setSelectedItem(id);
    setSelectedItemType(type);

    if (isMobile) setIsDrawerOpen(true);
  };

  // Yol tarifi panelini kapatma
  const handleCloseDirections = () => {
    setShowingDirections(false);
    setDirections(null);
  };

  // Seçilen öğenin detaylarını alma
  const selectedItemDetails = useMemo(() => {
    if (!selectedItem) return null;

    if (selectedItemType === 'building') {
      return buildings.find((b) => b.id === selectedItem);
    } else if (selectedItemType === 'professor') {
      return professors.find((p) => p.id === selectedItem);
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
        <Box component="header" className={directionStyles.appBar}>
          <Toolbar className={directionStyles.toolbar}>
            <Box className={directionStyles.headerLeft}>
              <IconButton component={Link} href="/" className={directionStyles.backButton}>
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
                  InputProps={{ disableUnderline: true }}
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
            <Tab label={t('directions.all')} value="all" icon={<FilterListIcon />} />
            <Tab label={t('directions.academic')} value="academic" icon={<SchoolIcon />} />
            <Tab label={t('directions.administrative')} value="administrative" icon={<ApartmentIcon />} />
            <Tab label={t('directions.professors')} value="professors" icon={<PersonIcon />} />
          </Tabs>
        </Box>

        <Container className={directionStyles.mainContainer} maxWidth="lg">
          <Grid container spacing={3}>
            {/* Map Section */}
            <Grid item xs={12} md={7} lg={8} order={{ xs: 1, md: 2 }} className={directionStyles.mapSection}>
              <CampusMap
                selectedBuildingId={selectedItemType === 'building' ? selectedItem : null}
                buildings={buildings}
                onBuildingSelect={(id: string) => handleItemSelect(id, 'building')}
              />

              {showingDirections && directions && (
                <DirectionsPanel directions={directions} onClose={handleCloseDirections} />
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
                  <motion.div layout className={directionStyles.resultsList}>
                    {isLoading ? (
                      // Loading skeletons
                      Array.from(new Array(5)).map((_, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Skeleton variant="rectangular" height={100} />
                        </Box>
                      ))
                    ) : filteredData.buildings.length === 0 && filteredData.professors.length === 0 ? (
                      // No results
                      <Box className={directionStyles.emptyStateContainer}>
                        <SearchIcon className={directionStyles.emptyStateIcon} />
                        <Typography variant="h6">{t('directions.noResultsFound')}</Typography>
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
                      // Sonuçları görüntüleme
                      <>
                        {filteredData.buildings.length > 0 && (
                          <Box className={directionStyles.categorySection}>
                            <Typography variant="subtitle2" className={directionStyles.categoryTitle}>
                              {t('directions.buildingsCount')} ({filteredData.buildings.length})
                            </Typography>
                            {filteredData.buildings.map((building) => (
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

                        {filteredData.professors.length > 0 && (
                          <Box className={directionStyles.categorySection}>
                            <Typography variant="subtitle2" className={directionStyles.categoryTitle}>
                              {t('directions.professorsCount')} ({filteredData.professors.length})
                            </Typography>
                            {filteredData.professors.map((professor) => (
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

        {/* Mobilde Detay Çekmecesi */}
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
                    {selectedItemType === 'building'
                      ? (selectedItemDetails as Building).name
                      : (selectedItemDetails as ProfessorRoom).professor_name}
                  </Typography>
                  <IconButton
                    className={directionStyles.closeButton}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {selectedItemType === 'building' ? (
                  // Bina detayları
                  <Box className={directionStyles.buildingDetails}>
                    <Button
                      variant="contained"
                      startIcon={<DirectionsIcon />}
                      className={directionStyles.primaryActionButton}
                      fullWidth
                      onClick={() => selectedItem && handleGetDirections(selectedItem, 'building')}
                    >
                      {t('directions.getDirections')}
                    </Button>
                  </Box>
                ) : (
                  // Profesör detayları
                  <Box className={directionStyles.professorDetails}>
                    <Button
                      variant="contained"
                      startIcon={<DirectionsIcon />}
                      className={directionStyles.primaryActionButton}
                      fullWidth
                      onClick={() => selectedItem && handleGetDirections(selectedItem, 'professor')}
                    >
                      {t('directions.findOffice')}
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </SwipeableDrawer>
        )}

        {/* Yön Bulma İletişim Kutusu */}
        <Dialog
          open={showingDirections && !!directions}
          onClose={handleCloseDirections}
          maxWidth="sm"
          fullWidth
          className={directionStyles.directionsDialog}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  {t('directions.directionsTo')} {directions?.destination.name}
                </Typography>
              </Box>
              <IconButton onClick={handleCloseDirections} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent>
            <Box className={directionStyles.directionsStepsList}>
              {directions?.steps.map((step, index) => (
                <Box key={index} className={directionStyles.directionsDialogStep}>
                  <div className={directionStyles.timelineConnector}>
                    <Avatar className={directionStyles.directionsStepNumber}>{index + 1}</Avatar>
                    {index < directions.steps.length - 1 && (
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
  return {
    props: {
      ...(await serverSideTranslations(locale || 'tr', ['common'])),
    },
  };
}
