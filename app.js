'use strict';
const embeddedAsset=(url)=>(window.__hitalentInlineAssets && window.__hitalentInlineAssets[url]) || url;
const pct = value => `${Number(value).toFixed(2)}%`;
const escapeHTML = s => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));

// Charts are rebuilt directly from the figures recorded in the HiTalent source document.
const recruitment = [
  ['No additional hiring',4.78],['Hiring demand expected to decrease',9.07],
  ['Hiring demand expected to remain unchanged',26.05],['Slight increase (below 5%)',18.30],
  ['Increase of 5–10%',22.92],['Increase of 10–20%',10.96],
  ['Increase of 20–50%',5.03],['Increase of more than 50%',2.89]
];
const palette=['#0a5471','#156a88','#2385a1','#2a9a94','#3aa67e','#79bda2','#a9d7ba','#d9e9d5'];
(function renderDonut(){
  let soFar=0;
  const segments = recruitment.map(([_,v],i)=>{const a=soFar;soFar+=v;return `${palette[i]} ${a}% ${soFar}%`;});
  const leg = recruitment.map(([name,value],i)=>`<div><i style="background:${palette[i]}"></i><span>${escapeHTML(name)}</span><b>${pct(value)}</b></div>`).join('');
  document.getElementById('chart-recruitment-plans').innerHTML=`<div class="donut-layout"><div role="img" aria-label="Donut chart of recruitment plans in 2026" class="donut" style="background:conic-gradient(${segments.join(',')})"><div class="donut-hole"><b>60.1%</b><span>expect growth</span></div></div><div class="donut-legend">${leg}</div></div>`;
})();
function barChart(el,rows, max, dense=false,highlight=''){
  const total=rows.map(([name,v])=>`<div class="bar-line ${name===highlight?'highlight':''}"><span class="bar-label">${escapeHTML(name)}</span><div class="bar-track" role="meter" aria-label="${escapeHTML(name)}" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${v}"><div class="bar-fill" style="--bar-width:${(v/max*100).toFixed(2)}%"></div></div><b class="bar-value">${pct(v)}</b></div>`).join('');
  const ticks=Array.from({length:5},(_,i)=>`${(i*max/4).toFixed(0)}%`).map(t=>`<span>${t}</span>`).join('');
  document.getElementById(el).innerHTML=`<div class="bar-chart ${dense?'dense':''}">${total}<div class="bar-axis">${ticks}</div></div>`;
}
barChart('chart-industries',[
  ['Sales',53.20],['Marketing & Communications',52.30],['IT – Software',28.80],['Manufacturing',20.70],['Accounting & Auditing',13.50],['Administration & HR',12.60]
],60,false,'IT – Software');
barChart('chart-challenges',[
  ['Insufficient qualified applications',63.48],['Lack of professional skills',58.12],
  ['Lack of soft skills and experience',44.02],['Company culture fit',40.23],
  ['High recruitment costs',32.48],['Competition from other companies',26.55],
  ['Weak employer branding',21.93],['Lengthy recruitment process',20.20],
  ['Recruitment process not optimized',7.25],['Other',1.03]
],70,true,'Insufficient qualified applications');
barChart('chart-technologies',[
  ['Automated CV screening',35.78],['Applicant tracking system',12.78],
  ['Candidate support chatbot',19.17],['AI-powered HR data analytics',16.93],
  ['Candidate experience system',6.71],['None of these technologies',39.94]
],40,false,'None of these technologies');

const interviewees=[
 {
  "name": "Vũ Thị Thảo",
  "age": "29 years old",
  "role": "HR at a Technology Company",
  "image": "interview-thao.webp",
  "habits": "Handles recruitment requests, clarifies job criteria and salary ranks, prepares job posts, screens CVs, coordinates interviews and maintains a separate recruitment tracking list. CVs may be stored on recruitment platforms or in local folders by department and position.",
  "pains": [
   "Candidate salary expectations may exceed the company’s salary range, requiring negotiation with candidates or the hiring department.",
   "Recruitment information is spread across platforms, local folders and a separate tracking list."
  ],
  "expectations": "A more consistent way to align job requirements, candidate suitability and interview evaluations would support HR’s coordination role.",
  "quote": "Recruitment requires HR to balance the department’s hiring needs, candidates’ expectations and the company’s salary rules."
 },
 {
  "name": "Nguyễn Thu Phương",
  "age": "25 years old",
  "role": "HR at a Technology Company",
  "image": "interview-phuong.webp",
  "habits": "Coordinates job intake, sourcing, CV screening, interview scheduling, candidate communication and status follow-up across HR, hiring managers, technical interviewers and candidates. The scenario assumes spreadsheets, email/chat and calendar tools.",
  "pains": [
   "Manual CV screening and tracking across spreadsheets and files is time-consuming.",
   "Inconsistent interview criteria and forms make feedback consolidation and candidate comparison difficult.",
   "Following up on pending reviews and interview feedback delays recruitment progress."
  ],
  "expectations": "A system that keeps CVs and candidate progress in one place, provides a common interview evaluation form, and helps HR track pending feedback.",
  "quote": "I need one place to track each candidate and a consistent way to collect interview feedback, so I can compare evaluations and move candidates forward without chasing updates or reconciling different forms."
 },
 {
  "name": "Phạm Thế Anh",
  "age": "35 years old",
  "role": "Tech Lead at a Technology Company",
  "image": "interview-the-anh.webp",
  "habits": "Clarifies technical requirements, reviews shortlisted CVs, participates in technical interviews and provides recommendations to HR or the hiring manager. The scenario assumes CVs and interview feedback are shared through email, chat or separate forms.",
  "pains": [
   "Repeated clarification with HR because technical requirements are unclear or their practicality has not been fully aligned.",
   "Heavy workload may cause the Tech Lead to miss HR's requests, reminders, or updates.",
   "Reviewing shortlisted CVs takes time when technical experience and actual contributions are not clearly presented."
  ],
  "expectations": "A system that helps validate whether recruitment requirements are sufficiently clear and appropriate for the technical role, reducing repeated clarification with HR, while providing timely reminders for pending requests and tasks to prevent missed updates.",
  "quote": "I want to make sure the technical requirements are clear and reasonable before recruitment starts, so we do not have to go back and forth with HR. I also need reminders for pending requests or updates to avoid missing anything while handling project work."
 }
];
const interviewGrid=document.getElementById('interview-grid');
interviewGrid.innerHTML=interviewees.map(p=>`<article class="interview-card"><div class="interview-head"><img src="${embeddedAsset(p.image)}" alt="Illustrative portrait of a technology company professional" loading="lazy"/><div class="interview-meta"><strong>USER INTERVIEW</strong><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.age)}<br>${escapeHTML(p.role)}</p></div></div><div class="interview-body"><div class="interview-block"><h4>Habits</h4><p>${escapeHTML(p.habits)}</p></div><div class="interview-block"><h4>Pain Points</h4><ul>${p.pains.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ul></div><div class="interview-block"><h4>Expectations</h4><p>${escapeHTML(p.expectations)}</p></div><div class="interview-quote">“${escapeHTML(p.quote)}”</div></div></article>`).join('');

const personas=[
 {name:'HR / Recruiter',image:'persona-hr.webp',quote:'I need one place to manage candidate information and recruitment progress, while making it easier to collect consistent interview feedback and coordinate with hiring teams.',
 goals:['Hire qualified candidates within the salary budget.','Keep candidate information and status centralized.','Coordinate stakeholders and collect consistent feedback.'],
 frustrations:['Repeated back-and-forth in scheduling and coordination.','Manual CV screening, scattered profiles and hard-to-build reports.','Inconsistent scorecards complicate hiring decisions.'],
 behaviors:['Screens CVs and maintains tracking spreadsheets.','Uses recruiting sites, email, chat and calendars.','Schedules interviews and consolidates feedback.'],
 context:'Works across departments and positions; coordinates with hiring managers, Tech Leads and candidates throughout recruitment.'},
 {name:'Tech Lead',image:'persona-techlead.webp',quote:'I want clear, reasonable technical requirements and reminders for pending reviews, so I do not miss important updates while handling project work.',
 goals:['Define realistic technical hiring requirements.','Identify practical skills and relevant project experience.','Complete evaluations without delaying project work.'],
 frustrations:['Repeated alignment with HR when criteria are unclear.','Project priorities can cause missed recruiting updates.','CVs often obscure real contributions and experience.'],
 behaviors:['Clarifies technologies and skill expectations with HR.','Reviews shortlisted CVs and conducts interviews.','Sends feedback through chat, email or separate forms.'],
 context:'Leads a technical team and balances delivery work with candidate reviews, technical interviews and hiring recommendations.'}
];
const personaList=document.getElementById('persona-list');
personaList.innerHTML=personas.map(p=>`<article class="persona-card"><div class="persona-photo"><img loading="lazy" src="${embeddedAsset(p.image)}" alt="Illustrative portrait of ${escapeHTML(p.name)}" /></div><div class="persona-content"><div class="persona-header"><h3 class="persona-name">${escapeHTML(p.name)}</h3><span class="role-label">Primary role in the hiring workflow</span></div><div class="persona-grid">${[['Goals',p.goals],['Frustrations',p.frustrations],['Behaviors',p.behaviors],['Context',[p.context]]].map(([heading,bullets])=>`<div class="persona-box"><h4>${heading}</h4><ul>${bullets.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ul></div>`).join('')}</div><div class="persona-quote">“${escapeHTML(p.quote)}”</div></div></article>`).join('');

// Completely local, dependency-free pan and zoom of XML-derived vector BPMN diagrams.
const diagramMeta={
 'erd':{svg:'erd-full.svg',file:'HiTalent_ERD.drawio',width:1972,height:2086,title:'Entity Relationship Diagram'},
 'as-is':{svg:'as-is.svg',file:'as-is.bpmn',width:4650,height:1055,title:'Current recruitment process'},
 '1':{svg:'flow-1.svg',file:'Flow 1 Recruitment management system.bpmn',width:1550,height:833,title:'Flow 1 · Recruitment Request Management'},
 '2':{svg:'flow-2.svg',file:'Flow 2. Recruitment Preparation & Candidate Screening.bpmn',width:2040,height:705,title:'Flow 2 · Recruitment Preparation & Candidate Screening'},
 '3':{svg:'flow-3.svg',file:'Flow 3. Interview Scheduling & Booking Link.bpmn',width:2660,height:1125,title:'Flow 3 · Interview Scheduling & Booking Link'},
 '4':{svg:'flow-4.svg',file:'Flow 4. Interview & Candidate Evaluation.bpmn',width:4170,height:975,title:'Flow 4 · Interview & Candidate Evaluation'},
 '5':{svg:'flow-5.svg',file:'Flow 5. Hiring Decision & Offer Management.bpmn',width:1900,height:795,title:'Flow 5 · Hiring Decision & Offer Management'}
};
function initBpmn(panel,initial){
 const vp=panel.querySelector('.bpmn-viewport'),canvas=panel.querySelector('.bpmn-canvas'),im=canvas.querySelector('img'),zoomLabel=panel.querySelector('.zoom-label'),download=panel.querySelector('.download-bpmn'),title=panel.querySelector('.diagram-title span:last-child');
 let meta=diagramMeta[initial],scale=1,tx=0,ty=0,drag=null;
 function apply(){canvas.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`;zoomLabel.textContent=`${Math.round(scale*100)}%`;}
 function fit(){const w=vp.clientWidth,h=vp.clientHeight;if(!w||!h)return;scale=Math.min((w-28)/meta.width,(h-28)/meta.height);tx=(w-meta.width*scale)/2;ty=(h-meta.height*scale)/2;apply();}
 function reset(){scale=1;tx=(vp.clientWidth-meta.width)/2;ty=(vp.clientHeight-meta.height)/2;apply();}
 function zoom(factor,x=vp.clientWidth/2,y=vp.clientHeight/2){const next=Math.max(.06,Math.min(scale*factor,6));const wx=(x-tx)/scale,wy=(y-ty)/scale;scale=next;tx=x-wx*scale;ty=y-wy*scale;apply();}
 function setSource(id){meta=diagramMeta[id];im.src=embeddedAsset(meta.svg);im.width=meta.width;im.height=meta.height;im.alt=`Vector diagram: ${meta.title}`;if(download){download.href=embeddedAsset(meta.file);download.download=meta.file.split("/").pop();}title.textContent=meta.title;im.onload=fit;fit();}
 panel.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.action;if(a==='zoom-in')zoom(1.3);if(a==='zoom-out')zoom(1/1.3);if(a==='fit')fit();if(a==='reset')reset();if(a==='fullscreen'){if(document.fullscreenElement===panel){document.exitFullscreen?.();}else if(panel.requestFullscreen){panel.requestFullscreen().then(()=>setTimeout(fit,80)).catch(()=>window.open(embeddedAsset(meta.svg),'_blank','noopener'));}else{window.open(embeddedAsset(meta.svg),'_blank','noopener');}}}));
 vp.addEventListener('wheel',e=>{e.preventDefault();const rect=vp.getBoundingClientRect();zoom(e.deltaY<0?1.12:1/1.12,e.clientX-rect.left,e.clientY-rect.top);},{passive:false});
 vp.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,tx,ty};vp.setPointerCapture(e.pointerId);vp.classList.add('dragging');});
 vp.addEventListener('pointermove',e=>{if(!drag)return;tx=drag.tx+e.clientX-drag.x;ty=drag.ty+e.clientY-drag.y;apply();});
 vp.addEventListener('pointerup',()=>{drag=null;vp.classList.remove('dragging');});
 vp.addEventListener('pointercancel',()=>{drag=null;vp.classList.remove('dragging');});
 vp.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){zoom(1.2);e.preventDefault();}else if(e.key==='-'){zoom(1/1.2);e.preventDefault();}else if(e.key==='0'){fit();e.preventDefault();}else if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){const d=50;tx+=e.key==='ArrowRight'?-d:e.key==='ArrowLeft'?d:0;ty+=e.key==='ArrowDown'?-d:e.key==='ArrowUp'?d:0;apply();e.preventDefault();}});
 window.addEventListener('resize',()=>{fit();});
 document.addEventListener('fullscreenchange',()=>{if(document.fullscreenElement===panel||!document.fullscreenElement)fit();});
 im.onload=fit;if(im.complete)requestAnimationFrame(fit);
 return {setSource,fit};
}
initBpmn(document.getElementById('as-is-viewer'),'as-is');
const toBeViewer=initBpmn(document.getElementById('to-be-viewer'),'1');
const erdViewer=initBpmn(document.getElementById('erd-viewer'),'erd');
document.querySelectorAll('#flow-tabs button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('#flow-tabs button').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-selected','false');});
 btn.classList.add('selected');btn.setAttribute('aria-selected','true');toBeViewer.setSource(btn.dataset.flow);
}));

// Live Figma design embed: the original file, not simulated UI screenshots.
const figmaFrame = document.getElementById('hitalent-figma-embed');
const figmaBoard = document.getElementById('figma-design-board');
if(figmaFrame && figmaBoard){
  const expand=document.getElementById('figma-expand');
  if(expand){expand.addEventListener('click',()=>{
    if(document.fullscreenElement===figmaBoard){document.exitFullscreen?.();return;}
    figmaBoard.requestFullscreen?.();
  });}
}

const nav=document.getElementById('site-nav'),menuToggle=document.querySelector('.mobile-menu-toggle');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
if('IntersectionObserver' in window){const links=[...nav.querySelectorAll('a[href^="#"]')],map=new Map(links.map(l=>[l.getAttribute('href').slice(1),l]));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('is-active'));map.get(e.target.id)?.classList.add('is-active');}}),{rootMargin:'-18% 0px -69% 0px'});document.querySelectorAll('main section[id]').forEach(x=>observer.observe(x));}

// Progressive enhancement: scroll reveals, animated data graphics and a slim reading rail.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion&&'IntersectionObserver' in window){
  const revealTargets=document.querySelectorAll('.section-intro,.chart-card,.interview-card,.persona-card,.problem-role,.fit-section,.text-block,.figma-intro-banner,.figma-design-board,.pending-placeholder');
  revealTargets.forEach((el,i)=>{el.classList.add('reveal-up');});
  document.documentElement.classList.add('js-motion');
  const revObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');if(entry.target.classList.contains('chart-card'))entry.target.classList.add('chart-visible');revObserver.unobserve(entry.target);}})},{threshold:.09,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach(el=>revObserver.observe(el));
}
const progressBar=document.getElementById('reading-progress-bar');
let pendingScroll=false;
function updateReading(){const span=document.documentElement.scrollHeight-window.innerHeight;progressBar.style.transform=`scaleX(${span>0?Math.min(1,window.scrollY/span):0})`;pendingScroll=false;}
window.addEventListener('scroll',()=>{if(!pendingScroll){pendingScroll=true;requestAnimationFrame(updateReading);}},{passive:true});
window.addEventListener('resize',updateReading,{passive:true});updateReading();

// Resolve bundled document links (the standalone edition uses local Blob URLs).
document.querySelectorAll('[data-local-asset]').forEach(a=>{a.href=embeddedAsset(a.dataset.localAsset);});
