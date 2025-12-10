import { transcribeAudio } from "./_core/voiceTranscription";
import { invokeUnifiedLLM } from "./_core/unifiedLLM";

/**
 * Voice Consultation System
 * 
 * Enables voice input/output for consultations:
 * - Transcribe user voice questions (Arabic/English)
 * - Convert AI text responses to speech
 * - Support hands-free consultation experience
 */

export interface VoiceTranscriptionResult {
  text: string;
  language: string;
  confidence: number;
}

export interface TextToSpeechResult {
  audioUrl: string;
  duration: number;
}

/**
 * Transcribe audio consultation question
 * 
 * @param audioUrl - URL to the uploaded audio file
 * @param language - Expected language (en/ar)
 * @returns Transcribed text
 */
export async function transcribeConsultationQuestion(
  audioUrl: string,
  language: "en" | "ar"
): Promise<VoiceTranscriptionResult> {
  try {
    const result = await transcribeAudio({
      audioUrl,
      language,
      prompt: "Legal consultation question about Dubai real estate law",
    });

    // Check if result is an error
    if ('error' in result) {
      throw new Error(result.error);
    }

    return {
      text: result.text,
      language: result.language,
      confidence: 0.95, // Whisper doesn't return confidence, use default high value
    };
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Failed to transcribe audio. Please try again or type your question.");
  }
}

/**
 * Convert text response to speech
 * 
 * Note: This uses the built-in TTS API which should be available in the Manus platform.
 * If not available, this will return a placeholder.
 * 
 * @param text - Text to convert to speech
 * @param language - Language for speech (en/ar)
 * @returns Audio URL and duration
 */
export async function convertResponseToSpeech(
  text: string,
  language: "en" | "ar"
): Promise<TextToSpeechResult> {
  // TODO: Implement actual TTS when API is available
  // For now, return a placeholder indicating TTS is not yet implemented
  
  // In production, this would call something like:
  // const audioUrl = await generateSpeech({ text, language, voice: language === 'ar' ? 'ar-AE-FatimaNeural' : 'en-US-JennyNeural' });
  
  console.log(`TTS requested for ${language}: ${text.substring(0, 100)}...`);
  
  // Return placeholder
  return {
    audioUrl: "", // Empty URL indicates TTS not available yet
    duration: Math.ceil(text.length / 15), // Rough estimate: 15 chars per second
  };
}

/**
 * Validate audio file before transcription
 * 
 * @param fileSize - Size of the audio file in bytes
 * @param mimeType - MIME type of the audio file
 * @returns true if valid, throws error if invalid
 */
export function validateAudioFile(fileSize: number, mimeType: string): boolean {
  const MAX_SIZE = 16 * 1024 * 1024; // 16MB limit
  const SUPPORTED_TYPES = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/m4a",
    "audio/webm",
  ];

  if (fileSize > MAX_SIZE) {
    throw new Error(`Audio file too large. Maximum size is 16MB. Your file is ${Math.round(fileSize / 1024 / 1024)}MB.`);
  }

  if (!SUPPORTED_TYPES.includes(mimeType.toLowerCase())) {
    throw new Error(`Unsupported audio format: ${mimeType}. Supported formats: MP3, WAV, OGG, M4A, WebM.`);
  }

  return true;
}

/**
 * Detect language from audio (if not specified)
 * 
 * Uses Whisper's language detection capability
 */
export async function detectAudioLanguage(audioUrl: string): Promise<"en" | "ar"> {
  try {
    const result = await transcribeAudio({
      audioUrl,
      // Don't specify language, let Whisper detect it
    });

    // Check if result is an error
    if ('error' in result) {
      console.error("Transcription error:", result.error);
      return "en";
    }

    // Map detected language to en/ar
    if (result.language === "ar" || result.language === "ara") {
      return "ar";
    }
    return "en";
  } catch (error) {
    console.error("Error detecting language:", error);
    // Default to English if detection fails
    return "en";
  }
}
