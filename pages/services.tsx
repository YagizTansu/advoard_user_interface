import { SetStateAction, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import styles from '../styles/service.module.css';
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
  ListItemSecondaryAction
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

// Define steps for the order process - updated to include menu selection
const steps = ['selectCategory', 'selectMenu', 'customizeOrder', 'reviewSubmit'];

// Define order categories
const categories = [
  { 
    id: 'cafeteria', 
    title: 'categories.cafeteria.title', 
    description: 'categories.cafeteria.description',
    icon: <FastfoodIcon sx={{ fontSize: 40 }} />,
    color: '#3a86ff'
  },
  { 
    id: 'coffee', 
    title: 'categories.coffee.title', 
    description: 'categories.coffee.description',
    icon: <CoffeeIcon sx={{ fontSize: 40 }} />,
    color: '#8338ec'
  },
  { 
    id: 'printing', 
    title: 'categories.printing.title', 
    description: 'categories.printing.description',
    icon: <LocalPrintshopIcon sx={{ fontSize: 40 }} />,
    color: '#ff006e'
  },
  { 
    id: 'academic', 
    title: 'categories.academic.title', 
    description: 'categories.academic.description',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    color: '#3a0ca3'
  }
];

// Define menu items for each category
const menuItems = {
  cafeteria: [
    { 
      id: 'sandwich', 
      name: 'Sandviç', 
      description: 'Taze ekmek ile hazırlanmış tavuk/peynir sandviç',
      price: 35,
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'salad', 
      name: 'Mevsim Salatası', 
      description: 'Taze mevsim sebzeleri ile hazırlanmış salata',
      price: 30,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'burger', 
      name: 'Hamburger', 
      description: 'Dana eti, domates, marul, soğan, özel sos',
      price: 45,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'pizza', 
      name: 'Pizza', 
      description: 'Karışık malzemeli pizza',
      price: 50,
      image: 'https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'chickenWrap', 
      name: 'Tavuk Dürüm', 
      description: 'Izgara tavuk, yeşillikler ve özel sosla hazırlanmış lavaş dürüm',
      price: 40,
      image: 'https://images.unsplash.com/photo-1671572580025-0280545b48c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'pasta', 
      name: 'Makarna', 
      description: 'Bolonez veya Napoliten soslu makarna seçeneği',
      price: 35,
      image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'dailySoup', 
      name: 'Günün Çorbası', 
      description: 'Şef tarafından günlük hazırlanan taze çorba',
      price: 25,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop'
    },
    { 
      id: 'meatballs', 
      name: 'Köfte', 
      description: 'Izgara köfte, pilav ve salata ile servis edilir',
      price: 55,
      image: 'https://images.unsplash.com/photo-1625147541750-dfecb0a624a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 'vegetarianPlate', 
      name: 'Vejetaryen Tabağı', 
      description: 'Mevsim sebzeleri, bulgur pilavı ve humus',
      price: 45,
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      id: 'grilledChicken', 
      name: 'Izgara Tavuk', 
      description: 'Baharatlı marine edilmiş ızgara tavuk, sebzeler ile servis edilir',
      price: 50,
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=2069&auto=format&fit=crop'
    }
  ],
  coffee: [
    { 
      id: 'turkishCoffee', 
      name: 'Türk Kahvesi', 
      description: 'Geleneksel yöntem ile hazırlanmış Türk kahvesi',
      price: 20,
      image: 'https://source.unsplash.com/nzyzAUsbV0M/400x300'
    },
    { 
      id: 'latte', 
      name: 'Latte', 
      description: 'Espresso ve buharla ısıtılmış süt',
      price: 25,
      image: 'https://source.unsplash.com/Ciqxn7FE4vE/400x300'
    },
    { 
      id: 'espresso', 
      name: 'Espresso', 
      description: 'Yoğun kahve deneyimi',
      price: 15,
      image: 'https://source.unsplash.com/Y6O6PKsYqQk/400x300'
    },
    { 
      id: 'tea', 
      name: 'Çay', 
      description: 'Demlenmiş siyah çay',
      price: 10,
      image: 'https://source.unsplash.com/AQ_og49rSYA/400x300'
    }
  ],
  printing: [
    { 
      id: 'blackWhite', 
      name: 'Siyah-Beyaz Baskı', 
      description: 'Sayfa başına siyah-beyaz baskı',
      price: 1,
      image: 'https://source.unsplash.com/UC0HZdUitWY/400x300'
    },
    { 
      id: 'color', 
      name: 'Renkli Baskı', 
      description: 'Sayfa başına renkli baskı',
      price: 3,
      image: 'https://source.unsplash.com/Ba7ik0ZUEVY/400x300'
    },
    { 
      id: 'binding', 
      name: 'Ciltleme', 
      description: 'Spiral ciltleme hizmeti',
      price: 15,
      image: 'https://source.unsplash.com/Ti4vJCr0ygY/400x300'
    }
  ],
  academic: [
    { 
      id: 'notebook', 
      name: 'Defter', 
      description: 'Çizgili, kaliteli kağıt, 100 yaprak',
      price: 20,
      image: 'https://source.unsplash.com/1WzXgLgm7Dk/400x300'
    },
    { 
      id: 'textbook', 
      name: 'Ders Kitabı', 
      description: 'Çeşitli dersler için ders kitapları',
      price: 80,
      image: 'https://source.unsplash.com/WAzxq9N--g0/400x300'
    },
    { 
      id: 'notes', 
      name: 'Ders Notları', 
      description: 'Çeşitli dersler için öğretim üyesi ders notları',
      price: 30,
      image: 'https://source.unsplash.com/7JGjoSVU0vg/400x300'
    }
  ]
};

export default function Services() {
  const { t, i18n } = useTranslation('common'); // Destructure both t and i18n
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState<{id: string, quantity: number, name: string, price: number}[]>([]);
  const [formData, setFormData] = useState({
    studentId: '',
    orderDetails: '',
    deliveryLocation: '',
    deliveryTime: '',
    paymentMethod: 'credit'
  });

  useEffect(() => {
    // Force reload of translations
    i18n.reloadResources(i18n.language, ['common']);
  }, [i18n]); // Add i18n to dependency array
  
  // Animation variants
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

  const handleSubmit = () => {
    // Here you would handle the form submission
    console.log({ selectedCategory, selectedItems, ...formData });
    handleNext();
  };

  // Calculate total price
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Handle menu item quantity change
  const handleItemQuantityChange = (itemId: string, change: number) => {
    // Find if item already exists in selection
    const existingItemIndex = selectedItems.findIndex(item => item.id === itemId);
    const itemCategory = selectedCategory as keyof typeof menuItems;
    const menuItem = menuItems[itemCategory]?.find(item => item.id === itemId);
    
    if (!menuItem) return;

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...selectedItems];
      const newQuantity = updatedItems[existingItemIndex].quantity + change;
      
      if (newQuantity <= 0) {
        // Remove item if quantity becomes zero or negative
        updatedItems.splice(existingItemIndex, 1);
      } else {
        // Otherwise update the quantity
        updatedItems[existingItemIndex].quantity = newQuantity;
      }
      
      setSelectedItems(updatedItems);
    } else if (change > 0) {
      // Add new item
      setSelectedItems([...selectedItems, {
        id: itemId,
        quantity: 1,
        name: menuItem.name,
        price: menuItem.price
      }]);
    }
  };

  // Get current quantity for an item
  const getItemQuantity = (itemId: string) => {
    const item = selectedItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Render different content based on active step
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
            
            <Grid container spacing={3}>
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
                          {category.icon}
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
      
      case 1: // New menu selection step
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={pageTransition}
          >
            <Box className={styles.breadcrumbContainer}>
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

              <Badge 
                className={styles.cartBadge}
                badgeContent={selectedItems.length} 
                color="primary"
                sx={{ '& .MuiBadge-badge': { fontSize: 14, fontWeight: 'bold' } }}
              >
                <Paper className={styles.cartPaper}>
                  <ShoppingCartIcon className={styles.cartIcon} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {calculateTotal()} ₺
                  </Typography>
                </Paper>
              </Badge>
            </Box>
            
            <Grid container spacing={3}>
              {selectedCategory && menuItems[selectedCategory as keyof typeof menuItems]?.map((item, index) => (
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
                          <Typography className={styles.menuItemPrice}>
                            {item.price} ₺
                          </Typography>
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
                        secondary={`${item.quantity} x ${item.price} ₺`}
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.quantity * item.price} ₺
                        </Typography>
                      </ListItemSecondaryAction>
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
                    <ListItemSecondaryAction>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {calculateTotal()} ₺
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Paper>
            )}
          </motion.div>
        );
      
      case 2: // Updated order details step
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
                {/* Personal Information Section */}
                <Grid item xs={12}>
                  <Typography className={styles.sectionTitle}>
                    {t('form.personalDetails')}
                  </Typography>
                </Grid>
                
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

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                {/* Delivery Information Section */}
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
                      <MenuItem value="library">{t('locations.library')}</MenuItem>
                      <MenuItem value="cafeteria">{t('locations.cafeteria')}</MenuItem>
                      <MenuItem value="engineeringBuilding">{t('locations.engineeringBuilding')}</MenuItem>
                      <MenuItem value="artBuilding">{t('locations.artBuilding')}</MenuItem>
                      <MenuItem value="scienceBuilding">{t('locations.scienceBuilding')}</MenuItem>
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
                      <MenuItem value="morning">{t('times.morning')}</MenuItem>
                      <MenuItem value="afternoon">{t('times.afternoon')}</MenuItem>
                      <MenuItem value="evening">{t('times.evening')}</MenuItem>
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

                {/* Payment Information Section */}
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
                
                {/* Order Summary */}
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
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {calculateTotal()} ₺
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        );
      
      case 3: // Updated review step (previously case 2)
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
                
                {/* Selected menu items */}
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
                              secondary={`${item.quantity} x ${item.price} ₺`}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {item.quantity * item.price} ₺
                            </Typography>
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
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {calculateTotal()} ₺
                          </Typography>
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.studentId')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.studentId || '-'}
                  </Typography>
                </Grid>
                
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
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('form.paymentMethod')}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.paymentMethod ? t(`payment.${formData.paymentMethod}`) : '-'}
                  </Typography>
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
              
              <Button 
                component={Link} 
                href="/"
                variant="contained" 
                color="primary"
                size="large"
              >
                {t('order.returnHome')}
              </Button>
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
            
            <Breadcrumbs aria-label="breadcrumb">
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
          >
            {t('services.order.title')}
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 700 }}
          >
            {t('services.order.fullDescription')}
          </Typography>
        </motion.div>
        
        {/* Stepper - updated to show 4 steps */}
        {activeStep < 4 && (
          <Box className={styles.stepperContainer}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{t(`order.steps.${label}`)}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
          
        {/* Step Content */}
        <Box className={styles.contentContainer}>
          {getStepContent(activeStep)}
        </Box>
        
        {/* Navigation Buttons */}
        {activeStep < 4 && (
          <Box className={`${styles.navigationContainer} ${activeStep === 0 ? styles.navigationContainerEnd : styles.navigationContainerSpaceBetween}`}>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                sx={{ mr: 1 }}
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
                         (activeStep === 2 && !formData.studentId)}
              >
                {t('navigation.next')}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                endIcon={<CheckCircleOutlineIcon />}
              >
                {t('navigation.submit')}
              </Button>
            )}
          </Box>
        )}
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
