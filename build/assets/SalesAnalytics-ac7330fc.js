import{j as e}from"./mui-d65b584a.js";import{h as d,S as c,l as g,i as N,N as o,u as m,P as v}from"./index-f39d8328.js";import{I as p,c as b,w}from"./wallet-4134eb5b.js";import{C as r}from"./Counter-c5cdacf4.js";import{T as t}from"./Trend-689615ed.js";import{u as h,S as j}from"./useSubmenu-91c92a64.js";import{n as f,c as y}from"./helpers-7367c208.js";import{R as k,B as S,C,X as K,Y as P,T as R,a as x}from"./recharts-c7aabeec.js";import{c as T}from"./coins-72e96bb2.js";import{T as A}from"./TotalBalance-843ea245.js";import"./antd-87a612df.js";const F=()=>{const{theme:s}=d(),{anchorEl:a,open:n,handleClick:l,handleClose:i}=h();return e.jsxs(c,{className:"card flex flex-col gap-4 md:flex-row md:gap-[26px] lg:col-span-3 xl:col-span-2 2xl:col-span-1",children:[e.jsxs("div",{className:`h-[230px] rounded-md bg-body border border-input-border p-5 flex flex-col items-center\r
                 justify-center gap-6 shrink-0 md:w-[190px]`,children:[e.jsx("img",{className:"h-20 w-auto ml-2.5",src:s==="light"?g:N,alt:"ShopPoint"}),e.jsx("span",{className:"font-heading font-bold text-xl leading-[1.1] text-header",children:"ShopPoint"})]}),e.jsxs("div",{className:"flex flex-1 flex-col gap-8",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("h3",{children:"ShopPoint - Retail"}),e.jsx("p",{children:"Aliquam erat volutpat. Duis molestie ultrices tempus. Mauris sem orci, euismod sit amet."})]}),e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("h5",{children:"Average Rate 2023"}),e.jsx(p,{onClick:l})]}),e.jsxs("div",{className:"flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between xl:max-w-[670px]",children:[e.jsxs("div",{className:"flex gap-5",children:[e.jsx("div",{className:"badge-icon bg-green",children:e.jsx("i",{className:"icon-diamond text-[23px] mt-1"})}),e.jsxs("div",{children:[e.jsx(r,{className:"block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]",num:15412,prefix:"$"}),e.jsx("span",{className:"block label-text mb-2",children:"Income"}),e.jsx(t,{value:45.21})]})]}),e.jsxs("div",{className:"flex gap-5",children:[e.jsx("div",{className:"badge-icon bg-red",children:e.jsx("i",{className:"icon-tax text-lg"})}),e.jsxs("div",{children:[e.jsx(r,{className:"block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]",num:53487,prefix:"$"}),e.jsx("span",{className:"block label-text mb-2",children:"Expense"}),e.jsx(t,{value:-12})]})]}),e.jsxs("div",{className:"flex gap-5",children:[e.jsx("div",{className:"badge-icon bg-accent",children:e.jsx("i",{className:"icon-barcode"})}),e.jsxs("div",{children:[e.jsx(r,{className:"block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]",num:5412}),e.jsx("span",{className:"block label-text mb-2",children:"New Orders"}),e.jsx(t,{value:14.36})]})]})]})]})]}),e.jsx(j,{anchorEl:a,open:n,onClose:i,children:e.jsxs("div",{className:"flex flex-col items-start gap-5 p-5",children:[e.jsxs(o,{className:"menu-btn subheading-2",to:"/seller-profile",children:[e.jsx("span",{className:"icon-wrapper",children:e.jsx("i",{className:"icon icon-chart-pie-solid"})}),"View Profile"]}),e.jsxs("button",{className:"menu-btn subheading-2",children:[e.jsx("span",{className:"icon-wrapper",children:e.jsx("i",{className:"icon icon-link-solid"})}),"Contacts"]}),e.jsxs("button",{className:"menu-btn subheading-2",children:[e.jsx("span",{className:"icon-wrapper",children:e.jsx("i",{className:"icon icon-share-solid"})}),"Share"]})]})})]})},B=[{name:"Jan",revenue:4e3,expense:2400},{name:"Feb",revenue:3e3,expense:1398},{name:"Mar",revenue:2e3,expense:9800},{name:"Apr",revenue:3450,expense:3908},{name:"May",revenue:8e3,expense:4800},{name:"Jun",revenue:2390,expense:6800},{name:"Jul",revenue:1900,expense:4300},{name:"Aug",revenue:8900,expense:4500},{name:"Sep",revenue:5600,expense:1e4},{name:"Oct",revenue:6450,expense:1200},{name:"Nov",revenue:7840,expense:3e3},{name:"Dec",revenue:3490,expense:4300}],D=({active:s,payload:a,label:n})=>s&&a&&a.length?e.jsxs("div",{className:"chart-tooltip p-4",children:[e.jsx("h6",{className:"mb-1",children:n}),e.jsx("div",{className:"flex flex-col",children:a.map((l,i)=>e.jsxs("div",{className:"flex gap-1.5",children:[e.jsxs("span",{className:"label-text capitalize",children:[l.name,":"]}),e.jsx("span",{className:"h6 !text-sm",children:f(l.value,1,"$")})]},i))})]}):null,E=()=>{const{theme:s}=d(),{width:a}=m(),n=s==="light"?"var(--header)":"#C4DEFF",l=s==="light"?"var(--input-border)":"#8D8D99";return e.jsxs(c,{className:"card flex flex-col h-[300px] md:h-[494px] lg:col-span-3 xl:col-span-1",children:[e.jsxs("div",{className:"flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center",children:[e.jsx("h4",{children:"Sales Statistic 2022"}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("span",{className:"w-4 h-4 rounded-full",style:{background:n}}),e.jsx("span",{className:"font-heading font-semibold text-sm text-header",children:"Revenue"})]}),e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("span",{className:"w-4 h-4 rounded-full",style:{background:l}}),e.jsx("span",{className:"font-heading font-semibold text-sm text-header",children:"Expense"})]})]})]}),e.jsx("div",{className:"flex-1",children:e.jsx(k,{width:"100%",height:"100%",children:e.jsxs(S,{data:B,margin:!1,children:[e.jsx(C,{strokeDasharray:"3 3",vertical:!1,stroke:"var(--input-border)",strokeOpacity:.6}),e.jsx(K,{dataKey:"name",tickLine:!1,axisLine:!1,dy:9,hide:a<768,tick:{fontSize:14,fontFamily:"var(--heading-font)",fontWeight:700,fill:"var(--header)"}}),e.jsx(P,{tickLine:!1,axisLine:!1,tickFormatter:i=>f(i,0,"$"),tick:{fill:"var(--header)"},hide:a<768}),e.jsx(R,{cursor:!1,content:e.jsx(D,{})}),e.jsx(x,{dataKey:"revenue",fill:n,maxBarSize:16,radius:10}),e.jsx(x,{dataKey:"expense",fill:l,strokeWidth:2,maxBarSize:16,radius:10})]})})})]})},$=[{dataKey:"revenue",icon:T},{dataKey:"expense",icon:b},{dataKey:"profit",icon:w}],z=({data:s})=>e.jsxs("div",{className:"flex items-center justify-between rounded-md bg-body border p-[13px] md:py-0 md:px-[26px] md:h-[80px]",children:[e.jsxs("div",{className:"flex items-center gap-3 w-[100px] md:w-[150px] 2xl:w-[100px] 4xl:w-[150px]",children:[e.jsx("div",{className:"hidden md:flex 2xl:hidden 4xl:flex w-[52px] h-[52px] items-center",children:e.jsx("img",{src:$.find(a=>a.dataKey===s.dataKey).icon,alt:s.title})}),e.jsx("h6",{children:s.title})]}),e.jsxs("span",{className:"h6 !text-sm",children:["$",y(s.amount)]}),e.jsx(t,{wrapperClass:"hidden w-[90px] xs:flex",value:s.trend})]}),I=[{dataKey:"revenue",title:"Revenue",amount:176120,trend:45},{dataKey:"expense",title:"Expense",amount:310452,trend:-12},{dataKey:"profit",title:"Profit",amount:342558,trend:14.56}],L=()=>{const{anchorEl:s,open:a,handleClick:n,handleClose:l}=h();return e.jsxs(c,{className:"card flex flex-col lg:col-span-3 xl:col-span-1",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h4",{children:"Total Report"}),e.jsx(p,{onClick:n})]}),e.jsx("p",{className:"mt-1.5 mb-4 text-sm md:text-base",children:"All Periods per 01/01/2022 - 08/28/2023"})]}),e.jsx("div",{className:"flex flex-col flex-1 gap-6 mb-6",children:I.map((i,u)=>e.jsx(z,{data:i},u))}),e.jsx(o,{className:"btn btn--primary",to:"/revenue-by-period",children:"More Details"}),e.jsx(j,{anchorEl:s,open:a,onClose:l,children:e.jsxs("div",{className:"flex flex-col items-start gap-5 p-5",children:[e.jsxs("button",{className:"menu-btn subheading-2",children:[e.jsx("span",{className:"icon-wrapper",children:e.jsx("i",{className:"icon icon-share-solid"})}),"Share"]}),e.jsxs("button",{className:"menu-btn subheading-2",children:[e.jsx("span",{className:"icon-wrapper",children:e.jsx("i",{className:"icon icon-print-solid"})}),"Print"]})]})})]})},Q=()=>{const{width:s}=m();return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"Sales Analytics"}),e.jsxs("div",{className:"widgets-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-[minmax(0,_951px)_minmax(0,_1fr)]",children:[e.jsx(F,{}),s>=1536&&e.jsx(A,{}),e.jsx(E,{}),e.jsx(L,{})]})]})};export{Q as default};