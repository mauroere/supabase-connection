import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Inventory, LocalShipping, Payment, Notifications, Logout } from '@mui/icons-material';
import { InventoryManager } from './InventoryManager';
import { ShippingManager } from './ShippingManager';
import { PaymentManager } from './PaymentManager';
import { NotificationsManager } from './NotificationsManager';

const drawerWidth = 240;

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          { id: 1, name: 'Wireless Headphones', price: 199.99, published: true },
          { id: 2, name: 'Smart Watch', price: 299.99, published: false },
        ];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders
      ? JSON.parse(savedOrders)
      : [
          { id: 1, customer: 'John Doe', status: 'Preparing' },
          { id: 2, customer: 'Jane Smith', status: 'Shipped' },
        ];
  });

  const updateProducts = (updatedProducts: typeof products) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateOrders = (updatedOrders: typeof orders) => {
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManager products={products} updateProducts={updateProducts} />;
      case 'shipping':
        return <ShippingManager orders={orders} updateOrders={updateOrders} />;
      case 'payments':
        return <PaymentManager />;
      case 'notifications':
        return <NotificationsManager />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'primary.main',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Panel de Administración
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleTabChange('inventory')}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Inventario" />
            </ListItem>
            <ListItem button onClick={() => handleTabChange('shipping')}>
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="Envíos" />
            </ListItem>
            <ListItem button onClick={() => handleTabChange('payments')}>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Pagos" />
            </ListItem>
            <ListItem button onClick={() => handleTabChange('notifications')}>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary="Notificaciones" />
            </ListItem>
            <ListItem button onClick={onLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
