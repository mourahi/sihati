import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'three'

export const THEME_STORAGE_KEY = 'sihati-theme'

const THEME_ORDER: Theme[] = ['light', 'dark', 'three']

type ThemeContextValue = {
  theme: Theme
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.classList.toggle('theme-3d', theme === 'three')
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

function readTheme(): Theme {
  if (document.documentElement.classList.contains('theme-3d')) return 'three'
  if (document.documentElement.classList.contains('dark')) return 'dark'
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readTheme)

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const index = THEME_ORDER.indexOf(current)
      const next = THEME_ORDER[(index + 1) % THEME_ORDER.length]
      applyTheme(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, cycleTheme }), [theme, cycleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
