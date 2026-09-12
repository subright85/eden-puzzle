const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(m[1]);
const source=html.slice(html.indexOf('function coinS(){'),html.indexOf('/* ── 조각 수 시트'));
function app(seed={}){
 const data=structuredClone(seed);let day='2026-09-11';
 const ctx={store:{get:(k,d)=>k in data?structuredClone(data[k]):d,set:(k,v)=>data[k]=structuredClone(v),del:k=>delete data[k]},dayStamp:()=>day,lang:'ko',mode:'kid',findScene:id=>({free:id==='free'}),$:()=>({textContent:'',parentElement:{}})};
 vm.createContext(ctx);vm.runInContext(source,ctx);
 return {ctx,data,nextDay:()=>day='2026-09-12'};
}
{
 const {ctx,data,nextDay}=app({coinS:8,coinR:{d:'2026-09-11',n:2}});
 ctx.dailyCoins();assert.equal(ctx.coinS(),10);assert.equal(data.coinR,undefined);
 ctx.dailyCoins();assert.equal(ctx.coinS(),10,'No duplicate migration or daily grant');
 nextDay();ctx.dailyCoins();assert.equal(ctx.coinS(),13);ctx.dailyCoins();assert.equal(ctx.coinS(),13);
 assert.equal(ctx.spendCoin(),true);assert.equal(ctx.coinS(),12);
}
{
 const {ctx}=app({coinS:5,coinR:{d:'2026-09-10',n:3}});ctx.dailyCoins();assert.equal(ctx.coinS(),8,'Expired allowance is replaced by exactly one daily grant');
}
{
 const {ctx}=app({singleCoinMigrated:true,coinDay:'2026-09-11',coinS:0});assert.equal(ctx.spendCoin(),false);assert.equal(ctx.coinS(),0);
 assert.equal(ctx.isPrem('photo',false),false);assert.equal(ctx.isPrem('locked',true),false);assert.equal(ctx.isPrem('free',false),false);assert.equal(ctx.isPrem('locked',false),true);
}
{
 const {ctx,data}=app();
 for(const [n,id] of [[6,'oak'],[12,'ceramic'],[24,'walnut'],[48,'gold'],[96,'gold'],[150,'gold']])assert.equal(ctx.recordCompletion('a',n).frame.id,id);
 const replay=ctx.recordCompletion('a',6);assert.equal(replay.best,150);assert.equal(replay.frame.id,'gold');assert.equal(replay.upgraded,false);
 assert.equal(ctx.bestCount('b'),0);assert.equal(ctx.recordCompletion('b',6).upgraded,true);assert.equal(data.done.a,true);
}
{
 const {ctx}=app({done:{old:true}});const r=ctx.recordCompletion('old',24);assert.equal(r.frame.id,'walnut');assert.equal(r.upgraded,true,'Legacy completions can upgrade without losing history');
}
assert(!html.includes('id="coinRN"'));
assert(!html.includes('id="acct"'));
assert(!html.includes('id="acctBtn"'));
assert(!html.includes('⭐⭐⭐'));
for(const f of ['oak','ceramic','walnut','gold'])assert(fs.existsSync(`assets/ui/frames/${f}-v1.png`));
console.log('PASS: coin migration, daily grants, spending, photo access, frame thresholds, no downgrade, legacy progress, syntax/assets');

{
 const {ctx}=app();
 assert.equal(ctx.frameSrc(ctx.frameFor(12)), 'assets/ui/frames/ceramic-kid-v1.png');
 assert.equal(ctx.frameName(ctx.frameFor(12)), '숲속');
 ctx.mode='adult';
 for(const [n,id] of [[24,'oak'],[48,'ceramic'],[96,'walnut'],[150,'gold']])assert.equal(ctx.frameFor(n).id,id);
 assert.equal(ctx.frameSrc(ctx.frameFor(48)), 'assets/ui/frames/ceramic-v1.png');
 assert.equal(ctx.frameName(ctx.frameFor(48)), '도자기');
 for(const f of ['oak','ceramic','walnut','gold'])assert(fs.existsSync(`assets/ui/frames/${f}-kid-v1.png`));
}
{
 const ctx={mode:'kid',photoImg:null};vm.createContext(ctx);
 for(const name of ['SCENES','ARTS','PACKS']){const start=html.indexOf('const '+name+'=['),end=html.indexOf('\n];',start)+3;const data=html.slice(start,end);for(const m of data.matchAll(/draw:(\w+)/g))ctx[m[1]]=()=>{};vm.runInContext(data,ctx);}
 const start=html.indexOf('function pictureTheme('),end=html.indexOf('function collList()',start);vm.runInContext(html.slice(start,end),ctx);
 assert(!ctx.playgroundCategories().some(c=>c.id==='bible'));
 assert(!ctx.collPool().some(a=>ctx.pictureTheme(a)==='bible'));
 const ids=ctx.playgroundCategories().map(c=>c.id);
 assert(ctx.collPool().every(a=>ids.includes(ctx.pictureTheme(a))), 'Every playground picture has one available category');
 ctx.mode='adult';assert(ctx.collPool().some(a=>ctx.pictureTheme(a)==='bible'), 'Workshop keeps Bible collection');
}
console.log('PASS: theme-specific frame assets and names; playground categories exclude Bible and cover all visible pictures');
