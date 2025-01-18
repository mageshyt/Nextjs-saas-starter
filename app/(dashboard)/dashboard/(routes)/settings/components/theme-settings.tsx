"use client";
import { useTheme } from 'next-themes';

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="py-4">
      <h3 className="text-lg font-medium">Appearance</h3>
      <p className="text-sm text-muted-foreground">
        Customize the appearance of the app. Automatically switch between
        day and night themes.
      </p>
      <div className="flex pt-4 gap-4 items-center flex-wrap">
        {/* Light Theme */}
        <button
          disabled={theme === "light"}
          onClick={() => setTheme("light")}
          className={`items-center rounded-md border-2 p-1 hover:border-accent ${theme === "light" ? "border-accent" : "border-muted"
            }`}
        >
          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            Light
          </span>
        </button>

        {/* Dark Theme */}
        <button
          disabled={theme === "dark"}
          onClick={() => setTheme("dark")}
          className={`items-center rounded-md border-2 p-1 hover:border-accent ${theme === "dark" ? "border-accent" : "border-muted"
            }`}
        >
          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="h-4 w-4 rounded-full bg-slate-400" />
              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div className="h-4 w-4 rounded-full bg-slate-400" />
              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            Dark
          </span>
        </button>

        {/* System Theme */}
        <button
          disabled={theme === "system"}
          onClick={() => setTheme("system")}
          className={`items-center rounded-md border-2 p-1 hover:border-accent ${theme === "dark" ? "border-accent" : "border-muted"
            }`}
        >
          <div className="space-y-2 rounded-sm w-[140px] h-[130px] flex items-center justify-center text-3xl font-bold border-b ">
            <span>?</span>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            system
          </span>
        </button>
      </div>
    </div>
  )
}

export default ThemeSettings
