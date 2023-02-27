import { Node, useReactFlow } from 'reactflow';
import { useEffect, useState } from 'react';
import { timer } from 'd3-timer';

export const animationOptions = { duration: 300 };

export default function useAnimatedNodes(
  defaultNodes: Node[],
  options = animationOptions
): [Node[], (nds: Node[]) => void] {
  const [targetNodes, setTargetNodes] = useState(defaultNodes);
  const [nodes, setNodes] = useState(defaultNodes);
  const { getNode } = useReactFlow();

  useEffect(() => {
    const transitions = targetNodes.map((node) => {
      return {
        id: node.id,
        from: getNode(node.id)?.position || node.position,
        to: node.position,
        node
      };
    });

    const t = timer((elapsed) => {
      const s = elapsed / options.duration;
      const currNodes = transitions.map(({ node, from, to }) => {
        return {
          ...node,
          position: {
            x: from.x + (to.x - from.x) * s,
            y: from.y + (to.y - from.y) * s
          }
        };
      });

      setNodes(currNodes);

      if (elapsed > options.duration) {
        t.stop();
      }
    });

    return () => t.stop();
  }, [targetNodes, options.duration]);

  return [nodes, setTargetNodes];
}
