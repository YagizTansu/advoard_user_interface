import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import { useTranslation } from 'next-i18next';

interface VoiceCommandListenerProps {
  onCommand: (command: string) => void;
  onClose: () => void;
}

const VoiceCommandListener: React.FC<VoiceCommandListenerProps> = ({ onCommand, onClose }) => {
  const { t } = useTranslation('common');
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Check if the browser supports Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.error('Speech recognition not supported');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = t('voiceRecognitionLang') || 'tr-TR'; // Default to Turkish

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
          
        setTranscript(currentTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript) {
          onCommand(transcript);
        }
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
          <div className={`p-6 mb-4 rounded-full ${isListening ? 'bg-red-100 animate-pulse' : 'bg-gray-100'}`}>
            <MicIcon sx={{ fontSize: 60, color: isListening ? 'red' : 'gray' }} />
          </div>
          
          {isListening ? (
            <>
              <CircularProgress size={24} className="mb-2" />
              <Typography>{t('voiceCommands.listening')}</Typography>
            </>
          ) : (
            <Typography>{t('voiceCommands.processing')}</Typography>
          )}
          
          {transcript && (
            <div className="mt-4 p-3 bg-gray-100 rounded w-full">
              <Typography variant="body1">{transcript}</Typography>
            </div>
          )}
          
          <Typography variant="body2" className="mt-4 text-gray-600">
            {t('voiceCommands.examples')}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceCommandListener;
