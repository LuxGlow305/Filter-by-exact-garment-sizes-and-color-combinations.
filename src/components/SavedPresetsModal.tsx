import React, { useState } from 'react';
import { X, Bookmark, Plus, Trash2, Check } from 'lucide-react';
import { FilterState, FilterPreset } from '../types';

interface SavedPresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: FilterState;
  presets: FilterPreset[];
  onSavePreset: (name: string) => void;
  onApplyPreset: (preset: FilterPreset) => void;
  onDeletePreset: (id: string) => void;
}

export const SavedPresetsModal: React.FC<SavedPresetsModalProps> = ({
  isOpen,
  onClose,
  currentFilters,
  presets,
  onSavePreset,
  onApplyPreset,
  onDeletePreset,
}) => {
  if (!isOpen) return null;

  const [presetName, setPresetName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName.trim()) return;
    onSavePreset(presetName.trim());
    setPresetName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200 space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 bg-stone-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-700" />
          <h2 className="font-serif text-xl font-medium text-stone-900">
            Filter Presets
          </h2>
        </div>

        {/* Save Current Filter Form */}
        <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-3">
          <label className="text-xs font-semibold text-stone-800 block">
            Save Current Active Filters
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. My Size M Neutrals"
              value={presetName}
              onChange={e => setPresetName(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-900"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Save
            </button>
          </div>
          <div className="text-[11px] text-stone-500">
            Current filters: {currentFilters.sizes.length > 0 ? `Sizes (${currentFilters.sizes.join(',')})` : 'All sizes'}, {currentFilters.colors.length > 0 ? `Colors (${currentFilters.colors.join(',')})` : 'All colors'}
          </div>
        </form>

        {/* Presets List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Saved Presets
          </span>

          {presets.length === 0 ? (
            <p className="text-xs text-stone-400 py-4 text-center">
              No saved filter presets yet.
            </p>
          ) : (
            presets.map(p => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-xl hover:border-stone-400 transition-all text-xs"
              >
                <div>
                  <h4 className="font-semibold text-stone-900">{p.name}</h4>
                  <p className="text-[10px] text-stone-500">
                    Sizes: {p.filters.sizes.join(', ') || 'Any'} • Colors: {p.filters.colors.join(', ') || 'Any'}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onApplyPreset(p);
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 rounded-lg text-[11px] font-medium transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => onDeletePreset(p.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
