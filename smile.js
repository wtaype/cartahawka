import $ from 'jquery';
import { wiAuth } from './wiauth.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth, db } from './firebase/init.js';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, getDocs, deleteDoc, onSnapshot, collection, query, where, writeBatch, serverTimestamp, limit} from "firebase/firestore";
import { wiTema, Capi, Mensaje, Notificacion, savels, getls, removels, accederRol, gosaves, getsaves, adtm, infoo, showLoading } from './widev.js';

// 🔐 GESTIÓN DE AUTENTICACIÓN EN DASHBOARD
onAuthStateChanged(auth, async user => {
  if(!user) return window.location.href = '/'; 
  try{
    const wi = getls('wiSmile');
    if(wi) return smileContenido(wi); 

    const busq = await getDocs(query(collection(db, 'smiles'), where('usuario', '==', user.displayName)));
    const widt = busq.docs[0].data(); savels('wiSmile', widt, 450); smileContenido(widt);
  }catch(e){console.error(e)}
});

$(document).on('click', '.bt_salir', async () => {
  await signOut(auth); window.location.href = '/';
  try{localStorage.clear();}catch(_){Object.keys(localStorage).forEach(k=>localStorage.removeItem(k));}
});

$(document).on('click','.bt_cargar',()=>{
  const pattern=/^(im\d+|ki\d+|remote:im\d+|dirty:im\d+|dirty:ki\d+)$/;
  Object.keys(localStorage).filter(k=>pattern.test(k)).forEach(k=>localStorage.removeItem(k));
  Mensaje('Actualizado'); setTimeout(()=>location.reload(),800);
});

// DIOS SIEMPRE ES BUENO Y YO AMO A DIOS [START]
function smileContenido(wi){
  console.log(wi.nombre);
  Mensaje('Bienvenido ' + wi.nombre + '!');
// HTML CONTENIDO [Start] 
  $('.app').html(`
    <header class="hd">
      <nav class="nv dfw wdp">
        <a class="logo nv_left" href="#Logo">
          <h1>
            <span class="nv_titulo"><i class="fas fa-utensils logo-icon"></i> Cartas Hawka</span>
            <span class="nv_descri">| Administra títulos, descripciones y precios</span>
          </h1>
        </a>
        <div class="logo nv_right dfw">
          <div class="witemas dpf"></div>
          <button class="bt_recargar" title="Recargar datos"><i class="fa-solid fa-arrow-rotate-right"></i></button>
          <button class="bt_login"><i class="fas fa-user"></i> ${wi.usuario}</button>
          <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> Salir</button>
        </div>
      </nav>
    </header>

    <main class="dashboard-grid">
      <!-- Sección 1: Gestión de Hojas -->
      <section class="section-1">
        <div class="section-header">
          <h2><i class="fas fa-layer-group"></i> Hojas</h2>
          <button class="bt_add_hoja"><i class="fa fa-plus"></i> ADD</button>
        </div>
        <div class="hojas-list" id="hojasList">
          <!-- Hojas dinámicas aquí -->
        </div>
      </section>

      <!-- Sección 2: Lista de Platos -->
      <section class="section-2">
        <div class="section-header">
          <h2><i class="fas fa-list"></i> Seleccionado: <span id="hojaSeleccionada">Hoja 1</span></h2>
          <button class="bt_add_plato"><i class="fa fa-plus"></i> ADD</button>
        </div>
        <div class="platos-list" id="platosList">
          <!-- Platos dinámicos aquí -->
        </div>
      </section>

      <!-- Sección 3: Editor de Plato -->
      <section class="section-3">
        <div class="section-header">
          <h2><i class="fas fa-edit"></i> Seleccionado: <span id="platoSeleccionado">Selecciona un plato</span></h2>
        </div>
        <div class="plato-editor" id="platoEditor">
          <div class="editor-field">
            <label>Título <span class="field-tip">Ingresa el nombre del plato</span></label>
            <input type="text" id="editorTitulo" placeholder="Ej: CONTINENTAL" />
          </div>
          <div class="editor-field">
            <label>Descripción <span class="field-tip">Detalla los ingredientes</span></label>
            <textarea id="editorDescripcion" placeholder="Jugo de piña o papaya + pan con mantequilla..."></textarea>
          </div>
          <div class="editor-field">
            <label>Precio <span class="field-tip">Solo números con decimales. Ej: 19.90</span></label>
            <input type="number" id="editorPrecio" placeholder="19.90" min="0" step="0.01" />
          </div>
          <div class="editor-field">
            <label>Orden <span class="field-tip">Orden de aparición (se asigna automáticamente)</span></label>
            <input type="number" id="editorOrden" placeholder="1" min="0" step="1" />
          </div>
          <div class="editor-field">
            <label>Estado</label>
            <select id="editorEstado">
              <option value="activo">Disponible</option>
              <option value="desactivo">No disponible</option>
            </select>
          </div>
          <div class="editor-actions">
            <button class="bt_guardar_plato" data-original="<i class='fa fa-save'></i> Guardar">
              <i class="fa fa-save"></i> Guardar
            </button>
            <button class="bt_eliminar_plato" data-original="<i class='fa fa-trash'></i> Eliminar">
              <i class="fa fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </section>

      <!-- Sección 4: Vista Previa -->
      <section class="section-4">
        <div class="section-header">
          <h2><i class="fas fa-eye"></i> Vista previa de Hoja</h2>
        </div>
        <div class="preview-container" id="previewContainer">
          <!-- Vista previa aquí -->
        </div>
      </section>
    </main>

    <footer class='foo hwb txc'>
      <p>Creado con<i class="fa fa-heart"></i>by<a class='ftx lkme' href='https://wtaype.github.io/' target='_blank'>@wilder.taype</a>2025 - <span class="wty"></span><span class="abw tm11042025" id="101542394703517594">| Acerca del app | Actualizado</span><span class="wtu"></span></p>
    </footer>
  `); 
// HTML CONTENIDO [end] 

// JS  CONTENIDO [Start] 
  const COL_HOJAS = 'hojasdb';
  const COL_CARTAS = 'cartasdb';
  const CACHE_HOJAS = 'hojasdbCache';
  const CACHE_CARTAS = 'cartasdbCache';
  const CACHE_HRS_HOJAS = 24;
  const CACHE_HRS_CARTAS = 6;

  let hojas = getls(CACHE_HOJAS) || [];
  let cartas = getls(CACHE_CARTAS) || [];
  let hojaActiva = 1;
  let platoActivo = null;
  let hojasDirty = new Set();
  let cartasDirty = new Set();
  let tempCounter = 1; // Para IDs temporales

  const norm = s => (s||'').toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').trim();
  const fmtFecha = ts => ts?.toDate?.() ? ts.toDate().toLocaleString('es-PE') : '';
  const fmtPrecio = p => p == null ? '0.00' : Number(p).toFixed(2);

  // Funciones para botones con spinner
  const setSpinning = ($btn, isSpinning) => {
    if (isSpinning) {
      const current = $btn.html();
      $btn.data('original', current)
           .prop('disabled', true)
           .addClass('spinning')
           .html('<i class="fa fa-spinner fa-spin"></i> Guardando...');
    } else {
      $btn.prop('disabled', false)
           .removeClass('spinning')
           .html($btn.data('original') || $btn.html());
    }
  };

  const setDeleting = ($btn, isDeleting) => {
    if (isDeleting) {
      const current = $btn.html();
      $btn.data('original', current)
           .prop('disabled', true)
           .addClass('deleting')
           .html('<i class="fa fa-spinner fa-spin"></i> Eliminando...');
    } else {
      $btn.prop('disabled', false)
           .removeClass('deleting')
           .html($btn.data('original') || $btn.html());
    }
  };

  // Obtener hoja por número
  const getHoja = num => hojas.find(h => h.numero === num) || null;
  const getCartasPorHoja = num => cartas.filter(c => c.hoja === num);

  // Generar IDs únicos
  // const nextHojaId = () => `hoja_${Math.max(0, ...hojas.map(h => h.numero || 0)) + 1}`;
  const nextHojaId = () => `hoja_${Math.max(0, ...hojas.filter(h => !h.id.startsWith('temp_') && h.id.startsWith('hoja_')).map(h => parseInt(h.id.replace('hoja_', '')) || 0)) + 1}`;
  const nextCartaId = () => `carta_h${String(Math.max(0, ...cartas.map(d => +(d.id.match(/carta_h(\d+)/)?.[1]||0))) + 1).padStart(2,'0')}`;
  const nextTempId = () => `temp_${tempCounter++}`;

  // Renderizar Sección 1: Hojas
  const renderHojas = () => {
    const $lista = $('#hojasList');
    $lista.html('');
    
    const hojasOrdenadas = hojas.slice().sort((a,b) => (a.numero||0) - (b.numero||0));
    
    hojasOrdenadas.forEach(hoja => {
      const cantidadPlatos = getCartasPorHoja(hoja.numero).filter(c => c.estado === 'activo').length;
      const isActive = hojaActiva === hoja.numero ? 'active' : '';
      const isDirty = hojasDirty.has(hoja.id) ? 'dirty' : '';
      const isTemp = hoja.id.startsWith('temp_') ? 'temp-item' : '';
      
      const $hoja = $(`
        <div class="hoja-item ${isActive} ${isDirty} ${isTemp}" data-hoja="${hoja.numero}" data-id="${hoja.id}">
          <div class="hoja-content">
            <div class="hoja-icon">
              <i class="fas ${hoja.icono || 'fa-utensils'}"></i>
            </div>
            <div class="hoja-info">
              <h3>Hoja ${hoja.numero}</h3>
              <input type="text" class="hoja-titulo" value="${hoja.titulo || ''}" placeholder="Título de la hoja" />
              <div class="imagen-group">
                <input type="url" class="hoja-imagen" value="${hoja.imagen || ''}" placeholder="https://i.postimg.cc/..." />
                <i class="fas fa-info-circle imagen-info" title="Ingresa un link de imagen válido (postimg.cc recomendado)"></i>
              </div>
              <small>${cantidadPlatos} platos activos ${isTemp ? '(sin guardar)' : ''}</small>
            </div>
          </div>
          <div class="hoja-actions">
            <button class="bt_guardar_hoja" title="Guardar cambios" data-original="<i class='fa fa-save'></i>">
              <i class="fa fa-save"></i>
            </button>
            <button class="bt_eliminar_hoja" title="Eliminar hoja" data-original="<i class='fa fa-trash'></i>">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      `);
      
      $lista.append($hoja);
    });

    if (hojas.length === 0) {
      $lista.html('<div class="empty-state"><i class="fas fa-layer-group"></i><p>No hay hojas creadas</p></div>');
    }
  };

  // Renderizar Sección 2: Platos
  const renderPlatos = () => {
    const $lista = $('#platosList');
    const $titulo = $('#hojaSeleccionada');
    
    const hoja = getHoja(hojaActiva);
    const platos = getCartasPorHoja(hojaActiva).sort((a,b) => {
      const ao = Number(a.orden||0), bo = Number(b.orden||0);
      if(ao !== bo) return ao - bo;
      return String(a.titulo||'').localeCompare(String(b.titulo||''));
    });

    $titulo.text(`${hoja?.titulo || 'Sin título'}`);
    $lista.html('');

    platos.forEach(plato => {
      const isActive = platoActivo === plato.id ? 'active' : '';
      const isDirty = cartasDirty.has(plato.id) ? 'dirty' : '';
      const isTemp = plato.id.startsWith('temp_') ? 'temp-item' : '';
      const estadoIcon = plato.estado === 'activo' ? 'fa-check-circle' : 'fa-times-circle';
      const estadoClass = plato.estado === 'activo' ? 'disponible' : 'no-disponible';
      
      const $plato = $(`
        <div class="plato-item ${isActive} ${estadoClass} ${isDirty} ${isTemp}" data-id="${plato.id}">
          <div class="plato-content">
            <div class="plato-orden">${plato.orden || 0}</div>
            <div class="plato-info">
              <h4>${plato.titulo || 'Sin título'} ${isTemp ? '(nuevo)' : ''}</h4>
              <p>${(plato.descripcion || '').substring(0, 50)}${(plato.descripcion||'').length > 50 ? '...' : ''}</p>
              <span class="plato-precio">S/ ${fmtPrecio(plato.precio)}</span>
            </div>
            <div class="plato-estado">
              <i class="fas ${estadoIcon}"></i>
            </div>
          </div>
        </div>
      `);
      
      $lista.append($plato);
    });

    if (platos.length === 0) {
      $lista.html('<div class="empty-state"><i class="fas fa-utensils"></i><p>No hay platos en esta hoja</p></div>');
    }
  };

  // Renderizar Sección 3: Editor
  const renderEditor = () => {
    const plato = platoActivo ? cartas.find(p => p.id === platoActivo) : null;
    const $titulo = $('#platoSeleccionado');
    
    if (!plato) {
      $titulo.text('Selecciona un plato para editar');
      $('#editorTitulo').val('');
      $('#editorDescripcion').val('');
      $('#editorPrecio').val('');
      $('#editorOrden').val('');
      $('#editorEstado').val('activo');
      return;
    }

    const statusText = plato.id.startsWith('temp_') ? ' (nuevo - sin guardar)' : '';
    $titulo.text(`Hoja ${plato.hoja} - ${plato.titulo || 'Sin título'}${statusText}`);
    $('#editorTitulo').val(plato.titulo || '');
    $('#editorDescripcion').val(plato.descripcion || '');
    $('#editorPrecio').val(plato.precio || '');
    $('#editorOrden').val(plato.orden || 0);
    $('#editorEstado').val(plato.estado || 'activo');
  };

  // Renderizar Sección 4: Vista Previa
  const renderPreview = () => {
    const $container = $('#previewContainer');
    const hoja = getHoja(hojaActiva);
    const platos = getCartasPorHoja(hojaActiva)
                    .filter(p => p.estado === 'activo')
                    .sort((a,b) => {
                      const ao = Number(a.orden||0), bo = Number(b.orden||0);
                      if(ao !== bo) return ao - bo;
                      return String(a.titulo||'').localeCompare(String(b.titulo||''));
                    });

    const platosHtml = platos.map(plato => `
      <div class="preview-item">
        <div class="preview-header">
          <h3>${plato.titulo || 'Sin título'}</h3>
          <span class="preview-price">S/ ${fmtPrecio(plato.precio)}</span>
        </div>
        <p class="preview-description">${plato.descripcion || ''}</p>
        <div class="preview-divider"></div>
      </div>
    `).join('');

    const imagenPreview = hoja?.imagen ? 
      `<img src="${hoja.imagen}" alt="Menu imagen" class="preview-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg=='" />` : 
      `<div class="no-image"><i class="fas fa-image"></i><p>Sin imagen</p></div>`;

    $container.html(`
      <div class="mobile-preview">
        <div class="preview-header-section">
          ${imagenPreview}
        </div>
        <div class="preview-content">
          <h2 class="preview-title">
            <i class="fas ${hoja?.icono || 'fa-utensils'}"></i>
            ${hoja?.titulo || 'Sin título'}
          </h2>
          <div class="preview-items">
            ${platos.length ? platosHtml : '<p class="no-items">No hay platos disponibles</p>'}
          </div>
        </div>
      </div>
    `);
  };

  // Cargar datos online
  const leerOnline = async () => {
    try{
      showLoading(true);
      
      const [snapHojas, snapCartas] = await Promise.all([
        getDocs(query(collection(db, COL_HOJAS), limit(50))),
        getDocs(query(collection(db, COL_CARTAS), limit(500)))
      ]);
      
      hojas = snapHojas.docs.map(d => ({ id: d.id, ...d.data() }));
      cartas = snapCartas.docs.map(d => ({ id: d.id, ...d.data() }));
      
      savels(CACHE_HOJAS, hojas, CACHE_HRS_HOJAS);
      savels(CACHE_CARTAS, cartas, CACHE_HRS_CARTAS);
      
      renderAll();
      Notificacion('Datos cargados exitosamente', 'success', 1800);
      
    }catch(e){ 
      console.error(e); 
      Notificacion('Error al cargar datos', 'error'); 
    }
    finally{ showLoading(false); }
  };

  const renderAll = () => {
    renderHojas();
    renderPlatos();
    renderEditor();
    renderPreview();
  };

  // Event Listeners
  $(document).on('click', '.hoja-item', function(){
    const nuevaHoja = Number($(this).data('hoja'));
    if (nuevaHoja !== hojaActiva) {
      hojaActiva = nuevaHoja;
      platoActivo = null;
      $('.hoja-item').removeClass('active');
      $(this).addClass('active');
      renderPlatos();
      renderEditor();
      renderPreview();
    }
  });

  $(document).on('click', '.plato-item', function(){
    const nuevoPlato = $(this).data('id');
    if (nuevoPlato !== platoActivo) {
      platoActivo = nuevoPlato;
      $('.plato-item').removeClass('active');
      $(this).addClass('active');
      renderEditor();
    }
  });

  // Marcar como sucio al editar hojas
  $(document).on('input', '.hoja-titulo, .hoja-imagen', function(){
    const hojaId = $(this).closest('.hoja-item').data('id');
    hojasDirty.add(hojaId);
    $(this).closest('.hoja-item').addClass('dirty');
  });

  // Marcar como sucio al editar platos
  $(document).on('input change', '#editorTitulo, #editorDescripcion, #editorPrecio, #editorOrden, #editorEstado', function(){
    if (platoActivo) {
      cartasDirty.add(platoActivo);
      $(`.plato-item[data-id="${platoActivo}"]`).addClass('dirty');
    }
  });

  // ✅ OPTIMIZADO: Agregar nueva hoja (solo local, 0 writes)
  $(document).on('click', '.bt_add_hoja', function(){
    const siguienteNumero = Math.max(0, ...hojas.map(h => h.numero || 0)) + 1;
    const tempId = nextTempId();
    
    const nuevaHoja = {
      id: tempId,
      numero: siguienteNumero,
      titulo: `Nueva Hoja ${siguienteNumero}`,
      icono: 'fa-utensils',
      imagen: '',
      estado: 'activo',
      orden: siguienteNumero,
      // No ponemos timestamps hasta guardar
    };

    hojas.push(nuevaHoja);
    hojasDirty.add(tempId);
    hojaActiva = siguienteNumero;
    renderAll();
    Notificacion('Nueva hoja agregada - Recuerda guardar', 'info', 2000);
  });

  // ✅ OPTIMIZADO: Guardar hoja individual (1 write)
  $(document).on('click', '.bt_guardar_hoja', async function(){
    const $btn = $(this);
    const $item = $btn.closest('.hoja-item');
    const hojaId = $item.data('id');
    const hoja = hojas.find(h => h.id === hojaId);
    if (!hoja) return;

    const titulo = $item.find('.hoja-titulo').val().trim();
    const imagen = $item.find('.hoja-imagen').val().trim();

    if (!titulo) return Notificacion('El título es requerido', 'warning');

    try{
      setSpinning($btn, true);
      
      // Si es temporal, crear con ID real
      const isTemp = hojaId.startsWith('temp_');
      const realId = isTemp ? nextHojaId() : hojaId;
      
      const dataToSave = {
        numero: hoja.numero,
        titulo,
        imagen,
        icono: hoja.icono,
        estado: hoja.estado,
        orden: hoja.orden,
        creacion: isTemp ? serverTimestamp() : hoja.creacion,
        actualizacion: serverTimestamp()
      };

      await setDoc(doc(db, COL_HOJAS, realId), dataToSave);

      // Actualizar en local
      if (isTemp) {
        // Reemplazar temporal con real
        const index = hojas.findIndex(h => h.id === hojaId);
        hojas[index] = { id: realId, ...dataToSave };
        hojasDirty.delete(hojaId);
      } else {
        Object.assign(hoja, { titulo, imagen });
        hojasDirty.delete(hojaId);
      }
      
      savels(CACHE_HOJAS, hojas, CACHE_HRS_HOJAS);
      renderAll();
      Mensaje('Hoja guardada exitosamente');
      
    }catch(e){
      console.error(e);
      Notificacion('Error al guardar hoja', 'error');
    }
    finally{ setSpinning($btn, false); }
  });

  // ✅ OPTIMIZADO: Agregar nuevo plato (solo local, 0 writes)
  $(document).on('click', '.bt_add_plato', function(){
    if (!getHoja(hojaActiva)) {
      return Notificacion('Crea una hoja primero', 'warning');
    }

    const tempId = nextTempId();
    const ordenMax = Math.max(0, ...getCartasPorHoja(hojaActiva).map(d => +d.orden||0)) + 1;
    
    const nuevoPlato = {
      id: tempId,
      titulo: 'NUEVO PLATO',
      descripcion: '',
      precio: null,
      estado: 'activo',
      hoja: hojaActiva,
      orden: ordenMax,
      // No ponemos timestamps hasta guardar
    };

    cartas.push(nuevoPlato);
    cartasDirty.add(tempId);
    platoActivo = tempId;
    renderAll();
    Notificacion('Nuevo plato agregado - Recuerda guardar', 'info', 2000);
  });

  // ✅ OPTIMIZADO: Guardar plato (1 write con spinner mejorado)
  $(document).on('click', '.bt_guardar_plato', async function(){
    if(!platoActivo) return Notificacion('Selecciona un plato', 'warning');
    
    const $btn = $(this);
    const plato = cartas.find(p => p.id === platoActivo);
    if(!plato) return;

    const titulo = $('#editorTitulo').val().trim();
    const descripcion = $('#editorDescripcion').val().trim();
    const precio = $('#editorPrecio').val();
    const orden = Number($('#editorOrden').val()) || 0;
    const estado = $('#editorEstado').val();

    if(!titulo) return Notificacion('El título es requerido', 'warning');

    const precioFinal = precio === '' ? null : Number(precio);
    if (precio !== '' && (isNaN(precioFinal) || precioFinal < 0)) {
      return Notificacion('Precio debe ser un número válido', 'warning');
    }

    try{
      setSpinning($btn, true);
      
      // Si es temporal, crear con ID real
      const isTemp = platoActivo.startsWith('temp_');
      const realId = isTemp ? nextCartaId() : platoActivo;
      
      const dataToSave = {
        titulo,
        descripcion,
        precio: precioFinal,
        orden,
        estado,
        hoja: plato.hoja,
        creacion: isTemp ? serverTimestamp() : plato.creacion,
        actualizacion: serverTimestamp()
      };

      await setDoc(doc(db, COL_CARTAS, realId), dataToSave);

      // Actualizar en local
      if (isTemp) {
        // Reemplazar temporal con real
        const index = cartas.findIndex(p => p.id === platoActivo);
        cartas[index] = { id: realId, ...dataToSave };
        cartasDirty.delete(platoActivo);
        platoActivo = realId;
      } else {
        Object.assign(plato, { titulo, descripcion, precio: precioFinal, orden, estado });
        cartasDirty.delete(platoActivo);
      }
      
      savels(CACHE_CARTAS, cartas, CACHE_HRS_CARTAS);
      renderAll();
      Mensaje('Plato guardado exitosamente');
      
    }catch(e){
      console.error(e);
      Notificacion('Error al guardar plato', 'error');
    }
    finally{ setSpinning($btn, false); }
  });

  // ✅ OPTIMIZADO: Eliminar plato (1 write con spinner)
  $(document).on('click', '.bt_eliminar_plato', async function(){
    if(!platoActivo) return Notificacion('Selecciona un plato', 'warning');
    
    const $btn = $(this);
    const plato = cartas.find(p => p.id === platoActivo);
    if(!confirm(`¿Eliminar "${plato?.titulo || platoActivo}"?`)) return;

    try{
      setDeleting($btn, true);
      
      // Solo eliminar de Firebase si no es temporal
      if (!platoActivo.startsWith('temp_')) {
        await deleteDoc(doc(db, COL_CARTAS, platoActivo));
      }
      
      // Actualizar local
      cartas = cartas.filter(p => p.id !== platoActivo);
      cartasDirty.delete(platoActivo);
      savels(CACHE_CARTAS, cartas, CACHE_HRS_CARTAS);
      platoActivo = null;
      renderAll();
      Mensaje('Plato eliminado exitosamente');
      
    }catch(e){
      console.error(e);
      Notificacion('Error al eliminar plato', 'error');
    }
    finally{ setDeleting($btn, false); }
  });

  // ✅ OPTIMIZADO: Eliminar hoja (batch write con spinner)
  $(document).on('click', '.bt_eliminar_hoja', async function(){
    const $btn = $(this);
    const $item = $btn.closest('.hoja-item');
    const hojaId = $item.data('id');
    const hoja = hojas.find(h => h.id === hojaId);
    if(!hoja) return;

    const platosEnHoja = getCartasPorHoja(hoja.numero);
    let mensaje = `¿Eliminar hoja "${hoja.titulo}"?`;
    if (platosEnHoja.length > 0) {
      mensaje += `\n\nAdvertencia: También se eliminarán ${platosEnHoja.length} platos de esta hoja.`;
    }
    
    if(!confirm(mensaje)) return;

    try{
      setDeleting($btn, true);
      
      // Solo hacer batch si no es temporal
      if (!hojaId.startsWith('temp_')) {
        const batch = writeBatch(db);
        batch.delete(doc(db, COL_HOJAS, hojaId));
        
        platosEnHoja.forEach(plato => {
          if (!plato.id.startsWith('temp_')) {
            batch.delete(doc(db, COL_CARTAS, plato.id));
          }
        });
        
        await batch.commit();
      }
      
      // Actualizar cache local
      hojas = hojas.filter(h => h.id !== hojaId);
      cartas = cartas.filter(c => c.hoja !== hoja.numero);
      
      savels(CACHE_HOJAS, hojas, CACHE_HRS_HOJAS);
      savels(CACHE_CARTAS, cartas, CACHE_HRS_CARTAS);
      
      hojasDirty.delete(hojaId);
      platoActivo = null;
      
      if (hojaActiva === hoja.numero) {
        hojaActiva = hojas.length > 0 ? hojas[0].numero : 1;
      }
      
      renderAll();
      Mensaje(`Hoja eliminada${platosEnHoja.length > 0 ? ` junto con ${platosEnHoja.length} platos` : ''}`);
      
    }catch(e){
      console.error(e);
      Notificacion('Error al eliminar hoja', 'error');
    }
    finally{ setDeleting($btn, false); }
  });

  $(document).on('click', '.bt_recargar', () => leerOnline());

  // Auto-save local con gosaves
  gosaves('.hoja-titulo, .hoja-imagen', 'data-temp-id', $el => $el.val());
  gosaves('#editorTitulo, #editorDescripcion, #editorPrecio, #editorOrden, #editorEstado', 'id', $el => $el.val());

  // Restaurar valores locales
  getsaves('.hoja-titulo, .hoja-imagen', 'data-temp-id', ($el, val) => $el.val(val));
  getsaves('#editorTitulo, #editorDescripcion, #editorPrecio, #editorOrden, #editorEstado', 'id', ($el, val) => $el.val(val));

  // Inicializar
  renderAll();
  
  if (hojas.length === 0 || cartas.length === 0) {
    leerOnline();
  }
// JS  CONTENIDO [End] 

}// DIOS SIEMPRE ES BUENO Y YO AMO A DIOS [END]