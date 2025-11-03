import { useState } from "react";
import { CardPreview } from "./CardPreview";
import { CardEditor } from "./CardEditor";
import { TemplateSelector } from "./TemplateSelector";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export type CardTemplate = "pokemon" | "yugioh" | "magic";

export interface CardData {
  template: CardTemplate;
  name: string;
  type: string;
  hp?: string;
  attack?: string;
  defense?: string;
  description: string;
  image?: string;
  rarity: string;
}

export const CardMaker = () => {
  const [cardData, setCardData] = useState<CardData>({
    template: "pokemon",
    name: "Custom Card",
    type: "Fire",
    hp: "100",
    attack: "50",
    defense: "40",
    description: "This is a custom trading card created with Card Maker.",
    rarity: "rare",
  });

  const handleExport = async () => {
    const cardElement = document.getElementById("card-preview");
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        backgroundColor: null,
      });
      
      const link = document.createElement("a");
      link.download = `${cardData.name.replace(/\s+/g, "-")}-card.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("Card exported successfully!");
    } catch (error) {
      toast.error("Failed to export card");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-holographic bg-clip-text text-transparent">
            Card Maker
          </h1>
          <p className="text-muted-foreground text-lg">
            Create custom trading cards for your favorite card games
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <TemplateSelector
              selected={cardData.template}
              onSelect={(template) => setCardData({ ...cardData, template })}
            />
            
            <CardEditor cardData={cardData} onChange={setCardData} />
            
            <Button 
              onClick={handleExport} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Card
            </Button>
          </div>

          <div className="lg:sticky lg:top-8">
            <CardPreview cardData={cardData} />
          </div>
        </div>
      </div>
    </div>
  );
};
