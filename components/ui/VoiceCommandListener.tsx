import { useEffect, useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import { useTranslation } from 'next-i18next';

// Add type declarations for the Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: (event: Event) => void;
}

// Extend the Window interface
declare global {
  interface Window {
    SpeechRecognition?: {
      new(): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new(): SpeechRecognition;
    };
  }
}

interface VoiceCommandListenerProps {
  onCommand: (command: string) => void;
  onClose: () => void;
}

const VoiceCommandListener: React.FC<VoiceCommandListenerProps> = ({ onCommand, onClose }) => {
  const { t } = useTranslation('common');
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const commandProcessedRef = useRef(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Check if the browser supports Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error('Speech recognition not supported');
        return;
      }

      let finalTranscript = '';
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Change to true for better command detection
      recognition.interimResults = true;
      recognition.lang = t('voiceRecognitionLang') || 'tr-TR'; // Default to Turkish

      // Reset the command processed flag
      commandProcessedRef.current = false;

      recognition.onstart = () => {
        setIsListening(true);
        finalTranscript = ''; // Reset transcript when starting
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;

            // Process command as soon as we have a final result with sufficient content
            if (!commandProcessedRef.current && finalTranscript.trim().length > 3) {
              processCommand(finalTranscript);
            }
          } else {
            interimTranscript += transcript;

            // Early detection of commands in interim results
            // If the interim result is substantial (more than 10 chars), try to process it
            if (!commandProcessedRef.current && interimTranscript.trim().length > 10) {
              const potentialCommand = interimTranscript.trim();
              // Look for navigation keywords in the interim transcript
              const navigationKeywords = ['go to', 'navigate', 'open', 'show'];
              if (navigationKeywords.some(keyword => potentialCommand.toLowerCase().includes(keyword))) {
                processCommand(potentialCommand);
              }
            }
          }
        }

        // Update the visible transcript with both final and interim results
        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log("Final transcript:", finalTranscript || transcript);

        // If no command was processed yet, process the final transcript
        if (!commandProcessedRef.current && (finalTranscript || transcript)) {
          processCommand(finalTranscript || transcript);
        }
      };

      const processCommand = (text: string) => {
        if (commandProcessedRef.current) return; // Prevent multiple processing

        commandProcessedRef.current = true;
        console.log("Processing command:", text);
        onCommand(text);

        // Stop the recognition after processing a command
        recognition.stop();
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      // Start recognition
      recognition.start();

      // Clean up
      return () => {
        recognition.stop();
      };
    }
  }, [t, onCommand]);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t('voiceCommands.title')}
        <IconButton 
          aria-label="close" 
          onClick={onClose} 
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center justify-center p-4">
          <div className={`flex items-center justify-center rounded-full transition-all duration-300 ease-in-out
            ${isListening 
              ? 'bg-gradient-to-r from-red-400 to-red-600 shadow-lg animate-pulse p-8' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300 p-6'
            }`}>
            <MicIcon 
              sx={{ 
                fontSize: 70, 
                color: isListening ? 'white' : '#666',
                transition: 'all 0.3s ease-in-out',
              }} 
            />
          </div>
          
          {isListening ? (
            <div className="mt-6 flex flex-col items-center">
              <CircularProgress size={24} className="mb-2" color="error" />
              <Typography className="text-gray-700 font-medium">{t('voiceCommands.listening')}</Typography>
            </div>
          ) : (
            <Typography className="mt-6 text-gray-700 font-medium">{t('voiceCommands.processing')}</Typography>
          )}
          
          {transcript && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg w-full border border-blue-100 shadow-sm transition-all duration-300 ease-in-out">
              <Typography variant="body1" className="text-gray-800">{transcript}</Typography>
            </div>
          )}
          
          <Typography variant="body2" className="mt-6 text-gray-600 font-medium">
            {t('voiceCommands.examples')}
          </Typography>
          
          <List dense sx={{ width: '100%', mt: 2 }} className="bg-gray-50 rounded-lg p-2">
            <ListItem className="hover:bg-gray-100 transition-colors duration-200 rounded mb-1 pl-4">
              <span className="text-indigo-500 mr-2">•</span> "Go to services page"
            </ListItem>
            <ListItem className="hover:bg-gray-100 transition-colors duration-200 rounded mb-1 pl-4">
              <span className="text-indigo-500 mr-2">•</span> "Navigate to home"
            </ListItem>
            <ListItem className="hover:bg-gray-100 transition-colors duration-200 rounded pl-4">
              <span className="text-indigo-500 mr-2">•</span> "Open exams page"
            </ListItem>
          </List>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceCommandListener;
