/**
 * Adaptive Media Engine:
 * Intelligently detects network bandwidth and hardware capability.
 * 
 * - Fast connection & High CPU -> Uses crisp 1080p MP4 videos.
 * - Slow / Medium connection, 2G/3G, mobile cellular, or low CPU -> Uses ultra-fast GIF animations for instant zero-lag performance.
 */

export function isSlowConnection() {
  try {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      // User has data saver enabled
      if (conn.saveData) return true;
      
      // Slow network tiers
      if (['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return true;
      
      // Download speed below 5 Mbps is treated as slow/moderate
      if (typeof conn.downlink === 'number' && conn.downlink < 5) return true;
      
      // High latency (> 200ms)
      if (typeof conn.rtt === 'number' && conn.rtt > 200) return true;
    }

    // Hardware checks: Low CPU (<= 4 cores) or Low RAM (<= 4GB)
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    if (cores <= 4 || memory <= 4) {
      return true;
    }

    // On mobile devices with coarse pointers, prefer fast GIF unless on ultra-fast desktop
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isMobile && conn && conn.effectiveType !== '4g') {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export function isHighEndDevice() {
  return !isSlowConnection();
}
