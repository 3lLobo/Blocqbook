export function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)].toLowerCase()
  }
  return color
}

// Taolwind colors from their website
const tailwindColors = {
  colors: [
    // "slate",
    // "gray",
    'zinc',
    // "neutral",
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ],
  shades: [
    // "100",
    // "200",
    '300',
    '400',
  ],
}

// function to select a random color from the tailwind pallette in the shade range 50-500.
export function getRandomTailwindColor() {
  const color =
    tailwindColors.colors[
      Math.floor(Math.random() * tailwindColors.colors.length)
    ]
  const shade =
    tailwindColors.shades[
      Math.floor(Math.random() * tailwindColors.shades.length)
    ]
  return `${color}-${shade}`
}
