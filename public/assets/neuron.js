/* AFTERMATH · living neural network background (canvas 2D, no libraries) */
(function(){
  var reduce=false; try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  // deterministic random
  var seed=20141026; function rnd(){ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; }
  function rr(a,b){ return a+(b-a)*rnd(); }
  function norm(v){ var l=Math.hypot(v[0],v[1],v[2])||1; return [v[0]/l,v[1]/l,v[2]/l]; }

  function buildScene(count){
    var neurons=[], branches=[];
    for(var n=0;n<count;n++){
      var c=[rr(-1.3,1.3), rr(-0.8,0.8), rr(-1.1,1.1)];
      if(n===0) c=[0.15,-0.05,0.25];
      var soma={c:c, r:rr(0.07,0.11)};
      neurons.push(soma);
      var prim=Math.round(rr(5,8));
      for(var b=0;b<prim;b++){
        var dir=norm([rr(-1,1),rr(-1,1),rr(-1,1)]);
        grow(branches, soma.c, dir, rr(0.6,1.25), soma.r*0.55, 10, 2, soma);
      }
    }
    return {neurons:neurons, branches:branches};
  }
  function grow(out, start, dir, len, w0, segs, depth, soma){
    var pts=[start.slice()], p=start.slice(), d=dir.slice(), step=len/segs;
    for(var i=0;i<segs;i++){
      d=norm([d[0]+rr(-0.35,0.35), d[1]+rr(-0.35,0.35), d[2]+rr(-0.35,0.35)]);
      p=[p[0]+d[0]*step, p[1]+d[1]*step, p[2]+d[2]*step]; pts.push(p.slice());
      if(depth>0 && i>1 && i<segs-2 && rnd()<0.28){
        var nd=norm([d[0]+rr(-0.9,0.9), d[1]+rr(-0.9,0.9), d[2]+rr(-0.9,0.9)]);
        grow(out, p, nd, len*rr(0.35,0.6), w0*(1-i/segs)*0.8, Math.max(4,Math.round(segs*0.6)), depth-1, soma);
      }
    }
    out.push({pts:pts, w0:w0, soma:soma});
  }

  var scenes=[];
  function make(host, opt){
    var c=document.createElement('canvas'); c.className='neuron-net '+(opt.cls||''); c.setAttribute('aria-hidden','true');
    host.appendChild(c); host.classList.add('has-neuron');
    var far=document.createElement('canvas');
    var sc={c:c, ctx:c.getContext('2d'), far:far, fctx:far.getContext('2d'), opt:opt, vis:true, w:0, h:0, scene:buildScene(opt.count), pulses:[], last:0};
    if('IntersectionObserver' in window){ new IntersectionObserver(function(e){ sc.vis=e[0].isIntersecting; }).observe(c); }
    scenes.push(sc);
  }
  function size(sc){
    var d=Math.min(window.devicePixelRatio||1,2), r=sc.c.getBoundingClientRect();
    var w=Math.max(1,Math.round(r.width*d)), h=Math.max(1,Math.round(r.height*d));
    if(w!==sc.w||h!==sc.h){ sc.c.width=sc.far.width=sc.w=w; sc.c.height=sc.far.height=sc.h=h; sc.dpr=d; }
  }
  function project(sc, p, rot){
    var x=p[0]*rot.cy+p[2]*rot.sy, z=-p[0]*rot.sy+p[2]*rot.cy;
    var y=p[1]*rot.cx-z*rot.sx; z=p[1]*rot.sx+z*rot.cx;
    var f=3.6/(3.6+z), R=Math.min(sc.w,sc.h)*0.42;
    return [sc.w*0.5+x*R*f, sc.h*0.5+y*R*f, z, f];
  }
  var TUBE='52,74,112', HI='150,175,210', SPARK='242,170,70';
  var BG=[251,247,238], TB=[44,64,104], HL=[170,190,220];
  function mix(c,f){ return 'rgb('+Math.round(c[0]+(BG[0]-c[0])*f)+','+Math.round(c[1]+(BG[1]-c[1])*f)+','+Math.round(c[2]+(BG[2]-c[2])*f)+')'; }
  function fog(z){ return Math.max(0.15, Math.min(0.88, 0.45+z*0.32)); }
  function drawBranch(ctx, sc, br, rot, dpr){
    var P=br.pts.map(function(p){return project(sc,p,rot);});
    var n=P.length, i, w, R=Math.min(sc.w,sc.h)*0.42;
    ctx.lineCap='round'; ctx.lineJoin='round';
    // one continuous tapered path, drawn as short overlapping strokes of solid color (no alpha seams)
    for(i=1;i<n;i++){
      var t=i/(n-1), a=P[i-1], b=P[i], fz=fog((a[2]+b[2])/2);
      w=Math.max(0.7*dpr, br.w0*(1-t*0.9)*R*b[3]*0.55);
      ctx.strokeStyle=mix(TB,fz); ctx.lineWidth=w;
      ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke();
    }
    for(i=1;i<n;i++){
      var t2=i/(n-1), a2=P[i-1], b2=P[i]; w=br.w0*(1-t2*0.9)*R*b2[3]*0.55;
      if(w>2.2*dpr){ ctx.strokeStyle=mix(HL,Math.min(0.9,fog(b2[2])+0.15)); ctx.lineWidth=w*0.28;
        ctx.beginPath(); ctx.moveTo(a2[0]-w*0.2,a2[1]-w*0.2); ctx.lineTo(b2[0]-w*0.2,b2[1]-w*0.2); ctx.stroke(); }
    }
    br._p=P;
  }
  function drawSoma(ctx, sc, s, rot){
    var p=project(sc,s.c,rot), R=s.r*Math.min(sc.w,sc.h)*0.42*p[3]*0.8, fz=fog(p[2]);
    var g=ctx.createRadialGradient(p[0]-R*0.35,p[1]-R*0.35,R*0.1,p[0],p[1],R);
    g.addColorStop(0,mix(HL,fz)); g.addColorStop(0.6,mix(TB,fz)); g.addColorStop(1,mix([30,45,82],fz));
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p[0],p[1],R,0,Math.PI*2); ctx.fill();
  }
  function frame(sc, t){
    size(sc); var o=sc.opt, ctx=sc.ctx, f=sc.fctx, w=sc.w, h=sc.h, dpr=sc.dpr;
    var ay=t*o.speed+0.6, ax=0.28+0.12*Math.sin(t*o.speed*0.7);
    var rot={cy:Math.cos(ay), sy:Math.sin(ay), cx:Math.cos(ax), sx:Math.sin(ax)};
    var S=sc.scene, items=[];
    S.branches.forEach(function(b){ var m=b.pts[Math.floor(b.pts.length/2)]; items.push({k:'b',o:b,z:project(sc,m,rot)[2]}); });
    S.neurons.forEach(function(s){ items.push({k:'s',o:s,z:project(sc,s.c,rot)[2]-0.01}); });
    items.sort(function(a,b){return b.z-a.z;});
    ctx.clearRect(0,0,w,h); f.clearRect(0,0,w,h);
    var useBlur=('filter' in ctx);
    items.forEach(function(it){
      var target=(useBlur && it.z>0.35)? f : ctx;
      if(it.k==='b') drawBranch(target, sc, it.o, rot, dpr); else drawSoma(target, sc, it.o, rot);
    });
    if(useBlur){ ctx.save(); ctx.globalCompositeOperation='destination-over'; ctx.filter='blur('+(3*dpr)+'px)'; ctx.globalAlpha=1; ctx.drawImage(sc.far,0,0); ctx.restore(); }
    // impulses travelling outward along branches
    if(!reduce && t-sc.last>o.pulseEvery){ sc.last=t; var br=S.branches[Math.floor(rnd()*S.branches.length)]; sc.pulses.push({b:br, t0:t, dur:rr(1.6,2.8)}); }
    sc.pulses=sc.pulses.filter(function(p){ return t-p.t0<p.dur; });
    ctx.save(); ctx.globalCompositeOperation='lighter';
    sc.pulses.forEach(function(p){
      var P=p.b._p; if(!P) return; var u=(t-p.t0)/p.dur, idx=u*(P.length-1), i=Math.floor(idx), fr=idx-i, a=P[i], b=P[Math.min(i+1,P.length-1)];
      var x=a[0]+(b[0]-a[0])*fr, y=a[1]+(b[1]-a[1])*fr, R=(10+14*Math.sin(Math.PI*u))*dpr*a[3];
      var g=ctx.createRadialGradient(x,y,0,x,y,R); g.addColorStop(0,'rgba(255,240,200,0.95)'); g.addColorStop(0.25,'rgba('+SPARK+',0.75)'); g.addColorStop(1,'rgba('+SPARK+',0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,R,0,Math.PI*2); ctx.fill();
    });
    ctx.restore();
  }
  var lastMs=0;
  function loop(ms){
    if(ms-lastMs>33){ lastMs=ms; var t=ms/1000; for(var j=0;j<scenes.length;j++){ if(scenes[j].vis && !document.hidden) frame(scenes[j],t); } }
    requestAnimationFrame(loop);
  }
  function init(){
    document.querySelectorAll('.hero').forEach(function(h){ make(h,{cls:'net-hero',count:7,speed:0.05,pulseEvery:0.7}); });
    document.querySelectorAll('.page-head').forEach(function(h){ make(h,{cls:'net-page',count:4,speed:0.06,pulseEvery:1.1}); });
    if(reduce){ scenes.forEach(function(s){ frame(s,8); }); window.addEventListener('resize',function(){ scenes.forEach(function(s){ frame(s,8); }); }); }
    else requestAnimationFrame(loop);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
