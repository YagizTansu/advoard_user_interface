import { ReactNode, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box,Container } from '@mui/material';
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
        <Toolbar>
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
