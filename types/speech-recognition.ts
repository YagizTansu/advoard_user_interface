// Define SpeechRecognition interface
export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort?: () => void;
  onerror: (event: any) => void;
  onend: (event: any) => void;
  onresult: (event: any) => void;
}

// Extend the Window interface globally

