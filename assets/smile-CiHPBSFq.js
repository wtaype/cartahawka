import{o as Oa,g as u,c as na,q as V,e as W,d as g,w as F,s as m,b as k,$ as e,f as Pa,M as w,h as ha,i as ba,N as U,j as va,l as Y,k as ra,m as B,n as O,r as D,p as ka,t as ya}from"./widev-UNyYYyf9.js";import"./wiauth-D3yGAphx.js";Oa(k,async p=>{if(!p)return window.location.href="/";try{const d=u("wiSmile");if(d)return wa(d);const h=(await na(V(W(g,"smiles"),F("usuario","==",p.displayName)))).docs[0].data();m("wiSmile",h,450),wa(h)}catch(d){console.error(d)}});e(document).on("click",".bt_salir",async()=>{await Pa(k),window.location.href="/";try{localStorage.clear()}catch{Object.keys(localStorage).forEach(d=>localStorage.removeItem(d))}});e(document).on("click",".bt_cargar",()=>{const p=/^(im\d+|ki\d+|remote:im\d+|dirty:im\d+|dirty:ki\d+)$/;Object.keys(localStorage).filter(d=>p.test(d)).forEach(d=>localStorage.removeItem(d)),w("Actualizado"),setTimeout(()=>location.reload(),800)});function wa(p){console.log(p.nombre),w("Bienvenido "+p.nombre+"!"),e(".app").html(`
    <header class="hd">
  <nav class="nv dfw wdp">
  <a class="logo nv_left" href="#Logo">
      <h1>
          <span class="nv_titulo"><i class="fas fa-graduation-cap logo-icon"></i> wiimage</span>
          <span class="nv_descri">| Tu pizarra personalizada con notepad y anotes en imágenes</span>
      </h1>
  </a>
  <div class="logo nv_right dfw">
      
      <div class="witemas dpf"></div>
      <button class="bt_cargar"><i class="fa-solid fa-arrow-rotate-right"></i></button>
      <button class="bt_login"><i class="fas fa-user"></i> ${p.nombre}</button>
      <button class="bt_salir"><i class="fas fa-sign-out-alt"></i> Salir</button>
  </div>
  </nav>
  </header>

  <main class="miwb wdp">
  <section class="swb notas">
    <div class="lista wbg">
      <div class="dfw hcon dfc">
          <h2><i class="fas fa-list"></i> Notas</h2>
          <button class="agregar_nota"><i class="fas fa-plus"></i> Nota</button>
      </div>
      <div class="nts dfcc">
          <div class="nt nt0 activa" data-ki="ki0">Nota actual</div>
          
      </div>
  </div>
  <div class="editor wbg">
      <div class="hcon dfc">
          <h2><i class="fas fa-edit"></i> Editor</h2> 
          <i title="Ctrl + B" class="fas fa-bold"></i>
          <i title="Ctrl + I" class="fas fa-italic"></i>
          <i title="Ctrl + K" class="fas fa-underline"></i>
          <i title="Ctrl + L" class="fas fa-list-ul"></i>
          <i title="Ctrl + J" class="fas fa-list-ol"></i>
          <i title="Ctrl + I" class="fa-solid fa-align-left"></i>
          <i title="Ctrl + T" class="fa-solid fa-align-center"></i>
          <i title="Ctrl + D" class="fa-solid fa-align-right"></i>
          <i title="Ctrl + Z" class="fa-solid fa-rotate-left"></i>
          <button class="limpiar_nota"><i class="fas fa-trash"></i>Eliminar</button>
          <button class="guardar_nota"><i class="fas fa-save"></i> Guardar</button>
      </div>
      <div class="mcon">
          <div class="txe" contenteditable="true" id="ki0">Ejemplo de las notas </div>
      </div>

    </div>
    </section>

  <section class="swb images psr">
  <div class="paste wbg dfc">
      <p>Área de Capturas.</p>
      <p>Presiona Ctrl+V para pegar capturas de pantalla.</p> 
      <p>Doble click para seleccionar imagen</p>
    </div>
    <div class="ibx">
      <div class="bx bx1"></div><div class="bx bx2"></div><div class="bx bx3"></div><div class="bx bx4"></div>
      <div class="bx bx5"></div><div class="bx bx6"></div><div class="bx bx7"></div><div class="bx bx8"></div>
      <div class="bx bx9"></div><div class="bx bx10"></div><div class="bx bx11"></div><div class="bx bx12"></div>
    </div>

      <!-- Visor fullscreen -->
    <div class="vw" aria-hidden="true">
      <button class="ic dw"  title="Anterior (<)"><i class="fa-solid fa-cloud-arrow-up"></i></button>
      <button class="ic cls" title="Cerrar (Esc)"><i class="fa-solid fa-xmark"></i></button>
      <button class="ic dl"  title="Descargar (Ctrl+S)"><i class="fa-solid fa-download"></i></button>
      <button class="ic rm"  title="Eliminar (Supr)"><i class="fa-solid fa-trash"></i></button>
      <button class="ic pv"  title="Anterior (<)"><i class="fa-solid fa-chevron-left"></i></button>
      <img alt="Vista previa">
      <button class="ic nx"  title="Siguiente (>)"><i class="fa-solid fa-chevron-right"></i></button>
      <div class="th" aria-label="Miniaturas"></div>
    </div>

  <div class='abwc psa dpn dfcc'>
    <b>Acerca de Wiimage</b>
    <p>Wiimage es una pizarra personal con editor de notas y un gestor de imágenes tipo galería. Pega capturas con Ctrl+V o selecciona por doble clic, organízalas en cuadros y míralas en pantalla completa con miniaturas y atajos de teclado. Todo funciona en tu navegador.</p>
    <p>Funciones destacadas:</p>
    <ul>
      <li>Pegar imágenes desde portapapeles (Ctrl+V) y carga por doble clic; se ubican en el siguiente cuadro libre.</li>
      <li>Visor fullscreen con miniaturas al pie, navegación anterior/siguiente y acciones rápidas (cerrar, descargar, eliminar).</li>
      <li>Atajos: > o Flecha Derecha (siguiente),  o Flecha Izquierda (anterior), Esc (cerrar), Ctrl+S (descargar), Supr (eliminar).</li>
      <li>Notas con auto-guardado, chips con vista previa y herramientas de formato (negrita, listas, alineación).</li>
      <li>Persistencia local (LocalStorage) para notas e imágenes y botón “Borrar todo”.</li>
      <li>Diseño responsivo y temas visuales para un uso tipo app.</li>
    </ul>
    <p><a href='https://wtaype.github.io/wiimage/v11' target='_blank'>v11 - Version Inicial</a></p>
    <p><a href='https://wtaype.github.io/wiimage/v12' target='_blank'>v12 - Version Blue</a></p>
    <b>Privacidad y seguridad</b>
    <p>Wiimage no recopila datos personales ni envía información a servidores. Todo se procesa localmente en tu dispositivo y se guarda en el almacenamiento del navegador. Puedes eliminarlo cuando quieras con “Borrar todo”. No usamos cookies de rastreo.</p>
    <button aria-label='ENTENDIDO' class='abwok bts'>ENTENDIDO</button>
  </div>

  </section>

  </main>

  <footer class='foo hwb txc'>
  <p>Creado con<i class="fa fa-heart"></i>by<a class='ftx lkme' href='https://wtaype.github.io/' target='_blank'>@wilder.taype</a>2025 - <span class="wty"></span><span class="abw tm11042025" id="101542394703517594">| Acerca del app | Actualizado</span><span class="wtu"></span></p>
  </footer>
    
`),ha(".txe","id",a=>a.html()),ba(".txe","id",(a,t)=>a.html(t));const d=e(".txe"),oa=e(".nts"),h=e(".editor .hcon");let y=0;const b=a=>+String(a).replace(/\D+/g,"")||0,ca=(a,t=22)=>e("<div>").html(a||"").text().replace(/\s+/g," ").trim().slice(0,t),xa=a=>(e('[data-ki^="ki"]').removeClass("activa"),e(`[data-ki="${a}"]`).addClass("activa")),N=a=>`remote:${a}`,L=a=>`dirty:${a}`,S=()=>Object.keys(localStorage).filter(a=>/^ki\d+$/.test(a)),P=a=>{const t=ca(a);return t?t+"...":""},q=(a,t)=>{const i=o=>{o.empty().text(t||""),u(N(a))&&o.append(" ").append(e('<i class="fa-solid fa-cloud-arrow-up"></i>'))},r=e(`[data-ki="${a}"]`);r.length?i(r):i(e(`<div class="nt nt${b(a)}" data-ki="${a}"></div>`).appendTo(oa))},R=a=>{const t=u(a)||"";d.attr("id",a).html(t).focus(),xa(a)},$a=()=>{const a=e('[data-ki^="ki"]').map((i,r)=>b(e(r).data("ki"))).get(),t=S();y=Math.max(y,0,...a,...t.map(b)),e.each(t,(i,r)=>{const o=u(r);o&&q(r,P(o))})},aa=(()=>{let a;return(t=1600)=>{const i=e(".guardar_nota");i.length&&(i.addClass("bta").text("Guardado"),clearTimeout(a),a=setTimeout(()=>{i.removeClass("bta").text("Guardar")},t))}})(),Ca=async()=>{const a=k.currentUser,t=a?.email;if(!(!t||S().length))try{const i=V(W(g,"smilenotas"),F("email","==",t),Y(100)),r=await na(i);let o=0;r.forEach(l=>{const n=l.data(),s=n.ki||"ki0",c=n.nota||"";m(s,c,12),m(N(s),1,720),q(s,P(c)),o=Math.max(o,b(s))}),y=Math.max(y,o)}catch(i){console.error("Hydrate error:",i)}},la=async({silent:a=!1}={})=>{const t=k.currentUser,i=t?.email,r=t?.displayName||p?.nombre||"";if(!i)return;const o=S().filter(n=>!!u(L(n))).slice(0,100);if(!o.length){a||w("Nada que sincronizar");return}const l=ra(g);o.forEach(n=>{const s=u(n)||"",c=ca(s,22),E=B(g,"smilenotas",`${i}_${n}`),v={ki:n,titulo:c,usuario:r,email:i,nota:s,actualizacion:O()};u(N(n))||(v.creacion=O()),l.set(E,v,{merge:!0})});try{await l.commit(),o.forEach(n=>{m(N(n),1,720),D(L(n)),q(n,P(u(n)))}),a||w("Notas guardadas en la nube"),aa()}catch(n){console.error("Sync error:",n),a||U("Error al sincronizar notas","error")}},Ea=async a=>{const t=k.currentUser,i=t?.email;try{i&&await ka(B(g,"smilenotas",`${i}_${a}`))}catch(r){console.error("Delete cloud error:",r),U("No se pudo eliminar en la nube","error")}finally{D(a),D(L(a)),D(N(a)),e(`[data-ki="${a}"]`).remove(),d.attr("id")===a&&d.removeAttr("id").empty();const r=S().sort((o,l)=>b(o)-b(l));r.length&&R(r.includes("ki0")?"ki0":r[0]),w("Nota eliminada")}};let ta=null;const Sa=()=>{const a=k.currentUser,t=a?.email;if(!t)return;if(typeof ta=="function")try{ta()}catch{}const i=V(W(g,"smilenotas"),F("email","==",t),Y(100));ta=ya(i,r=>{let o=y;if(r.docChanges().forEach(l=>{const n=l.doc.data()||{},s=n.ki||l.doc.id.split("_")[1]||"ki0",c=n.nota||"";l.type!=="removed"&&(u(L(s))||(m(s,c,12),m(N(s),1,720),d.attr("id")===s&&d.html(c)),q(s,P(u(s)||c)),o=Math.max(o,b(s)))}),y=Math.max(y,o),!d.attr("id")){const l=S().sort((n,s)=>b(n)-b(s));l.length&&R(l.includes("ki0")?"ki0":l[0])}},r=>console.error("Snapshot notas error:",r))};d.on("input",()=>{const a=d.attr("id");a&&(m(a,d.html(),12),m(L(a),1,12),q(a,P(u(a))),aa())}),e(document).on("click",".guardar_nota",async()=>{const a=d.attr("id");a&&(m(a,d.html(),12),m(L(a),1,12)),await la({silent:!1})}),e(document).on("click",".agregar_nota",()=>{if(S().length>=100)return U("Máximo 100 notas por usuario","warning");const t=`ki${++y}`;q(t,`Nota ${y}`),R(t)}),e(document).on("click",'[data-ki^="ki"]',a=>R(e(a.currentTarget).data("ki"))),e(document).on("click",".limpiar_nota",async function(){const a=d.attr("id");a&&(await Ea(a),va(this,"bta","Eliminado","Eliminar"))}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&la({silent:!0})}),(async()=>{$a(),await Ca(),Sa();const a=S().sort((t,i)=>b(t)-b(i));a.length&&!d.html()&&R(a.includes("ki0")?"ki0":a[0])})();const _a={".fa-bold":"bold",".fa-italic":"italic",".fa-underline":"underline",".fa-list-ul":"insertUnorderedList",".fa-list-ol":"insertOrderedList",".fa-align-left":"justifyLeft",".fa-align-center":"justifyCenter",".fa-align-right":"justifyRight",".fa-rotate-left":"undo"};e.each(_a,(a,t)=>h.find(a).attr("data-cmd",t));let G=null;const ea=()=>{const a=window.getSelection();if(!a||!a.rangeCount)return!1;const t=a.anchorNode;return t&&(d[0]===t||e.contains(d[0],t))},H=()=>{const a=window.getSelection();a&&a.rangeCount&&ea()&&(G=a.getRangeAt(0))},Da=()=>{if(!G)return;const a=window.getSelection();a.removeAllRanges(),a.addRange(G)},Na=a=>{!ea()&&G&&Da(),document.execCommand(a,!1,null),d.focus(),H(),K()};h.on("mousedown","i",a=>a.preventDefault()).on("click","i",function(){const a=e(this).data("cmd");a&&Na(a)});const La=[[".fa-bold","bold"],[".fa-italic","italic"],[".fa-underline","underline"],[".fa-list-ul","insertUnorderedList"],[".fa-list-ol","insertOrderedList"]],K=()=>{if(!ea())return void h.find("i").removeClass("actv").addClass("is-disabled");h.find("i").removeClass("is-disabled"),e.each(La,(i,r)=>h.find(r[0]).toggleClass("actv",document.queryCommandState(r[1])));const a=document.queryCommandState("justifyCenter"),t=document.queryCommandState("justifyRight");h.find(".fa-align-center").toggleClass("actv",a),h.find(".fa-align-right").toggleClass("actv",t),h.find(".fa-align-left").toggleClass("actv",!a&&!t)};document.addEventListener("selectionchange",()=>{H(),K()}),d.on("keyup mouseup input",()=>{H(),K()}),H(),K();const J=e(".paste"),f=e(".ibx .bx");f.each((a,t)=>e(t).attr("data-k",`im${a+1}`));const ia=e(".vw"),da=e(".vw img"),A=e(".vw .th");let T=-1;const x=a=>`remote:${a}`,_=a=>`dirty:${a}`,qa=async(a,t=1600,i=200)=>{const r=await new Promise(I=>{const z=new FileReader;z.onload=Ua=>I(Ua.target.result),z.readAsDataURL(a)}),o=await new Promise(I=>{const z=new Image;z.onload=()=>I(z),z.src=r}),l=Math.min(1,t/o.naturalWidth),[n,s]=[Math.round(o.naturalWidth*l),Math.round(o.naturalHeight*l)],c=Object.assign(document.createElement("canvas"),{width:n,height:s});c.getContext("2d").drawImage(o,0,0,n,s);const E=c.toDataURL("image/webp").startsWith("data:image/webp")?"image/webp":"image/jpeg";let[v,C]=[.9,""];for(let I=0;I<6&&v>=.5&&(C=c.toDataURL(E,v),!(Math.ceil((C.length-`data:${E};base64,`.length)*3/4)<=i*1024));I++,v=(v+.5)/2);return C},Z=()=>f.map((a,t)=>e(t).attr("data-src")?a:null).get().filter(a=>a!==null),j=(a,t)=>{u(x(t||a.attr("data-k")))&&!a.find(".fa-cloud-arrow-up").length&&a.append(' <i class="fa-solid fa-cloud-arrow-up"></i>')},$=()=>{const a=Z();A.html(a.map(t=>`<div class="ti" data-i="${t}"><img src="${f.eq(t).attr("data-src")}">${u(x(f.eq(t).attr("data-k")))?'<i class="fa-solid fa-cloud-arrow-up"></i>':""}</div>`).join("")),A.find(`[data-i="${T}"]`).addClass("on")},Aa=(a,t)=>{const i=f.eq(a),r=i.attr("data-k");i.attr("data-src",t).addClass("fill").html(`<img src="${t}">`),j(i,r),m(r,t,720),m(_(r),1,12),$()},ua=()=>f.toArray().findIndex(a=>!e(a).attr("data-src")),Ta=async a=>{const t=await qa(a);Aa(ua()>=0?ua():0,t)},sa=a=>[...a].filter(t=>t?.type?.startsWith("image/")).forEach(Ta);J.on("paste",a=>{const t=a.originalEvent.clipboardData;t&&sa([...t.items].map(i=>i.getAsFile()).filter(Boolean))}),J.on("dblclick",()=>e('<input type="file" accept="image/*" multiple hidden>').appendTo("body").on("change",a=>{sa(a.target.files),e(a.target).remove()}).trigger("click")),J.on("dragover dragenter",a=>{a.preventDefault(),a.stopPropagation()}),J.on("drop",a=>{a.preventDefault(),a.stopPropagation();const t=a.originalEvent.dataTransfer;t?.files?.length&&sa(t.files)}),e(document).on("dragover drop",a=>a.preventDefault()),(()=>{ba(".ibx .bx","data-k",(a,t)=>{t&&(a.attr("data-src",t).addClass("fill").html(`<img src="${t}">`),j(a))}),ha(".ibx .bx","data-k",a=>a.attr("data-src")||""),$()})();const ja=async({silent:a=!1}={})=>{const{currentUser:t}=k,i=t?.email,r=t?.displayName||p?.nombre||"";if(!i)return;const o=f.filter((n,s)=>{const c=e(s).attr("data-k");return e(s).attr("data-src")&&u(_(c))}).get();if(!o.length)return a||w("Nada que sincronizar");const l=ra(g);o.forEach(n=>{const s=e(n),[c,E]=[s.attr("data-k"),s.attr("data-src")],v=B(g,"smileimgs",`${i}_${c}`),C={email:i,usuario:r,titulo:`Imagen ${c.replace("im","")}`,imagen:E,actualizacion:O()};u(x(c))||(C.creacion=O()),l.set(v,C,{merge:!0})});try{await l.commit(),o.forEach(n=>{const s=e(n),c=s.attr("data-k");m(x(c),1,720),D(_(c)),j(s,c)}),a||w("Imágenes guardadas en la nube"),aa?.(),$()}catch(n){console.error("Sync imgs error:",n),!a&&U("Error al sincronizar imágenes","error")}},ma=async()=>{const{currentUser:a}=k,t=a?.email,i=a?.displayName||p?.nombre||"";if(!t)return U("Debes iniciar sesión","error");const r=f.filter((n,s)=>{const c=e(s).attr("data-k");return e(s).attr("data-src")&&u(_(c))}).get();if(!r.length)return w("No hay imágenes nuevas para guardar");const o=e(".vw .dw");o.html('<i class="fa-solid fa-spinner fa-spin"></i>').prop("disabled",!0);const l=ra(g);r.forEach(n=>{const s=e(n),[c,E]=[s.attr("data-k"),s.attr("data-src")],v=B(g,"smileimgs",`${t}_${c}`),C={email:t,usuario:i,titulo:`Imagen ${c.replace("im","")}`,imagen:E,actualizacion:O()};u(x(c))||(C.creacion=O()),l.set(v,C,{merge:!0})});try{await l.commit(),r.forEach(n=>{const s=e(n),c=s.attr("data-k");m(x(c),1,720),D(_(c)),j(s,c)}),w("Guardado en nube"),$()}catch(n){console.error("Manual sync error:",n),U("Error al guardar en la nube","error")}finally{o.html('<i class="fa-solid fa-cloud-arrow-up"></i>').prop("disabled",!1)}},Ma=async()=>{const{currentUser:a}=k,t=a?.email;if(!(!t||Z().length))try{(await na(V(W(g,"smileimgs"),F("email","==",t),Y(60)))).forEach(r=>{const{imagen:o,...l}=r.data()||{},n=r.id.split("_")[1]||"im1",s=f.filter(`[data-k="${n}"]`);s.length&&o&&(s.attr("data-src",o).addClass("fill").html(`<img src="${o}">`),m(n,o,720),m(x(n),1,720),j(s,n))}),$()}catch(i){console.error("Hydrate imgs error:",i)}};let fa=null;const Ia=()=>{const{currentUser:a}=k,t=a?.email;t&&(fa?.(),fa=ya(V(W(g,"smileimgs"),F("email","==",t),Y(60)),i=>{i.docChanges().forEach(({type:r,doc:o})=>{if(r==="removed")return;const{imagen:l,...n}=o.data()||{},s=o.id.split("_")[1]||"im1",c=f.filter(`[data-k="${s}"]`);l&&c.length&&!u(_(s))&&(c.attr("data-src",l).addClass("fill").html(`<img src="${l}">`),m(s,l,720),m(x(s),1,720),j(c,s))}),$()},i=>console.error("Snapshot imgs error:",i)))},za=async a=>{const{currentUser:t}=k,i=t?.email;try{i&&await ka(B(g,"smileimgs",`${i}_${a}`))}catch(r){console.error("Delete img error:",r)}[a,_(a),x(a)].forEach(D),f.filter(`[data-k="${a}"]`).removeAttr("data-src").removeClass("fill").empty(),$(),w("Imagen eliminada")},Q=a=>{const t=f.eq(a).attr("data-src");if(!t)return;T=a,da.attr("src",t),ia.addClass("show"),$();const i=A.find(`[data-i="${a}"]`).addClass("on");i.length&&A.animate({scrollLeft:Math.max(0,i.position().left+A.scrollLeft()-(A.width()-i.width())/2)},180)},M=()=>{ia.removeClass("show"),T=-1},X=a=>{const t=Z();if(!t.length)return M();Q(t[(t.indexOf(T)+a+t.length)%t.length])},ga=()=>{const a=Object.assign(document.createElement("a"),{href:da.attr("src"),download:`wiimage-${T+1}.png`});document.body.append(a),a.click(),a.remove()},pa=async()=>{const a=f.eq(T).attr("data-k");await za(a);const t=Z();t.length?Q(t[0]):M()};e(document).on("click",".ibx .bx",a=>{const t=f.index(a.currentTarget);e(a.currentTarget).attr("data-src")&&Q(t)}),e(document).on("click",".vw .cls",M),e(document).on("click",".vw",a=>{a.target===a.currentTarget&&M()}),e(document).on("click",".vw .nx",()=>X(1)),e(document).on("click",".vw .pv",()=>X(-1)),e(document).on("click",".vw .dl",ga),e(document).on("click",".vw .rm",pa),e(document).on("click",".vw .dw",ma),e(document).on("click",".vw .th .ti",a=>Q(+e(a.currentTarget).data("i"))),e(document).on("keydown",a=>{if(ia.hasClass("show")){if(a.ctrlKey&&["s","S"].includes(a.key))return a.preventDefault(),ga();if(a.key==="Escape")return M();if(["ArrowRight",">","."].includes(a.key))return X(1);if(["ArrowLeft","<",","].includes(a.key))return X(-1);if(["Delete","Supr","Backspace"].includes(a.key))return pa();if(a.key===" ")return a.preventDefault(),ma()}}),e(document).on("click",".bt_borrar",async function(){if(confirm("¿Eliminar todo lo guardado?")){try{localStorage.clear()}catch{Object.keys(localStorage).forEach(t=>localStorage.removeItem(t))}e('[data-ki^="ki"]').remove(),e(".txe").removeAttr("id").empty(),y=0,f.removeAttr("data-src").removeClass("fill").empty(),M(),$(),va(this,"bta","Eliminado","Eliminar")}}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ja({silent:!0})}),(async()=>(await Ma(),Ia()))()}
