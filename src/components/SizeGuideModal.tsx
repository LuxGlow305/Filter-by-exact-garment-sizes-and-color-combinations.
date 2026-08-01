import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { Size } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: Size) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [chestInput, setChestInput] = useState('');
  const [recommendedSize, setRecommendedSize] = useState<Size | null>(null);

  const SIZE_TABLE = [
    { size: 'XXS', chest: '30-32"', chestCm: '76-81cm', waist: '24-26"', waistCm: '61-66cm', hips: '31-33"', hipsCm: '79-84cm' },
    { size: 'XS', chest: '33-35"', chestCm: '84-89cm', waist: '27-29"', waistCm: '68-74cm', hips: '34-36"', hipsCm: '86-91cm' },
    { size: 'S', chest: '36-38"', chestCm: '91-97cm', waist: '30-32"', waistCm: '76-81cm', hips: '37-39"', hipsCm: '94-99cm' },
    { size: 'M', chest: '39-41"', chestCm: '99-104cm', waist: '33-35"', waistCm: '84-89cm', hips: '40-42"', hipsCm: '102-107cm' },
    { size: 'L', chest: '42-44"', chestCm: '107-112cm', waist: '36-38"', waistCm: '91-97cm', hips: '43-45"', hipsCm: '109-114cm' },
    { size: 'XL', chest: '45-47"', chestCm: '114-119cm', waist: '39-41"', waistCm: '99-104cm', hips: '46-48"', hipsCm: '117-122cm' },
    { size: 'XXL', chest: '48-50"', chestCm: '122-127cm', waist: '42-44"', waistCm: '107-112cm', hips: '49-51"', hipsCm: '124-129cm' },
    { size: '3XL', chest: '51-53"', chestCm: '130-135cm', waist: '45-47"', waistCm: '114-119cm', hips: '52-54"', hipsCm: '132-137cm' },
  ];

  const handleCalculateRecommendation = () => {
    const chestVal = parseFloat(chestInput);
    if (isNaN(chestVal)) return;

    const inches = unit === 'cm' ? chestVal / 2.54 : chestVal;

    if (inches < 32) setRecommendedSize('XXS');
    else if (inches < 35.5) setRecommendedSize('XS');
    else if (inches < 38.5) setRecommendedSize('S');
    else if (inches < 41.5) setRecommendedSize('M');
    else if (inches < 44.5) setRecommendedSize('L');
    else if (inches < 47.5) setRecommendedSize('XL');
    else if (inches < 50.5) setRecommendedSize('XXL');
    else setRecommendedSize('3XL');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 relative border border-stone-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 bg-stone-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Ruler className="w-5 h-5 text-amber-700" />
          <h2 className="font-serif text-xl font-medium text-stone-900">
            Atelier Size & Fit Advisor
          </h2>
        </div>

        {/* Units switch */}
        <div className="flex justify-between items-center mb-4 bg-stone-50 p-2 rounded-xl border border-stone-200">
          <span className="text-xs text-stone-600 font-medium">Measurement System</span>
          <div className="flex gap-1 bg-stone-200 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-md transition-all ${
                unit === 'inches' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-md transition-all ${
                unit === 'cm' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Quick Advisor Tool */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Instant Fit Calculator</span>
          </div>
          <p className="text-xs text-amber-900">
            Enter your chest circumference to get your tailored recommended size:
          </p>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={unit === 'inches' ? 'e.g. 40' : 'e.g. 102'}
              value={chestInput}
              onChange={e => setChestInput(e.target.value)}
              className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
            <button
              onClick={handleCalculateRecommendation}
              className="px-4 py-1.5 bg-amber-950 text-white text-xs font-medium rounded-xl hover:bg-stone-900 transition-colors"
            >
              Find My Size
            </button>
          </div>

          {recommendedSize && (
            <div className="flex items-center gap-3 pt-2 text-xs font-bold text-amber-950 border-t border-amber-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended Atelier Size: <strong>{recommendedSize}</strong></span>
              {onSelectSize && (
                <button
                  onClick={() => {
                    onSelectSize(recommendedSize);
                    onClose();
                  }}
                  className="ml-auto underline text-amber-900 text-xs hover:text-stone-900"
                >
                  Apply Filter for Size {recommendedSize}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-2xl">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest / Bust</th>
                <th className="p-3">Natural Waist</th>
                <th className="p-3">Hips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {SIZE_TABLE.map(row => (
                <tr key={row.size} className="hover:bg-stone-50 transition-colors">
                  <td className="p-3 font-bold font-mono text-stone-900">{row.size}</td>
                  <td className="p-3 font-mono">{unit === 'inches' ? row.chest : row.chestCm}</td>
                  <td className="p-3 font-mono">{unit === 'inches' ? row.waist : row.waistCm}</td>
                  <td className="p-3 font-mono">{unit === 'inches' ? row.hips : row.hipsCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
