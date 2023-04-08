# Julia setgenerator
## Generates a Julia set on the HTML5 Canvas through inverse iteration.

### Repository and Live Site Locations

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

### Validator Testing.


