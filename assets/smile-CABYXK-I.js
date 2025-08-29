import{o as sa,g as W,a as M,q as R,c as Z,d as g,w as na,s as j,e as Y,$ as i,f as la,M as C,N as h,h as D,i as J,j as H,k as ca,m as ra,n as V,p as F,t as Q,l as U}from"./widev-CRmnv79V.js";import"./wiauth-Dcvc2WVQ.js";sa(Y,async f=>{if(!f)return window.location.href="/";try{const m=W("wiSmile");if(m)return X(m);const S=(await M(R(Z(g,"smiles"),na("usuario","==",f.displayName)))).docs[0].data();j("wiSmile",S,450),X(S)}catch(m){console.error(m)}});i(document).on("click",".bt_salir",async()=>{await la(Y),window.location.href="/";try{localStorage.clear()}catch{Object.keys(localStorage).forEach(m=>localStorage.removeItem(m))}});i(document).on("click",".bt_cargar",()=>{const f=/^(im\d+|ki\d+|remote:im\d+|dirty:im\d+|dirty:ki\d+)$/;Object.keys(localStorage).filter(m=>f.test(m)).forEach(m=>localStorage.removeItem(m)),C("Actualizado"),setTimeout(()=>location.reload(),800)});function X(f){console.log(f.nombre),C("Bienvenido "+f.nombre+"!"),i(".app").html(`
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
          <button class="bt_login"><i class="fas fa-user"></i> ${f.usuario}</button>
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
  `);const m="hojasdb",I="cartasdb",S="hojasdbCache",E="cartasdbCache",T=24,A=6;let d=W(S)||[],u=W(E)||[],v=1,l=null,w=new Set,y=new Set,K=1;const L=a=>a==null?"0.00":Number(a).toFixed(2),x=(a,e)=>{if(e){const t=a.html();a.data("original",t).prop("disabled",!0).addClass("spinning").html('<i class="fa fa-spinner fa-spin"></i> Guardando...')}else a.prop("disabled",!1).removeClass("spinning").html(a.data("original")||a.html())},N=(a,e)=>{if(e){const t=a.html();a.data("original",t).prop("disabled",!0).addClass("deleting").html('<i class="fa fa-spinner fa-spin"></i> Eliminando...')}else a.prop("disabled",!1).removeClass("deleting").html(a.data("original")||a.html())},O=a=>d.find(e=>e.numero===a)||null,P=a=>u.filter(e=>e.hoja===a),aa=()=>`hoja_${Math.max(0,...d.filter(a=>!a.id.startsWith("temp_")&&a.id.startsWith("hoja_")).map(a=>parseInt(a.id.replace("hoja_",""))||0))+1}`,ta=()=>`carta_h${String(Math.max(0,...u.map(a=>+(a.id.match(/carta_h(\d+)/)?.[1]||0)))+1).padStart(2,"0")}`,G=()=>`temp_${K++}`,ia=()=>{const a=i("#hojasList");a.html(""),d.slice().sort((t,n)=>(t.numero||0)-(n.numero||0)).forEach(t=>{const n=P(t.numero).filter(p=>p.estado==="activo").length,s=v===t.numero?"active":"",c=w.has(t.id)?"dirty":"",o=t.id.startsWith("temp_")?"temp-item":"",r=i(`
        <div class="hoja-item ${s} ${c} ${o}" data-hoja="${t.numero}" data-id="${t.id}">
          <div class="hoja-content">
            <div class="hoja-icon">
              <i class="fas ${t.icono||"fa-utensils"}"></i>
            </div>
            <div class="hoja-info">
              <h3>Hoja ${t.numero}</h3>
              <input type="text" class="hoja-titulo" value="${t.titulo||""}" placeholder="Título de la hoja" />
              <div class="imagen-group">
                <input type="url" class="hoja-imagen" value="${t.imagen||""}" placeholder="https://i.postimg.cc/..." />
                <i class="fas fa-info-circle imagen-info" title="Ingresa un link de imagen válido (postimg.cc recomendado)"></i>
              </div>
              <small>${n} platos activos ${o?"(sin guardar)":""}</small>
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
      `);a.append(r)}),d.length===0&&a.html('<div class="empty-state"><i class="fas fa-layer-group"></i><p>No hay hojas creadas</p></div>')},q=()=>{const a=i("#platosList"),e=i("#hojaSeleccionada"),t=O(v),n=P(v).sort((s,c)=>{const o=Number(s.orden||0),r=Number(c.orden||0);return o!==r?o-r:String(s.titulo||"").localeCompare(String(c.titulo||""))});e.text(`${t?.titulo||"Sin título"}`),a.html(""),n.forEach(s=>{const c=l===s.id?"active":"",o=y.has(s.id)?"dirty":"",r=s.id.startsWith("temp_")?"temp-item":"",p=s.estado==="activo"?"fa-check-circle":"fa-times-circle",_=s.estado==="activo"?"disponible":"no-disponible",$=i(`
        <div class="plato-item ${c} ${_} ${o} ${r}" data-id="${s.id}">
          <div class="plato-content">
            <div class="plato-orden">${s.orden||0}</div>
            <div class="plato-info">
              <h4>${s.titulo||"Sin título"} ${r?"(nuevo)":""}</h4>
              <p>${(s.descripcion||"").substring(0,50)}${(s.descripcion||"").length>50?"...":""}</p>
              <span class="plato-precio">S/ ${L(s.precio)}</span>
            </div>
            <div class="plato-estado">
              <i class="fas ${p}"></i>
            </div>
          </div>
        </div>
      `);a.append($)}),n.length===0&&a.html('<div class="empty-state"><i class="fas fa-utensils"></i><p>No hay platos en esta hoja</p></div>')},k=()=>{const a=l?u.find(n=>n.id===l):null,e=i("#platoSeleccionado");if(!a){e.text("Selecciona un plato para editar"),i("#editorTitulo").val(""),i("#editorDescripcion").val(""),i("#editorPrecio").val(""),i("#editorOrden").val(""),i("#editorEstado").val("activo");return}const t=a.id.startsWith("temp_")?" (nuevo - sin guardar)":"";e.text(`Hoja ${a.hoja} - ${a.titulo||"Sin título"}${t}`),i("#editorTitulo").val(a.titulo||""),i("#editorDescripcion").val(a.descripcion||""),i("#editorPrecio").val(a.precio||""),i("#editorOrden").val(a.orden||0),i("#editorEstado").val(a.estado||"activo")},z=()=>{const a=i("#previewContainer"),e=O(v),t=P(v).filter(c=>c.estado==="activo").sort((c,o)=>{const r=Number(c.orden||0),p=Number(o.orden||0);return r!==p?r-p:String(c.titulo||"").localeCompare(String(o.titulo||""))}),n=t.map(c=>`
      <div class="preview-item">
        <div class="preview-header">
          <h3>${c.titulo||"Sin título"}</h3>
          <span class="preview-price">S/ ${L(c.precio)}</span>
        </div>
        <p class="preview-description">${c.descripcion||""}</p>
        <div class="preview-divider"></div>
      </div>
    `).join(""),s=e?.imagen?`<img src="${e.imagen}" alt="Menu imagen" class="preview-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg=='" />`:'<div class="no-image"><i class="fas fa-image"></i><p>Sin imagen</p></div>';a.html(`
      <div class="mobile-preview">
        <div class="preview-header-section">
          ${s}
        </div>
        <div class="preview-content">
          <h2 class="preview-title">
            <i class="fas ${e?.icono||"fa-utensils"}"></i>
            ${e?.titulo||"Sin título"}
          </h2>
          <div class="preview-items">
            ${t.length?n:'<p class="no-items">No hay platos disponibles</p>'}
          </div>
        </div>
      </div>
    `)},B=async()=>{try{Q(!0);const[a,e]=await Promise.all([M(R(Z(g,m),U(50))),M(R(Z(g,I),U(500)))]);d=a.docs.map(t=>({id:t.id,...t.data()})),u=e.docs.map(t=>({id:t.id,...t.data()})),j(S,d,T),j(E,u,A),b(),h("Datos cargados exitosamente","success",1800)}catch(a){console.error(a),h("Error al cargar datos","error")}finally{Q(!1)}},b=()=>{ia(),q(),k(),z()};i(document).on("click",".hoja-item",function(){const a=Number(i(this).data("hoja"));a!==v&&(v=a,l=null,i(".hoja-item").removeClass("active"),i(this).addClass("active"),q(),k(),z())}),i(document).on("click",".plato-item",function(){const a=i(this).data("id");a!==l&&(l=a,i(".plato-item").removeClass("active"),i(this).addClass("active"),k())}),i(document).on("input",".hoja-titulo, .hoja-imagen",function(){const a=i(this).closest(".hoja-item").data("id");w.add(a),i(this).closest(".hoja-item").addClass("dirty")}),i(document).on("input change","#editorTitulo, #editorDescripcion, #editorPrecio, #editorOrden, #editorEstado",function(){l&&(y.add(l),i(`.plato-item[data-id="${l}"]`).addClass("dirty"))}),i(document).on("click",".bt_add_hoja",function(){const a=Math.max(0,...d.map(n=>n.numero||0))+1,e=G(),t={id:e,numero:a,titulo:`Nueva Hoja ${a}`,icono:"fa-utensils",imagen:"",estado:"activo",orden:a};d.push(t),w.add(e),v=a,b(),h("Nueva hoja agregada - Recuerda guardar","info",2e3)}),i(document).on("click",".bt_guardar_hoja",async function(){const a=i(this),e=a.closest(".hoja-item"),t=e.data("id"),n=d.find(o=>o.id===t);if(!n)return;const s=e.find(".hoja-titulo").val().trim(),c=e.find(".hoja-imagen").val().trim();if(!s)return h("El título es requerido","warning");try{x(a,!0);const o=t.startsWith("temp_"),r=o?aa():t,p={numero:n.numero,titulo:s,imagen:c,icono:n.icono,estado:n.estado,orden:n.orden,creacion:o?D():n.creacion,actualizacion:D()};if(await J(H(g,m,r),p),o){const _=d.findIndex($=>$.id===t);d[_]={id:r,...p},w.delete(t)}else Object.assign(n,{titulo:s,imagen:c}),w.delete(t);j(S,d,T),b(),C("Hoja guardada exitosamente")}catch(o){console.error(o),h("Error al guardar hoja","error")}finally{x(a,!1)}}),i(document).on("click",".bt_add_plato",function(){if(!O(v))return h("Crea una hoja primero","warning");const a=G(),e=Math.max(0,...P(v).map(n=>+n.orden||0))+1,t={id:a,titulo:"NUEVO PLATO",descripcion:"",precio:null,estado:"activo",hoja:v,orden:e};u.push(t),y.add(a),l=a,b(),h("Nuevo plato agregado - Recuerda guardar","info",2e3)}),i(document).on("click",".bt_guardar_plato",async function(){if(!l)return h("Selecciona un plato","warning");const a=i(this),e=u.find(p=>p.id===l);if(!e)return;const t=i("#editorTitulo").val().trim(),n=i("#editorDescripcion").val().trim(),s=i("#editorPrecio").val(),c=Number(i("#editorOrden").val())||0,o=i("#editorEstado").val();if(!t)return h("El título es requerido","warning");const r=s===""?null:Number(s);if(s!==""&&(isNaN(r)||r<0))return h("Precio debe ser un número válido","warning");try{x(a,!0);const p=l.startsWith("temp_"),_=p?ta():l,$={titulo:t,descripcion:n,precio:r,orden:c,estado:o,hoja:e.hoja,creacion:p?D():e.creacion,actualizacion:D()};if(await J(H(g,I,_),$),p){const ea=u.findIndex(oa=>oa.id===l);u[ea]={id:_,...$},y.delete(l),l=_}else Object.assign(e,{titulo:t,descripcion:n,precio:r,orden:c,estado:o}),y.delete(l);j(E,u,A),b(),C("Plato guardado exitosamente")}catch(p){console.error(p),h("Error al guardar plato","error")}finally{x(a,!1)}}),i(document).on("click",".bt_eliminar_plato",async function(){if(!l)return h("Selecciona un plato","warning");const a=i(this),e=u.find(t=>t.id===l);if(confirm(`¿Eliminar "${e?.titulo||l}"?`))try{N(a,!0),l.startsWith("temp_")||await ca(H(g,I,l)),u=u.filter(t=>t.id!==l),y.delete(l),j(E,u,A),l=null,b(),C("Plato eliminado exitosamente")}catch(t){console.error(t),h("Error al eliminar plato","error")}finally{N(a,!1)}}),i(document).on("click",".bt_eliminar_hoja",async function(){const a=i(this),t=a.closest(".hoja-item").data("id"),n=d.find(o=>o.id===t);if(!n)return;const s=P(n.numero);let c=`¿Eliminar hoja "${n.titulo}"?`;if(s.length>0&&(c+=`

Advertencia: También se eliminarán ${s.length} platos de esta hoja.`),!!confirm(c))try{if(N(a,!0),!t.startsWith("temp_")){const o=ra(g);o.delete(H(g,m,t)),s.forEach(r=>{r.id.startsWith("temp_")||o.delete(H(g,I,r.id))}),await o.commit()}d=d.filter(o=>o.id!==t),u=u.filter(o=>o.hoja!==n.numero),j(S,d,T),j(E,u,A),w.delete(t),l=null,v===n.numero&&(v=d.length>0?d[0].numero:1),b(),C(`Hoja eliminada${s.length>0?` junto con ${s.length} platos`:""}`)}catch(o){console.error(o),h("Error al eliminar hoja","error")}finally{N(a,!1)}}),i(document).on("click",".bt_recargar",()=>B()),V(".hoja-titulo, .hoja-imagen","data-temp-id",a=>a.val()),V("#editorTitulo, #editorDescripcion, #editorPrecio, #editorOrden, #editorEstado","id",a=>a.val()),F(".hoja-titulo, .hoja-imagen","data-temp-id",(a,e)=>a.val(e)),F("#editorTitulo, #editorDescripcion, #editorPrecio, #editorOrden, #editorEstado","id",(a,e)=>a.val(e)),b(),(d.length===0||u.length===0)&&B()}
