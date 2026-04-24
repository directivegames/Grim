import { readFileSync } from 'fs';
const s = JSON.parse(readFileSync('assets/default.genesys-scene', 'utf8'));
const root = s['$root'];
const actors = root.actors;
const len = actors['$length'];
const keys = Object.keys(actors).filter(k => k !== '$length');
console.log('$length:', len, 'actual actors:', keys.length);
const missing = [];
for (let i = 1; i <= len; i++) {
  if (!actors[String(i)]) missing.push(i);
}
console.log('missing actor keys:', missing);
const tree = root.editorData.sceneTree;
const treeIds = [];
function walk(n) { if (n.nodeType === 'actor') treeIds.push(n.id); (n.children || []).forEach(walk); }
walk(tree);
const actorUUIDs = keys.map(k => actors[k].uuid);
const orphans = treeIds.filter(id => !actorUUIDs.includes(id));
console.log('tree orphans:', orphans.length, orphans);
console.log('version:', s['$version']);
