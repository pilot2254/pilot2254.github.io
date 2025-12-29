export interface Project {
  id: string
  title: string
  description: string
  year: number
  tags: string[]
  images?: string[] // List of filenames (e.g., ["1.png", "2.gif"])
  link?: string
  github?: string
}

// Helper to generate image paths
function getProjectImages(id: string, images?: string[]): string[] {
  if (!images || images.length === 0) return []
  return images.map(img => `/images/${id}/${img}`)
}

export const projects: Project[] = [


  /* ------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------ 2026 ------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------ 2025 ------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------ */

  {
    id: "contrast-bot",
    title: "Contrast Bot",
    description: "Contrast is a simple, but powerful Discord Bot.",
    year: 2025,
    tags: ["Node.js", "Typescript", "Discord.js", "SQLite", "Slash Commands"],
    images: [],
    link: "https://contrast-bot.github.io",
    github: "https://github.com/contrast-bot/contrast-bot",
  },
  {
    id: "calculator",
    title: "Calculator",
    description: "Simple and heavily configurable calculator made in electron",
    year: 2025,
    tags: ["Electron", "JavaScript", "Customization", "Calculator"],
    images: [],
    link: "",
    github: "https://github.com/pilot2254/calculator",
  },
  {
    id: "raspi-web",
    title: "RasPI Web",
    description: "Public template for people who want to host websites locally on raspberry pi",
    year: 2025,
    tags: ["Node.js", "Vite", "HTML", "CSS", "Template"],
    images: ["1.png", "2.png"],
    link: "",
    github: "https://github.com/pilot2254/raspi5-web",
  },
  {
    id: "flux-archive",
    title: "Flux Archive",
    description: "Simple archiving tool that creates .flux archive files. It supports creating archives from multiple files and folders, extracting archives, and includes CRC32 integrity checking.",
    year: 2025,
    tags: ["C++", "Archive", "Windows", "Linux", "ImGui"],
    images: ["1.png", "2.png"],
    link: "",
    github: "https://github.com/michal-flaska/flux-archive",
  },
  {
    id: "driver",
    title: "ioctl kernel driver",
    description: "simple kernel driver that reads and writes memory of any process. my own learning project. and definitely not beginner friendly. if u need hand holding dont touch this.",
    year: 2025,
    tags: ["C", "Kernel", "Driver", "Windows"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/driver",
  },
  {
    id: "unnamed-translator",
    title: "Unnamed Translator",
    description: "A lightweight desktop application that translates normal text into internet slang/shorthand.",
    year: 2025,
    tags: ["C++", "ImGui", "Translator"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/unnamed-translator",
  },
  {
    id: "message-encoder",
    title: "Message Encoder",
    description: "Simple message encoder/decoder using XOR cipher",
    year: 2025,
    tags: ["C++", "Cipher", "XOR", "ImGui", "Linux", "Windows"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/message-encoder",
  },
  {
    id: "mac-spoofer",
    title: "MAC Spoofer",
    description: "A lightweight Windows utility to spoof MAC addresses on physical network adapters.",
    year: 2025,
    tags: ["C++", "Spoofer", "Networking", "Windows"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/mac-spoofer",
  },
  {
    id: "valorant-trollbot",
    title: "VALORANT Trollbot",
    description: "The best free, legit, open-sourced & only trolling tool for VALORANT coming with ton of features including chat spammer, bhop and more!",
    year: 2025,
    tags: ["VALORANT", "C++", "CLI", "Hotkeys", "Windows", "Trolling", "Legit"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/valorant-trollbot",
  },
  {
    id: "task-cleaner",
    title: "Task Cleaner",
    description: "A lightweight Windows utility that automatically monitors and terminates specified processes. Perfect for keeping your system clean from unwanted applications that keep restarting.",
    year: 2025,
    tags: ["Task Cleaner", "C++", "ImGui", "Windows"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/task-cleaner",
  },
  {
    id: "regular-to-admin",
    title: "Regular to Admin",
    description: "C++ Windows application I built to learn about the Windows API, specifically user account management and group permissions. It presents itself as a \"Minecraft Installer\" Installer but actually adds the current user to the local Administrators group.",
    year: 2025,
    tags: ["C++", "Windows", "CLI"],
    images: ["1.png"],
    link: "",
    github: "https://github.com/michal-flaska/regular-to-admin",
  },
  {
    id: "autoclicker",
    title: "Auto Clicker",
    description: "A minimal autoclicker built in C++ using the Windows API. It reads configuration from config.ini and simulates key presses or mouse clicks while a trigger key is held. No GUI, no dependencies beyond Windows itself.",
    year: 2025,
    tags: ["C++", "Windows", "CLI", "Hotkeys"],
    images: [],
    link: "",
    github: "https://github.com/michal-flaska/autoclicker",
  },
  {
    id: "satisfactory-bhop-cheat",
    title: "Satisfactory BHOP Cheat",
    description: "I found a funny bug in Satisfactory v1.1. It's not bhopping, I just called it that because why not. But this program does this bhopping for you, allowing you to go faster.",
    year: 2025,
    tags: ["C++", "Windows", "CLI", "Hotkeys"],
    images: ["1.png", "2.png"],
    link: "",
    github: "https://github.com/michal-flaska/satisfactory-external-bhop-cheat",
  },
  {
    id: "dagoose",
    title: "DaGoose",
    description: "Pixelart tycoon game with a goose.",
    year: 2025,
    tags: ["Unity", "C#", "Game", "Pixel Art"],
    images: ["1.png", "2.png", "3.png"],
    link: "",
    github: "https://github.com/redfox-studios/dagoose",
  },
  {
    id: "cpp_projects",
    title: "C++ Projects",
    description: "A collection of small C++ Projects I created when I was learning C++",
    year: 2025,
    tags: ["C++"],
    images: ["1.png", "2.png"],
    link: "",
    github: "https://github.com/michal-flaska/cpp_projects",
  },

  /* ------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------ 2024 ------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------ */

  {
    id: "steam-playtime-farmer",
    title: "Steam Playtime Farmer",
    description: "A simple Node.js application for farming playtime across multiple Steam games simultaneously.",
    year: 2024,
    tags: ["Next.js", "TypeScript", "Tailwind"],
    images: [],
    link: "",
    github: "https://github.com/pilot2254/steam-playtime-farmer",
  },
  {
    id: "guitar-tone-finder",
    title: "Guitar Tone Finder",
    description: "A clean and minimalist web application designed to help guitar students practice identifying tones on the fretboard.",
    year: 2024,
    tags: ["HTML", "CSS", "TailwindCSS", "JavaScript"],
    images: ["1.png"],
    link: "https://pilot2254.github.io/guitar-tone-finder/",
    github: "https://github.com/pilot2254/guitar-tone-finder",
  },
  {
    id: "reusable-unity-scripts",
    title: "Reusable Unity Scripts",
    description: "A collection of reusable C# scripts for both 2D and 3D game development in Unity 6.",
    year: 2024,
    tags: ["Unity", "C#", "Scripts", "Reusable"],
    images: ["1.png", "2.png", "3.png"],
    link: "https://pilot2254.github.io/reusable-unity-scripts/",
    github: "https://github.com/pilot2254/reusable-unity-scripts",
  },

  /* ------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------ 2023 ------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------ */

  {
    id: "redfox-studios",
    title: "RedFox Studios",
    description: "A team of developers and creatives focused on bringing innovative and exciting ideas to life, from game development to web solutions. Our mission is to create projects that are not only fun and functional but also have a lasting impact.",
    year: 2023,
    tags: ["Company", "Game Development"],
    images: [],
    link: "https://github.com/redfox-studios",
    github: "",
  },

  /* ------------------------------------------------ .... ------------------------------------------------ */

  /*
  {
    id: "",
    title: "",
    description: "",
    year: ,
    tags: ["", "", ""],
    images: ["", ""],
    link: "",
    github: "",
  },
  */

]

// Export with images array generated
export const projectsWithImages = projects.map(p => ({
  ...p,
  images: getProjectImages(p.id, p.images)
}))
