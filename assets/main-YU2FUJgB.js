import{$ as d,r as H,g as C,a as b,q as v,c as f,d as g,l as S,s as y}from"./widev-dFYhDOSz.js";/* empty css              */import"./wiauth-DpnP6D2h.js";const _=()=>d(".webz").each((s,t)=>{const i=d(t);i.find(".webx").css("height",i.find(".weby").outerHeight())}),j=(()=>{let s;return()=>(clearTimeout(s),s=setTimeout(_,120))})();d(j);d(window).on("load resize orientationchange",j);const o={COL_CARTAS:"cartasdb",COL_HOJAS:"hojasdb",C_CARTAS:"cartasdbCachePublic",C_HOJAS:"hojasdbCachePublic",HRS:6,LIM_CARTAS:500,LIM_HOJAS:50,IMG_FALLBACK:"https://i.postimg.cc/KvN8qF2P/menu-default.jpg"},O=s=>s==null||s===""?"":`S/${Number(s).toFixed(2)}`,L=(s,t,i)=>{const a=i[s]||{},r=a.nota?`<p class="menu-note"><i class="fas fa-info-circle"></i> ${a.nota}</p>`:"",l=a.imagen||o.IMG_FALLBACK,m=t.map(c=>`
    <div class="menu-item">
      <div class="item-header">
        <h3>${c.titulo||""}</h3>
        <span class="price">${O(c.precio)}</span>
      </div>
      ${c.descripcion?`<p class="description">${c.descripcion}</p>`:""}
      <div class="dotted-line"></div>
    </div>
  `).join("");return`
    <div class="webz" data-hoja="${s}">
      <div class="webx">
        <img src="${l}" alt="Menú ${a.titulo||`Hoja ${s}`}" loading="lazy"
             onerror="this.src='${o.IMG_FALLBACK}';this.onerror=null;">
        <div class="image-overlay"><i class="fas ${a.icono||"fa-utensils"}"></i></div>
      </div>
      <div class="weby">
        <div class="menu-column">
          <header class="menu-header">
            <h2 class="menu-category">
              <i class="fas ${a.icono||"fa-utensils"}"></i>
              ${a.titulo||`Hoja ${s}`}
            </h2>
            ${r}
          </header>
          <div class="menu-content">
            ${m||'<p class="no-items">No hay elementos disponibles</p>'}
          </div>
          ${t.length?`<div class="menu-footer"><small>${t.length} elementos</small></div>`:""}
        </div>
      </div>
    </div>
    <div class="separador">
      <span class="sep-number">${s}</span>
      <span class="sep-title">${a.titulo||`Sección ${s}`}</span>
    </div>
  `},$=(s,t)=>{const i=d("#menu-app"),a=s.filter(e=>(e.estado||"").toLowerCase()==="activo").reduce((e,n)=>{const u=Number(n.hoja||0);return u>0&&(e[u]=e[u]||[]).push(n),e},{}),l=Array.from(new Set([...Object.keys(a).map(Number),...Object.keys(t).map(Number)])).sort((e,n)=>e-n).map(e=>{const n=(a[e]||[]).sort((u,h)=>{const A=Number(u.orden||0)-Number(h.orden||0);return A!==0?A:String(u.titulo||"").localeCompare(String(h.titulo||""))});return L(e,n,t)}).join("");i.html(l);const m=i.find("img").toArray(),c=Promise.all(m.map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=e.onerror=n}))),p=document.fonts?.ready||Promise.resolve();Promise.all([c,p]).then(()=>setTimeout(_,80))};async function w(){const s=/\brefresh=1\b/i.test(location.search),t=C(o.C_CARTAS)||[],a=(C(o.C_HOJAS)||[]).reduce((r,l)=>(r[l.numero]=l,r),{});t.length&&Object.keys(a).length&&!s&&$(t,a);try{const[r,l]=await Promise.all([b(v(f(g,o.COL_CARTAS),S(o.LIM_CARTAS))),b(v(f(g,o.COL_HOJAS),S(o.LIM_HOJAS)))]),m=r.docs.map(e=>({id:e.id,...e.data()})),c=l.docs.map(e=>({id:e.id,...e.data()})),p=c.reduce((e,n)=>(e[n.numero]=n,e),{});y(o.C_CARTAS,m,o.HRS),y(o.C_HOJAS,c,o.HRS),$(m,p)}catch(r){console.error("Error cargando menú:",r),t.length||d("#menu-app").html(`
        <div class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <h2>No se pudo cargar el menú</h2>
          <p>Verifica tu conexión e intenta nuevamente.</p>
          <button class="retry-btn" onclick="location.reload()">
            <i class="fas fa-redo"></i> Reintentar
          </button>
        </div>
      `)}}d(document).ready(()=>{w(),d(document).on("keydown",s=>{s.ctrlKey&&s.shiftKey&&s.key.toUpperCase()==="R"&&(H(o.C_CARTAS,o.C_HOJAS),location.reload())})});window.hawkaMenu={reload:w,clearCache:()=>H(o.C_CARTAS,o.C_HOJAS)};
