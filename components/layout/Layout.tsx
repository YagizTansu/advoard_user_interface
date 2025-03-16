import { ReactNode, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import TranslateIcon from '@mui/icons-material/Translate';
import MicIcon from '@mui/icons-material/Mic';
import VoiceCommandListener from '../ui/VoiceCommandListener';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    router.push(router.pathname, router.pathname, { locale: newLang });
  };
  
  const navigationItems = [
    { text: t('navigation.home'), icon: <HomeIcon />, path: '/' },
    { text: t('navigation.services'), icon: <RoomServiceIcon />, path: '/services' },
    { text: t('navigation.directions'), icon: <MapIcon />, path: '/directions' },
    { text: t('navigation.information'), icon: <InfoIcon />, path: '/information' },
    { text: t('navigation.help'), icon: <HelpIcon />, path: '/help' },
  ];
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#FF8C00' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('appName')}
          </Typography>
          <IconButton 
            color="inherit"
            onClick={toggleLanguage} 
            aria-label="change language"
          >
            <TranslateIcon />
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={() => setVoiceCommandActive(prev => !prev)} 
            aria-label="voice commands"
          >
            <MicIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            {navigationItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                onClick={() => router.push(item.path)}
                selected={router.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      
      {voiceCommandActive && (
        <VoiceCommandListener 
          onCommand={(command) => {
            // Handle voice commands
            console.log("Voice command received:", command);
            setVoiceCommandActive(false);
          }}
          onClose={() => setVoiceCommandActive(false)}
        />
      )}
      
      <Box component="footer" sx={{ p: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {t('footerText')}
        </Typography>
      </Box>
    </Box>
  );
}
