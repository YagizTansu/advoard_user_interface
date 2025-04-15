import { ReactNode, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, useMediaQuery, useTheme } from '@mui/material';
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

  // Parse voice commands for navigation
  const parseVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log("Processing command:", lowerCommand);
    
    // Map common page names to routes
    const routeMap: {[key: string]: string} = {
      'home': '/',
      'anasayfa': '/',
      'service': '/services',
      'services': '/services',
      'servis': '/services',
      'help': '/help',
      'yardım': '/help',
      'directions': '/directions',
      'yönlendirme': '/directions',
      'direction': '/directions',
      'yönlendirmeler': '/directions',
      'gpt': '/gpt',
      'chatgpt': '/gpt',
      'chat gpt': '/gpt',
      'uniGPT': '/gpt',
      'chat': '/gpt',
      'uni gpt': '/gpt',
      'uni': '/gpt',
      'bilgi merkezi': '/informations',
      'information center': '/informations',
      'informations': '/informations',
      'bilgiler': '/informations',
      'bilgi': '/informations',
      'exams': '/exams',
      'sınavlar': '/exams',
      'exam': '/exams',
      'sınav': '/exams',
      'sipariş': '/services',
      'order': '/services',
      'siparişler': '/services',
      'orders': '/services',
      'sipariş ver': '/services',
      'order now': '/services',
      'sipariş al': '/services',
      'take order': '/services',



    };
    
    // Check if any of the keywords are present in the command
    for (const [keyword, route] of Object.entries(routeMap)) {
      if (lowerCommand.includes(keyword)) {
        router.push(route);
        return true;
      }
    }
    
    console.log("No navigation keywords found in command");
    return false;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#fe6b01' }}>
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'center', // Changed to center everything
          py: isMobile ? 1 : 0 
        }}>
          {/* Center section - Modern styled buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 2,
            width: isMobile ? '100%' : 'auto' 
          }}>
            <Box
              component="button"
              onClick={toggleLanguage}
              aria-label="change language"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              <TranslateIcon sx={{ mr: 1 }} />
              {i18n.language === 'tr' ? 'EN' : 'TR'}
            </Box>
            
            <Box
              component="button"
              onClick={() => setVoiceCommandActive(prev => !prev)}
              aria-label="voice commands"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              <MicIcon sx={{ mr: 1 }} />
              {t('voiceCommand')}
            </Box>
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
            console.log("Voice command received:", command);
            
            // Try to parse the command for navigation
            const handled = parseVoiceCommand(command);
            
            if (!handled) {
              // Handle other types of commands here if needed
              console.log("Command not recognized or not related to navigation");
            }
            
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
