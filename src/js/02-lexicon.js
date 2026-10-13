/* ============================================================
   02-lexicon.js
   Original section: 1. LEXICON
   ============================================================ */
const LEX = {};
const REG_COUNT = {};
const reg = (words, def) => (Array.isArray(words) ? words : [words]).forEach(w => {
  REG_COUNT[w] = (REG_COUNT[w] || 0) + 1;
  LEX[w] = Object.assign({lemma:w}, def);
});

reg(['i','me'], {t:'PRP',person:1,num:'sg'});
reg('you', {t:'PRP',person:2,num:'sg'});
reg(['he','she','it'], {t:'PRP',person:3,num:'sg'});
reg('we', {t:'PRP',person:1,num:'pl'});
reg('they', {t:'PRP',person:3,num:'pl'});
reg(['him','us','them'], {t:'PRP'});
reg('her', {t:'PRP',amb:['PRP$']});
reg(['my','your','our','their','its'], {t:'PRP$'});
reg('his', {t:'PRP$',amb:['PRP']});
reg(['the','a','an','this','these','those','each','every','no','any'], {t:'DT'});
reg('some', {t:'DT',amb:['PRP']});
reg('that', {t:'DT',amb:['PRP','IN']});
reg(['who','whom','what'], {t:'WP'});
reg('whose', {t:'WP$'});
reg('which', {t:'WDT'});
reg(['when','where','why','how'], {t:'WRB'});
reg(['of','in','on','at','from','with','without','for','by','about','into','onto','over','under','between','among','through','during','after','before','until','since','within','although','though','if','unless','while','as','than','upon','across','along','around','behind','below','beneath','beside','beyond','near','off','out','past','toward','towards','up','down','against','despite','besides','except','inside','outside','because'], {t:'IN'});
reg('like', {t:'VB',amb:['IN']});
reg('to', {t:'TO',amb:['IN']});
reg(['and','or','but','so','yet','nor'], {t:'CC'});
reg(['will','would','can','could','shall','should','may','might','must'], {t:'MD'});

const AUX_BE = {am:'VBP',is:'VBZ',are:'VBP',was:'VBD',were:'VBD',be:'VB',been:'VBN',being:'VBG'};
for (const f in AUX_BE) reg(f, {t:AUX_BE[f],lemma:'be',aux:true,form:f==='been'?'V3':f==='being'?'V-ing':(f==='was'||f==='were')?'V2':(f==='is'?'V-s':'V1')});
const AUX_DO = {do:'VBP',does:'VBZ',did:'VBD'};
for (const f in AUX_DO) reg(f, {t:AUX_DO[f],lemma:'do',aux:true,form:f==='did'?'V2':f==='does'?'V-s':'V1'});
const AUX_HAVE = {have:'VBP',has:'VBZ',had:'VBD'};
for (const f in AUX_HAVE) reg(f, {t:AUX_HAVE[f],lemma:'have',aux:true,form:f==='had'?'V2':f==='has'?'V-s':'V1'});

reg(['not','very','always','never','often','sometimes','usually','already','just','too','also','here','there','now','then','soon','quite','rather','really','still','yesterday','today','tomorrow','again','yet','ever','once','twice','only','even','almost','enough','maybe','perhaps','please'], {t:'RB'});
reg('well', {t:'RB',amb:['JJ']});
reg('ago', {t:'RB'});
reg(['go','eat','play','study','read','finish','want','learn','buy','write','move','pass','see','come','take','make','give','get','find','leave','say','tell','think','bring','run','speak','break','begin','like','love','hate','need','help','use','try','start','stop','open','close','put','keep','let','call','ask','watch','listen','walk','talk','live','die','happen','carry','hold','turn','show','hear','feel','become','seem','know','mean','understand','remember','forget','wait','meet','pay','send','build','grow','sit','stand','lose','win','fall','rise','sing','swim','teach','catch','drive','fly','draw','wear','drink','sleep','wake','wash','clean','cook','prepare','belong','enjoy','prefer','decide','allow','invite','visit','arrive','return','travel','continue','improve','realize','depend'], {t:'VB',form:'V1'});
reg('work', {t:'NN',amb:['VB']});
reg('water', {t:'NN',amb:['VB']});
reg(['book','room','school','market','food','morning','evening','night','day','year','week','month','hour','minute','second','time','friend','family','home','house','city','country','world','life','way','thing','man','woman','child','student','teacher','author','exam','test','homework','breakfast','lunch','dinner','car','tree','dog','cat','table','chair','door','window','hand','head','eye','face','money','job','idea','problem','question','story','word','name','number','part','place','church','office','hospital','football','basketball','sport','game','music','song','movie','language','letter','email','message','phone','computer','internet','island','mountain','river','sea','ocean','sky','sun','moon','star','air','fire','earth','garden','park','street','road','village','town','area','size','type','kind','form','color','shape','sound','taste','smell','dream','plan','reason','effect','cause','purpose','goal','future','past','present'], {t:'NN'});
reg(['sister','mother','father','brother','daughter','son','uncle','aunt'], {t:'NN'});
reg(['engineer','lawyer','nurse','doctor','dentist','scientist'], {t:'NN'});
reg(['english','indonesia','america','london','paris','jakarta','john','mary','monday','tuesday','wednesday','thursday','friday','saturday','sunday','january','february','march','april','may','june','july','august','september','october','november','december'], {t:'NNP'});
reg(['james','charles','thomas','robert','william','david','michael','richard','joseph','daniel','paul','george','edward','henry','peter','andrew','mark','stephen','tom'], {t:'NNP'});
reg(['good','bad','big','small','large','little','long','short','high','low','old','new','young','happy','sad','difficult','easy','important','beautiful','ugly','nice','kind','different','same','right','wrong','true','false','hot','cold','warm','cool','slow','soft','strong','weak','rich','poor','clean','dirty','full','empty','quick','tall','heavy','light','dark','bright','clear','safe','dangerous','interesting','boring','tired','hungry','thirsty','sick','healthy','ready','busy','free','sure','main','only','real','simple','common','possible','impossible','necessary','useful','careful','angry','glad','sorry','proud','afraid','lucky','unlucky','smart','clever','stupid','funny','serious','quiet','loud','expensive','cheap','modern','ancient','famous','popular'], {t:'JJ'});
reg(['fast','hard','late','early','far'], {t:'JJ',amb:['RB']});
reg(['exciting','tiring','amazing','boring'], {t:'JJ', amb:['VBG']});
reg(['interested','excited','bored','tired'], {t:'JJ', amb:['VBN']});
reg(['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','twenty','thirty','forty','fifty','hundred','thousand','million','billion','first','second','third','fourth','fifth'], {t:'CD'});
reg(['oh','wow','hey','hi','hello','yes','okay','ok'], {t:'UH'});

reg(['children','people','men','women','feet','teeth','mice','geese','oxen'], {t:'NNS', num:'pl'});
reg('news', {t:'NN'});
reg(['mathematics','physics','politics','economics','statistics','linguistics','athletics','gymnastics','measles','mumps','rabies','ethics','diabetes'], {t:'NN'});
const NUMBER_INVARIANT = new Set(['sheep','fish','deer','moose','aircraft','series','species','offspring','means']);

reg(['friendly','lonely','lovely','silly','holy','likely','unlikely','daily','weekly','monthly','yearly'], {t:'JJ'});
reg(['order','other','paper','matter','member','layer','banner','proper','tender','sober','eager'], {t:'NN'});
reg(['suggest','request','interest','invest','protest','arrest','harvest','digest','manifest','forest'], {t:'VB',amb:['NN']});
reg(['apply','multiply','imply','comply','rely','deny','identify','qualify','modify','specify','verify','justify','satisfy','clarify','classify','occupy'], {t:'VB'});
reg(['reply','supply','study'], {t:'VB',amb:['NN']});

reg(['advice','information','furniture','equipment','luggage','baggage','traffic','weather','knowledge','research','progress','permission'], {t:'NN'});
const UNCOUNTABLE = new Set([
  'advice','homework','information','furniture','equipment','luggage','baggage',
  'traffic','weather','knowledge','rice','sugar','salt','butter','cheese',
  'wool','cotton','wood','iron','steel','research','progress','permission',
  'money','music','bread','milk','coffee','tea','food','fruit',
  'news','help','fun','luck','hope','peace','patience'
]);

reg('answer', {t:'VB', form:'V1', amb:['NN']});
reg('more', {t:'RB', amb:['JJR']});
reg(['agree','discuss','marry'], {t:'VB', form:'V1'});
reg('married', {t:'JJ'});

reg(['everyone','someone','anyone','nobody','everybody','somebody','anybody'], {t:'PRP', person:3, num:'sg'});
reg(['station','airport','bus','train','plane','ticket','passport','tourist','university','college','semester','degree','project','report','essay','poem','novel','magazine','newspaper','review','mail','recipient','sender','meeting','holiday','vacation'], {t:'NN'});
reg(['collect','deliver','accept','receive','describe','publish','admit','submit','attend','participate','graduate','celebrate'], {t:'VB', form:'V1'});
reg(['mat','rug','floor','wall','ceiling','shelf','box','bag','cup','glass'], {t:'NN'});
reg(['many','much','few','several','both','either','neither'], {t:'DT', amb:['JJ']});
reg('change',    {t:'NN', amb:['VB']});
reg('increase',  {t:'NN', amb:['VB']});
reg('decrease',  {t:'NN', amb:['VB']});
reg('influence', {t:'NN', amb:['VB']});
reg('result',    {t:'NN', amb:['VB']});
reg('affect',    {t:'VB', amb:['NN']});
reg('process',   {t:'NN', amb:['VB']});
reg('support',   {t:'NN', amb:['VB']});
reg('design',    {t:'NN', amb:['VB']});
reg('agriculture', {t:'NN'});
reg('climate',   {t:'NN'});
reg('data',      {t:'NNS'});
reg('participant', {t:'NN'});
reg('economy',   {t:'NN'});
reg('aware',     {t:'JJ'});

const DURATION_UNITS = new Set(['minute','second','hour','day','week','month','year','decade','century']);
const ARTICLE_REQUIRED_NN = new Set([
  'book','table','chair','door','window','car','tree','dog','cat',
  'house','room','letter','phone',
  'student','teacher','author','friend',
  'engineer','lawyer','nurse','doctor','dentist','scientist',
  'exam','test','movie','song','story','question','answer','problem','idea','plan',
  'city','country'
]);
