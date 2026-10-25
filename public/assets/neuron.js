/* AFTERMATH · living neural networks — one motif per page, same visual language (canvas 2D, no libraries) */
(function(){
  var reduce=false; try{reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  var seed=1; function rnd(){ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; }
  function rr(a,b){ return a+(b-a)*rnd(); }
  function norm(v){ var l=Math.hypot(v[0],v[1],v[2])||1; return [v[0]/l,v[1]/l,v[2]/l]; }
  function add(a,b,k){ return [a[0]+b[0]*k,a[1]+b[1]*k,a[2]+b[2]*k]; }
  function jitter(d,j){ return norm([d[0]+rr(-j,j),d[1]+rr(-j,j),d[2]+rr(-j,j)]); }

  /* ---------- builders ---------- */
  function grow(S, start, dir, len, w0, segs, depth, opt){
    opt=opt||{}; var pts=[start.slice()], p=start.slice(), d=dir.slice(), step=len/segs, bend=opt.bend||0.35;
    for(var i=0;i<segs;i++){
      d=jitter(d,bend); if(opt.flat) d=norm([d[0],d[1],d[2]*opt.flat]);
      p=add(p,d,step); pts.push(p.slice());
      if(depth>0 && i>1 && i<segs-2 && rnd()<(opt.split||0.28)){
        grow(S, p, jitter(d,0.9), len*rr(0.35,0.6), w0*(1-i/segs)*0.8, Math.max(4,Math.round(segs*0.6)), depth-1, opt);
      }
    }
    var b={pts:pts, w0:w0}; S.branches.push(b); return b;
  }
  function link(S, a, b, w0, sag){
    var pts=[], n=12, m=[(a[0]+b[0])/2+rr(-sag,sag),(a[1]+b[1])/2+rr(-sag,sag),(a[2]+b[2])/2+rr(-sag,sag)];
    for(var i=0;i<=n;i++){ var t=i/n, u=1-t; pts.push([u*u*a[0]+2*u*t*m[0]+t*t*b[0], u*u*a[1]+2*u*t*m[1]+t*t*b[1], u*u*a[2]+2*u*t*m[2]+t*t*b[2]]); }
    var br={pts:pts, w0:w0, link:true}; S.branches.push(br); return br;
  }
  function soma(S, c, r, extra){ var s={c:c, r:r}; for(var k in extra) s[k]=extra[k]; S.neurons.push(s); return s; }

  var BUILD={
    // home: 3D tube neurons (approved look)
    tubes:function(S){ for(var n=0;n<7;n++){ var c=n?[rr(-1.3,1.3),rr(-0.8,0.8),rr(-1.1,1.1)]:[0.15,-0.05,0.25], s=soma(S,c,rr(0.07,0.11));
      for(var b=0,k=Math.round(rr(5,8));b<k;b++) grow(S,c,norm([rr(-1,1),rr(-1,1),rr(-1,1)]),rr(0.6,1.25),s.r*0.55,10,2); } },
    // services / news: glowing mesh of small cells joined by fine fibres
    mesh:function(S){ var cs=[]; for(var n=0;n<15;n++){ var c=[rr(-1.4,1.4),rr(-0.9,0.9),rr(-0.9,0.9)]; cs.push(c); soma(S,c,rr(0.035,0.055));
      for(var b=0;b<3;b++) grow(S,c,norm([rr(-1,1),rr(-1,1),rr(-1,1)]),rr(0.25,0.5),0.022,6,1,{split:0.35}); }
      cs.forEach(function(a,i){ cs.map(function(b,j){return [Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]),j];}).sort(function(x,y){return x[0]-y[0];}).slice(1,3).forEach(function(q){ if(q[1]>i){ var L=link(S,a,cs[q[1]],0.016,0.25); S.nodes.push(L.pts[6]); } }); });
      for(var g=0;g<26;g++) S.nodes.push([rr(-1.5,1.5),rr(-1,1),rr(-1,1)]); },
    // approach: one neuron, a long axon carrying the signal from start to result
    axon:function(S){ var c=[-1.15,0.05,0.1], s=soma(S,c,0.1);
      for(var b=0;b<7;b++) grow(S,c,norm([rr(-1,-0.2),rr(-1,1),rr(-1,1)]),rr(0.45,0.8),0.05,8,2);
      var ax=grow(S,c,[1,0.05,0],2.5,0.05,26,0,{bend:0.12}); ax.axon=true; S.axon=ax;
      var end=ax.pts[ax.pts.length-1]; for(var t=0;t<6;t++) grow(S,end,norm([rr(0.3,1),rr(-1,1),rr(-1,1)]),rr(0.25,0.45),0.02,6,1);
      for(var f=0;f<5;f++){ var fc=[rr(-1.5,1.5),rr(-1,1),rr(0.6,1.4)]; soma(S,fc,rr(0.04,0.06)); for(var q=0;q<4;q++) grow(S,fc,norm([rr(-1,1),rr(-1,1),rr(-1,1)]),rr(0.3,0.6),0.025,6,1); }
      for(var g=0;g<14;g++) S.nodes.push([rr(-1.5,1.5),rr(-1,1),rr(-1,1)]); },
    // track record: dense culture of spindle cells, each tied to its neighbours
    web:function(S){ var cs=[]; for(var n=0;n<13;n++){ var c=[rr(-1.4,1.4),rr(-0.95,0.95),rr(-0.35,0.35)]; cs.push(c);
        var e=norm([rr(-1,1),rr(-0.6,0.6),rr(-0.2,0.2)]); soma(S,c,rr(0.07,0.1),{e:e,k:rr(1.6,2.2)});
        grow(S,add(c,e,0.12),e,rr(0.3,0.6),0.035,6,1,{flat:0.3}); grow(S,add(c,e,-0.12),[-e[0],-e[1],-e[2]],rr(0.3,0.6),0.035,6,1,{flat:0.3}); }
      cs.forEach(function(a,i){ cs.map(function(b,j){return [Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]),j];}).sort(function(x,y){return x[0]-y[0];}).slice(1,4).forEach(function(q){ if(q[1]>i) link(S,a,cs[q[1]],0.03,0.12); }); }); },
    // leadership: one leading neuron with a glowing golden core and a wide arbour
    core:function(S){ var c=[0,0,0]; soma(S,c,0.17,{core:true});
      for(var b=0;b<11;b++) grow(S,c,norm([rr(-1,1),rr(-1,1),rr(-1,1)]),rr(0.9,1.4),0.06,12,3,{split:0.32});
      for(var f=0;f<3;f++){ var fc=[rr(-1.6,1.6),rr(-1,1),rr(0.9,1.5)]; soma(S,fc,0.05); for(var q=0;q<5;q++) grow(S,fc,norm([rr(-1,1),rr(-1,1),rr(-1,1)]),rr(0.3,0.6),0.025,6,1); }
      for(var g=0;g<18;g++) S.nodes.push([rr(-1.4,1.4),rr(-1,1),rr(-1,1)]); },
    // contact: two neurons reaching towards each other, sparking at the synapse
    synapse:function(S){ var a=[-1.05,-0.15,0], b=[1.05,0.15,0.1]; soma(S,a,0.11); soma(S,b,0.11);
      for(var i=0;i<6;i++){ grow(S,a,norm([rr(-1,-0.1),rr(-1,1),rr(-1,1)]),rr(0.4,0.8),0.05,8,2); grow(S,b,norm([rr(0.1,1),rr(-1,1),rr(-1,1)]),rr(0.4,0.8),0.05,8,2); }
      var mid=[0,0,0.05]; var la=link(S,a,[-0.06,0,0.05],0.045,0.15); la.axon=true; var lb=link(S,b,[0.06,0,0.05],0.045,0.15); lb.axon=true;
      S.axon=la; S.axon2=lb; S.synapse=mid; for(var g=0;g<10;g++) S.nodes.push([rr(-1.4,1.4),rr(-1,1),rr(-1,1)]); }
  };
  function buildScene(variant, s){ seed=s; var S={neurons:[],branches:[],nodes:[],variant:variant}; BUILD[variant](S); return S; }

  /* ---------- rendering ---------- */
  var BG=[251,247,238], TB=[44,64,104], HL=[170,190,220], GOLD='242,170,70';
  function mix(c,f){ return 'rgb('+Math.round(c[0]+(BG[0]-c[0])*f)+','+Math.round(c[1]+(BG[1]-c[1])*f)+','+Math.round(c[2]+(BG[2]-c[2])*f)+')'; }
  function fog(z){ return Math.max(0.15, Math.min(0.88, 0.45+z*0.32)); }
  var scenes=[];
  function make(host, opt){
    var c=document.createElement('canvas'); c.className='neuron-net '+(opt.cls||''); c.setAttribute('aria-hidden','true');
    host.appendChild(c); host.classList.add('has-neuron');
    var far=document.createElement('canvas');
    var sc={c:c, ctx:c.getContext('2d'), far:far, fctx:far.getContext('2d'), opt:opt, vis:true, w:0, h:0, scene:buildScene(opt.variant, opt.seed), pulses:[], last:0};
    if('IntersectionObserver' in window){ new IntersectionObserver(function(e){ sc.vis=e[0].isIntersecting; }).observe(c); }
    scenes.push(sc);
  }
  function size(sc){ var d=Math.min(window.devicePixelRatio||1,2), r=sc.c.getBoundingClientRect(), w=Math.max(1,Math.round(r.width*d)), h=Math.max(1,Math.round(r.height*d));
    if(w!==sc.w||h!==sc.h){ sc.c.width=sc.far.width=sc.w=w; sc.c.height=sc.far.height=sc.h=h; } sc.dpr=d; }
  function project(sc, p, rot){ var x=p[0]*rot.cy+p[2]*rot.sy, z=-p[0]*rot.sy+p[2]*rot.cy, y=p[1]*rot.cx-z*rot.sx; z=p[1]*rot.sx+z*rot.cx;
    var f=3.6/(3.6+z), R=Math.min(sc.w,sc.h)*0.42*(sc.opt.zoom||1); return [sc.w*0.5+x*R*f, sc.h*0.5+y*R*f, z, f]; }
  function drawBranch(ctx, sc, br, rot){
    var P=br.pts.map(function(p){return project(sc,p,rot);}), n=P.length, i, w, R=Math.min(sc.w,sc.h)*0.42*(sc.opt.zoom||1), dpr=sc.dpr;
    ctx.lineCap='round'; ctx.lineJoin='round';
    for(i=1;i<n;i++){ var t=i/(n-1), a=P[i-1], b=P[i], taper=br.link?(0.55+0.45*Math.abs(1-2*t)):(1-t*0.9);
      w=Math.max(0.6*dpr, br.w0*taper*R*b[3]*0.55); ctx.strokeStyle=mix(TB,fog((a[2]+b[2])/2)); ctx.lineWidth=w;
      ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); }
    for(i=1;i<n;i++){ var t2=i/(n-1), a2=P[i-1], b2=P[i], tp=br.link?(0.55+0.45*Math.abs(1-2*t2)):(1-t2*0.9); w=br.w0*tp*R*b2[3]*0.55;
      if(w>2.2*dpr){ ctx.strokeStyle=mix(HL,Math.min(0.9,fog(b2[2])+0.15)); ctx.lineWidth=w*0.28; ctx.beginPath(); ctx.moveTo(a2[0]-w*0.2,a2[1]-w*0.2); ctx.lineTo(b2[0]-w*0.2,b2[1]-w*0.2); ctx.stroke(); } }
    br._p=P;
  }
  function drawSoma(ctx, sc, s, rot, t){
    var p=project(sc,s.c,rot), R=s.r*Math.min(sc.w,sc.h)*0.42*(sc.opt.zoom||1)*p[3]*0.8, fz=fog(p[2]), rx=R, ry=R, ang=0;
    if(s.e){ var q=project(sc,add(s.c,s.e,s.r*s.k),rot); rx=Math.max(R,Math.hypot(q[0]-p[0],q[1]-p[1])); ang=Math.atan2(q[1]-p[1],q[0]-p[0]); }
    var g=ctx.createRadialGradient(p[0]-R*0.35,p[1]-R*0.35,R*0.1,p[0],p[1],Math.max(rx,ry));
    g.addColorStop(0,mix(HL,fz)); g.addColorStop(0.6,mix(TB,fz)); g.addColorStop(1,mix([30,45,82],fz));
    ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(p[0],p[1],rx,ry,ang,0,Math.PI*2); ctx.fill();
    if(s.core){ var pul=0.75+0.25*Math.sin(t*1.6), cr=R*0.75*pul; ctx.save(); ctx.globalCompositeOperation='lighter';
      var cg=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],cr*1.8); cg.addColorStop(0,'rgba(255,236,190,0.95)'); cg.addColorStop(0.35,'rgba('+GOLD+',0.8)'); cg.addColorStop(1,'rgba('+GOLD+',0)');
      ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(p[0],p[1],cr*1.8,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  }
  function glow(ctx,x,y,R,a){ var g=ctx.createRadialGradient(x,y,0,x,y,R); g.addColorStop(0,'rgba(255,240,200,'+(0.95*a)+')'); g.addColorStop(0.25,'rgba('+GOLD+','+(0.75*a)+')'); g.addColorStop(1,'rgba('+GOLD+',0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,R,0,Math.PI*2); ctx.fill(); }
  function along(P,u){ var idx=u*(P.length-1), i=Math.floor(idx), fr=idx-i, a=P[i], b=P[Math.min(i+1,P.length-1)]; return [a[0]+(b[0]-a[0])*fr, a[1]+(b[1]-a[1])*fr, a[3]]; }
  function frame(sc, t){
    size(sc); var o=sc.opt, ctx=sc.ctx, f=sc.fctx, w=sc.w, h=sc.h, dpr=sc.dpr, S=sc.scene;
    var ay=t*o.speed+(o.yaw||0.6), ax=(o.pitch||0.28)+0.12*Math.sin(t*o.speed*0.7), rot={cy:Math.cos(ay), sy:Math.sin(ay), cx:Math.cos(ax), sx:Math.sin(ax)};
    var items=[]; S.branches.forEach(function(b){ items.push({k:'b',o:b,z:project(sc,b.pts[Math.floor(b.pts.length/2)],rot)[2]}); });
    S.neurons.forEach(function(s){ items.push({k:'s',o:s,z:project(sc,s.c,rot)[2]-0.01}); });
    items.sort(function(a,b){return b.z-a.z;}); ctx.clearRect(0,0,w,h); f.clearRect(0,0,w,h);
    var useBlur=('filter' in ctx);
    items.forEach(function(it){ var tg=(useBlur&&it.z>0.35)?f:ctx; if(it.k==='b') drawBranch(tg,sc,it.o,rot); else drawSoma(tg,sc,it.o,rot,t); });
    if(useBlur){ ctx.save(); ctx.globalCompositeOperation='destination-over'; ctx.filter='blur('+(3*dpr)+'px)'; ctx.drawImage(sc.far,0,0); ctx.restore(); }
    ctx.save(); ctx.globalCompositeOperation='lighter';
    // twinkling nodes
    S.nodes.forEach(function(n,i){ var p=project(sc,n,rot), a=0.35+0.65*Math.max(0,Math.sin(t*1.3+i*1.7)); glow(ctx,p[0],p[1],(4+5*a)*dpr*p[3],a*(1-fog(p[2])*0.6)); });
    // impulses
    if(!reduce && t-sc.last>o.pulseEvery){ sc.last=t;
      var br=S.axon && rnd()<0.75 ? (S.axon2 && rnd()<0.5 ? S.axon2 : S.axon) : S.branches[Math.floor(rnd()*S.branches.length)];
      sc.pulses.push({b:br, t0:t, dur:br.axon?rr(1.8,2.4):rr(1.4,2.6)}); }
    sc.pulses=sc.pulses.filter(function(p){ return t-p.t0<p.dur; });
    sc.pulses.forEach(function(p){ var P=p.b._p; if(!P) return; var u=(t-p.t0)/p.dur, q=along(P,u); glow(ctx,q[0],q[1],(10+14*Math.sin(Math.PI*u))*dpr*q[2],1); });
    if(S.synapse){ var sp=project(sc,S.synapse,rot), k=Math.pow(Math.max(0,Math.sin(t*1.4)),6); glow(ctx,sp[0],sp[1],(14+30*k)*dpr*sp[3],0.35+0.65*k); }
    ctx.restore();
  }
  var lastMs=0;
  function loop(ms){ if(ms-lastMs>33){ lastMs=ms; var t=ms/1000; for(var j=0;j<scenes.length;j++){ if(scenes[j].vis && !document.hidden) frame(scenes[j],t); } } requestAnimationFrame(loop); }
  var PAGE={ services:{variant:'mesh',seed:31,speed:0.05,pulseEvery:0.9,zoom:1},
             approach:{variant:'axon',seed:7,speed:0.035,pulseEvery:1.3,zoom:1.25,yaw:0.15,pitch:0.18},
             'track-record':{variant:'web',seed:12,speed:0.04,pulseEvery:1,zoom:1,pitch:0.15},
             leadership:{variant:'core',seed:5,speed:0.05,pulseEvery:0.8,zoom:1.15},
             news:{variant:'mesh',seed:77,speed:0.06,pulseEvery:0.7,zoom:1.1},
             contact:{variant:'synapse',seed:3,speed:0.03,pulseEvery:1.6,zoom:1.35,yaw:0.1,pitch:0.15} };
  function pageKey(){ var a=document.querySelector('.links a.on'); if(a){ var m=(a.getAttribute('href')||'').match(/(services|approach|track-record|leadership|news|contact)/); if(m) return m[1]; }
    var m2=location.pathname.match(/(services|approach|track-record|leadership|news|contact)/); return m2?m2[1]:null; }
  function init(){
    document.querySelectorAll('.hero').forEach(function(h){ make(h,{cls:'net-hero',variant:'tubes',seed:20141026,speed:0.05,pulseEvery:0.7}); });
    var key=pageKey(), cfg=PAGE[key]||PAGE.services;
    document.querySelectorAll('.page-head').forEach(function(h){ var o={cls:'net-page'}; for(var k in cfg) o[k]=cfg[k]; make(h,o); });
    if(reduce){ scenes.forEach(function(s){ frame(s,8); }); window.addEventListener('resize',function(){ scenes.forEach(function(s){ frame(s,8); }); }); }
    else requestAnimationFrame(loop);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
