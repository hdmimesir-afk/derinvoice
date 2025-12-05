import { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

interface ColorWheelPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorWheelPicker = ({ color, onChange, label }: ColorWheelPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors w-full">
          <div 
            className="w-8 h-8 rounded-lg border-2 border-slate-200 shadow-inner" 
            style={{ backgroundColor: color }}
          />
          <div className="flex-1 text-left">
            <p className="text-[10px] text-slate-500">{label}</p>
            <p className="text-xs font-mono font-medium">{color.toUpperCase()}</p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-3">
          <HexColorPicker color={color} onChange={onChange} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">#</span>
            <HexColorInput 
              color={color} 
              onChange={onChange}
              className="flex-1 h-8 px-2 text-xs font-mono border border-slate-200 rounded uppercase"
              prefixed={false}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

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

      {/* Color Wheel Pickers */}
      <div className="grid grid-cols-3 gap-2">
        <ColorWheelPicker 
          color={primaryColor}
          onChange={(color) => onColorChange({ primaryColor: color, secondaryColor, accentColor })}
          label="Primary"
        />
        <ColorWheelPicker 
          color={secondaryColor}
          onChange={(color) => onColorChange({ primaryColor, secondaryColor: color, accentColor })}
          label="Secondary"
        />
        <ColorWheelPicker 
          color={accentColor}
          onChange={(color) => onColorChange({ primaryColor, secondaryColor, accentColor: color })}
          label="Accent"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
