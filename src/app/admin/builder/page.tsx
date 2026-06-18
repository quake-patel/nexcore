'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Eye, EyeOff, ArrowUp, ArrowDown, Plus, Trash2, Copy, ChevronLeft,
  Save, RotateCcw, Download, Upload, Smartphone, Tablet, Laptop,
  Sparkles, Code, FileText, LayoutGrid, MessageSquare, DollarSign,
  Layers, Settings, Heading, Grid, CheckCircle, HelpCircle, Edit
} from 'lucide-react';
import {
  getPageLayout, savePageLayout, resetPageLayout, getAllCustomLayouts,
  isPageCustomized, DEFAULT_LAYOUTS, type PageLayout, type SectionData, type SectionItem
} from '@/lib/builderLayouts';
import { savePageMetadata, getPagesMetadata } from '@/lib/localPages';
import DynamicPageRenderer from '@/components/DynamicPageRenderer';

const PAGES = [
  { key: 'home', name: 'Home Page' },
  { key: 'content-writing-agency', name: 'Content Writing Agency' },
  { key: 'content-marketing-agency', name: 'Content Marketing Agency' }
];

const THEME_PRESETS = [
  { name: 'NexCore Cyan (Default)', primary: '#06b6d4', accent: '#8b5cf6' },
  { name: 'Emerald Tech', primary: '#10b981', accent: '#06b6d4' },
  { name: 'Solar Amber', primary: '#f59e0b', accent: '#ef4444' },
  { name: 'Orchid Purple', primary: '#d946ef', accent: '#3b82f6' },
  { name: 'Cyberpunk Red', primary: '#f43f5e', accent: '#fbbf24' }
];

const GRID_PRESETS = [
  {
    name: '1 Column',
    cols: [
      { width: 'full', title: 'Column A', description: 'Configure text content, text colors, and backgrounds.', icon: 'Code' }
    ]
  },
  {
    name: '2 Columns (50/50)',
    cols: [
      { width: '1/2', title: 'Column A', description: 'Left half grid block.', icon: 'Code' },
      { width: '1/2', title: 'Column B', description: 'Right half grid block.', icon: 'Sparkles' }
    ]
  },
  {
    name: '3 Columns (33/33/33)',
    cols: [
      { width: '1/3', title: 'Column A', description: 'First column content.', icon: 'Code' },
      { width: '1/3', title: 'Column B', description: 'Second column content.', icon: 'Sparkles' },
      { width: '1/3', title: 'Column C', description: 'Third column content.', icon: 'Smartphone' }
    ]
  },
  {
    name: '4 Columns (25/25/25/25)',
    cols: [
      { width: '1/4', title: 'Col A', description: 'Card details.', icon: 'Code' },
      { width: '1/4', title: 'Col B', description: 'Card details.', icon: 'Sparkles' },
      { width: '1/4', title: 'Col C', description: 'Card details.', icon: 'Smartphone' },
      { width: '1/4', title: 'Col D', description: 'Card details.', icon: 'Settings' }
    ]
  },
  {
    name: '1/3 + 2/3 Split',
    cols: [
      { width: '1/3', title: 'Sidebar Col', description: 'Left narrow segment.', icon: 'Code' },
      { width: '2/3', title: 'Main Body Col', description: 'Right wider segment, ideal for showcasing main product components.', icon: 'Sparkles' }
    ]
  },
  {
    name: '2/3 + 1/3 Split',
    cols: [
      { width: '2/3', title: 'Main Body Col', description: 'Left wider segment, ideal for showcasing main product components.', icon: 'Sparkles' },
      { width: '1/3', title: 'Sidebar Col', description: 'Right narrow segment.', icon: 'Code' }
    ]
  }
] as const;

// Column structure presets for the visual picker
const COLUMN_LAYOUTS = [
  {
    label: '1 Column',
    cols: [{ width: 'full' as const }],
    visual: [100]
  },
  {
    label: '2 Equal',
    cols: [{ width: '1/2' as const }, { width: '1/2' as const }],
    visual: [50, 50]
  },
  {
    label: '3 Equal',
    cols: [{ width: '1/3' as const }, { width: '1/3' as const }, { width: '1/3' as const }],
    visual: [33, 33, 33]
  },
  {
    label: '4 Equal',
    cols: [
      { width: '1/4' as const }, { width: '1/4' as const },
      { width: '1/4' as const }, { width: '1/4' as const }
    ],
    visual: [25, 25, 25, 25]
  },
  {
    label: '1/3 + 2/3',
    cols: [{ width: '1/3' as const }, { width: '2/3' as const }],
    visual: [33, 67]
  },
  {
    label: '2/3 + 1/3',
    cols: [{ width: '2/3' as const }, { width: '1/3' as const }],
    visual: [67, 33]
  },
  {
    label: '1/4 + 3/4',
    cols: [{ width: '1/4' as const }, { width: '1/3' as const }, { width: '1/3' as const }, { width: '1/4' as const }],
    visual: [25, 33, 33, 25]
  },
  {
    label: '6 Micro Cols',
    cols: [
      { width: '1/4' as const }, { width: '1/4' as const }, { width: '1/4' as const },
      { width: '1/4' as const }, { width: '1/4' as const }, { width: '1/4' as const }
    ],
    visual: [17, 17, 17, 17, 17, 17]
  },
];

export default function WebsiteBuilder() {
  const [activePage, setActivePage] = useState<string>('home');
  const [layout, setLayout] = useState<PageLayout | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'sections' | 'theme' | 'seo'>('sections');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  
  // Load pages dynamically (predefined ones + any custom pages stored in localStorage)
  const [pagesList, setPagesList] = useState<Array<{ key: string; name: string }>>([
    { key: 'home', name: 'Home Page' },
    { key: 'content-writing-agency', name: 'Content Writing Agency' },
    { key: 'content-marketing-agency', name: 'Content Marketing Agency' }
  ]);

  // SEO states
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  
  // Show section addition panel
  const [showAddSection, setShowAddSection] = useState(false);

  // Toast alert status
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load dynamically created custom pages on mount / activePage changes
  useEffect(() => {
    const custom = getAllCustomLayouts();
    const list = [
      { key: 'home', name: 'Home Page' },
      { key: 'content-writing-agency', name: 'Content Writing Agency' },
      { key: 'content-marketing-agency', name: 'Content Marketing Agency' }
    ];
    Object.keys(custom).forEach(key => {
      if (!list.some(p => p.key === key)) {
        list.push({ key, name: `Custom: /${key}` });
      }
    });
    setPagesList(list);
  }, [activePage]);

  function handleAddCustomPage() {
    const rawKey = prompt('Enter a URL path key for your new custom page (e.g. Careers, Team, Portfolio):');
    if (!rawKey) return;
    
    // Clean and validate the key
    const cleanedKey = rawKey.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    
    if (!cleanedKey) {
      alert('Invalid page key name.');
      return;
    }
    
    // Check if page already exists
    if (pagesList.some(p => p.key === cleanedKey)) {
      alert(`The page route /${cleanedKey} already exists.`);
      return;
    }
    
    // Initialize a new default page layout matching the styling of home page
    const homeLayout = getPageLayout('home');
    const newLayout: PageLayout = {
      pageKey: cleanedKey,
      theme: { ...homeLayout.theme },
      sections: [
        {
          id: `hero-${Date.now()}`,
          type: 'hero',
          visible: true,
          content: {
            tagline: `Welcome to /${cleanedKey}`,
            title: `Custom ${rawKey} Page`,
            description: 'This is a brand new page designed visually inside the CurationChamp Live Builder.',
            buttons: [
              { text: 'Get Free Sample', link: '/#lead', style: 'primary' },
              { text: 'Back Home', link: '/', style: 'secondary' }
            ]
          }
        }
      ]
    };
    
    // Save to local storage
    savePageLayout(cleanedKey, newLayout);
    savePageMetadata(cleanedKey, { 
      title: `${rawKey} — CurationChamp Custom Page`, 
      description: `Explore the dynamic ${rawKey} page created in the CurationChamp visual website builder.` 
    });
    
    // Switch active page
    setActivePage(cleanedKey);
    triggerToast(`Custom page /${cleanedKey} created successfully!`, 'success');
  }

  // Load layout and SEO metadata when active page changes
  useEffect(() => {
    const loaded = getPageLayout(activePage);
    setLayout(loaded);
    setSelectedSectionId(null);

    // Load SEO
    const allSeo = getPagesMetadata();
    if (allSeo[activePage]) {
      setSeoTitle(allSeo[activePage].title || '');
      setSeoDescription(allSeo[activePage].description || '');
    } else {
      setSeoTitle('');
      setSeoDescription('');
    }
  }, [activePage]);

  function triggerToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  if (!layout) return null;

  const activeSection = layout.sections.find(s => s.id === selectedSectionId) || null;

  function handleSave() {
    if (!layout) return;
    savePageLayout(activePage, layout);
    savePageMetadata(activePage, { title: seoTitle, description: seoDescription });
    triggerToast('Page layout and SEO settings published successfully!', 'success');
  }

  function handleReset() {
    if (confirm(`Are you sure you want to reset the ${activePage} layout to the original code version? All visual custom changes will be deleted.`)) {
      resetPageLayout(activePage);
      const loaded = getPageLayout(activePage);
      setLayout(loaded);
      setSelectedSectionId(null);
      triggerToast('Reset to code defaults successfully!', 'info');
    }
  }

  function handleWipePage() {
    if (confirm(`Are you sure you want to clear this page and start from scratch? All sections will be deleted.`)) {
      if (!layout) return;
      setLayout({
        ...layout,
        sections: []
      });
      setSelectedSectionId(null);
      triggerToast('Page layouts cleared! Start building from scratch.', 'info');
    }
  }

  function handleAddGridStructure(cols: ReadonlyArray<{ readonly width: 'full' | '1/2' | '1/3' | '2/3' | '1/4'; readonly title: string; readonly description: string; readonly icon: string }>) {
    if (!layout) return;
    const newId = `grid-${Date.now()}`;
    const newSec: SectionData = {
      id: newId,
      type: 'grid',
      visible: true,
      content: {
        title: 'Advanced Grid Layout',
        tagline: 'DYNAMIC STRUCTURE',
        description: 'Add custom rows and columns to organize your text and features.',
        rows: [
          {
            id: `row-${Date.now()}`,
            columns: cols.map((c) => ({
              title: c.title,
              description: c.description,
              icon: c.icon,
              width: c.width
            }))
          }
        ]
      }
    };
    setLayout({
      ...layout,
      sections: [...layout.sections, newSec]
    });
    setSelectedSectionId(newId);
    triggerToast('New grid structure added!', 'success');
  }

  function handleAddColumnLayout(colDef: typeof COLUMN_LAYOUTS[number]) {
    if (!layout) return;
    const newId = `grid-${Date.now()}`;
    const ICON_POOL = ['Code', 'Sparkles', 'Cloud', 'TrendingUp', 'Globe', 'Shield'];
    const WIDTH_NAMES: Record<string, string> = {
      'full': 'Full Column', '1/2': 'Half Column', '1/3': 'One Third',
      '2/3': 'Two Thirds', '1/4': 'Quarter Column'
    };
    const newSec: SectionData = {
      id: newId,
      type: 'grid',
      visible: true,
      content: {
        title: `${colDef.label} Layout`,
        tagline: 'COLUMNS',
        description: 'Customize each column with your content, icons and colors.',
        rows: [
          {
            id: `row-${Date.now()}`,
            columns: colDef.cols.map((c, i) => ({
              title: `${WIDTH_NAMES[c.width] || 'Column'} ${i + 1}`,
              description: 'Add your content here — headlines, copy, stats, or feature points.',
              icon: ICON_POOL[i % ICON_POOL.length],
              width: c.width
            }))
          }
        ]
      }
    };
    setLayout({ ...layout, sections: [...layout.sections, newSec] });
    setSelectedSectionId(newId);
    setShowColumnPicker(false);
    setShowAddSection(false);
    triggerToast(`${colDef.label} column layout added!`, 'success');
  }

  function moveSection(index: number, direction: 'up' | 'down') {
    if (!layout) return;
    const newSections = [...layout.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setLayout({
      ...layout,
      sections: newSections
    });
    triggerToast('Section order re-arranged!', 'info');
  }

  function toggleVisibility(id: string) {
    if (!layout) return;
    setLayout({
      ...layout,
      sections: layout.sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s)
    });
  }

  function duplicateSection(section: SectionData) {
    if (!layout) return;
    const newId = `${section.type}-${Date.now()}`;
    const clone: SectionData = JSON.parse(JSON.stringify(section));
    clone.id = newId;
    clone.content.title = clone.content.title ? `${clone.content.title} (Copy)` : '';

    const index = layout.sections.findIndex(s => s.id === section.id);
    const newSections = [...layout.sections];
    newSections.splice(index + 1, 0, clone);

    setLayout({
      ...layout,
      sections: newSections
    });
    setSelectedSectionId(newId);
    triggerToast('Section duplicated!', 'success');
  }

  function deleteSection(id: string) {
    if (!layout) return;
    if (confirm('Are you sure you want to delete this section?')) {
      setLayout({
        ...layout,
        sections: layout.sections.filter(s => s.id !== id)
      });
      if (selectedSectionId === id) {
        setSelectedSectionId(null);
      }
      triggerToast('Section deleted!', 'info');
    }
  }

  function addSection(type: SectionData['type']) {
    if (!layout) return;
    const newId = `${type}-${Date.now()}`;
    let newSec: SectionData = {
      id: newId,
      type,
      visible: true,
      content: {
        title: `Customized ${type.toUpperCase()} Section`,
        tagline: 'NEW SECTION TAG',
        description: 'Edit this description to display premium custom copywriting on your page.',
        theme: 'primary'
      }
    };

    if (type === 'features') {
      newSec.content.items = [
        { title: 'Feature Item A', description: 'Advanced digital systems designed for lightning performance.', icon: 'Code' },
        { title: 'Feature Item B', description: 'Cross-platform solutions vetted for high user conversions.', icon: 'Smartphone' }
      ];
    } else if (type === 'stats') {
      newSec.content.items = [
        { value: '10x', label: 'Performance Speed' },
        { value: '99.9%', label: 'Uptime Vetted' }
      ];
    } else if (type === 'testimonials') {
      newSec.content.items = [
        { author: 'Jane Miller', role: 'COO, HealthTech', description: 'NexCore provided outstanding developer engineering.', avatar: 'JM' }
      ];
    } else if (type === 'cta') {
      newSec.content.buttons = [
        { text: 'Get Started Now', link: '/contact', style: 'primary' }
      ];
    } else if (type === 'faq') {
      newSec.content.items = [
        { question: 'What technologies do you use?', answer: 'We specialize in Next.js, React, Tailwind, AWS cloud systems, and performance conversions.' }
      ];
    } else if (type === 'custom') {
      newSec.content.customHtml = `
        <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); padding: 3rem; border-radius: 20px; text-align: center;">
          <h2 style="color: #fff; font-family: Sora, sans-serif; margin-bottom: 1rem; font-size: 1.8rem;">Custom Markdown Area</h2>
          <p style="color: var(--muted); margin-bottom: 2rem;">Write arbitrary custom HTML blocks easily inside the builder.</p>
          <a href="/contact" style="background: var(--accent); color: var(--navy); padding: 0.6rem 1.5rem; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 0.8rem;">Custom Link Button</a>
        </div>
      `;
    } else if (type === 'grid') {
      newSec.content.title = 'Advanced Grid Layout';
      newSec.content.tagline = 'DYNAMIC STRUCTURE';
      newSec.content.description = 'Add custom rows and columns to organize your text and features.';
      newSec.content.rows = [
        {
          id: `row-${Date.now()}`,
          columns: [
            { title: 'Column A', description: 'Configure text content, text colors, and backgrounds.', icon: 'Code' },
            { title: 'Column B', description: 'Add as many columns and rows as your structure needs.', icon: 'Sparkles' }
          ]
        }
      ];
    }

    setLayout({
      ...layout,
      sections: [...layout.sections, newSec]
    });
    setSelectedSectionId(newId);
    setShowAddSection(false);
    triggerToast('New section added to the bottom of the page!', 'success');
  }

  function handleExport() {
    if (!layout) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ layout, seo: { title: seoTitle, description: seoDescription } }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nexcore_${activePage}_layout.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('JSON schema exported!', 'success');
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.layout && parsed.layout.sections) {
          setLayout(parsed.layout);
          if (parsed.seo) {
            setSeoTitle(parsed.seo.title || '');
            setSeoDescription(parsed.seo.description || '');
          }
          triggerToast('Layout configuration imported successfully!', 'success');
        } else {
          alert('Invalid layout schema file structure.');
        }
      } catch {
        alert('Error parsing uploaded JSON schema.');
      }
    };
    reader.readAsText(file);
  }

  function updateSectionContent(field: string, value: any) {
    if (!layout || !selectedSectionId) return;
    setLayout({
      ...layout,
      sections: layout.sections.map(s => {
        if (s.id === selectedSectionId) {
          return {
            ...s,
            content: {
              ...s.content,
              [field]: value
            }
          };
        }
        return s;
      })
    });
  }

  function updateSectionProperty(field: string, value: any) {
    if (!layout || !selectedSectionId) return;
    setLayout({
      ...layout,
      sections: layout.sections.map(s => {
        if (s.id === selectedSectionId) {
          return {
            ...s,
            [field]: value
          };
        }
        return s;
      })
    });
  }

  function updateElementStyle(styleKey: 'titleStyle' | 'descStyle' | 'taglineStyle', field: string, value: any) {
    if (!layout || !selectedSectionId) return;
    setLayout({
      ...layout,
      sections: layout.sections.map(s => {
        if (s.id === selectedSectionId) {
          const currentStyle = s[styleKey] || {};
          return {
            ...s,
            [styleKey]: {
              ...currentStyle,
              [field]: value
            }
          };
        }
        return s;
      })
    });
  }

  function updateListItem(itemIndex: number, field: string, value: any) {
    if (!layout || !activeSection) return;
    const items = [...(activeSection.content.items || [])];
    items[itemIndex] = {
      ...items[itemIndex],
      [field]: value
    };
    updateSectionContent('items', items);
  }

  function addListItem() {
    if (!layout || !activeSection) return;
    const items = [...(activeSection.content.items || [])];
    const newItem: SectionItem = {};

    if (activeSection.type === 'features') {
      newItem.title = 'New Feature Title';
      newItem.description = 'Advanced description outlining capabilities and conversions.';
      newItem.icon = 'Sparkles';
    } else if (activeSection.type === 'stats') {
      newItem.value = '99%';
      newItem.label = 'Custom Metric';
    } else if (activeSection.type === 'testimonials') {
      newItem.author = 'Client Partner';
      newItem.role = 'Product Lead';
      newItem.description = 'Amazing digital solutions developed efficiently.';
      newItem.avatar = 'C';
    } else if (activeSection.type === 'faq') {
      newItem.question = 'New Common Question?';
      newItem.answer = 'Write a comprehensive and clear dynamic answer here.';
    }

    items.push(newItem);
    updateSectionContent('items', items);
  }

  function deleteListItem(index: number) {
    if (!layout || !activeSection) return;
    const items = (activeSection.content.items || []).filter((_, idx) => idx !== index);
    updateSectionContent('items', items);
  }

  function updateButtonItem(btnIndex: number, field: string, value: any) {
    if (!layout || !activeSection) return;
    const buttons = [...(activeSection.content.buttons || [])];
    buttons[btnIndex] = {
      ...buttons[btnIndex],
      [field]: value
    };
    updateSectionContent('buttons', buttons);
  }

  function addButtonItem() {
    if (!layout || !activeSection) return;
    const buttons = [...(activeSection.content.buttons || [])];
    buttons.push({ text: 'Custom Action', link: '/services', style: 'secondary' });
    updateSectionContent('buttons', buttons);
  }

  function deleteButtonItem(index: number) {
    if (!layout || !activeSection) return;
    const buttons = (activeSection.content.buttons || []).filter((_, idx) => idx !== index);
    updateSectionContent('buttons', buttons);
  }

  return (
    <div className="admin-builder-shell">
      {/* ── Visual Premium CSS Styles Overrides injection ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-builder-shell {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 100vw !important;
          height: calc(100vh - 64px);
          margin: 0 !important;
          padding: 1.5rem 2rem !important;
          background: #030712;
          overflow: hidden;
          box-sizing: border-box;
        }
        
        /* Premium custom thin scrollbars */
        .scroll-custom::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scroll-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-custom::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }
        .scroll-custom::-webkit-scrollbar-thumb:hover {
          background: var(--accent, #06b6d4);
        }
        
        /* Spacious and polished inputs/fields */
        .admin-field {
          margin-bottom: 1.5rem !important;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .admin-label {
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          color: #9ca3af !important;
          letter-spacing: 0.09em !important;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin-input, .admin-textarea {
          background: rgba(3, 7, 18, 0.45) !important;
          border: 1px solid rgba(6, 182, 212, 0.12) !important;
          border-radius: 12px !important;
          padding: 0.8rem 1rem !important;
          font-size: 0.82rem !important;
          color: #fff !important;
          transition: all 0.25s ease-in-out !important;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        .admin-input:focus, .admin-textarea:focus {
          border-color: var(--accent, #06b6d4) !important;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15) !important;
          background: rgba(3, 7, 18, 0.6) !important;
        }
        select.admin-input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2306b6d4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 1rem center !important;
          background-size: 1rem !important;
          padding-right: 2.5rem !important;
        }
        select.admin-input option {
          background: #030712 !important;
          color: #fff !important;
          padding: 0.5rem !important;
        }
      `}} />
      
      {/* ── Visual Custom Alerts ── */}
      {toast && (
        <div
          className={`fixed top-20 right-8 z-[999] flex items-center gap-2 px-5 py-3 rounded-xl border shadow-2xl transition-all duration-300 transform translate-y-0`}
          style={{
            background: toast.type === 'success' ? 'rgba(16,185,129,0.15)' : toast.type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)',
            borderColor: toast.type === 'success' ? 'rgba(16,185,129,0.3)' : toast.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)',
            color: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6',
          }}
        >
          <CheckCircle size={16} className="animate-bounce" />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* ── Builder Header Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-5 mb-5 w-full">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold font-sora text-heading flex items-center gap-2">
              <Layers size={20} className="text-accent" />
              CurationChamp Live Website Builder
            </h1>
            {isPageCustomized(activePage) && (
              <span className="text-[10px] bg-accent/15 border border-accent/30 text-accent font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Customized Live
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-1.5 font-light">
            Configure dynamic layouts, customize section copy, adjust themes, and preview pages instantly.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Page Dropdown */}
          <div className="flex items-center gap-1.5">
            <select
              className="admin-input cursor-pointer text-xs"
              style={{ width: '190px', minWidth: 'unset', padding: '0.6rem 1.2rem', borderRadius: '50px' }}
              value={activePage}
              onChange={(e) => setActivePage(e.target.value)}
            >
              {pagesList.map(p => (
                <option key={p.key} value={p.key}>{p.name}</option>
              ))}
            </select>
            <button
              onClick={handleAddCustomPage}
              className="admin-action-btn flex items-center justify-center p-2.5 hover:bg-white/10 text-accent border border-accent/20"
              title="Add New Custom Page"
              style={{ borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Import/Export */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="admin-action-btn flex items-center gap-1.5 text-xs hover:bg-white/10"
            title="Import layout from JSON file"
            style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer' }}
          >
            <Upload size={13} />
            Import
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            style={{ display: 'none' }}
          />

          <button
            onClick={handleExport}
            className="admin-action-btn flex items-center gap-1.5 text-xs hover:bg-white/10"
            title="Export layout schema to JSON"
            style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer' }}
          >
            <Download size={13} />
            Export
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="admin-action-btn danger flex items-center gap-1.5 text-xs"
            title="Reset this page layout back to SSR code default"
            style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer' }}
          >
            <RotateCcw size={13} />
            Reset Defaults
          </button>

          {/* Wipe Page (Start from Scratch) */}
          <button
            onClick={handleWipePage}
            className="admin-action-btn flex items-center gap-1.5 text-xs hover:bg-red-950/20 text-red-400 border border-red-900/40"
            title="Delete all sections and start designing from scratch"
            style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer' }}
          >
            <Trash2 size={13} />
            Wipe Page
          </button>

          {/* Save / Publish */}
          <button
            onClick={handleSave}
            className="btn-primary flex items-center gap-1.5 text-xs cursor-pointer shadow-lg shadow-accent/20"
            style={{ border: 'none', padding: '0.65rem 1.5rem', borderRadius: '50px' }}
          >
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </div>

      {/* ── Main Split Canvas ── */}
      <div className="flex-1 flex gap-5 overflow-hidden relative w-full mb-2">
        
        {/* ── Left Editor Sidebar Panel (440px) ── */}
        <div className="w-[440px] bg-[#0b111e]/80 border border-border/80 rounded-2xl flex flex-col overflow-hidden h-full z-10 shadow-2xl backdrop-blur-xl">
          
          {/* Editor Header Tab Bar */}
          <div className="flex border-b border-border bg-navy/60 p-1.5 gap-1.5">
            {[
              { id: 'sections', label: 'Layout Sections', icon: Layers },
              { id: 'theme', label: 'Theme Styling', icon: Sparkles },
              { id: 'seo', label: 'Meta SEO', icon: FileText }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeSidebarTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSidebarTab(tab.id as any);
                    if (tab.id !== 'sections') {
                      setSelectedSectionId(null);
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-1 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-navy shadow-lg font-bold scale-[1.02]'
                      : 'text-muted hover:text-text hover:bg-white/5'
                  }`}
                >
                  <TabIcon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 scroll-custom">
            
            {/* 1. SECTIONS TAB */}
            {activeSidebarTab === 'sections' && (
              <>
                {/* Visual Section Details editor (if a section is active) */}
                {activeSection ? (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-border pb-3.5">
                      <button
                        onClick={() => setSelectedSectionId(null)}
                        className="text-accent text-xs font-bold flex items-center gap-1 hover:opacity-85 cursor-pointer bg-transparent border-none"
                      >
                        <ChevronLeft size={16} /> Back to List
                      </button>
                      <span className="text-[10px] font-bold font-sora text-accent uppercase tracking-widest bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/20">
                        {activeSection.type} editor
                      </span>
                    </div>

                    <h3 className="text-sm font-bold font-sora text-heading flex items-center gap-1.5">
                      <Edit size={16} className="text-accent" />
                      Configure Copywriting
                    </h3>

                    {/* Section Option Styles */}
                    <div className="admin-field">
                      <label className="admin-label">Background Card Theme</label>
                      <select
                        className="admin-input text-xs"
                        value={activeSection.content.theme || 'primary'}
                        onChange={(e) => updateSectionContent('theme', e.target.value)}
                      >
                        <option value="primary">Accent Radial Glow (Deep Dark)</option>
                        <option value="dark">Rich Slate Solid (Navy2)</option>
                        <option value="glass">Translucent Glassmorphism</option>
                      </select>
                    </div>

                    {/* Section Spacing Controls */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex flex-col gap-1">
                        <label className="admin-label text-[10px]">Padding Top</label>
                        <select
                          className="admin-input text-xs"
                          value={activeSection.paddingTop || 'medium'}
                          onChange={(e) => updateSectionProperty('paddingTop', e.target.value)}
                        >
                          <option value="none">None (0px)</option>
                          <option value="small">Small (48px)</option>
                          <option value="medium">Medium (80-96px)</option>
                          <option value="large">Large (112-144px)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="admin-label text-[10px]">Padding Bottom</label>
                        <select
                          className="admin-input text-xs"
                          value={activeSection.paddingBottom || 'medium'}
                          onChange={(e) => updateSectionProperty('paddingBottom', e.target.value)}
                        >
                          <option value="none">None (0px)</option>
                          <option value="small">Small (48px)</option>
                          <option value="medium">Medium (80-96px)</option>
                          <option value="large">Large (112-144px)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex flex-col gap-1">
                        <label className="admin-label text-[10px]">Margin Top</label>
                        <select
                          className="admin-input text-xs"
                          value={activeSection.marginTop || 'none'}
                          onChange={(e) => updateSectionProperty('marginTop', e.target.value)}
                        >
                          <option value="none">None (0px)</option>
                          <option value="small">Small (24-32px)</option>
                          <option value="medium">Medium (48-64px)</option>
                          <option value="large">Large (80-96px)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="admin-label text-[10px]">Margin Bottom</label>
                        <select
                          className="admin-input text-xs"
                          value={activeSection.marginBottom || 'none'}
                          onChange={(e) => updateSectionProperty('marginBottom', e.target.value)}
                        >
                          <option value="none">None (0px)</option>
                          <option value="small">Small (24-32px)</option>
                          <option value="medium">Medium (48-64px)</option>
                          <option value="large">Large (80-96px)</option>
                        </select>
                      </div>
                    </div>

                    {/* Section Grid Columns Customization */}
                    {(activeSection.type === 'features' || activeSection.type === 'stats' || activeSection.type === 'testimonials') && (
                      <div className="admin-field">
                        <label className="admin-label">Grid Layout Columns</label>
                        <select
                          className="admin-input text-xs"
                          value={activeSection.gridColumns || ''}
                          onChange={(e) => updateSectionProperty('gridColumns', e.target.value || undefined)}
                        >
                          <option value="">Default Columns Layout</option>
                          <option value="1">1 Column (List Layout)</option>
                          <option value="2">2 Columns Grid</option>
                          <option value="3">3 Columns Grid</option>
                          <option value="4">4 Columns Grid</option>
                          {activeSection.type !== 'testimonials' && <option value="6">6 Columns Grid</option>}
                        </select>
                      </div>
                    )}

                    {/* Dynamic Text Copy Inputs */}
                    {activeSection.content.hasOwnProperty('tagline') && (
                      <div className="admin-field">
                        <label className="admin-label">Section Tagline</label>
                        <input
                          type="text"
                          className="admin-input text-xs"
                          value={activeSection.content.tagline || ''}
                          onChange={(e) => updateSectionContent('tagline', e.target.value)}
                          placeholder="e.g. CORE CAPABILITIES"
                        />
                      </div>
                    )}

                    {activeSection.content.hasOwnProperty('title') && (
                      <div className="admin-field">
                        <label className="admin-label">Headline Title</label>
                        <input
                          type="text"
                          className="admin-input text-xs font-bold"
                          value={activeSection.content.title || ''}
                          onChange={(e) => updateSectionContent('title', e.target.value)}
                          placeholder="e.g. Enterprise Solutions Built to Scale"
                        />
                      </div>
                    )}

                    {activeSection.content.hasOwnProperty('description') && (
                      <div className="admin-field">
                        <label className="admin-label">Description / Subtitle</label>
                        <textarea
                          rows={4}
                          className="admin-textarea text-xs font-light leading-relaxed"
                          value={activeSection.content.description || ''}
                          onChange={(e) => updateSectionContent('description', e.target.value)}
                          placeholder="Copy details to engage readers..."
                        />
                      </div>
                    )}

                    {/* Colors & Palette Customization */}
                    <div className="border-t border-border/80 pt-5 mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-accent" />
                        Palette Colors
                      </h4>
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="admin-label text-[10px]">Background</label>
                          <div className="flex gap-1.5 items-center">
                            <input
                              type="color"
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                              value={activeSection.backgroundColor || '#030712'}
                              onChange={(e) => updateSectionProperty('backgroundColor', e.target.value)}
                            />
                            <input
                              type="text"
                              className="admin-input text-[11px] font-mono"
                              style={{ padding: '0.4rem 0.6rem' }}
                              value={activeSection.backgroundColor || ''}
                              onChange={(e) => updateSectionProperty('backgroundColor', e.target.value)}
                              placeholder="e.g. #030712"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="admin-label text-[10px]">General Text</label>
                          <div className="flex gap-1.5 items-center">
                            <input
                              type="color"
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                              value={activeSection.textColor || '#f3f4f6'}
                              onChange={(e) => updateSectionProperty('textColor', e.target.value)}
                            />
                            <input
                              type="text"
                              className="admin-input text-[11px] font-mono"
                              style={{ padding: '0.4rem 0.6rem' }}
                              value={activeSection.textColor || ''}
                              onChange={(e) => updateSectionProperty('textColor', e.target.value)}
                              placeholder="e.g. #f3f4f6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tagline Typography Style */}
                    {activeSection.content.hasOwnProperty('tagline') && (
                      <div className="border-t border-border/80 pt-5 mt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center gap-1.5">
                          <Sparkles size={13} className="text-accent" />
                          Tagline Typography
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Text Color</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                                value={activeSection.taglineStyle?.color || '#06b6d4'}
                                onChange={(e) => updateElementStyle('taglineStyle', 'color', e.target.value)}
                              />
                              <input
                                type="text"
                                className="admin-input text-[11px] font-mono"
                                style={{ padding: '0.4rem 0.6rem' }}
                                value={activeSection.taglineStyle?.color || ''}
                                onChange={(e) => updateElementStyle('taglineStyle', 'color', e.target.value)}
                                placeholder="Default"
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Background</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                                value={activeSection.taglineStyle?.backgroundColor || '#000000'}
                                onChange={(e) => updateElementStyle('taglineStyle', 'backgroundColor', e.target.value)}
                              />
                              <input
                                type="text"
                                className="admin-input text-[11px] font-mono"
                                style={{ padding: '0.4rem 0.6rem' }}
                                value={activeSection.taglineStyle?.backgroundColor || ''}
                                onChange={(e) => updateElementStyle('taglineStyle', 'backgroundColor', e.target.value)}
                                placeholder="Transparent"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Font Size</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.taglineStyle?.fontSize || ''}
                              onChange={(e) => updateElementStyle('taglineStyle', 'fontSize', e.target.value || undefined)}
                            >
                              <option value="">Default Size</option>
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                              <option value="xlarge">Extra Large</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Font Weight</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.taglineStyle?.fontWeight || ''}
                              onChange={(e) => updateElementStyle('taglineStyle', 'fontWeight', e.target.value || undefined)}
                            >
                              <option value="">Default Weight</option>
                              <option value="light">Light</option>
                              <option value="normal">Normal</option>
                              <option value="semibold">Semi Bold</option>
                              <option value="bold">Bold</option>
                              <option value="extrabold">Extra Bold</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Letter Spacing</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.taglineStyle?.letterSpacing || ''}
                              onChange={(e) => updateElementStyle('taglineStyle', 'letterSpacing', e.target.value || undefined)}
                            >
                              <option value="">Default Spacing</option>
                              <option value="tight">Tight</option>
                              <option value="normal">Normal</option>
                              <option value="wide">Wide</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Line Height</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.taglineStyle?.lineHeight || ''}
                              onChange={(e) => updateElementStyle('taglineStyle', 'lineHeight', e.target.value || undefined)}
                            >
                              <option value="">Default Height</option>
                              <option value="tight">Tight</option>
                              <option value="normal">Normal</option>
                              <option value="loose">Loose</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-3">
                          <div className="admin-field flex-row items-center gap-2 mb-0">
                            <input
                              type="checkbox"
                              id="tagline-bold-check"
                              className="cursor-pointer w-4 h-4 accent-accent"
                              checked={!!activeSection.taglineStyle?.bold}
                              onChange={(e) => updateElementStyle('taglineStyle', 'bold', e.target.checked)}
                            />
                            <label htmlFor="tagline-bold-check" className="text-xs text-muted font-medium cursor-pointer">
                              Bold Toggle
                            </label>
                          </div>
                          <div className="admin-field flex-row items-center gap-2 mb-0">
                            <input
                              type="checkbox"
                              id="tagline-italic-check"
                              className="cursor-pointer w-4 h-4 accent-accent"
                              checked={!!activeSection.taglineStyle?.italic}
                              onChange={(e) => updateElementStyle('taglineStyle', 'italic', e.target.checked)}
                            />
                            <label htmlFor="tagline-italic-check" className="text-xs text-muted font-medium cursor-pointer">
                              Italic Toggle
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Headline Title Typography Style */}
                    {activeSection.content.hasOwnProperty('title') && (
                      <div className="border-t border-border/80 pt-5 mt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center gap-1.5">
                          <Heading size={13} className="text-accent" />
                          Title Typography
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Title Text Color</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                                value={activeSection.titleStyle?.color || '#ffffff'}
                                onChange={(e) => updateElementStyle('titleStyle', 'color', e.target.value)}
                              />
                              <input
                                type="text"
                                className="admin-input text-[11px] font-mono"
                                style={{ padding: '0.4rem 0.6rem' }}
                                value={activeSection.titleStyle?.color || ''}
                                onChange={(e) => updateElementStyle('titleStyle', 'color', e.target.value)}
                                placeholder="Default (#fff)"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Title Background Color</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                                value={activeSection.titleStyle?.backgroundColor || '#000000'}
                                onChange={(e) => updateElementStyle('titleStyle', 'backgroundColor', e.target.value)}
                              />
                              <input
                                type="text"
                                className="admin-input text-[11px] font-mono"
                                style={{ padding: '0.4rem 0.6rem' }}
                                value={activeSection.titleStyle?.backgroundColor || ''}
                                onChange={(e) => updateElementStyle('titleStyle', 'backgroundColor', e.target.value)}
                                placeholder="Transparent"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Font Size</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.titleStyle?.fontSize || ''}
                              onChange={(e) => updateElementStyle('titleStyle', 'fontSize', e.target.value || undefined)}
                            >
                              <option value="">Default Size</option>
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                              <option value="xlarge">Extra Large</option>
                              <option value="xxlarge">Double Large</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Font Weight</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.titleStyle?.fontWeight || ''}
                              onChange={(e) => updateElementStyle('titleStyle', 'fontWeight', e.target.value || undefined)}
                            >
                              <option value="">Default Weight</option>
                              <option value="light">Light</option>
                              <option value="normal">Normal</option>
                              <option value="semibold">Semi Bold</option>
                              <option value="bold">Bold</option>
                              <option value="extrabold">Extra Bold</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Letter Spacing</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.titleStyle?.letterSpacing || ''}
                              onChange={(e) => updateElementStyle('titleStyle', 'letterSpacing', e.target.value || undefined)}
                            >
                              <option value="">Default Spacing</option>
                              <option value="tight">Tight</option>
                              <option value="normal">Normal</option>
                              <option value="wide">Wide</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Line Height</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.titleStyle?.lineHeight || ''}
                              onChange={(e) => updateElementStyle('titleStyle', 'lineHeight', e.target.value || undefined)}
                            >
                              <option value="">Default Height</option>
                              <option value="tight">Tight</option>
                              <option value="normal">Normal</option>
                              <option value="loose">Loose</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-3">
                          <div className="admin-field flex-row items-center gap-2 mb-0">
                            <input
                              type="checkbox"
                              id="title-bold-check"
                              className="cursor-pointer w-4 h-4 accent-accent"
                              checked={!!activeSection.titleStyle?.bold}
                              onChange={(e) => updateElementStyle('titleStyle', 'bold', e.target.checked)}
                            />
                            <label htmlFor="title-bold-check" className="text-xs text-muted font-medium cursor-pointer">
                              Bold Toggle
                            </label>
                          </div>
                          <div className="admin-field flex-row items-center gap-2 mb-0">
                            <input
                              type="checkbox"
                              id="title-italic-check"
                              className="cursor-pointer w-4 h-4 accent-accent"
                              checked={!!activeSection.titleStyle?.italic}
                              onChange={(e) => updateElementStyle('titleStyle', 'italic', e.target.checked)}
                            />
                            <label htmlFor="title-italic-check" className="text-xs text-muted font-medium cursor-pointer">
                              Italic Toggle
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Description Paragraph Typography Style */}
                    {activeSection.content.hasOwnProperty('description') && (
                      <div className="border-t border-border/80 pt-5 mt-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center gap-1.5">
                          <FileText size={13} className="text-accent" />
                          Description Typography
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Description Color</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                                value={activeSection.descStyle?.color || '#9ca3af'}
                                onChange={(e) => updateElementStyle('descStyle', 'color', e.target.value)}
                              />
                              <input
                                type="text"
                                className="admin-input text-[11px] font-mono"
                                style={{ padding: '0.4rem 0.6rem' }}
                                value={activeSection.descStyle?.color || ''}
                                onChange={(e) => updateElementStyle('descStyle', 'color', e.target.value)}
                                placeholder="Default (#9ca3af)"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Description Background Color</label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="color"
                                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-border"
                                value={activeSection.descStyle?.backgroundColor || '#000000'}
                                onChange={(e) => updateElementStyle('descStyle', 'backgroundColor', e.target.value)}
                              />
                              <input
                                type="text"
                                className="admin-input text-[11px] font-mono"
                                style={{ padding: '0.4rem 0.6rem' }}
                                value={activeSection.descStyle?.backgroundColor || ''}
                                onChange={(e) => updateElementStyle('descStyle', 'backgroundColor', e.target.value)}
                                placeholder="Transparent"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Font Size</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.descStyle?.fontSize || ''}
                              onChange={(e) => updateElementStyle('descStyle', 'fontSize', e.target.value || undefined)}
                            >
                              <option value="">Default Size</option>
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                              <option value="xlarge">Extra Large</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Font Weight</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.descStyle?.fontWeight || ''}
                              onChange={(e) => updateElementStyle('descStyle', 'fontWeight', e.target.value || undefined)}
                            >
                              <option value="">Default Weight</option>
                              <option value="light">Light</option>
                              <option value="normal">Normal</option>
                              <option value="semibold">Semi Bold</option>
                              <option value="bold">Bold</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Letter Spacing</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.descStyle?.letterSpacing || ''}
                              onChange={(e) => updateElementStyle('descStyle', 'letterSpacing', e.target.value || undefined)}
                            >
                              <option value="">Default Spacing</option>
                              <option value="tight">Tight</option>
                              <option value="normal">Normal</option>
                              <option value="wide">Wide</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="admin-label text-[10px]">Line Height</label>
                            <select
                              className="admin-input text-xs"
                              value={activeSection.descStyle?.lineHeight || ''}
                              onChange={(e) => updateElementStyle('descStyle', 'lineHeight', e.target.value || undefined)}
                            >
                              <option value="">Default Height</option>
                              <option value="tight">Tight</option>
                              <option value="normal">Normal</option>
                              <option value="loose">Loose</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-3">
                          <div className="admin-field flex-row items-center gap-2 mb-0">
                            <input
                              type="checkbox"
                              id="desc-bold-check"
                              className="cursor-pointer w-4 h-4 accent-accent"
                              checked={!!activeSection.descStyle?.bold}
                              onChange={(e) => updateElementStyle('descStyle', 'bold', e.target.checked)}
                            />
                            <label htmlFor="desc-bold-check" className="text-xs text-muted font-medium cursor-pointer">
                              Bold Toggle
                            </label>
                          </div>
                          <div className="admin-field flex-row items-center gap-2 mb-0">
                            <input
                              type="checkbox"
                              id="desc-italic-check"
                              className="cursor-pointer w-4 h-4 accent-accent"
                              checked={!!activeSection.descStyle?.italic}
                              onChange={(e) => updateElementStyle('descStyle', 'italic', e.target.checked)}
                            />
                            <label htmlFor="desc-italic-check" className="text-xs text-muted font-medium cursor-pointer">
                              Italic Toggle
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Custom HTML editor */}
                    {activeSection.type === 'custom' && (
                      <div className="admin-field">
                        <label className="admin-label">Custom HTML Markup</label>
                        <textarea
                          rows={14}
                          className="admin-textarea text-xs font-mono"
                          style={{ background: '#030712', color: '#45ffd2', border: '1px solid rgba(6, 182, 212, 0.2)' }}
                          value={activeSection.content.customHtml || ''}
                          onChange={(e) => updateSectionContent('customHtml', e.target.value)}
                          placeholder="<div class='card'>...</div>"
                        />
                      </div>
                    )}

                    {/* Grid Section Rows & Columns Editor */}
                    {activeSection.type === 'grid' && (
                      <div className="border-t border-border/80 pt-5 mt-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center justify-between">
                          Advanced Grid Configuration
                          <button
                            onClick={() => {
                              const rows = [...(activeSection.content.rows || [])];
                              rows.push({
                                id: `row-${Date.now()}`,
                                columns: [
                                  { title: 'New Column A', description: 'Customize content.', icon: 'Sparkles' }
                                ]
                              });
                              updateSectionContent('rows', rows);
                            }}
                            className="text-[10px] text-accent flex items-center gap-0.5 hover:underline bg-transparent border-none cursor-pointer font-semibold"
                          >
                            <Plus size={12} /> Add Row
                          </button>
                        </h4>

                        <div className="flex flex-col gap-6">
                          {(activeSection.content.rows || []).map((row, rIdx) => (
                            <div key={row.id || rIdx} className="p-5 bg-navy/30 border border-border/80 rounded-2xl flex flex-col gap-4 relative shadow-md">
                              <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Row #{rIdx + 1}</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      const rows = [...(activeSection.content.rows || [])];
                                      rows[rIdx].columns.push({
                                        title: `Column #${rows[rIdx].columns.length + 1}`,
                                        description: 'New grid column details.',
                                        icon: 'Code'
                                      });
                                      updateSectionContent('rows', rows);
                                    }}
                                    className="text-[9px] text-accent hover:underline bg-transparent border-none cursor-pointer flex items-center gap-0.5"
                                  >
                                    <Plus size={10} /> Add Column
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm('Delete this row?')) {
                                        const rows = (activeSection.content.rows || []).filter((_, idx) => idx !== rIdx);
                                        updateSectionContent('rows', rows);
                                      }
                                    }}
                                    className="text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer"
                                    title="Delete row"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>

                              {/* Columns stack */}
                              <div className="flex flex-col gap-4">
                                {row.columns.map((col, cIdx) => (
                                  <div key={cIdx} className="p-4 bg-navy/40 border border-border/50 rounded-xl flex flex-col gap-3 relative transition-all hover:border-accent/20">
                                    <button
                                      onClick={() => {
                                        const rows = [...(activeSection.content.rows || [])];
                                        rows[rIdx].columns = rows[rIdx].columns.filter((_, idx) => idx !== cIdx);
                                        updateSectionContent('rows', rows);
                                      }}
                                      className="absolute top-2 right-2 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer"
                                      title="Remove column"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                    <div className="text-[9px] font-bold text-muted uppercase">Column #{cIdx + 1}</div>

                                    <div className="grid grid-cols-2 gap-3">
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[9px] text-muted font-bold block">Headline</label>
                                        <input
                                          type="text"
                                          className="admin-input text-xs"
                                          style={{ padding: '0.4rem 0.6rem' }}
                                          value={col.title || ''}
                                          onChange={(e) => {
                                            const rows = [...(activeSection.content.rows || [])];
                                            rows[rIdx].columns[cIdx].title = e.target.value;
                                            updateSectionContent('rows', rows);
                                          }}
                                        />
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[9px] text-muted font-bold block">Icon</label>
                                        <select
                                          className="admin-input text-xs"
                                          style={{ padding: '0.4rem 0.6rem' }}
                                          value={col.icon || ''}
                                          onChange={(e) => {
                                            const rows = [...(activeSection.content.rows || [])];
                                            rows[rIdx].columns[cIdx].icon = e.target.value || undefined;
                                            updateSectionContent('rows', rows);
                                          }}
                                        >
                                          <option value="">No Icon</option>
                                          <option value="Code">Code Bracket</option>
                                          <option value="Smartphone">Smartphone</option>
                                          <option value="Cloud">Cloud Server</option>
                                          <option value="TrendingUp">Analytics Up</option>
                                          <option value="Sparkles">Sparkles</option>
                                          <option value="Globe">Web Globe</option>
                                          <option value="Lock">Lock Security</option>
                                          <option value="Settings">Settings Gears</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <label className="text-[9px] text-muted font-bold block">Body Copy</label>
                                      <textarea
                                        rows={3}
                                        className="admin-textarea text-xs leading-relaxed"
                                        style={{ padding: '0.4rem 0.6rem' }}
                                        value={col.description || ''}
                                        onChange={(e) => {
                                          const rows = [...(activeSection.content.rows || [])];
                                          rows[rIdx].columns[cIdx].description = e.target.value;
                                          updateSectionContent('rows', rows);
                                        }}
                                        placeholder="Column text details..."
                                      />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <label className="text-[9px] text-muted font-bold block">Column Width Span</label>
                                      <select
                                        className="admin-input text-xs"
                                        style={{ padding: '0.4rem 0.6rem' }}
                                        value={col.width || ''}
                                        onChange={(e) => {
                                          const rows = [...(activeSection.content.rows || [])];
                                          rows[rIdx].columns[cIdx].width = (e.target.value as any) || undefined;
                                          updateSectionContent('rows', rows);
                                        }}
                                      >
                                        <option value="">Balanced (Equal grid width)</option>
                                        <option value="full">Full Width (100%)</option>
                                        <option value="1/2">Half Width (50%)</option>
                                        <option value="1/3">One-Third Width (33.3%)</option>
                                        <option value="2/3">Two-Thirds Width (66.7%)</option>
                                        <option value="1/4">One-Fourth Width (25%)</option>
                                      </select>
                                    </div>

                                    {/* Column specific colors */}
                                    <div className="grid grid-cols-2 gap-3 mt-1">
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[9px] text-muted font-bold block">Text Color</label>
                                        <div className="flex gap-1.5 items-center">
                                          <input
                                            type="color"
                                            className="w-6 h-6 rounded bg-transparent border border-border cursor-pointer"
                                            value={col.color || '#f3f4f6'}
                                            onChange={(e) => {
                                              const rows = [...(activeSection.content.rows || [])];
                                              rows[rIdx].columns[cIdx].color = e.target.value;
                                              updateSectionContent('rows', rows);
                                            }}
                                          />
                                          <input
                                            type="text"
                                            className="admin-input text-[10px] font-mono"
                                            style={{ padding: '0.35rem 0.5rem' }}
                                            value={col.color || ''}
                                            onChange={(e) => {
                                              const rows = [...(activeSection.content.rows || [])];
                                              rows[rIdx].columns[cIdx].color = e.target.value || undefined;
                                              updateSectionContent('rows', rows);
                                            }}
                                            placeholder="Default"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <label className="text-[9px] text-muted font-bold block">Background</label>
                                        <div className="flex gap-1.5 items-center">
                                          <input
                                            type="color"
                                            className="w-6 h-6 rounded bg-transparent border border-border cursor-pointer"
                                            value={col.backgroundColor || '#0b111e'}
                                            onChange={(e) => {
                                              const rows = [...(activeSection.content.rows || [])];
                                              rows[rIdx].columns[cIdx].backgroundColor = e.target.value;
                                              updateSectionContent('rows', rows);
                                            }}
                                          />
                                          <input
                                            type="text"
                                            className="admin-input text-[10px] font-mono"
                                            style={{ padding: '0.35rem 0.5rem' }}
                                            value={col.backgroundColor || ''}
                                            onChange={(e) => {
                                              const rows = [...(activeSection.content.rows || [])];
                                              rows[rIdx].columns[cIdx].backgroundColor = e.target.value || undefined;
                                              updateSectionContent('rows', rows);
                                            }}
                                            placeholder="Default"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {row.columns.length === 0 && (
                                  <div className="text-[10px] text-center text-muted py-2 border border-dashed border-border/80 rounded-xl">
                                    No columns in this row. Click "Add Column" above.
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          {(activeSection.content.rows || []).length === 0 && (
                            <div className="text-[11px] text-center text-muted py-4 border border-dashed border-border/80 rounded-xl bg-navy/20">
                              No rows configured yet. Click "Add Row" above to start building.
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Button list modifiers */}
                    {activeSection.content.hasOwnProperty('buttons') && (
                      <div className="border-t border-border/80 pt-5 mt-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center justify-between">
                          Call-to-Action Buttons
                          <button
                            onClick={addButtonItem}
                            className="text-[10px] text-accent flex items-center gap-0.5 hover:underline bg-transparent border-none cursor-pointer font-semibold"
                          >
                            <Plus size={12} /> Add Button
                          </button>
                        </h4>
                        
                        <div className="flex flex-col gap-4">
                          {(activeSection.content.buttons || []).map((btn, btnIdx) => (
                            <div key={btnIdx} className="p-5 bg-navy/40 border border-border/60 rounded-2xl flex flex-col gap-4 relative transition-all hover:border-accent/30 shadow-md">
                              <button
                                onClick={() => deleteButtonItem(btnIdx)}
                                className="absolute top-3 right-3 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer transition-colors"
                                title="Remove button"
                              >
                                <Trash2 size={13} />
                              </button>
                              <div className="text-[10px] font-bold text-accent uppercase tracking-wider">Button #{btnIdx + 1}</div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] text-muted font-bold block">Label</label>
                                  <input
                                    type="text"
                                    className="admin-input text-xs"
                                    style={{ padding: '0.5rem 0.75rem' }}
                                    value={btn.text}
                                    onChange={(e) => updateButtonItem(btnIdx, 'text', e.target.value)}
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] text-muted font-bold block">Link Path</label>
                                  <input
                                    type="text"
                                    className="admin-input text-xs"
                                    style={{ padding: '0.5rem 0.75rem' }}
                                    value={btn.link}
                                    onChange={(e) => updateButtonItem(btnIdx, 'link', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="text-[9px] text-muted font-bold block">Design Style</label>
                                <select
                                  className="admin-input text-xs"
                                  style={{ padding: '0.5rem 0.75rem' }}
                                  value={btn.style}
                                  onChange={(e) => updateButtonItem(btnIdx, 'style', e.target.value)}
                                >
                                  <option value="primary">Primary Solid Cyan</option>
                                  <option value="secondary">Secondary Dark Glass</option>
                                </select>
                              </div>
                            </div>
                          ))}
                          {(activeSection.content.buttons || []).length === 0 && (
                            <div className="text-[11px] text-center text-muted py-4 border border-dashed border-border/80 rounded-xl bg-navy/20">
                              No buttons configured for this section.
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Lists items modifiers (for features, stats, FAQ, testimonials) */}
                    {activeSection.content.hasOwnProperty('items') && (
                      <div className="border-t border-border/80 pt-5 mt-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-heading mb-4 flex items-center justify-between">
                          Child Card Items
                          <button
                            onClick={addListItem}
                            className="text-[10px] text-accent flex items-center gap-0.5 hover:underline bg-transparent border-none cursor-pointer font-semibold"
                          >
                            <Plus size={12} /> Add Card
                          </button>
                        </h4>

                        <div className="flex flex-col gap-4">
                          {(activeSection.content.items || []).map((item, idx) => (
                            <div key={idx} className="p-5 bg-navy/40 border border-border/60 rounded-2xl flex flex-col gap-4 relative transition-all hover:border-accent/30 shadow-md">
                              <button
                                onClick={() => deleteListItem(idx)}
                                className="absolute top-3 right-3 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer transition-colors"
                                title="Remove item"
                              >
                                <Trash2 size={13} />
                              </button>
                              
                              <div className="text-[10px] font-bold text-accent uppercase tracking-wider">Card Item #{idx + 1}</div>

                              {/* Testimonials specific fields */}
                              {activeSection.type === 'testimonials' && (
                                <>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1">
                                      <label className="text-[9px] text-muted font-bold block">Author</label>
                                      <input
                                        type="text"
                                        className="admin-input text-xs"
                                        style={{ padding: '0.5rem 0.75rem' }}
                                        value={item.author || ''}
                                        onChange={(e) => updateListItem(idx, 'author', e.target.value)}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <label className="text-[9px] text-muted font-bold block">Role / Co</label>
                                      <input
                                        type="text"
                                        className="admin-input text-xs"
                                        style={{ padding: '0.5rem 0.75rem' }}
                                        value={item.role || ''}
                                        onChange={(e) => updateListItem(idx, 'role', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] text-muted font-bold block">Avatar Initials</label>
                                    <input
                                      type="text"
                                      className="admin-input text-xs"
                                      style={{ padding: '0.5rem 0.75rem', width: '70px' }}
                                      value={item.avatar || ''}
                                      onChange={(e) => updateListItem(idx, 'avatar', e.target.value)}
                                    />
                                  </div>
                                </>
                              )}

                              {/* Stats specific fields */}
                              {activeSection.type === 'stats' && (
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] text-muted font-bold block">Stat Value</label>
                                    <input
                                      type="text"
                                      className="admin-input text-xs"
                                      style={{ padding: '0.5rem 0.75rem' }}
                                      value={item.value || ''}
                                      onChange={(e) => updateListItem(idx, 'value', e.target.value)}
                                      placeholder="e.g. 250+"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] text-muted font-bold block">Stat Label</label>
                                    <input
                                      type="text"
                                      className="admin-input text-xs"
                                      style={{ padding: '0.5rem 0.75rem' }}
                                      value={item.label || ''}
                                      onChange={(e) => updateListItem(idx, 'label', e.target.value)}
                                      placeholder="e.g. Tech Awards"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* FAQ specific fields */}
                              {activeSection.type === 'faq' && (
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] text-muted font-bold block">Question Title</label>
                                  <input
                                    type="text"
                                    className="admin-input text-xs"
                                    style={{ padding: '0.5rem 0.75rem' }}
                                    value={item.question || ''}
                                    onChange={(e) => updateListItem(idx, 'question', e.target.value)}
                                  />
                                </div>
                              )}

                              {/* General title & icon field */}
                              {(activeSection.type === 'features') && (
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="flex flex-col gap-1">
                                    <label className="text-[9px] text-muted font-bold block">Title Headline</label>
                                    <input
                                      type="text"
                                      className="admin-input text-xs"
                                      style={{ padding: '0.5rem 0.75rem' }}
                                      value={item.title || ''}
                                      onChange={(e) => updateListItem(idx, 'title', e.target.value)}
                                    />
                                  </div>
                                  {activeSection.type === 'features' && (
                                    <div className="flex flex-col gap-1">
                                      <label className="text-[9px] text-muted font-bold block">Icon ID</label>
                                      <select
                                        className="admin-input text-xs"
                                        style={{ padding: '0.5rem 0.75rem' }}
                                        value={item.icon || 'Sparkles'}
                                        onChange={(e) => updateListItem(idx, 'icon', e.target.value)}
                                      >
                                        <option value="Code">Code Bracket</option>
                                        <option value="Smartphone">Smartphone</option>
                                        <option value="Cloud">Cloud Server</option>
                                        <option value="TrendingUp">Analytics Up</option>
                                        <option value="Sparkles">Sparkles</option>
                                        <option value="Globe">Web Globe</option>
                                        <option value="Lock">Lock Security</option>
                                        <option value="Settings">Settings Gears</option>
                                      </select>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* FAQ / testimonial / features description */}
                              {activeSection.type !== 'stats' && (
                                <div className="flex flex-col gap-1">
                                  <label className="text-[9px] text-muted font-bold block">
                                    {activeSection.type === 'faq' ? 'Answer Content' : 'Card Body Copy'}
                                  </label>
                                  <textarea
                                    rows={4}
                                    className="admin-textarea text-xs leading-relaxed"
                                    style={{ padding: '0.5rem 0.75rem' }}
                                    value={item.description || item.answer || ''}
                                    onChange={(e) => updateListItem(idx, activeSection.type === 'faq' ? 'answer' : 'description', e.target.value)}
                                    placeholder="Enter body text details..."
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          {(activeSection.content.items || []).length === 0 && (
                            <div className="text-[11px] text-center text-muted py-4 border border-dashed border-border/80 rounded-xl bg-navy/20">
                              No card items configured.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Sections list hierarchy view
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/40">
                      <h3 className="text-xs font-bold font-sora uppercase tracking-wider text-muted">
                        Page Section Hierarchy
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setShowColumnPicker(!showColumnPicker); setShowAddSection(false); }}
                          className={`text-xs flex items-center gap-0.5 bg-transparent border border-accent/30 rounded-lg px-2.5 py-1 font-bold cursor-pointer transition-all ${
                            showColumnPicker ? 'bg-accent text-navy border-accent' : 'text-accent hover:bg-accent/10'
                          }`}
                        >
                          <Grid size={12} /> Columns
                        </button>
                        <button
                          onClick={() => { setShowAddSection(!showAddSection); setShowColumnPicker(false); }}
                          className="text-xs text-accent flex items-center gap-0.5 hover:underline bg-transparent border-none cursor-pointer font-bold"
                        >
                          <Plus size={14} /> Add Section
                        </button>
                      </div>
                    </div>

                    {/* Visual Column Picker */}
                    {showColumnPicker && (
                      <div className="p-4 bg-[#06b6d408] border border-accent/25 rounded-2xl flex flex-col gap-3 shadow-inner">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-accent tracking-wider uppercase flex items-center gap-1.5">
                            <Grid size={11} /> Choose Column Structure
                          </span>
                          <span className="text-[9px] text-muted">Adds a Grid section</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {COLUMN_LAYOUTS.map((col, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAddColumnLayout(col)}
                              className="group flex flex-col items-center gap-2 p-3 bg-navy/60 hover:bg-accent/10 border border-border/60 hover:border-accent/40 rounded-xl cursor-pointer transition-all"
                            >
                              {/* Visual bar diagram */}
                              <div className="flex gap-[3px] w-full h-6 items-stretch px-1">
                                {col.visual.map((w, wIdx) => (
                                  <div
                                    key={wIdx}
                                    className="bg-accent/25 group-hover:bg-accent/45 rounded-sm transition-colors flex-shrink-0"
                                    style={{ width: `${w}%`, minWidth: '4px' }}
                                  />
                                ))}
                              </div>
                              <span className="text-[9px] font-bold text-muted group-hover:text-accent uppercase tracking-wider transition-colors">
                                {col.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive template section drawer */}
                    {showAddSection && (
                      <div className="p-4 bg-accent/5 border border-dashed border-accent/30 rounded-2xl flex flex-col gap-3 mb-2 shadow-inner">
                        <span className="text-[10px] font-bold text-accent tracking-wider uppercase">Select template type:</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { type: 'hero', name: 'Hero Banner' },
                            { type: 'features', name: 'Features Grid' },
                            { type: 'grid', name: 'Advanced Grid' },
                            { type: 'stats', name: 'Glass Stats' },
                            { type: 'testimonials', name: 'Testimonials' },
                            { type: 'faq', name: 'FAQ Accordion' },
                            { type: 'cta', name: 'CTA Audit Box' },
                            { type: 'custom', name: 'Custom HTML' }
                          ].map(t => (
                            <button
                              key={t.type}
                              onClick={() => addSection(t.type as any)}
                              className="px-3 py-2 bg-[#0d1625] hover:bg-accent hover:text-navy text-[10px] font-semibold border border-border rounded-xl text-left transition-colors cursor-pointer"
                            >
                              + {t.name}
                            </button>
                          ))}
                        </div>

                        <div className="border-t border-border/30 pt-3 mt-1 flex flex-col gap-2">
                          <span className="text-[10px] font-bold text-accent tracking-wider uppercase">Or Add Elementor Row Preset:</span>
                          <div className="flex flex-col gap-1.5">
                            {GRID_PRESETS.map((preset, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  handleAddGridStructure(preset.cols);
                                  setShowAddSection(false);
                                }}
                                className="w-full flex items-center justify-between p-2.5 bg-[#0d1625] hover:bg-accent hover:text-navy text-[10px] font-semibold border border-border rounded-xl text-left transition-colors cursor-pointer"
                              >
                                <span>{preset.name}</span>
                                <div className="flex gap-0.5 h-4 bg-white/5 border border-white/10 rounded p-0.5 w-16">
                                  {preset.cols.map((col, cIdx) => {
                                    let widthPercent = '100%';
                                    if (col.width === '1/2') widthPercent = '50%';
                                    else if (col.width === '1/3') widthPercent = '33.33%';
                                    else if (col.width === '2/3') widthPercent = '66.66%';
                                    else if (col.width === '1/4') widthPercent = '25%';
                                    return (
                                      <div 
                                        key={cIdx} 
                                        className="bg-accent/25 rounded"
                                        style={{ width: `calc(${widthPercent} - 1px)` }}
                                      />
                                    );
                                  })}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section stack */}
                    <div className="flex flex-col gap-2.5">
                      {layout.sections.map((section, idx) => {
                        const isVisible = section.visible;
                        return (
                          <div
                            key={section.id}
                            className={`p-3.5 bg-white/2 border rounded-xl flex items-center justify-between gap-3 transition-all hover:bg-white/5 cursor-pointer ${
                              !isVisible ? 'opacity-35 border-dashed border-border' : 'border-border/80 shadow-sm'
                            }`}
                            onClick={() => setSelectedSectionId(section.id)}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 bg-navy3 rounded-lg flex items-center justify-center flex-shrink-0 text-accent font-bold text-xs border border-border/60">
                                {idx + 1}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-heading truncate">
                                  {section.content.title || `Custom ${section.type.toUpperCase()}`}
                                </h4>
                                <span className="text-[9px] text-accent uppercase font-bold tracking-wider">
                                  {section.type}
                                </span>
                              </div>
                            </div>

                            {/* Section control actions */}
                            <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                              {/* Reordering */}
                              <button
                                onClick={() => moveSection(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1.5 text-muted hover:text-text disabled:opacity-20 bg-transparent border-none cursor-pointer transition-colors"
                                title="Move section up"
                              >
                                <ArrowUp size={12} />
                              </button>
                              <button
                                onClick={() => moveSection(idx, 'down')}
                                disabled={idx === layout.sections.length - 1}
                                className="p-1.5 text-muted hover:text-text disabled:opacity-20 bg-transparent border-none cursor-pointer transition-colors"
                                title="Move section down"
                              >
                                <ArrowDown size={12} />
                              </button>

                              {/* Visibility */}
                              <button
                                onClick={() => toggleVisibility(section.id)}
                                className="p-1.5 text-muted hover:text-text bg-transparent border-none cursor-pointer transition-colors"
                                title={isVisible ? 'Hide Section' : 'Show Section'}
                              >
                                {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                              </button>

                              {/* Duplicate */}
                              <button
                                onClick={() => duplicateSection(section)}
                                className="p-1.5 text-muted hover:text-text bg-transparent border-none cursor-pointer transition-colors"
                                title="Duplicate section"
                              >
                                <Copy size={12} />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => deleteSection(section.id)}
                                className="p-1.5 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer transition-colors"
                                title="Delete section"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {layout.sections.length === 0 && (
                        <div className="text-xs text-center text-muted py-10 border border-dashed border-border rounded-xl">
                          No sections configured. Click "Add Section" to populate layout.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* 2. THEME TAB */}
            {activeSidebarTab === 'theme' && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold font-sora uppercase tracking-wider text-muted">
                  Global Page Typography &amp; Palette
                </h3>

                {/* Preset Skin Themes */}
                <div className="p-4 bg-white/2 border border-border rounded-xl shadow-md">
                  <label className="admin-label block mb-3">Preset Theme Colors</label>
                  <div className="flex flex-col gap-2">
                    {THEME_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setLayout({
                            ...layout,
                            theme: {
                              ...layout.theme,
                              primaryColor: preset.primary,
                              accentColor: preset.accent
                            }
                          });
                          triggerToast(`Switched theme to ${preset.name}!`, 'success');
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-navy3 hover:bg-white/5 border border-border transition-all text-left cursor-pointer"
                      >
                        <span className="text-xs font-medium">{preset.name}</span>
                        <div className="flex gap-1.5 items-center">
                          <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ background: preset.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ background: preset.accent }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="admin-field">
                    <label className="admin-label">Primary Accent</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border border-border"
                        value={layout.theme.primaryColor}
                        onChange={(e) => setLayout({
                          ...layout,
                          theme: { ...layout.theme, primaryColor: e.target.value }
                        })}
                      />
                      <input
                        type="text"
                        className="admin-input text-xs font-mono"
                        style={{ padding: '0.45rem 0.75rem' }}
                        value={layout.theme.primaryColor}
                        onChange={(e) => setLayout({
                          ...layout,
                          theme: { ...layout.theme, primaryColor: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div className="admin-field">
                    <label className="admin-label">Secondary Glow</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border border-border"
                        value={layout.theme.accentColor}
                        onChange={(e) => setLayout({
                          ...layout,
                          theme: { ...layout.theme, accentColor: e.target.value }
                        })}
                      />
                      <input
                        type="text"
                        className="admin-input text-xs font-mono"
                        style={{ padding: '0.45rem 0.75rem' }}
                        value={layout.theme.accentColor}
                        onChange={(e) => setLayout({
                          ...layout,
                          theme: { ...layout.theme, accentColor: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Background Ambient glows */}
                <div className="admin-field">
                  <label className="admin-label">Ambient Background Glow</label>
                  <select
                    className="admin-input text-xs"
                    value={layout.theme.bgGradient ? 'yes' : 'no'}
                    onChange={(e) => setLayout({
                      ...layout,
                      theme: {
                        ...layout.theme,
                        bgGradient: e.target.value === 'yes' ? 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,212,255,0.07) 0%, transparent 70%)' : ''
                      }
                    })}
                  >
                    <option value="yes">Enable Animated Background Glow Spots</option>
                    <option value="no">Clean Minimal Slate (Solid Dark)</option>
                  </select>
                </div>

                {/* Fonts switcher */}
                <div className="admin-field">
                  <label className="admin-label">Typography Style</label>
                  <select
                    className="admin-input text-xs"
                    value={layout.theme.fontFamily}
                    onChange={(e) => setLayout({
                      ...layout,
                      theme: { ...layout.theme, fontFamily: e.target.value }
                    })}
                  >
                    <option value="Manrope">Manrope (Modern Technical &amp; Sleek)</option>
                    <option value="Sora">Sora (Premium Rounded &amp; Bold)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 3. SEO TAB */}
            {activeSidebarTab === 'seo' && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold font-sora uppercase tracking-wider text-muted">
                  Page SEO Meta Configuration
                </h3>

                <p className="text-[11px] text-muted leading-relaxed">
                  These metadata tags are dynamically updated on the page. In addition to visual layouts, optimizing page meta ensures premium search rankings.
                </p>

                <div className="admin-field">
                  <label className="admin-label">Meta Title Tag</label>
                  <input
                    type="text"
                    className="admin-input text-xs font-semibold"
                    placeholder="Enter absolute title tag..."
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                  <span className="text-[9px] text-muted mt-1 block">Recommended Length: 50-60 characters.</span>
                </div>

                <div className="admin-field">
                  <label className="admin-label">Meta Description</label>
                  <textarea
                    rows={5}
                    className="admin-textarea text-xs font-light leading-relaxed"
                    placeholder="Provide search engine result snippet..."
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                  />
                  <span className="text-[9px] text-muted mt-1 block">Recommended Length: 150-160 characters.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Live Interactive Viewport Simulator Pane ── */}
        <div className="flex-1 bg-navy/40 border border-border/80 rounded-2xl flex flex-col overflow-hidden h-full shadow-2xl">
          
          {/* Viewport switch toolbar */}
          <div className="flex items-center justify-between border-b border-border bg-subtle-bg px-5 py-3 flex-shrink-0 z-20">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted">
                Live Simulator Canvas
              </span>
            </div>

            {/* Switch viewport sizing buttons */}
            <div className="flex bg-navy3/80 border border-white/5 rounded-xl p-0.5">
              {[
                { id: 'desktop', icon: Laptop, label: 'Desktop View' },
                { id: 'tablet', icon: Tablet, label: 'Tablet 768px' },
                { id: 'mobile', icon: Smartphone, label: 'Mobile 390px' }
              ].map(dev => {
                const DevIcon = dev.icon;
                const isActive = viewport === dev.id;
                return (
                  <button
                    key={dev.id}
                    onClick={() => setViewport(dev.id as any)}
                    className={`p-2 rounded-lg text-muted transition-all cursor-pointer ${
                      isActive ? 'bg-accent text-navy shadow-inner scale-[1.02]' : 'hover:text-text hover:bg-white/5'
                    }`}
                    title={dev.label}
                  >
                    <DevIcon size={14} />
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-accent/80 font-bold font-sora uppercase tracking-wider">
              Click sections inside canvas to edit
            </div>
          </div>

          {/* Interactive Rendering Frame */}
          <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] scroll-custom">
            <div
              className={`bg-navy border border-border shadow-2xl transition-all duration-300 overflow-y-auto overflow-x-hidden scroll-custom ${
                viewport === 'mobile'
                  ? 'w-[390px] h-[720px] rounded-[36px] border-[12px] border-neutral-800'
                  : viewport === 'tablet'
                  ? 'w-[768px] h-[780px] rounded-3xl'
                  : 'w-full min-h-[720px] rounded-2xl'
              }`}
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Dynamic Sections Renderer */}
              {layout.sections.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[560px] p-8 text-center bg-[#0b111e]/40 backdrop-blur-xl border border-white/5 rounded-3xl m-6">
                  <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mb-6 text-accent animate-pulse shadow-lg shadow-accent/10">
                    <Plus size={32} />
                  </div>
                  <h2 className="text-xl font-bold font-sora text-[#f3f4f6] mb-2">Your Canvas is Empty</h2>
                  <p className="text-xs text-[#9ca3af] max-w-sm leading-relaxed mb-8 font-light">
                    Start building your premium page from scratch. Select one of the responsive row-column structures below to begin:
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl">
                    {GRID_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddGridStructure(preset.cols)}
                        className="flex flex-col gap-3 p-4 bg-[#070b13]/85 hover:bg-[#0b111e] border border-border/80 hover:border-accent/40 rounded-2xl text-left transition-all hover:scale-[1.03] cursor-pointer shadow-md hover:shadow-accent/5 group"
                      >
                        <span className="text-[10px] font-bold text-heading group-hover:text-accent transition-colors font-sora uppercase tracking-wider">{preset.name}</span>
                        {/* Visual Grid Column splits */}
                        <div className="flex gap-1 w-full h-8 bg-white/5 border border-white/10 rounded-lg p-1.5">
                          {preset.cols.map((col, cIdx) => {
                            let widthPercent = '100%';
                            if (col.width === '1/2') widthPercent = '50%';
                            else if (col.width === '1/3') widthPercent = '33.33%';
                            else if (col.width === '2/3') widthPercent = '66.66%';
                            else if (col.width === '1/4') widthPercent = '25%';
                            return (
                              <div 
                                key={cIdx} 
                                className="bg-accent/10 border border-accent/20 rounded flex items-center justify-center text-[7px] font-mono text-accent font-bold"
                                style={{ width: `calc(${widthPercent} - 3px)` }}
                              >
                                {col.width}
                              </div>
                            );
                          })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <DynamicPageRenderer
                  layout={layout}
                  interactive={true}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={(id) => {
                    setSelectedSectionId(id);
                    setActiveSidebarTab('sections');
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
