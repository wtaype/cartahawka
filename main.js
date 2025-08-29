import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth, db } from './firebase/init.js';
import { onAuthStateChanged } from "firebase/auth"; //Para detectar cambios Login 
import { getFirestore, doc, setDoc, getDoc, getDocs, deleteDoc, onSnapshot, collection, query, where, writeBatch, serverTimestamp, limit} from "firebase/firestore";
import { wiTema, Mensaje, Notificacion, savels, getls, removels, gosaves, getsaves, adtm, infoo, accederRol } from './widev.js';
import { wiAuth } from './wiauth.js'; //Para autenticación login, registro y Restablecer

// PARA LIMPIAR INICIO DE SESSION + CONECTARSE AL SESION 
onAuthStateChanged(auth, async user => {
  if(!user) return (removels('wiAuthIn'), removels('wiAuthRol'));

  if (getls('wiAuthIn')){
    const cacheRol = getls('wiAuthRol');
    if(cacheRol) return accederRol(cacheRol);  //Cache primero  

    const busq = await getDocs(query(collection(db, 'smiles'), where('email', '==', user.email)));
    accederRol(busq.docs[0]?.data()?.rol); // Luego hacemos consultas si no tiene, primera vez
  } // Acceso cuando es autenticado de acuerdo a roles 
});

// Mensaje('Hola mi vidita hermosa muaaaak');
// PARA ACTUALIZAR ALTURA DE CADA MENU Y CARTA 
const syncHeights = () => {
  $('.webz').each(function () {
    const h = $(this).find('.weby').outerHeight();
    $(this).find('.webx').css('height', h + 'px');
  });
};

$(syncHeights);
$(window).on('load resize', syncHeights); 


$(syncHeights);
$(window).on('load resize orientationchange', syncHeights);

// ==============================
// JS PARA MENU DINAMICO [Start]
// ==============================
const HEADERS = {
  1: { title: 'DESAYUNOS' },
  2: { title: '🍳 BRUNCH', note: '👉 Upgrade tu bebida a cappuccino o jugo premium (naranja, fresa, maracuyá) por +S/4' },
  3: { title: '➕ ADICIONALES' }, // y luego 🥪 TRIPLES si deseas otra sub-sección
  4: { title: 'SÁNDWICHES CLÁSICOS 🥙', note: '👉 Agrega papas fritas por +S/6' },
  5: { title: '🥩 SÁNDWICHES PREMIUM (con papas fritas)' },
  6: { title: '🍔 HAMBURGUESAS' },
  7: { title: '🥗 ENSALADAS / 🍰 DULCES' }
};

const priceTxt = v => (v==null || v==='') ? '' : `S/${Number(v).toFixed(2)}`;

// Render de una hoja
function renderHoja(num, items) {
  const h = HEADERS[num] || {};
  const note = h.note ? `<p class="menu-note">${h.note}</p>` : '';
  const bodyItems = items.map(it => `
    <div class="menu-item">
      <div class="item-header">
        <h3>${it.titulo || ''}</h3>
        <span class="price">${priceTxt(it.precio)}</span>
      </div>
      ${it.descripcion ? `<p class="description">${it.descripcion}</p>` : ''}
      <div class="dotted-line"></div>
    </div>
  `).join('');

  return `
    <div class="webz">
      <div class="webx">
        <img src="menu.avif" alt="Imagen del menú">
      </div>
      <div class="weby">
        <div class="menu-column">
          <header class="menu-header">
            <h2 class="menu-category">${h.title || ''}</h2>
            ${note}
          </header>
          <div class="menu-content">
            ${bodyItems || ''}
          </div>
        </div>
      </div>
    </div>
    <div class="separador"> ${num} </div>
  `;
}

async function cargarCartasPublico() {
  const ROOT = $('#menu-app');
  const CACHE_KEY = 'cartasdbCachePublic';
  const CACHE_HRS = 6;

  // Usa cache si no hay ?refresh
  let data = getls(CACHE_KEY) || [];
  const needsRefresh = /\brefresh=1\b/i.test(location.search);

  const pintar = (arr) => {
    // Agrupa por hoja y ordena
    const grupos = {};
    arr.filter(x => (x.estado||'').toLowerCase() === 'activo')
       .forEach(x => {
          const hoja = Number(x.hoja||0);
          if(!hoja) return;
          (grupos[hoja] ||= []).push(x);
       });

    const html = [1,2,3,4,5,6,7].map(n => {
      const items = (grupos[n]||[]).sort((a,b)=>{
        const ao = Number(a.orden||0), bo = Number(b.orden||0);
        if(ao!==bo) return ao-bo;
        return String(a.titulo||'').localeCompare(String(b.titulo||''));
      });
      return renderHoja(n, items);
    }).join('');

    ROOT.html(html);
    // Ajustar alturas (fuentes primero)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.finally(syncHeights);
    } else {
      syncHeights();
    }
  };

  if (data.length && !needsRefresh) {
    pintar(data);
  }

  // Carga online y cachea (1 lectura)
  try {
    const snap = await getDocs(query(collection(db, 'cartasdb'), limit(500)));
    data = snap.docs.map(d => ({ id:d.id, ...d.data() }));
    savels(CACHE_KEY, data, CACHE_HRS);
    pintar(data);
  } catch(e){
    console.error(e);
    if(!data.length) {
      $('#menu-app').html('<p style="text-align:center;padding:2rem">No se pudo cargar el menú.</p>');
    }
  }
}

$(cargarCartasPublico);
// ==============================
// JS PARA MENU DINAMICO [End]
// ==============================