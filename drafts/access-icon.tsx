"use client";

import { createElement as h, forwardRef, useEffect, useRef, useState, type ForwardedRef, type SVGProps } from "react";

export type AccessState = "private" | "repository" | "link";
export interface AccessProps extends Omit<SVGProps<SVGSVGElement>, "children" | "dangerouslySetInnerHTML" | "strokeWidth"> {
  state: AccessState;
  size?: number | string;
  strokeWidth?: number;
  title?: string;
}
type Frame = { bodies: number[][]; heads: number[][]; connection: number };
interface MarkProps extends Omit<AccessProps, "state" | "strokeWidth"> {
  frame?: Frame;
  state?: number;
  strokeWeight?: number;
  svgRef?: ForwardedRef<SVGSVGElement>;
}
const stateIndex: Record<AccessState, number> = { private: 0, repository: 1, link: 2 };

/** Controlled access indicator. State changes animate in 200ms; first render is settled. */
export const Access = forwardRef<SVGSVGElement, AccessProps>(function Access(
  { state, strokeWidth = 1.65, ...props }, ref,
) {
  const frame = useAccessFrame(stateIndex[state]);
  return h(AccessMark, { ...props, frame, strokeWeight: strokeWidth, svgRef: ref });
});

// Shoulders become chain arcs; heads fade before a separate connector is drawn.
// Body: center x/y, radius x/y, start angle, sweep, rotation, opacity.
// Head: center x/y and opacity.
const arcRadius = 4.2;
const poses: Array<Omit<Frame, "connection">> = [
  { bodies:[[12,18,arcRadius,arcRadius,180,180,0,1],[12,18,arcRadius,arcRadius,180,180,0,0]],
    heads:[[12,7.4,1],[12,7.4,0]] },
  { bodies:[[8,19,arcRadius,arcRadius,180,180,0,1],[17,15.3,arcRadius,arcRadius,180,180,0,1]],
    heads:[[8,8.8,1],[17,5.8,1]] },
  { bodies:[[7.8,14.5,arcRadius,arcRadius,180,270,-170,1],[16.2,9.5,arcRadius,arcRadius,180,270,10,1]],
    heads:[[8,8.8,0],[17,5.8,0]] },
];
const mix = (a: number[],b: number[],t: number) => a.map((n,i) => n + (b[i]-n)*t);
const clamp = (value: number) => Math.max(0,Math.min(1,value));
const frameFor = (state: number): Frame => ({...poses[state],connection:state === 2 ? 1 : 0});
const interpolate = (a: Frame,b: Frame,t: number) => ({
  bodies:a.bodies.map((body,i)=>mix(body,b.bodies[i],t)),
  heads:a.heads.map((head,i)=>mix(head,b.heads[i],t)),
  connection:a.connection+(b.connection-a.connection)*t,
});
function arcPath([cx,cy,rx,ry,start,sweep,rotation]: number[]) {
  const rad = Math.PI/180;
  const turn = rotation*rad;
  const rotate = (x: number,y: number) => [x*Math.cos(turn)-y*Math.sin(turn),x*Math.sin(turn)+y*Math.cos(turn)];
  const point = (angle: number) => { const [x,y]=rotate(rx*Math.cos(angle),ry*Math.sin(angle)); return [cx+x,cy+y]; };
  const tangent = (angle: number) => rotate(-rx*Math.sin(angle),ry*Math.cos(angle));
  const step=sweep*rad/4;
  let angle=start*rad;
  let d=`M${point(angle).join(' ')}`;
  for(let i=0;i<4;i++) {
    const next=angle+step;
    const k=4/3*Math.tan(step/4);
    const p=point(angle), q=point(next), u=tangent(angle), v=tangent(next);
    d+=` C${p[0]+k*u[0]} ${p[1]+k*u[1]} ${q[0]-k*v[0]} ${q[1]-k*v[1]} ${q.join(' ')}`;
    angle=next;
  }
  return d;
}
function useAccessFrame(state: number) {
  const [frame,setFrame] = useState(() => frameFor(state));
  const current = useRef(frame);
  const previousState = useRef(state);
  useEffect(() => {
    if (previousState.current === state) return;
    previousState.current = state;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let from = current.current;
    let to = frameFor(state);
    // Missing material enters directly as a link, never as an intermediate teammate.
    if (from.bodies[1][7] === 0 && state !== 0) {
      from = {
        ...from,
        bodies:[from.bodies[0],[...to.bodies[1].slice(0,7),0]],
        heads:[from.heads[0],[...to.heads[1].slice(0,2),0]],
      };
    }
    // On return to personal access, the second piece fades in its current form.
    if (state === 0) {
      to = {
        ...to,
        bodies:[to.bodies[0],[...from.bodies[1].slice(0,7),0]],
        heads:[to.heads[0],[...from.heads[1].slice(0,2),0]],
      };
    }
    // Heads fade in place; they never travel toward or become the connector.
    if (state === 2) {
      to = {...to,heads:from.heads.map(([x,y])=>[x,y,0])};
    }
    let request = 0;
    const commit = (value: Frame) => { current.current = value; setFrame(value); };
    const reduce = () => { if (media.matches) { cancelAnimationFrame(request); commit(to); } };
    if (media.matches) { commit(to); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1,(now-start)/200);
      // Smooth, monotonic settling. Re-target from the currently rendered pose.
      const eased = 1 - Math.pow(1-t,3);
      commit(t === 1 ? to : interpolate(from,to,eased));
      if (t < 1) request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    media.addEventListener('change',reduce);
    return () => { cancelAnimationFrame(request); media.removeEventListener('change',reduce); };
  },[state]);
  return frame;
}
export function AccessMark({ frame, state = 0, size = 20, strokeWeight = 1.65, title, svgRef, className, "aria-label": ariaLabel, ...props }: MarkProps) {
  const pose=frame ?? frameFor(state);
  const hasAccessibleName=Boolean(title || ariaLabel || props["aria-labelledby"]);
  const headVisibility=clamp(1-pose.connection/0.35);
  // Let the arcs establish their link shape before drawing from left to right.
  const draw=pose.connection === 1 ? 1 : clamp((pose.connection-0.8)/0.2);
  return h('svg',{...props,ref:svgRef,className:['mi-access',className].filter(Boolean).join(' '),width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:props.stroke ?? 'currentColor',strokeWidth:strokeWeight,strokeLinecap:'round',strokeLinejoin:'round',
    role:props.role ?? (hasAccessibleName ? 'img' : undefined),'aria-label':ariaLabel ?? title,'aria-hidden':props['aria-hidden'] ?? (hasAccessibleName ? undefined : true)},
    ...pose.bodies.map((body,i)=>h('path',{key:`body-${i}`,className:`mi-access-body-${i}`,d:arcPath(body),opacity:body[7]})),
    ...pose.heads.map(([x,y,opacity],i)=>h('circle',{
      key:`head-${i}`,className:`mi-access-head-${i}`,cx:x,cy:y,
      r:strokeWeight*(i === 0 ? 1.3 : 1.075),fill:props.stroke ?? 'currentColor',stroke:'none',
      opacity:opacity*headVisibility,
    })),
    h('path',{className:'mi-access-connection',d:'M8.6 14.4 L15.4 9.6',
      pathLength:1,strokeDasharray:1,strokeDashoffset:1-draw,opacity:draw > 0 ? 1 : 0}),
  );
}

