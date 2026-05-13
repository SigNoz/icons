import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, type IconType, Info, Settings, Star, Trash2, ZoomIn } from '../lib/icons';

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
   setInfo(
    `width: ${width.toFixed(1)}px · height: ${height.toFixed(1)}px · x: ${x.toFixed(1)} · y: ${y.toFixed(1)}`,
   );
  }, []);

  return (
   <div
    style={{
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     gap: 24,
     fontFamily: 'system-ui, sans-serif',
    }}
   >
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
     <code
      style={{
       fontSize: 13,
       background: '#f1f5f9',
       padding: '6px 12px',
       borderRadius: 6,
       color: '#334155',
      }}
     >
      {info}
     </code>
    )}
   </div>
  );
 },
};

export const Accessibility: Story = {
 name: 'Accessibility',
 parameters: {
  docs: {
   description: {
    story: `Every icon ships with sensible accessibility defaults:

- \`role="img"\` and \`aria-label="<icon-name>"\` (kebab-case from the component name) so screen readers announce a meaningful name out of the box.
- \`focusable="false"\` to prevent legacy focus traps.
- A per-icon class \`signoz-icon-<name>\` (in addition to \`signoz-icon\`) for CSS targeting.

You can override the label with your own \`aria-label\`, or opt out entirely with \`aria-hidden\` when the icon is decorative (e.g. sitting next to a text label inside a button).`,
   },
  },
 },
 render: function AccessibilityStory() {
  const defaultRef = useRef<SVGSVGElement>(null);
  const overrideRef = useRef<SVGSVGElement>(null);
  const decorativeRef = useRef<SVGSVGElement>(null);
  const focusableRef = useRef<SVGSVGElement>(null);
  const [snapshots, setSnapshots] = useState<Record<string, string>>({});

  useEffect(() => {
   const read = (el: SVGSVGElement | null) =>
    el
     ? [
        `role="${el.getAttribute('role') ?? '—'}"`,
        `aria-label="${el.getAttribute('aria-label') ?? '—'}"`,
        `aria-hidden="${el.getAttribute('aria-hidden') ?? '—'}"`,
        `tabindex="${el.getAttribute('tabindex') ?? '—'}"`,
        `focusable="${el.getAttribute('focusable') ?? '—'}"`,
        `class="${el.getAttribute('class') ?? '—'}"`,
       ].join('\n')
     : '';
   setSnapshots({
    default: read(defaultRef.current),
    override: read(overrideRef.current),
    decorative: read(decorativeRef.current),
    focusable: read(focusableRef.current),
   });
  }, []);

  const card: React.CSSProperties = {
   display: 'flex',
   flexDirection: 'column',
   gap: 12,
   padding: 16,
   border: '1px solid #e2e8f0',
   borderRadius: 8,
   background: '#fff',
  };
  const codeBlock: React.CSSProperties = {
   fontSize: 12,
   fontFamily: 'ui-monospace, SFMono-Regular, monospace',
   whiteSpace: 'pre',
   background: '#0f172a',
   color: '#e2e8f0',
   padding: 12,
   borderRadius: 6,
   margin: 0,
   overflowX: 'auto',
  };
  const attrBlock: React.CSSProperties = {
   fontSize: 12,
   fontFamily: 'ui-monospace, SFMono-Regular, monospace',
   whiteSpace: 'pre',
   background: '#f1f5f9',
   color: '#334155',
   padding: 10,
   borderRadius: 6,
   margin: 0,
  };
  const sectionLabel: React.CSSProperties = {
   fontSize: 11,
   fontWeight: 600,
   textTransform: 'uppercase',
   letterSpacing: 0.5,
   color: '#64748b',
  };
  const headline: React.CSSProperties = {
   fontSize: 14,
   fontWeight: 600,
   color: '#0f172a',
   margin: 0,
  };

  return (
   <div
    style={{
     display: 'flex',
     flexDirection: 'column',
     gap: 20,
     fontFamily: 'system-ui, sans-serif',
     maxWidth: 720,
    }}
   >
    <div style={card}>
     <div>
      <p style={headline}>1. Default — auto label & class</p>
      <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>
       No props needed. The icon name becomes the <code>aria-label</code> and a CSS hook.
      </p>
     </div>
     <pre style={codeBlock}>{`<Bell />`}</pre>
     <div style={sectionLabel}>Renders</div>
     <Bell ref={defaultRef} size="3xl" color="#6366f1" />
     <div style={sectionLabel}>DOM attributes</div>
     <pre style={attrBlock}>{snapshots.default || '(reading...)'}</pre>
    </div>

    <div style={card}>
     <div>
      <p style={headline}>2. Override — your label wins</p>
      <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>
       Pass your own <code>aria-label</code> when the icon needs a richer description.
      </p>
     </div>
     <pre style={codeBlock}>{`<Bell aria-label="3 unread notifications" />`}</pre>
     <div style={sectionLabel}>Renders</div>
     <Bell ref={overrideRef} size="3xl" color="#0ea5e9" aria-label="3 unread notifications" />
     <div style={sectionLabel}>DOM attributes</div>
     <pre style={attrBlock}>{snapshots.override || '(reading...)'}</pre>
    </div>

    <div style={card}>
     <div>
      <p style={headline}>3. Decorative — opt out with aria-hidden</p>
      <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>
       When the icon sits next to a text label, hide it from assistive tech so the label isn&apos;t
       announced twice.
      </p>
     </div>
     <pre style={codeBlock}>{`<button>
  <Trash2 aria-hidden />
  Delete item
</button>`}</pre>
     <div style={sectionLabel}>Renders</div>
     <button
      type="button"
      style={{
       display: 'inline-flex',
       alignItems: 'center',
       gap: 8,
       padding: '8px 14px',
       fontSize: 13,
       borderRadius: 8,
       border: '1px solid #ef4444',
       background: '#fff',
       color: '#ef4444',
       cursor: 'pointer',
       width: 'fit-content',
      }}
     >
      <Trash2 ref={decorativeRef} size="lg" aria-hidden />
      Delete item
     </button>
     <div style={sectionLabel}>DOM attributes (on the SVG)</div>
     <pre style={attrBlock}>{snapshots.decorative || '(reading...)'}</pre>
    </div>

    <div style={card}>
     <div>
      <p style={headline}>4. Focusable — info icon with tooltip on focus</p>
      <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>
       The default <code>focusable=&quot;false&quot;</code> stops keyboards from landing on the SVG.
       Pass <code>focusable=&quot;true&quot;</code> + <code>tabIndex={0}</code> when you <em>do</em>{' '}
       want the icon reachable — e.g. a help icon whose tooltip should reveal on focus, not just on
       hover.
      </p>
     </div>
     <pre style={codeBlock}>{`<label>
  Password
  <Info
    tabIndex={0}
    focusable="true"
    aria-describedby="pw-hint"
  />
  <span id="pw-hint" role="tooltip">
    Min 12 chars, mixed case, one symbol
  </span>
</label>`}</pre>
     <div style={sectionLabel}>Renders (Tab into the field, then Tab again to the icon)</div>
     <style>{`
      .signoz-icon-tooltip-host { position: relative; display: inline-flex; align-items: center; gap: 6px; }
      .signoz-icon-tooltip-host .signoz-icon-tooltip-target:focus,
      .signoz-icon-tooltip-host .signoz-icon-tooltip-target:hover {
        outline: 2px solid #6366f1; outline-offset: 2px; border-radius: 50%;
      }
      .signoz-icon-tooltip {
        position: absolute; left: 100%; top: 50%; transform: translate(8px, -50%);
        white-space: nowrap; background: #0f172a; color: #e2e8f0; font-size: 12px;
        padding: 6px 10px; border-radius: 6px; opacity: 0; pointer-events: none;
        transition: opacity 0.15s;
      }
      .signoz-icon-tooltip-host .signoz-icon-tooltip-target:focus + .signoz-icon-tooltip,
      .signoz-icon-tooltip-host .signoz-icon-tooltip-target:hover + .signoz-icon-tooltip {
        opacity: 1;
      }
     `}</style>
     <label
      style={{
       display: 'inline-flex',
       alignItems: 'center',
       gap: 8,
       fontSize: 13,
       color: '#0f172a',
      }}
     >
      Password
      <input
       type="password"
       defaultValue="hunter2"
       style={{
        padding: '6px 10px',
        border: '1px solid #cbd5e1',
        borderRadius: 6,
        fontSize: 13,
       }}
      />
      <span className="signoz-icon-tooltip-host">
       <Info
        ref={focusableRef}
        size="lg"
        color="#6366f1"
        tabIndex={0}
        focusable="true"
        aria-describedby="pw-hint"
        className="signoz-icon-tooltip-target"
       />
       <span id="pw-hint" role="tooltip" className="signoz-icon-tooltip">
        Min 12 chars, mixed case, one symbol
       </span>
      </span>
     </label>
     <div style={sectionLabel}>DOM attributes</div>
     <pre style={attrBlock}>{snapshots.focusable || '(reading...)'}</pre>
    </div>

    <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
     <strong>Rule of thumb:</strong> if the icon sits next to a text label, pass{' '}
     <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>aria-hidden</code>{' '}
     so the screen reader doesn&apos;t announce it twice. If the icon is the entire control
     (icon-only button), let the default label stand or pass a more descriptive{' '}
     <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>aria-label</code>.
    </p>
   </div>
  );
 },
};

export const PolymorphicIconType: Story = {
 name: 'IconType (polymorphic prop)',
 parameters: {
  docs: {
   description: {
    story:
     'Use the exported `IconType` to accept any icon as a prop — useful for buttons, menu items, and other components that take an icon by name.',
   },
  },
 },
 render: function PolymorphicStory() {
  const IconButton = ({
   icon: Icon,
   label,
   onClick,
  }: {
   icon: IconType;
   label: string;
   onClick: () => void;
  }) => (
   <button
    type="button"
    onClick={onClick}
    style={{
     display: 'inline-flex',
     alignItems: 'center',
     gap: 8,
     padding: '8px 14px',
     fontSize: 13,
     borderRadius: 8,
     border: '1px solid #cbd5e1',
     background: '#fff',
     color: '#0f172a',
     cursor: 'pointer',
    }}
   >
    <Icon size="lg" aria-hidden />
    {label}
   </button>
  );

  const [last, setLast] = useState<string | null>(null);

  const snippet = `import { type IconType, Settings, Bell, Star } from '@signozhq/icons';

function IconButton({ icon: Icon, label, onClick }: {
  icon: IconType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}>
      <Icon size="lg" aria-hidden />
      {label}
    </button>
  );
}

<IconButton icon={Settings} label="Settings" onClick={...} />
<IconButton icon={Bell}     label="Notifications" onClick={...} />
<IconButton icon={Star}     label="Favorites" onClick={...} />`;

  return (
   <div
    style={{
     display: 'flex',
     flexDirection: 'column',
     gap: 16,
     fontFamily: 'system-ui, sans-serif',
     maxWidth: 720,
    }}
   >
    <pre
     style={{
      fontSize: 12,
      fontFamily: 'ui-monospace, SFMono-Regular, monospace',
      whiteSpace: 'pre',
      background: '#0f172a',
      color: '#e2e8f0',
      padding: 12,
      borderRadius: 6,
      margin: 0,
      overflowX: 'auto',
     }}
    >
     {snippet}
    </pre>
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
     <IconButton icon={Settings} label="Settings" onClick={() => setLast('Settings')} />
     <IconButton icon={Bell} label="Notifications" onClick={() => setLast('Notifications')} />
     <IconButton icon={Star} label="Favorites" onClick={() => setLast('Favorites')} />
    </div>
    <code
     style={{
      fontSize: 12,
      background: '#f1f5f9',
      padding: '6px 10px',
      borderRadius: 6,
      color: '#334155',
      minHeight: 18,
      alignSelf: 'center',
     }}
    >
     {last ? `Clicked: ${last}` : 'Click any button'}
    </code>
    <p style={{ fontSize: 12, color: '#64748b', margin: 0, textAlign: 'center' }}>
     <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4 }}>IconType</code>{' '}
     types the <code>icon</code> prop so any icon from this package is assignable — same forwarded
     ref, same SVG props.
    </p>
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
    <div
     style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
      fontFamily: 'system-ui, sans-serif',
     }}
    >
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
      <code style={{ background: '#f1f5f9', padding: '2px 5px', borderRadius: 4 }}>className</code>{' '}
      adds CSS classes ·{' '}
      <code style={{ background: '#f1f5f9', padding: '2px 5px', borderRadius: 4 }}>onClick</code>{' '}
      works like any SVG element
     </p>
    </div>
   </>
  );
 },
};
