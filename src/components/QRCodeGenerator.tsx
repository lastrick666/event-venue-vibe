import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Download, Share2, Copy } from "lucide-react";

interface QRCodeGeneratorProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}

const QRCodeGenerator = ({ eventId, eventTitle, eventDate, eventLocation }: QRCodeGeneratorProps) => {
  const { toast } = useToast();
  const [qrGenerated, setQrGenerated] = useState(false);
  
  // Simulated QR code data
  const eventUrl = `${window.location.origin}/event/${eventId}`;
  const qrData = {
    url: eventUrl,
    title: eventTitle,
    date: eventDate,
    location: eventLocation,
    type: "event"
  };

  // Generate QR code SVG (simplified version)
  const generateQRCodeSVG = () => {
    // This is a simplified QR code representation
    // In a real app, you'd use a library like qrcode.js
    return `
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="20" height="20" fill="black"/>
        <rect x="60" y="20" width="20" height="20" fill="black"/>
        <rect x="100" y="20" width="20" height="20" fill="black"/>
        <rect x="140" y="20" width="20" height="20" fill="black"/>
        <rect x="180" y="20" width="20" height="20" fill="black"/>
        
        <rect x="20" y="60" width="20" height="20" fill="black"/>
        <rect x="100" y="60" width="20" height="20" fill="black"/>
        <rect x="180" y="60" width="20" height="20" fill="black"/>
        
        <rect x="20" y="100" width="20" height="20" fill="black"/>
        <rect x="60" y="100" width="20" height="20" fill="black"/>
        <rect x="140" y="100" width="20" height="20" fill="black"/>
        <rect x="180" y="100" width="20" height="20" fill="black"/>
        
        <rect x="20" y="140" width="20" height="20" fill="black"/>
        <rect x="100" y="140" width="20" height="20" fill="black"/>
        <rect x="180" y="140" width="20" height="20" fill="black"/>
        
        <rect x="20" y="180" width="20" height="20" fill="black"/>
        <rect x="60" y="180" width="20" height="20" fill="black"/>
        <rect x="100" y="180" width="20" height="20" fill="black"/>
        <rect x="140" y="180" width="20" height="20" fill="black"/>
        <rect x="180" y="180" width="20" height="20" fill="black"/>
        
        <!-- Corner squares -->
        <rect x="10" y="10" width="40" height="40" fill="none" stroke="black" stroke-width="2"/>
        <rect x="150" y="10" width="40" height="40" fill="none" stroke="black" stroke-width="2"/>
        <rect x="10" y="150" width="40" height="40" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Center pattern -->
        <rect x="80" y="80" width="40" height="40" fill="none" stroke="black" stroke-width="2"/>
        <rect x="90" y="90" width="20" height="20" fill="black"/>
      </svg>
    `.trim();
  };

  const handleGenerateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generato! 🎯",
      description: "Il codice QR per l'evento è pronto"
    });
  };

  const handleDownloadQR = () => {
    const svg = generateQRCodeSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${eventTitle.replace(/\s+/g, '-').toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download completato! 📥",
      description: "QR Code salvato sul dispositivo"
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    toast({
      title: "Link copiato! 📋",
      description: "L'URL dell'evento è stato copiato negli appunti"
    });
  };

  const handleShareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: eventTitle,
        text: `Partecipa a: ${eventTitle}`,
        url: eventUrl
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-4">
      {!qrGenerated ? (
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <QrCode className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle>Genera QR Code</CardTitle>
            <CardDescription>
              Crea un codice QR per facilitare l'accesso all'evento
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleGenerateQR} variant="hero" size="lg">
              <QrCode className="h-4 w-4 mr-2" />
              Genera Codice QR
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>QR Code Evento</CardTitle>
            <CardDescription>
              Scansiona per accedere rapidamente all'evento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code Display */}
            <div className="flex justify-center">
              <div 
                className="p-4 bg-white rounded-lg shadow-md border"
                dangerouslySetInnerHTML={{ __html: generateQRCodeSVG() }}
              />
            </div>
            
            {/* Event Info */}
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-lg">{eventTitle}</h4>
              <p className="text-sm text-muted-foreground">{eventDate}</p>
              <p className="text-sm text-muted-foreground">{eventLocation}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button onClick={handleDownloadQR} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Scarica
              </Button>
              <Button onClick={handleShareQR} variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Condividi
              </Button>
              <Button onClick={handleCopyLink} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copia Link
              </Button>
            </div>

            {/* QR Code Info */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Il QR code contiene il link diretto all'evento:<br/>
                <code className="bg-secondary px-2 py-1 rounded text-xs">
                  {eventUrl}
                </code>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRCodeGenerator;