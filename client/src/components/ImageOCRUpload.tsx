import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Loader2, FileImage } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ImageOCRUploadProps {
  onTextExtracted: (text: string) => void;
}

export function ImageOCRUpload({ onTextExtracted }: ImageOCRUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextMutation = trpc.imageOCR.extractText.useMutation({
    onSuccess: (data) => {
      onTextExtracted(data.text);
      toast.success("Text extracted successfully!");
      // Clear after successful extraction
      setSelectedImage(null);
      setImagePreview(null);
    },
    onError: (error) => {
      toast.error(`OCR failed: ${error.message}`);
    },
  });

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, PNG, WEBP, or HEIC images.");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }

    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) return;

    // Convert file to base64 for upload
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      
      // In production, upload to storage first
      // For now, use placeholder URL
      const imageUrl = "placeholder-image-url";

      extractTextMutation.mutate({
        imageUrl,
        mimeType: selectedImage.type,
        fileSize: selectedImage.size,
      });
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {!selectedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <FileImage className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop a document image here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports JPG, PNG, WEBP, HEIC (Max 10MB)
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Document preview"
                  className="w-full max-h-64 object-contain rounded-lg border"
                />
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="font-medium">{selectedImage.name}</p>
                <p className="text-muted-foreground">
                  {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                onClick={handleExtractText}
                disabled={extractTextMutation.isPending}
              >
                {extractTextMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <FileImage className="h-4 w-4 mr-2" />
                    Extract Text
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
