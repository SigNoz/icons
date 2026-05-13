import type { Meta, StoryObj } from '@storybook/react-vite';
import * as LucideIcons from 'lucide-react';
import type React from 'react';
import { useMemo, useState } from 'react';

const iconModules = (
  import.meta as unknown as { glob: (p: string, o?: { eager?: boolean }) => Record<string, unknown> }
).glob('../lib/icons/*.tsx', { eager: true }) as Record<
  string,
  { default: React.ComponentType<{ size?: string | number; color?: string }> }
>;

interface IconPair {
  name: string;
  SignozIcon: React.ComponentType<{ size?: string | number; color?: string }>;
  LucideIcon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }> | null;
}

function getIconPairs(): IconPair[] {
  const pairs: IconPair[] = [];
  for (const [path, mod] of Object.entries(iconModules)) {
    if (!mod?.default) continue;
    const name = path.replace(/^.*\/([^/]+)\.tsx$/, '$1');
    if (name === 'index') continue;
    const LucideIcon =
      (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>>)[name] ?? null;
    pairs.push({ name, SignozIcon: mod.default, LucideIcon });
  }
  return pairs.sort((a, b) => a.name.localeCompare(b.name));
}

const meta: Meta = {
  title: 'Icons / Lucide Comparison',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Side-by-side comparison of @signozhq/icons vs lucide-react. Green badge = match found in lucide-react; grey badge = SigNoz-only icon.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type FilterMode = 'all' | 'matched' | 'unmatched';

export const Comparison: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: function LucideComparisonStory() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<FilterMode>('all');
    const [searchFocused, setSearchFocused] = useState(false);

    const allPairs = useMemo(() => getIconPairs(), []);

    const stats = useMemo(() => {
      const matched = allPairs.filter((p) => p.LucideIcon !== null).length;
      return { total: allPairs.length, matched, unmatched: allPairs.length - matched };
    }, [allPairs]);

    const filtered = useMemo(() => {
      let list = allPairs;
      if (filter === 'matched') list = list.filter((p) => p.LucideIcon !== null);
      if (filter === 'unmatched') list = list.filter((p) => p.LucideIcon === null);
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        list = list.filter((p) => p.name.toLowerCase().includes(q));
      }
      return list;
    }, [allPairs, filter, search]);

    const ICON_SIZE = 24;

    return (
      <div
        style={{
          fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
          background: 'linear-gradient(180deg, #f8f9fb 0%, #f0f2f5 100%)',
          minHeight: '100vh',
          padding: '32px 24px 48px',
          color: '#1a1d21',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#1a1d21',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              @signozhq/icons vs lucide-react
            </h1>
            <p style={{ fontSize: 14, color: '#5c6370', margin: '6px 0 0' }}>
              {stats.matched} of {stats.total} icons have a matching lucide-react counterpart &mdash;{' '}
              {stats.unmatched} are SigNoz-only.
            </p>
          </header>

          {/* Toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 24,
              padding: '16px 20px',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ position: 'relative', flex: '1 1 260px', minWidth: 0 }}>
              <svg
                style={{
                  position: 'absolute',
                  left: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  pointerEvents: 'none',
                }}
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search by icon name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search icons"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 14px 10px 34px',
                  fontSize: 14,
                  border: searchFocused ? '1px solid #3b82f6' : '1px solid #e2e5e9',
                  borderRadius: 8,
                  background: '#fafbfc',
                  color: '#1a1d21',
                  outline: 'none',
                  boxShadow: searchFocused ? '0 0 0 3px rgba(59,130,246,0.2)' : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
              />
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8 }}>
              {(['all', 'matched', 'unmatched'] as FilterMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFilter(mode)}
                  style={{
                    padding: '7px 14px',
                    fontSize: 13,
                    fontWeight: filter === mode ? 600 : 400,
                    borderRadius: 8,
                    border: filter === mode ? '1px solid #3b82f6' : '1px solid #e2e5e9',
                    background: filter === mode ? '#eff6ff' : '#fff',
                    color: filter === mode ? '#2563eb' : '#374151',
                    cursor: 'pointer',
                  }}
                >
                  {mode === 'all' && `All (${stats.total})`}
                  {mode === 'matched' && `Matched (${stats.matched})`}
                  {mode === 'unmatched' && `SigNoz-only (${stats.unmatched})`}
                </button>
              ))}
            </div>

            <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 'auto' }}>
              <strong style={{ color: '#374151' }}>{filtered.length}</strong> shown
            </span>
          </div>

          {/* Column header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              marginBottom: 8,
              paddingLeft: 4,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                paddingLeft: 20,
              }}
            >
              @signozhq/icons
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                paddingLeft: 20,
              }}
            >
              lucide-react
            </span>
          </div>

          {/* Comparison rows */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <p style={{ fontSize: 16, fontWeight: 500, color: '#374151', margin: '0 0 8px' }}>
                No matches
              </p>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
                No icons match &quot;{search}&quot;.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filtered.map(({ name, SignozIcon, LucideIcon }) => (
                <div
                  key={name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  {/* SigNoz icon cell */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '12px 20px',
                      background: '#fff',
                      borderRadius: '10px 0 0 10px',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f3f4f6',
                        borderRadius: 8,
                        flexShrink: 0,
                        color: '#1a1d21',
                      }}
                    >
                      <SignozIcon size={ICON_SIZE} color="#1a1d21" />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: 13,
                          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
                          color: '#1a1d21',
                          fontWeight: 500,
                        }}
                      >
                        {name}
                      </span>
                      <div style={{ marginTop: 2 }}>
                        <span
                          style={{
                            fontSize: 11,
                            padding: '1px 7px',
                            borderRadius: 10,
                            background: LucideIcon ? '#dcfce7' : '#f3f4f6',
                            color: LucideIcon ? '#15803d' : '#9ca3af',
                            fontWeight: 500,
                          }}
                        >
                          {LucideIcon ? 'matched' : 'signoz-only'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lucide icon cell */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '12px 20px',
                      background: LucideIcon ? '#f0fdf4' : '#fafafa',
                      borderRadius: '0 10px 10px 0',
                      borderLeft: '1px solid #e5e7eb',
                    }}
                  >
                    {LucideIcon ? (
                      <>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#dcfce7',
                            borderRadius: 8,
                            flexShrink: 0,
                            color: '#15803d',
                          }}
                        >
                          <LucideIcon size={ICON_SIZE} color="#15803d" strokeWidth={2} />
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
                            color: '#15803d',
                            fontWeight: 500,
                          }}
                        >
                          {name}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: 13, color: '#d1d5db', fontStyle: 'italic' }}>
                        not in lucide-react
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
};
