# AvatarMaker
It's a little proof of concept that generates a "random" avatar.
But it's not random – By taking the Name (and additional metadata as a second dimension) into account, the output is consistent with the input.

This allows for regeneration with consistency, great for a larger set of entries that might be re-initialized somewhere else.
The name & metadata sums define four parameters:

### Color
Picks one of the predefined background colors.

### Color Strategy
Picks one of the color strategies (solid, fade, fade-reverse, out-in-out, in-out-in). Everything apart solid is made to blend into the background to create something more "wavy".

### Shape
Picks one of the SVG shapes, which live in the shapes file as a simple string for portability (The SVGs are there for reference). This is a proof of concept to make it more portable and not relying on fetching additional files etc. since the idea is to convert this to use node-canvas later to run it in a serverless function.

### Strategy
Picks one of the placement strategies for the shapes.
- **Centered:** The default, simply placing the shape.
- **Overscale:** Centered, but scaled up.
- **Offset left:** Scaled up, and moved to the left.
- **Offset right:** Scaled up, and moved to the right.
- **Offset top:** Scaled up, and moved to the top.
- **Offset bottom:** Scaled up, and moved to the bottom.
- **Mirror:** Two of the same shape, offset to the left and right.
- **Mirror offset:** Two of the same shape, offset to the left and right, while being also translated to the top and bottom.
