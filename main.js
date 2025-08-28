import $ from 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth, db } from './firebase/init.js';
import { onAuthStateChanged } from "firebase/auth"; //Para detectar cambios Login 
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

// PARA LAS NOTAS 
// P1) Notas + persistencia
gosaves('.txe','id',$e=>$e.html()); getsaves('.txe','id',($e,v)=>$e.html(v));
const $tx=$('.txe'), $nt=$('.nts'), $tb=$('.editor .hcon'); let cont=0;
const idn=s=>+String(s).replace(/\D+/g,'')||0, txt=(h,l=34)=>$('<div>').html(h||'').text().replace(/\s+/g,' ').trim().slice(0,l);
const act=id=>($('[data-ki^="ki"]').removeClass('activa'),$(`[data-ki="${id}"]`).addClass('activa'));
const chip=(id,t)=>{const $c=$(`[data-ki="${id}"]`); $c.length?$c.text(t):$(`<div class="nt nt${idn(id)}" data-ki="${id}">${t}</div>`).appendTo($nt);};
const carg=id=>{const v=getls(id)||''; $tx.attr('id',id).html(v).focus(); act(id);};
const ini=()=>{const ch=$('[data-ki^="ki"]').map((i,e)=>idn($(e).data('ki'))).get(); const ks=Object.keys(localStorage).filter(k=>/^ki\d+$/.test(k)); cont=Math.max(cont,0,...ch,...ks.map(idn)); $.each(ks,(_,id)=>{const v=getls(id); v&&chip(id,txt(v)+'...')});};
const okg=(()=>{let t;return(ms=1800)=>{const $b=$('.guardar_nota');if(!$b.length)return;$b.addClass('bta').text('Guardado');clearTimeout(t);t=setTimeout(()=>{$b.removeClass('bta').text('Guardar');},ms);};})();
$tx.on('input',()=>{const id=$tx.attr('id'); if(id){savels(id,$tx.html(),24); const t=txt(getls(id)); t&&$(`[data-ki="${id}"]`).text(t+'...'); okg();}});
$(document).on('click','.guardar_nota',()=>{const id=$tx.attr('id'); if(!id)return; savels(id,$tx.html(),24); okg();});
ini();

// P2) Interacciones UI
$(document).on('click','.agregar_nota',()=>{const id=`ki${++cont}`; chip(id,`Nota ${cont}`); carg(id);});
$(document).on('click','[data-ki^="ki"]',e=>carg($(e.currentTarget).data('ki')));
$(document).on('click','.limpiar_nota',()=>{const id=$tx.attr('id'); if(!id)return; $tx.empty(); removels(id); chip(id,'Nota vacía...');adtm(this,'bta','Eliminado','Eliminar'); });

// P3) Toolbar editor
const CMD={'.fa-bold':'bold','.fa-italic':'italic','.fa-underline':'underline','.fa-list-ul':'insertUnorderedList','.fa-list-ol':'insertOrderedList','.fa-align-left':'justifyLeft','.fa-align-center':'justifyCenter','.fa-align-right':'justifyRight','.fa-rotate-left':'undo'};
$.each(CMD,(sel,cmd)=>$tb.find(sel).attr('data-cmd',cmd));
let rng=null; const enEd=()=>{const s=window.getSelection(); if(!s||!s.rangeCount)return false; const n=s.anchorNode; return n&&($tx[0]===n||$.contains($tx[0],n));};
const gSel=()=>{const s=window.getSelection(); if(s&&s.rangeCount&&enEd()) rng=s.getRangeAt(0);};
const rSel=()=>{if(!rng)return; const s=window.getSelection(); s.removeAllRanges(); s.addRange(rng);};
const exe=c=>{if(!enEd()&&rng) rSel(); document.execCommand(c,false,null); $tx.focus(); gSel(); sTb();};
$tb.on('mousedown','i',e=>e.preventDefault()).on('click','i',function(){const c=$(this).data('cmd'); c&&exe(c);});
const EST=[['.fa-bold','bold'],['.fa-italic','italic'],['.fa-underline','underline'],['.fa-list-ul','insertUnorderedList'],['.fa-list-ol','insertOrderedList']];
const sTb=()=>{if(!enEd()) return void $tb.find('i').removeClass('actv').addClass('is-disabled'); $tb.find('i').removeClass('is-disabled'); $.each(EST,(_,a)=>$tb.find(a[0]).toggleClass('actv',document.queryCommandState(a[1]))); const ce=document.queryCommandState('justifyCenter'), dr=document.queryCommandState('justifyRight'); $tb.find('.fa-align-center').toggleClass('actv',ce); $tb.find('.fa-align-right').toggleClass('actv',dr); $tb.find('.fa-align-left').toggleClass('actv',!ce&&!dr);};
document.addEventListener('selectionchange',()=>{gSel(); sTb();}); $tx.on('keyup mouseup input',()=>{gSel(); sTb();}); gSel(); sTb();


// ==============================
// PARA LAS IMÁGENES + SLIDESHOW
// ==============================

const $ps=$('.paste'), $bx=$('.ibx .bx'); $bx.each((i,e)=>$(e).attr('data-k',`im${i+1}`));
const $vw=$('.vw'), $im=$('.vw img'), $th=$('.vw .th'); let ci=-1;
const lst=()=>$bx.map((i,e)=>$(e).attr('data-src')?i:null).get();
const thumb=()=>{const L=lst(); $th.empty().append(L.map(i=>`<div class="ti" data-i="${i}"><img src="${$bx.eq(i).attr('data-src')}"></div>`)); $th.find(`[data-i="${ci}"]`).addClass('on');};
const set=(i,src)=>{const $b=$bx.eq(i); $b.attr('data-src',src).addClass('fill').html(`<img src="${src}">`); savels($b.attr('data-k'),src,720); thumb();};
const emp=()=>$bx.toArray().findIndex(e=>!$(e).attr('data-src'));
const put=src=>{let i=emp(); if(i<0)i=0; set(i,src);};
const rea=f=>{const r=new FileReader(); r.onload=()=>put(r.result); r.readAsDataURL(f);};
const take=fs=>Array.from(fs).forEach(f=>f&&/^image\//.test(f.type)&&rea(f));
$ps.on('paste',e=>{const d=e.originalEvent.clipboardData; d&&take(Array.from(d.items).map(x=>x.getAsFile()).filter(Boolean));});
$ps.on('dblclick',()=>{ $('<input type="file" accept="image/*" multiple hidden>').appendTo('body').on('change',e=>{take(e.target.files); $(e.target).remove();}).trigger('click'); });

getsaves('.ibx .bx','data-k',($e,v)=>{ if(v){ $e.attr('data-src',v).addClass('fill').html(`<img src="${v}">`); } }); gosaves('.ibx .bx','data-k',$e=>$e.attr('data-src')||'');
thumb();

// Visor fullscreen + atajos
const show=i=>{const s=$bx.eq(i).attr('data-src'); if(!s)return; ci=i; $im.attr('src',s); $vw.addClass('show'); $th.find('.ti').removeClass('on'); $th.find(`[data-i="${i}"]`).addClass('on'); const $ti=$th.find(`[data-i="${i}"]`); $ti.length&&$th.animate({scrollLeft:Math.max(0,$ti.position().left+$th.scrollLeft()-($th.width()-$ti.width())/2)},180);};
const hide=()=>{$vw.removeClass('show'); ci=-1;};
const nx =()=>{const L=lst(); if(!L.length)return hide(); show(L[(L.indexOf(ci)+1)%L.length]);};
const pv =()=>{const L=lst(); if(!L.length)return hide(); show(L[(L.indexOf(ci)-1+L.length)%L.length]);};
const dl =()=>{const a=$('<a>').attr({href:$im.attr('src'),download:`wiimage-${ci+1}.png`}).appendTo('body'); a[0].click(); a.remove();};
const rm =()=>{const $b=$bx.eq(ci); removels($b.attr('data-k')); $b.removeAttr('data-src').removeClass('fill').empty(); thumb(); const L=lst(); L.length?show(L[0]):hide();};

$(document).on('click','.ibx .bx',e=>{const i=$bx.index(e.currentTarget); $(e.currentTarget).attr('data-src')&&show(i);});
$(document).on('click','.vw .cls, .vw',e=>{if(e.target===e.currentTarget||$(e.target).closest('.cls').length) hide();});
$(document).on('click','.vw .nx',nx); $(document).on('click','.vw .pv',pv); $(document).on('click','.vw .dl',dl); $(document).on('click','.vw .rm',rm);
$(document).on('click','.vw .th .ti',e=>show(+$(e.currentTarget).data('i')));

// Teclado: > sig, < ant, Esc salir, Ctrl+S guardar, Supr eliminar
$(document).on('keydown',e=>{
  if(!$vw.hasClass('show')) return;
  if(e.ctrlKey&&(e.key==='s'||e.key==='S')) return e.preventDefault(), dl();
  if(e.key==='Escape') return hide();
  if(e.key==='ArrowRight'||e.key==='>'||e.key=== '.') return nx();
  if(e.key==='ArrowLeft'||e.key==='<'||e.key=== ',') return pv();
  if(e.key==='Delete'||e.key==='Supr'||e.key==='Backspace') return rm();
});

$('.bt_borrar').click(function(){
  if(!confirm('¿Eliminar todo lo guardado?')) return;
  try{ localStorage.clear(); }catch(_){ Object.keys(localStorage).forEach(k=>localStorage.removeItem(k)); }
  // Notas
  $('[data-ki^="ki"]').remove(); $tx.removeAttr('id').empty(); cont=0;
  // Imágenes
  $bx.removeAttr('data-src').removeClass('fill').empty(); thumb && thumb(); $vw.removeClass('show'); ci=-1;
  // Feedback
  adtm(this,'bta','Eliminado','Eliminar');
});