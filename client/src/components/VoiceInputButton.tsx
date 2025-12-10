import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { storagePut } from "../../../server/storage";

interface VoiceInputButtonProps {
  onTranscription: (text: string) => void;
  language?: "ar" | "en";
}

export function VoiceInputButton({ onTranscription, language = "en" }: VoiceInputButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const transcribeMutation = trpc.voice.transcribe.useMutation({
    onSuccess: (data) => {
      onTranscription(data.text);
      toast.success("Transcription complete");
      setIsProcessing(false);
    },
    onError: (error) => {
      toast.error(`Transcription failed: ${error.message}`);
      setIsProcessing(false);
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        
        // Check file size (16MB limit)
        if (audioBlob.size > 16 * 1024 * 1024) {
          toast.error("Recording too long. Maximum 16MB allowed.");
          return;
        }

        setIsProcessing(true);

        try {
          // Convert blob to base64 for upload
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;
            
            // Upload to storage (you'll need to implement this)
            // For now, we'll use a placeholder URL
            const audioUrl = "placeholder-audio-url";
            
            // Call transcription API
            transcribeMutation.mutate({
              audioUrl,
              language,
              fileSize: audioBlob.size,
              mimeType: "audio/webm",
            });
          };
          reader.readAsDataURL(audioBlob);
        } catch (error) {
          toast.error("Failed to process audio");
          setIsProcessing(false);
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      toast.info("Recording started...");
    } catch (error) {
      toast.error("Microphone access denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Processing recording...");
    }
  };

  if (isProcessing) {
    return (
      <Button type="button" variant="outline" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={isRecording ? "destructive" : "outline"}
      onClick={isRecording ? stopRecording : startRecording}
      title={isRecording ? "Stop recording" : "Start voice input"}
    >
      {isRecording ? (
        <>
          <Square className="h-4 w-4 mr-2" />
          Stop
        </>
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
