var spaghettiCode = function(plate) 
{
  let M = plate.length;
  let N = plate[0].length;
  let l = {};
  let visited = new Set();
  for(let r = 0; r < M; r++)
  {
    for(let c = 0; c < N; c++)
    {
      
      if(plate[r][c] < 'A' || plate[r][c] > 'Z')
        continue;
      let a = {};
      let sz = findTail(plate, r, c, visited, a);
        l[Object.keys(a)[0]] = sz;
    }
  }
  
  let keys = Object.keys(l);
  let max = l[keys[0]];
  let alpha = keys[0];
  for(let k of keys)
    if(l[k] > max)
      max = l[k], alpha = k;
  return keys.length == 0 ? '' : alpha;
}


function findTail(plate, r, c, visited, a)
{
  let rowInBounds = r < plate.length && r >= 0;
  let colInBounds = c < plate[0].length && c >= 0;
  let key = r + "," + c;
  
  if(visited.has(key))
    return 0;
  if(!rowInBounds || !colInBounds)
    return 0;
  if(plate[r][c] == '_' || plate[r][c] == ' ')
    return 0;
  if(plate[r][c] < 'A' || plate[r][c] > 'Z')
    return 0;
  if(plate[r][c] != 'S')
    a[plate[r][c]] = plate[r][c];
  
  visited.add(key);

  let size = 1;
  
  
  size += findTail(plate, r + 1, c, visited, a);
  size += findTail(plate, r - 1, c, visited, a);
  size += findTail(plate, r, c + 1, visited, a);
  size += findTail(plate, r, c - 1, visited, a);
  
  if(Object.keys(a).length == 0)
    a['S'] = size;
  
  return size;
}
