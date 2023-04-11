# Julia setgenerator
## Generates a Julia set on the HTML5 Canvas through inverse iteration.

### Repository and Live Site Locations (testing)

Repository: https://github.com/the-blackhall-projects/julia-set-generator

Live site: https://the-blackhall-projects.github.io/julia-set-generator/

### Introduction
A Julia set is a fractal set in the complex plane that is defined by the behavior of a complex function at every point. To create a Julia set, you start with a complex number and plug it into a complex function repeatedly, generating a sequence of numbers. Depending on the function and the initial complex number, the sequence may either converge to a fixed point or diverge to infinity. The Julia set is the set of complex numbers for which the sequence of iterates neither converges nor diverges, but instead forms a chaotic, self-similar pattern. The set is often depicted graphically as a black-and-white image, where black represents points that belong to the Julia set, and white represents points that do not. Julia sets are known for their intricate and fascinating geometric patterns, and they have been studied extensively in mathematics, physics, and computer science.
### Inverse Iteration
The inverse iteration algorithm takes advantage of the fact that the points on the set are repelling points for the iterative formula.  Therefore the same points should be attractor points for the inverse formula:

<img src="https://latex.codecogs.com/svg.latex?\ z_{n+1}=z_{n}^{2}+c" title="formula" />

 This means by choosing any point near the Julia set points, subsequent iterations of the inverse function should produce points closer and closer to the Julia set itself.  If a point is already in the Julia set than subsequent inverse iterations will also be in the set.

Inverse function: 
<img src="https://latex.codecogs.com/svg.latex?\ z_{n+1}=\sqrt{z_{n}-c}" title="formula">.

Since the inverse iteration function involves a square root, and there are two complex square roots for any complex number, a random root is chosen each iteration.  This means that the set of numbers generated is non-deterministic.  This non-determinism is animated through repeated generation of points creating a shimmering effect.

The constant c in the formula, determines which Julia set is generated and the constant itself is obtained from the position of the mouse.  Thus as the mouse is moved around, a different Julia set is displayed.

### Features
#### Title and formula area.
At the top of the screen we have a title: Julia Set Generator and the formula upon which the set is based.  <img src="https://latex.codecogs.com/svg.latex?\ z_{n+1}=z_{n}^{2}+c" title="formula" />, where c is a complex constant.
#### Numeric display area.
This area displays the value of the complex number c in the formula and is updated based on mouse position.

![Numeric Display Area](https://github.com/the-blackhall-projects/julia-set-generator/blob/main/assets/images/numeric-display-area.png?raw=true)

#### Mouse Pointer

A small blue disk which moves wth the mouse. 

![Mouse Pointer](https://github.com/the-blackhall-projects/julia-set-generator/blob/main/assets/images/pointer.png?raw=true)

#### Fractal Area
An area for displaying the generated fractal. Noet the position of the blue mouse pointer in the upper left. 

![Fractal Area](https://github.com/the-blackhall-projects/julia-set-generator/blob/main/assets/images/fractal-area.png?raw=true)

#### Features left to implement

* A forward iteration version of the Julia Set generation.
* A means of saving the generated fractal.
* More information about the Julia Set for the user.

### Testing.

The website was tested extensively in Edge, Chrome and Firefox at a variety of screen sizes and found to work as expected.

w3.org validates HTML with no errors. 

https://validator.w3.org/nu/?doc=https%3A%2F%2Fthe-blackhall-projects.github.io%2Fjulia-set-generator%2F

![HTML Validation](https://github.com/the-blackhall-projects/julia-set-generator/blob/main/assets/images/html-validation.png?raw=true)


w3.org also validates CSS with no errors.
https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fthe-blackhall-projects.github.io%2Fjulia-set-generator%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en

![CSS Validation](https://github.com/the-blackhall-projects/julia-set-generator/blob/main/assets/images/css-validation.png?raw=true)

Javascript was validated on Jshit validator:
https://jshint.com/

No errors were found. 

Metrics

There are 13 functions in this file.

Function with the largest signature take 2 arguments, while the median is 0.

Largest function has 9 statements in it, while the median is 4.

The most complex function has a cyclomatic complexity value of 2 while the median is 1.

Several warnings were found relating to the use of const and let when declaring variables as these are not supported in older browsers.  However we choose to use them here. 

### Responsiveness.

Am I responsive produces the following results.

https://ui.dev/amiresponsive?url=https://the-blackhall-projects.github.io/julia-set-generator/



![Responsiveness](https://github.com/the-blackhall-projects/julia-set-generator/blob/main/assets/images/responsive-screenshots.png?raw=true)

The website works on all forms of device due to dynamic resizing of the canvas.

### Unfixed Bugs

All bugs have been fixed.

### Coding and file naming conventions.

All files are in lowercase with hyphens separating words were required.
Variables are in camelCase and class names have initial letter Capitalised.
Global variables have been kept to a minimum.

### Deployment

The site was deployed to GitHub pages. The steps to deploy are as follows:

* In the GitHub repository, navigate to the Settings tab
*   From the source section drop-down menu, select the Master Branch
*   Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

Live link can be found at the top of this page.

### Credits.

Text for the introduction of this ReadMe file was generated by ChatGPT.

When researching the project I used this vidio for the mathematical background:
https://www.youtube.com/watch?v=ICqj7nJbiRI

For basic animation on canvas I used this tutorial.
https://www.youtube.com/watch?v=Yvz_axxWG4Y
and some of the code is from that video.
