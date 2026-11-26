// Shared with the server layout, so this module must stay free of "use client".
export const glassStorageKey = "portfolio-glass"

/** Runs before first paint so the chosen glass never flashes the other one. */
export const glassBootstrap = `try{var g=localStorage.getItem("${glassStorageKey}");if(g==="tinted")document.documentElement.dataset.glass=g}catch(e){}`
