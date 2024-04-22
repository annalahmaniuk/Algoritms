function topologicalSortDemukron(edges) {
    // Створення списку суміжності
    const adjList = {};
    const inDegree = {};
    const nodes = new Set();
  
    // Заповнення списку суміжності і підрахунок вхідних ступенів
    edges.forEach(([u, v]) => {
      if (!adjList[u]) adjList[u] = [];
      adjList[u].push(v);
  
      inDegree[v] = (inDegree[v] || 0) + 1;
      if (!inDegree[u]) inDegree[u] = 0;
  
      nodes.add(u);
      nodes.add(v);
    });
  
    // Знаходження всіх вузлів з inDegree = 0 (кореневі вузли)
    const zeroInDegreeQueue = [];
    for (const node of nodes) {
      if (inDegree[node] === 0) {
        zeroInDegreeQueue.push(node);
      }
    }
  
    const result = [];
    let level = 0;
  
    // Топологічне сортування
    while (zeroInDegreeQueue.length > 0) {
      const newZeroInDegreeQueue = [];
  
      // Всі вузли поточного рівня
      const currentLevel = [];
  
      while (zeroInDegreeQueue.length > 0) {
        const node = zeroInDegreeQueue.shift();
        currentLevel.push(node);
  
        // Видалення ребер та зменшення inDegree у підлеглих вузлів
        const neighbors = adjList[node] || [];
        for (const neighbor of neighbors) {
          inDegree[neighbor] -= 1;
          if (inDegree[neighbor] === 0) {
            newZeroInDegreeQueue.push(neighbor);
          }
        }
      }
  
      result.push(...currentLevel);
      zeroInDegreeQueue.push(...newZeroInDegreeQueue);
      level++;
    }
  
    if (result.length !== nodes.size) {
      throw new Error("Граф містить цикли, топологічне сортування неможливе.");
    }
  
    return result;
  }
  
  // Приклад використання
  const edges = [
    ['a', 'b'],
    ['a', 'd'],
    ['a', 'e'],
    ['b', 'c'],
    ['c', 'e'],
    ['c', 'f'],
    ['d', 'e'],
    ['e', 'f']
  ];
  
  const sortedNodes = topologicalSortDemukron(edges);
  console.log("Топологічне сортування:", sortedNodes);
  