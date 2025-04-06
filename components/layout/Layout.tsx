import { ReactNode, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import TranslateIcon from '@mui/icons-material/Translate';
import MicIcon from '@mui/icons-material/Mic';
import VoiceCommandListener from '../ui/VoiceCommandListener';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Check for stored language preference when component mounts
  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && storedLang !== i18n.language) {
      router.push(router.pathname, router.asPath, { locale: storedLang });
    }
  }, []);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'tr' ? 'en' : 'tr';
    
    // Store the preferred language in localStorage
    localStorage.setItem('preferredLanguage', newLang);
    
    // Update the page with the new locale
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#fe6b01' }}>
        <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', py: isMobile ? 1 : 0 }}>
          <Typography 
            variant={isMobile ? "h6" : "h6"} 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              mb: isMobile ? 1 : 0,
              fontSize: isMobile ? '1.1rem' : '1.25rem'
            }}
          >
            {t('appName')}
          </Typography>
          <Box>
            <IconButton 
              color="inherit"
              onClick={toggleLanguage} 
              aria-label="change language"
              size={isMobile ? "small" : "medium"}
            >
              <TranslateIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton 
              color="inherit"
              onClick={() => setVoiceCommandActive(prev => !prev)} 
              aria-label="voice commands"
              size={isMobile ? "small" : "medium"}
            >
              <MicIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
    
      <Container component="main" sx={{ 
        mt: isMobile ? 2 : 4, 
        mb: isMobile ? 2 : 4, 
        flexGrow: 1,
        px: isMobile ? 2 : 3 
      }}>
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
      
      <Box component="footer" sx={{ 
        p: isMobile ? 1.5 : 2, 
        bgcolor: 'background.paper', 
        textAlign: 'center',
        fontSize: isMobile ? '0.8rem' : '0.875rem'
      }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {t('footerText')}
        </Typography>
      </Box>
    </Box>
  );
}
