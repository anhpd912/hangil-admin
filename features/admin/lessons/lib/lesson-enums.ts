export const TRACK_OPTIONS = [
  { value: "k_culture", label: "Văn hoá Hàn" },
  { value: "topik", label: "TOPIK" },
];

export const LEVEL_OPTIONS = [
  { value: "beginner", label: "Sơ cấp" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Cao cấp" },
];

export function trackLabel(track: string): string {
  return TRACK_OPTIONS.find((t) => t.value === track)?.label ?? track;
}

export function levelLabel(level: string): string {
  return LEVEL_OPTIONS.find((l) => l.value === level)?.label ?? level;
}
