(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(t,e,i){"use strict";i.r(e);var n=i(5),a=i.n(n),o=i(57),r=i.n(o),s=(i(78),i(7)),h=i(58),c=i.n(h),l=(i(79),i(21)),u=i.n(l),f=i(59),g=i.n(f),d=i(60),v=i.n(d),m=i(61),b=i.n(m),p=function(t){var e=t.ctxReady,i={width:{max:t.imageWidth},height:{max:t.imageHeight},facingMode:"environment"},o=Object(n.useState)(""),r=Object(s.a)(o,2),h=r[0],c=r[1],l=Object(n.useState)(""),f=Object(s.a)(l,2),d=f[0],m=f[1],p=Object(n.useState)(""),x=Object(s.a)(p,2),y=x[0],w=x[1],k=Object(n.useState)(""),O=Object(s.a)(k,2),E=O[0],j=O[1],L=Object(n.useState)(null),C=Object(s.a)(L,2),I=C[0],T=C[1],R=Object(n.createRef)(),V=a.a.useRef(null),M=Object(n.useCallback)(function(){V.current&&c(V.current.getScreenshot())},[V]),X=Object(n.useCallback)(function(){console.log("we did it ");var t=V.current.video;console.log(t.videoWidth),setTimeout(function(){T({width:t.videoWidth,height:t.videoHeight}),console.log(t.videoWidth)},1e3)},[]),Y=a.a.createElement(g.a,{onUserMedia:X,className:u.a.camera,ref:V,screenshotFormat:"image/jpeg",videoConstraints:i});Object(n.useEffect)(function(){m(a.a.createElement("img",{onLoad:S,ref:P,src:h,alt:"Captured Image",id:"image"}))},[h]);var P=Object(n.useCallback)(function(t){w(t)},[d]),S=function(t){var e=t.target;j(e)};Object(n.useEffect)(function(){R.current&&y&&(R.current.getContext("2d").drawImage(y,0,0),m(""),e(R.current))},[E]),Object(n.useEffect)(function(){if(R.current){var t=.5*I.height,e=(I.width-t)/2,i=(I.height-t)/2,n=R.current.getContext("2d");n.clearRect(0,0,I.width,I.height);for(var a=0;a<I.height;a++)for(var o=0;o<I.width;o++)o>e&&o<I.width-e&&a>i&&a<I.height-i||(n.fillStyle="rgba(".concat(o,",").concat(a,",0, 0.7)"),n.fillRect(o,a,1,1))}},[I]);var A=Object(n.useCallback)(function(t){c(null),j(null),m(""),e(null)},[]),D=h?a.a.createElement("button",{className:u.a.uiButton,onClick:A,style:I&&{"margin-top":"".concat(.75*I.height,"px")}},a.a.createElement("img",{src:b.a,alt:"reset"})):a.a.createElement("button",{className:u.a.uiButton,onClick:M,style:I&&{"margin-top":"".concat(.75*I.height,"px")}},a.a.createElement("img",{src:v.a,alt:"take a picture"})),H=I?a.a.createElement("canvas",{className:u.a.canvas,ref:R,height:I.height,width:I.width}):"";return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:u.a.CameraWrapper,style:I&&{height:I.height,width:I.width}},a.a.createElement("div",{className:u.a.InnerWrapper},h&&d,H,!h&&Y,D)))},x=i(0),y=i(1),w=function(){function t(e,i,n){Object(x.a)(this,t),this.x=void 0,this.y=void 0,this.rIndex=void 0,this.gIndex=void 0,this.bIndex=void 0,this.x=e,this.y=i,this.rIndex=4*(e+i*n),this.gIndex=this.rIndex+1,this.bIndex=this.gIndex+1}return Object(y.a)(t,[{key:"getColourAsHex",value:function(t){return"#".concat(this.hexVal(t[this.rIndex])).concat(this.hexVal(t[this.gIndex])).concat(this.hexVal(t[this.bIndex]))}},{key:"getColourMagnitued",value:function(t){return t[this.rIndex]+t[this.gIndex]+t[this.bIndex]}},{key:"hexVal",value:function(t){return t.toString(16)}},{key:"rgbVal",value:function(t){var e;return null===(e=t.slice(1).match(/.{1,2}/g))||void 0===e?void 0:e.map(function(t){return Number("0x".concat(t))})}},{key:"plot",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#4be11e",i=this.rgbVal(e);i?(t[this.rIndex]=i[0],t[this.gIndex]=i[1],t[this.bIndex]=i[2]):console.log("bad colour")}},{key:"inBox",value:function(t,e,i,n){return this.x>i&&this.x<t-i&&this.y>n&&this.y<e-n}}]),t}(),k={lowThreshold:10,highThreshold:30,gaussianBlur:1.1},O=[[-1,0,1],[-2,0,2],[-1,0,1]],E=[[-1,-2,-1],[0,0,0],[1,2,1]],j={bitDepth:32,mode:"periodic"};var L=function(){function t(e,i){Object(x.a)(this,t),this.a=void 0,this.b=void 0,this.a=e,this.b=i}return Object(y.a)(t,[{key:"intersects",value:function(t){var e=new w(this.a.x-this.b.x,t.a.x-t.b.x,0),i=new w(this.a.y-this.b.y,t.a.y-t.b.y,0),n=function(t,e){return t.x*e.y-t.y*e.x},a=n(e,i);if(0==a)return null;var o=new w(n(this.a,this.b),n(t.a,t.b),0);return{x:n(o,e)/a,y:n(o,i)/a}}}]),t}(),C=function(){function t(e,i,n,a){var o=this;Object(x.a)(this,t),this.THICKNESS=2,this.HOZIZONTAL="h",this.VERTICAL="v",this.ctx=void 0,this.numAngleCells=360,this.rhoMax=void 0,this.accum=new Array(this.numAngleCells),this.drawingWidth=void 0,this.drawingHeight=void 0,this.cosTable=new Array(this.numAngleCells),this.sinTable=new Array(this.numAngleCells),this.minLength=void 0,this.distance=void 0,this.maxTilt=void 0,this.findMaxInHough=function(){for(var t=[],e=0;e<360;e++)for(var i=0;i<o.accum[e].length;i++){o.accum[e][i];var n=o.accum[e][i];if(n>o.minLength){var a=o.cosTable[e],r=o.sinTable[e],s=i;s<<=1,s-=o.rhoMax,t.push(new L({x:a*s+1e3*-r,y:r*s+1e3*a},{x:a*s-1e3*-r,y:r*s-1e3*a}))}}var h=[];t=t.filter(function(t){var e=t.a.x-t.b.x<-o.maxTilt||t.b.x-t.a.x<-o.maxTilt,i=t.a.y-t.b.y<-o.maxTilt||t.b.y-t.a.y<-o.maxTilt;return!(e&&i)});for(var c=function(){var e=t.pop();h.push(e),t=t.filter(function(t){var i=o.checkOrientation(e);if(i!=o.checkOrientation(t))return!0;var n=i==o.VERTICAL?o.getMidPoint(e.a.x,e.b.x):o.getMidPoint(e.a.y,e.b.y),a=i==o.VERTICAL?o.getMidPoint(t.a.x,t.b.x):o.getMidPoint(t.a.y,t.b.y);return!o.getLineDistance(n,a)})};t.length>0;)c();return console.log(h),h.forEach(function(t,e){o.drawLine(t,"rgba(0,150,150,1)")}),h},this.drawLine=function(t,e){console.log(t),o.ctx.beginPath(),o.ctx.strokeStyle=e,o.ctx.moveTo(t.a.x+o.drawingWidth/2,t.a.y+o.drawingHeight/2),o.ctx.lineTo(t.b.x+o.drawingWidth/2,t.b.y+o.drawingHeight/2),o.ctx.stroke(),o.ctx.strokeStyle="rgba(0,0,0,1)",o.ctx.closePath()},this.houghAcc=function(t,e){var i;console.log("running");var n=0;for(t-=o.drawingWidth/2,e-=o.drawingHeight/2;n<o.numAngleCells;n++)i=o.rhoMax+t*o.cosTable[n]+e*o.sinTable[n],i>>=1,void 0==o.accum[n]&&(o.accum[n]=[]),void 0==o.accum[n][i]?o.accum[n][i]=1:o.accum[n][i]++},this.maxTilt=a,this.minLength=n,this.distance=i,this.drawingWidth=e.width,this.drawingHeight=e.height,this.rhoMax=Math.sqrt(this.drawingWidth*this.drawingWidth+this.drawingHeight*this.drawingHeight),this.ctx=e.getContext("2d");for(var r=0,s=0;s<this.numAngleCells;r+=Math.PI/this.numAngleCells,s++)this.cosTable[s]=Math.cos(r),this.sinTable[s]=Math.sin(r)}return Object(y.a)(t,[{key:"checkOrientation",value:function(t){return this.getDif(t.a.x,t.b.x)>this.getDif(t.a.y,t.b.y)?this.HOZIZONTAL:this.VERTICAL}},{key:"getDif",value:function(t,e){return(t>e?t:e)-(t>e?e:t)}},{key:"getMidPoint",value:function(t,e){var i=t>e?e:t;return i+((t>e?t:e)-i)/2}},{key:"getLineDistance",value:function(t,e){var i=t>e?t:e;return(t>e?e:t)+this.distance>i}}]),t}(),I=i(71),T=i(12),R=Object(y.a)(function t(e,i){Object(x.a)(this,t),this.x=void 0,this.y=void 0,this.x=e,this.y=i}),V=i(70),M=function(){function t(e,i,n,a,o){Object(x.a)(this,t),this.id=void 0,this.ctx=void 0,this.canvas=void 0,this.topLeft=void 0,this.bottomRight=void 0,this.intialised=void 0,this.width=void 0,this.height=void 0,this.numbers=void 0,this.provisonal=void 0,this.number="",this.pos=void 0,this.sq=void 0,this.row=void 0,this.col=void 0,this.filteredPos=void 0,this.id=e,this.ctx=i,this.topLeft=new R(a.x,a.y),this.bottomRight=new R(o.x,o.y),this.canvas=n,this.intialised=!1,this.width=this.bottomRight.x-this.topLeft.x,this.height=this.bottomRight.y-this.topLeft.y,this.numbers=["1","2","3","4","5","6","7","8","9"];var r=this.percent(this.height,15),s=this.percent(this.width,15);this.bottomRight.y=this.bottomRight.y-r,this.bottomRight.x=this.bottomRight.x-s,this.topLeft.y=this.topLeft.y+r,this.topLeft.x=this.topLeft.x+s,this.width=this.bottomRight.x-this.topLeft.x,this.height=this.bottomRight.y-this.topLeft.y,this.provisonal=!1}return Object(y.a)(t,[{key:"getPos",value:function(){var t=this,e=this.pos&&this.pos.length>0?this.pos:this.numbers;this.pos=e.filter(function(e){return!(t.inList(t.row,e)||t.inList(t.col,e)||t.inList(t.sq,e))})}},{key:"filterPos",value:function(){this.tryFilter(this.sq),this.tryFilter(this.row),this.tryFilter(this.col)}},{key:"tryFilter",value:function(t){var e=this,i=[];this.row.filter(function(t){return!t.number&&t.id!=e.id}).forEach(function(t){return i.push.apply(i,Object(T.a)(t.pos))}),this.col.filter(function(t){return!t.number&&t.id!=e.id}).forEach(function(t){return i.push.apply(i,Object(T.a)(t.pos))}),t.filter(function(t){return!t.number&&t.id!=e.id}).forEach(function(t){return i.push.apply(i,Object(T.a)(t.pos))}),this.filteredPos=this.pos.filter(function(t){return!i.includes(t)}),this.filteredPos.length>0&&this.filteredPos.length<this.pos.length&&(this.pos=this.filteredPos)}},{key:"inList",value:function(t,e){return 0!=t.filter(function(t){return t.number===e}).length}},{key:"percent",value:function(t,e){return t/100*e}},{key:"draw",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"yellow";this.ctx.fillStyle=t,this.ctx.beginPath(),this.ctx.moveTo(this.topLeft.x,this.topLeft.y),this.ctx.lineTo(this.bottomRight.x,this.topLeft.y),this.ctx.lineTo(this.bottomRight.x,this.bottomRight.y),this.ctx.lineTo(this.topLeft.x,this.bottomRight.y),this.ctx.lineTo(this.topLeft.x,this.topLeft.y),this.ctx.closePath(),this.ctx.fill()}},{key:"blank",value:function(){this.draw("white"),this.number="",this.pos=[],this.intialised=!0,this.provisonal=!0}},{key:"callback",value:function(t){var e=this;this.isEmpty()?this.blank():(document.body.style.backgroundImage="url("+t+")",V.Tesseract.recognize(t,"eng").progress(console.log).then(function(t){console.log(t.text);var i=t.text?t.text.replace(/[^0-9]/g,"").substring(0,1):"";i?(e.number=i,e.drawLetter(),e.intialised=!0,e.provisonal=!1,console.log("The number you are looking at is a ".concat(t.text," in square ").concat(e.toString()))):(console.log("Nothing found in square ".concat(e.toString())),e.blank())}).catch(function(){e.callback(t)}))}},{key:"getLetter",value:function(){var t=this.topLeft.x,e=this.topLeft.y,i=this.bottomRight.x-this.topLeft.x,n=this.bottomRight.y-this.topLeft.y,a=document.createElement("canvas"),o=a.getContext("2d");a.width=i,a.height=n,o&&o.drawImage(this.canvas,t,e,i,n,0,0,a.width,a.height),this.callback(a.toDataURL())}},{key:"drawLetter",value:function(){this.ctx.fillStyle="black",this.ctx.font="".concat(1.2*this.height,"px Courier New"),this.ctx.fillText(this.number,this.topLeft.x,this.bottomRight.y)}},{key:"toString",value:function(){return"|".concat(this.number,"|")}},{key:"isEmpty",value:function(){for(var t,e,i=this.ctx.getImageData(this.topLeft.x,this.topLeft.y,this.width,this.height),n=0,a=0,o=0;o+3<i.data.length;o+=4)t=i.data[o],e=i.data[o+1],t+i.data[o+2]+e<255&&a++,n++;return!(a/(n/100)>15)}}]),t}(),X=function(){function t(){Object(x.a)(this,t),this.cols=void 0,this.rows=void 0,this.squares=void 0,this.solvefailed=void 0,this.cells=void 0,this.colours=["teal","cyan","pink","magenta","lightgrey","yellow","red","lime","orange"],this.cols=[[],[],[],[],[],[],[],[],[]],this.rows=[],this.squares=[],this.solvefailed=!1}return Object(y.a)(t,[{key:"populateBoard",value:function(t){var e=this;this.cells=t;for(var i=0;i<9;i++){var n=9*i,a=n+9;this.rows.push(this.cells.slice(n,a))}this.rows.forEach(function(t,i){t.forEach(function(t,n){e.cols[n][i]=e.rows[i][n]})});for(i=0;i<3;i++)for(var o=this.rows.slice(3*i,3*i+3),r=0;r<3;r++){var s=3*r,h=s+3,c=[];c.push.apply(c,Object(T.a)(o[0].slice(s,h))),c.push.apply(c,Object(T.a)(o[1].slice(s,h))),c.push.apply(c,Object(T.a)(o[2].slice(s,h))),this.squares.push(c)}this.cells.forEach(function(t){return e.populateCellData(t)}),console.log(this.cols),console.log(this.rows),console.log(this.squares)}},{key:"getRandomInt",value:function(t){return Math.floor(Math.random()*t)}},{key:"solve",value:function(){if(this.updatePossible(),this.filterPossible(),this.cells.filter(function(t){return!t.number}).filter(function(t){return 0==t.pos.length}).length>0)this.failed();else{var t=this.getNextBest();this.guessCell(t)}}},{key:"guessCell",value:function(t){return!!(t&&t.pos&&t.pos.length)&&(this.fillCell(t,t.pos[this.getRandomInt(t.pos.length)]),!0)}},{key:"getNextBest",value:function(){for(var t=this,e=this.cells.filter(function(t){return!t.number}),i=function(i){var n=e.filter(function(t){return t.pos.length==i});if(n.length)return{v:n[t.getRandomInt(n.length)]}},n=1;n<=8;n++){var a=i(n);if("object"===typeof a)return a.v}}},{key:"updatePossible",value:function(){this.cells.filter(function(t){return!t.number}).forEach(function(t){t.getPos()})}},{key:"filterPossible",value:function(){this.cells.filter(function(t){return!t.number}).forEach(function(t){t.filterPos()})}},{key:"fillCell",value:function(t,e){t.number=e,t.draw(this.colours[+e-1]),t.drawLetter(),this.solvefailed=!1}},{key:"failed",value:function(){var t=this;this.cells.filter(function(t){return t.provisonal}).forEach(function(t){return t.draw("pink")}),setTimeout(function(){t.clearBoard()},250)}},{key:"clearBoard",value:function(){this.cells.filter(function(t){return t.provisonal}).forEach(function(t){return t.blank()})}},{key:"solved",value:function(){return 0===this.cells.filter(function(t){return!t.number}).length}},{key:"populateCellData",value:function(t){t.row=this.getRow(t),t.col=this.getCol(t),t.sq=this.getSquare(t)}},{key:"getRow",value:function(t){return this.rows.filter(function(e){return 1==e.filter(function(e){return e.id===t.id}).length})[0]}},{key:"getCol",value:function(t){return this.cols.filter(function(e){return 1==e.filter(function(e){return e.id===t.id}).length})[0]}},{key:"getSquare",value:function(t){return this.squares.filter(function(e){return 1==e.filter(function(e){return e.id===t.id}).length})[0]}}]),t}(),Y=function(t){var e=t.canvas,i=t.imageWidth,o=t.imageHeight,r=t.reset,h=e.getContext("2d"),c=Object(n.useState)(!1),l=Object(s.a)(c,2),u=l[0],f=l[1],g=Object(n.useState)(null),d=Object(s.a)(g,2),v=d[0],m=d[1],b=Object(n.useState)(null),p=Object(s.a)(b,2),x=p[0],y=p[1],L=Object(n.useState)(null),T=Object(s.a)(L,2),R=T[0],V=T[1],Y=Object(n.createRef)(),P=Object(n.createRef)(),S=[],A=[],D=new X,H=.5*o,W=(i-H)/2,B=(o-H)/2;Object(n.useEffect)(function(){setTimeout(function(){if(!R){for(var t=new Array,e=0;e<o;e++)for(var n=0;n<i;n++)t.push(new w(n,e,i));V(t)}},1)},[u]),Object(n.useEffect)(function(){setTimeout(function(){I.a.load(e.toDataURL("image/png").replace("image/png","image/octet-stream")).then(function(t){y(t.toDataURL());var e=t.grey();m(function(t,e){t.checkProcessable("Canny edge detector",{bitDepth:8,channels:1,components:1}),e=Object.assign({},k,e);for(var i=t.width,n=t.height,a=t.maxValue,o={sigma:e.gaussianBlur,radius:3},r=t.gaussianFilter(o),s=r.convolution(E,j),h=r.convolution(O,j),c=h.hypotenuse(s),l=t.constructor,u=new l(i,n,{kind:"GREY",bitDepth:32}),f=new l(i,n,{kind:"GREY",bitDepth:32}),g=new l(i,n,{kind:"GREY"}),d=1;d<i-1;d++)for(var v=1;v<n-1;v++){var m=(Math.round(Math.atan2(h.getValueXY(d,v,0),s.getValueXY(d,v,0))*(5/Math.PI))+5)%5;0===m&&(c.getValueXY(d,v,0)<=c.getValueXY(d,v-1,0)||c.getValueXY(d,v,0)<=c.getValueXY(d,v+1,0))||1===m&&(c.getValueXY(d,v,0)<=c.getValueXY(d-1,v+1,0)||c.getValueXY(d,v,0)<=c.getValueXY(d+1,v-1,0))||2===m&&(c.getValueXY(d,v,0)<=c.getValueXY(d-1,v,0)||c.getValueXY(d,v,0)<=c.getValueXY(d+1,v,0))||3===m&&(c.getValueXY(d,v,0)<=c.getValueXY(d-1,v-1,0)||c.getValueXY(d,v,0)<=c.getValueXY(d+1,v+1,0))||u.setValueXY(d,v,0,c.getValueXY(d,v,0))}for(d=0;d<i*n;++d){var b=u.data[d],p=0;b>e.highThreshold&&(p++,g.data[d]=a),b>e.lowThreshold&&p++,f.data[d]=p}var x=[];for(d=1;d<i-1;++d)for(v=1;v<n-1;++v)if(1===f.getValueXY(d,v,0))t:for(var y=d-1;y<d+2;++y)for(var w=v-1;w<v+2;++w)if(2===f.getValueXY(y,w,0)){x.push([d,v]),g.setValueXY(d,v,0,a);break t}for(;x.length>0;){var L=[];for(d=0;d<x.length;++d)for(v=-1;v<2;++v)for(y=-1;y<2;++y)if(0!==v||0!==y){var C=x[d][0]+v,I=x[d][1]+y;1===f.getValueXY(C,I,0)&&0===g.getValueXY(C,I,0)&&(L.push([C,I]),g.setValueXY(C,I,0,a))}x=L}return g}(e))})},1)},[R]);var N=function(){h.drawImage(Y.current,0,0),U(),setTimeout(function(){q()},2e3)},q=function(){var t=.05*H,n=new C(e,.08*H,.7*H,t),a=h.getImageData(0,0,i,o);h.drawImage(P.current,0,0),Z(50),R.forEach(function(t){t.inBox(i,o,W,B)&&t.getColourMagnitued(a.data)>10&&n.houghAcc(t.x,t.y)});var s=n.findMaxInHough(),c=s.filter(function(e){return e.a.y+t>e.b.y&&e.a.y-t<e.b.y}),l=s.filter(function(e){return e.a.x+t>e.b.x&&e.a.x-t<e.b.x});if(10!=l.length||10!=c.length)return r(null);c.forEach(function(t){l.forEach(function(e){var i=e.intersects(t);i&&(i.x=i.x+1.6*W,i.y=i.y+2*B,S.push(i))})}),console.log(S),_(),z()},_=function(){S.reverse().forEach(function(t,i){if(i+11<S.length&&(i-9)%10!=0){var n=new M(i,h,e,t,S[i+11]);A.push(n)}}),A.forEach(function(t,e){setTimeout(function(){t.getLetter()},10*e)})},F=function(t){h.putImageData(t,0,0)},U=function(){var t=h.getImageData(0,0,i,o);R.forEach(function(e){e.inBox(i,o,W,B)||e.plot(t.data,"#000000")}),F(t)},Z=function(t){for(var e=h.getImageData(0,0,i,o),n=128*(1-(t=t/100+1)),a=0;a<e.data.length;a+=4)e.data[a]=e.data[a]*t+n,e.data[a+1]=e.data[a+1]*t+n,e.data[a+2]=e.data[a+2]*t+n;F(e)},z=function t(){console.log("Waiting for sqaures to be done!"),setTimeout(0==A.filter(function(t){return!t.intialised}).length?J:t,1e3)},G=function(){console.log("we did it"),D.cells.forEach(function(t){D.fillCell(t,t.number)})},J=function(){D.populateBoard(A),function t(){D.solve(),console.log("HMMMMMM"),setTimeout(D.solved()?function(){G()}:t,10)}()};return u||f(!0),a.a.createElement(a.a.Fragment,null,v&&a.a.createElement("img",{onLoad:N,ref:Y,src:v.toDataURL(),alt:"Captured Image",id:"image",hidden:!0}),x&&a.a.createElement("img",{ref:P,src:x,alt:"Captured Image",id:"orgin",hidden:!0}))};function P(){var t=window;return{width:t.innerWidth,height:t.innerHeight}}var S=function(){var t=function(){var t=Object(n.useState)(P()),e=Object(s.a)(t,2),i=e[0],a=e[1];return Object(n.useEffect)(function(){function t(){a(P())}return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[]),i}(),e=t.height,i=t.width,o=e,r=Object(n.useState)(null),h=Object(s.a)(r,2),l=h[0],u=h[1],f=a.a.createElement(p,{ctxReady:u,imageWidth:i,imageHeight:o}),g=l?a.a.createElement(Y,{canvas:l,imageWidth:l.scrollWidth,imageHeight:l.scrollHeight,reset:u}):"";return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},f,l&&g,a.a.createElement("img",{src:c.a,className:"App-logo",alt:"logo"})))},A=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,139)).then(function(e){var i=e.getCLS,n=e.getFID,a=e.getFCP,o=e.getLCP,r=e.getTTFB;i(t),n(t),a(t),o(t),r(t)})};r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(S,null)),document.getElementById("root")),A()},21:function(t,e,i){t.exports={uiButton:"Camera_uiButton__1P_j6",CameraWrapper:"Camera_CameraWrapper__24Xq_",camera:"Camera_camera__31Kb3",canvas:"Camera_canvas__1XXIi"}},58:function(t,e,i){t.exports=i.p+"static/media/logo.06e73328.svg"},60:function(t,e,i){t.exports=i.p+"static/media/camera.c4363820.svg"},61:function(t,e,i){t.exports=i.p+"static/media/bin.3fd11e65.svg"},73:function(t,e,i){t.exports=i(138)},78:function(t,e,i){},79:function(t,e,i){}},[[73,1,2]]]);
//# sourceMappingURL=main.ca0028b1.chunk.js.map