(function(){
  const k=document.createElement("link").relList;
  if(k&&k.supports&&k.supports("modulepreload"))return;
  for(const f of document.querySelectorAll('link[rel="modulepreload"]'))w(f);
  new MutationObserver(f=>{
    for(const m of f)if(m.type==="childList")for(const N of m.addedNodes)N.tagName==="LINK"&&N.rel==="modulepreload"&&w(N)
  }).observe(document, {
    childList:!0, subtree:!0
  });
  function u(f){
    const m={

    };
    return f.integrity&&(m.integrity=f.integrity), f.referrerPolicy&&(m.referrerPolicy=f.referrerPolicy), f.crossOrigin==="use-credentials"?m.credentials="include":f.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin", m
  }
  function w(f){
    if(f.ep)return;
    f.ep=!0;
    const m=u(f);
    fetch(f.href, m)
  }

})();
var Mo={
  exports:{

  }

}, jr={

}, Do={
  exports:{

  }

}, ne={

};
var Ra;
function Uf(){
  if(Ra)return ne;
  Ra=1;
  var y=Symbol.for("react.element"), k=Symbol.for("react.portal"), u=Symbol.for("react.fragment"), w=Symbol.for("react.strict_mode"), f=Symbol.for("react.profiler"), m=Symbol.for("react.provider"), N=Symbol.for("react.context"), S=Symbol.for("react.forward_ref"), x=Symbol.for("react.suspense"), E=Symbol.for("react.memo"), C=Symbol.for("react.lazy"), L=Symbol.iterator;
  function R(d){
    return d===null||typeof d!="object"?null:(d=L&&d[L]||d["@@iterator"], typeof d=="function"?d:null)
  }
  var V={
    isMounted:function(){
      return!1
    }, enqueueForceUpdate:function(){

    }, enqueueReplaceState:function(){

    }, enqueueSetState:function(){

    }

  }, Z=Object.assign, K={

  };
  function F(d, _, J){
    this.props=d, this.context=_, this.refs=K, this.updater=J||V
  }
  F.prototype.isReactComponent={

  }, F.prototype.setState=function(d, _){
    if(typeof d!="object"&&typeof d!="function"&&d!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, d, _, "setState")
  }, F.prototype.forceUpdate=function(d){
    this.updater.enqueueForceUpdate(this, d, "forceUpdate")
  };
  function te(){

  }
  te.prototype=F.prototype;
  function se(d, _, J){
    this.props=d, this.context=_, this.refs=K, this.updater=J||V
  }
  var ae=se.prototype=new te;
  ae.constructor=se, Z(ae, F.prototype), ae.isPureReactComponent=!0;
  var re=Array.isArray, he=Object.prototype.hasOwnProperty, fe={
    current:null
  }, Ne={
    key:!0, ref:!0, __self:!0, __source:!0
  };
  function _e(d, _, J){
    var b, $={

    }, M=null, Y=null;
    if(_!=null)for(b in _.ref!==void 0&&(Y=_.ref), _.key!==void 0&&(M=""+_.key), _)he.call(_, b)&&!Ne.hasOwnProperty(b)&&($[b]=_[b]);
    var B=arguments.length-2;
    if(B===1)$.children=J;
    else if(1<B){
      for(var ee=Array(B), le=0;
      le<B;
      le++)ee[le]=arguments[le+2];
      $.children=ee
    }
    if(d&&d.defaultProps)for(b in B=d.defaultProps, B)$[b]===void 0&&($[b]=B[b]);
    return{
      $$typeof:y, type:d, key:M, ref:Y, props:$, _owner:fe.current
    }

  }
  function mt(d, _){
    return{
      $$typeof:y, type:d.type, key:_, ref:d.ref, props:d.props, _owner:d._owner
    }

  }
  function $e(d){
    return typeof d=="object"&&d!==null&&d.$$typeof===y
  }
  function vt(d){
    var _={
      "=":"=0", ":":"=2"
    };
    return"$"+d.replace(/[=:]/g, function(J){
      return _[J]
    })
  }
  var Be=/\/+/g;
  function Oe(d, _){
    return typeof d=="object"&&d!==null&&d.key!=null?vt(""+d.key):_.toString(36)
  }
  function Ve(d, _, J, b, $){
    var M=typeof d;
    (M==="undefined"||M==="boolean")&&(d=null);
    var Y=!1;
    if(d===null)Y=!0;
    else switch(M){
      case"string":case"number":Y=!0;
      break;
      case"object":switch(d.$$typeof){
        case y:case k:Y=!0
      }

    }
    if(Y)return Y=d, $=$(Y), d=b===""?"."+Oe(Y, 0):b, re($)?(J="", d!=null&&(J=d.replace(Be, "$&/")+"/"), Ve($, _, J, "", function(le){
      return le
    })):$!=null&&($e($)&&($=mt($, J+(!$.key||Y&&Y.key===$.key?"":(""+$.key).replace(Be, "$&/")+"/")+d)), _.push($)), 1;
    if(Y=0, b=b===""?".":b+":", re(d))for(var B=0;
    B<d.length;
    B++){
      M=d[B];
      var ee=b+Oe(M, B);
      Y+=Ve(M, _, J, ee, $)
    }
    else if(ee=R(d), typeof ee=="function")for(d=ee.call(d), B=0;
    !(M=d.next()).done;
    )M=M.value, ee=b+Oe(M, B++), Y+=Ve(M, _, J, ee, $);
    else if(M==="object")throw _=String(d), Error("Objects are not valid as a React child (found: "+(_==="[object Object]"?"object with keys {"+Object.keys(d).join(", ")+"}":_)+"). If you meant to render a collection of children, use an array instead.");
    return Y
  }
  function Ze(d, _, J){
    if(d==null)return d;
    var b=[], $=0;
    return Ve(d, b, "", "", function(M){
      return _.call(J, M, $++)
    }), b
  }
  function Te(d){
    if(d._status===-1){
      var _=d._result;
      _=_(), _.then(function(J){
        (d._status===0||d._status===-1)&&(d._status=1, d._result=J)
      }, function(J){
        (d._status===0||d._status===-1)&&(d._status=2, d._result=J)
      }), d._status===-1&&(d._status=0, d._result=_)
    }
    if(d._status===1)return d._result.default;
    throw d._result
  }
  var me={
    current:null
  }, D={
    transition:null
  }, Q={
    ReactCurrentDispatcher:me, ReactCurrentBatchConfig:D, ReactCurrentOwner:fe
  };
  function I(){
    throw Error("act(...) is not supported in production builds of React.")
  }
  return ne.Children={
    map:Ze, forEach:function(d, _, J){
      Ze(d, function(){
        _.apply(this, arguments)
      }, J)
    }, count:function(d){
      var _=0;
      return Ze(d, function(){
        _++
      }), _
    }, toArray:function(d){
      return Ze(d, function(_){
        return _
      })||[]
    }, only:function(d){
      if(!$e(d))throw Error("React.Children.only expected to receive a single React element child.");
      return d
    }

  }, ne.Component=F, ne.Fragment=u, ne.Profiler=f, ne.PureComponent=se, ne.StrictMode=w, ne.Suspense=x, ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q, ne.act=I, ne.cloneElement=function(d, _, J){
    if(d==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+d+".");
    var b=Z({

    }, d.props), $=d.key, M=d.ref, Y=d._owner;
    if(_!=null){
      if(_.ref!==void 0&&(M=_.ref, Y=fe.current), _.key!==void 0&&($=""+_.key), d.type&&d.type.defaultProps)var B=d.type.defaultProps;
      for(ee in _)he.call(_, ee)&&!Ne.hasOwnProperty(ee)&&(b[ee]=_[ee]===void 0&&B!==void 0?B[ee]:_[ee])
    }
    var ee=arguments.length-2;
    if(ee===1)b.children=J;
    else if(1<ee){
      B=Array(ee);
      for(var le=0;
      le<ee;
      le++)B[le]=arguments[le+2];
      b.children=B
    }
    return{
      $$typeof:y, type:d.type, key:$, ref:M, props:b, _owner:Y
    }

  }, ne.createContext=function(d){
    return d={
      $$typeof:N, _currentValue:d, _currentValue2:d, _threadCount:0, Provider:null, Consumer:null, _defaultValue:null, _globalName:null
    }, d.Provider={
      $$typeof:m, _context:d
    }, d.Consumer=d
  }, ne.createElement=_e, ne.createFactory=function(d){
    var _=_e.bind(null, d);
    return _.type=d, _
  }, ne.createRef=function(){
    return{
      current:null
    }

  }, ne.forwardRef=function(d){
    return{
      $$typeof:S, render:d
    }

  }, ne.isValidElement=$e, ne.lazy=function(d){
    return{
      $$typeof:C, _payload:{
        _status:-1, _result:d
      }, _init:Te
    }

  }, ne.memo=function(d, _){
    return{
      $$typeof:E, type:d, compare:_===void 0?null:_
    }

  }, ne.startTransition=function(d){
    var _=D.transition;
    D.transition={

    };
    try{
      d()
    }
    finally{
      D.transition=_
    }

  }, ne.unstable_act=I, ne.useCallback=function(d, _){
    return me.current.useCallback(d, _)
  }, ne.useContext=function(d){
    return me.current.useContext(d)
  }, ne.useDebugValue=function(){

  }, ne.useDeferredValue=function(d){
    return me.current.useDeferredValue(d)
  }, ne.useEffect=function(d, _){
    return me.current.useEffect(d, _)
  }, ne.useId=function(){
    return me.current.useId()
  }, ne.useImperativeHandle=function(d, _, J){
    return me.current.useImperativeHandle(d, _, J)
  }, ne.useInsertionEffect=function(d, _){
    return me.current.useInsertionEffect(d, _)
  }, ne.useLayoutEffect=function(d, _){
    return me.current.useLayoutEffect(d, _)
  }, ne.useMemo=function(d, _){
    return me.current.useMemo(d, _)
  }, ne.useReducer=function(d, _, J){
    return me.current.useReducer(d, _, J)
  }, ne.useRef=function(d){
    return me.current.useRef(d)
  }, ne.useState=function(d){
    return me.current.useState(d)
  }, ne.useSyncExternalStore=function(d, _, J){
    return me.current.useSyncExternalStore(d, _, J)
  }, ne.useTransition=function(){
    return me.current.useTransition()
  }, ne.version="18.3.1", ne
}
var La;
function Uo(){
  return La||(La=1, Do.exports=Uf()), Do.exports
}
var Ta;
function Bf(){
  if(Ta)return jr;
  Ta=1;
  var y=Uo(), k=Symbol.for("react.element"), u=Symbol.for("react.fragment"), w=Object.prototype.hasOwnProperty, f=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m={
    key:!0, ref:!0, __self:!0, __source:!0
  };
  function N(S, x, E){
    var C, L={

    }, R=null, V=null;
    E!==void 0&&(R=""+E), x.key!==void 0&&(R=""+x.key), x.ref!==void 0&&(V=x.ref);
    for(C in x)w.call(x, C)&&!m.hasOwnProperty(C)&&(L[C]=x[C]);
    if(S&&S.defaultProps)for(C in x=S.defaultProps, x)L[C]===void 0&&(L[C]=x[C]);
    return{
      $$typeof:k, type:S, key:R, ref:V, props:L, _owner:f.current
    }

  }
  return jr.Fragment=u, jr.jsx=N, jr.jsxs=N, jr
}
var Ma;
function Af(){
  return Ma||(Ma=1, Mo.exports=Bf()), Mo.exports
}
var g=Af(), xe=Uo();
function In(y){
  return y.map(k=>[...k])
}
function Da(y, k){
  return Math.floor(y/3)*3+Math.floor(k/3)
}
function dn(y){
  const k=Math.floor(y/3)*3, u=y%3*3, w=[];
  for(let f=k;
  f<k+3;
  f++)for(let m=u;
  m<u+3;
  m++)w.push([f, m]);
  return w
}
function Bl(y){
  return Array.from({
    length:9
  }, (k, u)=>[y, u])
}
function Al(y){
  return Array.from({
    length:9
  }, (k, u)=>[u, y])
}
function Ul(y, k){
  const u=new Set;
  for(let m=0;
  m<9;
  m++)u.add(`${y},${m}`), u.add(`${m},${k}`);
  const w=Math.floor(y/3)*3, f=Math.floor(k/3)*3;
  for(let m=w;
  m<w+3;
  m++)for(let N=f;
  N<f+3;
  N++)u.add(`${m},${N}`);
  return u.delete(`${y},${k}`), Array.from(u).map(m=>{
    const[N, S]=m.split(",").map(Number);
    return[N, S]
  })
}
function Oa(y){
  const k=Array.from({
    length:9
  }, ()=>Array.from({
    length:9
  }, ()=>new Set));
  for(let u=0;
  u<9;
  u++)for(let w=0;
  w<9;
  w++)if(y[u][w]===null)for(let f=1;
  f<=9;
  f++)Hl(y, u, w, f)&&k[u][w].add(f);
  return k
}
function Hl(y, k, u, w){
  for(let N=0;
  N<9;
  N++)if(y[k][N]===w)return!1;
  for(let N=0;
  N<9;
  N++)if(y[N][u]===w)return!1;
  const f=Math.floor(k/3)*3, m=Math.floor(u/3)*3;
  for(let N=f;
  N<f+3;
  N++)for(let S=m;
  S<m+3;
  S++)if(y[N][S]===w)return!1;
  return!0
}
function Hf(y){
  return y.every(k=>k.every(u=>u!==null))
}
function Vf(y, k=2){
  let u=0;
  function w(f){
    if(!(u>=k)){
      for(let m=0;
      m<9;
      m++)for(let N=0;
      N<9;
      N++)if(f[m][N]===null){
        for(let S=1;
        S<=9;
        S++)Hl(f, m, N, S)&&(f[m][N]=S, w(f), f[m][N]=null);
        return
      }
      u++
    }

  }
  return w(In(y)), u
}
function Aa(y){
  const k=[...y];
  for(let u=k.length-1;
  u>0;
  u--){
    const w=Math.floor(Math.random()*(u+1));
    [k[u], k[w]]=[k[w], k[u]]
  }
  return k
}
function Qf(){
  const y=Array.from({
    length:9
  }, ()=>Array(9).fill(null));
  function k(u){
    if(u===81)return!0;
    const w=Math.floor(u/9), f=u%9, m=Aa([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for(const N of m)if(Hl(y, w, f, N)){
      if(y[w][f]=N, k(u+1))return!0;
      y[w][f]=null
    }
    return!1
  }
  return k(0), y
}
function Xf(y){
  const k=Qf(), u=In(k), w=Aa(Array.from({
    length:81
  }, (N, S)=>[Math.floor(S/9), S%9])), f=y==="medium"?32:26;
  let m=81;
  for(const[N, S]of w){
    if(m<=f)break;
    const x=u[N][S];
    u[N][S]=null, m--, Vf(u)!==1&&(u[N][S]=x, m++)
  }
  return{
    puzzle:u, solution:k
  }

}
function qf(y, k){
  return Kf(y, k)||Yf(y, k)||Gf(y, k)||Zf(y, k)||SudoHintNakedQuad(y, k)||Jf(y, k)||SudoHintHiddenTriple(y, k)||SudoHintHiddenQuad(y, k)||bf(y, k)||ed(y, k)||td(y, k)||SudoHintFinnedXWing(y, k)||nd(y, k)||SudoHintJellyfish(y, k)||SudoHintSkyscraper(y, k)||SudoHintTwoStringKite(y, k)||SudoHintSimpleColoring(y, k)||SudoHintWWing(y, k)||rd(y, k)||SudoHintXYZWing(y, k)||SudoHintXYChain(y, k)||SudoHintUniqueRectangle(y, k)||ld(y, k)||SudoHintNoSupported(y, k)
}
function Kf(y, k){
  for(let u=0;
  u<9;
  u++)for(let w=0;
  w<9;
  w++)if(y[u][w]===null&&k[u][w].size===1){
    const f=[...k[u][w]][0], m=Ul(u, w).filter(([N, S])=>y[N][S]===f);
    return{
      technique:"Naked Single", techniqueLevel:"basic", description:`R${u+1}C${w+1} = ${f}`, explanation:`Cell R${u+1}C${w+1} has only one possible candidate: ${f}. All other digits (1–9) are already present in its row, column, or 3×3 box. When only one option remains, that must be the answer.`, targetCells:[[u, w]], highlightCells:m, value:f
    }

  }
  return null
}
function Yf(y, k){
  const u=[];
  for(let w=0;
  w<9;
  w++)u.push({
    cells:Bl(w), name:`Row ${w+1}`
  }), u.push({
    cells:Al(w), name:`Column ${w+1}`
  }), u.push({
    cells:dn(w), name:`Box ${Math.floor(w/3)+1}-${w%3+1}`
  });
  for(const w of u)for(let f=1;
  f<=9;
  f++){
    const m=w.cells.filter(([N, S])=>y[N][S]===null&&k[N][S].has(f));
    if(m.length===1){
      const[N, S]=m[0], x=w.cells.filter(([E, C])=>!(E===N&&C===S)&&y[E][C]===null);
      return{
        technique:"Hidden Single", techniqueLevel:"basic", description:`R${N+1}C${S+1} = ${f} (only place in ${w.name})`, explanation:`In ${w.name}, the digit ${f} can only go in one cell: R${N+1}C${S+1}. Even though this cell has multiple candidates, ${f} is eliminated from all other empty cells in the unit — making this the only valid placement. This is called "hidden" because the single is concealed among other candidates.`, targetCells:[[N, S]], highlightCells:x, value:f
      }

    }

  }
  return null
}
function Gf(y, k){
  const u=[f=>Bl(f), f=>Al(f), f=>dn(f)], w=["Row", "Column", "Box"];
  for(let f=0;
  f<3;
  f++)for(let m=0;
  m<9;
  m++){
    const S=u[f](m).filter(([x, E])=>y[x][E]===null);
    for(let x=0;
    x<S.length;
    x++){
      const[E, C]=S[x];
      if(k[E][C].size===2)for(let L=x+1;
      L<S.length;
      L++){
        const[R, V]=S[L];
        if(k[R][V].size!==2)continue;
        const Z=k[E][C], K=k[R][V];
        if(Z.size===2&&K.size===2&&[...Z].every(F=>K.has(F))){
          const F=[...Z], te=[];
          for(const[ae, re]of S)if(!(ae===E&&re===C||ae===R&&re===V))for(const he of F)k[ae][re].has(he)&&te.push({
            row:ae, col:re, digit:he
          });
          if(te.length===0)continue;
          const se=`${w[f]} ${m+1}`;
          return{
            technique:"Naked Pair", techniqueLevel:"intermediate", description:`Naked Pair {${F.join(",")}} in ${se}`, explanation:`Cells R${E+1}C${C+1} and R${R+1}C${V+1} in ${se} each contain exactly two candidates: {${F.join(", ")}}. Since these two digits must go in these two cells (one each), no other cell in the unit can contain either of them. You can eliminate ${F.join(" and ")} from ${te.length} other cell(s) in the unit.`, targetCells:[[E, C], [R, V]], highlightCells:[[E, C], [R, V]], eliminationCells:te
          }

        }

      }

    }

  }
  return null
}
function Zf(y, k){
  const u=[f=>Bl(f), f=>Al(f), f=>dn(f)], w=["Row", "Column", "Box"];
  for(let f=0;
  f<3;
  f++)for(let m=0;
  m<9;
  m++){
    const S=u[f](m).filter(([x, E])=>y[x][E]===null&&k[x][E].size>=2&&k[x][E].size<=3);
    for(let x=0;
    x<S.length;
    x++)for(let E=x+1;
    E<S.length;
    E++)for(let C=E+1;
    C<S.length;
    C++){
      const[L, R]=S[x], [V, Z]=S[E], [K, F]=S[C], te=new Set([...k[L][R], ...k[V][Z], ...k[K][F]]);
      if(te.size!==3)continue;
      const se=[...te], ae=u[f](m), re=[];
      for(const[he, fe]of ae)if(y[he][fe]===null&&!(he===L&&fe===R||he===V&&fe===Z||he===K&&fe===F))for(const Ne of se)k[he][fe].has(Ne)&&re.push({
        row:he, col:fe, digit:Ne
      });
      if(re.length!==0)return{
        technique:"Naked Triple", techniqueLevel:"intermediate", description:`Naked Triple {${se.join(",")}} in ${w[f]} ${m+1}`, explanation:`Three cells — R${L+1}C${R+1}, R${V+1}C${Z+1}, R${K+1}C${F+1} — together contain exactly three candidates: {${se.join(", ")}}. These three digits must be distributed among these three cells, so they cannot appear elsewhere in ${w[f]} ${m+1}. Eliminate ${se.join(", ")} from the ${re.length} other cell(s).`, targetCells:[[L, R], [V, Z], [K, F]], highlightCells:[[L, R], [V, Z], [K, F]], eliminationCells:re
      }

    }

  }
  return null
}
function Jf(y, k){
  const u=[f=>Bl(f), f=>Al(f), f=>dn(f)], w=["Row", "Column", "Box"];
  for(let f=0;
  f<3;
  f++)for(let m=0;
  m<9;
  m++){
    const S=u[f](m).filter(([x, E])=>y[x][E]===null);
    for(let x=1;
    x<=8;
    x++)for(let E=x+1;
    E<=9;
    E++){
      const C=S.filter(([se, ae])=>k[se][ae].has(x)), L=S.filter(([se, ae])=>k[se][ae].has(E));
      if(C.length!==2||L.length!==2||!(C[0][0]===L[0][0]&&C[0][1]===L[0][1]&&C[1][0]===L[1][0]&&C[1][1]===L[1][1]))continue;
      const[V, Z]=C[0], [K, F]=C[1], te=[];
      for(const[se, ae]of[[V, Z], [K, F]])for(const re of k[se][ae])re!==x&&re!==E&&te.push({
        row:se, col:ae, digit:re
      });
      if(te.length!==0)return{
        technique:"Hidden Pair", techniqueLevel:"intermediate", description:`Hidden Pair {${x},${E}} at R${V+1}C${Z+1}, R${K+1}C${F+1}`, explanation:`In ${w[f]} ${m+1}, digits ${x} and ${E} can only appear in two cells: R${V+1}C${Z+1} and R${K+1}C${F+1}. These two cells are the exclusive home of both digits, so all other candidates in those cells can be eliminated. This reveals a hidden pair "locked" to these positions.`, targetCells:[[V, Z], [K, F]], highlightCells:[[V, Z], [K, F]], eliminationCells:te
      }

    }

  }
  return null
}
function bf(y, k){
  for(let u=0;
  u<9;
  u++){
    const w=dn(u);
    for(let f=1;
    f<=9;
    f++){
      const m=w.filter(([x, E])=>y[x][E]===null&&k[x][E].has(f));
      if(m.length<2||m.length>3)continue;
      const N=new Set(m.map(([x])=>x)), S=new Set(m.map(([, x])=>x)), x=m.length===2?"Pointing Pair":"Pointing Triple";
      if(N.size===1){
        const E=[...N][0], C=[];
        for(let L=0;
        L<9;
        L++)y[E][L]===null&&k[E][L].has(f)&&!m.some(([, R])=>R===L)&&C.push({
          row:E, col:L, digit:f
        });
        if(C.length===0)continue;
        const L=`Box ${Math.floor(u/3)+1}-${u%3+1}`;
        return{
          technique:x, techniqueLevel:"intermediate", description:`${f} in ${L} points to Row ${E+1}`, explanation:`In ${L}, digit ${f} can only appear in Row ${E+1} (cells ${m.map(([R,V])=>`R${
            R+1
          }
          C${
            V+1
          }
          `).join(" & ")}). Since one of these cells must hold ${f}, no other cell in Row ${E+1} outside this box can contain ${f}. This is a ${x} - the box points to the row.`, targetCells:m, highlightCells:m, eliminationCells:C
        }

      }
      if(S.size===1){
        const E=[...S][0], C=[];
        for(let L=0;
        L<9;
        L++)y[L][E]===null&&k[L][E].has(f)&&!m.some(([R])=>R===L)&&C.push({
          row:L, col:E, digit:f
        });
        if(C.length===0)continue;
        const L=`Box ${Math.floor(u/3)+1}-${u%3+1}`;
        return{
          technique:x, techniqueLevel:"intermediate", description:`${f} in ${L} points to Column ${E+1}`, explanation:`In ${L}, digit ${f} can only appear in Column ${E+1} (cells ${m.map(([R,V])=>`R${
            R+1
          }
          C${
            V+1
          }
          `).join(" & ")}). Since one of these cells must hold ${f}, no other cell in Column ${E+1} outside this box can contain ${f}. This is a ${x} - the box points to the column.`, targetCells:m, highlightCells:m, eliminationCells:C
        }

      }

    }

  }
  return null
}
function ed(y, k){
  for(let u=1;
  u<=9;
  u++){
    for(let w=0;
    w<9;
    w++){
      const f=[];
      for(let E=0;
      E<9;
      E++)y[w][E]===null&&k[w][E].has(u)&&f.push([w, E]);
      if(f.length<2||f.length>3)continue;
      const m=new Set(f.map(([E, C])=>Da(E, C)));
      if(m.size!==1)continue;
      const N=[...m][0], S=dn(N), x=[];
      for(const[E, C]of S)y[E][C]===null&&E!==w&&k[E][C].has(u)&&x.push({
        row:E, col:C, digit:u
      });
      if(x.length!==0)return{
        technique:"Box-Line Reduction", techniqueLevel:"intermediate", description:`${u} in Row ${w+1} confined to Box ${Math.floor(N/3)+1}-${N%3+1}`, explanation:`In Row ${w+1}, digit ${u} can only appear within Box ${Math.floor(N/3)+1}-${N%3+1}. Since one cell in this row-segment must hold ${u}, that digit cannot appear elsewhere in the box. Eliminate ${u} from other cells in the box that are not in Row ${w+1}.`, targetCells:f, highlightCells:f, eliminationCells:x
      }

    }
    for(let w=0;
    w<9;
    w++){
      const f=[];
      for(let E=0;
      E<9;
      E++)y[E][w]===null&&k[E][w].has(u)&&f.push([E, w]);
      if(f.length<2||f.length>3)continue;
      const m=new Set(f.map(([E, C])=>Da(E, C)));
      if(m.size!==1)continue;
      const N=[...m][0], S=dn(N), x=[];
      for(const[E, C]of S)y[E][C]===null&&C!==w&&k[E][C].has(u)&&x.push({
        row:E, col:C, digit:u
      });
      if(x.length!==0)return{
        technique:"Box-Line Reduction", techniqueLevel:"intermediate", description:`${u} in Column ${w+1} confined to Box ${Math.floor(N/3)+1}-${N%3+1}`, explanation:`In Column ${w+1}, digit ${u} can only appear within Box ${Math.floor(N/3)+1}-${N%3+1}. Since one of those cells must hold ${u}, it cannot appear elsewhere in the box. Eliminate ${u} from other cells in the box not in Column ${w+1}.`, targetCells:f, highlightCells:f, eliminationCells:x
      }

    }

  }
  return null
}
function td(y, k){
  for(let u=1;
  u<=9;
  u++){
    const w=[];
    for(let m=0;
    m<9;
    m++){
      const N=[];
      for(let S=0;
      S<9;
      S++)y[m][S]===null&&k[m][S].has(u)&&N.push(S);
      N.length===2&&w.push({
        row:m, cols:N
      })
    }
    for(let m=0;
    m<w.length;
    m++)for(let N=m+1;
    N<w.length;
    N++){
      const S=w[m], x=w[N];
      if(S.cols[0]!==x.cols[0]||S.cols[1]!==x.cols[1])continue;
      const[E, C]=S.cols, L=[];
      for(let R=0;
      R<9;
      R++)if(!(R===S.row||R===x.row))for(const V of[E, C])y[R][V]===null&&k[R][V].has(u)&&L.push({
        row:R, col:V, digit:u
      });
      if(L.length!==0)return{
        technique:"X-Wing", techniqueLevel:"advanced", description:`X-Wing on ${u} in Rows ${S.row+1} & ${x.row+1}, Columns ${E+1} & ${C+1}`, explanation:`Digit ${u} appears exactly twice in Row ${S.row+1} (at columns ${E+1} & ${C+1}) and exactly twice in Row ${x.row+1} at the same columns. This forms a rectangle (X-Wing). No matter which diagonal of the rectangle holds ${u}, both columns ${E+1} and ${C+1} are covered. Therefore, ${u} can be eliminated from all other cells in columns ${E+1} and ${C+1}.`, targetCells:[[S.row, E], [S.row, C], [x.row, E], [x.row, C]], highlightCells:[[S.row, E], [S.row, C], [x.row, E], [x.row, C]], eliminationCells:L
      }

    }
    const f=[];
    for(let m=0;
    m<9;
    m++){
      const N=[];
      for(let S=0;
      S<9;
      S++)y[S][m]===null&&k[S][m].has(u)&&N.push(S);
      N.length===2&&f.push({
        col:m, rows:N
      })
    }
    for(let m=0;
    m<f.length;
    m++)for(let N=m+1;
    N<f.length;
    N++){
      const S=f[m], x=f[N];
      if(S.rows[0]!==x.rows[0]||S.rows[1]!==x.rows[1])continue;
      const[E, C]=S.rows, L=[];
      for(let R=0;
      R<9;
      R++)if(!(R===S.col||R===x.col))for(const V of[E, C])y[V][R]===null&&k[V][R].has(u)&&L.push({
        row:V, col:R, digit:u
      });
      if(L.length!==0)return{
        technique:"X-Wing", techniqueLevel:"advanced", description:`X-Wing on ${u} in Columns ${S.col+1} & ${x.col+1}, Rows ${E+1} & ${C+1}`, explanation:`Digit ${u} appears exactly twice in Column ${S.col+1} (rows ${E+1} & ${C+1}) and exactly twice in Column ${x.col+1} at the same rows. These four cells form an X-Wing rectangle. Since ${u} must occupy one diagonal of this rectangle, it can be safely eliminated from all other cells in rows ${E+1} and ${C+1}.`, targetCells:[[E, S.col], [C, S.col], [E, x.col], [C, x.col]], highlightCells:[[E, S.col], [C, S.col], [E, x.col], [C, x.col]], eliminationCells:L
      }

    }

  }
  return null
}
function nd(y, k){
  for(let u=1;
  u<=9;
  u++){
    const w=SudoHintFish(y, k, u, 3, "row")||SudoHintFish(y, k, u, 3, "column");
    if(w)return w
  }
  return null
}
function rd(y, k){
  for(let u=0;
  u<9;
  u++)for(let w=0;
  w<9;
  w++){
    if(y[u][w]!==null||k[u][w].size!==2)continue;
    const[f, m]=[...k[u][w]], N=Ul(u, w);
    for(const[S, x]of N){
      if(y[S][x]!==null||k[S][x].size!==2||!k[S][x].has(f))continue;
      const E=[...k[S][x]].find(L=>L!==f);
      if(E===void 0||E===m)continue;
      const C=E;
      for(const[L, R]of N){
        if(L===S&&R===x||y[L][R]!==null||k[L][R].size!==2||!k[L][R].has(m)||!k[L][R].has(C))continue;
        const V=[], Z=new Set(Ul(S, x).map(([F, te])=>`${F},${te}`)), K=new Set(Ul(L, R).map(([F, te])=>`${F},${te}`));
        for(let F=0;
        F<9;
        F++)for(let te=0;
        te<9;
        te++)y[F][te]===null&&(F===u&&te===w||F===S&&te===x||F===L&&te===R||Z.has(`${F},${te}`)&&K.has(`${F},${te}`)&&k[F][te].has(C)&&V.push({
          row:F, col:te, digit:C
        }));
        if(V.length!==0)return{
          technique:"XY-Wing", techniqueLevel:"expert", description:`XY-Wing: pivot R${u+1}C${w+1}(${f},${m}), wings R${S+1}C${x+1}(${f},${C}) & R${L+1}C${R+1}(${m},${C})`, explanation:`This is a chain of three bi-value cells. The pivot R${u+1}C${w+1} has candidates {${f},${m}}. Wing 1 at R${S+1}C${x+1} has {${f},${C}}, and Wing 2 at R${L+1}C${R+1} has {${m},${C}}. If the pivot = ${f}, then Wing 1 = ${C}. If the pivot = ${m}, then Wing 2 = ${C}. Either way, one of the wings must equal ${C}. Any cell that sees both wings cannot be ${C} — eliminate ${C} from those cells.`, targetCells:[[u, w], [S, x], [L, R]], highlightCells:[[u, w], [S, x], [L, R]], eliminationCells:V
        }

      }

    }

  }
  return null
}
function SudoHintCombinations(y, k, u=0, w=[], f=[]){
  if(w.length===k){
    f.push([...w]);
    return f
  }
  for(let m=u;
  m<=y.length-(k-w.length);
  m++)w.push(y[m]), SudoHintCombinations(y, k, m+1, w, f), w.pop();
  return f
}
function SudoHintUnits(){
  const y=[];
  for(let k=0;
  k<9;
  k++)y.push({
    cells:Bl(k), name:`Row ${k+1}`, type:"row", index:k
  }), y.push({
    cells:Al(k), name:`Column ${k+1}`, type:"column", index:k
  }), y.push({
    cells:dn(k), name:`Box ${Math.floor(k/3)+1}-${k%3+1}`, type:"box", index:k
  });
  return y
}
function SudoHintCellKey(y){
  return`${y[0]},${y[1]}`
}
function SudoHintSees(y, k){
  return y[0]===k[0]||y[1]===k[1]||Math.floor(y[0]/3)===Math.floor(k[0]/3)&&Math.floor(y[1]/3)===Math.floor(k[1]/3)
}
function SudoHintCellName(y){
  return`R${y[0]+1}C${y[1]+1}`
}
function SudoHintCellsEqual(y, k){
  return y[0]===k[0]&&y[1]===k[1]
}
function SudoHintStrongLinks(y, k, u){
  const w=[];
  for(const f of SudoHintUnits()){
    const m=f.cells.filter(([N, S])=>y[N][S]===null&&k[N][S].has(u));
    m.length===2&&w.push({
      a:m[0], b:m[1], unit:f
    })
  }
  return w
}
function SudoHintNakedSubset(y, k, u, w){
  for(const f of SudoHintUnits()){
    const m=f.cells.filter(([N, S])=>y[N][S]===null&&k[N][S].size>=2&&k[N][S].size<=u);
    for(const N of SudoHintCombinations(m, u)){
      const S=new Set;
      for(const[C, L]of N)for(const R of k[C][L])S.add(R);
      if(S.size!==u)continue;
      const x=[...S].sort((C, L)=>C-L), E=new Set(N.map(SudoHintCellKey)), C=[];
      for(const[L, R]of f.cells)if(y[L][R]===null&&!E.has(`${L},${R}`))for(const V of x)k[L][R].has(V)&&C.push({
        row:L, col:R, digit:V
      });
      if(C.length!==0)return{
        technique:w, techniqueLevel:"intermediate", description:`${w} {${x.join(",")}} in ${f.name}`, explanation:`The cells ${N.map(SudoHintCellName).join(", ")} in ${f.name} together contain only the ${u} candidates {${x.join(", ")}}. Those digits must occupy those cells, so they can be removed from every other cell in the unit.`, targetCells:N, highlightCells:N, eliminationCells:C
      }
    }
  }
  return null
}
function SudoHintNakedQuad(y, k){
  return SudoHintNakedSubset(y, k, 4, "Naked Quad")
}
function SudoHintHiddenSubset(y, k, u, w){
  const f=[1, 2, 3, 4, 5, 6, 7, 8, 9];
  for(const m of SudoHintUnits())for(const N of SudoHintCombinations(f, u)){
    const S=new Map;
    let x=!0;
    for(const E of N){
      const C=m.cells.filter(([L, R])=>y[L][R]===null&&k[L][R].has(E));
      if(C.length===0){
        x=!1;
        break
      }
      for(const L of C)S.set(SudoHintCellKey(L), L)
    }
    if(!x||S.size!==u)continue;
    const E=[...S.values()], C=[], L=new Set(N);
    for(const[R, V]of E)for(const Z of k[R][V])!L.has(Z)&&C.push({
      row:R, col:V, digit:Z
    });
    if(C.length!==0)return{
      technique:w, techniqueLevel:"intermediate", description:`${w} {${N.join(",")}} in ${m.name}`, explanation:`In ${m.name}, digits ${N.join(", ")} can appear only in ${E.map(SudoHintCellName).join(", ")}. Those cells must contain those hidden digits, so all other candidates can be removed from them.`, targetCells:E, highlightCells:E, eliminationCells:C
    }
  }
  return null
}
function SudoHintHiddenTriple(y, k){
  return SudoHintHiddenSubset(y, k, 3, "Hidden Triple")
}
function SudoHintHiddenQuad(y, k){
  return SudoHintHiddenSubset(y, k, 4, "Hidden Quad")
}
function SudoHintFish(y, k, u, w, f){
  const m=w===3?"Swordfish":"Jellyfish", N=f==="row"?"Rows":"Columns", S=f==="row"?"Columns":"Rows", x=[];
  for(let E=0;
  E<9;
  E++){
    const C=[];
    for(let L=0;
    L<9;
    L++){
      const R=f==="row"?E:L, V=f==="row"?L:E;
      y[R][V]===null&&k[R][V].has(u)&&C.push(L)
    }
    C.length>=2&&C.length<=w&&x.push({
      line:E, positions:C
    })
  }
  for(const E of SudoHintCombinations(x, w)){
    const C=new Set;
    for(const Z of E)for(const K of Z.positions)C.add(K);
    if(C.size!==w)continue;
    const L=[...C].sort((Z, K)=>Z-K), R=[];
    for(let Z=0;
    Z<9;
    Z++)if(!E.some(K=>K.line===Z))for(const K of L){
      const F=f==="row"?Z:K, te=f==="row"?K:Z;
      y[F][te]===null&&k[F][te].has(u)&&R.push({
        row:F, col:te, digit:u
      })
    }
    if(R.length===0)continue;
    const V=[];
    for(const{
      line:Z, positions:K
    }
    of E)for(const F of K)L.includes(F)&&V.push(f==="row"?[Z, F]:[F, Z]);
    const Z=E.map(K=>K.line+1).join(", "), K=L.map(F=>F+1).join(", ");
    return{
      technique:m, techniqueLevel:"advanced", description:`${m} on ${u} in ${N} ${Z}, ${S} ${K}`, explanation:`Digit ${u} is restricted to ${w} ${f==="row"?"rows":"columns"} (${Z}) and the same ${w} ${f==="row"?"columns":"rows"} (${K}). This ${m} pattern means ${u} must occupy those crossing positions, so ${u} can be eliminated from all other cells in those ${f==="row"?"columns":"rows"}.`, targetCells:V, highlightCells:V, eliminationCells:R
    }

  }
  return null
}
function SudoHintJellyfish(y, k){
  for(let u=1;
  u<=9;
  u++){
    const w=SudoHintFish(y, k, u, 4, "row")||SudoHintFish(y, k, u, 4, "column");
    if(w)return w
  }
  return null
}
function SudoHintFinnedXWing(y, k){
  for(let u=1;
  u<=9;
  u++){
    for(const w of["row", "column"]){
      const f=[];
      for(let m=0;
      m<9;
      m++){
        const N=[];
        for(let S=0;
        S<9;
        S++){
          const x=w==="row"?m:S, E=w==="row"?S:m;
          y[x][E]===null&&k[x][E].has(u)&&N.push(S)
        }
        N.length>=2&&N.length<=4&&f.push({
          line:m, positions:N
        })
      }
      for(const m of SudoHintCombinations(f, 2)){
        const N=[...new Set([...m[0].positions, ...m[1].positions])];
        for(const S of SudoHintCombinations(N, 2)){
          if(!m.every(L=>L.positions.some(R=>S.includes(R))))continue;
          const x=[];
          for(const L of m)for(const R of L.positions)!S.includes(R)&&x.push(w==="row"?[L.line, R]:[R, L.line]);
          if(x.length===0||x.length>2)continue;
          const E=new Set(x.map(([L, R])=>Da(L, R)));
          if(E.size!==1)continue;
          const C=[];
          for(const L of S)for(let R=0;
          R<9;
          R++){
            const V=w==="row"?[R, L]:[L, R], Z=w==="row"?R:V[1];
            if(m.some(K=>K.line===Z)||y[V[0]][V[1]]!==null||!k[V[0]][V[1]].has(u))continue;
            x.every(K=>SudoHintSees(K, V))&&C.push({
              row:V[0], col:V[1], digit:u
            })
          }
          if(C.length!==0){
            const L=m.flatMap(R=>R.positions.filter(V=>S.includes(V)).map(V=>w==="row"?[R.line, V]:[V, R.line])), R=m.map(V=>V.line+1).join(" & "), V=S.map(Z=>Z+1).join(" & ");
            return{
              technique:"Finned X-Wing", techniqueLevel:"advanced", description:`Finned X-Wing on ${u} in ${w==="row"?"Rows":"Columns"} ${R}`, explanation:`Digit ${u} almost forms an X-Wing across ${w==="row"?"rows":"columns"} ${R} and ${w==="row"?"columns":"rows"} ${V}, with fin cell${x.length>1?"s":""} ${x.map(SudoHintCellName).join(", ")}. If a fin is true, the elimination sees it; if no fin is true, the X-Wing is true. Either way, the candidate can be removed.`, targetCells:[...L, ...x], highlightCells:[...L, ...x], eliminationCells:C
            }
          }
        }
      }
    }
  }
  return null
}
function SudoHintSkyscraper(y, k){
  for(let u=1;
  u<=9;
  u++){
    for(const w of["row", "column"]){
      const f=[];
      for(let m=0;
      m<9;
      m++){
        const N=[];
        for(let S=0;
        S<9;
        S++){
          const x=w==="row"?m:S, E=w==="row"?S:m;
          y[x][E]===null&&k[x][E].has(u)&&N.push(S)
        }
        N.length===2&&f.push({
          line:m, positions:N
        })
      }
      for(let m=0;
      m<f.length;
      m++)for(let N=m+1;
      N<f.length;
      N++){
        const S=f[m], x=f[N], E=S.positions.filter(R=>x.positions.includes(R));
        if(E.length!==1)continue;
        const C=S.positions.find(R=>R!==E[0]), L=x.positions.find(R=>R!==E[0]), R=w==="row"?[S.line, C]:[C, S.line], V=w==="row"?[x.line, L]:[L, x.line], Z=[];
        for(let K=0;
        K<9;
        K++)for(let F=0;
        F<9;
        F++)y[K][F]===null&&!(K===R[0]&&F===R[1])&&!(K===V[0]&&F===V[1])&&SudoHintSees(R, [K, F])&&SudoHintSees(V, [K, F])&&k[K][F].has(u)&&Z.push({
          row:K, col:F, digit:u
        });
        if(Z.length!==0){
          const K=w==="row"?[[S.line, E[0]], R, [x.line, E[0]], V]:[[E[0], S.line], R, [E[0], x.line], V], F=new Set(K.map(SudoHintCellKey)), te=Z.filter(se=>!F.has(`${se.row},${se.col}`));
          if(te.length===0)continue;
          return{
            technique:"Skyscraper", techniqueLevel:"advanced", description:`Skyscraper on ${u} removes ${u} from ${te.map(se=>`R${se.row+1}C${se.col+1}`).join(", ")}`, explanation:`Digit ${u} has two possible positions in each of two ${w==="row"?"rows":"columns"}. The strong links share one base ${w==="row"?"column":"row"}, so at least one roof cell (${SudoHintCellName(R)} or ${SudoHintCellName(V)}) must contain ${u}. Any cell seeing both roof cells cannot contain ${u}.`, targetCells:K, highlightCells:K, eliminationCells:te
          }
        }
      }
    }
  }
  return null
}
function SudoHintTwoStringKite(y, k){
  for(let u=1;
  u<=9;
  u++){
    const w=[], f=[];
    for(let m=0;
    m<9;
    m++){
      const N=[], S=[];
      for(let x=0;
      x<9;
      x++)y[m][x]===null&&k[m][x].has(u)&&N.push([m, x]), y[x][m]===null&&k[x][m].has(u)&&S.push([x, m]);
      N.length===2&&w.push(N), S.length===2&&f.push(S)
    }
    for(const m of w)for(const N of f)for(const S of m)for(const x of N){
      if(!SudoHintSees(S, x)||SudoHintCellsEqual(S, x)||Da(S[0], S[1])!==Da(x[0], x[1]))continue;
      const E=m.find(L=>!SudoHintCellsEqual(L, S)), C=N.find(L=>!SudoHintCellsEqual(L, x)), L=[C[0], E[1]];
      if(y[L[0]][L[1]]===null&&k[L[0]][L[1]].has(u)&&!SudoHintCellsEqual(L, E)&&!SudoHintCellsEqual(L, C))return{
        technique:"Two-String Kite", techniqueLevel:"advanced", description:`Two-String Kite removes ${u} from ${SudoHintCellName(L)}`, explanation:`A row strong link and a column strong link on ${u} connect through Box ${Math.floor(Da(S[0], S[1])/3)+1}-${Da(S[0], S[1])%3+1}. One of the two outer endpoints ${SudoHintCellName(E)} or ${SudoHintCellName(C)} must be ${u}, so their shared seeing cell ${SudoHintCellName(L)} cannot contain ${u}.`, targetCells:[S, E, x, C], highlightCells:[S, E, x, C], eliminationCells:[{
          row:L[0], col:L[1], digit:u
        }]
      }
    }
  }
  return null
}
function SudoHintSimpleColoring(y, k){
  for(let u=1;
  u<=9;
  u++){
    const w=SudoHintStrongLinks(y, k, u), f=new Map;
    for(const{a:S, b:x}of w){
      const E=SudoHintCellKey(S), C=SudoHintCellKey(x);
      f.has(E)||f.set(E, new Set), f.has(C)||f.set(C, new Set), f.get(E).add(C), f.get(C).add(E)
    }
    const m=new Map;
    for(const N of f.keys())if(!m.has(N)){
      const S=[N], x=[];
      m.set(N, 0);
      for(let E=0;
      E<S.length;
      E++){
        const C=S[E], L=m.get(C), R=C.split(",").map(Number);
        x.push(R);
        for(const V of f.get(C)??[])if(!m.has(V))m.set(V, 1-L), S.push(V)
      }
      for(let E=0;
      E<x.length;
      E++)for(let C=E+1;
      C<x.length;
      C++){
        const L=SudoHintCellKey(x[E]), R=SudoHintCellKey(x[C]);
        if(m.get(L)===m.get(R)&&SudoHintSees(x[E], x[C])){
          const V=x.filter(Z=>m.get(SudoHintCellKey(Z))===m.get(L)).map(Z=>({
            row:Z[0], col:Z[1], digit:u
          }));
          if(V.length!==0)return{
            technique:"Simple Coloring", techniqueLevel:"expert", description:`Simple Coloring removes color conflict candidates for ${u}`, explanation:`Conjugate pairs for ${u} create two color groups. Two same-color candidates see each other at ${SudoHintCellName(x[E])} and ${SudoHintCellName(x[C])}, so that color cannot be true anywhere in the chain.`, targetCells:x, highlightCells:x, eliminationCells:V
          }
        }
      }
      for(let E=0;
      E<9;
      E++)for(let C=0;
      C<9;
      C++){
        const L=`${E},${C}`;
        if(y[E][C]!==null||!k[E][C].has(u)||m.has(L))continue;
        const R=x.some(V=>m.get(SudoHintCellKey(V))===0&&SudoHintSees(V, [E, C])), V=x.some(Z=>m.get(SudoHintCellKey(Z))===1&&SudoHintSees(Z, [E, C]));
        if(R&&V)return{
          technique:"Simple Coloring", techniqueLevel:"expert", description:`Simple Coloring removes ${u} from R${E+1}C${C+1}`, explanation:`R${E+1}C${C+1} sees both color groups in a conjugate-chain coloring for ${u}. One of those colors must be true, so this uncolored candidate cannot be ${u}.`, targetCells:x, highlightCells:x, eliminationCells:[{
            row:E, col:C, digit:u
          }]
        }
      }
    }
  }
  return null
}
function SudoHintWWing(y, k){
  const u=[];
  for(let w=0;
  w<9;
  w++)for(let f=0;
  f<9;
  f++)y[w][f]===null&&k[w][f].size===2&&u.push([w, f]);
  for(let w=0;
  w<u.length;
  w++)for(let f=w+1;
  f<u.length;
  f++){
    const m=u[w], N=u[f], S=[...k[m[0]][m[1]]].sort((he, fe)=>he-fe), x=[...k[N[0]][N[1]]].sort((he, fe)=>he-fe);
    if(S[0]!==x[0]||S[1]!==x[1]||SudoHintSees(m, N))continue;
    for(const E of S){
      const C=S.find(he=>he!==E);
      for(const L of SudoHintStrongLinks(y, k, E)){
        const R=[L.a, L.b];
        if(R.some(he=>SudoHintCellsEqual(he, m)||SudoHintCellsEqual(he, N)))continue;
        const V=SudoHintSees(m, R[0])&&SudoHintSees(N, R[1]), Z=SudoHintSees(m, R[1])&&SudoHintSees(N, R[0]);
        if(!V&&!Z)continue;
        const K=[];
        for(let he=0;
        he<9;
        he++)for(let fe=0;
        fe<9;
        fe++)y[he][fe]===null&&!SudoHintCellsEqual([he, fe], m)&&!SudoHintCellsEqual([he, fe], N)&&SudoHintSees([he, fe], m)&&SudoHintSees([he, fe], N)&&k[he][fe].has(C)&&K.push({
          row:he, col:fe, digit:C
        });
        if(K.length!==0)return{
          technique:"W-Wing", techniqueLevel:"expert", description:`W-Wing {${S.join(",")}} removes ${C} from ${K.map(he=>`R${he.row+1}C${he.col+1}`).join(", ")}`, explanation:`Cells ${SudoHintCellName(m)} and ${SudoHintCellName(N)} have the same two candidates {${S.join(", ")}}. A strong link on ${E} connects cells that see those wings, forcing at least one wing to be ${C}. Any cell seeing both wings cannot contain ${C}.`, targetCells:[m, N, ...R], highlightCells:[m, N, ...R], eliminationCells:K
        }
      }
    }
  }
  return null
}
function SudoHintUniqueRectangle(y, k){
  for(let u=0;
  u<8;
  u++)for(let w=u+1;
  w<9;
  w++)for(let f=0;
  f<8;
  f++)for(let m=f+1;
  m<9;
  m++){
    if(Math.floor(u/3)!==Math.floor(w/3)&&Math.floor(f/3)!==Math.floor(m/3))continue;
    const N=[[u, f], [u, m], [w, f], [w, m]];
    if(N.some(([x, E])=>y[x][E]!==null))continue;
    for(let S=1;
    S<=8;
    S++)for(let x=S+1;
    x<=9;
    x++){
      const E=[S, x], C=N.filter(([R, V])=>k[R][V].size===2&&E.every(Z=>k[R][V].has(Z))), L=N.filter(([R, V])=>k[R][V].size>2&&E.every(Z=>k[R][V].has(Z)));
      if(C.length===3&&L.length===1){
        const[R, V]=L[0], Z=E.filter(K=>k[R][V].has(K)).map(K=>({
          row:R, col:V, digit:K
        }));
        if(Z.length!==0)return{
          technique:"Unique Rectangle", techniqueLevel:"expert", description:`Unique Rectangle removes ${E.join(" and ")} from R${R+1}C${V+1}`, explanation:`The four corners ${N.map(SudoHintCellName).join(", ")} would form a deadly rectangle on {${E.join(", ")}} if the last corner were also only those two digits. Because this puzzle is assumed to have a unique solution, remove ${E.join(" and ")} from R${R+1}C${V+1}.`, targetCells:N, highlightCells:N, eliminationCells:Z
        }
      }
    }
  }
  return null
}
function SudoHintXYZWing(y, k){
  for(let u=0;
  u<9;
  u++)for(let w=0;
  w<9;
  w++){
    if(y[u][w]!==null||k[u][w].size!==3)continue;
    const f=[...k[u][w]].sort((se, ae)=>se-ae), m=Ul(u, w).filter(([se, ae])=>y[se][ae]===null&&k[se][ae].size===2&&[...k[se][ae]].every(re=>f.includes(re)));
    for(let N=0;
    N<m.length;
    N++)for(let S=N+1;
    S<m.length;
    S++){
      const[x, E]=m[N], [C, L]=m[S], R=k[x][E], V=k[C][L], Z=new Set([...R, ...V]), K=[...R].filter(se=>V.has(se));
      if(Z.size!==3||K.length!==1||![...Z].every(se=>f.includes(se)))continue;
      const F=K[0], te=new Set(Ul(u, w).map(([se, ae])=>`${se},${ae}`)), ee=new Set(Ul(x, E).map(([se, ae])=>`${se},${ae}`)), le=new Set(Ul(C, L).map(([se, ae])=>`${se},${ae}`)), we=[];
      for(let se=0;
      se<9;
      se++)for(let ae=0;
      ae<9;
      ae++){
        const re=`${se},${ae}`;
        y[se][ae]===null&&!(se===u&&ae===w)&&!(se===x&&ae===E)&&!(se===C&&ae===L)&&te.has(re)&&ee.has(re)&&le.has(re)&&k[se][ae].has(F)&&we.push({
          row:se, col:ae, digit:F
        })
      }
      if(we.length!==0)return{
        technique:"XYZ-Wing", techniqueLevel:"expert", description:`XYZ-Wing: pivot R${u+1}C${w+1}(${f.join(",")}), wings R${x+1}C${E+1}(${[...R].join(",")}) & R${C+1}C${L+1}(${[...V].join(",")})`, explanation:`The pivot R${u+1}C${w+1} has three candidates {${f.join(", ")}}. The two wings each see the pivot and share the candidate ${F}. Whichever value the pivot takes, at least one wing must be ${F}; therefore any cell that sees the pivot and both wings cannot contain ${F}.`, targetCells:[[u, w], [x, E], [C, L]], highlightCells:[[u, w], [x, E], [C, L]], eliminationCells:we
      }

    }

  }
  return null
}
function SudoHintXYChain(y, k){
  const u=[];
  for(let w=0;
  w<9;
  w++)for(let f=0;
  f<9;
  f++)y[w][f]===null&&k[w][f].size===2&&u.push([w, f]);
  const w=(C, L)=>C[0]===L[0]||C[1]===L[1]||Math.floor(C[0]/3)===Math.floor(L[0]/3)&&Math.floor(C[1]/3)===Math.floor(L[1]/3), f=C=>`R${C[0]+1}C${C[1]+1}`, m=C=>k[C[0]][C[1]], N=(C, L)=>[...m(C)].find(R=>R!==L), S=10;
  function x(C, L, R, V){
    const Z=new Set(R.map(([te, se])=>`${te},${se}`)), K=[];
    for(let F=0;
    F<9;
    F++)for(let te=0;
    te<9;
    te++){
      const se=`${F},${te}`;
      y[F][te]===null&&!Z.has(se)&&w(C, [F, te])&&w(L, [F, te])&&k[F][te].has(V)&&K.push({
        row:F, col:te, digit:V
      })
    }
    return K
  }
  for(const C of u){
    const L=[...m(C)].sort((K, F)=>K-F);
    for(const R of L){
      function Z(K, F, te){
        if(K.length>S)return null;
        for(const se of u){
          if(K.some(([Ne, _e])=>Ne===se[0]&&_e===se[1])||!w(F, se)||!m(se).has(te))continue;
          const ae=N(se, te), re=[...K, se];
          if(ae===R&&re.length>=3){
            const he=x(C, se, re, R);
            if(he.length!==0)return{
              path:re, eliminationCells:he
            }
          }
          const he=Z([...K, se], se, ae);
          if(he)return he
        }
        return null
      }
      const K=Z([C], C, N(C, R));
      if(K){
        const F=K.path, te=F.map(se=>`${f(se)}(${[...m(se)].sort((ae, re)=>ae-re).join(",")})`).join(" -> ");
        return{
          technique:"XY-Chain", techniqueLevel:"expert", description:`XY-Chain eliminates ${R} from ${K.eliminationCells.map(se=>`R${se.row+1}C${se.col+1}`).join(", ")}`, explanation:`This chain of bi-value cells alternates linked candidates: ${te}. If ${f(C)} is not ${R}, the chain forces ${f(F[F.length-1])} to be ${R}; otherwise ${f(C)} is already ${R}. Therefore any cell that sees both endpoints cannot contain ${R}.`, targetCells:F.map(se=>[se[0], se[1]]), highlightCells:F.map(se=>[se[0], se[1]]), eliminationCells:K.eliminationCells
        }
      }
    }
  }
  return null
}
function SudoHintNoSupported(y, k){
  let u=null, w=1/0;
  for(let m=0;
  m<9;
  m++)for(let N=0;
  N<9;
  N++){
    if(y[m][N]!==null)continue;
    const S=k[m][N].size;
    S<w&&(w=S, u=[m, N])
  }
  if(!u)return null;
  const[f, m]=u, N=[...k[f][m]].sort((S, x)=>S-x);
  return{
    technique:"No Supported Step", techniqueLevel:"expert", unsupported:!0, description:w===0?`R${f+1}C${m+1} has no candidates`:"No supported logical strategy found", explanation:w===0?`The current grid has a contradiction: R${f+1}C${m+1} has no legal candidates. Check the givens and recent entries before continuing.`:`The engine checked its implemented logical strategies and did not find a supported next step. The most constrained empty cell is R${f+1}C${m+1} with candidates {${N.join(", ")}}, but no guessing step is being recommended.`, targetCells:[u], highlightCells:[], eliminationCells:[]
  }

}
function ld(y, k){
  return null
}
function id(y, k){
  let u=null, w=1/0;
  for(let S=0;
  S<9;
  S++)for(let x=0;
  x<9;
  x++){
    if(y[S][x]!==null)continue;
    const E=k[S][x].size;
    E>0&&E<w&&(w=E, u=[S, x])
  }
  if(!u)return null;
  const[f, m]=u, N=[...k[f][m]];
  return{
    technique:"Trial & Error", techniqueLevel:"expert", description:`Try ${N.join(" or ")} in R${f+1}C${m+1}`, explanation:`No straightforward logical technique applies at this stage. The cell R${f+1}C${m+1} has ${w} candidate(s): {${N.join(", ")}}. This is the most constrained empty cell. Advanced puzzles occasionally require assuming a value and testing if it leads to a contradiction — a technique called "bifurcation" or hypothetical reasoning.`, targetCells:[[f, m]], highlightCells:[], value:void 0
  }

}
function od(){
  const[y, k]=xe.useState(()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  return xe.useEffect(()=>{
    document.documentElement.setAttribute("data-theme", y)
  }, [y]), {
    theme:y, toggle:()=>k(u=>u==="dark"?"light":"dark")
  }

}
function ud(y, k, u, w){
  if(k[u][w]!==null)return"given";
  if(y[u][w]===null)return"empty";
  const f=y[u][w], m=In(y);
  return m[u][w]=null, Hl(m, u, w, f)?"filled":"error"
}
function vd(y){
  for(let k=0;
  k<9;
  k++){
    const u=new Set, w=new Set;
    for(let f=0;
    f<9;
    f++){
      const m=y[k][f], N=y[f][k];
      if(m!==null){
        if(u.has(m))return null;
        u.add(m)
      }
      if(N!==null){
        if(w.has(N))return null;
        w.add(N)
      }

    }

  }
  for(let k=0;
  k<9;
  k++){
    const u=new Set, w=Math.floor(k/3)*3, f=k%3*3;
    for(let m=w;
    m<w+3;
    m++)for(let N=f;
    N<f+3;
    N++){
      const S=y[m][N];
      if(S!==null){
        if(u.has(S))return null;
        u.add(S)
      }

    }

  }
  const k=In(y);
  function u(w){
    if(w===81)return!0;
    const f=Math.floor(w/9), m=w%9;
    if(k[f][m]!==null)return u(w+1);
    for(let N=1;
    N<=9;
    N++)if(Hl(k, f, m, N)){
      k[f][m]=N;
      if(u(w+1))return!0;
      k[f][m]=null
    }
    return!1
  }
  return u(0)?k:null
}
const Oo={
  basic:"var(--color-success)", intermediate:"var(--color-blue)", advanced:"var(--color-orange)", expert:"var(--color-error)"
}, sd={
  basic:"Basic", intermediate:"Intermediate", advanced:"Advanced", expert:"Expert"
};
function ad(){
  const{
    theme:y, toggle:k
  }
  =od(), [u, w]=xe.useState(()=>Array.from({
    length:9
  }, ()=>Array(9).fill(null))), [f, m]=xe.useState(()=>Array.from({
    length:9
  }, ()=>Array(9).fill(null))), [N, S]=xe.useState(null), [x, E]=xe.useState(()=>Array.from({
    length:9
  }, ()=>Array.from({
    length:9
  }, ()=>new Set))), [C, L]=xe.useState(null), [R, V]=xe.useState(null), [Z, K]=xe.useState(!1), [F, te]=xe.useState("medium"), [se, ae]=xe.useState(!1), [re, he]=xe.useState([]), [fe, Ne]=xe.useState(!1), [_e, mt]=xe.useState(!0), [$e, vt]=xe.useState("idle"), [Be, Oe]=xe.useState(0), Ve=xe.useRef(null), Ze=xe.useCallback(()=>{
    ae(!0), L(null), he([]), Oe(0), V(null), setTimeout(()=>{
      const{
        puzzle:$, solution:M
      }
      =Xf(F);
      w(In($)), m(In($)), S(M), E(Oa($)), vt("playing"), ae(!1)
    }, 50)
  }, [F]), Te=xe.useCallback($=>{
    E(Oa($))
  }, []), Re=xe.useCallback($=>{
    const M=In($), Y=vd(M), B=Oa(M), ee=qf(M, B);
    return w(M), m(In(M)), S(Y), E(B), L(ee), V(null), he(ee&&!ee.unsupported?[ee]:[]), Oe(ee&&!ee.unsupported?1:0), vt("playing"), ae(!1), ee&&setTimeout(()=>{
      Ve.current?.scrollIntoView({
        behavior:"smooth", block:"nearest"
      })
    }, 100), ee
  }, []), Ie=xe.useCallback(($, M)=>{
    const Y=qf($, M);
    return L(Y), Y&&!Y.unsupported&&(Oe(B=>B+1), he(B=>[Y, ...B].slice(0, 20))), Y&&setTimeout(()=>{
      Ve.current?.scrollIntoView({
        behavior:"smooth", block:"nearest"
      })
    }, 100), Y
  }, []), me=xe.useCallback(()=>{
    if($e!=="playing")return;
    Ie(u, x)
  }, [u, x, $e, Ie]), D=xe.useCallback(($, M, Y)=>{
    if(f[$][M]!==null)return;
    const B=In(u);
    if(B[$][M]=Y, w(B), Te(B), L(null), Hf(B)){
      let ee=!0;
      if(N){
        for(let le=0;
        le<9;
        le++)for(let we=0;
        we<9;
        we++)if(B[le][we]!==N[le][we]){
          ee=!1;
          break
        }

      }
      ee&&vt("complete")
    }

  }, [u, f, N, Te]), je=xe.useCallback(()=>{
    if(!C||C.unsupported)return;
    let $=u, M=x.map(Y=>Y.map(B=>new Set(B)));
    if(C.value!==void 0&&C.targetCells.length>0){
      const[Y, B]=C.targetCells[0];
      if(f[Y][B]!==null)return;
      $=In(u), $[Y][B]=C.value, M[Y][B]=new Set;
      for(const[ee, le]of Ul(Y, B))M[ee][le].delete(C.value);
      if(w($), Hf($)){
        let ee=!0;
        if(N)for(let le=0;
        le<9;
        le++)for(let we=0;
        we<9;
        we++)if($[le][we]!==N[le][we]){
          ee=!1;
          break
        }
        if(ee){
          E(M), L(null), vt("complete");
          return
        }
      }
    }
    for(const{
      row:Y, col:B, digit:ee
    }
    of C.eliminationCells??[])M[Y][B].delete(ee);
    E(M), Ie($, M)
  }, [C, u, x, f, N, Ie]);
  xe.useEffect(()=>{
    window.SudoHint={
      ...(window.SudoHint||{

      }), loadPuzzle:Re
    }

  }, [Re]);
  xe.useEffect(()=>{
    const $=M=>{
      if(!R)return;
      const[Y, B]=R;
      f[Y][B]===null&&(M.key>="1"&&M.key<="9"?D(Y, B, parseInt(M.key)):M.key==="Backspace"||M.key==="Delete"||M.key==="0"?D(Y, B, null):M.key==="ArrowUp"&&Y>0?V([Y-1, B]):M.key==="ArrowDown"&&Y<8?V([Y+1, B]):M.key==="ArrowLeft"&&B>0?V([Y, B-1]):M.key==="ArrowRight"&&B<8&&V([Y, B+1]))
    };
    return window.addEventListener("keydown", $), ()=>window.removeEventListener("keydown", $)
  }, [R, f, D]);
  const Q=new Set((C?.targetCells??[]).map(([$, M])=>`${$},${M}`)), I=new Set((C?.highlightCells??[]).map(([$, M])=>`${$},${M}`)), d=new Set((C?.eliminationCells??[]).map(({
    row:$, col:M
  })=>`${$},${M}`)), _=new Map;
  for(const{
    row:$, col:M, digit:Y
  }
  of C?.eliminationCells??[]){
    const B=`${$},${M}`;
    _.has(B)||_.set(B, new Set), _.get(B).add(Y)
  }
  const J=new Set, b=new Set;
  if(R){
    const[$, M]=R, Y=u[$][M];
    for(let le=0;
    le<9;
    le++)J.add(`${$},${le}`), J.add(`${le},${M}`);
    const B=Math.floor($/3)*3, ee=Math.floor(M/3)*3;
    for(let le=B;
    le<B+3;
    le++)for(let we=ee;
    we<ee+3;
    we++)J.add(`${le},${we}`);
    if(Y!==null)for(let le=0;
    le<9;
    le++)for(let we=0;
    we<9;
    we++)u[le][we]===Y&&b.add(`${le},${we}`)
  }
  return u.every($=>$.every(M=>M===null)), g.jsxs("div", {
    className:"app-root", children:[g.jsxs("header", {
      className:"app-header", children:[g.jsxs("div", {
        className:"header-left", children:[g.jsxs("svg", {
          className:"logo", viewBox:"0 0 32 32", fill:"none", "aria-label":"Sudoku Hint", xmlns:"http://www.w3.org/2000/svg", children:[g.jsx("rect", {
            x:"2", y:"2", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
          }), g.jsx("rect", {
            x:"12", y:"2", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
          }), g.jsx("rect", {
            x:"22", y:"2", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5", fill:"currentColor", fillOpacity:"0.15"
          }), g.jsx("rect", {
            x:"2", y:"12", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
          }), g.jsx("rect", {
            x:"12", y:"12", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5", fill:"currentColor", fillOpacity:"0.15"
          }), g.jsx("rect", {
            x:"22", y:"12", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
          }), g.jsx("rect", {
            x:"2", y:"22", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5", fill:"currentColor", fillOpacity:"0.15"
          }), g.jsx("rect", {
            x:"12", y:"22", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
          }), g.jsx("rect", {
            x:"22", y:"22", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
          })]
        }), g.jsx("span", {
          className:"app-title", children:"SudoHint"
        })]
      }), g.jsx("div", {
        className:"header-right", children:g.jsx("button", {
          className:"icon-btn", onClick:k, "aria-label":"Toggle theme", "data-testid":"theme-toggle", children:y==="dark"?g.jsxs("svg", {
            width:"18", height:"18", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:[g.jsx("circle", {
              cx:"12", cy:"12", r:"5"
            }), g.jsx("path", {
              d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            })]
          }):g.jsx("svg", {
            width:"18", height:"18", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:g.jsx("path", {
              d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            })
          })
        })
      })]
    }), g.jsxs("main", {
      className:"app-main", children:[g.jsxs("div", {
        className:"left-col", children:[g.jsxs("div", {
          className:"controls-bar", children:[g.jsx("div", {
            className:"difficulty-selector", children:["medium", "hard"].map($=>g.jsx("button", {
              className:`diff-btn ${F===$?"active":""}`, onClick:()=>te($), "data-testid":`diff-${$}`, children:$==="medium"?"Medium":"Hard"
            }, $))
          }), g.jsx("button", {
            className:"btn btn-primary generate-btn", onClick:Ze, disabled:se, "data-testid":"generate-btn", children:se?g.jsx("span", {
              className:"spinner"
            }):g.jsxs(g.Fragment, {
              children:[g.jsxs("svg", {
                width:"15", height:"15", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2.2", children:[g.jsx("polyline", {
                  points:"1 4 1 10 7 10"
                }), g.jsx("path", {
                  d:"M3.51 15a9 9 0 1 0 .49-3.5"
                })]
              }), "New Puzzle"]
            })
          })]
        }), $e==="playing"&&g.jsxs("div", {
          className:"hint-controls", children:[g.jsxs("button", {
            className:"btn btn-hint", onClick:me, "data-testid":"hint-btn", children:[g.jsxs("svg", {
              width:"15", height:"15", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:[g.jsx("circle", {
                cx:"12", cy:"12", r:"10"
              }), g.jsx("path", {
                d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
              }), g.jsx("line", {
                x1:"12", y1:"17", x2:"12.01", y2:"17", strokeWidth:"3", strokeLinecap:"round"
              })]
            }), "Get Hint", Be>0&&g.jsx("span", {
              className:"hint-badge", children:Be
            })]
          }), g.jsxs("button", {
            className:`toggle-btn ${Z?"active":""}`, onClick:()=>K($=>!$), "data-testid":"toggle-candidates", children:[g.jsxs("svg", {
              width:"13", height:"13", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:[g.jsx("circle", {
                cx:"12", cy:"12", r:"3"
              }), g.jsx("path", {
                d:"M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"
              })]
            }), "Pencil Marks"]
          }), g.jsxs("button", {
            className:`toggle-btn ${_e?"active":""}`, onClick:()=>mt($=>!$), children:[g.jsxs("svg", {
              width:"13", height:"13", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:[g.jsx("path", {
                d:"M12 20h9"
              }), g.jsx("path", {
                d:"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              })]
            }), "Highlights"]
          })]
        }), g.jsxs("div", {
          className:`sudoku-wrapper ${$e==="complete"?"complete":""}`, "data-testid":"sudoku-grid", children:[$e==="idle"?g.jsx("div", {
            className:"grid-placeholder", children:g.jsxs("div", {
              className:"placeholder-inner", children:[g.jsxs("svg", {
                width:"48", height:"48", viewBox:"0 0 32 32", fill:"none", xmlns:"http://www.w3.org/2000/svg", opacity:"0.3", children:[g.jsx("rect", {
                  x:"2", y:"2", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"12", y:"2", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"22", y:"2", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"2", y:"12", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"12", y:"12", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"22", y:"12", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"2", y:"22", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"12", y:"22", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                }), g.jsx("rect", {
                  x:"22", y:"22", width:"8", height:"8", rx:"1.5", stroke:"currentColor", strokeWidth:"1.5"
                })]
              }), g.jsx("p", {
                children:"Select a difficulty and generate a puzzle"
              })]
            })
          }):g.jsx("div", {
            className:"sudoku-grid", children:u.map(($, M)=>$.map((Y, B)=>{
              const ee=`${M},${B}`, le=ud(u, f, M, B), we=R?.[0]===M&&R?.[1]===B, Wn=_e&&Q.has(ee), pn=_e&&I.has(ee)&&!Q.has(ee), Un=_e&&d.has(ee)&&!Q.has(ee), Pr=!C&&_e&&J.has(ee)&&!we, $r=!C&&_e&&b.has(ee)&&!we, Bn=Math.floor(M/3), zr=Math.floor(B/3), An=(Bn+zr)%2===0, Ct=x[M][B], Lt=_.get(ee);
              return g.jsx("div", {
                className:["sudoku-cell", `state-${le}`, An?"box-even":"box-odd", we?"selected":"", Wn?"hint-target":"", pn?"hint-highlight":"", Un?"hint-elim":"", Pr?"sel-highlight":"", $r?"same-digit":"", `cell-${M}-${B}`].filter(Boolean).join(" "), onClick:()=>V([M, B]), "data-testid":`cell-${M}-${B}`, children:Y!==null?g.jsx("span", {
                  className:"cell-value", children:Y
                }):Z&&Ct.size>0?g.jsx("div", {
                  className:"candidates-grid", children:[1, 2, 3, 4, 5, 6, 7, 8, 9].map(gt=>g.jsx("span", {
                    className:["candidate", Ct.has(gt)?"visible":"", Lt?.has(gt)?"elim-candidate":"", C?.value===gt&&Wn?"hint-candidate":""].filter(Boolean).join(" "), children:Ct.has(gt)?gt:""
                  }, gt))
                }):null
              }, ee)
            }))
          }), $e==="complete"&&g.jsx("div", {
            className:"complete-overlay", children:g.jsxs("div", {
              className:"complete-content", children:[g.jsxs("svg", {
                width:"40", height:"40", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:[g.jsx("path", {
                  d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"
                }), g.jsx("polyline", {
                  points:"22 4 12 14.01 9 11.01"
                })]
              }), g.jsx("h2", {
                children:"Solved!"
              }), g.jsxs("p", {
                children:["Used ", Be, " hint", Be!==1?"s":""]
              }), g.jsx("button", {
                className:"btn btn-primary", onClick:Ze, children:"New Puzzle"
              })]
            })
          })]
        }), $e==="playing"&&R&&f[R[0]][R[1]]===null&&g.jsxs("div", {
          className:"numpad", children:[[1, 2, 3, 4, 5, 6, 7, 8, 9].map($=>g.jsx("button", {
            className:"numpad-btn", onClick:()=>D(R[0], R[1], $), "data-testid":`numpad-${$}`, children:$
          }, $)), g.jsx("button", {
            className:"numpad-btn numpad-clear", onClick:()=>D(R[0], R[1], null), "data-testid":"numpad-clear", children:"✕"
          })]
        })]
      }), g.jsxs("div", {
        className:"right-col", ref:Ve, children:[C?g.jsxs("div", {
          className:`hint-panel level-${C.techniqueLevel}`, children:[g.jsxs("div", {
            className:"hint-header", children:[g.jsxs("div", {
              className:"hint-title-row", children:[g.jsx("span", {
                className:"level-badge", style:{
                  background:Oo[C.techniqueLevel]
                }, children:sd[C.techniqueLevel]
              }), g.jsx("h2", {
                className:"hint-technique", children:C.technique
              })]
            }), g.jsx("p", {
              className:"hint-description", children:C.description
            })]
          }), g.jsxs("div", {
            className:"hint-body", children:[g.jsx("p", {
              className:"hint-explanation", children:C.explanation
            }), C.value!==void 0&&g.jsxs("div", {
              className:"hint-action", children:[g.jsx("span", {
                children:"Place "
              }), g.jsx("span", {
                className:"hint-digit", children:C.value
              }), g.jsxs("span", {
                children:[" in R", C.targetCells[0][0]+1, "C", C.targetCells[0][1]+1]
              })]
            }), (C.eliminationCells?.length??0)>0&&g.jsxs("div", {
              className:"hint-action elim-action", children:[g.jsxs("svg", {
                width:"13", height:"13", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2.5", children:[g.jsx("line", {
                  x1:"18", y1:"6", x2:"6", y2:"18"
                }), g.jsx("line", {
                  x1:"6", y1:"6", x2:"18", y2:"18"
                })]
              }), g.jsxs("span", {
                children:["Eliminate ", [...new Set(C.eliminationCells.map($=>$.digit))].join(", "), " from ", C.eliminationCells.length, " cell", C.eliminationCells.length>1?"s":""]
              })]
            })]
          }), g.jsxs("div", {
            className:"hint-legend", children:[C.targetCells.length>0&&g.jsxs("div", {
              className:"legend-item", children:[g.jsx("span", {
                className:"legend-dot target-dot"
              }), g.jsxs("span", {
                children:["Target cell", C.targetCells.length>1?"s":""]
              })]
            }), C.highlightCells.length>0&&!C.targetCells.every(([$, M])=>C.highlightCells.some(([Y, B])=>Y===$&&B===M))&&g.jsxs("div", {
              className:"legend-item", children:[g.jsx("span", {
                className:"legend-dot cause-dot"
              }), g.jsx("span", {
                children:"Cause cells"
              })]
            }), (C.eliminationCells?.length??0)>0&&g.jsxs("div", {
              className:"legend-item", children:[g.jsx("span", {
                className:"legend-dot elim-dot"
              }), g.jsx("span", {
                children:"Elimination cells"
              })]
            })]
          }), g.jsxs("div", {
            className:"hint-buttons", children:[!C.unsupported&&g.jsx("button", {
              className:"apply-next-btn", onClick:je, children:"Apply & Next"
            }), g.jsx("button", {
              className:"dismiss-btn", onClick:()=>L(null), children:"Dismiss"
            })]
          })]
        }):g.jsx("div", {
          className:"hint-empty", children:$e==="idle"?g.jsxs(g.Fragment, {
            children:[g.jsx("div", {
              className:"hint-empty-icon", children:g.jsxs("svg", {
                width:"32", height:"32", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", children:[g.jsx("circle", {
                  cx:"12", cy:"12", r:"10"
                }), g.jsx("path", {
                  d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                }), g.jsx("line", {
                  x1:"12", y1:"17", x2:"12.01", y2:"17", strokeWidth:"3", strokeLinecap:"round"
                })]
              })
            }), g.jsx("p", {
              className:"hint-empty-title", children:"How It Works"
            }), g.jsx("p", {
              className:"hint-empty-text", children:'Generate a puzzle, then tap "Get Hint" to see which technique to apply next — with a full explanation of the logic.'
            })]
          }):g.jsxs(g.Fragment, {
            children:[g.jsx("div", {
              className:"hint-empty-icon", children:g.jsxs("svg", {
                width:"32", height:"32", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", children:[g.jsx("circle", {
                  cx:"12", cy:"12", r:"10"
                }), g.jsx("path", {
                  d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                }), g.jsx("line", {
                  x1:"12", y1:"17", x2:"12.01", y2:"17", strokeWidth:"3", strokeLinecap:"round"
                })]
              })
            }), g.jsx("p", {
              className:"hint-empty-title", children:"Need a push?"
            }), g.jsx("p", {
              className:"hint-empty-text", children:'Click "Get Hint" and the engine will analyze the puzzle and show the next logical step with a full explanation.'
            })]
          })
        }), g.jsxs("div", {
          className:"technique-ref", children:[g.jsx("h3", {
            className:"ref-title", children:"Technique Hierarchy"
          }), g.jsx("div", {
            className:"technique-list", children:[{
              name:"Naked Single", level:"basic", desc:"One candidate left in a cell"
            }, {
              name:"Hidden Single", level:"basic", desc:"Digit has one valid cell in a unit"
            }, {
              name:"Naked Pair", level:"intermediate", desc:"Two cells share same two candidates"
            }, {
              name:"Naked Triple", level:"intermediate", desc:"Three cells share same three candidates"
            }, {
              name:"Naked Quad", level:"intermediate", desc:"Four cells contain four candidates"
            }, {
              name:"Hidden Pair", level:"intermediate", desc:"Two digits confined to two cells"
            }, {
              name:"Hidden Triple", level:"intermediate", desc:"Three digits confined to three cells"
            }, {
              name:"Hidden Quad", level:"intermediate", desc:"Four digits confined to four cells"
            }, {
              name:"Pointing Pair", level:"intermediate", desc:"Box digit aligns to one row/col"
            }, {
              name:"Box-Line Reduction", level:"intermediate", desc:"Row/col digit confined to one box"
            }, {
              name:"X-Wing", level:"advanced", desc:"Rectangle pattern eliminates candidates"
            }, {
              name:"Finned X-Wing", level:"advanced", desc:"X-Wing with fin-based eliminations"
            }, {
              name:"Swordfish", level:"advanced", desc:"3-line fish pattern"
            }, {
              name:"Jellyfish", level:"advanced", desc:"4-line fish pattern"
            }, {
              name:"Skyscraper", level:"advanced", desc:"Two strong links share a base"
            }, {
              name:"Two-String Kite", level:"advanced", desc:"Row and column links meet in a box"
            }, {
              name:"Simple Coloring", level:"expert", desc:"Conjugate chains prove eliminations"
            }, {
              name:"W-Wing", level:"expert", desc:"Matching bivalue wings use a strong link"
            }, {
              name:"XY-Wing", level:"expert", desc:"Three bi-value cells form elimination chain"
            }, {
              name:"XYZ-Wing", level:"expert", desc:"Three cells share a common elimination"
            }, {
              name:"XY-Chain", level:"expert", desc:"Linked bi-value cells force an elimination"
            }, {
              name:"Unique Rectangle", level:"expert", desc:"Uniqueness pattern avoids deadly rectangles"
            }].map($=>g.jsxs("div", {
              className:`ref-item ${C?.technique===$.name?"active-ref":""}`, children:[g.jsxs("div", {
                className:"ref-item-header", children:[g.jsx("span", {
                  className:"ref-dot", style:{
                    background:Oo[$.level]
                  }

                }), g.jsx("span", {
                  className:"ref-name", children:$.name
                })]
              }), g.jsx("span", {
                className:"ref-desc", children:$.desc
              })]
            }, $.name))
          })]
        }), re.length>0&&g.jsxs("div", {
          className:"hint-history", children:[g.jsxs("button", {
            className:"history-toggle", onClick:()=>Ne($=>!$), children:[g.jsx("svg", {
              width:"13", height:"13", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", children:g.jsx("polyline", {
                points:fe?"18 15 12 9 6 15":"6 9 12 15 18 9"
              })
            }), "Hint History (", re.length, ")"]
          }), fe&&g.jsx("div", {
            className:"history-list", children:re.map(($, M)=>g.jsxs("div", {
              className:"history-item", onClick:()=>L($), children:[g.jsx("span", {
                className:"history-dot", style:{
                  background:Oo[$.techniqueLevel]
                }

              }), g.jsxs("div", {
                children:[g.jsx("span", {
                  className:"history-technique", children:$.technique
                }), g.jsx("span", {
                  className:"history-desc", children:$.description
                })]
              })]
            }, M))
          })]
        })]
      })]
    })]
  })
}
var Wl={

}, Fo={
  exports:{

  }

}, Ge={

}, Io={
  exports:{

  }

}, Wo={

};
var Fa;
function cd(){
  return Fa||(Fa=1, (function(y){
    function k(D, Q){
      var I=D.length;
      D.push(Q);
      e:for(;
      0<I;
      ){
        var d=I-1>>>1, _=D[d];
        if(0<f(_, Q))D[d]=Q, D[I]=_, I=d;
        else break e
      }

    }
    function u(D){
      return D.length===0?null:D[0]
    }
    function w(D){
      if(D.length===0)return null;
      var Q=D[0], I=D.pop();
      if(I!==Q){
        D[0]=I;
        e:for(var d=0, _=D.length, J=_>>>1;
        d<J;
        ){
          var b=2*(d+1)-1, $=D[b], M=b+1, Y=D[M];
          if(0>f($, I))M<_&&0>f(Y, $)?(D[d]=Y, D[M]=I, d=M):(D[d]=$, D[b]=I, d=b);
          else if(M<_&&0>f(Y, I))D[d]=Y, D[M]=I, d=M;
          else break e
        }

      }
      return Q
    }
    function f(D, Q){
      var I=D.sortIndex-Q.sortIndex;
      return I!==0?I:D.id-Q.id
    }
    if(typeof performance=="object"&&typeof performance.now=="function"){
      var m=performance;
      y.unstable_now=function(){
        return m.now()
      }

    }
    else{
      var N=Date, S=N.now();
      y.unstable_now=function(){
        return N.now()-S
      }

    }
    var x=[], E=[], C=1, L=null, R=3, V=!1, Z=!1, K=!1, F=typeof setTimeout=="function"?setTimeout:null, te=typeof clearTimeout=="function"?clearTimeout:null, se=typeof setImmediate<"u"?setImmediate:null;
    typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ae(D){
      for(var Q=u(E);
      Q!==null;
      ){
        if(Q.callback===null)w(E);
        else if(Q.startTime<=D)w(E), Q.sortIndex=Q.expirationTime, k(x, Q);
        else break;
        Q=u(E)
      }

    }
    function re(D){
      if(K=!1, ae(D), !Z)if(u(x)!==null)Z=!0, Te(he);
      else{
        var Q=u(E);
        Q!==null&&me(re, Q.startTime-D)
      }

    }
    function he(D, Q){
      Z=!1, K&&(K=!1, te(_e), _e=-1), V=!0;
      var I=R;
      try{
        for(ae(Q), L=u(x);
        L!==null&&(!(L.expirationTime>Q)||D&&!vt());
        ){
          var d=L.callback;
          if(typeof d=="function"){
            L.callback=null, R=L.priorityLevel;
            var _=d(L.expirationTime<=Q);
            Q=y.unstable_now(), typeof _=="function"?L.callback=_:L===u(x)&&w(x), ae(Q)
          }
          else w(x);
          L=u(x)
        }
        if(L!==null)var J=!0;
        else{
          var b=u(E);
          b!==null&&me(re, b.startTime-Q), J=!1
        }
        return J
      }
      finally{
        L=null, R=I, V=!1
      }

    }
    var fe=!1, Ne=null, _e=-1, mt=5, $e=-1;
    function vt(){
      return!(y.unstable_now()-$e<mt)
    }
    function Be(){
      if(Ne!==null){
        var D=y.unstable_now();
        $e=D;
        var Q=!0;
        try{
          Q=Ne(!0, D)
        }
        finally{
          Q?Oe():(fe=!1, Ne=null)
        }

      }
      else fe=!1
    }
    var Oe;
    if(typeof se=="function")Oe=function(){
      se(Be)
    };
    else if(typeof MessageChannel<"u"){
      var Ve=new MessageChannel, Ze=Ve.port2;
      Ve.port1.onmessage=Be, Oe=function(){
        Ze.postMessage(null)
      }

    }
    else Oe=function(){
      F(Be, 0)
    };
    function Te(D){
      Ne=D, fe||(fe=!0, Oe())
    }
    function me(D, Q){
      _e=F(function(){
        D(y.unstable_now())
      }, Q)
    }
    y.unstable_IdlePriority=5, y.unstable_ImmediatePriority=1, y.unstable_LowPriority=4, y.unstable_NormalPriority=3, y.unstable_Profiling=null, y.unstable_UserBlockingPriority=2, y.unstable_cancelCallback=function(D){
      D.callback=null
    }, y.unstable_continueExecution=function(){
      Z||V||(Z=!0, Te(he))
    }, y.unstable_forceFrameRate=function(D){
      0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):mt=0<D?Math.floor(1e3/D):5
    }, y.unstable_getCurrentPriorityLevel=function(){
      return R
    }, y.unstable_getFirstCallbackNode=function(){
      return u(x)
    }, y.unstable_next=function(D){
      switch(R){
        case 1:case 2:case 3:var Q=3;
        break;
        default:Q=R
      }
      var I=R;
      R=Q;
      try{
        return D()
      }
      finally{
        R=I
      }

    }, y.unstable_pauseExecution=function(){

    }, y.unstable_requestPaint=function(){

    }, y.unstable_runWithPriority=function(D, Q){
      switch(D){
        case 1:case 2:case 3:case 4:case 5:break;
        default:D=3
      }
      var I=R;
      R=D;
      try{
        return Q()
      }
      finally{
        R=I
      }

    }, y.unstable_scheduleCallback=function(D, Q, I){
      var d=y.unstable_now();
      switch(typeof I=="object"&&I!==null?(I=I.delay, I=typeof I=="number"&&0<I?d+I:d):I=d, D){
        case 1:var _=-1;
        break;
        case 2:_=250;
        break;
        case 5:_=1073741823;
        break;
        case 4:_=1e4;
        break;
        default:_=5e3
      }
      return _=I+_, D={
        id:C++, callback:Q, priorityLevel:D, startTime:I, expirationTime:_, sortIndex:-1
      }, I>d?(D.sortIndex=I, k(E, D), u(x)===null&&D===u(E)&&(K?(te(_e), _e=-1):K=!0, me(re, I-d))):(D.sortIndex=_, k(x, D), Z||V||(Z=!0, Te(he))), D
    }, y.unstable_shouldYield=vt, y.unstable_wrapCallback=function(D){
      var Q=R;
      return function(){
        var I=R;
        R=Q;
        try{
          return D.apply(this, arguments)
        }
        finally{
          R=I
        }

      }

    }

  })(Wo)), Wo
}
var Ia;
function fd(){
  return Ia||(Ia=1, Io.exports=cd()), Io.exports
}
var Wa;
function dd(){
  if(Wa)return Ge;
  Wa=1;
  var y=Uo(), k=fd();
  function u(e){
    for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e, n=1;
    n<arguments.length;
    n++)t+="&args[]="+encodeURIComponent(arguments[n]);
    return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  }
  var w=new Set, f={

  };
  function m(e, t){
    N(e, t), N(e+"Capture", t)
  }
  function N(e, t){
    for(f[e]=t, e=0;
    e<t.length;
    e++)w.add(t[e])
  }
  var S=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"), x=Object.prototype.hasOwnProperty, E=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, C={

  }, L={

  };
  function R(e){
    return x.call(L, e)?!0:x.call(C, e)?!1:E.test(e)?L[e]=!0:(C[e]=!0, !1)
  }
  function V(e, t, n, r){
    if(n!==null&&n.type===0)return!1;
    switch(typeof t){
      case"function":case"symbol":return!0;
      case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0, 5), e!=="data-"&&e!=="aria-");
      default:return!1
    }

  }
  function Z(e, t, n, r){
    if(t===null||typeof t>"u"||V(e, t, n, r))return!0;
    if(r)return!1;
    if(n!==null)switch(n.type){
      case 3:return!t;
      case 4:return t===!1;
      case 5:return isNaN(t);
      case 6:return isNaN(t)||1>t
    }
    return!1
  }
  function K(e, t, n, r, l, i, o){
    this.acceptsBooleans=t===2||t===3||t===4, this.attributeName=r, this.attributeNamespace=l, this.mustUseProperty=n, this.propertyName=e, this.type=t, this.sanitizeURL=i, this.removeEmptyString=o
  }
  var F={

  };
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){
    F[e]=new K(e, 0, !1, e, null, !1, !1)
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e){
    var t=e[0];
    F[t]=new K(t, 1, !1, e[1], null, !1, !1)
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e){
    F[e]=new K(e, 2, !1, e.toLowerCase(), null, !1, !1)
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e){
    F[e]=new K(e, 2, !1, e, null, !1, !1)
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){
    F[e]=new K(e, 3, !1, e.toLowerCase(), null, !1, !1)
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e){
    F[e]=new K(e, 3, !0, e, null, !1, !1)
  }), ["capture", "download"].forEach(function(e){
    F[e]=new K(e, 4, !1, e, null, !1, !1)
  }), ["cols", "rows", "size", "span"].forEach(function(e){
    F[e]=new K(e, 6, !1, e, null, !1, !1)
  }), ["rowSpan", "start"].forEach(function(e){
    F[e]=new K(e, 5, !1, e.toLowerCase(), null, !1, !1)
  });
  var te=/[\-:]([a-z])/g;
  function se(e){
    return e[1].toUpperCase()
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){
    var t=e.replace(te, se);
    F[t]=new K(t, 1, !1, e, null, !1, !1)
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){
    var t=e.replace(te, se);
    F[t]=new K(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e){
    var t=e.replace(te, se);
    F[t]=new K(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
  }), ["tabIndex", "crossOrigin"].forEach(function(e){
    F[e]=new K(e, 1, !1, e.toLowerCase(), null, !1, !1)
  }), F.xlinkHref=new K("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e){
    F[e]=new K(e, 1, !1, e.toLowerCase(), null, !0, !0)
  });
  function ae(e, t, n, r){
    var l=F.hasOwnProperty(t)?F[t]:null;
    (l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Z(t, n, l, r)&&(n=null), r||l===null?R(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t, ""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName, r=l.attributeNamespace, n===null?e.removeAttribute(t):(l=l.type, n=l===3||l===4&&n===!0?"":""+n, r?e.setAttributeNS(r, t, n):e.setAttribute(t, n))))
  }
  var re=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, he=Symbol.for("react.element"), fe=Symbol.for("react.portal"), Ne=Symbol.for("react.fragment"), _e=Symbol.for("react.strict_mode"), mt=Symbol.for("react.profiler"), $e=Symbol.for("react.provider"), vt=Symbol.for("react.context"), Be=Symbol.for("react.forward_ref"), Oe=Symbol.for("react.suspense"), Ve=Symbol.for("react.suspense_list"), Ze=Symbol.for("react.memo"), Te=Symbol.for("react.lazy"), me=Symbol.for("react.offscreen"), D=Symbol.iterator;
  function Q(e){
    return e===null||typeof e!="object"?null:(e=D&&e[D]||e["@@iterator"], typeof e=="function"?e:null)
  }
  var I=Object.assign, d;
  function _(e){
    if(d===void 0)try{
      throw Error()
    }
    catch(n){
      var t=n.stack.trim().match(/\n( *(at )?)/);
      d=t&&t[1]||""
    }
    return`
`+d+e
  }
  var J=!1;
  function b(e, t){
    if(!e||J)return"";
    J=!0;
    var n=Error.prepareStackTrace;
    Error.prepareStackTrace=void 0;
    try{
      if(t)if(t=function(){
        throw Error()
      }, Object.defineProperty(t.prototype, "props", {
        set:function(){
          throw Error()
        }

      }), typeof Reflect=="object"&&Reflect.construct){
        try{
          Reflect.construct(t, [])
        }
        catch(v){
          var r=v
        }
        Reflect.construct(e, [], t)
      }
      else{
        try{
          t.call()
        }
        catch(v){
          r=v
        }
        e.call(t.prototype)
      }
      else{
        try{
          throw Error()
        }
        catch(v){
          r=v
        }
        e()
      }

    }
    catch(v){
      if(v&&r&&typeof v.stack=="string"){
        for(var l=v.stack.split(`
`), i=r.stack.split(`
`), o=l.length-1, s=i.length-1;
        1<=o&&0<=s&&l[o]!==i[s];
        )s--;
        for(;
        1<=o&&0<=s;
        o--, s--)if(l[o]!==i[s]){
          if(o!==1||s!==1)do if(o--, s--, 0>s||l[o]!==i[s]){
            var a=`
`+l[o].replace(" at new ", " at ");
            return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>", e.displayName)), a
          }
          while(1<=o&&0<=s);
          break
        }

      }

    }
    finally{
      J=!1, Error.prepareStackTrace=n
    }
    return(e=e?e.displayName||e.name:"")?_(e):""
  }
  function $(e){
    switch(e.tag){
      case 5:return _(e.type);
      case 16:return _("Lazy");
      case 13:return _("Suspense");
      case 19:return _("SuspenseList");
      case 0:case 2:case 15:return e=b(e.type, !1), e;
      case 11:return e=b(e.type.render, !1), e;
      case 1:return e=b(e.type, !0), e;
      default:return""
    }

  }
  function M(e){
    if(e==null)return null;
    if(typeof e=="function")return e.displayName||e.name||null;
    if(typeof e=="string")return e;
    switch(e){
      case Ne:return"Fragment";
      case fe:return"Portal";
      case mt:return"Profiler";
      case _e:return"StrictMode";
      case Oe:return"Suspense";
      case Ve:return"SuspenseList"
    }
    if(typeof e=="object")switch(e.$$typeof){
      case vt:return(e.displayName||"Context")+".Consumer";
      case $e:return(e._context.displayName||"Context")+".Provider";
      case Be:var t=e.render;
      return e=e.displayName, e||(e=t.displayName||t.name||"", e=e!==""?"ForwardRef("+e+")":"ForwardRef"), e;
      case Ze:return t=e.displayName||null, t!==null?t:M(e.type)||"Memo";
      case Te:t=e._payload, e=e._init;
      try{
        return M(e(t))
      }
      catch{

      }

    }
    return null
  }
  function Y(e){
    var t=e.type;
    switch(e.tag){
      case 24:return"Cache";
      case 9:return(t.displayName||"Context")+".Consumer";
      case 10:return(t._context.displayName||"Context")+".Provider";
      case 18:return"DehydratedFragment";
      case 11:return e=t.render, e=e.displayName||e.name||"", t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");
      case 7:return"Fragment";
      case 5:return t;
      case 4:return"Portal";
      case 3:return"Root";
      case 6:return"Text";
      case 16:return M(t);
      case 8:return t===_e?"StrictMode":"Mode";
      case 22:return"Offscreen";
      case 12:return"Profiler";
      case 21:return"Scope";
      case 13:return"Suspense";
      case 19:return"SuspenseList";
      case 25:return"TracingMarker";
      case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;
      if(typeof t=="string")return t
    }
    return null
  }
  function B(e){
    switch(typeof e){
      case"boolean":case"number":case"string":case"undefined":return e;
      case"object":return e;
      default:return""
    }

  }
  function ee(e){
    var t=e.type;
    return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")
  }
  function le(e){
    var t=ee(e)?"checked":"value", n=Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r=""+e[t];
    if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){
      var l=n.get, i=n.set;
      return Object.defineProperty(e, t, {
        configurable:!0, get:function(){
          return l.call(this)
        }, set:function(o){
          r=""+o, i.call(this, o)
        }

      }), Object.defineProperty(e, t, {
        enumerable:n.enumerable
      }), {
        getValue:function(){
          return r
        }, setValue:function(o){
          r=""+o
        }, stopTracking:function(){
          e._valueTracker=null, delete e[t]
        }

      }

    }

  }
  function we(e){
    e._valueTracker||(e._valueTracker=le(e))
  }
  function Wn(e){
    if(!e)return!1;
    var t=e._valueTracker;
    if(!t)return!0;
    var n=t.getValue(), r="";
    return e&&(r=ee(e)?e.checked?"true":"false":e.value), e=r, e!==n?(t.setValue(e), !0):!1
  }
  function pn(e){
    if(e=e||(typeof document<"u"?document:void 0), typeof e>"u")return null;
    try{
      return e.activeElement||e.body
    }
    catch{
      return e.body
    }

  }
  function Un(e, t){
    var n=t.checked;
    return I({

    }, t, {
      defaultChecked:void 0, defaultValue:void 0, value:void 0, checked:n??e._wrapperState.initialChecked
    })
  }
  function Pr(e, t){
    var n=t.defaultValue==null?"":t.defaultValue, r=t.checked!=null?t.checked:t.defaultChecked;
    n=B(t.value!=null?t.value:n), e._wrapperState={
      initialChecked:r, initialValue:n, controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null
    }

  }
  function $r(e, t){
    t=t.checked, t!=null&&ae(e, "checked", t, !1)
  }
  function Bn(e, t){
    $r(e, t);
    var n=B(t.value), r=t.type;
    if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);
    else if(r==="submit"||r==="reset"){
      e.removeAttribute("value");
      return
    }
    t.hasOwnProperty("value")?An(e, t.type, n):t.hasOwnProperty("defaultValue")&&An(e, t.type, B(t.defaultValue)), t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)
  }
  function zr(e, t, n){
    if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){
      var r=t.type;
      if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;
      t=""+e._wrapperState.initialValue, n||t===e.value||(e.value=t), e.defaultValue=t
    }
    n=e.name, n!==""&&(e.name=""), e.defaultChecked=!!e._wrapperState.initialChecked, n!==""&&(e.name=n)
  }
  function An(e, t, n){
    (t!=="number"||pn(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))
  }
  var Ct=Array.isArray;
  function Lt(e, t, n, r){
    if(e=e.options, t){
      t={

      };
      for(var l=0;
      l<n.length;
      l++)t["$"+n[l]]=!0;
      for(n=0;
      n<e.length;
      n++)l=t.hasOwnProperty("$"+e[n].value), e[n].selected!==l&&(e[n].selected=l), l&&r&&(e[n].defaultSelected=!0)
    }
    else{
      for(n=""+B(n), t=null, l=0;
      l<e.length;
      l++){
        if(e[l].value===n){
          e[l].selected=!0, r&&(e[l].defaultSelected=!0);
          return
        }
        t!==null||e[l].disabled||(t=e[l])
      }
      t!==null&&(t.selected=!0)
    }

  }
  function gt(e, t){
    if(t.dangerouslySetInnerHTML!=null)throw Error(u(91));
    return I({

    }, t, {
      value:void 0, defaultValue:void 0, children:""+e._wrapperState.initialValue
    })
  }
  function Bo(e, t){
    var n=t.value;
    if(n==null){
      if(n=t.children, t=t.defaultValue, n!=null){
        if(t!=null)throw Error(u(92));
        if(Ct(n)){
          if(1<n.length)throw Error(u(93));
          n=n[0]
        }
        t=n
      }
      t==null&&(t=""), n=t
    }
    e._wrapperState={
      initialValue:B(n)
    }

  }
  function Ao(e, t){
    var n=B(t.value), r=B(t.defaultValue);
    n!=null&&(n=""+n, n!==e.value&&(e.value=n), t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)), r!=null&&(e.defaultValue=""+r)
  }
  function Ho(e){
    var t=e.textContent;
    t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)
  }
  function Vo(e){
    switch(e){
      case"svg":return"http://www.w3.org/2000/svg";
      case"math":return"http://www.w3.org/1998/Math/MathML";
      default:return"http://www.w3.org/1999/xhtml"
    }

  }
  function Vl(e, t){
    return e==null||e==="http://www.w3.org/1999/xhtml"?Vo(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e
  }
  var Rr, Qo=(function(e){
    return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t, n, r, l){
      MSApp.execUnsafeLocalFunction(function(){
        return e(t, n, r, l)
      })
    }:e
  })(function(e, t){
    if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;
    else{
      for(Rr=Rr||document.createElement("div"), Rr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>", t=Rr.firstChild;
      e.firstChild;
      )e.removeChild(e.firstChild);
      for(;
      t.firstChild;
      )e.appendChild(t.firstChild)
    }

  });
  function Hn(e, t){
    if(t){
      var n=e.firstChild;
      if(n&&n===e.lastChild&&n.nodeType===3){
        n.nodeValue=t;
        return
      }

    }
    e.textContent=t
  }
  var Vn={
    animationIterationCount:!0, aspectRatio:!0, borderImageOutset:!0, borderImageSlice:!0, borderImageWidth:!0, boxFlex:!0, boxFlexGroup:!0, boxOrdinalGroup:!0, columnCount:!0, columns:!0, flex:!0, flexGrow:!0, flexPositive:!0, flexShrink:!0, flexNegative:!0, flexOrder:!0, gridArea:!0, gridRow:!0, gridRowEnd:!0, gridRowSpan:!0, gridRowStart:!0, gridColumn:!0, gridColumnEnd:!0, gridColumnSpan:!0, gridColumnStart:!0, fontWeight:!0, lineClamp:!0, lineHeight:!0, opacity:!0, order:!0, orphans:!0, tabSize:!0, widows:!0, zIndex:!0, zoom:!0, fillOpacity:!0, floodOpacity:!0, stopOpacity:!0, strokeDasharray:!0, strokeDashoffset:!0, strokeMiterlimit:!0, strokeOpacity:!0, strokeWidth:!0
  }, Ha=["Webkit", "ms", "Moz", "O"];
  Object.keys(Vn).forEach(function(e){
    Ha.forEach(function(t){
      t=t+e.charAt(0).toUpperCase()+e.substring(1), Vn[t]=Vn[e]
    })
  });
  function Xo(e, t, n){
    return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Vn.hasOwnProperty(e)&&Vn[e]?(""+t).trim():t+"px"
  }
  function qo(e, t){
    e=e.style;
    for(var n in t)if(t.hasOwnProperty(n)){
      var r=n.indexOf("--")===0, l=Xo(n, t[n], r);
      n==="float"&&(n="cssFloat"), r?e.setProperty(n, l):e[n]=l
    }

  }
  var Va=I({
    menuitem:!0
  }, {
    area:!0, base:!0, br:!0, col:!0, embed:!0, hr:!0, img:!0, input:!0, keygen:!0, link:!0, meta:!0, param:!0, source:!0, track:!0, wbr:!0
  });
  function Ql(e, t){
    if(t){
      if(Va[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(u(137, e));
      if(t.dangerouslySetInnerHTML!=null){
        if(t.children!=null)throw Error(u(60));
        if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(u(61))
      }
      if(t.style!=null&&typeof t.style!="object")throw Error(u(62))
    }

  }
  function Xl(e, t){
    if(e.indexOf("-")===-1)return typeof t.is=="string";
    switch(e){
      case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;
      default:return!0
    }

  }
  var ql=null;
  function Kl(e){
    return e=e.target||e.srcElement||window, e.correspondingUseElement&&(e=e.correspondingUseElement), e.nodeType===3?e.parentNode:e
  }
  var Yl=null, hn=null, mn=null;
  function Ko(e){
    if(e=dr(e)){
      if(typeof Yl!="function")throw Error(u(280));
      var t=e.stateNode;
      t&&(t=el(t), Yl(e.stateNode, e.type, t))
    }

  }
  function Yo(e){
    hn?mn?mn.push(e):mn=[e]:hn=e
  }
  function Go(){
    if(hn){
      var e=hn, t=mn;
      if(mn=hn=null, Ko(e), t)for(e=0;
      e<t.length;
      e++)Ko(t[e])
    }

  }
  function Zo(e, t){
    return e(t)
  }
  function Jo(){

  }
  var Gl=!1;
  function bo(e, t, n){
    if(Gl)return e(t, n);
    Gl=!0;
    try{
      return Zo(e, t, n)
    }
    finally{
      Gl=!1, (hn!==null||mn!==null)&&(Jo(), Go())
    }

  }
  function Qn(e, t){
    var n=e.stateNode;
    if(n===null)return null;
    var r=el(n);
    if(r===null)return null;
    n=r[t];
    e:switch(t){
      case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type, r=!(e==="button"||e==="input"||e==="select"||e==="textarea")), e=!r;
      break e;
      default:e=!1
    }
    if(e)return null;
    if(n&&typeof n!="function")throw Error(u(231, t, typeof n));
    return n
  }
  var Zl=!1;
  if(S)try{
    var Xn={

    };
    Object.defineProperty(Xn, "passive", {
      get:function(){
        Zl=!0
      }

    }), window.addEventListener("test", Xn, Xn), window.removeEventListener("test", Xn, Xn)
  }
  catch{
    Zl=!1
  }
  function Qa(e, t, n, r, l, i, o, s, a){
    var v=Array.prototype.slice.call(arguments, 3);
    try{
      t.apply(n, v)
    }
    catch(P){
      this.onError(P)
    }

  }
  var qn=!1, Lr=null, Tr=!1, Jl=null, Xa={
    onError:function(e){
      qn=!0, Lr=e
    }

  };
  function qa(e, t, n, r, l, i, o, s, a){
    qn=!1, Lr=null, Qa.apply(Xa, arguments)
  }
  function Ka(e, t, n, r, l, i, o, s, a){
    if(qa.apply(this, arguments), qn){
      if(qn){
        var v=Lr;
        qn=!1, Lr=null
      }
      else throw Error(u(198));
      Tr||(Tr=!0, Jl=v)
    }

  }
  function Jt(e){
    var t=e, n=e;
    if(e.alternate)for(;
    t.return;
    )t=t.return;
    else{
      e=t;
      do t=e, (t.flags&4098)!==0&&(n=t.return), e=t.return;
      while(e)
    }
    return t.tag===3?n:null
  }
  function eu(e){
    if(e.tag===13){
      var t=e.memoizedState;
      if(t===null&&(e=e.alternate, e!==null&&(t=e.memoizedState)), t!==null)return t.dehydrated
    }
    return null
  }
  function tu(e){
    if(Jt(e)!==e)throw Error(u(188))
  }
  function Ya(e){
    var t=e.alternate;
    if(!t){
      if(t=Jt(e), t===null)throw Error(u(188));
      return t!==e?null:e
    }
    for(var n=e, r=t;
    ;
    ){
      var l=n.return;
      if(l===null)break;
      var i=l.alternate;
      if(i===null){
        if(r=l.return, r!==null){
          n=r;
          continue
        }
        break
      }
      if(l.child===i.child){
        for(i=l.child;
        i;
        ){
          if(i===n)return tu(l), e;
          if(i===r)return tu(l), t;
          i=i.sibling
        }
        throw Error(u(188))
      }
      if(n.return!==r.return)n=l, r=i;
      else{
        for(var o=!1, s=l.child;
        s;
        ){
          if(s===n){
            o=!0, n=l, r=i;
            break
          }
          if(s===r){
            o=!0, r=l, n=i;
            break
          }
          s=s.sibling
        }
        if(!o){
          for(s=i.child;
          s;
          ){
            if(s===n){
              o=!0, n=i, r=l;
              break
            }
            if(s===r){
              o=!0, r=i, n=l;
              break
            }
            s=s.sibling
          }
          if(!o)throw Error(u(189))
        }

      }
      if(n.alternate!==r)throw Error(u(190))
    }
    if(n.tag!==3)throw Error(u(188));
    return n.stateNode.current===n?e:t
  }
  function nu(e){
    return e=Ya(e), e!==null?ru(e):null
  }
  function ru(e){
    if(e.tag===5||e.tag===6)return e;
    for(e=e.child;
    e!==null;
    ){
      var t=ru(e);
      if(t!==null)return t;
      e=e.sibling
    }
    return null
  }
  var lu=k.unstable_scheduleCallback, iu=k.unstable_cancelCallback, Ga=k.unstable_shouldYield, Za=k.unstable_requestPaint, Se=k.unstable_now, Ja=k.unstable_getCurrentPriorityLevel, bl=k.unstable_ImmediatePriority, ou=k.unstable_UserBlockingPriority, Mr=k.unstable_NormalPriority, ba=k.unstable_LowPriority, uu=k.unstable_IdlePriority, Dr=null, yt=null;
  function ec(e){
    if(yt&&typeof yt.onCommitFiberRoot=="function")try{
      yt.onCommitFiberRoot(Dr, e, void 0, (e.current.flags&128)===128)
    }
    catch{

    }

  }
  var st=Math.clz32?Math.clz32:rc, tc=Math.log, nc=Math.LN2;
  function rc(e){
    return e>>>=0, e===0?32:31-(tc(e)/nc|0)|0
  }
  var Or=64, Fr=4194304;
  function Kn(e){
    switch(e&-e){
      case 1:return 1;
      case 2:return 2;
      case 4:return 4;
      case 8:return 8;
      case 16:return 16;
      case 32:return 32;
      case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;
      case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;
      case 134217728:return 134217728;
      case 268435456:return 268435456;
      case 536870912:return 536870912;
      case 1073741824:return 1073741824;
      default:return e
    }

  }
  function Ir(e, t){
    var n=e.pendingLanes;
    if(n===0)return 0;
    var r=0, l=e.suspendedLanes, i=e.pingedLanes, o=n&268435455;
    if(o!==0){
      var s=o&~l;
      s!==0?r=Kn(s):(i&=o, i!==0&&(r=Kn(i)))
    }
    else o=n&~l, o!==0?r=Kn(o):i!==0&&(r=Kn(i));
    if(r===0)return 0;
    if(t!==0&&t!==r&&(t&l)===0&&(l=r&-r, i=t&-t, l>=i||l===16&&(i&4194240)!==0))return t;
    if((r&4)!==0&&(r|=n&16), t=e.entangledLanes, t!==0)for(e=e.entanglements, t&=r;
    0<t;
    )n=31-st(t), l=1<<n, r|=e[n], t&=~l;
    return r
  }
  function lc(e, t){
    switch(e){
      case 1:case 2:case 4:return t+250;
      case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;
      case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
      case 134217728:case 268435456:case 536870912:case 1073741824:return-1;
      default:return-1
    }

  }
  function ic(e, t){
    for(var n=e.suspendedLanes, r=e.pingedLanes, l=e.expirationTimes, i=e.pendingLanes;
    0<i;
    ){
      var o=31-st(i), s=1<<o, a=l[o];
      a===-1?((s&n)===0||(s&r)!==0)&&(l[o]=lc(s, t)):a<=t&&(e.expiredLanes|=s), i&=~s
    }

  }
  function ei(e){
    return e=e.pendingLanes&-1073741825, e!==0?e:e&1073741824?1073741824:0
  }
  function su(){
    var e=Or;
    return Or<<=1, (Or&4194240)===0&&(Or=64), e
  }
  function ti(e){
    for(var t=[], n=0;
    31>n;
    n++)t.push(e);
    return t
  }
  function Yn(e, t, n){
    e.pendingLanes|=t, t!==536870912&&(e.suspendedLanes=0, e.pingedLanes=0), e=e.eventTimes, t=31-st(t), e[t]=n
  }
  function oc(e, t){
    var n=e.pendingLanes&~t;
    e.pendingLanes=t, e.suspendedLanes=0, e.pingedLanes=0, e.expiredLanes&=t, e.mutableReadLanes&=t, e.entangledLanes&=t, t=e.entanglements;
    var r=e.eventTimes;
    for(e=e.expirationTimes;
    0<n;
    ){
      var l=31-st(n), i=1<<l;
      t[l]=0, r[l]=-1, e[l]=-1, n&=~i
    }

  }
  function ni(e, t){
    var n=e.entangledLanes|=t;
    for(e=e.entanglements;
    n;
    ){
      var r=31-st(n), l=1<<r;
      l&t|e[r]&t&&(e[r]|=t), n&=~l
    }

  }
  var ue=0;
  function au(e){
    return e&=-e, 1<e?4<e?(e&268435455)!==0?16:536870912:4:1
  }
  var cu, ri, fu, du, pu, li=!1, Wr=[], Tt=null, Mt=null, Dt=null, Gn=new Map, Zn=new Map, Ot=[], uc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function hu(e, t){
    switch(e){
      case"focusin":case"focusout":Tt=null;
      break;
      case"dragenter":case"dragleave":Mt=null;
      break;
      case"mouseover":case"mouseout":Dt=null;
      break;
      case"pointerover":case"pointerout":Gn.delete(t.pointerId);
      break;
      case"gotpointercapture":case"lostpointercapture":Zn.delete(t.pointerId)
    }

  }
  function Jn(e, t, n, r, l, i){
    return e===null||e.nativeEvent!==i?(e={
      blockedOn:t, domEventName:n, eventSystemFlags:r, nativeEvent:i, targetContainers:[l]
    }, t!==null&&(t=dr(t), t!==null&&ri(t)), e):(e.eventSystemFlags|=r, t=e.targetContainers, l!==null&&t.indexOf(l)===-1&&t.push(l), e)
  }
  function sc(e, t, n, r, l){
    switch(t){
      case"focusin":return Tt=Jn(Tt, e, t, n, r, l), !0;
      case"dragenter":return Mt=Jn(Mt, e, t, n, r, l), !0;
      case"mouseover":return Dt=Jn(Dt, e, t, n, r, l), !0;
      case"pointerover":var i=l.pointerId;
      return Gn.set(i, Jn(Gn.get(i)||null, e, t, n, r, l)), !0;
      case"gotpointercapture":return i=l.pointerId, Zn.set(i, Jn(Zn.get(i)||null, e, t, n, r, l)), !0
    }
    return!1
  }
  function mu(e){
    var t=bt(e.target);
    if(t!==null){
      var n=Jt(t);
      if(n!==null){
        if(t=n.tag, t===13){
          if(t=eu(n), t!==null){
            e.blockedOn=t, pu(e.priority, function(){
              fu(n)
            });
            return
          }

        }
        else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){
          e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;
          return
        }

      }

    }
    e.blockedOn=null
  }
  function Ur(e){
    if(e.blockedOn!==null)return!1;
    for(var t=e.targetContainers;
    0<t.length;
    ){
      var n=oi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if(n===null){
        n=e.nativeEvent;
        var r=new n.constructor(n.type, n);
        ql=r, n.target.dispatchEvent(r), ql=null
      }
      else return t=dr(n), t!==null&&ri(t), e.blockedOn=n, !1;
      t.shift()
    }
    return!0
  }
  function vu(e, t, n){
    Ur(e)&&n.delete(t)
  }
  function ac(){
    li=!1, Tt!==null&&Ur(Tt)&&(Tt=null), Mt!==null&&Ur(Mt)&&(Mt=null), Dt!==null&&Ur(Dt)&&(Dt=null), Gn.forEach(vu), Zn.forEach(vu)
  }
  function bn(e, t){
    e.blockedOn===t&&(e.blockedOn=null, li||(li=!0, k.unstable_scheduleCallback(k.unstable_NormalPriority, ac)))
  }
  function er(e){
    function t(l){
      return bn(l, e)
    }
    if(0<Wr.length){
      bn(Wr[0], e);
      for(var n=1;
      n<Wr.length;
      n++){
        var r=Wr[n];
        r.blockedOn===e&&(r.blockedOn=null)
      }

    }
    for(Tt!==null&&bn(Tt, e), Mt!==null&&bn(Mt, e), Dt!==null&&bn(Dt, e), Gn.forEach(t), Zn.forEach(t), n=0;
    n<Ot.length;
    n++)r=Ot[n], r.blockedOn===e&&(r.blockedOn=null);
    for(;
    0<Ot.length&&(n=Ot[0], n.blockedOn===null);
    )mu(n), n.blockedOn===null&&Ot.shift()
  }
  var vn=re.ReactCurrentBatchConfig, Br=!0;
  function cc(e, t, n, r){
    var l=ue, i=vn.transition;
    vn.transition=null;
    try{
      ue=1, ii(e, t, n, r)
    }
    finally{
      ue=l, vn.transition=i
    }

  }
  function fc(e, t, n, r){
    var l=ue, i=vn.transition;
    vn.transition=null;
    try{
      ue=4, ii(e, t, n, r)
    }
    finally{
      ue=l, vn.transition=i
    }

  }
  function ii(e, t, n, r){
    if(Br){
      var l=oi(e, t, n, r);
      if(l===null)Ci(e, t, r, Ar, n), hu(e, r);
      else if(sc(l, e, t, n, r))r.stopPropagation();
      else if(hu(e, r), t&4&&-1<uc.indexOf(e)){
        for(;
        l!==null;
        ){
          var i=dr(l);
          if(i!==null&&cu(i), i=oi(e, t, n, r), i===null&&Ci(e, t, r, Ar, n), i===l)break;
          l=i
        }
        l!==null&&r.stopPropagation()
      }
      else Ci(e, t, r, null, n)
    }

  }
  var Ar=null;
  function oi(e, t, n, r){
    if(Ar=null, e=Kl(r), e=bt(e), e!==null)if(t=Jt(e), t===null)e=null;
    else if(n=t.tag, n===13){
      if(e=eu(t), e!==null)return e;
      e=null
    }
    else if(n===3){
      if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;
      e=null
    }
    else t!==e&&(e=null);
    return Ar=e, null
  }
  function gu(e){
    switch(e){
      case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;
      case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;
      case"message":switch(Ja()){
        case bl:return 1;
        case ou:return 4;
        case Mr:case ba:return 16;
        case uu:return 536870912;
        default:return 16
      }
      default:return 16
    }

  }
  var Ft=null, ui=null, Hr=null;
  function yu(){
    if(Hr)return Hr;
    var e, t=ui, n=t.length, r, l="value"in Ft?Ft.value:Ft.textContent, i=l.length;
    for(e=0;
    e<n&&t[e]===l[e];
    e++);
    var o=n-e;
    for(r=1;
    r<=o&&t[n-r]===l[i-r];
    r++);
    return Hr=l.slice(e, 1<r?1-r:void 0)
  }
  function Vr(e){
    var t=e.keyCode;
    return"charCode"in e?(e=e.charCode, e===0&&t===13&&(e=13)):e=t, e===10&&(e=13), 32<=e||e===13?e:0
  }
  function Qr(){
    return!0
  }
  function wu(){
    return!1
  }
  function Je(e){
    function t(n, r, l, i, o){
      this._reactName=n, this._targetInst=l, this.type=r, this.nativeEvent=i, this.target=o, this.currentTarget=null;
      for(var s in e)e.hasOwnProperty(s)&&(n=e[s], this[s]=n?n(i):i[s]);
      return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Qr:wu, this.isPropagationStopped=wu, this
    }
    return I(t.prototype, {
      preventDefault:function(){
        this.defaultPrevented=!0;
        var n=this.nativeEvent;
        n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1), this.isDefaultPrevented=Qr)
      }, stopPropagation:function(){
        var n=this.nativeEvent;
        n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0), this.isPropagationStopped=Qr)
      }, persist:function(){

      }, isPersistent:Qr
    }), t
  }
  var gn={
    eventPhase:0, bubbles:0, cancelable:0, timeStamp:function(e){
      return e.timeStamp||Date.now()
    }, defaultPrevented:0, isTrusted:0
  }, si=Je(gn), tr=I({

  }, gn, {
    view:0, detail:0
  }), dc=Je(tr), ai, ci, nr, Xr=I({

  }, tr, {
    screenX:0, screenY:0, clientX:0, clientY:0, pageX:0, pageY:0, ctrlKey:0, shiftKey:0, altKey:0, metaKey:0, getModifierState:di, button:0, buttons:0, relatedTarget:function(e){
      return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget
    }, movementX:function(e){
      return"movementX"in e?e.movementX:(e!==nr&&(nr&&e.type==="mousemove"?(ai=e.screenX-nr.screenX, ci=e.screenY-nr.screenY):ci=ai=0, nr=e), ai)
    }, movementY:function(e){
      return"movementY"in e?e.movementY:ci
    }

  }), ku=Je(Xr), pc=I({

  }, Xr, {
    dataTransfer:0
  }), hc=Je(pc), mc=I({

  }, tr, {
    relatedTarget:0
  }), fi=Je(mc), vc=I({

  }, gn, {
    animationName:0, elapsedTime:0, pseudoElement:0
  }), gc=Je(vc), yc=I({

  }, gn, {
    clipboardData:function(e){
      return"clipboardData"in e?e.clipboardData:window.clipboardData
    }

  }), wc=Je(yc), kc=I({

  }, gn, {
    data:0
  }), xu=Je(kc), xc={
    Esc:"Escape", Spacebar:" ", Left:"ArrowLeft", Up:"ArrowUp", Right:"ArrowRight", Down:"ArrowDown", Del:"Delete", Win:"OS", Menu:"ContextMenu", Apps:"ContextMenu", Scroll:"ScrollLock", MozPrintableKey:"Unidentified"
  }, Sc={
    8:"Backspace", 9:"Tab", 12:"Clear", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt", 19:"Pause", 20:"CapsLock", 27:"Escape", 32:" ", 33:"PageUp", 34:"PageDown", 35:"End", 36:"Home", 37:"ArrowLeft", 38:"ArrowUp", 39:"ArrowRight", 40:"ArrowDown", 45:"Insert", 46:"Delete", 112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6", 118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12", 144:"NumLock", 145:"ScrollLock", 224:"Meta"
  }, Cc={
    Alt:"altKey", Control:"ctrlKey", Meta:"metaKey", Shift:"shiftKey"
  };
  function Ec(e){
    var t=this.nativeEvent;
    return t.getModifierState?t.getModifierState(e):(e=Cc[e])?!!t[e]:!1
  }
  function di(){
    return Ec
  }
  var Nc=I({

  }, tr, {
    key:function(e){
      if(e.key){
        var t=xc[e.key]||e.key;
        if(t!=="Unidentified")return t
      }
      return e.type==="keypress"?(e=Vr(e), e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sc[e.keyCode]||"Unidentified":""
    }, code:0, location:0, ctrlKey:0, shiftKey:0, altKey:0, metaKey:0, repeat:0, locale:0, getModifierState:di, charCode:function(e){
      return e.type==="keypress"?Vr(e):0
    }, keyCode:function(e){
      return e.type==="keydown"||e.type==="keyup"?e.keyCode:0
    }, which:function(e){
      return e.type==="keypress"?Vr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0
    }

  }), _c=Je(Nc), jc=I({

  }, Xr, {
    pointerId:0, width:0, height:0, pressure:0, tangentialPressure:0, tiltX:0, tiltY:0, twist:0, pointerType:0, isPrimary:0
  }), Su=Je(jc), Pc=I({

  }, tr, {
    touches:0, targetTouches:0, changedTouches:0, altKey:0, metaKey:0, ctrlKey:0, shiftKey:0, getModifierState:di
  }), $c=Je(Pc), zc=I({

  }, gn, {
    propertyName:0, elapsedTime:0, pseudoElement:0
  }), Rc=Je(zc), Lc=I({

  }, Xr, {
    deltaX:function(e){
      return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0
    }, deltaY:function(e){
      return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0
    }, deltaZ:0, deltaMode:0
  }), Tc=Je(Lc), Mc=[9, 13, 27, 32], pi=S&&"CompositionEvent"in window, rr=null;
  S&&"documentMode"in document&&(rr=document.documentMode);
  var Dc=S&&"TextEvent"in window&&!rr, Cu=S&&(!pi||rr&&8<rr&&11>=rr), Eu=" ", Nu=!1;
  function _u(e, t){
    switch(e){
      case"keyup":return Mc.indexOf(t.keyCode)!==-1;
      case"keydown":return t.keyCode!==229;
      case"keypress":case"mousedown":case"focusout":return!0;
      default:return!1
    }

  }
  function ju(e){
    return e=e.detail, typeof e=="object"&&"data"in e?e.data:null
  }
  var yn=!1;
  function Oc(e, t){
    switch(e){
      case"compositionend":return ju(t);
      case"keypress":return t.which!==32?null:(Nu=!0, Eu);
      case"textInput":return e=t.data, e===Eu&&Nu?null:e;
      default:return null
    }

  }
  function Fc(e, t){
    if(yn)return e==="compositionend"||!pi&&_u(e, t)?(e=yu(), Hr=ui=Ft=null, yn=!1, e):null;
    switch(e){
      case"paste":return null;
      case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){
        if(t.char&&1<t.char.length)return t.char;
        if(t.which)return String.fromCharCode(t.which)
      }
      return null;
      case"compositionend":return Cu&&t.locale!=="ko"?null:t.data;
      default:return null
    }

  }
  var Ic={
    color:!0, date:!0, datetime:!0, "datetime-local":!0, email:!0, month:!0, number:!0, password:!0, range:!0, search:!0, tel:!0, text:!0, time:!0, url:!0, week:!0
  };
  function Pu(e){
    var t=e&&e.nodeName&&e.nodeName.toLowerCase();
    return t==="input"?!!Ic[e.type]:t==="textarea"
  }
  function $u(e, t, n, r){
    Yo(r), t=Zr(t, "onChange"), 0<t.length&&(n=new si("onChange", "change", null, n, r), e.push({
      event:n, listeners:t
    }))
  }
  var lr=null, ir=null;
  function Wc(e){
    qu(e, 0)
  }
  function qr(e){
    var t=Cn(e);
    if(Wn(t))return e
  }
  function Uc(e, t){
    if(e==="change")return t
  }
  var zu=!1;
  if(S){
    var hi;
    if(S){
      var mi="oninput"in document;
      if(!mi){
        var Ru=document.createElement("div");
        Ru.setAttribute("oninput", "return;"), mi=typeof Ru.oninput=="function"
      }
      hi=mi
    }
    else hi=!1;
    zu=hi&&(!document.documentMode||9<document.documentMode)
  }
  function Lu(){
    lr&&(lr.detachEvent("onpropertychange", Tu), ir=lr=null)
  }
  function Tu(e){
    if(e.propertyName==="value"&&qr(ir)){
      var t=[];
      $u(t, ir, e, Kl(e)), bo(Wc, t)
    }

  }
  function Bc(e, t, n){
    e==="focusin"?(Lu(), lr=t, ir=n, lr.attachEvent("onpropertychange", Tu)):e==="focusout"&&Lu()
  }
  function Ac(e){
    if(e==="selectionchange"||e==="keyup"||e==="keydown")return qr(ir)
  }
  function Hc(e, t){
    if(e==="click")return qr(t)
  }
  function Vc(e, t){
    if(e==="input"||e==="change")return qr(t)
  }
  function Qc(e, t){
    return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t
  }
  var at=typeof Object.is=="function"?Object.is:Qc;
  function or(e, t){
    if(at(e, t))return!0;
    if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;
    var n=Object.keys(e), r=Object.keys(t);
    if(n.length!==r.length)return!1;
    for(r=0;
    r<n.length;
    r++){
      var l=n[r];
      if(!x.call(t, l)||!at(e[l], t[l]))return!1
    }
    return!0
  }
  function Mu(e){
    for(;
    e&&e.firstChild;
    )e=e.firstChild;
    return e
  }
  function Du(e, t){
    var n=Mu(e);
    e=0;
    for(var r;
    n;
    ){
      if(n.nodeType===3){
        if(r=e+n.textContent.length, e<=t&&r>=t)return{
          node:n, offset:t-e
        };
        e=r
      }
      e:{
        for(;
        n;
        ){
          if(n.nextSibling){
            n=n.nextSibling;
            break e
          }
          n=n.parentNode
        }
        n=void 0
      }
      n=Mu(n)
    }

  }
  function Ou(e, t){
    return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ou(e, t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1
  }
  function Fu(){
    for(var e=window, t=pn();
    t instanceof e.HTMLIFrameElement;
    ){
      try{
        var n=typeof t.contentWindow.location.href=="string"
      }
      catch{
        n=!1
      }
      if(n)e=t.contentWindow;
      else break;
      t=pn(e.document)
    }
    return t
  }
  function vi(e){
    var t=e&&e.nodeName&&e.nodeName.toLowerCase();
    return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")
  }
  function Xc(e){
    var t=Fu(), n=e.focusedElem, r=e.selectionRange;
    if(t!==n&&n&&n.ownerDocument&&Ou(n.ownerDocument.documentElement, n)){
      if(r!==null&&vi(n)){
        if(t=r.start, e=r.end, e===void 0&&(e=t), "selectionStart"in n)n.selectionStart=t, n.selectionEnd=Math.min(e, n.value.length);
        else if(e=(t=n.ownerDocument||document)&&t.defaultView||window, e.getSelection){
          e=e.getSelection();
          var l=n.textContent.length, i=Math.min(r.start, l);
          r=r.end===void 0?i:Math.min(r.end, l), !e.extend&&i>r&&(l=r, r=i, i=l), l=Du(n, i);
          var o=Du(n, r);
          l&&o&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i>r?(e.addRange(t), e.extend(o.node, o.offset)):(t.setEnd(o.node, o.offset), e.addRange(t)))
        }

      }
      for(t=[], e=n;
      e=e.parentNode;
      )e.nodeType===1&&t.push({
        element:e, left:e.scrollLeft, top:e.scrollTop
      });
      for(typeof n.focus=="function"&&n.focus(), n=0;
      n<t.length;
      n++)e=t[n], e.element.scrollLeft=e.left, e.element.scrollTop=e.top
    }

  }
  var qc=S&&"documentMode"in document&&11>=document.documentMode, wn=null, gi=null, ur=null, yi=!1;
  function Iu(e, t, n){
    var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;
    yi||wn==null||wn!==pn(r)||(r=wn, "selectionStart"in r&&vi(r)?r={
      start:r.selectionStart, end:r.selectionEnd
    }:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(), r={
      anchorNode:r.anchorNode, anchorOffset:r.anchorOffset, focusNode:r.focusNode, focusOffset:r.focusOffset
    }), ur&&or(ur, r)||(ur=r, r=Zr(gi, "onSelect"), 0<r.length&&(t=new si("onSelect", "select", null, t, n), e.push({
      event:t, listeners:r
    }), t.target=wn)))
  }
  function Kr(e, t){
    var n={

    };
    return n[e.toLowerCase()]=t.toLowerCase(), n["Webkit"+e]="webkit"+t, n["Moz"+e]="moz"+t, n
  }
  var kn={
    animationend:Kr("Animation", "AnimationEnd"), animationiteration:Kr("Animation", "AnimationIteration"), animationstart:Kr("Animation", "AnimationStart"), transitionend:Kr("Transition", "TransitionEnd")
  }, wi={

  }, Wu={

  };
  S&&(Wu=document.createElement("div").style, "AnimationEvent"in window||(delete kn.animationend.animation, delete kn.animationiteration.animation, delete kn.animationstart.animation), "TransitionEvent"in window||delete kn.transitionend.transition);
  function Yr(e){
    if(wi[e])return wi[e];
    if(!kn[e])return e;
    var t=kn[e], n;
    for(n in t)if(t.hasOwnProperty(n)&&n in Wu)return wi[e]=t[n];
    return e
  }
  var Uu=Yr("animationend"), Bu=Yr("animationiteration"), Au=Yr("animationstart"), Hu=Yr("transitionend"), Vu=new Map, Qu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function It(e, t){
    Vu.set(e, t), m(t, [e])
  }
  for(var ki=0;
  ki<Qu.length;
  ki++){
    var xi=Qu[ki], Kc=xi.toLowerCase(), Yc=xi[0].toUpperCase()+xi.slice(1);
    It(Kc, "on"+Yc)
  }
  It(Uu, "onAnimationEnd"), It(Bu, "onAnimationIteration"), It(Au, "onAnimationStart"), It("dblclick", "onDoubleClick"), It("focusin", "onFocus"), It("focusout", "onBlur"), It(Hu, "onTransitionEnd"), N("onMouseEnter", ["mouseout", "mouseover"]), N("onMouseLeave", ["mouseout", "mouseover"]), N("onPointerEnter", ["pointerout", "pointerover"]), N("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var sr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Gc=new Set("cancel close invalid load scroll toggle".split(" ").concat(sr));
  function Xu(e, t, n){
    var r=e.type||"unknown-event";
    e.currentTarget=n, Ka(r, t, void 0, e), e.currentTarget=null
  }
  function qu(e, t){
    t=(t&4)!==0;
    for(var n=0;
    n<e.length;
    n++){
      var r=e[n], l=r.event;
      r=r.listeners;
      e:{
        var i=void 0;
        if(t)for(var o=r.length-1;
        0<=o;
        o--){
          var s=r[o], a=s.instance, v=s.currentTarget;
          if(s=s.listener, a!==i&&l.isPropagationStopped())break e;
          Xu(l, s, v), i=a
        }
        else for(o=0;
        o<r.length;
        o++){
          if(s=r[o], a=s.instance, v=s.currentTarget, s=s.listener, a!==i&&l.isPropagationStopped())break e;
          Xu(l, s, v), i=a
        }

      }

    }
    if(Tr)throw e=Jl, Tr=!1, Jl=null, e
  }
  function de(e, t){
    var n=t[$i];
    n===void 0&&(n=t[$i]=new Set);
    var r=e+"__bubble";
    n.has(r)||(Ku(t, e, 2, !1), n.add(r))
  }
  function Si(e, t, n){
    var r=0;
    t&&(r|=4), Ku(n, e, r, t)
  }
  var Gr="_reactListening"+Math.random().toString(36).slice(2);
  function ar(e){
    if(!e[Gr]){
      e[Gr]=!0, w.forEach(function(n){
        n!=="selectionchange"&&(Gc.has(n)||Si(n, !1, e), Si(n, !0, e))
      });
      var t=e.nodeType===9?e:e.ownerDocument;
      t===null||t[Gr]||(t[Gr]=!0, Si("selectionchange", !1, t))
    }

  }
  function Ku(e, t, n, r){
    switch(gu(t)){
      case 1:var l=cc;
      break;
      case 4:l=fc;
      break;
      default:l=ii
    }
    n=l.bind(null, t, n, e), l=void 0, !Zl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0), r?l!==void 0?e.addEventListener(t, n, {
      capture:!0, passive:l
    }):e.addEventListener(t, n, !0):l!==void 0?e.addEventListener(t, n, {
      passive:l
    }):e.addEventListener(t, n, !1)
  }
  function Ci(e, t, n, r, l){
    var i=r;
    if((t&1)===0&&(t&2)===0&&r!==null)e:for(;
    ;
    ){
      if(r===null)return;
      var o=r.tag;
      if(o===3||o===4){
        var s=r.stateNode.containerInfo;
        if(s===l||s.nodeType===8&&s.parentNode===l)break;
        if(o===4)for(o=r.return;
        o!==null;
        ){
          var a=o.tag;
          if((a===3||a===4)&&(a=o.stateNode.containerInfo, a===l||a.nodeType===8&&a.parentNode===l))return;
          o=o.return
        }
        for(;
        s!==null;
        ){
          if(o=bt(s), o===null)return;
          if(a=o.tag, a===5||a===6){
            r=i=o;
            continue e
          }
          s=s.parentNode
        }

      }
      r=r.return
    }
    bo(function(){
      var v=i, P=Kl(n), z=[];
      e:{
        var j=Vu.get(e);
        if(j!==void 0){
          var O=si, U=e;
          switch(e){
            case"keypress":if(Vr(n)===0)break e;
            case"keydown":case"keyup":O=_c;
            break;
            case"focusin":U="focus", O=fi;
            break;
            case"focusout":U="blur", O=fi;
            break;
            case"beforeblur":case"afterblur":O=fi;
            break;
            case"click":if(n.button===2)break e;
            case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":O=ku;
            break;
            case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":O=hc;
            break;
            case"touchcancel":case"touchend":case"touchmove":case"touchstart":O=$c;
            break;
            case Uu:case Bu:case Au:O=gc;
            break;
            case Hu:O=Rc;
            break;
            case"scroll":O=dc;
            break;
            case"wheel":O=Tc;
            break;
            case"copy":case"cut":case"paste":O=wc;
            break;
            case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":O=Su
          }
          var A=(t&4)!==0, Ce=!A&&e==="scroll", p=A?j!==null?j+"Capture":null:j;
          A=[];
          for(var c=v, h;
          c!==null;
          ){
            h=c;
            var T=h.stateNode;
            if(h.tag===5&&T!==null&&(h=T, p!==null&&(T=Qn(c, p), T!=null&&A.push(cr(c, T, h)))), Ce)break;
            c=c.return
          }
          0<A.length&&(j=new O(j, U, null, n, P), z.push({
            event:j, listeners:A
          }))
        }

      }
      if((t&7)===0){
        e:{
          if(j=e==="mouseover"||e==="pointerover", O=e==="mouseout"||e==="pointerout", j&&n!==ql&&(U=n.relatedTarget||n.fromElement)&&(bt(U)||U[Et]))break e;
          if((O||j)&&(j=P.window===P?P:(j=P.ownerDocument)?j.defaultView||j.parentWindow:window, O?(U=n.relatedTarget||n.toElement, O=v, U=U?bt(U):null, U!==null&&(Ce=Jt(U), U!==Ce||U.tag!==5&&U.tag!==6)&&(U=null)):(O=null, U=v), O!==U)){
            if(A=ku, T="onMouseLeave", p="onMouseEnter", c="mouse", (e==="pointerout"||e==="pointerover")&&(A=Su, T="onPointerLeave", p="onPointerEnter", c="pointer"), Ce=O==null?j:Cn(O), h=U==null?j:Cn(U), j=new A(T, c+"leave", O, n, P), j.target=Ce, j.relatedTarget=h, T=null, bt(P)===v&&(A=new A(p, c+"enter", U, n, P), A.target=h, A.relatedTarget=Ce, T=A), Ce=T, O&&U)t:{
              for(A=O, p=U, c=0, h=A;
              h;
              h=xn(h))c++;
              for(h=0, T=p;
              T;
              T=xn(T))h++;
              for(;
              0<c-h;
              )A=xn(A), c--;
              for(;
              0<h-c;
              )p=xn(p), h--;
              for(;
              c--;
              ){
                if(A===p||p!==null&&A===p.alternate)break t;
                A=xn(A), p=xn(p)
              }
              A=null
            }
            else A=null;
            O!==null&&Yu(z, j, O, A, !1), U!==null&&Ce!==null&&Yu(z, Ce, U, A, !0)
          }

        }
        e:{
          if(j=v?Cn(v):window, O=j.nodeName&&j.nodeName.toLowerCase(), O==="select"||O==="input"&&j.type==="file")var H=Uc;
          else if(Pu(j))if(zu)H=Vc;
          else{
            H=Ac;
            var X=Bc
          }
          else(O=j.nodeName)&&O.toLowerCase()==="input"&&(j.type==="checkbox"||j.type==="radio")&&(H=Hc);
          if(H&&(H=H(e, v))){
            $u(z, H, n, P);
            break e
          }
          X&&X(e, j, v), e==="focusout"&&(X=j._wrapperState)&&X.controlled&&j.type==="number"&&An(j, "number", j.value)
        }
        switch(X=v?Cn(v):window, e){
          case"focusin":(Pu(X)||X.contentEditable==="true")&&(wn=X, gi=v, ur=null);
          break;
          case"focusout":ur=gi=wn=null;
          break;
          case"mousedown":yi=!0;
          break;
          case"contextmenu":case"mouseup":case"dragend":yi=!1, Iu(z, n, P);
          break;
          case"selectionchange":if(qc)break;
          case"keydown":case"keyup":Iu(z, n, P)
        }
        var q;
        if(pi)e:{
          switch(e){
            case"compositionstart":var G="onCompositionStart";
            break e;
            case"compositionend":G="onCompositionEnd";
            break e;
            case"compositionupdate":G="onCompositionUpdate";
            break e
          }
          G=void 0
        }
        else yn?_u(e, n)&&(G="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(G="onCompositionStart");
        G&&(Cu&&n.locale!=="ko"&&(yn||G!=="onCompositionStart"?G==="onCompositionEnd"&&yn&&(q=yu()):(Ft=P, ui="value"in Ft?Ft.value:Ft.textContent, yn=!0)), X=Zr(v, G), 0<X.length&&(G=new xu(G, e, null, n, P), z.push({
          event:G, listeners:X
        }), q?G.data=q:(q=ju(n), q!==null&&(G.data=q)))), (q=Dc?Oc(e, n):Fc(e, n))&&(v=Zr(v, "onBeforeInput"), 0<v.length&&(P=new xu("onBeforeInput", "beforeinput", null, n, P), z.push({
          event:P, listeners:v
        }), P.data=q))
      }
      qu(z, t)
    })
  }
  function cr(e, t, n){
    return{
      instance:e, listener:t, currentTarget:n
    }

  }
  function Zr(e, t){
    for(var n=t+"Capture", r=[];
    e!==null;
    ){
      var l=e, i=l.stateNode;
      l.tag===5&&i!==null&&(l=i, i=Qn(e, n), i!=null&&r.unshift(cr(e, i, l)), i=Qn(e, t), i!=null&&r.push(cr(e, i, l))), e=e.return
    }
    return r
  }
  function xn(e){
    if(e===null)return null;
    do e=e.return;
    while(e&&e.tag!==5);
    return e||null
  }
  function Yu(e, t, n, r, l){
    for(var i=t._reactName, o=[];
    n!==null&&n!==r;
    ){
      var s=n, a=s.alternate, v=s.stateNode;
      if(a!==null&&a===r)break;
      s.tag===5&&v!==null&&(s=v, l?(a=Qn(n, i), a!=null&&o.unshift(cr(n, a, s))):l||(a=Qn(n, i), a!=null&&o.push(cr(n, a, s)))), n=n.return
    }
    o.length!==0&&e.push({
      event:t, listeners:o
    })
  }
  var Zc=/\r\n?/g, Jc=/\u0000|\uFFFD/g;
  function Gu(e){
    return(typeof e=="string"?e:""+e).replace(Zc, `
`).replace(Jc, "")
  }
  function Jr(e, t, n){
    if(t=Gu(t), Gu(e)!==t&&n)throw Error(u(425))
  }
  function br(){

  }
  var Ei=null, Ni=null;
  function _i(e, t){
    return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null
  }
  var ji=typeof setTimeout=="function"?setTimeout:void 0, bc=typeof clearTimeout=="function"?clearTimeout:void 0, Zu=typeof Promise=="function"?Promise:void 0, ef=typeof queueMicrotask=="function"?queueMicrotask:typeof Zu<"u"?function(e){
    return Zu.resolve(null).then(e).catch(tf)
  }:ji;
  function tf(e){
    setTimeout(function(){
      throw e
    })
  }
  function Pi(e, t){
    var n=t, r=0;
    do{
      var l=n.nextSibling;
      if(e.removeChild(n), l&&l.nodeType===8)if(n=l.data, n==="/$"){
        if(r===0){
          e.removeChild(l), er(t);
          return
        }
        r--
      }
      else n!=="$"&&n!=="$?"&&n!=="$!"||r++;
      n=l
    }
    while(n);
    er(t)
  }
  function Wt(e){
    for(;
    e!=null;
    e=e.nextSibling){
      var t=e.nodeType;
      if(t===1||t===3)break;
      if(t===8){
        if(t=e.data, t==="$"||t==="$!"||t==="$?")break;
        if(t==="/$")return null
      }

    }
    return e
  }
  function Ju(e){
    e=e.previousSibling;
    for(var t=0;
    e;
    ){
      if(e.nodeType===8){
        var n=e.data;
        if(n==="$"||n==="$!"||n==="$?"){
          if(t===0)return e;
          t--
        }
        else n==="/$"&&t++
      }
      e=e.previousSibling
    }
    return null
  }
  var Sn=Math.random().toString(36).slice(2), wt="__reactFiber$"+Sn, fr="__reactProps$"+Sn, Et="__reactContainer$"+Sn, $i="__reactEvents$"+Sn, nf="__reactListeners$"+Sn, rf="__reactHandles$"+Sn;
  function bt(e){
    var t=e[wt];
    if(t)return t;
    for(var n=e.parentNode;
    n;
    ){
      if(t=n[Et]||n[wt]){
        if(n=t.alternate, t.child!==null||n!==null&&n.child!==null)for(e=Ju(e);
        e!==null;
        ){
          if(n=e[wt])return n;
          e=Ju(e)
        }
        return t
      }
      e=n, n=e.parentNode
    }
    return null
  }
  function dr(e){
    return e=e[wt]||e[Et], !e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e
  }
  function Cn(e){
    if(e.tag===5||e.tag===6)return e.stateNode;
    throw Error(u(33))
  }
  function el(e){
    return e[fr]||null
  }
  var zi=[], En=-1;
  function Ut(e){
    return{
      current:e
    }

  }
  function pe(e){
    0>En||(e.current=zi[En], zi[En]=null, En--)
  }
  function ce(e, t){
    En++, zi[En]=e.current, e.current=t
  }
  var Bt={

  }, Fe=Ut(Bt), Qe=Ut(!1), en=Bt;
  function Nn(e, t){
    var n=e.type.contextTypes;
    if(!n)return Bt;
    var r=e.stateNode;
    if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;
    var l={

    }, i;
    for(i in n)l[i]=t[i];
    return r&&(e=e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext=t, e.__reactInternalMemoizedMaskedChildContext=l), l
  }
  function Xe(e){
    return e=e.childContextTypes, e!=null
  }
  function tl(){
    pe(Qe), pe(Fe)
  }
  function bu(e, t, n){
    if(Fe.current!==Bt)throw Error(u(168));
    ce(Fe, t), ce(Qe, n)
  }
  function es(e, t, n){
    var r=e.stateNode;
    if(t=t.childContextTypes, typeof r.getChildContext!="function")return n;
    r=r.getChildContext();
    for(var l in r)if(!(l in t))throw Error(u(108, Y(e)||"Unknown", l));
    return I({

    }, n, r)
  }
  function nl(e){
    return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Bt, en=Fe.current, ce(Fe, e), ce(Qe, Qe.current), !0
  }
  function ts(e, t, n){
    var r=e.stateNode;
    if(!r)throw Error(u(169));
    n?(e=es(e, t, en), r.__reactInternalMemoizedMergedChildContext=e, pe(Qe), pe(Fe), ce(Fe, e)):pe(Qe), ce(Qe, n)
  }
  var Nt=null, rl=!1, Ri=!1;
  function ns(e){
    Nt===null?Nt=[e]:Nt.push(e)
  }
  function lf(e){
    rl=!0, ns(e)
  }
  function At(){
    if(!Ri&&Nt!==null){
      Ri=!0;
      var e=0, t=ue;
      try{
        var n=Nt;
        for(ue=1;
        e<n.length;
        e++){
          var r=n[e];
          do r=r(!0);
          while(r!==null)
        }
        Nt=null, rl=!1
      }
      catch(l){
        throw Nt!==null&&(Nt=Nt.slice(e+1)), lu(bl, At), l
      }
      finally{
        ue=t, Ri=!1
      }

    }
    return null
  }
  var _n=[], jn=0, ll=null, il=0, nt=[], rt=0, tn=null, _t=1, jt="";
  function nn(e, t){
    _n[jn++]=il, _n[jn++]=ll, ll=e, il=t
  }
  function rs(e, t, n){
    nt[rt++]=_t, nt[rt++]=jt, nt[rt++]=tn, tn=e;
    var r=_t;
    e=jt;
    var l=32-st(r)-1;
    r&=~(1<<l), n+=1;
    var i=32-st(t)+l;
    if(30<i){
      var o=l-l%5;
      i=(r&(1<<o)-1).toString(32), r>>=o, l-=o, _t=1<<32-st(t)+l|n<<l|r, jt=i+e
    }
    else _t=1<<i|n<<l|r, jt=e
  }
  function Li(e){
    e.return!==null&&(nn(e, 1), rs(e, 1, 0))
  }
  function Ti(e){
    for(;
    e===ll;
    )ll=_n[--jn], _n[jn]=null, il=_n[--jn], _n[jn]=null;
    for(;
    e===tn;
    )tn=nt[--rt], nt[rt]=null, jt=nt[--rt], nt[rt]=null, _t=nt[--rt], nt[rt]=null
  }
  var be=null, et=null, ve=!1, ct=null;
  function ls(e, t){
    var n=ut(5, null, null, 0);
    n.elementType="DELETED", n.stateNode=t, n.return=e, t=e.deletions, t===null?(e.deletions=[n], e.flags|=16):t.push(n)
  }
  function is(e, t){
    switch(e.tag){
      case 5:var n=e.type;
      return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t, t!==null?(e.stateNode=t, be=e, et=Wt(t.firstChild), !0):!1;
      case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t, t!==null?(e.stateNode=t, be=e, et=null, !0):!1;
      case 13:return t=t.nodeType!==8?null:t, t!==null?(n=tn!==null?{
        id:_t, overflow:jt
      }:null, e.memoizedState={
        dehydrated:t, treeContext:n, retryLane:1073741824
      }, n=ut(18, null, null, 0), n.stateNode=t, n.return=e, e.child=n, be=e, et=null, !0):!1;
      default:return!1
    }

  }
  function Mi(e){
    return(e.mode&1)!==0&&(e.flags&128)===0
  }
  function Di(e){
    if(ve){
      var t=et;
      if(t){
        var n=t;
        if(!is(e, t)){
          if(Mi(e))throw Error(u(418));
          t=Wt(n.nextSibling);
          var r=be;
          t&&is(e, t)?ls(r, n):(e.flags=e.flags&-4097|2, ve=!1, be=e)
        }

      }
      else{
        if(Mi(e))throw Error(u(418));
        e.flags=e.flags&-4097|2, ve=!1, be=e
      }

    }

  }
  function os(e){
    for(e=e.return;
    e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;
    )e=e.return;
    be=e
  }
  function ol(e){
    if(e!==be)return!1;
    if(!ve)return os(e), ve=!0, !1;
    var t;
    if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type, t=t!=="head"&&t!=="body"&&!_i(e.type, e.memoizedProps)), t&&(t=et)){
      if(Mi(e))throw us(), Error(u(418));
      for(;
      t;
      )ls(e, t), t=Wt(t.nextSibling)
    }
    if(os(e), e.tag===13){
      if(e=e.memoizedState, e=e!==null?e.dehydrated:null, !e)throw Error(u(317));
      e:{
        for(e=e.nextSibling, t=0;
        e;
        ){
          if(e.nodeType===8){
            var n=e.data;
            if(n==="/$"){
              if(t===0){
                et=Wt(e.nextSibling);
                break e
              }
              t--
            }
            else n!=="$"&&n!=="$!"&&n!=="$?"||t++
          }
          e=e.nextSibling
        }
        et=null
      }

    }
    else et=be?Wt(e.stateNode.nextSibling):null;
    return!0
  }
  function us(){
    for(var e=et;
    e;
    )e=Wt(e.nextSibling)
  }
  function Pn(){
    et=be=null, ve=!1
  }
  function Oi(e){
    ct===null?ct=[e]:ct.push(e)
  }
  var of=re.ReactCurrentBatchConfig;
  function pr(e, t, n){
    if(e=n.ref, e!==null&&typeof e!="function"&&typeof e!="object"){
      if(n._owner){
        if(n=n._owner, n){
          if(n.tag!==1)throw Error(u(309));
          var r=n.stateNode
        }
        if(!r)throw Error(u(147, e));
        var l=r, i=""+e;
        return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){
          var s=l.refs;
          o===null?delete s[i]:s[i]=o
        }, t._stringRef=i, t)
      }
      if(typeof e!="string")throw Error(u(284));
      if(!n._owner)throw Error(u(290, e))
    }
    return e
  }
  function ul(e, t){
    throw e=Object.prototype.toString.call(t), Error(u(31, e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))
  }
  function ss(e){
    var t=e._init;
    return t(e._payload)
  }
  function as(e){
    function t(p, c){
      if(e){
        var h=p.deletions;
        h===null?(p.deletions=[c], p.flags|=16):h.push(c)
      }

    }
    function n(p, c){
      if(!e)return null;
      for(;
      c!==null;
      )t(p, c), c=c.sibling;
      return null
    }
    function r(p, c){
      for(p=new Map;
      c!==null;
      )c.key!==null?p.set(c.key, c):p.set(c.index, c), c=c.sibling;
      return p
    }
    function l(p, c){
      return p=Gt(p, c), p.index=0, p.sibling=null, p
    }
    function i(p, c, h){
      return p.index=h, e?(h=p.alternate, h!==null?(h=h.index, h<c?(p.flags|=2, c):h):(p.flags|=2, c)):(p.flags|=1048576, c)
    }
    function o(p){
      return e&&p.alternate===null&&(p.flags|=2), p
    }
    function s(p, c, h, T){
      return c===null||c.tag!==6?(c=Po(h, p.mode, T), c.return=p, c):(c=l(c, h), c.return=p, c)
    }
    function a(p, c, h, T){
      var H=h.type;
      return H===Ne?P(p, c, h.props.children, T, h.key):c!==null&&(c.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===Te&&ss(H)===c.type)?(T=l(c, h.props), T.ref=pr(p, c, h), T.return=p, T):(T=Rl(h.type, h.key, h.props, null, p.mode, T), T.ref=pr(p, c, h), T.return=p, T)
    }
    function v(p, c, h, T){
      return c===null||c.tag!==4||c.stateNode.containerInfo!==h.containerInfo||c.stateNode.implementation!==h.implementation?(c=$o(h, p.mode, T), c.return=p, c):(c=l(c, h.children||[]), c.return=p, c)
    }
    function P(p, c, h, T, H){
      return c===null||c.tag!==7?(c=fn(h, p.mode, T, H), c.return=p, c):(c=l(c, h), c.return=p, c)
    }
    function z(p, c, h){
      if(typeof c=="string"&&c!==""||typeof c=="number")return c=Po(""+c, p.mode, h), c.return=p, c;
      if(typeof c=="object"&&c!==null){
        switch(c.$$typeof){
          case he:return h=Rl(c.type, c.key, c.props, null, p.mode, h), h.ref=pr(p, null, c), h.return=p, h;
          case fe:return c=$o(c, p.mode, h), c.return=p, c;
          case Te:var T=c._init;
          return z(p, T(c._payload), h)
        }
        if(Ct(c)||Q(c))return c=fn(c, p.mode, h, null), c.return=p, c;
        ul(p, c)
      }
      return null
    }
    function j(p, c, h, T){
      var H=c!==null?c.key:null;
      if(typeof h=="string"&&h!==""||typeof h=="number")return H!==null?null:s(p, c, ""+h, T);
      if(typeof h=="object"&&h!==null){
        switch(h.$$typeof){
          case he:return h.key===H?a(p, c, h, T):null;
          case fe:return h.key===H?v(p, c, h, T):null;
          case Te:return H=h._init, j(p, c, H(h._payload), T)
        }
        if(Ct(h)||Q(h))return H!==null?null:P(p, c, h, T, null);
        ul(p, h)
      }
      return null
    }
    function O(p, c, h, T, H){
      if(typeof T=="string"&&T!==""||typeof T=="number")return p=p.get(h)||null, s(c, p, ""+T, H);
      if(typeof T=="object"&&T!==null){
        switch(T.$$typeof){
          case he:return p=p.get(T.key===null?h:T.key)||null, a(c, p, T, H);
          case fe:return p=p.get(T.key===null?h:T.key)||null, v(c, p, T, H);
          case Te:var X=T._init;
          return O(p, c, h, X(T._payload), H)
        }
        if(Ct(T)||Q(T))return p=p.get(h)||null, P(c, p, T, H, null);
        ul(c, T)
      }
      return null
    }
    function U(p, c, h, T){
      for(var H=null, X=null, q=c, G=c=0, Le=null;
      q!==null&&G<h.length;
      G++){
        q.index>G?(Le=q, q=null):Le=q.sibling;
        var oe=j(p, q, h[G], T);
        if(oe===null){
          q===null&&(q=Le);
          break
        }
        e&&q&&oe.alternate===null&&t(p, q), c=i(oe, c, G), X===null?H=oe:X.sibling=oe, X=oe, q=Le
      }
      if(G===h.length)return n(p, q), ve&&nn(p, G), H;
      if(q===null){
        for(;
        G<h.length;
        G++)q=z(p, h[G], T), q!==null&&(c=i(q, c, G), X===null?H=q:X.sibling=q, X=q);
        return ve&&nn(p, G), H
      }
      for(q=r(p, q);
      G<h.length;
      G++)Le=O(q, p, G, h[G], T), Le!==null&&(e&&Le.alternate!==null&&q.delete(Le.key===null?G:Le.key), c=i(Le, c, G), X===null?H=Le:X.sibling=Le, X=Le);
      return e&&q.forEach(function(Zt){
        return t(p, Zt)
      }), ve&&nn(p, G), H
    }
    function A(p, c, h, T){
      var H=Q(h);
      if(typeof H!="function")throw Error(u(150));
      if(h=H.call(h), h==null)throw Error(u(151));
      for(var X=H=null, q=c, G=c=0, Le=null, oe=h.next();
      q!==null&&!oe.done;
      G++, oe=h.next()){
        q.index>G?(Le=q, q=null):Le=q.sibling;
        var Zt=j(p, q, oe.value, T);
        if(Zt===null){
          q===null&&(q=Le);
          break
        }
        e&&q&&Zt.alternate===null&&t(p, q), c=i(Zt, c, G), X===null?H=Zt:X.sibling=Zt, X=Zt, q=Le
      }
      if(oe.done)return n(p, q), ve&&nn(p, G), H;
      if(q===null){
        for(;
        !oe.done;
        G++, oe=h.next())oe=z(p, oe.value, T), oe!==null&&(c=i(oe, c, G), X===null?H=oe:X.sibling=oe, X=oe);
        return ve&&nn(p, G), H
      }
      for(q=r(p, q);
      !oe.done;
      G++, oe=h.next())oe=O(q, p, G, oe.value, T), oe!==null&&(e&&oe.alternate!==null&&q.delete(oe.key===null?G:oe.key), c=i(oe, c, G), X===null?H=oe:X.sibling=oe, X=oe);
      return e&&q.forEach(function(Wf){
        return t(p, Wf)
      }), ve&&nn(p, G), H
    }
    function Ce(p, c, h, T){
      if(typeof h=="object"&&h!==null&&h.type===Ne&&h.key===null&&(h=h.props.children), typeof h=="object"&&h!==null){
        switch(h.$$typeof){
          case he:e:{
            for(var H=h.key, X=c;
            X!==null;
            ){
              if(X.key===H){
                if(H=h.type, H===Ne){
                  if(X.tag===7){
                    n(p, X.sibling), c=l(X, h.props.children), c.return=p, p=c;
                    break e
                  }

                }
                else if(X.elementType===H||typeof H=="object"&&H!==null&&H.$$typeof===Te&&ss(H)===X.type){
                  n(p, X.sibling), c=l(X, h.props), c.ref=pr(p, X, h), c.return=p, p=c;
                  break e
                }
                n(p, X);
                break
              }
              else t(p, X);
              X=X.sibling
            }
            h.type===Ne?(c=fn(h.props.children, p.mode, T, h.key), c.return=p, p=c):(T=Rl(h.type, h.key, h.props, null, p.mode, T), T.ref=pr(p, c, h), T.return=p, p=T)
          }
          return o(p);
          case fe:e:{
            for(X=h.key;
            c!==null;
            ){
              if(c.key===X)if(c.tag===4&&c.stateNode.containerInfo===h.containerInfo&&c.stateNode.implementation===h.implementation){
                n(p, c.sibling), c=l(c, h.children||[]), c.return=p, p=c;
                break e
              }
              else{
                n(p, c);
                break
              }
              else t(p, c);
              c=c.sibling
            }
            c=$o(h, p.mode, T), c.return=p, p=c
          }
          return o(p);
          case Te:return X=h._init, Ce(p, c, X(h._payload), T)
        }
        if(Ct(h))return U(p, c, h, T);
        if(Q(h))return A(p, c, h, T);
        ul(p, h)
      }
      return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h, c!==null&&c.tag===6?(n(p, c.sibling), c=l(c, h), c.return=p, p=c):(n(p, c), c=Po(h, p.mode, T), c.return=p, p=c), o(p)):n(p, c)
    }
    return Ce
  }
  var $n=as(!0), cs=as(!1), sl=Ut(null), al=null, zn=null, Fi=null;
  function Ii(){
    Fi=zn=al=null
  }
  function Wi(e){
    var t=sl.current;
    pe(sl), e._currentValue=t
  }
  function Ui(e, t, n){
    for(;
    e!==null;
    ){
      var r=e.alternate;
      if((e.childLanes&t)!==t?(e.childLanes|=t, r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t), e===n)break;
      e=e.return
    }

  }
  function Rn(e, t){
    al=e, Fi=zn=null, e=e.dependencies, e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(qe=!0), e.firstContext=null)
  }
  function lt(e){
    var t=e._currentValue;
    if(Fi!==e)if(e={
      context:e, memoizedValue:t, next:null
    }, zn===null){
      if(al===null)throw Error(u(308));
      zn=e, al.dependencies={
        lanes:0, firstContext:e
      }

    }
    else zn=zn.next=e;
    return t
  }
  var rn=null;
  function Bi(e){
    rn===null?rn=[e]:rn.push(e)
  }
  function fs(e, t, n, r){
    var l=t.interleaved;
    return l===null?(n.next=n, Bi(t)):(n.next=l.next, l.next=n), t.interleaved=n, Pt(e, r)
  }
  function Pt(e, t){
    e.lanes|=t;
    var n=e.alternate;
    for(n!==null&&(n.lanes|=t), n=e, e=e.return;
    e!==null;
    )e.childLanes|=t, n=e.alternate, n!==null&&(n.childLanes|=t), n=e, e=e.return;
    return n.tag===3?n.stateNode:null
  }
  var Ht=!1;
  function Ai(e){
    e.updateQueue={
      baseState:e.memoizedState, firstBaseUpdate:null, lastBaseUpdate:null, shared:{
        pending:null, interleaved:null, lanes:0
      }, effects:null
    }

  }
  function ds(e, t){
    e=e.updateQueue, t.updateQueue===e&&(t.updateQueue={
      baseState:e.baseState, firstBaseUpdate:e.firstBaseUpdate, lastBaseUpdate:e.lastBaseUpdate, shared:e.shared, effects:e.effects
    })
  }
  function $t(e, t){
    return{
      eventTime:e, lane:t, tag:0, payload:null, callback:null, next:null
    }

  }
  function Vt(e, t, n){
    var r=e.updateQueue;
    if(r===null)return null;
    if(r=r.shared, (ie&2)!==0){
      var l=r.pending;
      return l===null?t.next=t:(t.next=l.next, l.next=t), r.pending=t, Pt(e, n)
    }
    return l=r.interleaved, l===null?(t.next=t, Bi(r)):(t.next=l.next, l.next=t), r.interleaved=t, Pt(e, n)
  }
  function cl(e, t, n){
    if(t=t.updateQueue, t!==null&&(t=t.shared, (n&4194240)!==0)){
      var r=t.lanes;
      r&=e.pendingLanes, n|=r, t.lanes=n, ni(e, n)
    }

  }
  function ps(e, t){
    var n=e.updateQueue, r=e.alternate;
    if(r!==null&&(r=r.updateQueue, n===r)){
      var l=null, i=null;
      if(n=n.firstBaseUpdate, n!==null){
        do{
          var o={
            eventTime:n.eventTime, lane:n.lane, tag:n.tag, payload:n.payload, callback:n.callback, next:null
          };
          i===null?l=i=o:i=i.next=o, n=n.next
        }
        while(n!==null);
        i===null?l=i=t:i=i.next=t
      }
      else l=i=t;
      n={
        baseState:r.baseState, firstBaseUpdate:l, lastBaseUpdate:i, shared:r.shared, effects:r.effects
      }, e.updateQueue=n;
      return
    }
    e=n.lastBaseUpdate, e===null?n.firstBaseUpdate=t:e.next=t, n.lastBaseUpdate=t
  }
  function fl(e, t, n, r){
    var l=e.updateQueue;
    Ht=!1;
    var i=l.firstBaseUpdate, o=l.lastBaseUpdate, s=l.shared.pending;
    if(s!==null){
      l.shared.pending=null;
      var a=s, v=a.next;
      a.next=null, o===null?i=v:o.next=v, o=a;
      var P=e.alternate;
      P!==null&&(P=P.updateQueue, s=P.lastBaseUpdate, s!==o&&(s===null?P.firstBaseUpdate=v:s.next=v, P.lastBaseUpdate=a))
    }
    if(i!==null){
      var z=l.baseState;
      o=0, P=v=a=null, s=i;
      do{
        var j=s.lane, O=s.eventTime;
        if((r&j)===j){
          P!==null&&(P=P.next={
            eventTime:O, lane:0, tag:s.tag, payload:s.payload, callback:s.callback, next:null
          });
          e:{
            var U=e, A=s;
            switch(j=t, O=n, A.tag){
              case 1:if(U=A.payload, typeof U=="function"){
                z=U.call(O, z, j);
                break e
              }
              z=U;
              break e;
              case 3:U.flags=U.flags&-65537|128;
              case 0:if(U=A.payload, j=typeof U=="function"?U.call(O, z, j):U, j==null)break e;
              z=I({

              }, z, j);
              break e;
              case 2:Ht=!0
            }

          }
          s.callback!==null&&s.lane!==0&&(e.flags|=64, j=l.effects, j===null?l.effects=[s]:j.push(s))
        }
        else O={
          eventTime:O, lane:j, tag:s.tag, payload:s.payload, callback:s.callback, next:null
        }, P===null?(v=P=O, a=z):P=P.next=O, o|=j;
        if(s=s.next, s===null){
          if(s=l.shared.pending, s===null)break;
          j=s, s=j.next, j.next=null, l.lastBaseUpdate=j, l.shared.pending=null
        }

      }
      while(!0);
      if(P===null&&(a=z), l.baseState=a, l.firstBaseUpdate=v, l.lastBaseUpdate=P, t=l.shared.interleaved, t!==null){
        l=t;
        do o|=l.lane, l=l.next;
        while(l!==t)
      }
      else i===null&&(l.shared.lanes=0);
      un|=o, e.lanes=o, e.memoizedState=z
    }

  }
  function hs(e, t, n){
    if(e=t.effects, t.effects=null, e!==null)for(t=0;
    t<e.length;
    t++){
      var r=e[t], l=r.callback;
      if(l!==null){
        if(r.callback=null, r=n, typeof l!="function")throw Error(u(191, l));
        l.call(r)
      }

    }

  }
  var hr={

  }, kt=Ut(hr), mr=Ut(hr), vr=Ut(hr);
  function ln(e){
    if(e===hr)throw Error(u(174));
    return e
  }
  function Hi(e, t){
    switch(ce(vr, t), ce(mr, e), ce(kt, hr), e=t.nodeType, e){
      case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Vl(null, "");
      break;
      default:e=e===8?t.parentNode:t, t=e.namespaceURI||null, e=e.tagName, t=Vl(t, e)
    }
    pe(kt), ce(kt, t)
  }
  function Ln(){
    pe(kt), pe(mr), pe(vr)
  }
  function ms(e){
    ln(vr.current);
    var t=ln(kt.current), n=Vl(t, e.type);
    t!==n&&(ce(mr, e), ce(kt, n))
  }
  function Vi(e){
    mr.current===e&&(pe(kt), pe(mr))
  }
  var ge=Ut(0);
  function dl(e){
    for(var t=e;
    t!==null;
    ){
      if(t.tag===13){
        var n=t.memoizedState;
        if(n!==null&&(n=n.dehydrated, n===null||n.data==="$?"||n.data==="$!"))return t
      }
      else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){
        if((t.flags&128)!==0)return t
      }
      else if(t.child!==null){
        t.child.return=t, t=t.child;
        continue
      }
      if(t===e)break;
      for(;
      t.sibling===null;
      ){
        if(t.return===null||t.return===e)return null;
        t=t.return
      }
      t.sibling.return=t.return, t=t.sibling
    }
    return null
  }
  var Qi=[];
  function Xi(){
    for(var e=0;
    e<Qi.length;
    e++)Qi[e]._workInProgressVersionPrimary=null;
    Qi.length=0
  }
  var pl=re.ReactCurrentDispatcher, qi=re.ReactCurrentBatchConfig, on=0, ye=null, je=null, ze=null, hl=!1, gr=!1, yr=0, uf=0;
  function Ie(){
    throw Error(u(321))
  }
  function Ki(e, t){
    if(t===null)return!1;
    for(var n=0;
    n<t.length&&n<e.length;
    n++)if(!at(e[n], t[n]))return!1;
    return!0
  }
  function Yi(e, t, n, r, l, i){
    if(on=i, ye=t, t.memoizedState=null, t.updateQueue=null, t.lanes=0, pl.current=e===null||e.memoizedState===null?ff:df, e=n(r, l), gr){
      i=0;
      do{
        if(gr=!1, yr=0, 25<=i)throw Error(u(301));
        i+=1, ze=je=null, t.updateQueue=null, pl.current=pf, e=n(r, l)
      }
      while(gr)
    }
    if(pl.current=gl, t=je!==null&&je.next!==null, on=0, ze=je=ye=null, hl=!1, t)throw Error(u(300));
    return e
  }
  function Gi(){
    var e=yr!==0;
    return yr=0, e
  }
  function xt(){
    var e={
      memoizedState:null, baseState:null, baseQueue:null, queue:null, next:null
    };
    return ze===null?ye.memoizedState=ze=e:ze=ze.next=e, ze
  }
  function it(){
    if(je===null){
      var e=ye.alternate;
      e=e!==null?e.memoizedState:null
    }
    else e=je.next;
    var t=ze===null?ye.memoizedState:ze.next;
    if(t!==null)ze=t, je=e;
    else{
      if(e===null)throw Error(u(310));
      je=e, e={
        memoizedState:je.memoizedState, baseState:je.baseState, baseQueue:je.baseQueue, queue:je.queue, next:null
      }, ze===null?ye.memoizedState=ze=e:ze=ze.next=e
    }
    return ze
  }
  function wr(e, t){
    return typeof t=="function"?t(e):t
  }
  function Zi(e){
    var t=it(), n=t.queue;
    if(n===null)throw Error(u(311));
    n.lastRenderedReducer=e;
    var r=je, l=r.baseQueue, i=n.pending;
    if(i!==null){
      if(l!==null){
        var o=l.next;
        l.next=i.next, i.next=o
      }
      r.baseQueue=l=i, n.pending=null
    }
    if(l!==null){
      i=l.next, r=r.baseState;
      var s=o=null, a=null, v=i;
      do{
        var P=v.lane;
        if((on&P)===P)a!==null&&(a=a.next={
          lane:0, action:v.action, hasEagerState:v.hasEagerState, eagerState:v.eagerState, next:null
        }), r=v.hasEagerState?v.eagerState:e(r, v.action);
        else{
          var z={
            lane:P, action:v.action, hasEagerState:v.hasEagerState, eagerState:v.eagerState, next:null
          };
          a===null?(s=a=z, o=r):a=a.next=z, ye.lanes|=P, un|=P
        }
        v=v.next
      }
      while(v!==null&&v!==i);
      a===null?o=r:a.next=s, at(r, t.memoizedState)||(qe=!0), t.memoizedState=r, t.baseState=o, t.baseQueue=a, n.lastRenderedState=r
    }
    if(e=n.interleaved, e!==null){
      l=e;
      do i=l.lane, ye.lanes|=i, un|=i, l=l.next;
      while(l!==e)
    }
    else l===null&&(n.lanes=0);
    return[t.memoizedState, n.dispatch]
  }
  function Ji(e){
    var t=it(), n=t.queue;
    if(n===null)throw Error(u(311));
    n.lastRenderedReducer=e;
    var r=n.dispatch, l=n.pending, i=t.memoizedState;
    if(l!==null){
      n.pending=null;
      var o=l=l.next;
      do i=e(i, o.action), o=o.next;
      while(o!==l);
      at(i, t.memoizedState)||(qe=!0), t.memoizedState=i, t.baseQueue===null&&(t.baseState=i), n.lastRenderedState=i
    }
    return[i, r]
  }
  function vs(){

  }
  function gs(e, t){
    var n=ye, r=it(), l=t(), i=!at(r.memoizedState, l);
    if(i&&(r.memoizedState=l, qe=!0), r=r.queue, bi(ks.bind(null, n, r, e), [e]), r.getSnapshot!==t||i||ze!==null&&ze.memoizedState.tag&1){
      if(n.flags|=2048, kr(9, ws.bind(null, n, r, l, t), void 0, null), Re===null)throw Error(u(349));
      (on&30)!==0||ys(n, t, l)
    }
    return l
  }
  function ys(e, t, n){
    e.flags|=16384, e={
      getSnapshot:t, value:n
    }, t=ye.updateQueue, t===null?(t={
      lastEffect:null, stores:null
    }, ye.updateQueue=t, t.stores=[e]):(n=t.stores, n===null?t.stores=[e]:n.push(e))
  }
  function ws(e, t, n, r){
    t.value=n, t.getSnapshot=r, xs(t)&&Ss(e)
  }
  function ks(e, t, n){
    return n(function(){
      xs(t)&&Ss(e)
    })
  }
  function xs(e){
    var t=e.getSnapshot;
    e=e.value;
    try{
      var n=t();
      return!at(e, n)
    }
    catch{
      return!0
    }

  }
  function Ss(e){
    var t=Pt(e, 1);
    t!==null&&ht(t, e, 1, -1)
  }
  function Cs(e){
    var t=xt();
    return typeof e=="function"&&(e=e()), t.memoizedState=t.baseState=e, e={
      pending:null, interleaved:null, lanes:0, dispatch:null, lastRenderedReducer:wr, lastRenderedState:e
    }, t.queue=e, e=e.dispatch=cf.bind(null, ye, e), [t.memoizedState, e]
  }
  function kr(e, t, n, r){
    return e={
      tag:e, create:t, destroy:n, deps:r, next:null
    }, t=ye.updateQueue, t===null?(t={
      lastEffect:null, stores:null
    }, ye.updateQueue=t, t.lastEffect=e.next=e):(n=t.lastEffect, n===null?t.lastEffect=e.next=e:(r=n.next, n.next=e, e.next=r, t.lastEffect=e)), e
  }
  function Es(){
    return it().memoizedState
  }
  function ml(e, t, n, r){
    var l=xt();
    ye.flags|=e, l.memoizedState=kr(1|t, n, void 0, r===void 0?null:r)
  }
  function vl(e, t, n, r){
    var l=it();
    r=r===void 0?null:r;
    var i=void 0;
    if(je!==null){
      var o=je.memoizedState;
      if(i=o.destroy, r!==null&&Ki(r, o.deps)){
        l.memoizedState=kr(t, n, i, r);
        return
      }

    }
    ye.flags|=e, l.memoizedState=kr(1|t, n, i, r)
  }
  function Ns(e, t){
    return ml(8390656, 8, e, t)
  }
  function bi(e, t){
    return vl(2048, 8, e, t)
  }
  function _s(e, t){
    return vl(4, 2, e, t)
  }
  function js(e, t){
    return vl(4, 4, e, t)
  }
  function Ps(e, t){
    if(typeof t=="function")return e=e(), t(e), function(){
      t(null)
    };
    if(t!=null)return e=e(), t.current=e, function(){
      t.current=null
    }

  }
  function $s(e, t, n){
    return n=n!=null?n.concat([e]):null, vl(4, 4, Ps.bind(null, t, e), n)
  }
  function eo(){

  }
  function zs(e, t){
    var n=it();
    t=t===void 0?null:t;
    var r=n.memoizedState;
    return r!==null&&t!==null&&Ki(t, r[1])?r[0]:(n.memoizedState=[e, t], e)
  }
  function Rs(e, t){
    var n=it();
    t=t===void 0?null:t;
    var r=n.memoizedState;
    return r!==null&&t!==null&&Ki(t, r[1])?r[0]:(e=e(), n.memoizedState=[e, t], e)
  }
  function Ls(e, t, n){
    return(on&21)===0?(e.baseState&&(e.baseState=!1, qe=!0), e.memoizedState=n):(at(n, t)||(n=su(), ye.lanes|=n, un|=n, e.baseState=!0), t)
  }
  function sf(e, t){
    var n=ue;
    ue=n!==0&&4>n?n:4, e(!0);
    var r=qi.transition;
    qi.transition={

    };
    try{
      e(!1), t()
    }
    finally{
      ue=n, qi.transition=r
    }

  }
  function Ts(){
    return it().memoizedState
  }
  function af(e, t, n){
    var r=Kt(e);
    if(n={
      lane:r, action:n, hasEagerState:!1, eagerState:null, next:null
    }, Ms(e))Ds(t, n);
    else if(n=fs(e, t, n, r), n!==null){
      var l=He();
      ht(n, e, r, l), Os(n, t, r)
    }

  }
  function cf(e, t, n){
    var r=Kt(e), l={
      lane:r, action:n, hasEagerState:!1, eagerState:null, next:null
    };
    if(Ms(e))Ds(t, l);
    else{
      var i=e.alternate;
      if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer, i!==null))try{
        var o=t.lastRenderedState, s=i(o, n);
        if(l.hasEagerState=!0, l.eagerState=s, at(s, o)){
          var a=t.interleaved;
          a===null?(l.next=l, Bi(t)):(l.next=a.next, a.next=l), t.interleaved=l;
          return
        }

      }
      catch{

      }
      n=fs(e, t, l, r), n!==null&&(l=He(), ht(n, e, r, l), Os(n, t, r))
    }

  }
  function Ms(e){
    var t=e.alternate;
    return e===ye||t!==null&&t===ye
  }
  function Ds(e, t){
    gr=hl=!0;
    var n=e.pending;
    n===null?t.next=t:(t.next=n.next, n.next=t), e.pending=t
  }
  function Os(e, t, n){
    if((n&4194240)!==0){
      var r=t.lanes;
      r&=e.pendingLanes, n|=r, t.lanes=n, ni(e, n)
    }

  }
  var gl={
    readContext:lt, useCallback:Ie, useContext:Ie, useEffect:Ie, useImperativeHandle:Ie, useInsertionEffect:Ie, useLayoutEffect:Ie, useMemo:Ie, useReducer:Ie, useRef:Ie, useState:Ie, useDebugValue:Ie, useDeferredValue:Ie, useTransition:Ie, useMutableSource:Ie, useSyncExternalStore:Ie, useId:Ie, unstable_isNewReconciler:!1
  }, ff={
    readContext:lt, useCallback:function(e, t){
      return xt().memoizedState=[e, t===void 0?null:t], e
    }, useContext:lt, useEffect:Ns, useImperativeHandle:function(e, t, n){
      return n=n!=null?n.concat([e]):null, ml(4194308, 4, Ps.bind(null, t, e), n)
    }, useLayoutEffect:function(e, t){
      return ml(4194308, 4, e, t)
    }, useInsertionEffect:function(e, t){
      return ml(4, 2, e, t)
    }, useMemo:function(e, t){
      var n=xt();
      return t=t===void 0?null:t, e=e(), n.memoizedState=[e, t], e
    }, useReducer:function(e, t, n){
      var r=xt();
      return t=n!==void 0?n(t):t, r.memoizedState=r.baseState=t, e={
        pending:null, interleaved:null, lanes:0, dispatch:null, lastRenderedReducer:e, lastRenderedState:t
      }, r.queue=e, e=e.dispatch=af.bind(null, ye, e), [r.memoizedState, e]
    }, useRef:function(e){
      var t=xt();
      return e={
        current:e
      }, t.memoizedState=e
    }, useState:Cs, useDebugValue:eo, useDeferredValue:function(e){
      return xt().memoizedState=e
    }, useTransition:function(){
      var e=Cs(!1), t=e[0];
      return e=sf.bind(null, e[1]), xt().memoizedState=e, [t, e]
    }, useMutableSource:function(){

    }, useSyncExternalStore:function(e, t, n){
      var r=ye, l=xt();
      if(ve){
        if(n===void 0)throw Error(u(407));
        n=n()
      }
      else{
        if(n=t(), Re===null)throw Error(u(349));
        (on&30)!==0||ys(r, t, n)
      }
      l.memoizedState=n;
      var i={
        value:n, getSnapshot:t
      };
      return l.queue=i, Ns(ks.bind(null, r, i, e), [e]), r.flags|=2048, kr(9, ws.bind(null, r, i, n, t), void 0, null), n
    }, useId:function(){
      var e=xt(), t=Re.identifierPrefix;
      if(ve){
        var n=jt, r=_t;
        n=(r&~(1<<32-st(r)-1)).toString(32)+n, t=":"+t+"R"+n, n=yr++, 0<n&&(t+="H"+n.toString(32)), t+=":"
      }
      else n=uf++, t=":"+t+"r"+n.toString(32)+":";
      return e.memoizedState=t
    }, unstable_isNewReconciler:!1
  }, df={
    readContext:lt, useCallback:zs, useContext:lt, useEffect:bi, useImperativeHandle:$s, useInsertionEffect:_s, useLayoutEffect:js, useMemo:Rs, useReducer:Zi, useRef:Es, useState:function(){
      return Zi(wr)
    }, useDebugValue:eo, useDeferredValue:function(e){
      var t=it();
      return Ls(t, je.memoizedState, e)
    }, useTransition:function(){
      var e=Zi(wr)[0], t=it().memoizedState;
      return[e, t]
    }, useMutableSource:vs, useSyncExternalStore:gs, useId:Ts, unstable_isNewReconciler:!1
  }, pf={
    readContext:lt, useCallback:zs, useContext:lt, useEffect:bi, useImperativeHandle:$s, useInsertionEffect:_s, useLayoutEffect:js, useMemo:Rs, useReducer:Ji, useRef:Es, useState:function(){
      return Ji(wr)
    }, useDebugValue:eo, useDeferredValue:function(e){
      var t=it();
      return je===null?t.memoizedState=e:Ls(t, je.memoizedState, e)
    }, useTransition:function(){
      var e=Ji(wr)[0], t=it().memoizedState;
      return[e, t]
    }, useMutableSource:vs, useSyncExternalStore:gs, useId:Ts, unstable_isNewReconciler:!1
  };
  function ft(e, t){
    if(e&&e.defaultProps){
      t=I({

      }, t), e=e.defaultProps;
      for(var n in e)t[n]===void 0&&(t[n]=e[n]);
      return t
    }
    return t
  }
  function to(e, t, n, r){
    t=e.memoizedState, n=n(r, t), n=n==null?t:I({

    }, t, n), e.memoizedState=n, e.lanes===0&&(e.updateQueue.baseState=n)
  }
  var yl={
    isMounted:function(e){
      return(e=e._reactInternals)?Jt(e)===e:!1
    }, enqueueSetState:function(e, t, n){
      e=e._reactInternals;
      var r=He(), l=Kt(e), i=$t(r, l);
      i.payload=t, n!=null&&(i.callback=n), t=Vt(e, i, l), t!==null&&(ht(t, e, l, r), cl(t, e, l))
    }, enqueueReplaceState:function(e, t, n){
      e=e._reactInternals;
      var r=He(), l=Kt(e), i=$t(r, l);
      i.tag=1, i.payload=t, n!=null&&(i.callback=n), t=Vt(e, i, l), t!==null&&(ht(t, e, l, r), cl(t, e, l))
    }, enqueueForceUpdate:function(e, t){
      e=e._reactInternals;
      var n=He(), r=Kt(e), l=$t(n, r);
      l.tag=2, t!=null&&(l.callback=t), t=Vt(e, l, r), t!==null&&(ht(t, e, r, n), cl(t, e, r))
    }

  };
  function Fs(e, t, n, r, l, i, o){
    return e=e.stateNode, typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r, i, o):t.prototype&&t.prototype.isPureReactComponent?!or(n, r)||!or(l, i):!0
  }
  function Is(e, t, n){
    var r=!1, l=Bt, i=t.contextType;
    return typeof i=="object"&&i!==null?i=lt(i):(l=Xe(t)?en:Fe.current, r=t.contextTypes, i=(r=r!=null)?Nn(e, l):Bt), t=new t(n, i), e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null, t.updater=yl, e.stateNode=t, t._reactInternals=e, r&&(e=e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext=l, e.__reactInternalMemoizedMaskedChildContext=i), t
  }
  function Ws(e, t, n, r){
    e=t.state, typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n, r), t.state!==e&&yl.enqueueReplaceState(t, t.state, null)
  }
  function no(e, t, n, r){
    var l=e.stateNode;
    l.props=n, l.state=e.memoizedState, l.refs={

    }, Ai(e);
    var i=t.contextType;
    typeof i=="object"&&i!==null?l.context=lt(i):(i=Xe(t)?en:Fe.current, l.context=Nn(e, i)), l.state=e.memoizedState, i=t.getDerivedStateFromProps, typeof i=="function"&&(to(e, t, i, n), l.state=e.memoizedState), typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state, typeof l.componentWillMount=="function"&&l.componentWillMount(), typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(), t!==l.state&&yl.enqueueReplaceState(l, l.state, null), fl(e, n, l, r), l.state=e.memoizedState), typeof l.componentDidMount=="function"&&(e.flags|=4194308)
  }
  function Tn(e, t){
    try{
      var n="", r=t;
      do n+=$(r), r=r.return;
      while(r);
      var l=n
    }
    catch(i){
      l=`
Error generating stack: `+i.message+`
`+i.stack
    }
    return{
      value:e, source:t, stack:l, digest:null
    }

  }
  function ro(e, t, n){
    return{
      value:e, source:null, stack:n??null, digest:t??null
    }

  }
  function lo(e, t){
    try{
      console.error(t.value)
    }
    catch(n){
      setTimeout(function(){
        throw n
      })
    }

  }
  var hf=typeof WeakMap=="function"?WeakMap:Map;
  function Us(e, t, n){
    n=$t(-1, n), n.tag=3, n.payload={
      element:null
    };
    var r=t.value;
    return n.callback=function(){
      Nl||(Nl=!0, ko=r), lo(e, t)
    }, n
  }
  function Bs(e, t, n){
    n=$t(-1, n), n.tag=3;
    var r=e.type.getDerivedStateFromError;
    if(typeof r=="function"){
      var l=t.value;
      n.payload=function(){
        return r(l)
      }, n.callback=function(){
        lo(e, t)
      }

    }
    var i=e.stateNode;
    return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){
      lo(e, t), typeof r!="function"&&(Xt===null?Xt=new Set([this]):Xt.add(this));
      var o=t.stack;
      this.componentDidCatch(t.value, {
        componentStack:o!==null?o:""
      })
    }), n
  }
  function As(e, t, n){
    var r=e.pingCache;
    if(r===null){
      r=e.pingCache=new hf;
      var l=new Set;
      r.set(t, l)
    }
    else l=r.get(t), l===void 0&&(l=new Set, r.set(t, l));
    l.has(n)||(l.add(n), e=Pf.bind(null, e, t, n), t.then(e, e))
  }
  function Hs(e){
    do{
      var t;
      if((t=e.tag===13)&&(t=e.memoizedState, t=t!==null?t.dehydrated!==null:!0), t)return e;
      e=e.return
    }
    while(e!==null);
    return null
  }
  function Vs(e, t, n, r, l){
    return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128, n.flags|=131072, n.flags&=-52805, n.tag===1&&(n.alternate===null?n.tag=17:(t=$t(-1, 1), t.tag=2, Vt(n, t, 1))), n.lanes|=1), e):(e.flags|=65536, e.lanes=l, e)
  }
  var mf=re.ReactCurrentOwner, qe=!1;
  function Ae(e, t, n, r){
    t.child=e===null?cs(t, null, n, r):$n(t, e.child, n, r)
  }
  function Qs(e, t, n, r, l){
    n=n.render;
    var i=t.ref;
    return Rn(t, l), r=Yi(e, t, n, r, i, l), n=Gi(), e!==null&&!qe?(t.updateQueue=e.updateQueue, t.flags&=-2053, e.lanes&=~l, zt(e, t, l)):(ve&&n&&Li(t), t.flags|=1, Ae(e, t, r, l), t.child)
  }
  function Xs(e, t, n, r, l){
    if(e===null){
      var i=n.type;
      return typeof i=="function"&&!jo(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15, t.type=i, qs(e, t, i, r, l)):(e=Rl(n.type, null, r, t, t.mode, l), e.ref=t.ref, e.return=t, t.child=e)
    }
    if(i=e.child, (e.lanes&l)===0){
      var o=i.memoizedProps;
      if(n=n.compare, n=n!==null?n:or, n(o, r)&&e.ref===t.ref)return zt(e, t, l)
    }
    return t.flags|=1, e=Gt(i, r), e.ref=t.ref, e.return=t, t.child=e
  }
  function qs(e, t, n, r, l){
    if(e!==null){
      var i=e.memoizedProps;
      if(or(i, r)&&e.ref===t.ref)if(qe=!1, t.pendingProps=r=i, (e.lanes&l)!==0)(e.flags&131072)!==0&&(qe=!0);
      else return t.lanes=e.lanes, zt(e, t, l)
    }
    return io(e, t, n, r, l)
  }
  function Ks(e, t, n){
    var r=t.pendingProps, l=r.children, i=e!==null?e.memoizedState:null;
    if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={
      baseLanes:0, cachePool:null, transitions:null
    }, ce(Dn, tt), tt|=n;
    else{
      if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n, t.lanes=t.childLanes=1073741824, t.memoizedState={
        baseLanes:e, cachePool:null, transitions:null
      }, t.updateQueue=null, ce(Dn, tt), tt|=e, null;
      t.memoizedState={
        baseLanes:0, cachePool:null, transitions:null
      }, r=i!==null?i.baseLanes:n, ce(Dn, tt), tt|=r
    }
    else i!==null?(r=i.baseLanes|n, t.memoizedState=null):r=n, ce(Dn, tt), tt|=r;
    return Ae(e, t, l, n), t.child
  }
  function Ys(e, t){
    var n=t.ref;
    (e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512, t.flags|=2097152)
  }
  function io(e, t, n, r, l){
    var i=Xe(n)?en:Fe.current;
    return i=Nn(t, i), Rn(t, l), n=Yi(e, t, n, r, i, l), r=Gi(), e!==null&&!qe?(t.updateQueue=e.updateQueue, t.flags&=-2053, e.lanes&=~l, zt(e, t, l)):(ve&&r&&Li(t), t.flags|=1, Ae(e, t, n, l), t.child)
  }
  function Gs(e, t, n, r, l){
    if(Xe(n)){
      var i=!0;
      nl(t)
    }
    else i=!1;
    if(Rn(t, l), t.stateNode===null)kl(e, t), Is(t, n, r), no(t, n, r, l), r=!0;
    else if(e===null){
      var o=t.stateNode, s=t.memoizedProps;
      o.props=s;
      var a=o.context, v=n.contextType;
      typeof v=="object"&&v!==null?v=lt(v):(v=Xe(n)?en:Fe.current, v=Nn(t, v));
      var P=n.getDerivedStateFromProps, z=typeof P=="function"||typeof o.getSnapshotBeforeUpdate=="function";
      z||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||a!==v)&&Ws(t, o, r, v), Ht=!1;
      var j=t.memoizedState;
      o.state=j, fl(t, r, o, l), a=t.memoizedState, s!==r||j!==a||Qe.current||Ht?(typeof P=="function"&&(to(t, n, P, r), a=t.memoizedState), (s=Ht||Fs(t, n, s, r, j, a, v))?(z||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(), typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()), typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308), t.memoizedProps=r, t.memoizedState=a), o.props=r, o.state=a, o.context=v, r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308), r=!1)
    }
    else{
      o=t.stateNode, ds(e, t), s=t.memoizedProps, v=t.type===t.elementType?s:ft(t.type, s), o.props=v, z=t.pendingProps, j=o.context, a=n.contextType, typeof a=="object"&&a!==null?a=lt(a):(a=Xe(n)?en:Fe.current, a=Nn(t, a));
      var O=n.getDerivedStateFromProps;
      (P=typeof O=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==z||j!==a)&&Ws(t, o, r, a), Ht=!1, j=t.memoizedState, o.state=j, fl(t, r, o, l);
      var U=t.memoizedState;
      s!==z||j!==U||Qe.current||Ht?(typeof O=="function"&&(to(t, n, O, r), U=t.memoizedState), (v=Ht||Fs(t, n, v, r, j, U, a)||!1)?(P||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r, U, a), typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r, U, a)), typeof o.componentDidUpdate=="function"&&(t.flags|=4), typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&j===e.memoizedState||(t.flags|=4), typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024), t.memoizedProps=r, t.memoizedState=U), o.props=r, o.state=U, o.context=a, r=v):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&j===e.memoizedState||(t.flags|=4), typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024), r=!1)
    }
    return oo(e, t, n, r, i, l)
  }
  function oo(e, t, n, r, l, i){
    Ys(e, t);
    var o=(t.flags&128)!==0;
    if(!r&&!o)return l&&ts(t, n, !1), zt(e, t, i);
    r=t.stateNode, mf.current=t;
    var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();
    return t.flags|=1, e!==null&&o?(t.child=$n(t, e.child, null, i), t.child=$n(t, null, s, i)):Ae(e, t, s, i), t.memoizedState=r.state, l&&ts(t, n, !0), t.child
  }
  function Zs(e){
    var t=e.stateNode;
    t.pendingContext?bu(e, t.pendingContext, t.pendingContext!==t.context):t.context&&bu(e, t.context, !1), Hi(e, t.containerInfo)
  }
  function Js(e, t, n, r, l){
    return Pn(), Oi(l), t.flags|=256, Ae(e, t, n, r), t.child
  }
  var uo={
    dehydrated:null, treeContext:null, retryLane:0
  };
  function so(e){
    return{
      baseLanes:e, cachePool:null, transitions:null
    }

  }
  function bs(e, t, n){
    var r=t.pendingProps, l=ge.current, i=!1, o=(t.flags&128)!==0, s;
    if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(l&2)!==0), s?(i=!0, t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1), ce(ge, l&1), e===null)return Di(t), e=t.memoizedState, e!==null&&(e=e.dehydrated, e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824, null):(o=r.children, e=r.fallback, i?(r=t.mode, i=t.child, o={
      mode:"hidden", children:o
    }, (r&1)===0&&i!==null?(i.childLanes=0, i.pendingProps=o):i=Ll(o, r, 0, null), e=fn(e, r, n, null), i.return=t, e.return=t, i.sibling=e, t.child=i, t.child.memoizedState=so(n), t.memoizedState=uo, e):ao(t, o));
    if(l=e.memoizedState, l!==null&&(s=l.dehydrated, s!==null))return vf(e, t, o, r, s, l, n);
    if(i){
      i=r.fallback, o=t.mode, l=e.child, s=l.sibling;
      var a={
        mode:"hidden", children:r.children
      };
      return(o&1)===0&&t.child!==l?(r=t.child, r.childLanes=0, r.pendingProps=a, t.deletions=null):(r=Gt(l, a), r.subtreeFlags=l.subtreeFlags&14680064), s!==null?i=Gt(s, i):(i=fn(i, o, n, null), i.flags|=2), i.return=t, r.return=t, r.sibling=i, t.child=r, r=i, i=t.child, o=e.child.memoizedState, o=o===null?so(n):{
        baseLanes:o.baseLanes|n, cachePool:null, transitions:o.transitions
      }, i.memoizedState=o, i.childLanes=e.childLanes&~n, t.memoizedState=uo, r
    }
    return i=e.child, e=i.sibling, r=Gt(i, {
      mode:"visible", children:r.children
    }), (t.mode&1)===0&&(r.lanes=n), r.return=t, r.sibling=null, e!==null&&(n=t.deletions, n===null?(t.deletions=[e], t.flags|=16):n.push(e)), t.child=r, t.memoizedState=null, r
  }
  function ao(e, t){
    return t=Ll({
      mode:"visible", children:t
    }, e.mode, 0, null), t.return=e, e.child=t
  }
  function wl(e, t, n, r){
    return r!==null&&Oi(r), $n(t, e.child, null, n), e=ao(t, t.pendingProps.children), e.flags|=2, t.memoizedState=null, e
  }
  function vf(e, t, n, r, l, i, o){
    if(n)return t.flags&256?(t.flags&=-257, r=ro(Error(u(422))), wl(e, t, o, r)):t.memoizedState!==null?(t.child=e.child, t.flags|=128, null):(i=r.fallback, l=t.mode, r=Ll({
      mode:"visible", children:r.children
    }, l, 0, null), i=fn(i, l, o, null), i.flags|=2, r.return=t, i.return=t, r.sibling=i, t.child=r, (t.mode&1)!==0&&$n(t, e.child, null, o), t.child.memoizedState=so(o), t.memoizedState=uo, i);
    if((t.mode&1)===0)return wl(e, t, o, null);
    if(l.data==="$!"){
      if(r=l.nextSibling&&l.nextSibling.dataset, r)var s=r.dgst;
      return r=s, i=Error(u(419)), r=ro(i, r, void 0), wl(e, t, o, r)
    }
    if(s=(o&e.childLanes)!==0, qe||s){
      if(r=Re, r!==null){
        switch(o&-o){
          case 4:l=2;
          break;
          case 16:l=8;
          break;
          case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;
          break;
          case 536870912:l=268435456;
          break;
          default:l=0
        }
        l=(l&(r.suspendedLanes|o))!==0?0:l, l!==0&&l!==i.retryLane&&(i.retryLane=l, Pt(e, l), ht(r, e, l, -1))
      }
      return _o(), r=ro(Error(u(421))), wl(e, t, o, r)
    }
    return l.data==="$?"?(t.flags|=128, t.child=e.child, t=$f.bind(null, e), l._reactRetry=t, null):(e=i.treeContext, et=Wt(l.nextSibling), be=t, ve=!0, ct=null, e!==null&&(nt[rt++]=_t, nt[rt++]=jt, nt[rt++]=tn, _t=e.id, jt=e.overflow, tn=t), t=ao(t, r.children), t.flags|=4096, t)
  }
  function ea(e, t, n){
    e.lanes|=t;
    var r=e.alternate;
    r!==null&&(r.lanes|=t), Ui(e.return, t, n)
  }
  function co(e, t, n, r, l){
    var i=e.memoizedState;
    i===null?e.memoizedState={
      isBackwards:t, rendering:null, renderingStartTime:0, last:r, tail:n, tailMode:l
    }:(i.isBackwards=t, i.rendering=null, i.renderingStartTime=0, i.last=r, i.tail=n, i.tailMode=l)
  }
  function ta(e, t, n){
    var r=t.pendingProps, l=r.revealOrder, i=r.tail;
    if(Ae(e, t, r.children, n), r=ge.current, (r&2)!==0)r=r&1|2, t.flags|=128;
    else{
      if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;
      e!==null;
      ){
        if(e.tag===13)e.memoizedState!==null&&ea(e, n, t);
        else if(e.tag===19)ea(e, n, t);
        else if(e.child!==null){
          e.child.return=e, e=e.child;
          continue
        }
        if(e===t)break e;
        for(;
        e.sibling===null;
        ){
          if(e.return===null||e.return===t)break e;
          e=e.return
        }
        e.sibling.return=e.return, e=e.sibling
      }
      r&=1
    }
    if(ce(ge, r), (t.mode&1)===0)t.memoizedState=null;
    else switch(l){
      case"forwards":for(n=t.child, l=null;
      n!==null;
      )e=n.alternate, e!==null&&dl(e)===null&&(l=n), n=n.sibling;
      n=l, n===null?(l=t.child, t.child=null):(l=n.sibling, n.sibling=null), co(t, !1, l, n, i);
      break;
      case"backwards":for(n=null, l=t.child, t.child=null;
      l!==null;
      ){
        if(e=l.alternate, e!==null&&dl(e)===null){
          t.child=l;
          break
        }
        e=l.sibling, l.sibling=n, n=l, l=e
      }
      co(t, !0, n, null, i);
      break;
      case"together":co(t, !1, null, null, void 0);
      break;
      default:t.memoizedState=null
    }
    return t.child
  }
  function kl(e, t){
    (t.mode&1)===0&&e!==null&&(e.alternate=null, t.alternate=null, t.flags|=2)
  }
  function zt(e, t, n){
    if(e!==null&&(t.dependencies=e.dependencies), un|=t.lanes, (n&t.childLanes)===0)return null;
    if(e!==null&&t.child!==e.child)throw Error(u(153));
    if(t.child!==null){
      for(e=t.child, n=Gt(e, e.pendingProps), t.child=n, n.return=t;
      e.sibling!==null;
      )e=e.sibling, n=n.sibling=Gt(e, e.pendingProps), n.return=t;
      n.sibling=null
    }
    return t.child
  }
  function gf(e, t, n){
    switch(t.tag){
      case 3:Zs(t), Pn();
      break;
      case 5:ms(t);
      break;
      case 1:Xe(t.type)&&nl(t);
      break;
      case 4:Hi(t, t.stateNode.containerInfo);
      break;
      case 10:var r=t.type._context, l=t.memoizedProps.value;
      ce(sl, r._currentValue), r._currentValue=l;
      break;
      case 13:if(r=t.memoizedState, r!==null)return r.dehydrated!==null?(ce(ge, ge.current&1), t.flags|=128, null):(n&t.child.childLanes)!==0?bs(e, t, n):(ce(ge, ge.current&1), e=zt(e, t, n), e!==null?e.sibling:null);
      ce(ge, ge.current&1);
      break;
      case 19:if(r=(n&t.childLanes)!==0, (e.flags&128)!==0){
        if(r)return ta(e, t, n);
        t.flags|=128
      }
      if(l=t.memoizedState, l!==null&&(l.rendering=null, l.tail=null, l.lastEffect=null), ce(ge, ge.current), r)break;
      return null;
      case 22:case 23:return t.lanes=0, Ks(e, t, n)
    }
    return zt(e, t, n)
  }
  var na, fo, ra, la;
  na=function(e, t){
    for(var n=t.child;
    n!==null;
    ){
      if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);
      else if(n.tag!==4&&n.child!==null){
        n.child.return=n, n=n.child;
        continue
      }
      if(n===t)break;
      for(;
      n.sibling===null;
      ){
        if(n.return===null||n.return===t)return;
        n=n.return
      }
      n.sibling.return=n.return, n=n.sibling
    }

  }, fo=function(){

  }, ra=function(e, t, n, r){
    var l=e.memoizedProps;
    if(l!==r){
      e=t.stateNode, ln(kt.current);
      var i=null;
      switch(n){
        case"input":l=Un(e, l), r=Un(e, r), i=[];
        break;
        case"select":l=I({

        }, l, {
          value:void 0
        }), r=I({

        }, r, {
          value:void 0
        }), i=[];
        break;
        case"textarea":l=gt(e, l), r=gt(e, r), i=[];
        break;
        default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=br)
      }
      Ql(n, r);
      var o;
      n=null;
      for(v in l)if(!r.hasOwnProperty(v)&&l.hasOwnProperty(v)&&l[v]!=null)if(v==="style"){
        var s=l[v];
        for(o in s)s.hasOwnProperty(o)&&(n||(n={

        }), n[o]="")
      }
      else v!=="dangerouslySetInnerHTML"&&v!=="children"&&v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&v!=="autoFocus"&&(f.hasOwnProperty(v)?i||(i=[]):(i=i||[]).push(v, null));
      for(v in r){
        var a=r[v];
        if(s=l?.[v], r.hasOwnProperty(v)&&a!==s&&(a!=null||s!=null))if(v==="style")if(s){
          for(o in s)!s.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(n||(n={

          }), n[o]="");
          for(o in a)a.hasOwnProperty(o)&&s[o]!==a[o]&&(n||(n={

          }), n[o]=a[o])
        }
        else n||(i||(i=[]), i.push(v, n)), n=a;
        else v==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0, s=s?s.__html:void 0, a!=null&&s!==a&&(i=i||[]).push(v, a)):v==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(v, ""+a):v!=="suppressContentEditableWarning"&&v!=="suppressHydrationWarning"&&(f.hasOwnProperty(v)?(a!=null&&v==="onScroll"&&de("scroll", e), i||s===a||(i=[])):(i=i||[]).push(v, a))
      }
      n&&(i=i||[]).push("style", n);
      var v=i;
      (t.updateQueue=v)&&(t.flags|=4)
    }

  }, la=function(e, t, n, r){
    n!==r&&(t.flags|=4)
  };
  function xr(e, t){
    if(!ve)switch(e.tailMode){
      case"hidden":t=e.tail;
      for(var n=null;
      t!==null;
      )t.alternate!==null&&(n=t), t=t.sibling;
      n===null?e.tail=null:n.sibling=null;
      break;
      case"collapsed":n=e.tail;
      for(var r=null;
      n!==null;
      )n.alternate!==null&&(r=n), n=n.sibling;
      r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null
    }

  }
  function We(e){
    var t=e.alternate!==null&&e.alternate.child===e.child, n=0, r=0;
    if(t)for(var l=e.child;
    l!==null;
    )n|=l.lanes|l.childLanes, r|=l.subtreeFlags&14680064, r|=l.flags&14680064, l.return=e, l=l.sibling;
    else for(l=e.child;
    l!==null;
    )n|=l.lanes|l.childLanes, r|=l.subtreeFlags, r|=l.flags, l.return=e, l=l.sibling;
    return e.subtreeFlags|=r, e.childLanes=n, t
  }
  function yf(e, t, n){
    var r=t.pendingProps;
    switch(Ti(t), t.tag){
      case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return We(t), null;
      case 1:return Xe(t.type)&&tl(), We(t), null;
      case 3:return r=t.stateNode, Ln(), pe(Qe), pe(Fe), Xi(), r.pendingContext&&(r.context=r.pendingContext, r.pendingContext=null), (e===null||e.child===null)&&(ol(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024, ct!==null&&(Co(ct), ct=null))), fo(e, t), We(t), null;
      case 5:Vi(t);
      var l=ln(vr.current);
      if(n=t.type, e!==null&&t.stateNode!=null)ra(e, t, n, r, l), e.ref!==t.ref&&(t.flags|=512, t.flags|=2097152);
      else{
        if(!r){
          if(t.stateNode===null)throw Error(u(166));
          return We(t), null
        }
        if(e=ln(kt.current), ol(t)){
          r=t.stateNode, n=t.type;
          var i=t.memoizedProps;
          switch(r[wt]=t, r[fr]=i, e=(t.mode&1)!==0, n){
            case"dialog":de("cancel", r), de("close", r);
            break;
            case"iframe":case"object":case"embed":de("load", r);
            break;
            case"video":case"audio":for(l=0;
            l<sr.length;
            l++)de(sr[l], r);
            break;
            case"source":de("error", r);
            break;
            case"img":case"image":case"link":de("error", r), de("load", r);
            break;
            case"details":de("toggle", r);
            break;
            case"input":Pr(r, i), de("invalid", r);
            break;
            case"select":r._wrapperState={
              wasMultiple:!!i.multiple
            }, de("invalid", r);
            break;
            case"textarea":Bo(r, i), de("invalid", r)
          }
          Ql(n, i), l=null;
          for(var o in i)if(i.hasOwnProperty(o)){
            var s=i[o];
            o==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&Jr(r.textContent, s, e), l=["children", s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&Jr(r.textContent, s, e), l=["children", ""+s]):f.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&de("scroll", r)
          }
          switch(n){
            case"input":we(r), zr(r, i, !0);
            break;
            case"textarea":we(r), Ho(r);
            break;
            case"select":case"option":break;
            default:typeof i.onClick=="function"&&(r.onclick=br)
          }
          r=l, t.updateQueue=r, r!==null&&(t.flags|=4)
        }
        else{
          o=l.nodeType===9?l:l.ownerDocument, e==="http://www.w3.org/1999/xhtml"&&(e=Vo(n)), e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"), e.innerHTML="<script><\/script>", e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n, {
            is:r.is
          }):(e=o.createElement(n), n==="select"&&(o=e, r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e, n), e[wt]=t, e[fr]=r, na(e, t, !1, !1), t.stateNode=e;
          e:{
            switch(o=Xl(n, r), n){
              case"dialog":de("cancel", e), de("close", e), l=r;
              break;
              case"iframe":case"object":case"embed":de("load", e), l=r;
              break;
              case"video":case"audio":for(l=0;
              l<sr.length;
              l++)de(sr[l], e);
              l=r;
              break;
              case"source":de("error", e), l=r;
              break;
              case"img":case"image":case"link":de("error", e), de("load", e), l=r;
              break;
              case"details":de("toggle", e), l=r;
              break;
              case"input":Pr(e, r), l=Un(e, r), de("invalid", e);
              break;
              case"option":l=r;
              break;
              case"select":e._wrapperState={
                wasMultiple:!!r.multiple
              }, l=I({

              }, r, {
                value:void 0
              }), de("invalid", e);
              break;
              case"textarea":Bo(e, r), l=gt(e, r), de("invalid", e);
              break;
              default:l=r
            }
            Ql(n, l), s=l;
            for(i in s)if(s.hasOwnProperty(i)){
              var a=s[i];
              i==="style"?qo(e, a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0, a!=null&&Qo(e, a)):i==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Hn(e, a):typeof a=="number"&&Hn(e, ""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(f.hasOwnProperty(i)?a!=null&&i==="onScroll"&&de("scroll", e):a!=null&&ae(e, i, a, o))
            }
            switch(n){
              case"input":we(e), zr(e, r, !1);
              break;
              case"textarea":we(e), Ho(e);
              break;
              case"option":r.value!=null&&e.setAttribute("value", ""+B(r.value));
              break;
              case"select":e.multiple=!!r.multiple, i=r.value, i!=null?Lt(e, !!r.multiple, i, !1):r.defaultValue!=null&&Lt(e, !!r.multiple, r.defaultValue, !0);
              break;
              default:typeof l.onClick=="function"&&(e.onclick=br)
            }
            switch(n){
              case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;
              break e;
              case"img":r=!0;
              break e;
              default:r=!1
            }

          }
          r&&(t.flags|=4)
        }
        t.ref!==null&&(t.flags|=512, t.flags|=2097152)
      }
      return We(t), null;
      case 6:if(e&&t.stateNode!=null)la(e, t, e.memoizedProps, r);
      else{
        if(typeof r!="string"&&t.stateNode===null)throw Error(u(166));
        if(n=ln(vr.current), ln(kt.current), ol(t)){
          if(r=t.stateNode, n=t.memoizedProps, r[wt]=t, (i=r.nodeValue!==n)&&(e=be, e!==null))switch(e.tag){
            case 3:Jr(r.nodeValue, n, (e.mode&1)!==0);
            break;
            case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Jr(r.nodeValue, n, (e.mode&1)!==0)
          }
          i&&(t.flags|=4)
        }
        else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r), r[wt]=t, t.stateNode=r
      }
      return We(t), null;
      case 13:if(pe(ge), r=t.memoizedState, e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){
        if(ve&&et!==null&&(t.mode&1)!==0&&(t.flags&128)===0)us(), Pn(), t.flags|=98560, i=!1;
        else if(i=ol(t), r!==null&&r.dehydrated!==null){
          if(e===null){
            if(!i)throw Error(u(318));
            if(i=t.memoizedState, i=i!==null?i.dehydrated:null, !i)throw Error(u(317));
            i[wt]=t
          }
          else Pn(), (t.flags&128)===0&&(t.memoizedState=null), t.flags|=4;
          We(t), i=!1
        }
        else ct!==null&&(Co(ct), ct=null), i=!0;
        if(!i)return t.flags&65536?t:null
      }
      return(t.flags&128)!==0?(t.lanes=n, t):(r=r!==null, r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192, (t.mode&1)!==0&&(e===null||(ge.current&1)!==0?Pe===0&&(Pe=3):_o())), t.updateQueue!==null&&(t.flags|=4), We(t), null);
      case 4:return Ln(), fo(e, t), e===null&&ar(t.stateNode.containerInfo), We(t), null;
      case 10:return Wi(t.type._context), We(t), null;
      case 17:return Xe(t.type)&&tl(), We(t), null;
      case 19:if(pe(ge), i=t.memoizedState, i===null)return We(t), null;
      if(r=(t.flags&128)!==0, o=i.rendering, o===null)if(r)xr(i, !1);
      else{
        if(Pe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;
        e!==null;
        ){
          if(o=dl(e), o!==null){
            for(t.flags|=128, xr(i, !1), r=o.updateQueue, r!==null&&(t.updateQueue=r, t.flags|=4), t.subtreeFlags=0, r=n, n=t.child;
            n!==null;
            )i=n, e=r, i.flags&=14680066, o=i.alternate, o===null?(i.childLanes=0, i.lanes=e, i.child=null, i.subtreeFlags=0, i.memoizedProps=null, i.memoizedState=null, i.updateQueue=null, i.dependencies=null, i.stateNode=null):(i.childLanes=o.childLanes, i.lanes=o.lanes, i.child=o.child, i.subtreeFlags=0, i.deletions=null, i.memoizedProps=o.memoizedProps, i.memoizedState=o.memoizedState, i.updateQueue=o.updateQueue, i.type=o.type, e=o.dependencies, i.dependencies=e===null?null:{
              lanes:e.lanes, firstContext:e.firstContext
            }), n=n.sibling;
            return ce(ge, ge.current&1|2), t.child
          }
          e=e.sibling
        }
        i.tail!==null&&Se()>On&&(t.flags|=128, r=!0, xr(i, !1), t.lanes=4194304)
      }
      else{
        if(!r)if(e=dl(o), e!==null){
          if(t.flags|=128, r=!0, n=e.updateQueue, n!==null&&(t.updateQueue=n, t.flags|=4), xr(i, !0), i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ve)return We(t), null
        }
        else 2*Se()-i.renderingStartTime>On&&n!==1073741824&&(t.flags|=128, r=!0, xr(i, !1), t.lanes=4194304);
        i.isBackwards?(o.sibling=t.child, t.child=o):(n=i.last, n!==null?n.sibling=o:t.child=o, i.last=o)
      }
      return i.tail!==null?(t=i.tail, i.rendering=t, i.tail=t.sibling, i.renderingStartTime=Se(), t.sibling=null, n=ge.current, ce(ge, r?n&1|2:n&1), t):(We(t), null);
      case 22:case 23:return No(), r=t.memoizedState!==null, e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192), r&&(t.mode&1)!==0?(tt&1073741824)!==0&&(We(t), t.subtreeFlags&6&&(t.flags|=8192)):We(t), null;
      case 24:return null;
      case 25:return null
    }
    throw Error(u(156, t.tag))
  }
  function wf(e, t){
    switch(Ti(t), t.tag){
      case 1:return Xe(t.type)&&tl(), e=t.flags, e&65536?(t.flags=e&-65537|128, t):null;
      case 3:return Ln(), pe(Qe), pe(Fe), Xi(), e=t.flags, (e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128, t):null;
      case 5:return Vi(t), null;
      case 13:if(pe(ge), e=t.memoizedState, e!==null&&e.dehydrated!==null){
        if(t.alternate===null)throw Error(u(340));
        Pn()
      }
      return e=t.flags, e&65536?(t.flags=e&-65537|128, t):null;
      case 19:return pe(ge), null;
      case 4:return Ln(), null;
      case 10:return Wi(t.type._context), null;
      case 22:case 23:return No(), null;
      case 24:return null;
      default:return null
    }

  }
  var xl=!1, Ue=!1, kf=typeof WeakSet=="function"?WeakSet:Set, W=null;
  function Mn(e, t){
    var n=e.ref;
    if(n!==null)if(typeof n=="function")try{
      n(null)
    }
    catch(r){
      ke(e, t, r)
    }
    else n.current=null
  }
  function po(e, t, n){
    try{
      n()
    }
    catch(r){
      ke(e, t, r)
    }

  }
  var ia=!1;
  function xf(e, t){
    if(Ei=Br, e=Fu(), vi(e)){
      if("selectionStart"in e)var n={
        start:e.selectionStart, end:e.selectionEnd
      };
      else e:{
        n=(n=e.ownerDocument)&&n.defaultView||window;
        var r=n.getSelection&&n.getSelection();
        if(r&&r.rangeCount!==0){
          n=r.anchorNode;
          var l=r.anchorOffset, i=r.focusNode;
          r=r.focusOffset;
          try{
            n.nodeType, i.nodeType
          }
          catch{
            n=null;
            break e
          }
          var o=0, s=-1, a=-1, v=0, P=0, z=e, j=null;
          t:for(;
          ;
          ){
            for(var O;
            z!==n||l!==0&&z.nodeType!==3||(s=o+l), z!==i||r!==0&&z.nodeType!==3||(a=o+r), z.nodeType===3&&(o+=z.nodeValue.length), (O=z.firstChild)!==null;
            )j=z, z=O;
            for(;
            ;
            ){
              if(z===e)break t;
              if(j===n&&++v===l&&(s=o), j===i&&++P===r&&(a=o), (O=z.nextSibling)!==null)break;
              z=j, j=z.parentNode
            }
            z=O
          }
          n=s===-1||a===-1?null:{
            start:s, end:a
          }

        }
        else n=null
      }
      n=n||{
        start:0, end:0
      }

    }
    else n=null;
    for(Ni={
      focusedElem:e, selectionRange:n
    }, Br=!1, W=t;
    W!==null;
    )if(t=W, e=t.child, (t.subtreeFlags&1028)!==0&&e!==null)e.return=t, W=e;
    else for(;
    W!==null;
    ){
      t=W;
      try{
        var U=t.alternate;
        if((t.flags&1024)!==0)switch(t.tag){
          case 0:case 11:case 15:break;
          case 1:if(U!==null){
            var A=U.memoizedProps, Ce=U.memoizedState, p=t.stateNode, c=p.getSnapshotBeforeUpdate(t.elementType===t.type?A:ft(t.type, A), Ce);
            p.__reactInternalSnapshotBeforeUpdate=c
          }
          break;
          case 3:var h=t.stateNode.containerInfo;
          h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);
          break;
          case 5:case 6:case 4:case 17:break;
          default:throw Error(u(163))
        }

      }
      catch(T){
        ke(t, t.return, T)
      }
      if(e=t.sibling, e!==null){
        e.return=t.return, W=e;
        break
      }
      W=t.return
    }
    return U=ia, ia=!1, U
  }
  function Sr(e, t, n){
    var r=t.updateQueue;
    if(r=r!==null?r.lastEffect:null, r!==null){
      var l=r=r.next;
      do{
        if((l.tag&e)===e){
          var i=l.destroy;
          l.destroy=void 0, i!==void 0&&po(t, n, i)
        }
        l=l.next
      }
      while(l!==r)
    }

  }
  function Sl(e, t){
    if(t=t.updateQueue, t=t!==null?t.lastEffect:null, t!==null){
      var n=t=t.next;
      do{
        if((n.tag&e)===e){
          var r=n.create;
          n.destroy=r()
        }
        n=n.next
      }
      while(n!==t)
    }

  }
  function ho(e){
    var t=e.ref;
    if(t!==null){
      var n=e.stateNode;
      e.tag, e=n, typeof t=="function"?t(e):t.current=e
    }

  }
  function oa(e){
    var t=e.alternate;
    t!==null&&(e.alternate=null, oa(t)), e.child=null, e.deletions=null, e.sibling=null, e.tag===5&&(t=e.stateNode, t!==null&&(delete t[wt], delete t[fr], delete t[$i], delete t[nf], delete t[rf])), e.stateNode=null, e.return=null, e.dependencies=null, e.memoizedProps=null, e.memoizedState=null, e.pendingProps=null, e.stateNode=null, e.updateQueue=null
  }
  function ua(e){
    return e.tag===5||e.tag===3||e.tag===4
  }
  function sa(e){
    e:for(;
    ;
    ){
      for(;
      e.sibling===null;
      ){
        if(e.return===null||ua(e.return))return null;
        e=e.return
      }
      for(e.sibling.return=e.return, e=e.sibling;
      e.tag!==5&&e.tag!==6&&e.tag!==18;
      ){
        if(e.flags&2||e.child===null||e.tag===4)continue e;
        e.child.return=e, e=e.child
      }
      if(!(e.flags&2))return e.stateNode
    }

  }
  function mo(e, t, n){
    var r=e.tag;
    if(r===5||r===6)e=e.stateNode, t?n.nodeType===8?n.parentNode.insertBefore(e, t):n.insertBefore(e, t):(n.nodeType===8?(t=n.parentNode, t.insertBefore(e, n)):(t=n, t.appendChild(e)), n=n._reactRootContainer, n!=null||t.onclick!==null||(t.onclick=br));
    else if(r!==4&&(e=e.child, e!==null))for(mo(e, t, n), e=e.sibling;
    e!==null;
    )mo(e, t, n), e=e.sibling
  }
  function vo(e, t, n){
    var r=e.tag;
    if(r===5||r===6)e=e.stateNode, t?n.insertBefore(e, t):n.appendChild(e);
    else if(r!==4&&(e=e.child, e!==null))for(vo(e, t, n), e=e.sibling;
    e!==null;
    )vo(e, t, n), e=e.sibling
  }
  var Me=null, dt=!1;
  function Qt(e, t, n){
    for(n=n.child;
    n!==null;
    )aa(e, t, n), n=n.sibling
  }
  function aa(e, t, n){
    if(yt&&typeof yt.onCommitFiberUnmount=="function")try{
      yt.onCommitFiberUnmount(Dr, n)
    }
    catch{

    }
    switch(n.tag){
      case 5:Ue||Mn(n, t);
      case 6:var r=Me, l=dt;
      Me=null, Qt(e, t, n), Me=r, dt=l, Me!==null&&(dt?(e=Me, n=n.stateNode, e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Me.removeChild(n.stateNode));
      break;
      case 18:Me!==null&&(dt?(e=Me, n=n.stateNode, e.nodeType===8?Pi(e.parentNode, n):e.nodeType===1&&Pi(e, n), er(e)):Pi(Me, n.stateNode));
      break;
      case 4:r=Me, l=dt, Me=n.stateNode.containerInfo, dt=!0, Qt(e, t, n), Me=r, dt=l;
      break;
      case 0:case 11:case 14:case 15:if(!Ue&&(r=n.updateQueue, r!==null&&(r=r.lastEffect, r!==null))){
        l=r=r.next;
        do{
          var i=l, o=i.destroy;
          i=i.tag, o!==void 0&&((i&2)!==0||(i&4)!==0)&&po(n, t, o), l=l.next
        }
        while(l!==r)
      }
      Qt(e, t, n);
      break;
      case 1:if(!Ue&&(Mn(n, t), r=n.stateNode, typeof r.componentWillUnmount=="function"))try{
        r.props=n.memoizedProps, r.state=n.memoizedState, r.componentWillUnmount()
      }
      catch(s){
        ke(n, t, s)
      }
      Qt(e, t, n);
      break;
      case 21:Qt(e, t, n);
      break;
      case 22:n.mode&1?(Ue=(r=Ue)||n.memoizedState!==null, Qt(e, t, n), Ue=r):Qt(e, t, n);
      break;
      default:Qt(e, t, n)
    }

  }
  function ca(e){
    var t=e.updateQueue;
    if(t!==null){
      e.updateQueue=null;
      var n=e.stateNode;
      n===null&&(n=e.stateNode=new kf), t.forEach(function(r){
        var l=zf.bind(null, e, r);
        n.has(r)||(n.add(r), r.then(l, l))
      })
    }

  }
  function pt(e, t){
    var n=t.deletions;
    if(n!==null)for(var r=0;
    r<n.length;
    r++){
      var l=n[r];
      try{
        var i=e, o=t, s=o;
        e:for(;
        s!==null;
        ){
          switch(s.tag){
            case 5:Me=s.stateNode, dt=!1;
            break e;
            case 3:Me=s.stateNode.containerInfo, dt=!0;
            break e;
            case 4:Me=s.stateNode.containerInfo, dt=!0;
            break e
          }
          s=s.return
        }
        if(Me===null)throw Error(u(160));
        aa(i, o, l), Me=null, dt=!1;
        var a=l.alternate;
        a!==null&&(a.return=null), l.return=null
      }
      catch(v){
        ke(l, t, v)
      }

    }
    if(t.subtreeFlags&12854)for(t=t.child;
    t!==null;
    )fa(t, e), t=t.sibling
  }
  function fa(e, t){
    var n=e.alternate, r=e.flags;
    switch(e.tag){
      case 0:case 11:case 14:case 15:if(pt(t, e), St(e), r&4){
        try{
          Sr(3, e, e.return), Sl(3, e)
        }
        catch(A){
          ke(e, e.return, A)
        }
        try{
          Sr(5, e, e.return)
        }
        catch(A){
          ke(e, e.return, A)
        }

      }
      break;
      case 1:pt(t, e), St(e), r&512&&n!==null&&Mn(n, n.return);
      break;
      case 5:if(pt(t, e), St(e), r&512&&n!==null&&Mn(n, n.return), e.flags&32){
        var l=e.stateNode;
        try{
          Hn(l, "")
        }
        catch(A){
          ke(e, e.return, A)
        }

      }
      if(r&4&&(l=e.stateNode, l!=null)){
        var i=e.memoizedProps, o=n!==null?n.memoizedProps:i, s=e.type, a=e.updateQueue;
        if(e.updateQueue=null, a!==null)try{
          s==="input"&&i.type==="radio"&&i.name!=null&&$r(l, i), Xl(s, o);
          var v=Xl(s, i);
          for(o=0;
          o<a.length;
          o+=2){
            var P=a[o], z=a[o+1];
            P==="style"?qo(l, z):P==="dangerouslySetInnerHTML"?Qo(l, z):P==="children"?Hn(l, z):ae(l, P, z, v)
          }
          switch(s){
            case"input":Bn(l, i);
            break;
            case"textarea":Ao(l, i);
            break;
            case"select":var j=l._wrapperState.wasMultiple;
            l._wrapperState.wasMultiple=!!i.multiple;
            var O=i.value;
            O!=null?Lt(l, !!i.multiple, O, !1):j!==!!i.multiple&&(i.defaultValue!=null?Lt(l, !!i.multiple, i.defaultValue, !0):Lt(l, !!i.multiple, i.multiple?[]:"", !1))
          }
          l[fr]=i
        }
        catch(A){
          ke(e, e.return, A)
        }

      }
      break;
      case 6:if(pt(t, e), St(e), r&4){
        if(e.stateNode===null)throw Error(u(162));
        l=e.stateNode, i=e.memoizedProps;
        try{
          l.nodeValue=i
        }
        catch(A){
          ke(e, e.return, A)
        }

      }
      break;
      case 3:if(pt(t, e), St(e), r&4&&n!==null&&n.memoizedState.isDehydrated)try{
        er(t.containerInfo)
      }
      catch(A){
        ke(e, e.return, A)
      }
      break;
      case 4:pt(t, e), St(e);
      break;
      case 13:pt(t, e), St(e), l=e.child, l.flags&8192&&(i=l.memoizedState!==null, l.stateNode.isHidden=i, !i||l.alternate!==null&&l.alternate.memoizedState!==null||(wo=Se())), r&4&&ca(e);
      break;
      case 22:if(P=n!==null&&n.memoizedState!==null, e.mode&1?(Ue=(v=Ue)||P, pt(t, e), Ue=v):pt(t, e), St(e), r&8192){
        if(v=e.memoizedState!==null, (e.stateNode.isHidden=v)&&!P&&(e.mode&1)!==0)for(W=e, P=e.child;
        P!==null;
        ){
          for(z=W=P;
          W!==null;
          ){
            switch(j=W, O=j.child, j.tag){
              case 0:case 11:case 14:case 15:Sr(4, j, j.return);
              break;
              case 1:Mn(j, j.return);
              var U=j.stateNode;
              if(typeof U.componentWillUnmount=="function"){
                r=j, n=j.return;
                try{
                  t=r, U.props=t.memoizedProps, U.state=t.memoizedState, U.componentWillUnmount()
                }
                catch(A){
                  ke(r, n, A)
                }

              }
              break;
              case 5:Mn(j, j.return);
              break;
              case 22:if(j.memoizedState!==null){
                ha(z);
                continue
              }

            }
            O!==null?(O.return=j, W=O):ha(z)
          }
          P=P.sibling
        }
        e:for(P=null, z=e;
        ;
        ){
          if(z.tag===5){
            if(P===null){
              P=z;
              try{
                l=z.stateNode, v?(i=l.style, typeof i.setProperty=="function"?i.setProperty("display", "none", "important"):i.display="none"):(s=z.stateNode, a=z.memoizedProps.style, o=a!=null&&a.hasOwnProperty("display")?a.display:null, s.style.display=Xo("display", o))
              }
              catch(A){
                ke(e, e.return, A)
              }

            }

          }
          else if(z.tag===6){
            if(P===null)try{
              z.stateNode.nodeValue=v?"":z.memoizedProps
            }
            catch(A){
              ke(e, e.return, A)
            }

          }
          else if((z.tag!==22&&z.tag!==23||z.memoizedState===null||z===e)&&z.child!==null){
            z.child.return=z, z=z.child;
            continue
          }
          if(z===e)break e;
          for(;
          z.sibling===null;
          ){
            if(z.return===null||z.return===e)break e;
            P===z&&(P=null), z=z.return
          }
          P===z&&(P=null), z.sibling.return=z.return, z=z.sibling
        }

      }
      break;
      case 19:pt(t, e), St(e), r&4&&ca(e);
      break;
      case 21:break;
      default:pt(t, e), St(e)
    }

  }
  function St(e){
    var t=e.flags;
    if(t&2){
      try{
        e:{
          for(var n=e.return;
          n!==null;
          ){
            if(ua(n)){
              var r=n;
              break e
            }
            n=n.return
          }
          throw Error(u(160))
        }
        switch(r.tag){
          case 5:var l=r.stateNode;
          r.flags&32&&(Hn(l, ""), r.flags&=-33);
          var i=sa(e);
          vo(e, i, l);
          break;
          case 3:case 4:var o=r.stateNode.containerInfo, s=sa(e);
          mo(e, s, o);
          break;
          default:throw Error(u(161))
        }

      }
      catch(a){
        ke(e, e.return, a)
      }
      e.flags&=-3
    }
    t&4096&&(e.flags&=-4097)
  }
  function Sf(e, t, n){
    W=e, da(e)
  }
  function da(e, t, n){
    for(var r=(e.mode&1)!==0;
    W!==null;
    ){
      var l=W, i=l.child;
      if(l.tag===22&&r){
        var o=l.memoizedState!==null||xl;
        if(!o){
          var s=l.alternate, a=s!==null&&s.memoizedState!==null||Ue;
          s=xl;
          var v=Ue;
          if(xl=o, (Ue=a)&&!v)for(W=l;
          W!==null;
          )o=W, a=o.child, o.tag===22&&o.memoizedState!==null?ma(l):a!==null?(a.return=o, W=a):ma(l);
          for(;
          i!==null;
          )W=i, da(i), i=i.sibling;
          W=l, xl=s, Ue=v
        }
        pa(e)
      }
      else(l.subtreeFlags&8772)!==0&&i!==null?(i.return=l, W=i):pa(e)
    }

  }
  function pa(e){
    for(;
    W!==null;
    ){
      var t=W;
      if((t.flags&8772)!==0){
        var n=t.alternate;
        try{
          if((t.flags&8772)!==0)switch(t.tag){
            case 0:case 11:case 15:Ue||Sl(5, t);
            break;
            case 1:var r=t.stateNode;
            if(t.flags&4&&!Ue)if(n===null)r.componentDidMount();
            else{
              var l=t.elementType===t.type?n.memoizedProps:ft(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
            }
            var i=t.updateQueue;
            i!==null&&hs(t, i, r);
            break;
            case 3:var o=t.updateQueue;
            if(o!==null){
              if(n=null, t.child!==null)switch(t.child.tag){
                case 5:n=t.child.stateNode;
                break;
                case 1:n=t.child.stateNode
              }
              hs(t, o, n)
            }
            break;
            case 5:var s=t.stateNode;
            if(n===null&&t.flags&4){
              n=s;
              var a=t.memoizedProps;
              switch(t.type){
                case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();
                break;
                case"img":a.src&&(n.src=a.src)
              }

            }
            break;
            case 6:break;
            case 4:break;
            case 12:break;
            case 13:if(t.memoizedState===null){
              var v=t.alternate;
              if(v!==null){
                var P=v.memoizedState;
                if(P!==null){
                  var z=P.dehydrated;
                  z!==null&&er(z)
                }

              }

            }
            break;
            case 19:case 17:case 21:case 22:case 23:case 25:break;
            default:throw Error(u(163))
          }
          Ue||t.flags&512&&ho(t)
        }
        catch(j){
          ke(t, t.return, j)
        }

      }
      if(t===e){
        W=null;
        break
      }
      if(n=t.sibling, n!==null){
        n.return=t.return, W=n;
        break
      }
      W=t.return
    }

  }
  function ha(e){
    for(;
    W!==null;
    ){
      var t=W;
      if(t===e){
        W=null;
        break
      }
      var n=t.sibling;
      if(n!==null){
        n.return=t.return, W=n;
        break
      }
      W=t.return
    }

  }
  function ma(e){
    for(;
    W!==null;
    ){
      var t=W;
      try{
        switch(t.tag){
          case 0:case 11:case 15:var n=t.return;
          try{
            Sl(4, t)
          }
          catch(a){
            ke(t, n, a)
          }
          break;
          case 1:var r=t.stateNode;
          if(typeof r.componentDidMount=="function"){
            var l=t.return;
            try{
              r.componentDidMount()
            }
            catch(a){
              ke(t, l, a)
            }

          }
          var i=t.return;
          try{
            ho(t)
          }
          catch(a){
            ke(t, i, a)
          }
          break;
          case 5:var o=t.return;
          try{
            ho(t)
          }
          catch(a){
            ke(t, o, a)
          }

        }

      }
      catch(a){
        ke(t, t.return, a)
      }
      if(t===e){
        W=null;
        break
      }
      var s=t.sibling;
      if(s!==null){
        s.return=t.return, W=s;
        break
      }
      W=t.return
    }

  }
  var Cf=Math.ceil, Cl=re.ReactCurrentDispatcher, go=re.ReactCurrentOwner, ot=re.ReactCurrentBatchConfig, ie=0, Re=null, Ee=null, De=0, tt=0, Dn=Ut(0), Pe=0, Cr=null, un=0, El=0, yo=0, Er=null, Ke=null, wo=0, On=1/0, Rt=null, Nl=!1, ko=null, Xt=null, _l=!1, qt=null, jl=0, Nr=0, xo=null, Pl=-1, $l=0;
  function He(){
    return(ie&6)!==0?Se():Pl!==-1?Pl:Pl=Se()
  }
  function Kt(e){
    return(e.mode&1)===0?1:(ie&2)!==0&&De!==0?De&-De:of.transition!==null?($l===0&&($l=su()), $l):(e=ue, e!==0||(e=window.event, e=e===void 0?16:gu(e.type)), e)
  }
  function ht(e, t, n, r){
    if(50<Nr)throw Nr=0, xo=null, Error(u(185));
    Yn(e, n, r), ((ie&2)===0||e!==Re)&&(e===Re&&((ie&2)===0&&(El|=n), Pe===4&&Yt(e, De)), Ye(e, r), n===1&&ie===0&&(t.mode&1)===0&&(On=Se()+500, rl&&At()))
  }
  function Ye(e, t){
    var n=e.callbackNode;
    ic(e, t);
    var r=Ir(e, e===Re?De:0);
    if(r===0)n!==null&&iu(n), e.callbackNode=null, e.callbackPriority=0;
    else if(t=r&-r, e.callbackPriority!==t){
      if(n!=null&&iu(n), t===1)e.tag===0?lf(ga.bind(null, e)):ns(ga.bind(null, e)), ef(function(){
        (ie&6)===0&&At()
      }), n=null;
      else{
        switch(au(r)){
          case 1:n=bl;
          break;
          case 4:n=ou;
          break;
          case 16:n=Mr;
          break;
          case 536870912:n=uu;
          break;
          default:n=Mr
        }
        n=Na(n, va.bind(null, e))
      }
      e.callbackPriority=t, e.callbackNode=n
    }

  }
  function va(e, t){
    if(Pl=-1, $l=0, (ie&6)!==0)throw Error(u(327));
    var n=e.callbackNode;
    if(Fn()&&e.callbackNode!==n)return null;
    var r=Ir(e, e===Re?De:0);
    if(r===0)return null;
    if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=zl(e, r);
    else{
      t=r;
      var l=ie;
      ie|=2;
      var i=wa();
      (Re!==e||De!==t)&&(Rt=null, On=Se()+500, an(e, t));
      do try{
        _f();
        break
      }
      catch(s){
        ya(e, s)
      }
      while(!0);
      Ii(), Cl.current=i, ie=l, Ee!==null?t=0:(Re=null, De=0, t=Pe)
    }
    if(t!==0){
      if(t===2&&(l=ei(e), l!==0&&(r=l, t=So(e, l))), t===1)throw n=Cr, an(e, 0), Yt(e, r), Ye(e, Se()), n;
      if(t===6)Yt(e, r);
      else{
        if(l=e.current.alternate, (r&30)===0&&!Ef(l)&&(t=zl(e, r), t===2&&(i=ei(e), i!==0&&(r=i, t=So(e, i))), t===1))throw n=Cr, an(e, 0), Yt(e, r), Ye(e, Se()), n;
        switch(e.finishedWork=l, e.finishedLanes=r, t){
          case 0:case 1:throw Error(u(345));
          case 2:cn(e, Ke, Rt);
          break;
          case 3:if(Yt(e, r), (r&130023424)===r&&(t=wo+500-Se(), 10<t)){
            if(Ir(e, 0)!==0)break;
            if(l=e.suspendedLanes, (l&r)!==r){
              He(), e.pingedLanes|=e.suspendedLanes&l;
              break
            }
            e.timeoutHandle=ji(cn.bind(null, e, Ke, Rt), t);
            break
          }
          cn(e, Ke, Rt);
          break;
          case 4:if(Yt(e, r), (r&4194240)===r)break;
          for(t=e.eventTimes, l=-1;
          0<r;
          ){
            var o=31-st(r);
            i=1<<o, o=t[o], o>l&&(l=o), r&=~i
          }
          if(r=l, r=Se()-r, r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Cf(r/1960))-r, 10<r){
            e.timeoutHandle=ji(cn.bind(null, e, Ke, Rt), r);
            break
          }
          cn(e, Ke, Rt);
          break;
          case 5:cn(e, Ke, Rt);
          break;
          default:throw Error(u(329))
        }

      }

    }
    return Ye(e, Se()), e.callbackNode===n?va.bind(null, e):null
  }
  function So(e, t){
    var n=Er;
    return e.current.memoizedState.isDehydrated&&(an(e, t).flags|=256), e=zl(e, t), e!==2&&(t=Ke, Ke=n, t!==null&&Co(t)), e
  }
  function Co(e){
    Ke===null?Ke=e:Ke.push.apply(Ke, e)
  }
  function Ef(e){
    for(var t=e;
    ;
    ){
      if(t.flags&16384){
        var n=t.updateQueue;
        if(n!==null&&(n=n.stores, n!==null))for(var r=0;
        r<n.length;
        r++){
          var l=n[r], i=l.getSnapshot;
          l=l.value;
          try{
            if(!at(i(), l))return!1
          }
          catch{
            return!1
          }

        }

      }
      if(n=t.child, t.subtreeFlags&16384&&n!==null)n.return=t, t=n;
      else{
        if(t===e)break;
        for(;
        t.sibling===null;
        ){
          if(t.return===null||t.return===e)return!0;
          t=t.return
        }
        t.sibling.return=t.return, t=t.sibling
      }

    }
    return!0
  }
  function Yt(e, t){
    for(t&=~yo, t&=~El, e.suspendedLanes|=t, e.pingedLanes&=~t, e=e.expirationTimes;
    0<t;
    ){
      var n=31-st(t), r=1<<n;
      e[n]=-1, t&=~r
    }

  }
  function ga(e){
    if((ie&6)!==0)throw Error(u(327));
    Fn();
    var t=Ir(e, 0);
    if((t&1)===0)return Ye(e, Se()), null;
    var n=zl(e, t);
    if(e.tag!==0&&n===2){
      var r=ei(e);
      r!==0&&(t=r, n=So(e, r))
    }
    if(n===1)throw n=Cr, an(e, 0), Yt(e, t), Ye(e, Se()), n;
    if(n===6)throw Error(u(345));
    return e.finishedWork=e.current.alternate, e.finishedLanes=t, cn(e, Ke, Rt), Ye(e, Se()), null
  }
  function Eo(e, t){
    var n=ie;
    ie|=1;
    try{
      return e(t)
    }
    finally{
      ie=n, ie===0&&(On=Se()+500, rl&&At())
    }

  }
  function sn(e){
    qt!==null&&qt.tag===0&&(ie&6)===0&&Fn();
    var t=ie;
    ie|=1;
    var n=ot.transition, r=ue;
    try{
      if(ot.transition=null, ue=1, e)return e()
    }
    finally{
      ue=r, ot.transition=n, ie=t, (ie&6)===0&&At()
    }

  }
  function No(){
    tt=Dn.current, pe(Dn)
  }
  function an(e, t){
    e.finishedWork=null, e.finishedLanes=0;
    var n=e.timeoutHandle;
    if(n!==-1&&(e.timeoutHandle=-1, bc(n)), Ee!==null)for(n=Ee.return;
    n!==null;
    ){
      var r=n;
      switch(Ti(r), r.tag){
        case 1:r=r.type.childContextTypes, r!=null&&tl();
        break;
        case 3:Ln(), pe(Qe), pe(Fe), Xi();
        break;
        case 5:Vi(r);
        break;
        case 4:Ln();
        break;
        case 13:pe(ge);
        break;
        case 19:pe(ge);
        break;
        case 10:Wi(r.type._context);
        break;
        case 22:case 23:No()
      }
      n=n.return
    }
    if(Re=e, Ee=e=Gt(e.current, null), De=tt=t, Pe=0, Cr=null, yo=El=un=0, Ke=Er=null, rn!==null){
      for(t=0;
      t<rn.length;
      t++)if(n=rn[t], r=n.interleaved, r!==null){
        n.interleaved=null;
        var l=r.next, i=n.pending;
        if(i!==null){
          var o=i.next;
          i.next=l, r.next=o
        }
        n.pending=r
      }
      rn=null
    }
    return e
  }
  function ya(e, t){
    do{
      var n=Ee;
      try{
        if(Ii(), pl.current=gl, hl){
          for(var r=ye.memoizedState;
          r!==null;
          ){
            var l=r.queue;
            l!==null&&(l.pending=null), r=r.next
          }
          hl=!1
        }
        if(on=0, ze=je=ye=null, gr=!1, yr=0, go.current=null, n===null||n.return===null){
          Pe=1, Cr=t, Ee=null;
          break
        }
        e:{
          var i=e, o=n.return, s=n, a=t;
          if(t=De, s.flags|=32768, a!==null&&typeof a=="object"&&typeof a.then=="function"){
            var v=a, P=s, z=P.tag;
            if((P.mode&1)===0&&(z===0||z===11||z===15)){
              var j=P.alternate;
              j?(P.updateQueue=j.updateQueue, P.memoizedState=j.memoizedState, P.lanes=j.lanes):(P.updateQueue=null, P.memoizedState=null)
            }
            var O=Hs(o);
            if(O!==null){
              O.flags&=-257, Vs(O, o, s, i, t), O.mode&1&&As(i, v, t), t=O, a=v;
              var U=t.updateQueue;
              if(U===null){
                var A=new Set;
                A.add(a), t.updateQueue=A
              }
              else U.add(a);
              break e
            }
            else{
              if((t&1)===0){
                As(i, v, t), _o();
                break e
              }
              a=Error(u(426))
            }

          }
          else if(ve&&s.mode&1){
            var Ce=Hs(o);
            if(Ce!==null){
              (Ce.flags&65536)===0&&(Ce.flags|=256), Vs(Ce, o, s, i, t), Oi(Tn(a, s));
              break e
            }

          }
          i=a=Tn(a, s), Pe!==4&&(Pe=2), Er===null?Er=[i]:Er.push(i), i=o;
          do{
            switch(i.tag){
              case 3:i.flags|=65536, t&=-t, i.lanes|=t;
              var p=Us(i, a, t);
              ps(i, p);
              break e;
              case 1:s=a;
              var c=i.type, h=i.stateNode;
              if((i.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Xt===null||!Xt.has(h)))){
                i.flags|=65536, t&=-t, i.lanes|=t;
                var T=Bs(i, s, t);
                ps(i, T);
                break e
              }

            }
            i=i.return
          }
          while(i!==null)
        }
        xa(n)
      }
      catch(H){
        t=H, Ee===n&&n!==null&&(Ee=n=n.return);
        continue
      }
      break
    }
    while(!0)
  }
  function wa(){
    var e=Cl.current;
    return Cl.current=gl, e===null?gl:e
  }
  function _o(){
    (Pe===0||Pe===3||Pe===2)&&(Pe=4), Re===null||(un&268435455)===0&&(El&268435455)===0||Yt(Re, De)
  }
  function zl(e, t){
    var n=ie;
    ie|=2;
    var r=wa();
    (Re!==e||De!==t)&&(Rt=null, an(e, t));
    do try{
      Nf();
      break
    }
    catch(l){
      ya(e, l)
    }
    while(!0);
    if(Ii(), ie=n, Cl.current=r, Ee!==null)throw Error(u(261));
    return Re=null, De=0, Pe
  }
  function Nf(){
    for(;
    Ee!==null;
    )ka(Ee)
  }
  function _f(){
    for(;
    Ee!==null&&!Ga();
    )ka(Ee)
  }
  function ka(e){
    var t=Ea(e.alternate, e, tt);
    e.memoizedProps=e.pendingProps, t===null?xa(e):Ee=t, go.current=null
  }
  function xa(e){
    var t=e;
    do{
      var n=t.alternate;
      if(e=t.return, (t.flags&32768)===0){
        if(n=yf(n, t, tt), n!==null){
          Ee=n;
          return
        }

      }
      else{
        if(n=wf(n, t), n!==null){
          n.flags&=32767, Ee=n;
          return
        }
        if(e!==null)e.flags|=32768, e.subtreeFlags=0, e.deletions=null;
        else{
          Pe=6, Ee=null;
          return
        }

      }
      if(t=t.sibling, t!==null){
        Ee=t;
        return
      }
      Ee=t=e
    }
    while(t!==null);
    Pe===0&&(Pe=5)
  }
  function cn(e, t, n){
    var r=ue, l=ot.transition;
    try{
      ot.transition=null, ue=1, jf(e, t, n, r)
    }
    finally{
      ot.transition=l, ue=r
    }
    return null
  }
  function jf(e, t, n, r){
    do Fn();
    while(qt!==null);
    if((ie&6)!==0)throw Error(u(327));
    n=e.finishedWork;
    var l=e.finishedLanes;
    if(n===null)return null;
    if(e.finishedWork=null, e.finishedLanes=0, n===e.current)throw Error(u(177));
    e.callbackNode=null, e.callbackPriority=0;
    var i=n.lanes|n.childLanes;
    if(oc(e, i), e===Re&&(Ee=Re=null, De=0), (n.subtreeFlags&2064)===0&&(n.flags&2064)===0||_l||(_l=!0, Na(Mr, function(){
      return Fn(), null
    })), i=(n.flags&15990)!==0, (n.subtreeFlags&15990)!==0||i){
      i=ot.transition, ot.transition=null;
      var o=ue;
      ue=1;
      var s=ie;
      ie|=4, go.current=null, xf(e, n), fa(n, e), Xc(Ni), Br=!!Ei, Ni=Ei=null, e.current=n, Sf(n), Za(), ie=s, ue=o, ot.transition=i
    }
    else e.current=n;
    if(_l&&(_l=!1, qt=e, jl=l), i=e.pendingLanes, i===0&&(Xt=null), ec(n.stateNode), Ye(e, Se()), t!==null)for(r=e.onRecoverableError, n=0;
    n<t.length;
    n++)l=t[n], r(l.value, {
      componentStack:l.stack, digest:l.digest
    });
    if(Nl)throw Nl=!1, e=ko, ko=null, e;
    return(jl&1)!==0&&e.tag!==0&&Fn(), i=e.pendingLanes, (i&1)!==0?e===xo?Nr++:(Nr=0, xo=e):Nr=0, At(), null
  }
  function Fn(){
    if(qt!==null){
      var e=au(jl), t=ot.transition, n=ue;
      try{
        if(ot.transition=null, ue=16>e?16:e, qt===null)var r=!1;
        else{
          if(e=qt, qt=null, jl=0, (ie&6)!==0)throw Error(u(331));
          var l=ie;
          for(ie|=4, W=e.current;
          W!==null;
          ){
            var i=W, o=i.child;
            if((W.flags&16)!==0){
              var s=i.deletions;
              if(s!==null){
                for(var a=0;
                a<s.length;
                a++){
                  var v=s[a];
                  for(W=v;
                  W!==null;
                  ){
                    var P=W;
                    switch(P.tag){
                      case 0:case 11:case 15:Sr(8, P, i)
                    }
                    var z=P.child;
                    if(z!==null)z.return=P, W=z;
                    else for(;
                    W!==null;
                    ){
                      P=W;
                      var j=P.sibling, O=P.return;
                      if(oa(P), P===v){
                        W=null;
                        break
                      }
                      if(j!==null){
                        j.return=O, W=j;
                        break
                      }
                      W=O
                    }

                  }

                }
                var U=i.alternate;
                if(U!==null){
                  var A=U.child;
                  if(A!==null){
                    U.child=null;
                    do{
                      var Ce=A.sibling;
                      A.sibling=null, A=Ce
                    }
                    while(A!==null)
                  }

                }
                W=i
              }

            }
            if((i.subtreeFlags&2064)!==0&&o!==null)o.return=i, W=o;
            else e:for(;
            W!==null;
            ){
              if(i=W, (i.flags&2048)!==0)switch(i.tag){
                case 0:case 11:case 15:Sr(9, i, i.return)
              }
              var p=i.sibling;
              if(p!==null){
                p.return=i.return, W=p;
                break e
              }
              W=i.return
            }

          }
          var c=e.current;
          for(W=c;
          W!==null;
          ){
            o=W;
            var h=o.child;
            if((o.subtreeFlags&2064)!==0&&h!==null)h.return=o, W=h;
            else e:for(o=c;
            W!==null;
            ){
              if(s=W, (s.flags&2048)!==0)try{
                switch(s.tag){
                  case 0:case 11:case 15:Sl(9, s)
                }

              }
              catch(H){
                ke(s, s.return, H)
              }
              if(s===o){
                W=null;
                break e
              }
              var T=s.sibling;
              if(T!==null){
                T.return=s.return, W=T;
                break e
              }
              W=s.return
            }

          }
          if(ie=l, At(), yt&&typeof yt.onPostCommitFiberRoot=="function")try{
            yt.onPostCommitFiberRoot(Dr, e)
          }
          catch{

          }
          r=!0
        }
        return r
      }
      finally{
        ue=n, ot.transition=t
      }

    }
    return!1
  }
  function Sa(e, t, n){
    t=Tn(n, t), t=Us(e, t, 1), e=Vt(e, t, 1), t=He(), e!==null&&(Yn(e, 1, t), Ye(e, t))
  }
  function ke(e, t, n){
    if(e.tag===3)Sa(e, e, n);
    else for(;
    t!==null;
    ){
      if(t.tag===3){
        Sa(t, e, n);
        break
      }
      else if(t.tag===1){
        var r=t.stateNode;
        if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Xt===null||!Xt.has(r))){
          e=Tn(n, e), e=Bs(t, e, 1), t=Vt(t, e, 1), e=He(), t!==null&&(Yn(t, 1, e), Ye(t, e));
          break
        }

      }
      t=t.return
    }

  }
  function Pf(e, t, n){
    var r=e.pingCache;
    r!==null&&r.delete(t), t=He(), e.pingedLanes|=e.suspendedLanes&n, Re===e&&(De&n)===n&&(Pe===4||Pe===3&&(De&130023424)===De&&500>Se()-wo?an(e, 0):yo|=n), Ye(e, t)
  }
  function Ca(e, t){
    t===0&&((e.mode&1)===0?t=1:(t=Fr, Fr<<=1, (Fr&130023424)===0&&(Fr=4194304)));
    var n=He();
    e=Pt(e, t), e!==null&&(Yn(e, t, n), Ye(e, n))
  }
  function $f(e){
    var t=e.memoizedState, n=0;
    t!==null&&(n=t.retryLane), Ca(e, n)
  }
  function zf(e, t){
    var n=0;
    switch(e.tag){
      case 13:var r=e.stateNode, l=e.memoizedState;
      l!==null&&(n=l.retryLane);
      break;
      case 19:r=e.stateNode;
      break;
      default:throw Error(u(314))
    }
    r!==null&&r.delete(t), Ca(e, n)
  }
  var Ea;
  Ea=function(e, t, n){
    if(e!==null)if(e.memoizedProps!==t.pendingProps||Qe.current)qe=!0;
    else{
      if((e.lanes&n)===0&&(t.flags&128)===0)return qe=!1, gf(e, t, n);
      qe=(e.flags&131072)!==0
    }
    else qe=!1, ve&&(t.flags&1048576)!==0&&rs(t, il, t.index);
    switch(t.lanes=0, t.tag){
      case 2:var r=t.type;
      kl(e, t), e=t.pendingProps;
      var l=Nn(t, Fe.current);
      Rn(t, n), l=Yi(null, t, r, e, l, n);
      var i=Gi();
      return t.flags|=1, typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1, t.memoizedState=null, t.updateQueue=null, Xe(r)?(i=!0, nl(t)):i=!1, t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null, Ai(t), l.updater=yl, t.stateNode=l, l._reactInternals=t, no(t, r, e, n), t=oo(null, t, r, !0, i, n)):(t.tag=0, ve&&i&&Li(t), Ae(null, t, l, n), t=t.child), t;
      case 16:r=t.elementType;
      e:{
        switch(kl(e, t), e=t.pendingProps, l=r._init, r=l(r._payload), t.type=r, l=t.tag=Lf(r), e=ft(r, e), l){
          case 0:t=io(null, t, r, e, n);
          break e;
          case 1:t=Gs(null, t, r, e, n);
          break e;
          case 11:t=Qs(null, t, r, e, n);
          break e;
          case 14:t=Xs(null, t, r, ft(r.type, e), n);
          break e
        }
        throw Error(u(306, r, ""))
      }
      return t;
      case 0:return r=t.type, l=t.pendingProps, l=t.elementType===r?l:ft(r, l), io(e, t, r, l, n);
      case 1:return r=t.type, l=t.pendingProps, l=t.elementType===r?l:ft(r, l), Gs(e, t, r, l, n);
      case 3:e:{
        if(Zs(t), e===null)throw Error(u(387));
        r=t.pendingProps, i=t.memoizedState, l=i.element, ds(e, t), fl(t, r, null, n);
        var o=t.memoizedState;
        if(r=o.element, i.isDehydrated)if(i={
          element:r, isDehydrated:!1, cache:o.cache, pendingSuspenseBoundaries:o.pendingSuspenseBoundaries, transitions:o.transitions
        }, t.updateQueue.baseState=i, t.memoizedState=i, t.flags&256){
          l=Tn(Error(u(423)), t), t=Js(e, t, r, n, l);
          break e
        }
        else if(r!==l){
          l=Tn(Error(u(424)), t), t=Js(e, t, r, n, l);
          break e
        }
        else for(et=Wt(t.stateNode.containerInfo.firstChild), be=t, ve=!0, ct=null, n=cs(t, null, r, n), t.child=n;
        n;
        )n.flags=n.flags&-3|4096, n=n.sibling;
        else{
          if(Pn(), r===l){
            t=zt(e, t, n);
            break e
          }
          Ae(e, t, r, n)
        }
        t=t.child
      }
      return t;
      case 5:return ms(t), e===null&&Di(t), r=t.type, l=t.pendingProps, i=e!==null?e.memoizedProps:null, o=l.children, _i(r, l)?o=null:i!==null&&_i(r, i)&&(t.flags|=32), Ys(e, t), Ae(e, t, o, n), t.child;
      case 6:return e===null&&Di(t), null;
      case 13:return bs(e, t, n);
      case 4:return Hi(t, t.stateNode.containerInfo), r=t.pendingProps, e===null?t.child=$n(t, null, r, n):Ae(e, t, r, n), t.child;
      case 11:return r=t.type, l=t.pendingProps, l=t.elementType===r?l:ft(r, l), Qs(e, t, r, l, n);
      case 7:return Ae(e, t, t.pendingProps, n), t.child;
      case 8:return Ae(e, t, t.pendingProps.children, n), t.child;
      case 12:return Ae(e, t, t.pendingProps.children, n), t.child;
      case 10:e:{
        if(r=t.type._context, l=t.pendingProps, i=t.memoizedProps, o=l.value, ce(sl, r._currentValue), r._currentValue=o, i!==null)if(at(i.value, o)){
          if(i.children===l.children&&!Qe.current){
            t=zt(e, t, n);
            break e
          }

        }
        else for(i=t.child, i!==null&&(i.return=t);
        i!==null;
        ){
          var s=i.dependencies;
          if(s!==null){
            o=i.child;
            for(var a=s.firstContext;
            a!==null;
            ){
              if(a.context===r){
                if(i.tag===1){
                  a=$t(-1, n&-n), a.tag=2;
                  var v=i.updateQueue;
                  if(v!==null){
                    v=v.shared;
                    var P=v.pending;
                    P===null?a.next=a:(a.next=P.next, P.next=a), v.pending=a
                  }

                }
                i.lanes|=n, a=i.alternate, a!==null&&(a.lanes|=n), Ui(i.return, n, t), s.lanes|=n;
                break
              }
              a=a.next
            }

          }
          else if(i.tag===10)o=i.type===t.type?null:i.child;
          else if(i.tag===18){
            if(o=i.return, o===null)throw Error(u(341));
            o.lanes|=n, s=o.alternate, s!==null&&(s.lanes|=n), Ui(o, n, t), o=i.sibling
          }
          else o=i.child;
          if(o!==null)o.return=i;
          else for(o=i;
          o!==null;
          ){
            if(o===t){
              o=null;
              break
            }
            if(i=o.sibling, i!==null){
              i.return=o.return, o=i;
              break
            }
            o=o.return
          }
          i=o
        }
        Ae(e, t, l.children, n), t=t.child
      }
      return t;
      case 9:return l=t.type, r=t.pendingProps.children, Rn(t, n), l=lt(l), r=r(l), t.flags|=1, Ae(e, t, r, n), t.child;
      case 14:return r=t.type, l=ft(r, t.pendingProps), l=ft(r.type, l), Xs(e, t, r, l, n);
      case 15:return qs(e, t, t.type, t.pendingProps, n);
      case 17:return r=t.type, l=t.pendingProps, l=t.elementType===r?l:ft(r, l), kl(e, t), t.tag=1, Xe(r)?(e=!0, nl(t)):e=!1, Rn(t, n), Is(t, r, l), no(t, r, l, n), oo(null, t, r, !0, e, n);
      case 19:return ta(e, t, n);
      case 22:return Ks(e, t, n)
    }
    throw Error(u(156, t.tag))
  };
  function Na(e, t){
    return lu(e, t)
  }
  function Rf(e, t, n, r){
    this.tag=e, this.key=n, this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null, this.index=0, this.ref=null, this.pendingProps=t, this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null, this.mode=r, this.subtreeFlags=this.flags=0, this.deletions=null, this.childLanes=this.lanes=0, this.alternate=null
  }
  function ut(e, t, n, r){
    return new Rf(e, t, n, r)
  }
  function jo(e){
    return e=e.prototype, !(!e||!e.isReactComponent)
  }
  function Lf(e){
    if(typeof e=="function")return jo(e)?1:0;
    if(e!=null){
      if(e=e.$$typeof, e===Be)return 11;
      if(e===Ze)return 14
    }
    return 2
  }
  function Gt(e, t){
    var n=e.alternate;
    return n===null?(n=ut(e.tag, t, e.key, e.mode), n.elementType=e.elementType, n.type=e.type, n.stateNode=e.stateNode, n.alternate=e, e.alternate=n):(n.pendingProps=t, n.type=e.type, n.flags=0, n.subtreeFlags=0, n.deletions=null), n.flags=e.flags&14680064, n.childLanes=e.childLanes, n.lanes=e.lanes, n.child=e.child, n.memoizedProps=e.memoizedProps, n.memoizedState=e.memoizedState, n.updateQueue=e.updateQueue, t=e.dependencies, n.dependencies=t===null?null:{
      lanes:t.lanes, firstContext:t.firstContext
    }, n.sibling=e.sibling, n.index=e.index, n.ref=e.ref, n
  }
  function Rl(e, t, n, r, l, i){
    var o=2;
    if(r=e, typeof e=="function")jo(e)&&(o=1);
    else if(typeof e=="string")o=5;
    else e:switch(e){
      case Ne:return fn(n.children, l, i, t);
      case _e:o=8, l|=8;
      break;
      case mt:return e=ut(12, n, t, l|2), e.elementType=mt, e.lanes=i, e;
      case Oe:return e=ut(13, n, t, l), e.elementType=Oe, e.lanes=i, e;
      case Ve:return e=ut(19, n, t, l), e.elementType=Ve, e.lanes=i, e;
      case me:return Ll(n, l, i, t);
      default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){
        case $e:o=10;
        break e;
        case vt:o=9;
        break e;
        case Be:o=11;
        break e;
        case Ze:o=14;
        break e;
        case Te:o=16, r=null;
        break e
      }
      throw Error(u(130, e==null?e:typeof e, ""))
    }
    return t=ut(o, n, t, l), t.elementType=e, t.type=r, t.lanes=i, t
  }
  function fn(e, t, n, r){
    return e=ut(7, e, r, t), e.lanes=n, e
  }
  function Ll(e, t, n, r){
    return e=ut(22, e, r, t), e.elementType=me, e.lanes=n, e.stateNode={
      isHidden:!1
    }, e
  }
  function Po(e, t, n){
    return e=ut(6, e, null, t), e.lanes=n, e
  }
  function $o(e, t, n){
    return t=ut(4, e.children!==null?e.children:[], e.key, t), t.lanes=n, t.stateNode={
      containerInfo:e.containerInfo, pendingChildren:null, implementation:e.implementation
    }, t
  }
  function Tf(e, t, n, r, l){
    this.tag=t, this.containerInfo=e, this.finishedWork=this.pingCache=this.current=this.pendingChildren=null, this.timeoutHandle=-1, this.callbackNode=this.pendingContext=this.context=null, this.callbackPriority=0, this.eventTimes=ti(0), this.expirationTimes=ti(-1), this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0, this.entanglements=ti(0), this.identifierPrefix=r, this.onRecoverableError=l, this.mutableSourceEagerHydrationData=null
  }
  function zo(e, t, n, r, l, i, o, s, a){
    return e=new Tf(e, t, n, s, a), t===1?(t=1, i===!0&&(t|=8)):t=0, i=ut(3, null, null, t), e.current=i, i.stateNode=e, i.memoizedState={
      element:r, isDehydrated:n, cache:null, transitions:null, pendingSuspenseBoundaries:null
    }, Ai(i), e
  }
  function Mf(e, t, n){
    var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;
    return{
      $$typeof:fe, key:r==null?null:""+r, children:e, containerInfo:t, implementation:n
    }

  }
  function _a(e){
    if(!e)return Bt;
    e=e._reactInternals;
    e:{
      if(Jt(e)!==e||e.tag!==1)throw Error(u(170));
      var t=e;
      do{
        switch(t.tag){
          case 3:t=t.stateNode.context;
          break e;
          case 1:if(Xe(t.type)){
            t=t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e
          }

        }
        t=t.return
      }
      while(t!==null);
      throw Error(u(171))
    }
    if(e.tag===1){
      var n=e.type;
      if(Xe(n))return es(e, n, t)
    }
    return t
  }
  function ja(e, t, n, r, l, i, o, s, a){
    return e=zo(n, r, !0, e, l, i, o, s, a), e.context=_a(null), n=e.current, r=He(), l=Kt(n), i=$t(r, l), i.callback=t??null, Vt(n, i, l), e.current.lanes=l, Yn(e, l, r), Ye(e, r), e
  }
  function Tl(e, t, n, r){
    var l=t.current, i=He(), o=Kt(l);
    return n=_a(n), t.context===null?t.context=n:t.pendingContext=n, t=$t(i, o), t.payload={
      element:e
    }, r=r===void 0?null:r, r!==null&&(t.callback=r), e=Vt(l, t, o), e!==null&&(ht(e, l, o, i), cl(e, l, o)), o
  }
  function Ml(e){
    return e=e.current, e.child?(e.child.tag===5, e.child.stateNode):null
  }
  function Pa(e, t){
    if(e=e.memoizedState, e!==null&&e.dehydrated!==null){
      var n=e.retryLane;
      e.retryLane=n!==0&&n<t?n:t
    }

  }
  function Ro(e, t){
    Pa(e, t), (e=e.alternate)&&Pa(e, t)
  }
  function Df(){
    return null
  }
  var $a=typeof reportError=="function"?reportError:function(e){
    console.error(e)
  };
  function Lo(e){
    this._internalRoot=e
  }
  Dl.prototype.render=Lo.prototype.render=function(e){
    var t=this._internalRoot;
    if(t===null)throw Error(u(409));
    Tl(e, t, null, null)
  }, Dl.prototype.unmount=Lo.prototype.unmount=function(){
    var e=this._internalRoot;
    if(e!==null){
      this._internalRoot=null;
      var t=e.containerInfo;
      sn(function(){
        Tl(null, e, null, null)
      }), t[Et]=null
    }

  };
  function Dl(e){
    this._internalRoot=e
  }
  Dl.prototype.unstable_scheduleHydration=function(e){
    if(e){
      var t=du();
      e={
        blockedOn:null, target:e, priority:t
      };
      for(var n=0;
      n<Ot.length&&t!==0&&t<Ot[n].priority;
      n++);
      Ot.splice(n, 0, e), n===0&&mu(e)
    }

  };
  function To(e){
    return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)
  }
  function Ol(e){
    return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))
  }
  function za(){

  }
  function Of(e, t, n, r, l){
    if(l){
      if(typeof r=="function"){
        var i=r;
        r=function(){
          var v=Ml(o);
          i.call(v)
        }

      }
      var o=ja(t, r, e, 0, null, !1, !1, "", za);
      return e._reactRootContainer=o, e[Et]=o.current, ar(e.nodeType===8?e.parentNode:e), sn(), o
    }
    for(;
    l=e.lastChild;
    )e.removeChild(l);
    if(typeof r=="function"){
      var s=r;
      r=function(){
        var v=Ml(a);
        s.call(v)
      }

    }
    var a=zo(e, 0, !1, null, null, !1, !1, "", za);
    return e._reactRootContainer=a, e[Et]=a.current, ar(e.nodeType===8?e.parentNode:e), sn(function(){
      Tl(t, a, n, r)
    }), a
  }
  function Fl(e, t, n, r, l){
    var i=n._reactRootContainer;
    if(i){
      var o=i;
      if(typeof l=="function"){
        var s=l;
        l=function(){
          var a=Ml(o);
          s.call(a)
        }

      }
      Tl(t, o, e, l)
    }
    else o=Of(n, t, e, l, r);
    return Ml(o)
  }
  cu=function(e){
    switch(e.tag){
      case 3:var t=e.stateNode;
      if(t.current.memoizedState.isDehydrated){
        var n=Kn(t.pendingLanes);
        n!==0&&(ni(t, n|1), Ye(t, Se()), (ie&6)===0&&(On=Se()+500, At()))
      }
      break;
      case 13:sn(function(){
        var r=Pt(e, 1);
        if(r!==null){
          var l=He();
          ht(r, e, 1, l)
        }

      }), Ro(e, 1)
    }

  }, ri=function(e){
    if(e.tag===13){
      var t=Pt(e, 134217728);
      if(t!==null){
        var n=He();
        ht(t, e, 134217728, n)
      }
      Ro(e, 134217728)
    }

  }, fu=function(e){
    if(e.tag===13){
      var t=Kt(e), n=Pt(e, t);
      if(n!==null){
        var r=He();
        ht(n, e, t, r)
      }
      Ro(e, t)
    }

  }, du=function(){
    return ue
  }, pu=function(e, t){
    var n=ue;
    try{
      return ue=e, t()
    }
    finally{
      ue=n
    }

  }, Yl=function(e, t, n){
    switch(t){
      case"input":if(Bn(e, n), t=n.name, n.type==="radio"&&t!=null){
        for(n=e;
        n.parentNode;
        )n=n.parentNode;
        for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'), t=0;
        t<n.length;
        t++){
          var r=n[t];
          if(r!==e&&r.form===e.form){
            var l=el(r);
            if(!l)throw Error(u(90));
            Wn(r), Bn(r, l)
          }

        }

      }
      break;
      case"textarea":Ao(e, n);
      break;
      case"select":t=n.value, t!=null&&Lt(e, !!n.multiple, t, !1)
    }

  }, Zo=Eo, Jo=sn;
  var Ff={
    usingClientEntryPoint:!1, Events:[dr, Cn, el, Yo, Go, Eo]
  }, _r={
    findFiberByHostInstance:bt, bundleType:0, version:"18.3.1", rendererPackageName:"react-dom"
  }, If={
    bundleType:_r.bundleType, version:_r.version, rendererPackageName:_r.rendererPackageName, rendererConfig:_r.rendererConfig, overrideHookState:null, overrideHookStateDeletePath:null, overrideHookStateRenamePath:null, overrideProps:null, overridePropsDeletePath:null, overridePropsRenamePath:null, setErrorHandler:null, setSuspenseHandler:null, scheduleUpdate:null, currentDispatcherRef:re.ReactCurrentDispatcher, findHostInstanceByFiber:function(e){
      return e=nu(e), e===null?null:e.stateNode
    }, findFiberByHostInstance:_r.findFiberByHostInstance||Df, findHostInstancesForRefresh:null, scheduleRefresh:null, scheduleRoot:null, setRefreshHandler:null, getCurrentFiber:null, reconcilerVersion:"18.3.1-next-f1338f8080-20240426"
  };
  if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){
    var Il=__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if(!Il.isDisabled&&Il.supportsFiber)try{
      Dr=Il.inject(If), yt=Il
    }
    catch{

    }

  }
  return Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ff, Ge.createPortal=function(e, t){
    var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;
    if(!To(t))throw Error(u(200));
    return Mf(e, t, null, n)
  }, Ge.createRoot=function(e, t){
    if(!To(e))throw Error(u(299));
    var n=!1, r="", l=$a;
    return t!=null&&(t.unstable_strictMode===!0&&(n=!0), t.identifierPrefix!==void 0&&(r=t.identifierPrefix), t.onRecoverableError!==void 0&&(l=t.onRecoverableError)), t=zo(e, 1, !1, null, null, n, !1, r, l), e[Et]=t.current, ar(e.nodeType===8?e.parentNode:e), new Lo(t)
  }, Ge.findDOMNode=function(e){
    if(e==null)return null;
    if(e.nodeType===1)return e;
    var t=e._reactInternals;
    if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","), Error(u(268, e)));
    return e=nu(t), e=e===null?null:e.stateNode, e
  }, Ge.flushSync=function(e){
    return sn(e)
  }, Ge.hydrate=function(e, t, n){
    if(!Ol(t))throw Error(u(200));
    return Fl(null, e, t, !0, n)
  }, Ge.hydrateRoot=function(e, t, n){
    if(!To(e))throw Error(u(405));
    var r=n!=null&&n.hydratedSources||null, l=!1, i="", o=$a;
    if(n!=null&&(n.unstable_strictMode===!0&&(l=!0), n.identifierPrefix!==void 0&&(i=n.identifierPrefix), n.onRecoverableError!==void 0&&(o=n.onRecoverableError)), t=ja(t, null, e, 1, n??null, l, !1, i, o), e[Et]=t.current, ar(e), r)for(e=0;
    e<r.length;
    e++)n=r[e], l=n._getVersion, l=l(n._source), t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n, l]:t.mutableSourceEagerHydrationData.push(n, l);
    return new Dl(t)
  }, Ge.render=function(e, t, n){
    if(!Ol(t))throw Error(u(200));
    return Fl(null, e, t, !1, n)
  }, Ge.unmountComponentAtNode=function(e){
    if(!Ol(e))throw Error(u(40));
    return e._reactRootContainer?(sn(function(){
      Fl(null, null, e, !1, function(){
        e._reactRootContainer=null, e[Et]=null
      })
    }), !0):!1
  }, Ge.unstable_batchedUpdates=Eo, Ge.unstable_renderSubtreeIntoContainer=function(e, t, n, r){
    if(!Ol(n))throw Error(u(200));
    if(e==null||e._reactInternals===void 0)throw Error(u(38));
    return Fl(e, t, n, !1, r)
  }, Ge.version="18.3.1-next-f1338f8080-20240426", Ge
}
var Ua;
function pd(){
  if(Ua)return Fo.exports;
  Ua=1;
  function y(){
    if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(y)
    }
    catch(k){
      console.error(k)
    }

  }
  return y(), Fo.exports=dd(), Fo.exports
}
var Ba;
function hd(){
  if(Ba)return Wl;
  Ba=1;
  var y=pd();
  return Wl.createRoot=y.createRoot, Wl.hydrateRoot=y.hydrateRoot, Wl
}
var md=hd();
md.createRoot(document.getElementById("root")).render(g.jsx(ad, {

}));
