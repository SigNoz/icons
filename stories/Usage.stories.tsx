import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useRef, useState } from 'react';
import { Bell, Star, ZoomIn } from '../lib/icons';

const meta: Meta = {
 title: 'Icons / Usage',
 parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj;

export const ForwardRef: Story = {
 name: 'Forward Ref',
 parameters: {
  docs: {
   description: {
    story:
     'All icons accept a `ref` that points to the underlying `<svg>` DOM element. Click the button to read the bounding rect from the ref.',
   },
  },
 },
 render: function ForwardRefStory() {
  const ref = useRef<SVGSVGElement>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleRead = useCallback(() => {
   if (!ref.current) return;
   const { width, height, x, y } = ref.current.getBoundingClientRect();
   setInfo(`width: ${width.toFixed(1)}px · height: ${height.toFixed(1)}px · x: ${x.toFixed(1)} · y: ${y.toFixed(1)}`);
  }, []);

  return (
   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, fontFamily: 'system-ui, sans-serif' }}>
    <ZoomIn ref={ref} size="5xl" color="#3b82f6" />
    <button
     type="button"
     onClick={handleRead}
     style={{
      padding: '8px 18px',
      fontSize: 13,
      borderRadius: 8,
      border: '1px solid #3b82f6',
      background: '#3b82f6',
      color: '#fff',
      cursor: 'pointer',
     }}
    >
     Read bounding rect via ref
    </button>
    {info && (
     <code style={{ fontSize: 13, background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, color: '#334155' }}>
      {info}
     </code>
    )}
   </div>
  );
 },
};

export const CustomClassAndOnClick: Story = {
 name: 'Custom Class & onClick',
 parameters: {
  docs: {
   description: {
    story:
     'Icons forward all standard SVG props — pass `className` for custom styling and `onClick` for interaction.',
   },
  },
 },
 render: function CustomClassAndOnClickStory() {
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);
  const [starActive, setStarActive] = useState(false);

  return (
   <>
    <style>{`
     .icon-hoverable {
       cursor: pointer;
       transition: transform 0.15s, opacity 0.15s;
     }
     .icon-hoverable:hover {
       transform: scale(1.2);
       opacity: 0.8;
     }
     .icon-star-active {
       color: #f59e0b;
       filter: drop-shadow(0 0 6px #f59e0b88);
     }
    `}</style>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, fontFamily: 'system-ui, sans-serif' }}>
     <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <Bell
       className="icon-hoverable"
       size="5xl"
       color="#6366f1"
       onClick={() => setClickedIcon('Bell')}
       aria-label="Bell icon"
      />
      <Star
       className={`icon-hoverable${starActive ? ' icon-star-active' : ''}`}
       size="5xl"
       color={starActive ? '#f59e0b' : '#94a3b8'}
       onClick={() => {
        setStarActive((v) => !v);
        setClickedIcon('Star');
       }}
       aria-label="Star icon"
      />
     </div>
     <div style={{ fontSize: 13, color: '#64748b', minHeight: 22 }}>
      {clickedIcon ? (
       <span>
        Clicked: <strong>{clickedIcon}</strong>
        {clickedIcon === 'Star' && <span> — {starActive ? 'starred ★' : 'unstarred ☆'}</span>}
       </span>
      ) : (
       <span>Click an icon above</span>
      )}
     </div>
     <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, textAlign: 'center', maxWidth: 320 }}>
      <code style={{ background: '#f1f5f9', padding: '2px 5px', borderRadius: 4 }}>className</code> adds CSS classes ·{' '}
      <code style={{ background: '#f1f5f9', padding: '2px 5px', borderRadius: 4 }}>onClick</code> works like any SVG element
     </p>
    </div>
   </>
  );
 },
};
