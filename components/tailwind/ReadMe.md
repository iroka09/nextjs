npm i tailwindcss -D 
npx tailwindcss init
//then configure "tailwindcss.config.js" so that content: will have the html file you to watch
npx tailwindcss -i ./src/tailwind/input.css -o ./src/tailwind/output.css --watch