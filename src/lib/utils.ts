/**
 * Utility functions for the Social Media Manager application
 */

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format datetime
 */
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

/**
 * Calculate time ago string
 */
export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return formatDate(date);
};

/**
 * Truncate string
 */
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};

/**
 * Get platform color
 */
export const getPlatformColor = (platform: string): string => {
  const colors: Record<string, string> = {
    linkedin: "blue",
    instagram: "pink",
    x: "gray",
    facebook: "blue",
  };
  return colors[platform] || "gray";
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

/**
 * Percentage change indicator
 */
export const getPercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
