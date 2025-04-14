import { useState, useRef, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  IconButton, 
  Divider, 
  Button,
  Paper,
  InputAdornment,
  useMediaQuery,
  useTheme,
  CircularProgress,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/gpt.module.css';

// Define interface for chat messages
interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
  isLoading?: boolean;
}

export default function GptChat() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('tr'); // Default language
  const inputRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      // Store the current message to use in the API call
      const currentMessage = message;
      
      // Add user message to chat
      setChatHistory(prev => [...prev, { type: 'user', content: currentMessage }]);
      
      // Add placeholder for AI response
      setChatHistory(prev => [...prev, { type: 'ai', content: '', isLoading: true }]);
      
      setMessage('');
      setIsLoading(true);
      
      try {
        // Prepare form data
        const formData = new URLSearchParams();
        formData.append('question', encodeURIComponent(currentMessage));
        formData.append('lang', language);
        formData.append('source', 'robot');
        formData.append('ekoid', 'abc');
        formData.append('hash', 'abc');
        
        // Make API call
        const response = await axios.post(
          'http://10.0.73.66/ekobot/sendQuestion_ekobot.php',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        
        // Update chat with AI response
        setChatHistory(prev => {
          const updatedHistory = [...prev];
          // Replace the loading message with the actual response
          updatedHistory[updatedHistory.length - 1] = {
            type: 'ai',
            content: response.data || 'No response received'
          };
          return updatedHistory;
        });
        
      } catch (error) {
        console.error('Error calling bot API:', error);
        
        // Update chat with error message
        setChatHistory(prev => {
          const updatedHistory = [...prev];
          // Replace the loading message with error
          updatedHistory[updatedHistory.length - 1] = {
            type: 'ai',
            content: 'Sorry, there was an error connecting to the bot. Please try again later.'
          };
          return updatedHistory;
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever chat history updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Box className={styles.pageContainer}>
      <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box className={styles.headerSection}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h1" className={styles.chatTitle}>
              {t('What can I help with?')}
            </Typography>
          </motion.div>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, ml: 2 }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ height: 35 }}
            >
              <MenuItem value="tr">Turkish</MenuItem>
              <MenuItem value="eng">English</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Input section - Now placed before chat history */}
        <Box className={styles.inputSection} sx={{ mb: 3 }}>
          <Paper 
            elevation={1} 
            className={styles.inputContainer}
          >
            <IconButton size="small" className={styles.iconButton}>
              <AddIcon />
            </IconButton>
            
            <TextField
              ref={inputRef}
              fullWidth
              variant="standard"
              placeholder={t('Ask anything')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              disabled={isLoading}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                    <SearchIcon sx={{ color: 'text.secondary', mx: 1 }} />
                  </InputAdornment>
                ),
                className: styles.inputField,
                sx: { height: '40px' }
              }}
              sx={{ my: 0 }}
            />

            {!isMobile && (
              <Button 
                variant="text" 
                color="inherit"
                className={styles.reasonButton}
                disableElevation
                sx={{
                  textTransform: 'none',
                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '20px',
                  px: 2,
                  mr: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.08)',
                  }
                }}
              >
                {t('Reason')}
              </Button>
            )}

            <IconButton 
              size="medium" 
              className={styles.micButton}
              onClick={message && !isLoading ? handleSendMessage : undefined}
              disabled={isLoading}
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : (message ? <SendIcon /> : <MicIcon />)}
            </IconButton>
          </Paper>
        </Box>

        {/* Chat messages container - Now placed after input */}
        <Box 
          ref={chatContainerRef}
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {chatHistory.map((msg, index) => (
            <Box 
              key={index}
              sx={{ 
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                backgroundColor: msg.type === 'user' ? '#e1f5fe' : '#f5f5f5',
                borderRadius: 2,
                p: 2,
                mb: 2
              }}
            >
              {msg.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <Typography>{msg.content}</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  // Use a default locale if none is provided
  const safeLocale = locale || 'tr';
  
  return {
    props: {
      ...(await serverSideTranslations(safeLocale, ['common'])),
    },
  };
}
