export const createChildElementRectMap = (nodes) => {
    if(!nodes) {
        return new Map;
    }
    const elements = Array.from(nodes.childNodes);
    return new Map(elements.map((node) => {
        try {
            return [node, node.getBoundingClientRect()]
        } catch (error) {
            return null
        }
    }).filter(Boolean));
}