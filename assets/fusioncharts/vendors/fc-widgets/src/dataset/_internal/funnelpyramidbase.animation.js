let fadeIn={initialAttr:{opacity:0},finalAttr:{opacity:1},slot:'final'},effect=()=>({"connector.appearing":()=>[fadeIn],"connector.transform":a=>[{initialAttr:{path:a.attr.path},finalAttr:{path:a.attr.path}}],"dataLabel.appearing":()=>[fadeIn],"dataLabel.transform":a=>[{initialAttr:{transform:a.attr.transform},finalAttr:{transform:a.attr.transform}}],"path.appearing":()=>[Object.assign({},fadeIn,{slot:'plot'})]});export default{"initial.dataset.funnel":effect,"initial.dataset.pyramid":effect};