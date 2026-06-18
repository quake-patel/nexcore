'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code, Smartphone, Cloud, TrendingUp, Sparkles, Globe, Lock, Settings,
  Shield, Database, Cpu, Mail, MapPin, Phone, ArrowRight, Check, ChevronDown
} from 'lucide-react';
import { type PageLayout, type SectionData, type ElementStyle } from '@/lib/builderLayouts';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code, Smartphone, Cloud, TrendingUp, Sparkles, Globe, Lock, Settings,
  Shield, Database, Cpu, Mail, MapPin, Phone
};

function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  if (!name) return <Sparkles className={className} />;
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent className={className} />;
}

function getSpacingClasses(section: SectionData) {
  const { type, paddingTop, paddingBottom, marginTop, marginBottom } = section;

  let ptClass = '';
  if (paddingTop) {
    if (paddingTop === 'none') ptClass = 'pt-0';
    else if (paddingTop === 'small') ptClass = 'pt-12';
    else if (paddingTop === 'medium') ptClass = 'pt-20 md:pt-24';
    else if (paddingTop === 'large') ptClass = 'pt-28 md:pt-36';
  }

  let pbClass = '';
  if (paddingBottom) {
    if (paddingBottom === 'none') pbClass = 'pb-0';
    else if (paddingBottom === 'small') pbClass = 'pb-12';
    else if (paddingBottom === 'medium') pbClass = 'pb-20 md:pb-24';
    else if (paddingBottom === 'large') pbClass = 'pb-28 md:pb-36';
  }

  let padClasses = '';
  if (paddingTop || paddingBottom) {
    const pt = ptClass || (type === 'hero' ? 'pt-36' : type === 'stats' ? 'pt-20' : type === 'custom' ? 'pt-16' : 'pt-24');
    const pb = pbClass || (type === 'hero' ? 'pb-20' : type === 'stats' ? 'pb-20' : type === 'custom' ? 'pb-16' : 'pb-24');
    padClasses = `${pt} ${pb}`;
  } else {
    padClasses = type === 'hero' ? 'pt-36 pb-20' : type === 'stats' ? 'py-20' : type === 'custom' ? 'py-16' : 'py-24';
  }

  let mtClass = '';
  if (marginTop) {
    if (marginTop === 'none') mtClass = 'mt-0';
    else if (marginTop === 'small') mtClass = 'mt-6 md:mt-8';
    else if (marginTop === 'medium') mtClass = 'mt-12 md:mt-16';
    else if (marginTop === 'large') mtClass = 'mt-20 md:mt-24';
  }

  let mbClass = '';
  if (marginBottom) {
    if (marginBottom === 'none') mbClass = 'mb-0';
    else if (marginBottom === 'small') mbClass = 'mb-6 md:mb-8';
    else if (marginBottom === 'medium') mbClass = 'mb-12 md:mb-16';
    else if (marginBottom === 'large') mbClass = 'mb-20 md:mb-24';
  }

  return `${padClasses} ${mtClass} ${mbClass}`.trim();
}

function getElementClasses(style?: ElementStyle, defaultClasses = '') {
  if (!style) return defaultClasses;
  const classes = [];

  if (style.fontSize) {
    if (style.fontSize === 'small') classes.push('text-sm md:text-base');
    else if (style.fontSize === 'medium') classes.push('text-base md:text-lg');
    else if (style.fontSize === 'large') classes.push('text-xl md:text-2xl');
    else if (style.fontSize === 'xlarge') classes.push('text-3xl md:text-4xl lg:text-5xl');
    else if (style.fontSize === 'xxlarge') classes.push('text-4xl md:text-5xl lg:text-6xl');
  } else {
    const sizeMatch = defaultClasses.match(/(text-\S+|clamp\S+)/g);
    if (sizeMatch) classes.push(sizeMatch.join(' '));
  }

  if (style.bold) {
    classes.push('font-bold');
  } else if (style.fontWeight) {
    if (style.fontWeight === 'light') classes.push('font-light');
    else if (style.fontWeight === 'normal') classes.push('font-normal');
    else if (style.fontWeight === 'semibold') classes.push('font-semibold');
    else if (style.fontWeight === 'bold') classes.push('font-bold');
    else if (style.fontWeight === 'extrabold') classes.push('font-extrabold');
  } else {
    const weightMatch = defaultClasses.match(/font-\S+/);
    if (weightMatch) classes.push(weightMatch[0]);
  }

  if (style.letterSpacing) {
    if (style.letterSpacing === 'tight') classes.push('tracking-tight');
    else if (style.letterSpacing === 'normal') classes.push('tracking-normal');
    else if (style.letterSpacing === 'wide') classes.push('tracking-wide');
  } else {
    const trackingMatch = defaultClasses.match(/tracking-\S+/);
    if (trackingMatch) classes.push(trackingMatch[0]);
  }

  if (style.lineHeight) {
    if (style.lineHeight === 'tight') classes.push('leading-tight');
    else if (style.lineHeight === 'normal') classes.push('leading-normal');
    else if (style.lineHeight === 'loose') classes.push('leading-loose');
  } else {
    const leadingMatch = defaultClasses.match(/leading-\S+/);
    if (leadingMatch) classes.push(leadingMatch[0]);
  }

  if (style.italic !== undefined) {
    classes.push(style.italic ? 'italic' : 'not-italic');
  } else if (defaultClasses.includes('italic')) {
    classes.push('italic');
  }

  const otherMatches = defaultClasses.split(' ').filter(c =>
    !c.startsWith('text-') &&
    !c.startsWith('font-') &&
    !c.startsWith('tracking-') &&
    !c.startsWith('leading-') &&
    c !== 'italic' && c !== 'not-italic'
  );
  classes.push(...otherMatches);

  return classes.filter(Boolean).join(' ');
}

// ── Theme resolver: maps content.theme (primary/dark/glass) to
//    Tailwind classes + inline styles, with custom backgroundColor override.
function getSectionTheme(section: SectionData, primaryColor?: string) {
  const theme = section.content.theme || 'primary';

  let bgClass = '';
  let style: React.CSSProperties = {};

  if (section.backgroundColor) {
    // Custom solid color always wins
    style.backgroundColor = section.backgroundColor;
  } else if (theme === 'dark') {
    bgClass = 'bg-navy2';
  } else if (theme === 'glass') {
    bgClass = 'bg-[#030712]/30 backdrop-blur-md';
    style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05) inset';
  } else {
    // primary — subtle radial glow from accent color
    bgClass = 'bg-navy';
    if (primaryColor) {
      style.backgroundImage = `radial-gradient(circle at 50% 50%, ${primaryColor}18, transparent 65%)`;
    }
  }

  if (section.textColor) {
    style.color = section.textColor;
  }

  return { bgClass, style };
}

interface DynamicPageRendererProps {
  layout: PageLayout;
  interactive?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (id: string) => void;
}

export default function DynamicPageRenderer({
  layout,
  interactive = false,
  selectedSectionId = null,
  onSelectSection,
}: DynamicPageRendererProps) {
  const [activeFaq, setActiveFaq] = useState<Record<string, number | null>>({});

  function toggleFaq(sectionId: string, idx: number) {
    setActiveFaq((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === idx ? null : idx,
    }));
  }

  const { sections } = layout;

  const visibleSections = sections.filter((sec) => sec.visible);
  const firstSectionIsHero = visibleSections.length > 0 && visibleSections[0].type === 'hero';

  return (
    <div
      style={{
        fontFamily: layout.theme.fontFamily === 'Sora' ? 'Sora, sans-serif' : 'Manrope, sans-serif',
      }}
      className="dynamic-page-wrap w-full bg-navy min-h-screen text-text overflow-hidden relative"
    >
      {/* Dynamic theme style injection */}
      <style jsx global>{`
        :root {
          --accent: ${layout.theme.primaryColor || '#06b6d4'};
          --accent2: ${layout.theme.accentColor || '#8b5cf6'};
        }
      `}</style>

      {/* Global Background Glows */}
      {layout.theme.bgGradient && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-30"
            style={{ background: layout.theme.primaryColor }}
          />
          <div
            className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-25"
            style={{ background: layout.theme.accentColor }}
          />
        </div>
      )}

      {/* Fixed Navbar Safety Spacer */}
      {!firstSectionIsHero && (
        <div className="w-full h-24 md:h-32 block relative z-20 pointer-events-none bg-navy" />
      )}

      {sections
        .filter((sec) => sec.visible)
        .map((section) => {
          const isSelected = selectedSectionId === section.id;
          const { content } = section;

          return (
            <div
              key={section.id}
              onClick={(e) => {
                if (interactive && onSelectSection) {
                  e.stopPropagation();
                  onSelectSection(section.id);
                }
              }}
              className={`relative z-10 transition-all ${
                interactive
                  ? 'cursor-pointer hover:ring-2 hover:ring-accent/70 hover:ring-offset-[-2px] group'
                  : ''
              } ${isSelected ? 'ring-4 ring-accent ring-offset-[-2px]' : ''}`}
            >
              {interactive && (
                <div className="absolute top-2 right-2 bg-accent text-navy text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                  {section.type} Section · Click to Edit
                </div>
              )}

              {/* SECTION RENDER ROUTER */}
              {(() => {
                switch (section.type) {

                  // ── HERO ────────────────────────────────────────
                  case 'hero': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden text-center flex flex-col items-center ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-4xl mx-auto z-10 relative flex flex-col items-center gap-5">
                          {content.tagline && (
                            <div
                              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20"
                              style={{
                                backgroundColor: section.taglineStyle?.backgroundColor,
                                borderColor: section.taglineStyle?.backgroundColor ? 'transparent' : undefined
                              }}
                            >
                              <Sparkles size={11} className="text-accent animate-pulse" style={{ color: section.taglineStyle?.color }} />
                              <span
                                className={getElementClasses(section.taglineStyle, 'text-[10px] font-bold font-sora text-accent tracking-widest uppercase')}
                                style={{ color: section.taglineStyle?.color }}
                              >
                                {content.tagline}
                              </span>
                            </div>
                          )}
                          {content.title && (
                            <h1
                              className={getElementClasses(section.titleStyle, 'text-4xl md:text-5xl lg:text-6xl font-extrabold font-sora tracking-tight leading-tight text-heading' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                              style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                            >
                              {content.title}
                            </h1>
                          )}
                          {content.description && (
                            <p
                              className={getElementClasses(section.descStyle, 'text-sm md:text-base text-muted font-light leading-relaxed max-w-xl' + (section.descStyle?.backgroundColor ? ' p-4 rounded-xl' : ''))}
                              style={{ color: section.descStyle?.color, backgroundColor: section.descStyle?.backgroundColor }}
                            >
                              {content.description}
                            </p>
                          )}
                          {content.buttons && content.buttons.length > 0 && (
                            <div className="flex flex-wrap gap-4 justify-center items-center mt-3">
                              {content.buttons.map((btn, idx) => (
                                <Link
                                  key={idx}
                                  href={btn.link || '#'}
                                  className={
                                    btn.style === 'primary'
                                      ? 'flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 transition-all'
                                      : 'flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all'
                                  }
                                >
                                  {btn.text}
                                  {btn.style === 'primary' && <ArrowRight size={13} />}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  }

                  // ── FEATURES ─────────────────────────────────────
                  case 'features': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-7xl mx-auto">
                          {(content.tagline || content.title) && (
                            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
                              {content.tagline && (
                                <span
                                  className={getElementClasses(section.taglineStyle, 'text-xs font-semibold font-sora text-accent tracking-widest uppercase' + (section.taglineStyle?.backgroundColor ? ' px-2 py-0.5 rounded' : ''))}
                                  style={{ color: section.taglineStyle?.color, backgroundColor: section.taglineStyle?.backgroundColor }}
                                >
                                  {content.tagline}
                                </span>
                              )}
                              {content.title && (
                                <h2
                                  className={getElementClasses(section.titleStyle, 'text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight mt-3' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                                  style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                                >
                                  {content.title}
                                </h2>
                              )}
                              {content.description && (
                                <p
                                  className={getElementClasses(section.descStyle, 'text-xs text-muted max-w-md font-light leading-relaxed mt-2' + (section.descStyle?.backgroundColor ? ' p-4 rounded-xl' : ''))}
                                  style={{ color: section.descStyle?.color, backgroundColor: section.descStyle?.backgroundColor }}
                                >
                                  {content.description}
                                </p>
                              )}
                            </div>
                          )}

                          {content.items && content.items.length > 0 && (
                            <div className={`grid gap-8 ${
                              section.gridColumns === '1' ? 'grid-cols-1' :
                              section.gridColumns === '2' ? 'grid-cols-1 md:grid-cols-2' :
                              section.gridColumns === '3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                              section.gridColumns === '4' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                              section.gridColumns === '6' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6' :
                              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}>
                              {content.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-8 rounded-3xl border border-border bg-card shadow-lg flex flex-col gap-4 transition-transform hover:-translate-y-1"
                                >
                                  <div className="w-10 h-10 border border-accent/25 rounded-2xl bg-accent/8 flex items-center justify-center">
                                    <DynamicIcon name={item.icon} className="w-5 h-5 text-accent" />
                                  </div>
                                  <h3 className="text-base font-bold font-sora text-heading">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-muted leading-relaxed font-light">
                                    {item.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  }

                  // ── STATS ────────────────────────────────────────
                  case 'stats': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-7xl mx-auto">
                          {(content.tagline || content.title) && (
                            <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
                              {content.tagline && (
                                <span
                                  className={getElementClasses(section.taglineStyle, 'text-xs font-semibold font-sora text-accent tracking-widest uppercase' + (section.taglineStyle?.backgroundColor ? ' px-2 py-0.5 rounded' : ''))}
                                  style={{ color: section.taglineStyle?.color, backgroundColor: section.taglineStyle?.backgroundColor }}
                                >
                                  {content.tagline}
                                </span>
                              )}
                              {content.title && (
                                <h2
                                  className={getElementClasses(section.titleStyle, 'text-2xl md:text-3xl font-extrabold font-sora text-heading tracking-tight mt-2' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                                  style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                                >
                                  {content.title}
                                </h2>
                              )}
                            </div>
                          )}

                          {content.items && content.items.length > 0 && (
                            <div className={`grid gap-6 ${
                              section.gridColumns === '1' ? 'grid-cols-1' :
                              section.gridColumns === '2' ? 'grid-cols-2' :
                              section.gridColumns === '3' ? 'grid-cols-2 lg:grid-cols-3' :
                              section.gridColumns === '4' ? 'grid-cols-2 lg:grid-cols-4' :
                              section.gridColumns === '6' ? 'grid-cols-2 lg:grid-cols-6' :
                              'grid-cols-2 lg:grid-cols-4'
                            }`}>
                              {content.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-6 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-subtle-bg/20 text-center flex flex-col items-center justify-center gap-1.5"
                                >
                                  <span className="text-3xl md:text-4xl font-extrabold font-sora text-heading">
                                    {item.value || '00'}
                                  </span>
                                  <span className="text-[10px] text-muted tracking-widest font-semibold font-sora uppercase">
                                    {item.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  }

                  // ── TESTIMONIALS ─────────────────────────────────
                  case 'testimonials': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-7xl mx-auto">
                          {(content.tagline || content.title) && (
                            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
                              {content.tagline && (
                                <span
                                  className={getElementClasses(section.taglineStyle, 'text-xs font-semibold font-sora text-accent tracking-widest uppercase' + (section.taglineStyle?.backgroundColor ? ' px-2 py-0.5 rounded' : ''))}
                                  style={{ color: section.taglineStyle?.color, backgroundColor: section.taglineStyle?.backgroundColor }}
                                >
                                  {content.tagline}
                                </span>
                              )}
                              {content.title && (
                                <h2
                                  className={getElementClasses(section.titleStyle, 'text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight mt-3' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                                  style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                                >
                                  {content.title}
                                </h2>
                              )}
                            </div>
                          )}

                          {content.items && content.items.length > 0 && (
                            <div className={`grid gap-8 ${
                              section.gridColumns === '1' ? 'grid-cols-1' :
                              section.gridColumns === '2' ? 'grid-cols-1 md:grid-cols-2' :
                              section.gridColumns === '3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                              section.gridColumns === '4' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                              'grid-cols-1 md:grid-cols-2'
                            }`}>
                              {content.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-8 rounded-3xl border border-border bg-card shadow-lg flex flex-col justify-between gap-6"
                                >
                                  <div className="flex gap-1 text-accent">
                                    {[...Array(5)].map((_, i) => (
                                      <span
                                        key={i}
                                        className="inline-block w-3.5 h-3.5 bg-accent"
                                        style={{
                                          clipPath:
                                            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <blockquote className="text-sm text-text font-light leading-relaxed italic">
                                    &ldquo;{item.description}&rdquo;
                                  </blockquote>
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center font-bold text-xs text-accent">
                                      {item.avatar || (item.author ? item.author.charAt(0) : 'U')}
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-bold text-heading">
                                        {item.author}
                                      </h4>
                                      <p className="text-[10px] text-muted mt-0.5">{item.role}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  }

                  // ── CTA ──────────────────────────────────────────
                  case 'cta': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-5xl mx-auto z-10 relative">
                          <div className="relative rounded-3xl p-10 md:p-12 border border-border/80 bg-gradient-to-br from-navy2/90 to-navy/95 shadow-2xl text-center flex flex-col items-center gap-6">
                            {content.title && (
                              <h2
                                className={getElementClasses(section.titleStyle, 'text-2xl md:text-3xl font-extrabold font-sora text-heading tracking-tight leading-tight max-w-lg' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                                style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                              >
                                {content.title}
                              </h2>
                            )}
                            {content.description && (
                              <p
                                className={getElementClasses(section.descStyle, 'text-xs text-muted max-w-md font-light leading-relaxed' + (section.descStyle?.backgroundColor ? ' p-4 rounded-xl' : ''))}
                                style={{ color: section.descStyle?.color, backgroundColor: section.descStyle?.backgroundColor }}
                              >
                                {content.description}
                              </p>
                            )}
                            {content.buttons && content.buttons.length > 0 && (
                              <div className="flex flex-wrap gap-4 justify-center items-center mt-2">
                                {content.buttons.map((btn, idx) => (
                                  <Link
                                    key={idx}
                                    href={btn.link || '#'}
                                    className={
                                      btn.style === 'primary'
                                        ? 'flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 transition-all'
                                        : 'flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all'
                                    }
                                  >
                                    {btn.text}
                                    {btn.style === 'primary' && <ArrowRight size={13} />}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    );
                  }

                  // ── FAQ ──────────────────────────────────────────
                  case 'faq': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-4xl mx-auto">
                          {(content.tagline || content.title) && (
                            <div className="text-center mb-16 flex flex-col items-center">
                              {content.tagline && (
                                <span
                                  className={getElementClasses(section.taglineStyle, 'text-xs font-semibold font-sora text-accent tracking-widest uppercase' + (section.taglineStyle?.backgroundColor ? ' px-2 py-0.5 rounded' : ''))}
                                  style={{ color: section.taglineStyle?.color, backgroundColor: section.taglineStyle?.backgroundColor }}
                                >
                                  {content.tagline}
                                </span>
                              )}
                              {content.title && (
                                <h2
                                  className={getElementClasses(section.titleStyle, 'text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight mt-3' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                                  style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                                >
                                  {content.title}
                                </h2>
                              )}
                            </div>
                          )}

                          {content.items && content.items.length > 0 && (
                            <div className="flex flex-col gap-4">
                              {content.items.map((item, idx) => {
                                const isOpen = activeFaq[section.id] === idx;
                                return (
                                  <div
                                    key={idx}
                                    className="border border-border bg-card rounded-2xl overflow-hidden transition-all"
                                  >
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFaq(section.id, idx);
                                      }}
                                      className="w-full flex items-center justify-between p-6 text-left font-sora text-sm font-semibold text-heading hover:text-accent transition-colors"
                                    >
                                      <span>{item.question}</span>
                                      <ChevronDown
                                        size={16}
                                        className={`text-accent transition-transform duration-300 ${
                                          isOpen ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </button>
                                    {isOpen && (
                                      <div className="px-6 pb-6 text-xs text-muted leading-relaxed font-light border-t border-border/50 pt-4">
                                        {item.answer}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  }

                  // ── CUSTOM HTML ──────────────────────────────────
                  case 'custom': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-4xl mx-auto z-10 relative">
                          <div
                            className="prose prose-invert max-w-none text-xs md:text-sm text-text/90 font-light leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: content.customHtml || '<p>Configure custom HTML inside the builder.</p>',
                            }}
                          />
                        </div>
                      </section>
                    );
                  }

                  // ── ADVANCED GRID ────────────────────────────────
                  case 'grid': {
                    const { bgClass, style } = getSectionTheme(section, layout.theme.primaryColor);
                    return (
                      <section
                        className={`relative px-6 md:px-12 overflow-hidden ${bgClass} ${getSpacingClasses(section)}`.trim()}
                        style={style}
                      >
                        <div className="max-w-7xl mx-auto">
                          {(content.tagline || content.title) && (
                            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
                              {content.tagline && (
                                <span
                                  className={getElementClasses(section.taglineStyle, 'text-xs font-semibold font-sora text-accent tracking-widest uppercase' + (section.taglineStyle?.backgroundColor ? ' px-2 py-0.5 rounded' : ''))}
                                  style={{ color: section.taglineStyle?.color, backgroundColor: section.taglineStyle?.backgroundColor }}
                                >
                                  {content.tagline}
                                </span>
                              )}
                              {content.title && (
                                <h2
                                  className={getElementClasses(section.titleStyle, 'text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight mt-3' + (section.titleStyle?.backgroundColor ? ' px-4 py-2 rounded-xl inline-block' : ''))}
                                  style={{ color: section.titleStyle?.color, backgroundColor: section.titleStyle?.backgroundColor }}
                                >
                                  {content.title}
                                </h2>
                              )}
                              {content.description && (
                                <p
                                  className={getElementClasses(section.descStyle, 'text-xs text-muted max-w-md font-light leading-relaxed mt-2' + (section.descStyle?.backgroundColor ? ' p-4 rounded-xl' : ''))}
                                  style={{ color: section.descStyle?.color, backgroundColor: section.descStyle?.backgroundColor }}
                                >
                                  {content.description}
                                </p>
                              )}
                            </div>
                          )}

                          {content.rows && content.rows.length > 0 && (
                            <div className="flex flex-col gap-8 w-full">
                              {content.rows.map((row, rIdx) => {
                                const hasCustomWidths = row.columns.some(col => col.width);

                                return (
                                  <div
                                    key={row.id || rIdx}
                                    className={
                                      hasCustomWidths
                                        ? 'flex flex-wrap gap-6 w-full'
                                        : (() => {
                                            const colCount = row.columns.length;
                                            let colsClass = 'grid-cols-1';
                                            if (colCount === 2) colsClass = 'grid-cols-1 md:grid-cols-2';
                                            else if (colCount === 3) colsClass = 'grid-cols-1 md:grid-cols-3';
                                            else if (colCount === 4) colsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
                                            else if (colCount >= 5) colsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
                                            return `grid ${colsClass} gap-6 w-full`;
                                          })()
                                    }
                                  >
                                    {row.columns.map((col, cIdx) => {
                                      let widthClass = '';
                                      if (hasCustomWidths) {
                                        const w = col.width || 'full';
                                        if (w === 'full') widthClass = 'w-full';
                                        else if (w === '1/2') widthClass = 'w-full md:w-[calc(50%-12px)]';
                                        else if (w === '1/3') widthClass = 'w-full md:w-[calc(33.333%-16px)]';
                                        else if (w === '2/3') widthClass = 'w-full md:w-[calc(66.666%-8px)]';
                                        else if (w === '1/4') widthClass = 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]';
                                      }

                                      return (
                                        <div
                                          key={cIdx}
                                          className={`p-8 rounded-3xl border border-border bg-card shadow-lg flex flex-col gap-4 transition-transform hover:-translate-y-1 ${widthClass}`.trim()}
                                          style={{ backgroundColor: col.backgroundColor, color: col.color }}
                                        >
                                          {col.icon && (
                                            <div className="w-10 h-10 border border-accent/25 rounded-2xl bg-accent/8 flex items-center justify-center">
                                              <DynamicIcon name={col.icon} className="w-5 h-5 text-accent" />
                                            </div>
                                          )}
                                          {col.title && (
                                            <h3
                                              className={getElementClasses(col.titleStyle, 'text-base font-bold font-sora text-heading')}
                                              style={{ color: col.titleStyle?.color }}
                                            >
                                              {col.title}
                                            </h3>
                                          )}
                                          {col.description && (
                                            <p
                                              className={getElementClasses(col.descStyle, 'text-xs text-muted leading-relaxed font-light')}
                                              style={{ color: col.descStyle?.color }}
                                            >
                                              {col.description}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  }

                  default:
                    return (
                      <div className="p-8 text-center bg-card border border-dashed border-border text-xs text-muted">
                        Unrecognized section type: {section.type}
                      </div>
                    );
                }
              })()}
            </div>
          );
        })}
    </div>
  );
}
