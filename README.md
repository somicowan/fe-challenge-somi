# fe-challenge-somi
Here's my attempt at solving Fast Radius's front end challenge. The instructions can be found at https://github.com/fast-radius/fe-challenge/.

# Instructions for running the code
1. Clone the repo
2. `npm install` to install the dependencies
3. `npm run create` - This commands creates a `dist` folder which should contain the compiled files.
4. Go to `/dist` and open up `index.html` in a web browser (I don't think this works in IE11, unfortunately).

# Design Decisions
## Creating a webpack script to make a compiled `index.html`
Personally, I find `create-react-app` command to be pretty bulky and there's a lot of libraries/dependencies that gets added and I don't fully understand what they do. For simple prototypes/projects like these, I like to use this cobbled-together webpack script, though the script definitely needs some more work (e.g.create a watch).

## Using a Pagination library
I could've created own my pagination component, but I know that if this was a real project, I'd probably just search for a library to get the job done. There's no particular reason for using react-js-pagination; it's just one of the lightweight ones I've found online.

## Common folder
I thought it would be a good idea to separate out often re-used components or variables in a different folder. I've only color variables and a pagination component, but if I were to create viewport variables or a UI element that's commonly used/likely to be extended (e.g. CTAs) then they would go here as well.

## Some Accessibility Considerations
I've added couple of accessibility features (e.g. `label` for the input with `aria-label` to be more specific for screenreaders, `aria-live` for the status).  

# TODO (i.e. things I'd do if I had more time)
1. Implement error handling for if the server isn't up
2. Implement error handling for if user adds characters (not number) into input field
3. Add `lang` for `html` (accessibility) 
4. Change arrows in pagination to text
5. Make UI look less ugly
6. Check file type (i.e. is file inputted a `.stl` or `.step`)? Not sure if that'd be in the back end when user adds to UI
7. Maybe add a "add file" ability
8. Add `aria-label` for save button to include file name
9. See if I can "Current page" into `aria-label` for pagination
