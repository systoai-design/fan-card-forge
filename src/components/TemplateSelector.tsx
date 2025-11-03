import { Card } from "@/components/ui/card";
import { CardTemplate } from "./CardMaker";

interface TemplateSelectorProps {
  selected: CardTemplate;
  onSelect: (template: CardTemplate) => void;
}

const templates = [
  { id: "pokemon" as CardTemplate, name: "Pokémon Style", color: "from-red-500 to-yellow-500" },
  { id: "yugioh" as CardTemplate, name: "Yu-Gi-Oh! Style", color: "from-purple-500 to-pink-500" },
  { id: "magic" as CardTemplate, name: "Magic Style", color: "from-blue-500 to-green-500" },
];

export const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Choose Template</h2>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
              selected === template.id
                ? "border-primary shadow-card-glow"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className={`h-20 rounded-md bg-gradient-to-br ${template.color} mb-2`} />
            <p className="text-sm font-medium text-foreground">{template.name}</p>
          </button>
        ))}
      </div>
    </Card>
  );
};
