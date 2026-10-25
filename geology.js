/* Deterministic, local pixel-art geology. Canvas is decorative; all facts remain HTML. */
(() => {
 const palettes = [
 ['#493a28','#58432b','#685033','#7b5b37','#8a6941','#372d22'],
 ['#44372c','#554231','#675039','#796044','#8b7252','#302c25'],
 ['#343d37','#414b41','#50584a','#626550','#74765a','#252d29'],
 ['#2b3939','#354445','#435351','#53615a','#6c7162','#222e30'],
 ['#3b3940','#49464c','#585259','#6b6368','#827773','#2c2c32'],
 ['#3c4030','#4b4d36','#595c3f','#6e704b','#888359','#2c3027'],
 ['#443b34','#54473b','#675442','#7c654c','#927c5b','#302f29'],
 ['#4c352e','#5e4033','#714b38','#865a40','#9c6b4a','#382b28'],
 ['#5b3327','#74402b','#8f4f30','#ab6237','#c57b45','#412a24'],
 ['#725036','#87613e','#9a7347','#b38d57','#ccaa6b','#503d30'],
 ['#88623b','#a17a47','#b99458','#cfaf72','#e1c991','#624c33']
 ];
 function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
 const canvases=[];
 document.querySelectorAll('.scene').forEach((scene,index)=>{
 const canvas=document.createElement('canvas');canvas.className='geology';canvas.width=640;canvas.height=400;canvas.setAttribute('aria-hidden','true');scene.prepend(canvas);canvases.push(canvas);
 const x=canvas.getContext('2d',{alpha:false}),r=rng(7741+index*193),p=palettes[index];
 x.fillStyle=p[0];x.fillRect(0,0,640,400);
 // Irregular sedimentary bands, rendered at low resolution for true pixel edges.
 for(let row=-40;row<450;row+=18+Math.floor(r()*20)){
 const thickness=12+r()*25,slope=(r()-.5)*.13;const points=[];
 for(let col=-40;col<=680;col+=16)points.push([col,Math.round(row+Math.sin(col/80+index)*8+col*slope+r()*4)]);
 x.beginPath();points.forEach(([a,b],j)=>j?x.lineTo(a,b):x.moveTo(a,b));points.slice().reverse().forEach(([a,b])=>x.lineTo(a,b+thickness));x.closePath();x.fillStyle=p[Math.floor(r()*5)];x.fill();
 x.strokeStyle=p[5];x.lineWidth=1;x.beginPath();points.forEach(([a,b],j)=>j?x.lineTo(a,b):x.moveTo(a,b));x.stroke();
 }
 // Grain, inclusions and small mineral glints; deterministic across visits.
 for(let j=0;j<10500;j++){const a=Math.floor(r()*640),b=Math.floor(r()*400);x.globalAlpha=.12+r()*.25;x.fillStyle=p[Math.floor(r()*6)];x.fillRect(a,b,1+Math.floor(r()*4),1+Math.floor(r()*2));}x.globalAlpha=1;
 for(let j=0;j<110;j++){const a=r()*640,b=r()*400,w=3+r()*17,h=2+r()*9;x.fillStyle=p[5];x.fillRect(a,b,w,h);x.fillStyle=p[2];x.fillRect(a+1,b+1,w-2,h-2);x.fillStyle=p[4];x.fillRect(a+1,b+1,w-3,1);}
 // Fractures, branching naturally rather than an artificial central shaft.
 for(let j=0;j<18;j++){let a=r()*640,b=r()*400;x.beginPath();x.moveTo(a,b);for(let k=0;k<8;k++){a+=(r()-.5)*22;b+=5+r()*13;x.lineTo(Math.round(a),Math.round(b));}x.strokeStyle=p[5];x.lineWidth=1+r()*2;x.stroke();}
 if(index<2){
 for(let j=0;j<24;j++){let a=r()*640,b=-10;const length=30+r()*150;x.strokeStyle=j%2?'#99805a':'#6f603d';x.lineWidth=1+r()*2;x.beginPath();x.moveTo(a,b);for(let k=0;k<length/8;k++){a+=(r()-.5)*16;b+=8;x.lineTo(Math.round(a),b);if(k%4===0){x.moveTo(a,b);x.lineTo(a+12*(r()-.5),b+12);x.moveTo(a,b);}}x.stroke();}
 }
 if(index===2){for(let j=0;j<8;j++){const a=25+r()*590,b=30+r()*340;x.strokeStyle='#a7a687';x.lineWidth=2;x.beginPath();for(let k=0;k<45;k++){const angle=k*.25,rad=k*.32;const px=a+Math.cos(angle)*rad,py=b+Math.sin(angle)*rad;k?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();}}
 if(index===3){x.strokeStyle='#6faaa6';x.lineWidth=2;for(let j=0;j<9;j++){let a=r()*640,b=r()*400;x.beginPath();x.moveTo(a,b);for(let k=0;k<7;k++){a+=(r()-.45)*25;b+=7;x.lineTo(Math.round(a),Math.round(b));}x.stroke();}}
 if(index===4||index===5){for(let j=0;j<25;j++){const a=r()*640,b=r()*400,h=5+r()*16;x.fillStyle=index===4?'#a697b7':'#a5ad77';x.beginPath();x.moveTo(a,b);x.lineTo(a+4,b+6);x.lineTo(a+3,b+h);x.lineTo(a-3,b+h);x.lineTo(a-4,b+6);x.fill();x.fillStyle=index===4?'#6e617b':'#6f7c4d';x.fillRect(a,b+6,3,h-6);}}
 if(index>=8){for(let j=0;j<35;j++){let a=r()*640,b=r()*400;x.strokeStyle=index===8?'#d29452':'#d5b477';x.globalAlpha=.18+r()*.25;x.lineWidth=1+r()*3;x.beginPath();x.moveTo(a,b);for(let k=0;k<8;k++){a+=8;b+=Math.sin(k*.8+j)*4;x.lineTo(Math.round(a),Math.round(b));}x.stroke();}x.globalAlpha=1;}
 // Focal rock bed behind the main specimen, with a soft vignette around the scene.
 const shade=x.createRadialGradient(310,190,80,310,190,390);shade.addColorStop(0,'#00000000');shade.addColorStop(1,'#080e10b8');x.fillStyle=shade;x.fillRect(0,0,640,400);
 });
})();
