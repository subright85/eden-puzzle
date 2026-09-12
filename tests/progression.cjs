const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Function(m[1]);
const source=html.slice(html.indexOf('function coinS(){'),html.indexOf('/* ── 조각 수 시트'));
function app(seed={}){
 const data=structuredClone(seed);let day='2026-09-11';
 const ctx={store:{get:(k,d)=>k in data?structuredClone(data[k]):d,set:(k,v)=>data[k]=structuredClone(v),del:k=>delete data[k]},dayStamp:()=>day,lang:'ko',findScene:id=>({free:id==='free'}),$:()=>({textContent:'',parentElement:{}})};
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
 for(const [n,id] of [[6,'oak'],[12,'oak'],[24,'ceramic'],[48,'walnut'],[96,'gold'],[150,'gold']])assert.equal(ctx.recordCompletion('a',n).frame.id,id);
 const replay=ctx.recordCompletion('a',6);assert.equal(replay.best,150);assert.equal(replay.frame.id,'gold');assert.equal(replay.upgraded,false);
 assert.equal(ctx.bestCount('b'),0);assert.equal(ctx.recordCompletion('b',6).upgraded,true);assert.equal(data.done.a,true);
}
{
 const {ctx}=app({done:{old:true}});const r=ctx.recordCompletion('old',24);assert.equal(r.frame.id,'ceramic');assert.equal(r.upgraded,true,'Legacy completions can upgrade without losing history');
}
assert(!html.includes('id="coinRN"'));
assert(!html.includes('id="acct"'));
assert(!html.includes('id="acctBtn"'));
assert(!html.includes('⭐⭐⭐'));
for(const f of ['oak','ceramic','walnut','gold'])assert(fs.existsSync(`assets/ui/frames/${f}-v1.png`));
console.log('PASS: coin migration, daily grants, spending, photo access, frame thresholds, no downgrade, legacy progress, syntax/assets');
