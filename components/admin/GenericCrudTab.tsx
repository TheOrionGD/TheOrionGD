/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSave, FaTimes, FaCheck, FaDatabase } from 'react-icons/fa';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'array';
  placeholder?: string;
}

interface GenericCrudTabProps {
  collection: string;
  title: string;
  fields: FieldDef[];
  isSingleObject?: boolean;
}

const GenericCrudTab: React.FC<GenericCrudTabProps> = ({ collection, title, fields, isSingleObject }) => {
  const [data, setData] = useState<any[] | any>(isSingleObject ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, [collection]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/data/${collection}`);
      if (res.ok) {
        const json = await res.json();
        if (isSingleObject) {
          setData(Array.isArray(json) ? (json[0] || {}) : json);
        } else {
          // Sort by order if available
          const sorted = Array.isArray(json) ? [...json].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];
          setData(sorted);
        }
      } else {
        setError('Failed to load collection data.');
      }
    } catch (err) {
      setError('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const showSuccessMsg = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  // Single Object Save (e.g. personal_info)
  const handleSaveSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const method = data._id ? 'PATCH' : 'POST';
      const url = data._id ? `/api/admin/data/${collection}/${data._id}` : `/api/admin/data/${collection}`;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showSuccessMsg('Configuration saved successfully!');
        fetchData();
      } else {
        const errJson = await res.json();
        setError(errJson.error || 'Failed to save');
      }
    } catch (err) {
      setError('Error saving configuration');
    } finally {
      setSaving(false);
    }
  };

  // Open modal for Add
  const handleAddNew = () => {
    const initial: any = {};
    fields.forEach(f => {
      if (f.type === 'boolean') initial[f.name] = false;
      else if (f.type === 'number') initial[f.name] = 0;
      else if (f.type === 'array') initial[f.name] = [];
      else initial[f.name] = '';
    });
    if (!isSingleObject) {
      initial.order = Array.isArray(data) ? data.length + 1 : 1;
    }
    setCurrentItem(initial);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEdit = (item: any) => {
    setCurrentItem({ ...item });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Save Modal (POST or PATCH)
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;
    setSaving(true);
    setError('');

    try {
      const method = isEditing && currentItem._id ? 'PATCH' : 'POST';
      const url = isEditing && currentItem._id
        ? `/api/admin/data/${collection}/${currentItem._id}`
        : `/api/admin/data/${collection}`;

      // Clean up fields before sending
      const payload = { ...currentItem };
      fields.forEach(f => {
        if (f.type === 'number' && typeof payload[f.name] === 'string') {
          payload[f.name] = Number(payload[f.name]) || 0;
        }
      });

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showSuccessMsg(isEditing ? 'Item updated successfully!' : 'New item created successfully!');
        setIsModalOpen(false);
        fetchData();
      } else {
        const errJson = await res.json();
        setError(errJson.error || 'Failed to save item');
      }
    } catch (err) {
      setError('Error saving item');
    } finally {
      setSaving(false);
    }
  };

  // Delete Item
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/data/${collection}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showSuccessMsg('Item deleted successfully!');
        fetchData();
      } else {
        setError('Failed to delete item');
      }
    } catch (err) {
      setError('Error deleting item');
    }
  };

  // Reorder Item Up/Down
  const handleReorder = async (idx: number, direction: 'up' | 'down') => {
    if (!Array.isArray(data)) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= data.length) return;

    const item1 = data[idx];
    const item2 = data[targetIdx];

    const id1 = item1._id;
    const order1 = item2.order || targetIdx + 1;
    const id2 = item2._id;
    const order2 = item1.order || idx + 1;

    try {
      const res = await fetch(`/api/admin/reorder/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id1, order1, id2, order2 }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Reorder failed', err);
    }
  };

  // Helper to parse array fields in forms (comma or newline separated)
  const handleArrayChange = (fieldName: string, value: string) => {
    if (!currentItem) return;
    const arr = value.split(/\n|,/).map(s => s.trim()).filter(Boolean);
    setCurrentItem({ ...currentItem, [fieldName]: arr });
  };

  if (loading) {
    return <div className="p-8 text-center font-mono font-bold" style={{ color: '#3A3A3A' }}>LOADING {title.toUpperCase()}...</div>;
  }

  // SINGLE OBJECT RENDERER (e.g. Personal Info)
  if (isSingleObject) {
    return (
      <div className="p-6 rounded-2xl shadow-sm space-y-6"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 4px 16px rgba(255,99,99,0.06)' }}>
        <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
          <div className="flex items-center gap-3">
            <FaDatabase className="text-xl" style={{ color: '#7B3F00' }} />
            <h2 className="text-lg font-black uppercase font-outfit" style={{ color: '#000000' }}>{title}</h2>
          </div>
          <button
            onClick={handleSaveSingle}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-white text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 12px rgba(255,99,99,0.25)' }}
          >
            <FaSave />
            <span>{saving ? 'SAVING...' : 'SAVE CHANGES'}</span>
          </button>
        </div>

        {error && <div className="p-3 text-xs font-mono font-bold rounded-lg" style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.40)', color: '#7B3F00' }}>{error}</div>}
        {success && <div className="p-3 text-xs font-mono font-bold rounded-lg flex items-center gap-2" style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}><FaCheck style={{ color: '#7B3F00' }} /> {success}</div>}

        <form onSubmit={handleSaveSingle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.name} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={data?.[f.name] || ''}
                  onChange={e => setData({ ...data, [f.name]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                  style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={data?.[f.name] || ''}
                  onChange={e => setData({ ...data, [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                  style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              )}
            </div>
          ))}
        </form>
      </div>
    );
  }

  // ARRAY / LIST RENDERER (Projects, Skills, Experience, etc.)
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl flex items-center justify-between shadow-sm"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 4px 16px rgba(255,99,99,0.06)' }}>
        <div className="flex items-center gap-3">
          <FaDatabase className="text-xl" style={{ color: '#7B3F00' }} />
          <div>
            <h2 className="text-lg font-black uppercase font-outfit" style={{ color: '#000000' }}>{title}</h2>
            <p className="text-xs font-mono font-bold" style={{ color: '#3A3A3A' }}>{"// Total records: "}{Array.isArray(data) ? data.length : 0}</p>
          </div>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2.5 rounded-xl text-white text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 12px rgba(255,99,99,0.25)' }}
        >
          <FaPlus />
          <span>ADD NEW ITEM</span>
        </button>
      </div>

      {error && <div className="p-3 text-xs font-mono font-bold rounded-lg" style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.40)', color: '#7B3F00' }}>{error}</div>}
      {success && <div className="p-3 text-xs font-mono font-bold rounded-lg flex items-center gap-2" style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}><FaCheck style={{ color: '#7B3F00' }} /> {success}</div>}

      {/* Table / List */}
      <div className="rounded-2xl overflow-hidden shadow-xl"
        style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)' }}>
        {(!Array.isArray(data) || data.length === 0) ? (
          <div className="p-8 text-center text-xs font-mono font-bold" style={{ color: '#3A3A3A' }}>No records found in {collection}. Click &apos;Add New Item&apos; to create one.</div>
        ) : (
          <div>
            {data.map((item, idx) => (
              <div key={item._id || idx} className="p-4 flex items-center justify-between transition-colors"
                style={{ borderBottom: '1px solid rgba(190,228,208,0.60)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,249,251,1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleReorder(idx, 'up')}
                      className="p-1 disabled:opacity-20 transition-colors cursor-pointer"
                      style={{ color: '#7B3F00' }}
                    >
                      <FaArrowUp className="text-[10px]" />
                    </button>
                    <span className="text-[10px] font-mono font-bold" style={{ color: '#3A3A3A' }}>{idx + 1}</span>
                    <button
                      disabled={idx === data.length - 1}
                      onClick={() => handleReorder(idx, 'down')}
                      className="p-1 disabled:opacity-20 transition-colors cursor-pointer"
                      style={{ color: '#7B3F00' }}
                    >
                      <FaArrowDown className="text-[10px]" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black truncate font-sans" style={{ color: '#000000' }}>
                      {item.title || item.name || item.role || item.degree || item.category || item.src || 'Untitled Item'}
                    </h4>
                    <p className="text-xs truncate font-mono font-medium" style={{ color: '#3A3A3A' }}>
                      {item.company || item.institution || item.issuer || item.description || item.alt || (Array.isArray(item.skills) ? item.skills.join(', ') : '') || ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg transition-colors text-xs flex items-center gap-1.5 font-mono font-bold cursor-pointer"
                    style={{ background: 'rgba(219,255,203,0.80)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#7B3F00'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'}
                  >
                    <FaEdit style={{ color: '#7B3F00' }} />
                    <span className="hidden md:inline">EDIT</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 rounded-lg transition-colors text-xs cursor-pointer"
                    style={{ background: 'rgba(255,130,130,0.15)', border: '1px solid rgba(255,99,99,0.35)', color: '#7B3F00' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,99,99,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,130,130,0.15)'}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add / Edit */}
      <AnimatePresence>
        {isModalOpen && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: 'rgba(15,23,42,0.6)' }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(190,228,208,0.80)', boxShadow: '0 20px 50px rgba(255,99,99,0.15)' }}
            >
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(190,228,208,0.80)' }}>
                <h3 className="text-base font-black uppercase font-outfit flex items-center gap-2" style={{ color: '#000000' }}>
                  <FaDatabase style={{ color: '#7B3F00' }} />
                  <span>{isEditing ? 'EDIT RECORD' : 'CREATE NEW RECORD'} {"//"} {title.toUpperCase()}</span>
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="cursor-pointer" style={{ color: '#3A3A3A' }}><FaTimes /></button>
              </div>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map(f => {
                    const val = currentItem[f.name];
                    const isFullWidth = f.type === 'textarea' || f.type === 'array';

                    return (
                      <div key={f.name} className={isFullWidth ? 'md:col-span-2' : ''}>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: '#000000' }}>
                          {f.label}
                          {f.type === 'array' && <span className="text-[10px] lowercase ml-1" style={{ color: '#3A3A3A' }}>(comma or newline separated)</span>}
                        </label>

                        {f.type === 'textarea' ? (
                          <textarea
                            rows={4}
                            value={val || ''}
                            onChange={e => setCurrentItem({ ...currentItem, [f.name]: e.target.value })}
                            placeholder={f.placeholder}
                            className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                            style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
                          />
                        ) : f.type === 'array' ? (
                          <textarea
                            rows={3}
                            value={Array.isArray(val) ? val.join(', ') : (val || '')}
                            onChange={e => handleArrayChange(f.name, e.target.value)}
                            placeholder="item 1, item 2, item 3..."
                            className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                            style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
                          />
                        ) : f.type === 'boolean' ? (
                          <div className="flex items-center gap-3 pt-2">
                            <input
                              type="checkbox"
                              checked={!!val}
                              onChange={e => setCurrentItem({ ...currentItem, [f.name]: e.target.checked })}
                              className="w-4 h-4 rounded cursor-pointer"
                              style={{ accentColor: '#7B3F00' }}
                            />
                            <span className="text-xs font-mono font-bold" style={{ color: '#000000' }}>Enable / Mark as Featured</span>
                          </div>
                        ) : (
                          <input
                            type={f.type === 'number' ? 'number' : 'text'}
                            value={val || ''}
                            onChange={e => setCurrentItem({ ...currentItem, [f.name]: f.type === 'number' ? e.target.value : e.target.value })}
                            placeholder={f.placeholder}
                            className="w-full px-4 py-2 rounded-xl text-xs focus:outline-none font-mono font-bold"
                            style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#000000' }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#7B3F00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,99,99,0.15)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(190,228,208,0.80)'; e.currentTarget.style.boxShadow = 'none'; }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6" style={{ borderTop: '1px solid rgba(190,228,208,0.80)' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer"
                    style={{ background: 'rgba(248,249,251,1)', border: '1px solid rgba(190,228,208,0.80)', color: '#3A3A3A' }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 rounded-xl text-white text-xs font-bold font-mono flex items-center gap-2 cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #7B3F00, #B87333)', boxShadow: '0 4px 12px rgba(255,99,99,0.25)' }}
                  >
                    <FaSave />
                    <span>{saving ? 'SAVING...' : isEditing ? 'UPDATE RECORD' : 'CREATE RECORD'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenericCrudTab;
