let store={};class LinkInformation{constructor(a,b,c){this.items={},this.root=a,this.parent=b,c?this.level=this.parent.link.level+1:(store[a.id]=[{}],this.level=0)}configuration(){var a=store[this.root.id][this.level]||(store[this.root.id][this.level]={});return a}}export{store};export default LinkInformation;