import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardData } from "./CardMaker";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface CardEditorProps {
  cardData: CardData;
  onChange: (data: CardData) => void;
}

export const CardEditor = ({ cardData, onChange }: CardEditorProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({ ...cardData, image: event.target?.result as string });
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Card Details</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground">Card Name</Label>
          <Input
            id="name"
            value={cardData.name}
            onChange={(e) => onChange({ ...cardData, name: e.target.value })}
            className="bg-input border-border text-foreground"
            placeholder="Enter card name"
          />
        </div>

        <div>
          <Label htmlFor="type" className="text-foreground">Type/Attribute</Label>
          <Input
            id="type"
            value={cardData.type}
            onChange={(e) => onChange({ ...cardData, type: e.target.value })}
            className="bg-input border-border text-foreground"
            placeholder="e.g., Fire, Dark, Water"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="hp" className="text-foreground">HP</Label>
            <Input
              id="hp"
              value={cardData.hp}
              onChange={(e) => onChange({ ...cardData, hp: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="100"
            />
          </div>
          <div>
            <Label htmlFor="attack" className="text-foreground">ATK</Label>
            <Input
              id="attack"
              value={cardData.attack}
              onChange={(e) => onChange({ ...cardData, attack: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="50"
            />
          </div>
          <div>
            <Label htmlFor="defense" className="text-foreground">DEF</Label>
            <Input
              id="defense"
              value={cardData.defense}
              onChange={(e) => onChange({ ...cardData, defense: e.target.value })}
              className="bg-input border-border text-foreground"
              placeholder="40"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="rarity" className="text-foreground">Rarity</Label>
          <Select value={cardData.rarity} onValueChange={(value) => onChange({ ...cardData, rarity: value })}>
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="uncommon">Uncommon</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="text-foreground">Description</Label>
          <Textarea
            id="description"
            value={cardData.description}
            onChange={(e) => onChange({ ...cardData, description: e.target.value })}
            className="bg-input border-border text-foreground min-h-[100px]"
            placeholder="Enter card description or abilities..."
          />
        </div>

        <div>
          <Label htmlFor="image" className="text-foreground">Card Image</Label>
          <div className="mt-2">
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted"
            >
              {cardData.image ? (
                <img src={cardData.image} alt="Card" className="h-full object-contain rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload image</p>
                </div>
              )}
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
