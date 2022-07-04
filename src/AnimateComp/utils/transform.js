export function transform(node, invert, duration, options) {
    node.animate(
        [
           {
              transform: `translate(${invert.left}px, ${invert.top}px)`,
           },
           { transform: "translate(0, 0)" },
        ],
        {
           duration,
           easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
           ...options,
        }
     );
}