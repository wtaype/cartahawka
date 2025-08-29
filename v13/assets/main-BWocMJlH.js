import{o as E,$ as t,g as m,a as v,q as w,c as A,d as C,l as H,s as N,r as b,b as S,w as R,e as $}from"./widev-DOSKWXvu.js";/* empty css              */import"./wiauth-wi5DogcL.js";E($,async e=>{if(!e)return b("wiAuthIn"),b("wiAuthRol");if(m("wiAuthIn")){const s=m("wiAuthRol");if(s)return S(s);const o=await v(w(A(C,"smiles"),R("email","==",e.email)));S(o.docs[0]?.data()?.rol)}});const c=()=>{t(".webz").each(function(){const e=t(this).find(".weby").outerHeight();t(this).find(".webx").css("height",e+"px")})};t(c);t(window).on("load resize",c);t(c);t(window).on("load resize orientationchange",c);const I={1:{title:"DESAYUNOS"},2:{title:"🍳 BRUNCH",note:"👉 Upgrade tu bebida a cappuccino o jugo premium (naranja, fresa, maracuyá) por +S/4"},3:{title:"➕ ADICIONALES"},4:{title:"SÁNDWICHES CLÁSICOS 🥙",note:"👉 Agrega papas fritas por +S/6"},5:{title:"🥩 SÁNDWICHES PREMIUM (con papas fritas)"},6:{title:"🍔 HAMBURGUESAS"},7:{title:"🥗 ENSALADAS / 🍰 DULCES"}},D=e=>e==null||e===""?"":`S/${Number(e).toFixed(2)}`;function j(e,s){const o=I[e]||{},a=o.note?`<p class="menu-note">${o.note}</p>`:"",u=s.map(n=>`
    <div class="menu-item">
      <div class="item-header">
        <h3>${n.titulo||""}</h3>
        <span class="price">${D(n.precio)}</span>
      </div>
      ${n.descripcion?`<p class="description">${n.descripcion}</p>`:""}
      <div class="dotted-line"></div>
    </div>
  `).join("");return`
    <div class="webz">
      <div class="webx">
        <img src="menu.avif" alt="Imagen del menú">
      </div>
      <div class="weby">
        <div class="menu-column">
          <header class="menu-header">
            <h2 class="menu-category">${o.title||""}</h2>
            ${a}
          </header>
          <div class="menu-content">
            ${u||""}
          </div>
        </div>
      </div>
    </div>
    <div class="separador"> ${e} </div>
  `}async function U(){const e=t("#menu-app"),s="cartasdbCachePublic",o=6;let a=m(s)||[];const u=/\brefresh=1\b/i.test(location.search),n=l=>{const r={};l.filter(i=>(i.estado||"").toLowerCase()==="activo").forEach(i=>{const d=Number(i.hoja||0);d&&(r[d]||=[]).push(i)});const y=[1,2,3,4,5,6,7].map(i=>{const d=(r[i]||[]).sort((p,h)=>{const f=Number(p.orden||0),g=Number(h.orden||0);return f!==g?f-g:String(p.titulo||"").localeCompare(String(h.titulo||""))});return j(i,d)}).join("");e.html(y),document.fonts&&document.fonts.ready?document.fonts.ready.finally(c):c()};a.length&&!u&&n(a);try{a=(await v(w(A(C,"cartasdb"),H(500)))).docs.map(r=>({id:r.id,...r.data()})),N(s,a,o),n(a)}catch(l){console.error(l),a.length||t("#menu-app").html('<p style="text-align:center;padding:2rem">No se pudo cargar el menú.</p>')}}t(U);
