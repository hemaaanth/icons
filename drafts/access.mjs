import { createElement as h, useEffect, useId, useRef, useState } from 'react';
import { useDialKit } from 'dialkit';

import { Access, AccessMark } from './access-icon';
import accessSource from './access-icon.tsx?raw';

export const accessStates = [
  { id: 'private', label: 'Only me', description: 'Personal access' },
  { id: 'repository', label: 'Anyone with repo access', description: 'Project members' },
  { id: 'link', label: 'Anyone with the link', description: 'Link access' },
];

export function Workbench() {
  const [state,setState] = useState(0);
  const [open,setOpen] = useState(false);
  const [disabled,setDisabled] = useState(false);
  const [copyStatus,setCopyStatus] = useState('');
  const trigger = useRef(null);
  const items = useRef([]);
  const popupId = useId();
  const values = useDialKit('Access', { preview: { size:[20,16,32,1] }, geometry:{ stroke:[1.65,1.4,2,0.05] } }, {id:'access-draft',persist:true});
  const icon = (props = {}) => h(AccessMark,{strokeWeight:values.geometry.stroke,...props});
  useEffect(() => { if(open) items.current[state]?.focus(); },[open,state]);
  const choose = (next) => { if(disabled) return; setState(next); setOpen(false); trigger.current?.focus(); };
  function keydown(event) {
    const keys = ['ArrowDown','ArrowUp','Home','End','Escape'];
    if(!keys.includes(event.key)) return;
    event.preventDefault();
    if(event.key === 'Escape') { setOpen(false); trigger.current?.focus(); return; }
    if(!open) { setOpen(true); return; }
    const focused = items.current.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (focused + (event.key === 'ArrowDown' ? 1 : 2)) % 3;
    items.current[next]?.focus();
  }
  return h('div',{className:'mi-access-workbench'},
    h('style',null,previewCss),
    h('p',{className:'mi-access-intro'},'Personal. Shared. Connected.'),
    h('section',{className:'mi-access-surface','aria-label':'Access dropdown preview'},
      h('div',{className:'mi-access-context'},h('span',null,'Project notes'),h('span',null,'Edited just now')),
      h('div',{className:'mi-access-picker',onKeyDown:keydown,onBlur:(event) => {if(!event.currentTarget.contains(event.relatedTarget)) setOpen(false);}},
        h('button',{ref:trigger,type:'button',className:'mi-access-trigger',disabled,'aria-haspopup':'menu','aria-expanded':open,'aria-controls':popupId,onClick:()=>setOpen(!open)},
          h(Access,{state:accessStates[state].id,size:values.preview.size,strokeWidth:values.geometry.stroke}),h('span',null,accessStates[state].label),h('span',{'aria-hidden':true,className:'mi-access-chevron'},'⌄')),
        open && h('div',{className:'mi-access-menu',role:'menu',id:popupId,'aria-label':'Visibility'},
          ...accessStates.map((item,i)=>h('button',{key:item.id,ref:node=>{items.current[i]=node;},type:'button',role:'menuitemradio','aria-checked':state===i,tabIndex:-1,onClick:()=>choose(i)},
            icon({state:i,size:values.preview.size}),h('span',null,item.label),h('span',{'aria-hidden':true,className:'mi-access-selected'},state===i?'✓':'')))))
    ),
    h('div',{className:'mi-access-state-controls',role:'group','aria-label':'Preview access state'},...accessStates.map((item,i)=>h('button',{type:'button',key:item.id,disabled,'aria-pressed':state===i,onClick:()=>setState(i)},icon({state:i,size:20}),h('span',null,item.description)))),
    h('p',{className:'mi-access-caption','aria-live':'polite'},accessStates[state].label),
    h('section',{className:'mi-access-size-section','aria-label':'Static size comparison'},
      h('div',{className:'section-heading'},h('p',{className:'eyebrow'},'At actual size'),h('span',null,'16–20 px first')),
      h('table',null,h('thead',null,h('tr',null,h('th',{scope:'col'},'Audience'),...[13,16,20,24,32].map(size=>h('th',{key:size,scope:'col'},`${size}px`)))),
        h('tbody',null,...accessStates.map((item,i)=>h('tr',{key:item.id},h('th',{scope:'row'},item.description),...[13,16,20,24,32].map(size=>h('td',{key:size},icon({state:i,size})))))))
    ),
    h('div',{className:'mi-access-footer'},h('button',{type:'button',className:'mi-access-copy',onClick:async()=>{
      try { await navigator.clipboard.writeText(accessSource); setCopyStatus('React component copied.'); }
      catch { setCopyStatus('Clipboard unavailable. Use drafts/access-icon.tsx.'); }
    }},'Copy React component'),h('span',{role:'status'},copyStatus),h('label',null,h('input',{type:'checkbox',checked:disabled,onChange:event=>{setDisabled(event.target.checked);setOpen(false);}}),' Disabled')),
  );
}
const previewCss = `
.mi-access { display:block; flex:none; overflow:visible; }
.mi-access-intro { color:var(--muted); font-size:14px; margin:0 0 24px; }
.mi-access-surface { min-height:290px; padding:24px; background:var(--surface-raised); border:1px solid var(--border); border-radius:12px; }
.mi-access-context { display:flex; align-items:center; justify-content:space-between; gap:12px; font-size:13px; margin-bottom:28px; }
.mi-access-context span:last-child { color:var(--faint); font-size:11px; }
.mi-access-picker { position:relative; width:100%; max-width:310px; }
.mi-access-trigger,.mi-access-menu button { display:flex; align-items:center; gap:12px; min-height:44px; width:100%; padding:10px 12px; background:transparent; color:var(--text); border:0; text-align:left; cursor:pointer; font-size:13px; }
.mi-access-trigger { border:1px solid var(--border-strong); border-radius:6px; }
.mi-access-trigger .mi-access { color:var(--muted); }
.mi-access-chevron { margin-left:auto; color:var(--muted); }
.mi-access-menu { position:absolute; top:calc(100% + 6px); left:0; width:100%; padding:4px; background:var(--surface); border:1px solid var(--border-strong); border-radius:7px; box-shadow:0 8px 24px #0001; z-index:2; }
.mi-access-menu button { border-radius:3px; }
.mi-access-menu button:hover,.mi-access-menu button:focus-visible { background:var(--surface-hover); outline-offset:-2px; }
.mi-access-menu .mi-access { color:var(--muted); }
.mi-access-selected { margin-left:auto; color:#60a27b; }
.mi-access-state-controls { display:flex; flex-wrap:wrap; gap:8px; margin-top:20px; }
.mi-access-state-controls button { display:flex; align-items:center; justify-content:center; gap:8px; flex:1; min-width:120px; padding:12px 10px; border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--muted); font-size:11px; cursor:pointer; }
.mi-access-state-controls button[aria-pressed=true] { color:var(--text); border-color:var(--text); background:var(--surface-raised); }
.mi-access-caption { margin:14px 0 30px; color:var(--muted); font-size:12px; text-align:center; }
.mi-access-size-section { overflow-x:auto; }
.mi-access-size-section table { width:100%; border-collapse:collapse; font-size:11px; white-space:nowrap; }
.mi-access-size-section th { font-weight:450; color:var(--muted); }
.mi-access-size-section th,.mi-access-size-section td { height:62px; border-bottom:1px solid var(--border); text-align:center; padding:6px; }
.mi-access-size-section th:first-child { text-align:left; }
.mi-access-size-section td .mi-access { margin:auto; }
.mi-access-footer { display:flex; flex-wrap:wrap; justify-content:space-between; gap:16px; margin-top:20px; color:var(--muted); font-size:11px; }
.mi-access-copy { padding:0; border:0; background:none; color:var(--text); font:inherit; text-decoration:underline; text-underline-offset:3px; cursor:pointer; }
.mi-access-footer label { display:flex; gap:6px; align-items:center; }
.mi-access-workbench button:disabled { opacity:.4; cursor:default; }
`;
export default {
  exportName:'Access',slug:'access',name:'Access',
  brief:'A persistent three-state visibility indicator for a dropdown: only me, repo members, anyone with link; judged at 16 and 20px, maximum32.',
  references:[
    {name:'Carbon icon sizing — https://carbondesignsystem.com/elements/icons/usage/',keep:'16px as a primary authored use case; steady footprint',reject:'Dense details scaled down',doNotCopy:'Any icon path'},
    {name:'Primer optical grids — https://primer.style/octicons/design-guidelines',keep:'Review the actual small size independently',reject:'Assuming a 24px construction scales perfectly',doNotCopy:'Person, organization, or link contours'},
    {name:'Material keylines — https://m3.material.io/styles/icons/designing-icons',keep:'Optical balance on a 24-unit field',reject:'Equal bounds as a substitute for equal visual mass',doNotCopy:'Material symbol geometry'},
    {name:'People and physical chain',keep:'Additional person conveys membership; connections interlock',reject:'Decorative enclosures and unmotivated shape replacement',doNotCopy:'Literal mechanical details at small size'},
  ],
  geometryStrategy:'User-directed material correspondence: both full shoulder arcs rotate and extend into 270-degree circular chain loops with exactly the same 4.2-unit radius in every state; head dots fade in place, then a separate connector draws from left to right between the transformed loops. Direct personal/link transitions add or remove the missing chain material without a team intermediate. Parametric cubic arcs preserve topology and current-frame retargeting over 200ms.',
  body:'',candidates:[],
};
