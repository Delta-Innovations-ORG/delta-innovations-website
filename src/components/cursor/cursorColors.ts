/** High-contrast cursor palettes for dark navy backgrounds (#0F172A). */
export const cursorColors = {
  default: {
    stroke: '#F8FAFC',
    ring: '#38BDF8',
    fill: 'rgba(248, 250, 252, 0.15)',
    dot: 'rgba(56, 189, 248, 0.7)',
    ringOpacity: 0.55,
  },
  interactive: {
    fill: '#F59E0B',
    stroke: '#FFFFFF',
    dot: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    fill: '#FB7185',
    stroke: '#FFFFFF',
    beam: '#FDA4AF',
    dot: '#FFFFFF',
  },
  trail: {
    stroke: 'rgba(248, 250, 252, 0.35)',
    ring: 'rgba(56, 189, 248, 0.25)',
    fill: 'rgba(248, 250, 252, 0.06)',
    dot: 'rgba(56, 189, 248, 0.3)',
  },
} as const;
