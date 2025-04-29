import { SetStateAction, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import styles from '../styles/service.module.css';
import { useRouter } from 'next/router';
import { 
  Box, 
  Container, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Divider,
  Paper,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
  CardMedia,
  CardActions,
  Badge,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import Head from 'next/head';
import { supabase, getCategories, getMenuItems, Category, MenuItemType } from '../src/lib/supabase';
import { dbService } from '../src/services/firebaseService';

const steps = ['selectCategory', 'selectMenu', 'customizeOrder', 'reviewSubmit'];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return windowSize;
}

export default function Services() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState<{id: string, quantity: number, name: string, price: number}[]>([]);
  const [formData, setFormData] = useState({
    studentId: '',
    orderDetails: '',
    deliveryLocation: '',
    deliveryTime: 'asap',
    paymentMethod: 'campus'
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<{[key: string]: MenuItemType[]}>({});
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width < 600;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle inactivity timeout
  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    
    // Set timeout for 20 seconds of inactivity
    inactivityTimeoutRef.current = setTimeout(() => {
      router.push('/');
    }, 10000); // 20 seconds
  };

  // Add this new function to reset all state
  const handleStartNewOrder = () => {
    setActiveStep(0);
    setSelectedCategory('');
    setSelectedItems([]);
    setFormData({
      studentId: '',
      orderDetails: '',
      deliveryLocation: '',
      deliveryTime: 'asap',
      paymentMethod: 'campus'
    });
    // Reset any error state
    setSubmitError(null);
    setIsSubmitting(false);
    // Reset inactivity timer
    resetInactivityTimer();
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

  useEffect(() => {
    i18n.reloadResources(i18n.language, ['common']);
  }, [i18n]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMenuItems() {
      if (selectedCategory) {
        try {
          const items = await getMenuItems(selectedCategory);
          setMenuItems(prev => ({
            ...prev,
            [selectedCategory]: items
          }));
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      }
    }
    fetchMenuItems();
  }, [selectedCategory]);

  const pageTransition = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { opacity: 0, x: 20 }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      } 
    }),
    hover: { 
      scale: 1.03,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCategorySelect = (categoryId: SetStateAction<string>) => {
    setSelectedCategory(categoryId);
    handleNext();
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitOrderToSupabase = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const orderData = {
        student_id: formData.studentId,
        order_items: selectedItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total_price: item.price * item.quantity
        })),
        category: selectedCategory,
        total_amount: calculateTotal(),
        delivery_details: {
          location: formData.deliveryLocation,
          time: formData.deliveryTime,
          special_instructions: formData.orderDetails || ""
        },
        payment_method: formData.paymentMethod,
        status: "pending"
      };

      // Insert order into Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select();

      if (error) throw error;
      
      console.log('Order submitted to Supabase with ID:', data[0].id);
      
      // Send command to robot via Firebase
      const commandData = {
          request:{
            finish_batch: false,
            fleet_name: "ieü",
            goal_node: "s_01",
            start_batch: true,
            time_stamp: 212.122,
          },
          service_name: "command_fleet_goal"
      }


      // Also submit to Firebase for robot control
      const robotId = await dbService.setDataWithId('robots_command', "robot-0", commandData);
      console.log('Robot command sent with ID:', robotId);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError(typeof error === 'object' && error !== null && 'message' in error 
        ? String(error.message) 
        : 'An unexpected error occurred while submitting your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    submitOrderToSupabase();
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleItemQuantityChange = (itemId: string, change: number) => {
    const existingItemIndex = selectedItems.findIndex(item => item.id === itemId);
    const itemCategory = selectedCategory as keyof typeof menuItems;
    const menuItem = menuItems[itemCategory]?.find(item => item.id === itemId);
    
    if (!menuItem) return;

    if (existingItemIndex >= 0) {
      const updatedItems = [...selectedItems];
      const newQuantity = updatedItems[existingItemIndex].quantity + change;
      
      if (newQuantity <= 0) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex].quantity = newQuantity;
      }
      
      setSelectedItems(updatedItems);
    } else if (change > 0) {
      setSelectedItems([...selectedItems, {
        id: itemId,
        quantity: 1,
        name: menuItem.name,
        price: menuItem.price
      }]);
    }
  };

  const getItemQuantity = (itemId: string) => {
    const item = selectedItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: {[key: string]: React.ReactNode} = {
      'FastfoodIcon': <FastfoodIcon sx={{ fontSize: 40 }} />,
      'CoffeeIcon': <CoffeeIcon sx={{ fontSize: 40 }} />,
      'LocalPrintshopIcon': <LocalPrintshopIcon sx={{ fontSize: 40 }} />,
      'SchoolIcon': <SchoolIcon sx={{ fontSize: 40 }} />
    };
    return iconMap[iconName] || null;
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageTransition}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 500 }}>
              {t('order.selectCategory')}
            </Typography>
            
            <Grid container spacing={2}>
              {categories.map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
                  <motion.div
                    custom={index}
                    variants={cardVariants}
                    whileHover="hover"
                    initial="hidden"
                    animate="visible"
                  >
                    <Card 
                      className={styles.categoryCard}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <Box className={styles.categoryCardStrip} sx={{ bgcolor: category.color }} />
                      
                      <CardContent className={styles.categoryCardContent}>
                        <Box className={styles.categoryCardIcon}>
                          {getIconComponent(category.icon)}
                        </Box>
                        
                        <Typography className={styles.categoryCardTitle}>
                          {t(category.title)}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          {t(category.description)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        );
      
      case 1:
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageTransition}
          >
            <Box className={styles.menuHeaderContainer}>
              <Box>
                <Chip 
                  label={t(`categories.${selectedCategory}.title`)} 
                  color="primary" 
                  sx={{ fontWeight: 500, mb: 1 }}
                />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 500 }}>
                  {t('order.selectMenu')}
                </Typography>
              </Box>
            </Box>
            
            <Grid container spacing={3}>
              {selectedCategory && menuItems[selectedCategory]?.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <motion.div
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className={styles.menuItemCard}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent className={styles.menuItemContent}>
                        <Box className={styles.menuItemHeader}>
                          <Typography className={styles.menuItemName}>
                            {item.name}
                          </Typography>
                          {/* <Typography className={styles.menuItemPrice}>
                            {item.price} ₺
                          </Typography> */}
                        </Box>
                        <Typography className={styles.menuItemDescription}>
                          {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions className={styles.menuItemActions}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {t('menu.quantity')}
                        </Typography>

                        <ButtonGroup variant="outlined" size="small">
                          <Button 
                            onClick={() => handleItemQuantityChange(item.id, -1)}
                            disabled={getItemQuantity(item.id) <= 0}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button disabled sx={{ px: 2, minWidth: '40px' }}>
                            {getItemQuantity(item.id)}
                          </Button>
                          <Button onClick={() => handleItemQuantityChange(item.id, 1)}>
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {selectedItems.length > 0 && (
              <Paper className={styles.selectedItemsPaper}>
                <Typography className={styles.selectedItemsTitle}>
                  {t('menu.selectedItems')}
                </Typography>
                
                <List>
                  {selectedItems.map((item) => (
                    <ListItem key={item.id} sx={{ py: 1 }}>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`${item.quantity} x`}
                      />
                      {/* <ListItemSecondaryAction>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.quantity * item.price} ₺
                        </Typography>
                      </ListItemSecondaryAction> */}
                    </ListItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <ListItem>
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {t('menu.total')}
                        </Typography>
                      } 
                    />
                    {/* <ListItemSecondaryAction>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {calculateTotal()} ₺
                      </Typography>
                    </ListItemSecondaryAction> */}
                  </ListItem>
                </List>
              </Paper>
            )}
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageTransition}
          >
            <Box sx={{ mb: 4 }}>
              <Chip 
                label={t(`categories.${selectedCategory}.title`)} 
                color="primary" 
                sx={{ fontWeight: 500 }}
              />
              <Typography variant="h4" component="h2" sx={{ mt: 2, fontWeight: 500 }}>
                {t('order.customizeOrder')}
              </Typography>
            </Box>
            
            <Paper className={styles.formPaper}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={styles.sectionTitle}>
                    {t('form.personalDetails')}
                  </Typography>
                </Grid>
                
                {/* Student ID field commented out
                <Grid item xs={12}>
                  <TextField
                    label={t('form.studentId')}
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    variant="outlined"
                    placeholder="20190000000"
                    helperText={t('form.studentIdHelp')}
                  />
                </Grid>
                */}

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography className={styles.sectionTitle}>
                    {t('form.deliveryDetails')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>{t('form.deliveryLocation')}</InputLabel>
                    <Select
                      label={t('form.deliveryLocation')}
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="table1">{t('locations.table1') || 'Table 1'}</MenuItem>
                      <MenuItem value="table2">{t('locations.table2') || 'Table 2'}</MenuItem>
                      <MenuItem value="table3">{t('locations.table3') || 'Table 3'}</MenuItem>
                      <MenuItem value="table4">{t('locations.table4') || 'Table 4'}</MenuItem>
                      <MenuItem value="table5">{t('locations.table5') || 'Table 5'}</MenuItem>
                      <MenuItem value="table6">{t('locations.table6') || 'Table 6'}</MenuItem>
                      <MenuItem value="table7">{t('locations.table7') || 'Table 7'}</MenuItem>
                      <MenuItem value="table8">{t('locations.table8') || 'Table 8'}</MenuItem>
                      <MenuItem value="table9">{t('locations.table9') || 'Table 9'}</MenuItem>
                      <MenuItem value="table10">{t('locations.table10') || 'Table 10'}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>{t('form.deliveryTime')}</InputLabel>
                    <Select
                      label={t('form.deliveryTime')}
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="asap">{t('times.asap')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label={t('form.orderDetails')}
                    name="orderDetails"
                    value={formData.orderDetails}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    fullWidth
                    variant="outlined"
                    placeholder={t('form.orderDetailsPlaceholder')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                {/* Payment method section commented out
                <Grid item xs={12}>
                  <Typography className={styles.sectionTitle}>
                    {t('form.paymentDetails')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel>{t('form.paymentMethod')}</InputLabel>
                    <Select
                      label={t('form.paymentMethod')}
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="credit">{t('payment.creditCard')}</MenuItem>
                      <MenuItem value="debit">{t('payment.debitCard')}</MenuItem>
                      <MenuItem value="campus">{t('payment.campusCard')}</MenuItem>
                      <MenuItem value="cash">{t('payment.cash')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                */}
                
                <Grid item xs={12} md={6}>
                  <Paper className={styles.summaryPaper}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{t('menu.selectedItems')}:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {selectedItems.length} {t('menu.items')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t('menu.total')}:
                      </Typography>
                      {/* <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {calculateTotal()} ₺
                      </Typography> */}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageTransition}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 500 }}>
              {t('order.reviewSubmit')}
            </Typography>

            <Paper className={styles.reviewContainer}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                      {t('review.category')}:
                    </Typography>
                    <Chip 
                      label={t(`categories.${selectedCategory}.title`)} 
                      color="primary" 
                      size="small"
                    />
                  </Box>
                </Grid>
                
                {selectedItems.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {t('review.selectedItems')}:
                    </Typography>
                    <Paper className={styles.reviewItemsList}>
                      <List disablePadding>
                        {selectedItems.map((item) => (
                          <ListItem key={item.id} sx={{ py: 1 }}>
                            <ListItemText 
                              primary={item.name} 
                              secondary={`${item.quantity} x`}
                            />
                            {/* <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.quantity * item.price} ₺
                            </Typography> */}
                          </ListItem>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <ListItem>
                          <ListItemText 
                            primary={
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {t('menu.total')}
                              </Typography>
                            } 
                          />
                          {/* <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {calculateTotal()} ₺
                          </Typography> */}
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                )}
                
                {/* Student ID display commented out
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.studentId')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.studentId || '-'}
                  </Typography>
                </Grid>
                */}
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.deliveryLocation')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.deliveryLocation ? t(`locations.${formData.deliveryLocation}`) : '-'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.deliveryTime')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.deliveryTime ? t(`times.${formData.deliveryTime}`) : '-'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  {/* Payment method display commented out
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.paymentMethod')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.paymentMethod ? t(`payment.${formData.paymentMethod}`) : '-'}
                  </Typography>
                  */}
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.orderDetails')}
                  </Typography>
                  <Typography className={styles.reviewDetailText}>
                    {formData.orderDetails || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Box className={styles.submissionNote}>
              <Typography variant="body2" color="info.dark">
                {t('order.submissionNote')}
              </Typography>
            </Box>
          </motion.div>
        );
        
      default:
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageTransition}
          >
            <Box className={styles.successContainer}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <CheckCircleOutlineIcon className={styles.successIcon} />
              </motion.div>
              
              <Typography className={styles.successTitle}>
                {t('order.success.title')}
              </Typography>
              
              <Typography className={styles.successMessage}>
                {t('order.success.message')}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button 
                  component={Link} 
                  href="/"
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  {t('order.returnHome')}
                </Button>
                
                <Button 
                  onClick={handleStartNewOrder}
                  variant="contained" 
                  color="primary"
                  size="large"
                >
                  {t('order.newOrder') || 'Place New Order'}
                </Button>
              </Box>
            </Box>
          </motion.div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>{t('pageTitle.services')}</title>
      </Head>
      
      <Container maxWidth="lg" className={styles.pageContainer}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box className={styles.breadcrumbContainer}>
            <IconButton 
              component={Link} 
              href="/"
              sx={{ mr: 2 }}
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
              <Typography color="text.primary">{t('nav.services')}</Typography>
            </Breadcrumbs>
          </Box>
          
          <Typography 
            variant="h3" 
            component="h1" 
            className={styles.pageTitle}
            sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
          >
            {t('services.order.title')}
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 3, sm: 4, md: 6 }, 
              maxWidth: 700,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {t('services.order.fullDescription')}
          </Typography>
        </motion.div>
        
        {activeStep < 4 && (
          <Box className={styles.stepperContainer}>
            <Stepper 
              activeStep={activeStep} 
              alternativeLabel
              sx={{
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{t(`order.steps.${label}`)}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
        
        {selectedItems.length > 0 && activeStep < 4 && (
          <Box className={styles.cartBadgeContainer}>
            <Badge 
              className={styles.cartBadge}
              badgeContent={selectedItems.length} 
              color="primary"
              sx={{ 
                '& .MuiBadge-badge': { 
                  fontSize: { xs: '12px', sm: '14px' }, 
                  fontWeight: 'bold' 
                } 
              }}
            >
              <Paper 
                className={styles.cartPaper} 
                elevation={3}
                sx={{ 
                  padding: { xs: '8px 12px', sm: '10px 16px' },
                  flexDirection: { xs: 'column', sm: 'row' }
                }}
              >
                <ShoppingCartIcon 
                  className={styles.cartIcon}
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                />
                {/* <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1.1rem' }
                  }}
                >
                  {calculateTotal()} ₺
                </Typography> */}
              </Paper>
            </Badge>
          </Box>
        )}
          
        <Box className={styles.contentContainer}>
          {getStepContent(activeStep)}
        </Box>
        
        {activeStep < 4 && (
          <Box className={`${styles.navigationContainer} ${activeStep === 0 ? styles.navigationContainerEnd : styles.navigationContainerSpaceBetween}`}>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                sx={{ mr: 1, px: { xs: 2, sm: 3 } }}
                size={isMobile ? "small" : "medium"}
                disabled={isSubmitting}
              >
                {t('navigation.back')}
              </Button>
            )}
            
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                disabled={(activeStep === 1 && selectedItems.length === 0) || 
                          isSubmitting}
                sx={{ px: { xs: 2, sm: 3 } }}
                size={isMobile ? "small" : "medium"}
              >
                {t('navigation.next')}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckCircleOutlineIcon />}
                disabled={isSubmitting}
                sx={{ px: { xs: 2, sm: 3 } }}
                size={isMobile ? "small" : "medium"}
              >
                {isSubmitting ? t('navigation.submitting') : t('navigation.submit')}
              </Button>
            )}
          </Box>
        )}
        
        <Snackbar 
          open={!!submitError} 
          autoHideDuration={6000} 
          onClose={() => setSubmitError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSubmitError(null)} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {submitError}
          </Alert>
        </Snackbar>
      </Container>
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
