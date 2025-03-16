import { SetStateAction, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
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
      image: 'data:image/jpeg;base64,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'
    },
    { 
      id: 'salad', 
      name: 'Mevsim Salatası', 
      description: 'Taze mevsim sebzeleri ile hazırlanmış salata',
      price: 30,
      image: 'https://www.shutterstock.com/image-photo/mevsim-salata-turkish-season-salad-600w-1459763036.jpg'
    },
    { 
      id: 'burger', 
      name: 'Hamburger', 
      description: 'Dana eti, domates, marul, soğan, özel sos',
      price: 45,
      image: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1440&impolicy=high_res'
    },
    { 
      id: 'pizza', 
      name: 'Pizza', 
      description: 'Karışık malzemeli pizza',
      price: 50,
      image: 'https://source.unsplash.com/MQUqbmszGGM/400x300'
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
                      onClick={() => handleCategorySelect(category.id)}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '12px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        }
                      }}
                    >
                      <Box sx={{ 
                        height: '6px', 
                        width: '100%', 
                        bgcolor: category.color 
                      }} />
                      
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 3
                      }}>
                        <Box sx={{ 
                          mb: 2, 
                          color: category.color,
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          {category.icon}
                        </Box>
                        
                        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
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
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                badgeContent={selectedItems.length} 
                color="primary"
                sx={{ '& .MuiBadge-badge': { fontSize: 14, fontWeight: 'bold' } }}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 1.5, 
                    display: 'flex', 
                    alignItems: 'center',
                    borderRadius: '12px'
                  }}
                >
                  <ShoppingCartIcon sx={{ mr: 1 }} />
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
                    <Card sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      overflow: 'hidden',
                      borderRadius: '12px'
                    }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="h6" component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {item.price} ₺
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {item.description}
                        </Typography>
                      </CardContent>
                      
                      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
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
              <Paper elevation={0} sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: '12px', 
                bgcolor: 'rgba(0,0,0,0.02)' 
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
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
            
            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: '12px',
              bgcolor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <Grid container spacing={3}>
                {/* Personal Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
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
                  <Typography variant="h6" sx={{ mb: 2, mt: 1, fontWeight: 600 }}>
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
                  <Typography variant="h6" sx={{ mb: 2, mt: 1, fontWeight: 600 }}>
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
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
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

            <Paper elevation={0} sx={{ 
              p: 4, 
              borderRadius: '12px',
              mb: 3,
              bgcolor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
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
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
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
                  <Typography variant="body1" 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(0,0,0,0.02)', 
                      borderRadius: 1,
                      mt: 1
                    }}>
                    {formData.orderDetails || '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ bgcolor: '#f0f9ff', p: 2, borderRadius: 2, mb: 3 }}>
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
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              py: 6
            }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <CheckCircleOutlineIcon sx={{ 
                  fontSize: 80, 
                  color: 'success.main',
                  mb: 2
                }} />
              </motion.div>
              
              <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                {t('order.success.title')}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
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
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
              <Typography color="text.primary">{t('nav.services')}</Typography>
            </Breadcrumbs>
          </Box>
          
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 1, 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
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
          <Box sx={{ mb: 6, width: '100%' }}>
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
        <Box sx={{ my: 4 }}>
          {getStepContent(activeStep)}
        </Box>
        
        {/* Navigation Buttons */}
        {activeStep < 4 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: activeStep === 0 ? 'flex-end' : 'space-between',
            mt: 4 
          }}>
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
