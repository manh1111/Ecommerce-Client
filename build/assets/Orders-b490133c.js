import{j as e,P as n,C as S}from"./mui-d65b584a.js";import{S as u,_ as C,u as b,N as w,q as g,O as x,P as k,n as h}from"./index-f39d8328.js";import{C as _}from"./CalendarSelector-6506d4ec.js";import{L as j}from"./LabeledProgressBar-df31f288.js";import{C as R}from"./Counter-c5cdacf4.js";import{S as y}from"./SubmenuTrigger-9dbbd789.js";import{a0 as P,r as p}from"./antd-87a612df.js";import{u as O,P as T}from"./usePagination-b378c240.js";import{R as E}from"./RatingStars-ccc1f45b.js";import{e as B}from"./helpers-7367c208.js";import{E as F}from"./Empty-22acff0e.js";import{O as D}from"./columnDefs-512a0d21.js";import{i as I,a as L,b as $}from"./1-32045ba2.js";import{c as G,e as U,a as q,b as z,d as A,f as V,i as W}from"./3-c43534a0.js";import"./ProgressBar-38b679df.js";import"./Timestamp-010b6fc3.js";import"./Trend-689615ed.js";const H=()=>e.jsxs(u,{className:"card flex flex-col gap-4",children:[e.jsx("h5",{children:"Average Rate (%)"}),e.jsxs("div",{className:"flex flex-col gap-2.5",children:[e.jsx(j,{color:"header",label:"Product Views",value:87,displayValue:"87%"}),e.jsx(j,{color:"header",label:"Cart Abandonment Rate",value:23,displayValue:"23%"})]})]}),m=({icon:a,color:t="accent",title:r="Lorem ipsum",count:l=0})=>e.jsxs(u,{className:"card !pb-5",children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsx("div",{className:"badge-icon badge-icon--sm",style:{backgroundColor:`var(--${t})`},children:a}),e.jsx(y,{})]}),e.jsxs("h6",{className:"mt-[28px] mb-2.5",children:[e.jsx("span",{className:"xl:hidden 2xl:inline",children:"Orders "}),r]}),e.jsx(R,{className:"h3",num:l})]});m.propTypes={icon:n.node,color:n.oneOf(["accent","green","red","badge-status-bg"]),title:n.string,count:n.number};const K=C(P).withConfig({displayName:"styles__StyledTable",componentId:"sc-gvbfgj-0"})(["margin-bottom:30px;flex-grow:1;.ant-table{padding:0 26px;}.ant-table-thead .ant-table-cell{padding:33px 0 28px !important;background:var(--widget);&:last-child{text-align:right;}}.ant-table-row:last-child .ant-table-cell{border-bottom:0;}.ant-table-row .ant-table-cell{padding:32px 0;}.ant-table-cell{border-color:var(--input-border) !important;}@media (min-width:1536px){.product-cell{width:23%;}}"]),N=({order:a,activeCollapse:t,handleCollapse:r})=>{const l=b().width<375,i=a.payment.amount===a.payment.received?"Fully paid":a.payment.amount>a.payment.received&&a.payment.received!==0?"Partially paid":"Unpaid";return e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"subheading-2",children:["#",a.orderNumber]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("button",{className:`collapse-btn ${t===a.sku?"active":""}`,"aria-label":"Toggle view",onClick:()=>r(a.sku),children:e.jsx("i",{className:"icon icon-caret-down-solid"})}),e.jsx(w,{to:"/product-editor","aria-label":"Edit",children:e.jsx("i",{className:"icon icon-pen-to-square-regular"})}),e.jsx(y,{})]})]}),e.jsx(S,{in:t===a.sku,children:e.jsx("table",{className:"basic-table",children:e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsx("td",{colSpan:2,children:"Product"})}),e.jsx("tr",{children:e.jsx("td",{colSpan:2,children:e.jsxs("div",{className:"flex gap-6",children:[e.jsx("div",{className:"img-wrapper w-[70px] h-[64px] flex items-center justify-center",children:e.jsx("img",{src:a.product.image,alt:a.product.name})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h5",{className:"text-sm mb-1.5",children:a.product.name}),e.jsxs("div",{className:"flex flex-col gap-1 text-sm text-body-text",children:[e.jsxs("p",{children:["Regular price: $",a.product.regular_price]}),a.product.sale_price&&e.jsxs("p",{children:["Sale price: $",a.product.sale_price]})]})]})]})})}),e.jsxs("tr",{children:[e.jsx("td",{children:"SKU"}),e.jsx("td",{children:a.sku})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Category"}),e.jsx("td",{className:"capitalize",children:a.category})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Payment"}),e.jsx("td",{children:e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("span",{className:"font-heading font-bold text-header",children:[i!=="Fully paid"&&`$${a.payment.received} / from `,"$",a.payment.amount]}),e.jsx("span",{children:i})]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Status"}),e.jsx("td",{className:"capitalize",children:l?a.status:e.jsx("span",{className:"badge-status badge-status--lg",style:{backgroundColor:`var(--${B(a.status)})`,width:"100%"},children:a.status})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Rate"}),e.jsx("td",{children:l?a.rating:e.jsx("div",{className:"flex justify-center",children:e.jsx(E,{rating:a.rating})})})]})]})})})]})};N.propTypes={order:n.object.isRequired,activeCollapse:n.string.isRequired,handleCollapse:n.func.isRequired};const f=[{orderNumber:123456,sku:"123456FR",status:"completed",rating:3.5,category:"electronics",payment:{amount:600,received:600},product:{name:"Oculus Quest 2 VR Headset 64 GB",image:I,regular_price:600,sale_price:559}},{orderNumber:154844,sku:"598741FR",status:"confirmed",rating:4.5,category:"fashion",payment:{amount:4e3,received:180},product:{name:"Levis Standard Issue Backpack Black",image:G,regular_price:100}},{orderNumber:202587,sku:"485912TY",status:"cancelled",rating:4.5,category:"electronics",payment:{amount:200,received:0},product:{name:"Xiaomi WiFI Repeater Pro",image:L,regular_price:200,sale_price:180}},{orderNumber:300411,sku:"365487RT",status:"confirmed",rating:4.5,category:"services",payment:{amount:9.99,received:9.99},product:{name:"UPS Express Shipping",image:$,regular_price:9.99}},{orderNumber:785241,sku:"002315ES",status:"confirmed",rating:4.5,category:"fashion",payment:{amount:40,received:40},product:{name:"Parfois Woman Flower Backpack",image:U,regular_price:20,sale_price:15.99}},{orderNumber:458745,sku:"541125FR",status:"completed",rating:0,category:"food",payment:{amount:129.54,received:129.54},product:{name:"Goodwill Sanctuary Sanca Olive Oil 5L",image:q,regular_price:129.54}},{orderNumber:105488,sku:"252596FR",status:"confirmed",rating:5,category:"food",payment:{amount:78.99,received:52.18},product:{name:"Guylian Seashells Belgian Chocolate 1kg",image:z,regular_price:78.99,sale_price:69.99}},{orderNumber:900541,sku:"002315BN",status:"cancelled",rating:0,category:"fashion",payment:{amount:118.99,received:0},product:{name:"Puma Crossbody Bag Black Unisex",image:A,regular_price:118.99,sale_price:99.99}},{orderNumber:121844,sku:"814315LP",status:"refunded",rating:0,category:"services",payment:{amount:9.99,received:0},product:{name:"Sustainable packaging services for 1 item",image:V,regular_price:9.99}},{orderNumber:240412,sku:"361087RT",status:"completed",rating:4.5,category:"electronics",payment:{amount:200,received:200},product:{name:"SteamDeck Gaming Console 64 GB",image:W,regular_price:200,sale_price:180}}],M=({category:a,sort:t})=>{const{width:r}=b(),[l,i]=p.useState(""),d=a.value==="all"?f:f.filter(s=>s.category===a.value),o=O((()=>{switch(t.value){default:case"default":return d;case"a-z":return d.sort((s,c)=>s.product.name.localeCompare(c.product.name));case"z-a":return d.sort((s,c)=>c.product.name.localeCompare(s.product.name));case"rating-high-to-low":return d.sort((s,c)=>c.rating-s.rating);case"rating-low-to-high":return d.sort((s,c)=>s.rating-c.rating)}})(),5);p.useEffect(()=>{o.goToPage(0),i("")},[a,t]),p.useEffect(()=>{i("")},[o.currentPage,r]);const v=s=>{i(l===s?"":s)};return e.jsxs(u,{className:"flex flex-col flex-1 w-full",children:[r>=768?e.jsx(K,{columns:D,dataSource:o.currentItems(),pagination:!1,locale:{emptyText:e.jsx(F,{text:"No orders found"})},rowKey:s=>s.orderNumber}):e.jsx("div",{className:"flex flex-1 flex-col gap-5 mb-[26px]",children:o.currentItems().map(s=>e.jsx(N,{order:s,activeCollapse:l,handleCollapse:v},s.sku))}),o.maxPage>1&&e.jsx(T,{pagination:o})]})},ue=()=>{const[a,t]=p.useState(g[0]),[r,l]=p.useState(x[0]);return e.jsxs(e.Fragment,{children:[e.jsx(k,{title:"Orders"}),e.jsxs("div",{className:"flex flex-col flex-1 gap-5 md:gap-[26px]",children:[e.jsxs("div",{className:`w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] lg:grid-cols-4 lg:items-end\r
                     xl:grid-cols-6`,children:[e.jsx(_,{wrapperClass:"lg:max-w-[275px] lg:col-span-2 xl:col-span-4",id:"ordersPeriodSelector"}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] md:col-span-2",children:[e.jsx(h,{value:a,options:g,onChange:t,placeholder:"Product category"}),e.jsx(h,{value:r,options:x,onChange:l,placeholder:"Default sorting"})]})]}),e.jsxs("div",{className:"w-full widgets-grid grid-cols-1 xl:grid-cols-6",children:[e.jsx("div",{className:"xl:col-span-2",children:e.jsx(H,{})}),e.jsxs("div",{className:"widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4",children:[e.jsx(m,{title:"Completed",count:2345,icon:e.jsx("i",{className:"icon-check-to-slot-solid"})}),e.jsx(m,{title:"Confirmed",count:323,color:"green",icon:e.jsx("i",{className:"icon-list-check-solid"})}),e.jsx(m,{title:"Canceled",count:17,color:"red",icon:e.jsx("i",{className:"icon-ban-solid"})}),e.jsx(m,{title:"Refunded",count:2,color:"badge-status-bg",icon:e.jsx("i",{className:"icon-rotate-left-solid"})})]})]}),e.jsx(M,{category:a,sort:r})]})]})};export{ue as default};