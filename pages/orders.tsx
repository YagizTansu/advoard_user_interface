import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Divider,
  Paper,
  Badge,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItem,
  ListItemText,
  List
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Notifications as NotificationsIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { supabase } from '../src/lib/supabase';
import { format } from 'date-fns';
import { dbService } from '../src/services/firebaseService';

// Define type for order data from Supabase
interface Order {
  id: string;
  student_id: string;
  order_items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    total_price: number;
  }>;
  category: string;
  total_amount: number;
  delivery_details: {
    location: string;
    time: string;
    special_instructions: string;
  };
  payment_method: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

export default function Orders() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newOrderAlert, setNewOrderAlert] = useState<boolean>(false);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // State for selected order to view details
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState<boolean>(false);

  // Pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // State for sending order to table
  const [isSendingToTable, setIsSendingToTable] = useState<boolean>(false);
  const [sendToTableSuccess, setSendToTableSuccess] = useState<boolean>(false);
  const [sendToTableError, setSendToTableError] = useState<string | null>(null);

  // Function to fetch orders from Supabase
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      if (data) {
        setOrders(data as Order[]);
      }
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('orders-channel')
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' }, 
        (payload) => {
          console.log('Change received!', payload);
          // Show alert when new order comes in
          if (payload.eventType === 'INSERT') {
            setNewOrderAlert(true);
            // Refresh orders
            fetchOrders();
          } else if (payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            // Just refresh orders for updates and deletes
            fetchOrders();
          }
        }
      )
      .subscribe();
    
    // Clean up subscription
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [statusFilter]);

  // Handle filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(e.target.value as string);
    setPage(0);
  };

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open order details dialog
  const handleOpenOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  // Close order details dialog
  const handleCloseOrderDetails = () => {
    setOrderDetailsOpen(false);
  };

  // Order update handler
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
        
      if (error) throw error;
      
      // Update local order state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as Order['status'] } 
          : order
      ));
      
      // Close dialog if open
      if (orderDetailsOpen && selectedOrder?.id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status: newStatus as Order['status']
        });
      }
      
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again.');
    }
  };

  // Handle sending order to table via robot
  const handleSendToTable = async (orderId: string, location: string) => {
    try {
      setIsSendingToTable(true);
      setSendToTableSuccess(false);
      setSendToTableError(null);
      
      // Determine goal_node based on location
      let goalNode = "D014"; // Default value
      
      // Check if location contains a table number
      if (location.toLowerCase().includes('table')) {
        // Extract table number
        const tableMatch = location.toLowerCase().match(/table(\d+)/);
        if (tableMatch && tableMatch[1]) {
          const tableNum = parseInt(tableMatch[1], 10);
          if (tableNum >= 1 && tableNum <= 10) {
            // Format: t_01, t_02, etc.
            goalNode = `t_${tableNum.toString().padStart(2, '0')}`;
          }
        }
      }

      const commandData = {
        request: {
          finish_batch: false,
          fleet_name: "ieü",
          goal_node: goalNode,
          start_batch: true,
          time_stamp: 212.567,
        },
        service_name: "command_fleet_goal"
      };

      // Send command to Firebase for robot
      const robotCommandId = await dbService.setDataWithId('robots_command', "robot4", commandData);
      console.log('Robot command sent for order delivery, command ID:', robotCommandId);
      
      // Update order status to completed
      await handleUpdateOrderStatus(orderId, 'completed');
      
      setSendToTableSuccess(true);
      
      // Close the dialog immediately
      handleCloseOrderDetails();
      
    } catch (error) {
      console.error('Error sending order to table:', error);
      setSendToTableError('Failed to send the order to table. Please try again.');
    } finally {
      setIsSendingToTable(false);
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Search in order items
    const itemsMatch = order.order_items.some(item => 
      item.name.toLowerCase().includes(searchLower)
    );
    
    // Search in other fields
    return (
      order.id.toLowerCase().includes(searchLower) ||
      (order.student_id && order.student_id.toLowerCase().includes(searchLower)) ||
      order.delivery_details.location.toLowerCase().includes(searchLower) ||
      itemsMatch
    );
  });
  
  // Paginated orders
  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Get status chip color and label
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'warning', label: t('orders.statusOptions.pending') };
      case 'processing':
        return { color: 'info', label: t('orders.statusOptions.processing') };
      case 'completed':
        return { color: 'success', label: t('orders.statusOptions.completed') };
      case 'cancelled':
        return { color: 'error', label: t('orders.statusOptions.cancelled') };
      default:
        return { color: 'default', label: status };
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      <Head>
        <title>{t('pageTitle.orders')}</title>
      </Head>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
              <Typography color="text.primary">{t('nav.orders')}</Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
              {t('orders.title')}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
              <Badge 
                color="error" 
                variant="dot" 
                invisible={!newOrderAlert}
              >
                <Button 
                  startIcon={<RefreshIcon />} 
                  onClick={() => {
                    fetchOrders();
                    setNewOrderAlert(false);
                  }}
                  variant="outlined"
                >
                  {t('common.refresh')}
                </Button>
              </Badge>
            </Box>
          </Box>
        </Box>

        <Paper sx={{ mb: 4, p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            mb: 2
          }}>
            <TextField
              label={t('orders.search')}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: { sm: 300 } }}
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            
            <FormControl 
              variant="outlined" 
              size="small"
              sx={{ minWidth: 200 }}
            >
              <InputLabel id="status-filter-label">{t('orders.filterByStatus')}</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label={t('orders.filterByStatus')}
              >
                <MenuItem value="all">{t('orders.statusOptions.all')}</MenuItem>
                <MenuItem value="pending">{t('orders.statusOptions.pending')}</MenuItem>
                <MenuItem value="processing">{t('orders.statusOptions.processing')}</MenuItem>
                <MenuItem value="completed">{t('orders.statusOptions.completed')}</MenuItem>
                <MenuItem value="cancelled">{t('orders.statusOptions.cancelled')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          ) : filteredOrders.length === 0 ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              {searchTerm 
                ? t('orders.noSearchResults') 
                : statusFilter !== 'all'
                  ? t('orders.noOrdersWithStatus', { status: t(`orders.statusOptions.${statusFilter}`) })
                  : t('orders.noOrders')
              }
            </Alert>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.orderId')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.items')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.location')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.totalAmount')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.status')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.createdAt')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('orders.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {paginatedOrders.map((order) => {
                      const { color, label } = getStatusInfo(order.status);
                      
                      return (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'table-row' }}
                        >
                          <TableCell component="th" scope="row">
                            {order.id.substring(0, 8)}...
                          </TableCell>
                          <TableCell>
                            {order.order_items.length > 0 ? (
                              <Tooltip
                                title={
                                  <List dense disablePadding>
                                    {order.order_items.map((item, idx) => (
                                      <ListItem key={idx} sx={{ py: 0.5 }}>
                                        <ListItemText
                                          primary={`${item.name} (${item.quantity}x)`}
                                          secondary={`${item.total_price} ₺`}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                }
                              >
                                <Typography variant="body2">
                                  {order.order_items.length} {t('orders.itemCount')}
                                </Typography>
                              </Tooltip>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>{order.delivery_details.location}</TableCell>
                          <TableCell>{order.total_amount} ₺</TableCell>
                          <TableCell>
                            <Chip 
                              label={label} 
                              color={color as any}
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>{formatDate(order.created_at)}</TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              onClick={() => handleOpenOrderDetails(order)}
                              variant="outlined"
                            >
                              {t('orders.viewDetails')}
                            </Button>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('table.rowsPerPage')}
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} ${t('table.of')} ${count}`
            }
          />
        </Paper>
      </Container>
      
      {/* Order Details Dialog */}
      <Dialog
        open={orderDetailsOpen}
        onClose={handleCloseOrderDetails}
        fullWidth
        maxWidth="md"
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {t('orders.orderDetails')} #{selectedOrder.id.substring(0, 8)}
                </Typography>
                <Chip 
                  label={getStatusInfo(selectedOrder.status).label} 
                  color={getStatusInfo(selectedOrder.status).color as any}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('orders.orderItems')}
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List dense>
                      {selectedOrder.order_items.map((item, idx) => (
                        <ListItem key={idx} sx={{ py: 1 }} divider={idx < selectedOrder.order_items.length - 1}>
                          <ListItemText
                            primary={item.name}
                            secondary={`${item.quantity} x ${item.price} ₺`}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.total_price} ₺
                          </Typography>
                        </ListItem>
                      ))}
                      <ListItem sx={{ pt: 2 }}>
                        <ListItemText
                          primary={<Typography variant="subtitle2">{t('orders.totalAmount')}</Typography>}
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {selectedOrder.total_amount} ₺
                        </Typography>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('orders.deliveryDetails')}
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <RoomIcon fontSize="small" sx={{ mr: 1 }} />
                              <Typography variant="body2">{t('form.deliveryLocation')}</Typography>
                            </Box>
                          }
                          secondary={selectedOrder.delivery_details.location}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                              <Typography variant="body2">{t('form.deliveryTime')}</Typography>
                            </Box>
                          }
                          secondary={selectedOrder.delivery_details.time}
                        />
                      </ListItem>
                      {selectedOrder.delivery_details.special_instructions && (
                        <ListItem>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                                <Typography variant="body2">{t('form.orderDetails')}</Typography>
                              </Box>
                            }
                            secondary={selectedOrder.delivery_details.special_instructions}
                          />
                        </ListItem>
                      )}
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                              <Typography variant="body2">{t('orders.orderedAt')}</Typography>
                            </Box>
                          }
                          secondary={formatDate(selectedOrder.created_at)}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('orders.updateStatus')}
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button 
                        variant={selectedOrder.status === 'pending' ? 'contained' : 'outlined'}
                        color="warning"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'pending')}
                        disabled={selectedOrder.status === 'pending'}
                      >
                        {t('orders.statusOptions.pending')}
                      </Button>
                      <Button 
                        variant={selectedOrder.status === 'processing' ? 'contained' : 'outlined'}
                        color="info"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'processing')}
                        disabled={selectedOrder.status === 'processing'}
                      >
                        {t('orders.statusOptions.processing')}
                      </Button>
                      <Button 
                        variant={selectedOrder.status === 'completed' ? 'contained' : 'outlined'}
                        color="success"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'completed')}
                        disabled={selectedOrder.status === 'completed'}
                      >
                        {t('orders.statusOptions.completed')}
                      </Button>
                      <Button 
                        variant={selectedOrder.status === 'cancelled' ? 'contained' : 'outlined'}
                        color="error"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                        disabled={selectedOrder.status === 'cancelled'}
                      >
                        {t('orders.statusOptions.cancelled')}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RoomIcon />}
                onClick={() => handleSendToTable(selectedOrder.id, selectedOrder.delivery_details.location)}
                disabled={isSendingToTable || selectedOrder.status === 'completed' || selectedOrder.status === 'cancelled'}
              >
                {isSendingToTable ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    {t('orders.sendingToTable')}
                  </>
                ) : (
                  t('orders.sendToTable')
                )}
              </Button>
              <Button onClick={handleCloseOrderDetails}>
                {t('common.close')}
              </Button>
            </DialogActions>
            
            {/* Success message for sending to table */}
            <Snackbar
              open={sendToTableSuccess}
              autoHideDuration={2000}
              onClose={() => setSendToTableSuccess(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert 
                severity="success"
                sx={{ width: '100%' }}
              >
                {t('orders.sentToTableSuccess')}
              </Alert>
            </Snackbar>
            
            {/* Error message for sending to table */}
            <Snackbar
              open={!!sendToTableError}
              autoHideDuration={4000}
              onClose={() => setSendToTableError(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert 
                severity="error"
                sx={{ width: '100%' }}
              >
                {sendToTableError}
              </Alert>
            </Snackbar>
          </>
        )}
      </Dialog>
      
      <Snackbar
        open={newOrderAlert}
        autoHideDuration={6000}
        onClose={() => setNewOrderAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNewOrderAlert(false)} 
          severity="info"
          sx={{ width: '100%' }}
        >
          {t('orders.newOrderReceived')}
        </Alert>
      </Snackbar>
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
