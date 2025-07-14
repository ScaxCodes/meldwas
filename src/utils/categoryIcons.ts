import L from 'leaflet';
import type { ReportCategory } from '../types';

const createCategoryIcon = (color: string, symbol: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        color: white;
      ">
        ${symbol}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

export const getCategoryIcon = (category: ReportCategory): L.DivIcon => {
  const iconMap: Record<ReportCategory, { color: string; symbol: string }> = {
    school_route: { color: '#f59e0b', symbol: '🚸' },
    lighting: { color: '#eab308', symbol: '💡' },
    traffic: { color: '#ef4444', symbol: '🚦' },
    abandoned_building: { color: '#6b7280', symbol: '🏚️' },
    noise: { color: '#8b5cf6', symbol: '🔊' },
    vandalism: { color: '#f97316', symbol: '🎨' },
    loitering: { color: '#06b6d4', symbol: '👥' },
    wild_dumping: { color: '#059669', symbol: '🗑️' },
    other: { color: '#64748b', symbol: '❗' },
  };

  const config = iconMap[category];
  return createCategoryIcon(config.color, config.symbol);
};

export const getCategoryColor = (category: ReportCategory): string => {
  const colorMap: Record<ReportCategory, string> = {
    school_route: '#f59e0b',
    lighting: '#eab308',
    traffic: '#ef4444',
    abandoned_building: '#6b7280',
    noise: '#8b5cf6',
    vandalism: '#f97316',
    loitering: '#06b6d4',
    wild_dumping: '#059669',
    other: '#64748b',
  };

  return colorMap[category];
};