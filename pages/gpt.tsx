import { useState, useRef, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  Breadcrumbs,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../styles/gpt.module.css';
import { SpeechRecognition } from '../types/speech-recognition';

// Define interface for chat messages
interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
  isLoading?: boolean;
  isTyping?: boolean; // Add new property to track typing state
}

// Sabit sorular ve cevaplar sözlüğü
const staticQnA: { [key: string]: string } = {
  'transkript nasıl alırım': `Transkript almak için OASIS-Öğrenci Bilgi Sistemi üzerinden talep başvurusu yapmanız gerekmektedir. Detaylı açıklamalar için ilgili dokümana ulaşmak için şu linki kullanabilirsiniz: https://phoenix.ieu.edu.tr/betanix/uploads/cms/oim.ieu.edu.tr/4227_1675165247.pdf. Ayrıca, bu konuda daha fazla bilgi almak isterseniz Mısra ORUÇ ile iletişime geçebilirsiniz. İletişim bilgileri: 0 232 488 83 68, misra.oruc@ieu.edu.tr.\nDaha fazlası için https://www.ieu.edu.tr/tr/students adresindeki Öğrenci Portalı'na bakabilirsiniz.`,
  'yüksek şeref öğrencisi olmak için ortalamam kaç olmalı': `Yüksek şeref öğrencisi olmak için dönem sonu not ortalamanızın en az 3,50 olması gerekmektedir.\nDaha fazlası için https://www.ieu.edu.tr/tr/students adresindeki Öğrenci Portalı'na bakabilirsiniz.`,
  'disiplin cezası alırsam şeref öğrencisi olabilir miyim': `Disiplin cezası alan öğrenciler şeref öğrencisi olamazlar. Bu nedenle disiplin cezası alırsanız şeref öğrencisi olamazsınız.\nDaha fazlası için https://www.ieu.edu.tr/tr/students adresindeki Öğrenci Portalı'na bakabilirsiniz.`,
  'not ortalamam diplomamda görünecek mi': `Mezuniyet dereceleri diplomaya yazılmaz. Bu nedenle not ortalamanız diplomanızda görünmeyecektir.\nDaha fazlası için https://www.ieu.edu.tr/tr/students adresindeki Öğrenci Portalı'na bakabilirsiniz.`,
  'kaç dönem kayıt dondurma hakkım var': `Yabancı dil hazırlık sınıfında en fazla iki dönem, önlisans programlarında üç dönem ve lisans programlarında dört dönem kayıt dondurma hakkınız vardır. Zorunlu hallerde Üniversite Yönetim Kurulu kararı ile bu süreler aşılabilir.\nDaha fazlası için https://www.ieu.edu.tr/tr/students adresindeki Öğrenci Portalı'na bakabilirsiniz.`
};

// Normalize fonksiyonu: küçük harfe çevir, noktalama ve boşlukları temizle
function normalizeQuestion(q: string) {
  return q
    .toLocaleLowerCase('tr')
    .replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Basit Levenshtein mesafesi fonksiyonu
function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

// Benzer soruyu bulmak için fonksiyon
function findSimilarStaticAnswer(normalizedInput: string, threshold = 6): string | undefined {
  let minDistance = Infinity;
  let bestKey = undefined;
  for (const key of Object.keys(staticQnA)) {
    const dist = levenshtein(normalizedInput, key);
    if (dist < minDistance) {
      minDistance = dist;
      bestKey = key;
    }
  }
  if (minDistance <= threshold) {
    return staticQnA[bestKey!];
  }
  return undefined;
}

export default function GptChat() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null); // Use ref for timer ID
  const inputRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const typingSpeedRef = useRef<number>(30); // milliseconds per character

  // Add HTML entity decoder function
  const decodeHtmlEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  // Inactivity tracker - redirect after 30 seconds of no interaction
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'touchstart', 'keydown', 'scroll', 'wheel', 'touchmove', 'touchend'];

    // Function to reset the timer
    const resetTimer = () => {
      // Clear existing timer if any
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      // Set new timer for 30 seconds (30000 ms)
      inactivityTimerRef.current = setTimeout(() => {
        // Redirect to home page after inactivity
        router.push('/');
      }, 50000); // 30 seconds
    };

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Initial timer start
    resetTimer();

    // Cleanup function
    return () => {
      // Clear the timer when the component unmounts
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      // Remove event listeners
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router]); // Add router to dependency array as it's used inside the effect

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) { // Add null check here
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'tr-TR'; // Set to Turkish

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          
          // Auto-send after voice recognition completes
          setTimeout(() => {
            handleSendMessage(transcript);
          }, 500);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event);
          setIsListening(false);
        };
      }
    }

    return () => {
      // Cleanup
      if (recognitionRef.current) {
        try {
          // Check if abort method exists before calling it
          if (typeof recognitionRef.current.abort === 'function') {
            recognitionRef.current.abort();
          } else {
            // Fallback to stop if abort isn't available
            recognitionRef.current.stop();
          }
        } catch (error) {
          console.error('Error aborting speech recognition:', error);
        }
      }
    };
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert(t('Speech recognition is not supported in your browser'));
      return;
    }

    try {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsListening(false);
      alert(t('Speech recognition failed. Please try again.'));
    }
  };

  const handleSendMessage = async (voiceMessage?: string) => {
    const messageToSend = voiceMessage || message;

    // Soru normalize edilip sabit cevaplardan biriyle veya benzeriyle eşleşiyorsa API'ye gitmeden cevapla
    const normalized = normalizeQuestion(messageToSend);
    let staticAnswer = staticQnA[normalized];
    if (!staticAnswer) {
      staticAnswer = findSimilarStaticAnswer(normalized) || '';
    }
    if (staticAnswer) {
      if (!hasStartedChat) setHasStartedChat(true);
      setChatHistory(prev => [
        ...prev,
        { type: 'user', content: messageToSend },
        { type: 'ai', content: staticAnswer, isTyping: true }
      ]);
      setTypingIndex(chatHistory.length + 1); // Start typing effect for static answer
      setDisplayedText('');
      setMessage('');
      return;
    }

    if (messageToSend.trim() && !isLoading) {
      // Set chat as started on first message
      if (!hasStartedChat) {
        setHasStartedChat(true);
      }
      
      // Store the current message to use in the API call
      const currentMessage = messageToSend;
      
      // Add user message to chat
      setChatHistory(prev => [...prev, { type: 'user', content: currentMessage }]);
      
      // Add placeholder for AI response
      setChatHistory(prev => [...prev, { type: 'ai', content: '', isLoading: true }]);
      
      setMessage('');
      setIsLoading(true);
      
      try {
        // Use our proxy API route instead of calling the external API directly
        const response = await axios.get(
          '/api/proxy-bot',
          {
            params: {
              question: currentMessage,
              lang: 'tr',
              source: 'robot',
              ekoid: 'abc',
              hash: 'abc'
            }
          }
        );

        // Extract Result field from JSON response and decode HTML entities
        let result = '';
        if (response.data) {
          // Handle if response is already a JSON object
          if (typeof response.data === 'object' && response.data.Result) {
            result = decodeHtmlEntities(response.data.Result);
          } 
          // Handle if response is a string containing JSON
          else if (typeof response.data === 'string') {
            try {
              const parsedData = JSON.parse(response.data);
              if (parsedData.Result) {
                result = decodeHtmlEntities(parsedData.Result);
              }
            } catch (error) {
              console.error('Error parsing JSON response:', error);
              result = response.data;
            }
          } 
          // Fallback for any other format
          else {
            result = 'Unexpected response format received';
          }
        } else {
          result = 'No response received';
        }
        
        // Update chat with AI response
        setChatHistory(prev => {
          const updatedHistory = [...prev];
          updatedHistory[updatedHistory.length - 1] = {
            type: 'ai',
            content: result,
            isTyping: true // Set as typing
          };
          return updatedHistory;
        });

        // Start typing effect for the latest message
        const newIndex = chatHistory.length;
        setTypingIndex(newIndex);
        setDisplayedText('');
        
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

  // Typing effect implementation
  useEffect(() => {
    if (typingIndex !== null && chatHistory[typingIndex]?.isTyping) {
      const fullText = chatHistory[typingIndex].content;
      if (displayedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
        }, typingSpeedRef.current);
        return () => clearTimeout(timeout);
      } else {
        setChatHistory(prev => {
          const updatedHistory = [...prev];
          updatedHistory[typingIndex] = {
            ...updatedHistory[typingIndex],
            isTyping: false
          };
          return updatedHistory;
        });
        setTypingIndex(null);
      }
    }
  }, [typingIndex, displayedText, chatHistory]);

  useEffect(() => {
    // Scroll to bottom whenever chat history updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Box className={styles.pageContainer}>
      <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Breadcrumb navigation - Fixed hydration issue */}
        <Box className={styles.breadcrumbContainer}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" legacyBehavior>
              <a className={styles.breadcrumbLink}>
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                {t('Home')}
              </a>
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
              UniGPT
            </Typography>
          </Breadcrumbs>
          <Box sx={{ ml: 'auto' }}>
            <IconButton
              size="small"
              aria-label="go back"
              onClick={() => router.back()}
              sx={{ color: '#555' }}
            >
              <ArrowBackIcon fontSize="small" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {t('Back')}
              </Typography>
            </IconButton>
          </Box>
        </Box>

        <Box className={styles.headerSection}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" className={`${styles.chatTitle} ${styles.uniGptTitle}`}>
              {t('uniGpt.title')}
            </Typography>
            <Typography variant="subtitle1" className={styles.uniGptSubtitle}>
              {t('uniGpt.subtitle')}
            </Typography>
          </motion.div>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Conditionally place input before or after chat based on hasStartedChat */}
        {!hasStartedChat && (
          <Box className={styles.inputSection} sx={{ mb: 3 }}>
            <Paper 
              elevation={1} 
              className={styles.inputContainer}
            >
              {/* Input field code */}
              <TextField
                ref={inputRef}
                fullWidth
                variant="standard"
                placeholder={isListening ? t('uniGpt.listening') : t('uniGpt.askPlaceholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                disabled={isLoading || isListening}
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

              <IconButton 
                size="medium" 
                className={`${styles.micButton} ${styles.uniGptButton}`}
                onClick={message && !isListening ? () => handleSendMessage() : toggleSpeechRecognition}
                disabled={isLoading}
                sx={{
                  bgcolor: isListening ? '#f44336' : '#2a3eb1',
                  color: 'white',
                  '&:hover': {
                    bgcolor: isListening ? '#d32f2f' : '#1a237e',
                  },
                  animation: isListening ? 'pulse 1.5s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.7)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)' }
                  }
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 
                  (message ? <SendIcon /> : (isListening ? <StopIcon /> : <MicIcon />))}
              </IconButton>
            </Paper>
          </Box>
        )}

        {/* Chat messages container */}
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
                backgroundColor: msg.type === 'user' ? '#e1f5fe' : (msg.type === 'ai' ? '#ede7f6' : '#f5f5f5'),
                borderRadius: 2,
                p: 2,
                mb: 2,
                wordBreak: 'break-word', // Prevent text overflow
                overflowWrap: 'break-word', // Ensure long words wrap
              }}
            >
              {msg.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={24} sx={{ color: '#2a3eb1' }} />
                  <Typography variant="body2">{t('uniGpt.waitingForResponse')}</Typography>
                </Box>
              ) : (
                <Typography sx={{ 
                  whiteSpace: 'pre-wrap',  // Preserve line breaks
                  '& a': { wordBreak: 'break-all' } // Break URLs if needed
                }}>
                  {msg.isTyping && index === typingIndex ? displayedText : msg.content}
                  {msg.isTyping && index === typingIndex && <span className={styles.blinkingCursor}>|</span>}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Input section at bottom after chat has started */}
        {hasStartedChat && (
          <Box className={styles.inputSection} sx={{ mt: 'auto', pt: 2 }}>
            <Paper 
              elevation={1} 
              className={styles.inputContainer}
            >
              <TextField
                ref={inputRef}
                fullWidth
                variant="standard"
                placeholder={isListening ? t('uniGpt.listening') : t('uniGpt.askPlaceholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                disabled={isLoading || isListening}
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

              <IconButton 
                size="medium" 
                className={`${styles.micButton} ${styles.uniGptButton}`}
                onClick={message && !isListening ? () => handleSendMessage() : toggleSpeechRecognition}
                disabled={isLoading}
                sx={{
                  bgcolor: isListening ? '#f44336' : '#2a3eb1',
                  color: 'white',
                  '&:hover': {
                    bgcolor: isListening ? '#d32f2f' : '#1a237e',
                  },
                  animation: isListening ? 'pulse 1.5s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.7)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)' }
                  }
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 
                  (message ? <SendIcon /> : (isListening ? <StopIcon /> : <MicIcon />))}
              </IconButton>
            </Paper>
          </Box>
        )}
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
