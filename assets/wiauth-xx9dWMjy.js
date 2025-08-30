import{$ as e,u as m,v as x,j as g,d,a as w,q as y,c as k,w as C,x as D,e as M,y as T,z as V,h as B,f as O,A as Y,M as n,s as v,B as F,C as W,D as _,E as G}from"./widev-dFYhDOSz.js";function Z(){const L=`
<div id="loginModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Wii Login</h2>
      
      <form id="loginForm" class="dfd">
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Correo electrónico" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <div class="form-check">
          <input type="checkbox" id="rememberMe">
          <label for="rememberMe">Recordar mis datos</label>
        </div>
        <button type="button" id="Login" class="inactivo btn-auth">Iniciar Sesión</button>
      </form>
      
      <div class="auth-links">
        <span class="olvidastePass">¿Olvidaste tu contraseña?</span>
        <span class="crearCuenta">Crear cuenta</span>
      </div>
    </div>
  </div>
</div>`,N=`
<div id="registroModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Crear Cuenta</h2>
      
      <form id="registroForm" class="dfd">
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-envelope"></i>
            <input type="email" id="regEmail" placeholder="Correo electrónico" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user"></i>
            <input type="text" id="regUsuario" placeholder="Crear usuario" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user-tie"></i>
            <input type="text" id="regNombre" placeholder="Nombre" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-user-tie"></i>
            <input type="text" id="regApellidos" placeholder="Apellidos" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-phone"></i>
            <input type="text" id="regCelular" placeholder="Celular" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-cake-candles"></i>
            <input type="date" id="regFechaNacimiento" placeholder="Fecha de nacimiento" class="datepicker" required>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-lock"></i>
            <input type="password" id="regPassword" placeholder="Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-icon"> <i class="fas fa-lock"></i>
            <input type="password" id="regPassword1" placeholder="Confirmar Contraseña" required>
            <i class="fas fa-eye togglePass"></i>
          </div>
        </div>
        <button type="button" id="Registrar" class="inactivo btn-auth">Registrarme</button>
      </form>
      
      <div class="auth-links">
        <span class="conCuenta">Ya tengo cuenta</span>
      </div>
    </div>
  </div>
</div>`,U=`
<div id="recuperarModal" class="modal authModals">
  <div class="modal-content">
    <div class="modal-header">
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body auth-form">
      <div class="auth-logo">
        <img src="./smile.png" alt="Smile Beneficios">
      </div>
      <h2 class="auth-title">Restablecer Contraseña</h2>
      <form id="recuperarForm" class="dfd">
        <p class="auth-text">Ingresa tu Correo o usuario:</p>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
            <input type="email" id="recEmail" placeholder="Correo electrónico" required>
          </div>
        </div>
        <p class="auth-text">Valida tu fecha de nacimiento:</p>
        <div class="form-group">
          <div class="input-icon">
            <i class="fas fa-cake-candles"></i>
            <input type="date" id="recFechaNacimiento" placeholder="Fecha Nacimiento" class="datepicker" required>
          </div>
        </div>
        <button type="button" id="Recuperar" class="inactivo btn-auth">Restablecer Contraseña</button>
      </form>
      <div class="auth-links">
        <span class="volverLogin"><i class="fas fa-arrow-left"></i> Volver a Inicio</span>
      </div>
    </div>
  </div>
</div>`;e(function(){let t="smiles",c=3e3,E="wiAuthIn",q="wiAuthRol",f="smile";e(".login").click(()=>u("loginModal")),e(".registrar").click(()=>u("registroModal")),e(".crearCuenta").click(()=>{u("registroModal"),h("loginModal")}),e(".conCuenta").click(()=>{u("loginModal"),h("registroModal")}),e(".olvidastePass").click(()=>{u("recuperarModal"),h("loginModal")}),e(".volverLogin").click(()=>{u("loginModal"),h("recuperarModal")}),e(".togglePass").click(function(){const a=e(this).siblings("input"),o=a.attr("type")==="password";a.attr("type",o?"text":"password"),e(this).toggleClass("fa-eye fa-eye-slash")}),e('.miauth input:not([type="checkbox"])').on("click",function(){m(this,e(this).attr("placeholder"))}),e("#regUsuario, #regEmail, #email, #recEmail").on("input",function(){e(this).val(e(this).val().toLowerCase().trim())}),[["#password","#Login"],["#regPassword1","#Registrar"],["#recFechaNacimiento","#Recuperar"],["#recEmail","#Recuperar"]].forEach(([a,o])=>{e(a).on("input keyup",i=>{e(o).removeClass("inactivo"),i.key==="Enter"&&(e(o).click(),e(o).addClass("inactivo"))})});const A={regEmail:[a=>a.toLowerCase(),a=>/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(a)||"Correo inválido"],regUsuario:[a=>a.toLowerCase().replace(/[^a-z0-9_]/g,""),a=>a.length>=4||"Usuario 4-20 caracteres"],regNombre:[a=>a.trim(),a=>a.length>0||"Ingrese nombre"],regApellidos:[a=>a.trim(),a=>a.length>0||"Ingrese apellidos"],regCelular:[a=>a.replace(/\D/g,""),a=>a.length>=8||"Mínimo 8 dígitos"],regFechaNacimiento:[a=>a,a=>G(a)>=13||"Tienes que ser mayor de 13 años"],regPassword:[a=>a,a=>a.length>=6||"Mínimo 6 caracteres"],regPassword1:[a=>a,a=>a===e("#regPassword").val()||"Contraseñas no coinciden"]};e.each(A,function(a,[o,i]){e(`#${a}`).on("blur",function(){const s=o(e(this).val());e(this).val(s);const l=i(s);l!==!0&&m(this,l,"error")})});let P=!1;e("#regUsuario").on("blur focus",async function(){const a=e(this).val();if(a.length>=3)try{const i=(await x(g(d,t,a))).exists();P=!i,m(this,`Usuario ${i?"no disponible":"disponible ✅"}`,i?"error":"success","top",7e3)}catch(o){console.error(o)}});let R=!1;e("#regEmail").on("blur focus",async function(){const a=e(this).val();if(a.length>=3)try{const i=!(await w(y(k(d,t),C("email","==",a)))).empty;R=!i,m(this,`Email ${i?"no disponible":"disponible ✅"}`,i?"error":"success","top",7e3)}catch(o){console.error(o)}}),e("#Registrar").click(async function(){const a=[[P,e("#regUsuario")[0],"Usuario no disponible"],[R,e("#regEmail")[0],"Email no disponible"],...Object.entries(A).map(([o,[i,s]])=>{const l=e(`#${o}`),r=i(l.val()),p=s(r);return[p===!0,l[0],p!==!0?p:""]})];for(const[o,i,s]of a)if(!o&&s&&(m(i,s,"error"),i.focus(),!0))return;try{const o=["regEmail","regUsuario","regNombre","regApellidos","regCelular","regPassword"],[i,s,l,r,p,$]=o.map(S=>e("#"+S).val().trim()),{user:b}=await D(M,i,$);await Promise.all([T(b,{displayName:s}),V(b)]),console.log("Registro completo en Auth ✅"+Date());const z=g(d,t,s);await B(z,{usuario:s,email:i,nombre:l,apellidos:r,celular:p,rol:f,fechaNacimiento:Y(e("#regFechaNacimiento").val()),creacion:O(),uid:b.uid}),console.log("Registro completo en Firestore ✅"+Date()),n("Registro completado! ✅")}catch(o){n({"auth/email-already-in-use":"Email ya registrado","auth/weak-password":"Contraseña muy débil"}[o.code]||o.message)||console.error(o)}finally{v(E,"wIn",24),v(q,f,24),setTimeout(()=>F(f),c)}}),e("#Login").click(async function(){try{const[a,o]=["#email","#password"].map(r=>e(r).val().trim());let i=a,s="smile",l=null;if(a.includes("@"))try{const r=await w(y(k(d,t),C("email","==",i)));r.empty||(s=r.docs[0].data().rol||s)}catch(r){console.warn("lookup rol by email",r)}else try{if(l=await x(g(d,t,a)),i=l.exists()?l.data().email:null,!i)return n("Usuario no registrado","error");s=l.data().rol||s}catch(r){return console.error("lookup usuario->email",r),n("Usuario no registrado","error")}await W(M,i,o),v(E,"wIn",24),v(q,s,24),F(s)}catch(a){n({"auth/invalid-credential":"Email o contraseña incorrectos","auth/invalid-email":"Falta registrar Email","auth/missing-email":"Email o usuario no registrado"}[a.code]||a.message,"error"),console.error(a)}}),e("#Recuperar").click(async function(){try{const[a,o]=["#recEmail","#recFechaNacimiento"].map(r=>e(r).val()),i=a.includes("@")?a:await(async()=>{const r=await x(g(d,t,a));return r.exists()?r.data().email:null})();if(!i)return n("Usuario no registrado","error");const s=await w(y(k(d,t),C("email","==",i)));if(s.empty)return n("Email incorrecto o no existe","error");if(s.docs[0].data().fechaNacimiento.toDate().toISOString().split("T")[0]!==o)return n("Fecha de nacimiento incorrecta","error");await _(M,i),n("Se envió correo para restablecer su contraseña, revisa en principal o spam ✅","success")}catch(a){console.error(a)}})}),e("body").append(L+N+U);function j(){const t=".modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;justify-content:center;align-items:center;backdrop-filter:saturate(120%) blur(2px)}.modal.active{display:flex}@keyframes mfade{from{opacity:0}to{opacity:1}}.modal{animation:mfade .25s ease}body.modal-open{overflow:hidden}.modal-content{background:var(--F);border-radius:1vh;box-shadow:var(--bsh);width:92%;max-width:600px;max-height:90vh;overflow:auto;animation:mpop .22s ease}@keyframes mpop{from{transform:translateY(10px) scale(.98);opacity:.6}to{transform:translateY(0) scale(1);opacity:1}}.authModals .modal-content{max-width:430px;padding:0;border:0;position:relative}.authModals .modal-header{border:0;padding:12px;position:absolute;right:0;z-index:10}.authModals .close-modal{background:0 0;border:0;color:var(--mco);font-size:1.4rem;cursor:pointer;transition:transform .15s,opacity .15s;text-shadow:0 1px 2px rgba(0,0,0,.15)}.authModals .close-modal:hover{transform:scale(1.08);opacity:.95}.auth-form{padding:0 36px 32px;display:flex;flex-direction:column;align-items:center}.auth-logo{width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:34px 0 8px;box-shadow:0 6px 18px var(--bxs)}.auth-logo img{width:100%;height:auto}.auth-title{font:700 1.6rem var(--ff_P);color:var(--mco);margin:4px 0 18px;text-align:center}.auth-title span{color:#ffe800}.auth-text{color:var(--tx);font-size:.92rem;margin:12px 0 4px;align-self:flex-start}#loginForm,#registroForm,#recuperarForm{width:100%;display:flex;flex-direction:column;gap:12px}.form-group{width:100%;position:relative}.input-icon{position:relative;display:flex;align-items:center}.input-icon i{position:absolute;left:14px;color:var(--mco);opacity:.75;transition:.25s}.input-icon .togglePass{left:auto;right:12px;cursor:pointer;color:#a8a8a8}.input-icon input{width:100%;padding:13px 38px 13px 42px;border-radius:10px;border:1px solid var(--bdr);background:var(--wb);color:var(--tx);transition:border-color .2s,box-shadow .2s}.input-icon input:focus{border-color:var(--mco);box-shadow:0 0 0 3px var(--bxs);outline:0}.input-icon input::placeholder{color:var(--txe);opacity:.7}.form-check{display:flex;align-items:center;gap:8px;margin:6px 0}.form-check input[type=checkbox]{width:16px;height:16px;accent-color:var(--mco)}.btn-auth{width:100%;padding:13px 14px;background:var(--mco);color:var(--txa);border:0;border-radius:10px;font-weight:600;cursor:pointer;box-shadow:0 4px 12px var(--bxs);transition:transform .15s,box-shadow .15s,background .15s}.btn-auth:hover{background:var(--hva);transform:translateY(-1px)}.inactivo{opacity:.75}.auth-links{width:100%;display:flex;justify-content:space-between;margin-top:12px;flex-wrap:wrap}.auth-links span{color:var(--mco);cursor:pointer;padding:6px 0;font-size:.95rem}.auth-links span:hover{color:var(--hv);text-decoration:underline}#registroModal #registroForm{display:grid;grid-template-columns:1fr 1fr;gap:12px}#registroModal .modal-content{max-width:568px}@media (max-width:576px){.auth-form{padding:0 20px 24px}.auth-title{font-size:1.4rem}.auth-logo{width:70px;height:70px;margin-top:26px}#registroModal #registroForm{display:flex;flex-direction:column}}",c=e(".wiAuthCss");c.length?c.text(t):e("head").append(`<style class="wiAuthCss">${t}</style>`)}const u=t=>{const c=e(`#${t}`).addClass("active");e("body").addClass("modal-open"),setTimeout(()=>{c.find("input,select,textarea,button").filter(":visible:first").trigger("focus")},20)},h=t=>{e(`#${t}`).removeClass("active"),e(".modal.active").length||e("body").removeClass("modal-open")},I=()=>{const t=()=>{e(".modal").removeClass("active"),e("body").removeClass("modal-open")};e(document).off(".authModals").on("click.authModals",".close-modal",t).on("click.authModals",".modal",c=>{e(c.target).is(".modal")&&t()}).on("keydown.authModals",c=>{c.key==="Escape"&&t()})};j(),I()}Z();
