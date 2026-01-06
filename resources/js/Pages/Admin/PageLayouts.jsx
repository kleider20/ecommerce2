// // resources/js/Pages/Admin/LayoutConfigurations.jsx
// import React, { useState } from 'react';
// import { Head, router } from '@inertiajs/react';
// import { Plus, Trash2 } from 'lucide-react';

// const LayoutConfigurations = ({
//   configurations,
//   availableRoles,
//   availableLayoutTypes,
//   availableLayouts,
//   success
// }) => {
//   const [form, setForm] = useState({
//     layout_type: 'dashboard',
//     role: availableRoles[0] || 'user',
//     layout_path: availableLayouts[0] || ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.post('/admin/layout-configurations', form);
//   };

//   const handleDelete = (id) => {
//     if (confirm('¿Eliminar configuración?')) {
//       router.delete(`/admin/layout-configurations/${id}`);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Head title="Gestor de Layouts" />

//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Gestor de Layouts</h1>
//         <p className="text-gray-600">
//           Configura layouts para diferentes roles y tipos de página.
//           Los layouts se cargan automáticamente desde la carpeta <code>resources/js/Layouts</code>.
//         </p>
//       </div>

//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//           {success}
//         </div>
//       )}

//       {/* Formulario */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h2 className="text-lg font-semibold mb-4">Nueva Configuración de Layout</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Página</label>
//             <select
//               value={form.layout_type}
//               onChange={e => setForm({...form, layout_type: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             >
//               {availableLayoutTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
//             <select
//               value={form.role}
//               onChange={e => setForm({...form, role: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             >
//               {availableRoles.map(role => (
//                 <option key={role} value={role}>{role}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
//             <select
//               value={form.layout_path}
//               onChange={e => setForm({...form, layout_path: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//             >
//               {availableLayouts.map(layout => (
//                 <option key={layout} value={layout}>{layout}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-end">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
//             >
//               <Plus className="w-4 h-4" /> Agregar
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Tabla de configuraciones */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-semibold">Configuraciones Actuales</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layout</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {configurations.map(config => (
//                 <tr key={config.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{config.layout_type}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{config.role}</td>
//                   <td className="px-6 py-4 text-sm text-gray-500 font-mono">{config.layout_path}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => handleDelete(config.id)}
//                       className="text-red-600 hover:text-red-900 p-1"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Instrucciones para usuarios */}
//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//         <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Cómo añadir nuevos layouts?</h3>
//         <ol className="list-decimal list-inside space-y-2 text-blue-800">
//           <li>Crea tu layout en <code>resources/js/Layouts/TuCarpeta/TuLayout.jsx</code></li>
//           <li>Asegúrate de que exporte un componente por defecto</li>
//           <li>Refresca esta página para ver el nuevo layout en la lista</li>
//           <li>Configura la asociación en la tabla de arriba</li>
//         </ol>
//         <p className="mt-3 text-sm">
//           <strong>Ejemplo:</strong> Si creas <code>resources/js/Layouts/Custom/Dashboard.jsx</code>,
//           el <code>layout_path</code> será <code>Custom/Dashboard</code>.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LayoutConfigurations;


// // resources/js/Pages/Admin/PageLayouts.jsx
// const PageLayouts = ({
//   pageLayouts,
//   availablePages,
//   availableRoles,
//   availableLayouts
// }) => {
//   const [form, setForm] = useState({
//     page_name: 'WelcomePage',
//     role: 'guest',
//     layout_path: availableLayouts[0] || ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Lógica para guardar en la base de datos
//     router.post('/admin/page-layouts', form);
//   };

//   return (
//     <div>
//       <h1>Configuración de Layouts por Página</h1>

//       <form onSubmit={handleSubmit}>
//         <select
//           value={form.page_name}
//           onChange={e => setForm({...form, page_name: e.target.value})}
//         >
//           {availablePages.map(page => (
//             <option key={page} value={page}>{page}</option>
//           ))}
//         </select>

//         <select
//           value={form.role}
//           onChange={e => setForm({...form, role: e.target.value})}
//         >
//           {availableRoles.map(role => (
//             <option key={role} value={role}>{role}</option>
//           ))}
//         </select>

//         <select
//           value={form.layout_path}
//           onChange={e => setForm({...form, layout_path: e.target.value})}
//         >
//           {availableLayouts.map(layout => (
//             <option key={layout} value={layout}>{layout}</option>
//           ))}
//         </select>

//         <button type="submit">Guardar</button>
//       </form>

//       {/* Tabla de configuraciones actuales */}
//       <table>
//         <thead>
//           <tr>
//             <th>Página</th>
//             <th>Rol</th>
//             <th>Layout</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(pageLayouts).map(([key, layoutPath]) => {
//             const [pageName, role] = key.split('_');
//             return (
//               <tr key={key}>
//                 <td>{pageName}</td>
//                 <td>{role}</td>
//                 <td>{layoutPath}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// import React, { useState } from 'react';
// import { Head, router } from '@inertiajs/react';
// import { Plus, Trash2, Edit3 } from 'lucide-react';

// const PageLayouts = ({
//   configurations,
//   availablePages = [],
//   availableRoles = [],
//   availableLayouts = [],
//   success
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({
//     page_name: availablePages[0] || '',
//     layout_path: availableLayouts[0] || '',
//     role: '',
//     permission: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingId) {
//       router.put(`/admin/page-layouts/${editingId}`, form);
//     } else {
//       router.post('/admin/page-layouts', form);
//     }

//     setForm({ page_name: '', layout_path: '', role: '', permission: '' });
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const handleEdit = (config) => {
//     setForm({
//       page_name: config.page_name,
//       layout_path: config.layout_path,
//       role: config.role || '',
//       permission: config.permission || ''
//     });
//     setEditingId(config.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (confirm('¿Eliminar configuración?')) {
//       router.delete(`/admin/page-layouts/${id}`);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Head title="Gestor de Layouts por Página" />

//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Gestor de Layouts por Página</h1>
//         <p className="text-gray-600">
//           Asigna layouts específicos a cada página. El sistema detecta automáticamente las páginas creadas.
//         </p>
//       </div>

//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//           {success}
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Configuraciones Actuales</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Nueva Configuración
//         </button>
//       </div>

//       {/* Formulario */}
//       {(showForm || editingId) && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold mb-4">
//             {editingId ? 'Editar Configuración' : 'Nueva Configuración'}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Página</label>
//               <select
//                 value={form.page_name}
//                 onChange={e => setForm({...form, page_name: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 disabled={!!editingId}
//               >
//                 {availablePages.map(page => (
//                   <option key={page} value={page}>{page}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
//               <select
//                 value={form.layout_path}
//                 onChange={e => setForm({...form, layout_path: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               >
//                 {availableLayouts.map(layout => (
//                   <option key={layout} value={layout}>{layout}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Rol (opcional)</label>
//                 <select
//                   value={form.role}
//                   onChange={e => setForm({...form, role: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 >
//                   <option value="">-- Sin rol específico --</option>
//                   {availableRoles.map(role => (
//                     <option key={role} value={role}>{role}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Permiso (opcional)</label>
//                 <input
//                   type="text"
//                   value={form.permission}
//                   onChange={e => setForm({...form, permission: e.target.value})}
//                   placeholder="view-profile"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//               >
//                 {editingId ? 'Actualizar' : 'Guardar'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingId(null);
//                   setForm({ page_name: '', layout_path: '', role: '', permission: '' });
//                 }}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
//               >
//                 Cancelar
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Tabla de configuraciones */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Página</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layout</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permiso</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {configurations.map(config => (
//                 <tr key={config.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {config.page_name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500 font-mono">
//                     {config.layout_path}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {config.role || '—'}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {config.permission || '—'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       onClick={() => handleEdit(config)}
//                       className="text-blue-600 hover:text-blue-900 p-1 mr-2"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(config.id)}
//                       className="text-red-600 hover:text-red-900 p-1"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Instrucciones */}
//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//         <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Cómo funciona?</h3>
//         <ol className="list-decimal list-inside space-y-1 text-blue-800">
//           <li>Crea tus páginas en <code>resources/js/Pages/</code></li>
//           <li>El sistema las detecta automáticamente</li>
//           <li>Asigna un layout desde esta interfaz</li>
//           <li>¡Listo! La página usará el layout configurado sin código adicional</li>
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default PageLayouts;


// // resources/js/Pages/Admin/PageLayouts.jsx
// import React, { useState } from 'react';
// import { Head, router } from '@inertiajs/react';
// import { Plus, Trash2, Edit3 } from 'lucide-react';

// const PageLayouts = ({
//   configurations,
//   availablePages = [],
//   availableRoles = [],
//   availableLayouts = [],
//   success
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({
//     page_name: Array.isArray(availablePages) && availablePages.length > 0 ? availablePages[0] : '',
//     layout_path: Array.isArray(availableLayouts) && availableLayouts.length > 0 ? availableLayouts[0] : '',
//     role: '',
//     permission: ''
//   });

//   // ✅ Asegurar que sean arrays
//   const safeAvailablePages = Array.isArray(availablePages) ? availablePages : [];
//   const safeAvailableRoles = Array.isArray(availableRoles) ? availableRoles : [];
//   const safeAvailableLayouts = Array.isArray(availableLayouts) ? availableLayouts : [];

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editingId) {
//       router.put(`/admin/page-layouts/${editingId}`, form);
//     } else {
//       router.post('/admin/page-layouts', form);
//     }

//     setForm({
//       page_name: safeAvailablePages[0] || '',
//       layout_path: safeAvailableLayouts[0] || '',
//       role: '',
//       permission: ''
//     });
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const handleEdit = (config) => {
//     setForm({
//       page_name: config.page_name,
//       layout_path: config.layout_path,
//       role: config.role || '',
//       permission: config.permission || ''
//     });
//     setEditingId(config.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (confirm('¿Eliminar configuración?')) {
//       router.delete(`/admin/page-layouts/${id}`);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Head title="Gestor de Layouts por Página" />

//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Gestor de Layouts por Página</h1>
//         <p className="text-gray-600">
//           Asigna layouts específicos a cada página. El sistema detecta automáticamente las páginas creadas.
//         </p>
//       </div>

//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//           {success}
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Configuraciones Actuales</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Nueva Configuración
//         </button>
//       </div>

//       {/* Formulario */}
//       {(showForm || editingId) && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold mb-4">
//             {editingId ? 'Editar Configuración' : 'Nueva Configuración'}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Página</label>
//               <select
//                 value={form.page_name}
//                 onChange={e => setForm({...form, page_name: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 disabled={!!editingId}
//               >
//                 {safeAvailablePages.map(page => (
//                   <option key={page} value={page}>{page}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
//               <select
//                 value={form.layout_path}
//                 onChange={e => setForm({...form, layout_path: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               >
//                 {safeAvailableLayouts.map(layout => (
//                   <option key={layout} value={layout}>{layout}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Rol (opcional)</label>
//                 <select
//                   value={form.role}
//                   onChange={e => setForm({...form, role: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 >
//                   <option value="">-- Sin rol específico --</option>
//                   {safeAvailableRoles.map(role => (
//                     <option key={role} value={role}>{role}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Permiso (opcional)</label>
//                 <input
//                   type="text"
//                   value={form.permission}
//                   onChange={e => setForm({...form, permission: e.target.value})}
//                   placeholder="view-profile"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//               >
//                 {editingId ? 'Actualizar' : 'Guardar'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingId(null);
//                   setForm({
//                     page_name: safeAvailablePages[0] || '',
//                     layout_path: safeAvailableLayouts[0] || '',
//                     role: '',
//                     permission: ''
//                   });
//                 }}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
//               >
//                 Cancelar
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Tabla de configuraciones */}
//       <div className="bg-white rounded-xl border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Página</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layout</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permiso</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {configurations.map(config => (
//                 <tr key={config.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {config.page_name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500 font-mono">
//                     {config.layout_path}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {config.role || '—'}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {config.permission || '—'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       onClick={() => handleEdit(config)}
//                       className="text-blue-600 hover:text-blue-900 p-1 mr-2"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(config.id)}
//                       className="text-red-600 hover:text-red-900 p-1"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageLayouts;


// // resources/js/Pages/Admin/PageLayouts.jsx
// import React, { useState, useMemo } from 'react';
// import { Head, router } from '@inertiajs/react';
// import { Plus, Trash2, Edit3, Shield, Users, AlertTriangle, Tag } from 'lucide-react';

// const PageLayouts = ({
//   configurations,
//   availablePages = [],
//   availableRoles = [],
//   availablePermissions = [],
//   availableLayouts = [],
//   success
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({
//     page_name: Array.isArray(availablePages) && availablePages.length > 0 ? availablePages[0] : '',
//     layout_path: Array.isArray(availableLayouts) && availableLayouts.length > 0 ? availableLayouts[0] : '',
//     role: '',
//     permission: ''
//   });

//   // ✅ Asegurar que sean arrays
//   const safeAvailablePages = Array.isArray(availablePages) ? availablePages : [];
//   const safeAvailableRoles = Array.isArray(availableRoles) ? availableRoles : [];
//   const safeAvailablePermissions = Array.isArray(availablePermissions) ? availablePermissions : [];
//   const safeAvailableLayouts = Array.isArray(availableLayouts) ? availableLayouts : [];

//   // ✅ Agrupar permisos por categoría
//   const permissionsByCategory = useMemo(() => {
//     const grouped = {};
//     safeAvailablePermissions.forEach(perm => {
//       const category = perm.category || 'General';
//       if (!grouped[category]) {
//         grouped[category] = [];
//       }
//       grouped[category].push(perm);
//     });
//     return grouped;
//   }, [safeAvailablePermissions]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       router.put(`/admin/page-layouts/${editingId}`, form);
//     } else {
//       router.post('/admin/page-layouts', form);
//     }
//     setForm({
//       page_name: safeAvailablePages[0] || '',
//       layout_path: safeAvailableLayouts[0] || '',
//       role: '',
//       permission: ''
//     });
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const handleEdit = (config) => {
//     setForm({
//       page_name: config.page_name,
//       layout_path: config.layout_path,
//       role: config.role || '',
//       permission: config.permission || ''
//     });
//     setEditingId(config.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (confirm('¿Eliminar configuración?')) {
//       router.delete(`/admin/page-layouts/${id}`);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Head title="Gestor de Layouts por Página" />

//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Gestor de Layouts por Página</h1>
//         <p className="text-gray-600">
//           Asigna layouts específicos a cada página con control de acceso por roles y permisos.
//         </p>
//       </div>

//       {success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
//           {success}
//         </div>
//       )}

//       {/* Formulario */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           {editingId ? 'Editar Configuración' : 'Nueva Configuración'}
//         </h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Página */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Página</label>
//             <select
//               value={form.page_name}
//               onChange={e => setForm({...form, page_name: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Seleccione una página</option>
//               {safeAvailablePages.map(page => (
//                 <option key={page} value={page}>{page}</option>
//               ))}
//             </select>
//           </div>

//           {/* Layout */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
//             <select
//               value={form.layout_path}
//               onChange={e => setForm({...form, layout_path: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Seleccione un layout</option>
//               {safeAvailableLayouts.map(layout => (
//                 <option key={layout} value={layout}>{layout}</option>
//               ))}
//             </select>
//           </div>

//           {/* Rol */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
//             <select
//               value={form.role}
//               onChange={e => setForm({...form, role: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Sin rol específico</option>
//               {safeAvailableRoles.map(role => (
//                 <option key={role.name} value={role.name}>
//                   {role.display_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Permiso */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Permiso</label>
//             <select
//               value={form.permission}
//               onChange={e => setForm({...form, permission: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Sin permiso específico</option>
//               {Object.entries(permissionsByCategory).map(([category, perms]) => (
//                 <optgroup key={category} label={category}>
//                   {perms.map(perm => (
//                     <option key={perm.name} value={perm.name}>
//                       {perm.display_name}
//                     </option>
//                   ))}
//                 </optgroup>
//               ))}
//             </select>
//           </div>

//           {/* Botones */}
//           <div className="flex gap-2 md:col-span-2 lg:col-span-4">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               {editingId ? 'Actualizar Configuración' : 'Crear Configuración'}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingId(null);
//                 }}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
//               >
//                 Cancelar
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Tabla de configuraciones */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold">Configuraciones Actuales</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Página</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layout</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permiso</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {configurations.map(config => {
//                 const role = safeAvailableRoles.find(r => r.name === config.role);
//                 const permission = safeAvailablePermissions.find(p => p.name === config.permission);

//                 return (
//                   <tr key={config.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {config.page_name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500 font-mono">
//                       {config.layout_path}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       {role ? (
//                         <div className="flex items-center gap-2">
//                           <div className={`w-3 h-3 rounded-full ${role.color.replace('text-', 'bg-').replace('bg-', '')} ${role.color.includes('text-') ? role.color.replace('text-', 'bg-') : ''}`}></div>
//                           <span>{role.display_name}</span>
//                           {role.users_count > 0 && (
//                             <span className="text-xs text-gray-500">({role.users_count} usuarios)</span>
//                           )}
//                         </div>
//                       ) : config.role ? config.role : '—'}
//                     </td>
//                     <td className="px-6 py-4 text-sm">
//                       {permission ? (
//                         <div className="flex items-center gap-1">
//                           {permission.is_critical && (
//                             <AlertTriangle className="w-3 h-3 text-red-500" />
//                           )}
//                           <span>{permission.display_name}</span>
//                           <span className="text-xs text-gray-500">({permission.category})</span>
//                         </div>
//                       ) : config.permission ? config.permission : '—'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <button
//                         onClick={() => handleEdit(config)}
//                         className="text-blue-600 hover:text-blue-900 p-1 mr-2"
//                         title="Editar"
//                       >
//                         <Edit3 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(config.id)}
//                         className="text-red-600 hover:text-red-900 p-1"
//                         title="Eliminar"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Leyenda visual */}
//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//         <h3 className="text-sm font-semibold text-blue-900 mb-2">Iconos y colores</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
//           <div className="flex items-center gap-2">
//             <AlertTriangle className="w-3 h-3 text-red-500" />
//             <span>Permiso crítico (no se puede eliminar)</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 rounded-full bg-green-500"></div>
//             <span>Color del rol (configurable)</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageLayouts;


// resources/js/Pages/Admin/PageLayouts.jsx
import React, { useState, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2, Edit3, Shield, Users, AlertTriangle, Tag } from 'lucide-react';

import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

const PageLayouts = ({
  configurations,
  availablePages = [],
  availableRoles = [],
  availablePermissions = [],
  availableLayouts = [],
  success
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    page_name: Array.isArray(availablePages) && availablePages.length > 0 ? availablePages[0] : '',
    layout_path: Array.isArray(availableLayouts) && availableLayouts.length > 0 ? availableLayouts[0] : '',
    role: '',
    permission: ''
  });

  // ✅ Asegurar que sean arrays
  const safeAvailablePages = Array.isArray(availablePages) ? availablePages : [];
  const safeAvailableRoles = Array.isArray(availableRoles) ? availableRoles : [];
  const safeAvailablePermissions = Array.isArray(availablePermissions) ? availablePermissions : [];
  const safeAvailableLayouts = Array.isArray(availableLayouts) ? availableLayouts : [];

  // ✅ Agrupar permisos por categoría
  const permissionsByCategory = useMemo(() => {
    const grouped = {};
    safeAvailablePermissions.forEach(perm => {
      const category = perm.category || 'General';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(perm);
    });
    return grouped;
  }, [safeAvailablePermissions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // ✅ Usar route() directamente (viene con Inertia)
      router.put(route('admin.page-layouts.update', { pageLayout: editingId }), form);
    } else {
      // ✅ Usar route() directamente (viene con Inertia)
      router.post(route('admin.page-layouts.store'), form);
    }

    setForm({
      page_name: safeAvailablePages[0] || '',
      layout_path: safeAvailableLayouts[0] || '',
      role: '',
      permission: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (config) => {
    setForm({
      page_name: config.page_name,
      layout_path: config.layout_path,
      role: config.role || '',
      permission: config.permission || ''
    });
    setEditingId(config.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar configuración?')) {
      // ✅ Usar route() directamente (viene con Inertia)
      router.delete(route('admin.page-layouts.destroy', { pageLayout: id }));
    }
  };

  return (

    <AutoLayoutResolver>
    <div className="space-y-6">
      <Head title="Gestor de Layouts por Página" />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestor de Layouts por Página</h1>
        <p className="text-gray-600">
          Asigna layouts específicos a cada página con control de acceso por roles y permisos.
        </p>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Formulario */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Editar Configuración' : 'Nueva Configuración'}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Página */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Página</label>
            <select
              value={form.page_name}
              onChange={e => setForm({...form, page_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Seleccione una página</option>
              {safeAvailablePages.map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          </div>

          {/* Layout */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
            <select
              value={form.layout_path}
              onChange={e => setForm({...form, layout_path: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Seleccione un layout</option>
              {safeAvailableLayouts.map(layout => (
                <option key={layout} value={layout}>{layout}</option>
              ))}
            </select>
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              value={form.role}
              onChange={e => setForm({...form, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sin rol específico</option>
              {safeAvailableRoles.map(role => (
                <option key={role.name} value={role.name}>
                  {role.display_name}
                </option>
              ))}
            </select>
          </div>

          {/* Permiso */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Permiso</label>
            <select
              value={form.permission}
              onChange={e => setForm({...form, permission: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sin permiso específico</option>
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                <optgroup key={category} label={category}>
                  {perms.map(perm => (
                    <option key={perm.name} value={perm.name}>
                      {perm.display_name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-2 md:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {editingId ? 'Actualizar Configuración' : 'Crear Configuración'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla de configuraciones */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Configuraciones Actuales</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Página</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layout</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permiso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {configurations.map(config => {
                const role = safeAvailableRoles.find(r => r.name === config.role);
                const permission = safeAvailablePermissions.find(p => p.name === config.permission);

                return (
                  <tr key={config.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {config.page_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      {config.layout_path}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {role ? (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${role.color.replace('text-', 'bg-').replace('bg-', '')} ${role.color.includes('text-') ? role.color.replace('text-', 'bg-') : ''}`}></div>
                          <span>{role.display_name}</span>
                          {role.users_count > 0 && (
                            <span className="text-xs text-gray-500">({role.users_count} usuarios)</span>
                          )}
                        </div>
                      ) : config.role ? config.role : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {permission ? (
                        <div className="flex items-center gap-1">
                          {permission.is_critical && (
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                          )}
                          <span>{permission.display_name}</span>
                          <span className="text-xs text-gray-500">({permission.category})</span>
                        </div>
                      ) : config.permission ? config.permission : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEdit(config)}
                        className="text-blue-600 hover:text-blue-900 p-1 mr-2"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(config.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leyenda visual */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Iconos y colores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span>Permiso crítico (no se puede eliminar)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Color del rol (configurable)</span>
          </div>
        </div>
      </div>
    </div>
    </AutoLayoutResolver>
  );
};

export default PageLayouts;
