/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('flowbite/plugin')
	],
  theme: {
    extend: {
      colors: {
        'pure-human': '#45357F',
        'human': '#266C7F',
        'normal-path': '#4C473B',
        'kemono': '#7F4D43',
        'pure-kemono': '#7F272E'
      }
    }
  }
}
