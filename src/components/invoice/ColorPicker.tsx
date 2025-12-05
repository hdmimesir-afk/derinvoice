import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  onColorChange: (colors: { primaryColor: string; secondaryColor: string; accentColor: string }) => void;
}

const presetColors = [
  { name: 'Green', primary: '#5A8F7B', secondary: '#7AB89D', accent: '#3D6B5C' },
  { name: 'Blue', primary: '#3B82F6', secondary: '#60A5FA', accent: '#1D4ED8' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#A78BFA', accent: '#6D28D9' },
  { name: 'Orange', primary: '#F97316', secondary: '#FB923C', accent: '#EA580C' },
  { name: 'Red', primary: '#EF4444', secondary: '#F87171', accent: '#DC2626' },
  { name: 'Teal', primary: '#14B8A6', secondary: '#2DD4BF', accent: '#0D9488' },
];

const ColorPicker = ({ primaryColor, secondaryColor, accentColor, onColorChange }: ColorPickerProps) => {
  const handlePresetClick = (preset: typeof presetColors[0]) => {
    onColorChange({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs md:text-base font-bold text-slate-950">Warna Invoice</h3>
      
      {/* Preset Colors */}
      <div className="flex flex-wrap gap-2">
        {presetColors.map((preset) => (
          <Button
            key={preset.name}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(preset)}
            className="h-8 px-3 text-xs flex items-center gap-2"
          >
            <div 
              className="w-4 h-4 rounded-full border border-slate-200" 
              style={{ backgroundColor: preset.primary }}
            />
            {preset.name}
          </Button>
        ))}
      </div>

      {/* Custom Colors */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-[10px] md:text-xs text-slate-600">Primary</Label>
          <div className="flex items-center gap-1 mt-1">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onColorChange({ primaryColor: e.target.value, secondaryColor, accentColor })}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
            <Input
              value={primaryColor}
              onChange={(e) => onColorChange({ primaryColor: e.target.value, secondaryColor, accentColor })}
              className="h-8 text-xs flex-1"
            />
          </div>
        </div>
        <div>
          <Label className="text-[10px] md:text-xs text-slate-600">Secondary</Label>
          <div className="flex items-center gap-1 mt-1">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => onColorChange({ primaryColor, secondaryColor: e.target.value, accentColor })}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
            <Input
              value={secondaryColor}
              onChange={(e) => onColorChange({ primaryColor, secondaryColor: e.target.value, accentColor })}
              className="h-8 text-xs flex-1"
            />
          </div>
        </div>
        <div>
          <Label className="text-[10px] md:text-xs text-slate-600">Accent</Label>
          <div className="flex items-center gap-1 mt-1">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => onColorChange({ primaryColor, secondaryColor, accentColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
            <Input
              value={accentColor}
              onChange={(e) => onColorChange({ primaryColor, secondaryColor, accentColor: e.target.value })}
              className="h-8 text-xs flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
