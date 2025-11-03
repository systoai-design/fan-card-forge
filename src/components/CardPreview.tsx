import { CardData } from "./CardMaker";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface CardPreviewProps {
  cardData: CardData;
}

export const CardPreview = ({ cardData }: CardPreviewProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "from-yellow-400 to-orange-500";
      case "rare": return "from-purple-400 to-pink-500";
      case "uncommon": return "from-blue-400 to-cyan-500";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const getTemplateStyles = () => {
    switch (cardData.template) {
      case "pokemon":
        return "bg-gradient-to-br from-red-500/20 to-yellow-500/20";
      case "yugioh":
        return "bg-gradient-to-br from-purple-500/20 to-pink-500/20";
      case "magic":
        return "bg-gradient-to-br from-blue-500/20 to-green-500/20";
      default:
        return "bg-card";
    }
  };

  return (
    <Card className="p-8 bg-card border-border">
      <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Preview
      </h2>
      
      <div className="flex justify-center">
        <div
          id="card-preview"
          className={`w-80 h-[448px] rounded-2xl p-6 shadow-2xl border-2 border-border relative overflow-hidden ${getTemplateStyles()}`}
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), ${getTemplateStyles()}`,
          }}
        >
          {/* Holographic effect overlay */}
          <div className="absolute inset-0 bg-holographic opacity-10 pointer-events-none" />
          
          {/* Rarity indicator */}
          <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${getRarityColor(cardData.rarity)} shadow-lg flex items-center justify-center`}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          {/* Card content */}
          <div className="relative h-full flex flex-col">
            <h3 className="text-2xl font-bold text-foreground mb-2">{cardData.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{cardData.type}</p>

            {/* Image area */}
            <div className="flex-1 bg-muted rounded-xl mb-4 overflow-hidden border border-border">
              {cardData.image ? (
                <img
                  src={cardData.image}
                  alt={cardData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-3 mb-3">
              {cardData.hp && (
                <div className="flex-1 bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">HP</p>
                  <p className="text-lg font-bold text-foreground">{cardData.hp}</p>
                </div>
              )}
              {cardData.attack && (
                <div className="flex-1 bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">ATK</p>
                  <p className="text-lg font-bold text-foreground">{cardData.attack}</p>
                </div>
              )}
              {cardData.defense && (
                <div className="flex-1 bg-secondary rounded-lg p-2 text-center">
                  <p className="text-xs text-muted-foreground">DEF</p>
                  <p className="text-lg font-bold text-foreground">{cardData.defense}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-xs text-foreground leading-relaxed line-clamp-3">
                {cardData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
