(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(t,e,i){"use strict";i.r(e);var n=i(5),a=i.n(n),o=i(57),r=i.n(o),s=(i(78),i(7)),c=i(58),h=i.n(c),l=(i(79),i(21)),u=i.n(l),f=i(59),g=i.n(f),d=i(60),v=i.n(d),m=i(61),b=i.n(m),p=function(t){var e=t.ctxReady,i={width:{max:t.imageWidth},height:{max:t.imageHeight},facingMode:"environment"},o=Object(n.useState)(""),r=Object(s.a)(o,2),c=r[0],h=r[1],l=Object(n.useState)(""),f=Object(s.a)(l,2),d=f[0],m=f[1],p=Object(n.useState)(""),x=Object(s.a)(p,2),y=x[0],w=x[1],k=Object(n.useState)(""),E=Object(s.a)(k,2),O=E[0],j=E[1],L=Object(n.useState)(null),C=Object(s.a)(L,2),I=C[0],T=C[1],R=Object(n.createRef)(),V=a.a.useRef(null),M=Object(n.useCallback)(function(){V.current&&h(V.current.getScreenshot())},[V]),X=Object(n.useCallback)(function(){console.log("we did it ");var t=V.current.video;console.log(t.videoWidth),setTimeout(function(){T({width:t.videoWidth,height:t.videoHeight}),console.log(t.videoWidth)},1e3)},[]),Y=a.a.createElement(g.a,{onUserMedia:X,className:u.a.camera,ref:V,screenshotFormat:"image/jpeg",videoConstraints:i});Object(n.useEffect)(function(){m(a.a.createElement("img",{onLoad:S,ref:P,src:c,alt:"Captured Image",id:"image"}))},[c]);var P=Object(n.useCallback)(function(t){w(t)},[d]),S=function(t){var e=t.target;j(e)};Object(n.useEffect)(function(){R.current&&y&&(R.current.getContext("2d").drawImage(y,0,0),m(""),e(R.current))},[O]),Object(n.useEffect)(function(){if(R.current)for(var t=.5*I.height,e=(I.width-t)/2,i=(I.height-t)/2,n=R.current.getContext("2d"),a=0;a<I.height;a++)for(var o=0;o<I.width;o++)o>e&&o<I.width-e&&a>i&&a<I.height-i||(n.fillStyle="rgba(".concat(o,",").concat(a,",0, 0.7)"),n.fillRect(o,a,1,1))},[I]);var A=Object(n.useCallback)(function(t){h(null),j(null),m(""),e(null)},[]),D=c?a.a.createElement("button",{className:u.a.uiButton,onClick:A},a.a.createElement("img",{src:b.a,alt:"reset"})):a.a.createElement("button",{className:u.a.uiButton,onClick:M},a.a.createElement("img",{src:v.a,alt:"take a picture"})),H=I?a.a.createElement("canvas",{className:u.a.canvas,ref:R,height:I.height,width:I.width}):"";return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:u.a.CameraWrapper},a.a.createElement("div",{className:u.a.InnerWrapper},c&&d,H,!c&&Y,D)))},x=i(0),y=i(1),w=function(){function t(e,i,n){Object(x.a)(this,t),this.x=void 0,this.y=void 0,this.rIndex=void 0,this.gIndex=void 0,this.bIndex=void 0,this.x=e,this.y=i,this.rIndex=4*(e+i*n),this.gIndex=this.rIndex+1,this.bIndex=this.gIndex+1}return Object(y.a)(t,[{key:"getColourAsHex",value:function(t){return"#".concat(this.hexVal(t[this.rIndex])).concat(this.hexVal(t[this.gIndex])).concat(this.hexVal(t[this.bIndex]))}},{key:"getColourMagnitued",value:function(t){return t[this.rIndex]+t[this.gIndex]+t[this.bIndex]}},{key:"hexVal",value:function(t){return t.toString(16)}},{key:"rgbVal",value:function(t){var e;return null===(e=t.slice(1).match(/.{1,2}/g))||void 0===e?void 0:e.map(function(t){return Number("0x".concat(t))})}},{key:"plot",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#4be11e",i=this.rgbVal(e);i?(t[this.rIndex]=i[0],t[this.gIndex]=i[1],t[this.bIndex]=i[2]):console.log("bad colour")}}]),t}(),k={lowThreshold:10,highThreshold:30,gaussianBlur:1.1},E=[[-1,0,1],[-2,0,2],[-1,0,1]],O=[[-1,-2,-1],[0,0,0],[1,2,1]],j={bitDepth:32,mode:"periodic"};var L=function(){function t(e,i,n,a){var o=this;Object(x.a)(this,t),this.THICKNESS=2,this.HOZIZONTAL="h",this.VERTICAL="v",this.ctx=void 0,this.numAngleCells=360,this.rhoMax=void 0,this.accum=new Array(this.numAngleCells),this.drawingWidth=void 0,this.drawingHeight=void 0,this.cosTable=new Array(this.numAngleCells),this.sinTable=new Array(this.numAngleCells),this.minLength=void 0,this.distance=void 0,this.maxTilt=void 0,this.findMaxInHough=function(){for(var t=[],e=0;e<360;e++)for(var i=0;i<o.accum[e].length;i++){o.accum[e][i];var n=o.accum[e][i];if(n>o.minLength){var a=o.cosTable[e],r=o.sinTable[e],s=i;s<<=1,s-=o.rhoMax,t.push({x1:a*s+1e3*-r,y1:r*s+1e3*a,x2:a*s-1e3*-r,y2:r*s-1e3*a})}}var c=[];t=t.filter(function(t){var e=t.x1-t.x2<-o.maxTilt||t.x2-t.x1<-o.maxTilt,i=t.y1-t.y2<-o.maxTilt||t.y2-t.y1<-o.maxTilt;return!(e&&i)});for(var h=function(){var e=t.pop();c.push(e),t=t.filter(function(t){var i=o.checkOrientation(e);if(i!=o.checkOrientation(t))return!0;var n=i==o.VERTICAL?o.getMidPoint(e.x1,e.x2):o.getMidPoint(e.y1,e.y2),a=i==o.VERTICAL?o.getMidPoint(t.x1,t.x2):o.getMidPoint(t.y1,t.y2);return!o.getLineDistance(n,a)})};t.length>0;)h();return console.log(c),c.forEach(function(t,e){o.drawLine(t,"rgba(0,150,150,1)")}),c},this.drawLine=function(t,e){console.log(t),o.ctx.beginPath(),o.ctx.strokeStyle=e,o.ctx.moveTo(t.x1+o.drawingWidth/2,t.y1+o.drawingHeight/2),o.ctx.lineTo(t.x2+o.drawingWidth/2,t.y2+o.drawingHeight/2),o.ctx.stroke(),o.ctx.strokeStyle="rgba(0,0,0,1)",o.ctx.closePath()},this.houghAcc=function(t,e){var i;console.log("running");var n=0;for(t-=o.drawingWidth/2,e-=o.drawingHeight/2;n<o.numAngleCells;n++)i=o.rhoMax+t*o.cosTable[n]+e*o.sinTable[n],i>>=1,void 0==o.accum[n]&&(o.accum[n]=[]),void 0==o.accum[n][i]?o.accum[n][i]=1:o.accum[n][i]++},this.maxTilt=a,this.minLength=n,this.distance=i,this.drawingWidth=e.width,this.drawingHeight=e.height,this.rhoMax=Math.sqrt(this.drawingWidth*this.drawingWidth+this.drawingHeight*this.drawingHeight),this.ctx=e.getContext("2d");for(var r=0,s=0;s<this.numAngleCells;r+=Math.PI/this.numAngleCells,s++)this.cosTable[s]=Math.cos(r),this.sinTable[s]=Math.sin(r)}return Object(y.a)(t,[{key:"checkOrientation",value:function(t){return this.getDif(t.x1,t.x2)>this.getDif(t.y1,t.y2)?this.HOZIZONTAL:this.VERTICAL}},{key:"getDif",value:function(t,e){return(t>e?t:e)-(t>e?e:t)}},{key:"getMidPoint",value:function(t,e){var i=t>e?e:t;return i+((t>e?t:e)-i)/2}},{key:"getLineDistance",value:function(t,e){var i=t>e?t:e;return(t>e?e:t)+this.distance>i}}]),t}(),C=i(71),I=Object(y.a)(function t(e,i){Object(x.a)(this,t),this.x=void 0,this.y=void 0,this.x=e,this.y=i}),T=i(12),R=i(70),V=function(){function t(e,i,n,a,o){Object(x.a)(this,t),this.id=void 0,this.ctx=void 0,this.canvas=void 0,this.topLeft=void 0,this.bottomRight=void 0,this.intialised=void 0,this.width=void 0,this.height=void 0,this.numbers=void 0,this.provisonal=void 0,this.number="",this.pos=void 0,this.sq=void 0,this.row=void 0,this.col=void 0,this.filteredPos=void 0,this.id=e,this.ctx=i,this.topLeft=new I(a.x,a.y),this.bottomRight=new I(o.x,o.y),this.canvas=n,this.intialised=!1,this.width=this.bottomRight.x-this.topLeft.x,this.height=this.bottomRight.y-this.topLeft.y,this.numbers=["1","2","3","4","5","6","7","8","9"];var r=this.percent(this.height,15),s=this.percent(this.width,15);this.bottomRight.y=this.bottomRight.y-r,this.bottomRight.x=this.bottomRight.x-s,this.topLeft.y=this.topLeft.y+r,this.topLeft.x=this.topLeft.x+s,this.width=this.bottomRight.x-this.topLeft.x,this.height=this.bottomRight.y-this.topLeft.y,this.provisonal=!1}return Object(y.a)(t,[{key:"getPos",value:function(){var t=this,e=this.pos&&this.pos.length>0?this.pos:this.numbers;this.pos=e.filter(function(e){return!(t.inList(t.row,e)||t.inList(t.col,e)||t.inList(t.sq,e))})}},{key:"filterPos",value:function(){this.tryFilter(this.sq),this.tryFilter(this.row),this.tryFilter(this.col)}},{key:"tryFilter",value:function(t){var e=this,i=[];this.row.filter(function(t){return!t.number&&t.id!=e.id}).forEach(function(t){return i.push.apply(i,Object(T.a)(t.pos))}),this.col.filter(function(t){return!t.number&&t.id!=e.id}).forEach(function(t){return i.push.apply(i,Object(T.a)(t.pos))}),t.filter(function(t){return!t.number&&t.id!=e.id}).forEach(function(t){return i.push.apply(i,Object(T.a)(t.pos))}),this.filteredPos=this.pos.filter(function(t){return!i.includes(t)}),this.filteredPos.length>0&&this.filteredPos.length<this.pos.length&&(this.pos=this.filteredPos)}},{key:"inList",value:function(t,e){return 0!=t.filter(function(t){return t.number===e}).length}},{key:"percent",value:function(t,e){return t/100*e}},{key:"draw",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"yellow";this.ctx.fillStyle=t,this.ctx.beginPath(),this.ctx.moveTo(this.topLeft.x,this.topLeft.y),this.ctx.lineTo(this.bottomRight.x,this.topLeft.y),this.ctx.lineTo(this.bottomRight.x,this.bottomRight.y),this.ctx.lineTo(this.topLeft.x,this.bottomRight.y),this.ctx.lineTo(this.topLeft.x,this.topLeft.y),this.ctx.closePath(),this.ctx.fill()}},{key:"blank",value:function(){this.draw("white"),this.number="",this.pos=[],this.intialised=!0,this.provisonal=!0}},{key:"callback",value:function(t){var e=this;this.isEmpty()?this.blank():(document.body.style.backgroundImage="url("+t+")",R.Tesseract.recognize(t,"eng").progress(console.log).then(function(t){console.log(t.text);var i=t.text?t.text.replace(/[^0-9]/g,"").substring(0,1):"";i?(e.number=i,e.drawLetter(),e.intialised=!0,e.provisonal=!1,console.log("The number you are looking at is a ".concat(t.text," in square ").concat(e.toString()))):(console.log("Nothing found in square ".concat(e.toString())),e.blank())}).catch(function(){e.callback(t)}))}},{key:"getLetter",value:function(){var t=this.topLeft.x,e=this.topLeft.y,i=this.bottomRight.x-this.topLeft.x,n=this.bottomRight.y-this.topLeft.y,a=document.createElement("canvas"),o=a.getContext("2d");a.width=i,a.height=n,o&&o.drawImage(this.canvas,t,e,i,n,0,0,a.width,a.height),this.callback(a.toDataURL())}},{key:"drawLetter",value:function(){this.ctx.fillStyle="black",this.ctx.font="25px Courier New",this.ctx.fillText(this.number,this.topLeft.x,this.bottomRight.y)}},{key:"toString",value:function(){return"|".concat(this.number,"|")}},{key:"isEmpty",value:function(){for(var t,e,i=this.ctx.getImageData(this.topLeft.x,this.topLeft.y,this.width,this.height),n=0,a=0,o=0;o+3<i.data.length;o+=4)t=i.data[o],e=i.data[o+1],t+i.data[o+2]+e<255&&a++,n++;return!(a/(n/100)>15)}}]),t}(),M=function(){function t(){Object(x.a)(this,t),this.cols=void 0,this.rows=void 0,this.squares=void 0,this.solvefailed=void 0,this.cells=void 0,this.colours=["teal","cyan","pink","magenta","lightgrey","yellow","red","lime","orange"],this.cols=[[],[],[],[],[],[],[],[],[]],this.rows=[],this.squares=[],this.solvefailed=!1}return Object(y.a)(t,[{key:"populateBoard",value:function(t){var e=this;this.cells=t;for(var i=0;i<9;i++){var n=9*i,a=n+9;this.rows.push(this.cells.slice(n,a))}this.rows.forEach(function(t,i){t.forEach(function(t,n){e.cols[n][i]=e.rows[i][n]})});for(i=0;i<3;i++)for(var o=this.rows.slice(3*i,3*i+3),r=0;r<3;r++){var s=3*r,c=s+3,h=[];h.push.apply(h,Object(T.a)(o[0].slice(s,c))),h.push.apply(h,Object(T.a)(o[1].slice(s,c))),h.push.apply(h,Object(T.a)(o[2].slice(s,c))),this.squares.push(h)}this.cells.forEach(function(t){return e.populateCellData(t)}),console.log(this.cols),console.log(this.rows),console.log(this.squares)}},{key:"getRandomInt",value:function(t){return Math.floor(Math.random()*t)}},{key:"solve",value:function(){if(this.updatePossible(),this.filterPossible(),this.cells.filter(function(t){return!t.number}).filter(function(t){return 0==t.pos.length}).length>0)this.failed();else{var t=this.getNextBest();this.guessCell(t)}}},{key:"guessCell",value:function(t){return!!(t&&t.pos&&t.pos.length)&&(this.fillCell(t,t.pos[this.getRandomInt(t.pos.length)]),!0)}},{key:"getNextBest",value:function(){for(var t=this,e=this.cells.filter(function(t){return!t.number}),i=function(i){var n=e.filter(function(t){return t.pos.length==i});if(n.length)return{v:n[t.getRandomInt(n.length)]}},n=1;n<=8;n++){var a=i(n);if("object"===typeof a)return a.v}}},{key:"updatePossible",value:function(){this.cells.filter(function(t){return!t.number}).forEach(function(t){t.getPos()})}},{key:"filterPossible",value:function(){this.cells.filter(function(t){return!t.number}).forEach(function(t){t.filterPos()})}},{key:"fillCell",value:function(t,e){t.number=e,t.draw(this.colours[+e-1]),t.drawLetter(),this.solvefailed=!1}},{key:"failed",value:function(){var t=this;this.cells.filter(function(t){return t.provisonal}).forEach(function(t){return t.draw("pink")}),setTimeout(function(){t.clearBoard()},250)}},{key:"clearBoard",value:function(){this.cells.filter(function(t){return t.provisonal}).forEach(function(t){return t.blank()})}},{key:"solved",value:function(){return 0===this.cells.filter(function(t){return!t.number}).length}},{key:"populateCellData",value:function(t){t.row=this.getRow(t),t.col=this.getCol(t),t.sq=this.getSquare(t)}},{key:"getRow",value:function(t){return this.rows.filter(function(e){return 1==e.filter(function(e){return e.id===t.id}).length})[0]}},{key:"getCol",value:function(t){return this.cols.filter(function(e){return 1==e.filter(function(e){return e.id===t.id}).length})[0]}},{key:"getSquare",value:function(t){return this.squares.filter(function(e){return 1==e.filter(function(e){return e.id===t.id}).length})[0]}}]),t}(),X=function(t){var e=t.canvas,i=t.imageWidth,o=t.imageHeight,r=t.reset,c=e.getContext("2d"),h=Object(n.useState)(!1),l=Object(s.a)(h,2),u=l[0],f=l[1],g=Object(n.useState)(null),d=Object(s.a)(g,2),v=d[0],m=d[1],b=Object(n.useState)(null),p=Object(s.a)(b,2),x=p[0],y=p[1],T=Object(n.useState)(null),R=Object(s.a)(T,2),X=R[0],Y=R[1],P=Object(n.createRef)(),S=Object(n.createRef)(),A=[],D=[],H=new M,W=.5*o,F=(i-W)/2,N=(o-W)/2;Object(n.useEffect)(function(){setTimeout(function(){if(!X){for(var t=new Array,e=0;e<o;e++)for(var n=0;n<i;n++)t.push(new w(n,e,i));Y(t)}},1)},[u]),Object(n.useEffect)(function(){setTimeout(function(){C.a.load(e.toDataURL("image/png").replace("image/png","image/octet-stream")).then(function(t){y(t.toDataURL());var e=t.grey();m(function(t,e){t.checkProcessable("Canny edge detector",{bitDepth:8,channels:1,components:1}),e=Object.assign({},k,e);for(var i=t.width,n=t.height,a=t.maxValue,o={sigma:e.gaussianBlur,radius:3},r=t.gaussianFilter(o),s=r.convolution(O,j),c=r.convolution(E,j),h=c.hypotenuse(s),l=t.constructor,u=new l(i,n,{kind:"GREY",bitDepth:32}),f=new l(i,n,{kind:"GREY",bitDepth:32}),g=new l(i,n,{kind:"GREY"}),d=1;d<i-1;d++)for(var v=1;v<n-1;v++){var m=(Math.round(Math.atan2(c.getValueXY(d,v,0),s.getValueXY(d,v,0))*(5/Math.PI))+5)%5;0===m&&(h.getValueXY(d,v,0)<=h.getValueXY(d,v-1,0)||h.getValueXY(d,v,0)<=h.getValueXY(d,v+1,0))||1===m&&(h.getValueXY(d,v,0)<=h.getValueXY(d-1,v+1,0)||h.getValueXY(d,v,0)<=h.getValueXY(d+1,v-1,0))||2===m&&(h.getValueXY(d,v,0)<=h.getValueXY(d-1,v,0)||h.getValueXY(d,v,0)<=h.getValueXY(d+1,v,0))||3===m&&(h.getValueXY(d,v,0)<=h.getValueXY(d-1,v-1,0)||h.getValueXY(d,v,0)<=h.getValueXY(d+1,v+1,0))||u.setValueXY(d,v,0,h.getValueXY(d,v,0))}for(d=0;d<i*n;++d){var b=u.data[d],p=0;b>e.highThreshold&&(p++,g.data[d]=a),b>e.lowThreshold&&p++,f.data[d]=p}var x=[];for(d=1;d<i-1;++d)for(v=1;v<n-1;++v)if(1===f.getValueXY(d,v,0))t:for(var y=d-1;y<d+2;++y)for(var w=v-1;w<v+2;++w)if(2===f.getValueXY(y,w,0)){x.push([d,v]),g.setValueXY(d,v,0,a);break t}for(;x.length>0;){var L=[];for(d=0;d<x.length;++d)for(v=-1;v<2;++v)for(y=-1;y<2;++y)if(0!==v||0!==y){var C=x[d][0]+v,I=x[d][1]+y;1===f.getValueXY(C,I,0)&&0===g.getValueXY(C,I,0)&&(L.push([C,I]),g.setValueXY(C,I,0,a))}x=L}return g}(e))})},1)},[X]);var q=function(){c.drawImage(P.current,0,0),G(),setTimeout(function(){B()},2e3)},B=function(){var t=.05*W,n=new L(e,.08*W,.5*W,t),a=c.getImageData(0,0,i,o);c.drawImage(S.current,0,0),K(95),z(),X.forEach(function(t){J(t)&&t.getColourMagnitued(a.data)>10&&n.houghAcc(t.x,t.y)});var s=n.findMaxInHough(),h=s.filter(function(e){return e.y1+t>e.y2&&e.y1-t<e.y2}),l=s.filter(function(e){return e.x1+t>e.x2&&e.x1-t<e.x2});if(10!=l.length||10!=h.length)return r(null);h.forEach(function(t){l.forEach(function(e){U(e.x1+i/2,t.y1+o/2)})}),console.log(A),_(),Q()},_=function(){A.reverse().forEach(function(t,i){if(i+11<A.length&&(i-9)%10!=0){var n=new V(i,c,e,t,A[i+11]);D.push(n)}}),D.forEach(function(t,e){setTimeout(function(){t.getLetter()},10*e)})},U=function(t,e){A.push(new I(t,e))},Z=function(t){c.putImageData(t,0,0)},z=function(){var t=c.getImageData(0,0,i,o);X.forEach(function(e){e.getColourMagnitued(t.data)/3<100?e.plot(t.data,"#000000"):e.plot(t.data,"#FFFFFF")}),Z(t)},G=function(){var t=c.getImageData(0,0,i,o);X.forEach(function(e){J(e)||e.plot(t.data,"#000000")}),Z(t)},J=function(t){return t.x>F&&t.x<i-F&&t.y>N&&t.y<o-N},K=function(t){for(var e=c.getImageData(0,0,i,o),n=128*(1-(t=t/100+1)),a=0;a<e.data.length;a+=4)e.data[a]=e.data[a]*t+n,e.data[a+1]=e.data[a+1]*t+n,e.data[a+2]=e.data[a+2]*t+n;Z(e)},Q=function t(){console.log("Waiting for sqaures to be done!"),setTimeout(0==D.filter(function(t){return!t.intialised}).length?tt:t,1e3)},$=function(){console.log("we did it"),H.cells.forEach(function(t){H.fillCell(t,t.number)})},tt=function(){H.populateBoard(D),function t(){H.solve(),console.log("HMMMMMM"),setTimeout(H.solved()?function(){$()}:t,10)}()};return u||f(!0),a.a.createElement(a.a.Fragment,null,v&&a.a.createElement("img",{onLoad:q,ref:P,src:v.toDataURL(),alt:"Captured Image",id:"image",hidden:!0}),x&&a.a.createElement("img",{ref:S,src:x,alt:"Captured Image",id:"orgin",hidden:!0}))};function Y(){var t=window;return{width:t.innerWidth,height:t.innerHeight}}var P=function(){var t=function(){var t=Object(n.useState)(Y()),e=Object(s.a)(t,2),i=e[0],a=e[1];return Object(n.useEffect)(function(){function t(){a(Y())}return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[]),i}(),e=t.height,i=.8*t.width,o=.8*e,r=Object(n.useState)(null),c=Object(s.a)(r,2),l=c[0],u=c[1],f=a.a.createElement(p,{ctxReady:u,imageWidth:i,imageHeight:o}),g=l?a.a.createElement(X,{canvas:l,imageWidth:l.scrollWidth,imageHeight:l.scrollHeight,reset:u}):"";return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},f,l&&g,a.a.createElement("img",{src:h.a,className:"App-logo",alt:"logo"})))},S=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,139)).then(function(e){var i=e.getCLS,n=e.getFID,a=e.getFCP,o=e.getLCP,r=e.getTTFB;i(t),n(t),a(t),o(t),r(t)})};r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(P,null)),document.getElementById("root")),S()},21:function(t,e,i){t.exports={uiButton:"Camera_uiButton__1P_j6",CameraWrapper:"Camera_CameraWrapper__24Xq_",camera:"Camera_camera__31Kb3",canvas:"Camera_canvas__1XXIi"}},58:function(t,e,i){t.exports=i.p+"static/media/logo.06e73328.svg"},60:function(t,e,i){t.exports=i.p+"static/media/camera.c4363820.svg"},61:function(t,e,i){t.exports=i.p+"static/media/bin.3fd11e65.svg"},73:function(t,e,i){t.exports=i(138)},78:function(t,e,i){},79:function(t,e,i){}},[[73,1,2]]]);
//# sourceMappingURL=main.2b6c43cb.chunk.js.map