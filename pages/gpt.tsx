import { useState, useRef, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
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
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/gpt.module.css';

// Define interface for chat messages
interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
}

export default function GptChat() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Store the current message to use in the timeout
      const currentMessage = message;
      
      // In a real app, you would send this message to your API
      setChatHistory(prev => [...prev, { type: 'user', content: currentMessage }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev, 
          { type: 'ai', content: `This is a simulated response to: "${currentMessage}"` }
        ]);
      }, 1000);
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
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
              onClick={message ? handleSendMessage : undefined}
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                }
              }}
            >
              {message ? <SendIcon /> : <MicIcon />}
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
              <Typography>{msg.content}</Typography>
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
